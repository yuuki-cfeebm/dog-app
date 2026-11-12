export function capitalize(text: string) {
  return text.replace(/\b\w/g, c => c.toUpperCase())
}
