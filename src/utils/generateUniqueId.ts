export function generateUniqueIdV1(): string {
  return Date.now() + '-' + Math.round(Math.random() * 1e9);
} // Example output: 1726138588544-138573341

export function generateUniqueIdV2(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2);
  return `${timestamp}-${randomPart}`;
} // Example output: lmg4efhc-1c3zk4f1
