# Repeated elements — component, not `map`

When a page has repeated items (cards, logo rows, tiles), **define a component and instantiate once per item**. Do **not** use `array.map` for visually distinct inspector targets.

Define the component **in the same `index.tsx`**. Never `Card.tsx` siblings.

```tsx
// ✅ Each card is its own JSX node — inspector edits one at a time.
const Card = ({ src, label }: { src: string; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <img src={src} style={{ width: 320, height: 320, objectFit: 'cover', borderRadius: 12 }} />
    <p style={{ fontSize: 32 }}>{label}</p>
  </div>
);

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64 }}>
  <Card src={alpha} label="Alpha" />
  <Card src={beta}  label="Beta"  />
  <Card src={gamma} label="Gamma" />
</div>
```

```tsx
// ❌ One template — inspector changes all instances at once.
items.map((item) => ( … ));
```

Plain `<ul><li>` bullets are fine — each `<li>` is already its own node.
