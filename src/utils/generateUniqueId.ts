export function generateUniqueId(): string {
  return Date.now() + '-' + Math.round(Math.random() * 1e9);
}
