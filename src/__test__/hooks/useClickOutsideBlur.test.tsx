import { useClickOutsideBlur } from "@/shared/hooks/useClickOutsideBlur";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRef } from "react";

function TestInputComponent() {
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutsideBlur(inputRef);

  return (
    <div>
      <input ref={inputRef} data-testid="test-input" />
      <button data-testid="outside-button">input 이 아닌 곳</button>
    </div>
  );
}

describe("useClickOutsideBlur custom hook", () => {
  test("input 필드 외부 클릭 시 포커스가 꺼져야 한다.", () => {
    render(<TestInputComponent />);

    const input = screen.getByTestId("test-input");
    const outsideButton = screen.getByTestId("outside-button");

    input.focus();
    expect(input).toHaveFocus();

    fireEvent.mouseDown(outsideButton);
    expect(input).not.toHaveFocus();
  });

  test("input 필드에서 Enter 키 누를 시 포커스가 꺼져야 한다.", () => {
    render(<TestInputComponent />);

    const input = screen.getByTestId("test-input");

    input.focus();
    expect(input).toHaveFocus();

    fireEvent.keyUp(input, { key: "Enter" });
    expect(input).not.toHaveFocus();
  });

  test("input 필드 내부 클릭 시 포커스 유지되어야 한다.", () => {
    render(<TestInputComponent />);

    const input = screen.getByTestId("test-input");

    input.focus();
    expect(input).toHaveFocus();

    fireEvent.mouseDown(input);
    expect(input).toHaveFocus();
  });
});
