#!/usr/bin/env bash
# Sync slide kit into a workspace:
#   1) copy packages/core/.agent → <workspace>/.agent
#   2) symlink IDE adapters → <workspace>/.agent/…
#
# Usage (from open-slide monorepo root):
#   pnpm sync:kit:demo
#   pnpm sync:kit:adapters -- apps/demo
#   pnpm sync:kit:adapters -- --dry-run apps/demo
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
if [[ ! -d "${CORE_AGENT}/skills" || ! -d "${CORE_AGENT}/workflows" || ! -d "${CORE_AGENT}/agents" ]]; then
  echo "ERROR: missing ${CORE_AGENT}/skills, workflows, or agents" >&2
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
  rm -rf "${linkpath}"
  ln -sf "${rel}" "${linkpath}"
}

if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "[dry-run] copy .agent <= ${CORE_AGENT}"
else
  rm -rf .agent
  cp -R "${CORE_AGENT}" .agent
fi

AGENT_ROOT="$(pwd)/.agent"

echo "Slide kit sync: ${WORKSPACE} (canonical ${CORE_AGENT})"

# Legacy layouts (pre–sync:kit); remove so only .agent/ + symlinks remain
if [[ "${DRY_RUN}" -eq 0 ]]; then
  rm -rf .agents/workflows .claude/workflows
fi

for skill_dir in "${AGENT_ROOT}/skills"/*/; do
  [[ -d "${skill_dir}" ]] || continue
  name="$(basename "${skill_dir}")"
  link_path "${AGENT_ROOT}/skills/${name}" ".agents/skills/${name}"
  link_path "${AGENT_ROOT}/skills/${name}" ".claude/skills/${name}"
done

mkdir -p .cursor/commands .claude/commands
for workflow in "${AGENT_ROOT}/workflows/"*.md; do
  [[ -f "${workflow}" ]] || continue
  name="$(basename "${workflow}")"
  base="${name%.md}"
  link_path "${workflow}" ".cursor/commands/${name}"
  link_path "${workflow}" ".claude/commands/${name}"
  mkdir -p ".agents/skills/workflow-${base}"
  link_path "${workflow}" ".agents/skills/workflow-${base}/SKILL.md"
done

mkdir -p .cursor/agents .claude/agents
for agent in "${AGENT_ROOT}/agents/"*.md; do
  [[ -f "${agent}" ]] || continue
  name="$(basename "${agent}")"
  link_path "${agent}" ".cursor/agents/${name}"
  link_path "${agent}" ".claude/agents/${name}"
done

parse_frontmatter_field() {
  local file="$1"
  local field="$2"
  awk -v field="$field" '
    BEGIN { n = 0 }
    /^---$/ { n++; next }
    n == 1 && $0 ~ "^" field "[ \t]*:" {
      line = $0
      sub("^" field "[ \t]*:[ \t]*", "", line)
      if (line ~ /^["'\''"]/) { gsub(/^["'\''"]|["'\''"]$/, "", line) }
      print line
      exit
    }
  ' "${file}"
}

toml_escape() {
  local s="$1"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  printf '%s' "${s}"
}

write_codex_agent_toml() {
  local agent_file="$1"
  local out_file="$2"
  local name description
  name="$(parse_frontmatter_field "${agent_file}" "name")"
  description="$(parse_frontmatter_field "${agent_file}" "description")"
  [[ -n "${name}" ]] || name="$(basename "${agent_file}" .md)"
  [[ -n "${description}" ]] || description="open-slide agent ${name}"

  if [[ "${DRY_RUN}" -eq 1 ]]; then
    echo "[dry-run] write ${out_file} (from ${agent_file})"
    return 0
  fi

  mkdir -p "$(dirname "${out_file}")"
  cat > "${out_file}" <<EOF
# open-slide-kit-generated
name = "$(toml_escape "${name}")"
description = "$(toml_escape "${description}")"
developer_instructions = """
Follow the slide kit agent at .agent/agents/${name}.md.
Read that file fully before acting. Skills in its frontmatter apply.
Protocol: .agent/SLIDE-KIT.md
"""
EOF
}

mkdir -p .codex/agents
for agent in "${AGENT_ROOT}/agents/"*.md; do
  [[ -f "${agent}" ]] || continue
  base="$(basename "${agent}" .md)"
  write_codex_agent_toml "${agent}" ".codex/agents/${base}.toml"
done

if [[ -f "${AGENT_ROOT}/SLIDE-KIT.md" ]]; then
  link_path "${AGENT_ROOT}/SLIDE-KIT.md" ".codex/README.md"
fi

if [[ -f "${AGENT_ROOT}/rules/AGENTS.md" ]]; then
  if [[ ! -e AGENTS.md ]] || [[ -L AGENTS.md ]]; then
    link_path "${AGENT_ROOT}/rules/AGENTS.md" "AGENTS.md"
  fi
fi

if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "Dry run complete."
else
  echo "Done. Copied .agent/; adapters + .codex/ symlink → .agent/; Codex: \$workflow-* skills."
fi
