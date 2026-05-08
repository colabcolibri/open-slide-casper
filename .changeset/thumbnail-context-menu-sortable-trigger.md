---
'@open-slide/core': patch
---

Fix thumbnail right-click menu not opening on the sortable (vertical) rail in dev — `SortableThumb` now forwards Radix's injected handlers to the underlying button.
