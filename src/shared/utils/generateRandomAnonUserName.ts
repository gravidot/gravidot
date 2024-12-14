const adjectives: string[] = [
  "Sparkling",
  "Cozy",
  "Jolly",
  "Merry",
  "Frosty",
  "Cheerful",
  "Magical",
  "Glowing",
  "Festive",
  "Warm",
];

const nouns: string[] = [
  "Santa",
  "Reindeer",
  "Snowman",
  "Tree",
  "Elf",
  "Stocking",
  "Present",
  "Fireplace",
  "Carol",
  "Sleigh",
];

const emojis: string[] = [
  "🎅",
  "🦌",
  "⛄",
  "🎄",
  "🧝",
  "🧦",
  "🎁",
  "🔥",
  "🎶",
  "🛷",
];

export function generateRandomAnonUserName(): string {
  const randomIndex = Math.floor(Math.random() * adjectives.length);
  const randomAdjective = adjectives[randomIndex];
  const randomNoun = nouns[randomIndex];
  const randomEmoji = emojis[randomIndex];
  return `${randomAdjective} ${randomNoun} ${randomEmoji}`;
}
