import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import { type CanvasSize, resolveCanvasSize, type SlideCanvasFormat } from './canvas';

const CanvasSizeContext = createContext<CanvasSize>(resolveCanvasSize('slide'));

export function CanvasSizeProvider({
  format,
  children,
}: PropsWithChildren<{ format?: SlideCanvasFormat }>) {
  const size = useMemo(() => resolveCanvasSize(format), [format]);
  return <CanvasSizeContext.Provider value={size}>{children}</CanvasSizeContext.Provider>;
}

export function useCanvasSize(): CanvasSize {
  return useContext(CanvasSizeContext);
}
