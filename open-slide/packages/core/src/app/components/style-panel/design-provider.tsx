import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import { useHistory } from '@/components/history-provider';
import type { AuthoringContractLevel } from '../../lib/authoring-contract';
import { type DesignSystem, defaultDesign, designToCssVars } from '../../lib/design';
import { shuffleDesign } from '../../lib/design-presets';
import { useDesign as useDesignFetch } from './use-design';

type DesignCtx = {
  slideId: string;
  loaded: boolean;
  exists: boolean;
  warning: string | null;
  authoringContract: AuthoringContractLevel;
  authoringReasons: string[];
  design: DesignSystem | null;
  draft: DesignSystem | null;
  dirty: boolean;
  committing: boolean;
  update: (mut: (next: DesignSystem) => void, coalesceKey?: string) => void;
  commit: () => Promise<void>;
  discard: () => void;
  resetToDefaults: () => void;
  shuffle: () => void;
};

const Ctx = createContext<DesignCtx | null>(null);

export function useDesignPanelState(): DesignCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDesignPanelState must be used inside <DesignProvider>');
  return v;
}

export function useAuthoringContract(): Pick<DesignCtx, 'authoringContract' | 'authoringReasons'> {
  const v = useContext(Ctx);
  return {
    authoringContract: v?.authoringContract ?? 'legacy',
    authoringReasons: v?.authoringReasons ?? [],
  };
}

function clone<T>(d: T): T {
  return JSON.parse(JSON.stringify(d)) as T;
}

export function DesignProvider({ slideId, children }: { slideId: string; children: ReactNode }) {
  const { design, exists, warning, loaded, save, authoringContract, authoringReasons } =
    useDesignFetch(slideId);
  const [draft, setDraft] = useState<DesignSystem | null>(null);
  const [committing, setCommitting] = useState(false);
  const history = useHistory();
  const draftRef = useRef<DesignSystem | null>(null);
  draftRef.current = draft;

  useEffect(() => {
    if (design) setDraft(clone(design));
  }, [design]);

  const dirty = useMemo(() => {
    if (!draft || !design) return false;
    return JSON.stringify(draft) !== JSON.stringify(design);
  }, [draft, design]);

  const update = useCallback(
    (mut: (d: DesignSystem) => void, coalesceKey?: string) => {
      if (authoringContract !== 'full') return;
      const prev = draftRef.current;
      if (!prev) return;
      const next = clone(prev);
      mut(next);
      setDraft(next);
      history.record({
        coalesceKey,
        undo: () => setDraft(prev),
        redo: () => setDraft(next),
      });
    },
    [history, authoringContract],
  );

  const commit = useCallback(async () => {
    if (authoringContract !== 'full') return;
    if (!draft) return;
    setCommitting(true);
    const r = await save(draft);
    setCommitting(false);
    if (!r.ok) toast.error(r.error ?? 'Failed to save');
    history.clear();
  }, [draft, save, history, authoringContract]);

  const discard = useCallback(() => {
    if (design) setDraft(clone(design));
    history.clear();
  }, [design, history]);

  const resetToDefaults = useCallback(() => {
    if (authoringContract !== 'full') return;
    const prev = draftRef.current;
    const next = clone(defaultDesign);
    setDraft(next);
    history.record({
      coalesceKey: 'design:reset',
      undo: () => setDraft(prev),
      redo: () => setDraft(next),
    });
  }, [history, authoringContract]);

  const shuffle = useCallback(() => {
    if (authoringContract !== 'full') return;
    const prev = draftRef.current;
    const next = clone(shuffleDesign(prev));
    setDraft(next);
    history.record({
      undo: () => setDraft(prev),
      redo: () => setDraft(next),
    });
  }, [history, authoringContract]);

  // SlideCanvas emits its design vars inline on the canvas root, so a draft
  // overlay must use `!important` to outrank those inline styles.
  const previewCss = useMemo(() => {
    if (!dirty || !draft) return '';
    const lines = Object.entries(designToCssVars(draft))
      .map(([k, v]) => `  ${k}: ${v} !important;`)
      .join('\n');
    return `[data-osd-canvas] {\n${lines}\n}`;
  }, [dirty, draft]);

  const value: DesignCtx = {
    slideId,
    loaded,
    exists,
    warning,
    authoringContract,
    authoringReasons,
    design,
    draft,
    dirty,
    committing,
    update,
    commit,
    discard,
    resetToDefaults,
    shuffle,
  };

  return (
    <Ctx.Provider value={value}>
      {previewCss && (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted local css from draft state.
        <style dangerouslySetInnerHTML={{ __html: previewCss }} />
      )}
      {children}
    </Ctx.Provider>
  );
}
