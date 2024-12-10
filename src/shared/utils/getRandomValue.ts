export function getRandomValue<T extends Record<string, unknown>>(obj: T) {
  let current: T[keyof T] | null = null;
  let repeatCount = 0;

  const countMap = new Map<keyof T, number>();

  return function (): { value: T[keyof T]; counts: Map<keyof T, number> } {
    const keys = Object.keys(obj) as (keyof T)[];
    let randomKey: keyof T;
    let newValue: T[keyof T];

    do {
      randomKey = keys[Math.floor(Math.random() * keys.length)];
      newValue = obj[randomKey];
    } while (newValue === current && repeatCount >= 1);

    if (newValue === current) {
      repeatCount++;
    } else {
      repeatCount = 0;
    }

    current = newValue;

    countMap.set(randomKey, (countMap.get(randomKey) || 0) + 1);

    return { value: newValue, counts: new Map(countMap) };
  };
}
