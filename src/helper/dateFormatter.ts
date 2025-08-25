export function formatFirestoreTimestamp(timestamp?: {
  seconds: number;
  nanoseconds: number;
}): string {
  if (!timestamp || typeof timestamp.seconds !== 'number') return '';
  return new Date(timestamp.seconds * 1000).toLocaleString();
}
