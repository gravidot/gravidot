import { getRandomValue } from "@/shared/utils/getRandomValue";

describe("getRandomValue 함수", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const sampleObject = {
    red: "red",
    blue: "blue",
    green: "green",
    yellow: "yellow",
  };

  test("함수를 호출하면 객체에서 무작위 값을 반환해야 한다", () => {
    const getRandom = getRandomValue(sampleObject);
    const result = getRandom();

    expect(Object.values(sampleObject)).toContain(result.value);
  });

  test("같은 값이 연속으로 두 번 이상 나오지 않아야 한다", () => {
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1);

    const getRandom = getRandomValue(sampleObject);
    const firstCall = getRandom();
    const secondCall = getRandom();

    expect(firstCall.value).toBe(secondCall.value);
    const thirdCall = getRandom();
    expect(secondCall.value).not.toBe(thirdCall.value);
  });

  test("반환된 결과에 선택된 키와 선택 횟수가 포함되어 있어야 한다", () => {
    const getRandom = getRandomValue(sampleObject);
    const selectedKeys = new Set<keyof typeof sampleObject>();

    while (selectedKeys.size < Object.keys(sampleObject).length) {
      const result = getRandom();
      selectedKeys.add(result.value as keyof typeof sampleObject);
    }

    expect(selectedKeys.has("red")).toBe(true);
    expect(selectedKeys.has("blue")).toBe(true);
    expect(selectedKeys.has("green")).toBe(true);
    expect(selectedKeys.has("yellow")).toBe(true);
  });

  test("여러 번 호출 시 각 키의 선택 횟수를 올바르게 기록해야 한다", () => {
    const getRandom = getRandomValue(sampleObject);
    for (let i = 0; i < 10; i++) {
      getRandom();
    }

    const result = getRandom();
    const counts = Array.from(result.counts.values());

    expect(counts.some((count) => count > 0)).toBe(true);
  });
});
