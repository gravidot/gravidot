import { useMeasureInputWidth } from "@/shared/hooks/useMeasureInputWidth";
import { render, screen } from "@testing-library/react";
import { useRef } from "react";

function TestComponent({
  value,
  testId = "measured-input",
}: {
  value: string;
  testId?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useMeasureInputWidth(inputRef, value);

  return (
    <input
      ref={inputRef}
      data-testid={testId}
      value={value}
      onChange={() => {}}
    />
  );
}

describe("useMeasureInputWidth custom hook", () => {
  it("input 필드 컨텐츠에 따라 너비가 변경되어야 한다.", () => {
    const testIdForKorean = "korean-measure-input";
    render(<TestComponent value="안녕하세요!" testId={testIdForKorean} />);

    const inputElementKorean = screen.getByTestId(testIdForKorean);
    const widthInKorean = inputElementKorean.style.width;

    expect(widthInKorean).toMatch(/px$/);
    expect(parseFloat(widthInKorean)).toBeGreaterThan(0);

    const testIdForEnglish = "english-measure-input";
    render(
      <TestComponent
        value="welcome to gravidot! This is a brainstorming and mind mapping service that connects ideas and supports real-time collaboration with an intuitive multi-touch interface."
        testId={testIdForEnglish}
      />
    );
    const inputElementEnglish = screen.getByTestId(testIdForEnglish);
    const widthInEnglish = inputElementEnglish.style.width;

    expect(parseFloat(widthInEnglish)).toBeGreaterThan(
      parseFloat(widthInKorean)
    );
  });

  it("최대 MAX_WIDTH 까지만 width 를 변경할 수 있다.", () => {
    const longContent = "안녕하세요!".repeat(200);
    render(<TestComponent value={longContent} />);

    const inputElement = screen.getByTestId("measured-input");
    const width = inputElement.style.width;

    expect(width).toMatch(/px$/);
    expect(parseFloat(width)).toBeLessThanOrEqual(256);
  });
});
