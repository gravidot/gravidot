export function darkenColor(color: string, amount: number = 50): string {
  const rgbMatch = color.match(/\d+/g);
  if (!rgbMatch) return color;

  const [r, g, b] = rgbMatch.map(Number);

  const darkenedR = Math.max(r - amount, 0);
  const darkenedG = Math.max(g - amount, 0);
  const darkenedB = Math.max(b - amount, 0);

  return `rgba(${darkenedR}, ${darkenedG}, ${darkenedB}, 0.5)`;
}
