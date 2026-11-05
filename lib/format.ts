// Prices are stored in minor units (cents). 850000 -> "KSh 8,500"
export function money(minor: number) {
  return `KSh ${Math.round(minor / 100).toLocaleString("en-KE")}`;
}
