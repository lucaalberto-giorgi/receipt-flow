// Stable carbon-copy tint per category, so lists read with a consistent
// color rhythm without introducing new palette colors.
const CATEGORY_TINTS = {
  Food: 'bg-carbon-yellow',
  Travel: 'bg-carbon-blue',
  Shopping: 'bg-carbon-pink',
  Utilities: 'bg-carbon-blue',
  Entertainment: 'bg-carbon-pink',
}

export default function categoryChipClass(category) {
  const tint = CATEGORY_TINTS[category] ?? 'bg-sunken'
  return `badge ${tint} text-ink-soft`
}
