export function extractPrefixWithDash(string: string): string {
  return string.split("-")[0];
}

export function extractPrefixWithinTwenty(string: string): string {
  return string.length > 20 ? string.slice(0, 20) + "..." : string;
}
