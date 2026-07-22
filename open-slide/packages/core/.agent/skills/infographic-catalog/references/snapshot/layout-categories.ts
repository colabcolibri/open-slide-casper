export type LayoutCategory =
  'Process' | 'Structure' | 'Comparison' | 'Metaphor' | 'Data' | 'Identity';

export const LAYOUT_CATEGORY_OPTIONS: LayoutCategory[] = [
  'Process',
  'Structure',
  'Comparison',
  'Metaphor',
  'Data',
  'Identity',
];

export const LAYOUT_CATEGORY_BY_ID: Record<string, LayoutCategory[]> = {
  central_metaphor: ['Metaphor'],
  process_flowchart: ['Process'],
  comparison: ['Comparison'],
  anatomy_view: ['Structure'],
  timeline: ['Process'],
  listicle: ['Structure'],
  hierarchy_pyramid: ['Structure'],
  geographical_map: ['Metaphor'],
  data_story: ['Data'],
  roadmap: ['Process'],
  decision_tree: ['Structure'],
  visual_resume: ['Identity'],
  cycle: ['Process'],
  iceberg: ['Metaphor'],
  venn: ['Comparison'],
  funnel: ['Structure'],
  prism: ['Metaphor'],
  galaxy: ['Metaphor'],
  matrix_quadrant: ['Structure'],
  concentric_layers: ['Structure'],
  staircase: ['Process'],
  puzzle_integration: ['Structure'],
  ingredients_knolling: ['Metaphor'],
  balance_scale: ['Comparison'],
  bridge_gap: ['Metaphor'],
  organic_tree: ['Metaphor'],
  chaos_to_order: ['Process'],
  ripple_effect: ['Metaphor'],
  markup_breakdown: ['Data'],
  team_roster: ['Identity'],
  scoreboard: ['Data'],
  layered_stack_comparison: ['Comparison', 'Structure'],
  network_graph: ['Structure'],
  claim_pillars: ['Comparison'],
  glossary_grid: ['Structure'],
  analogy_bridge: ['Metaphor'],
  mind_map: ['Structure'],
  root_cause_fishbone: ['Process'],
  org_chart: ['Structure'],
};

export function getLayoutCategories(layoutId: string): LayoutCategory[] {
  return LAYOUT_CATEGORY_BY_ID[layoutId] ?? [];
}
