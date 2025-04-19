
// Generate a random ID (simulating blockchain transaction IDs)
export function generateRandomId(): string {
  return '0x' + Array.from(
    { length: 40 },
    () => Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

// Create a hash from a string
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Simulate a blockchain transaction
export function simulateTransaction(durationMs = 2000): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateRandomId());
    }, durationMs);
  });
}

// Format blockchain address for display
export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}

// Calculate XP needed for next level
export function xpNeededForLevel(level: number): number {
  return Math.floor(100 * level * Math.pow(1.5, level - 1));
}

// Format large numbers with commas
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Roll a chance (1-100)
export function rollChance(chance: number): boolean {
  return Math.random() * 100 <= chance;
}
