#!/usr/bin/env bash
# Sync canonical slide kit (packages/core/.agent) → IDE adapters in a slide workspace.
# Same idea as .agent/scripts/sync_cursor_kit.sh for the Meridian harness.
#
# Usage (from open-slide monorepo root):
#   ./scripts/sync-slide-kit-adapters.sh              # defaults to apps/demo
#   ./scripts/sync-slide-kit-adapters.sh apps/demo
#   ./scripts/sync-slide-kit-adapters.sh --dry-run apps/demo

set -euo pipefail

MONOREPO="$(cd "$(dirname "$0")/.." && pwd)"
CORE="${MONOREPO}/packages/core"
CORE_AGENT="${CORE}/.agent"
DRY_RUN=0
WORKSPACE=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run) DRY_RUN=1; shift ;;
    -h | --help)
      echo "Usage: sync-slide-kit-adapters.sh [--dry-run] [workspace-dir]"
      exit 0
      ;;
    *)
      WORKSPACE="$1"
      shift
      ;;
  esac
done

WORKSPACE="${WORKSPACE:-${MONOREPO}/apps/demo}"
if [[ ! -d "${CORE_AGENT}/skills" || ! -d "${CORE_AGENT}/workflows" ]]; then
  echo "ERROR: missing ${CORE_AGENT}/skills or ${CORE_AGENT}/workflows" >&2
  exit 1
fi

cd "${WORKSPACE}"

relpath() {
  python3 -c "import os.path, sys; print(os.path.relpath(sys.argv[1], sys.argv[2]))" "$1" "$2"
}

link_path() {
  local target="$1"
  local linkpath="$2"
  local rel
  rel="$(relpath "${target}" "$(dirname "${linkpath}")")"
  if [[ "${DRY_RUN}" -eq 1 ]]; then
    echo "[dry-run] ${linkpath} -> ${rel}"
    return 0
  fi
  mkdir -p "$(dirname "${linkpath}")"
  rm -f "${linkpath}"
  ln -sf "${rel}" "${linkpath}"
}

echo "Slide kit sync: ${WORKSPACE} (canonical ${CORE_AGENT})"

for skill_dir in "${CORE_AGENT}/skills"/*/; do
  [[ -d "${skill_dir}" ]] || continue
  name="$(basename "${skill_dir}")"
  link_path "${CORE_AGENT}/skills/${name}" ".agents/skills/${name}"
  link_path "$(pwd)/.agents/skills/${name}" ".claude/skills/${name}"
done

mkdir -p .cursor/commands .claude/commands
for workflow in "${CORE_AGENT}/workflows/"*.md; do
  [[ -f "${workflow}" ]] || continue
  name="$(basename "${workflow}")"
  base="${name%.md}"
  link_path "${workflow}" ".cursor/commands/${name}"
  link_path "${workflow}" ".claude/commands/${name}"
  mkdir -p ".agents/skills/workflow-${base}"
  link_path "${workflow}" ".agents/skills/workflow-${base}/SKILL.md"
done

if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "Dry run complete."
else
  echo "Done. Cursor: .cursor/commands/*.md ; skills: .agents/skills/"
fi
