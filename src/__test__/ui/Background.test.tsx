import { render, screen } from "@testing-library/react";
import { Background, BackgroundPattern } from "../../features/background/ui";

describe("<Background /> Component", () => {
  it("BackgroundPattern.Dots 패턴을 기본으로 한다.", () => {
    const { container } = render(<Background />);
    const circle = container.querySelector("circle");

    expect(screen.getByTestId("dot-pattern")).toBeInTheDocument();
    expect(circle).toBeInTheDocument();
  });

  it("BackgroundPattern.Dots 패턴일 때는, pattern 을 circle 로 그려야 한다.", () => {
    const { container } = render(
      <Background pattern={BackgroundPattern.Dots} />
    );
    const circle = container.querySelector("circle");

    expect(screen.getByTestId("dot-pattern")).toBeInTheDocument();
    expect(circle).toBeInTheDocument();
  });

  it("BackgroundPattern.Lines 패턴일 때는, pattern 을 path 로 격자무늬를 그려야 한다.", () => {
    const { container } = render(
      <Background pattern={BackgroundPattern.Lines} gap={30} lineWidth={2} />
    );
    const path = container.querySelector("path");

    expect(screen.getByTestId("line-pattern")).toBeInTheDocument();
    expect(path).toBeInTheDocument();
  });

  it("패턴이 있는 svg 를 렌더링 해야 한다.", () => {
    const { container } = render(
      <Background pattern={BackgroundPattern.Dots} />
    );
    const svg = container.querySelector("svg");
    const defs = container.querySelector("defs");
    const rect = container.querySelector("rect");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("h-dvh w-dvw");
    expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");

    expect(defs).toBeInTheDocument();
    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute("fill", "url(#grid-pattern)");
  });

  it("패턴 요소에 맞는 알맞은 속성을 가지고 있어야 한다.", () => {
    const gap = 24;
    const { container } = render(
      <Background pattern={BackgroundPattern.Lines} gap={gap} />
    );
    const pattern = container.querySelector("pattern");

    expect(pattern).toBeInTheDocument();
    expect(pattern).toHaveAttribute("id", "grid-pattern");
    expect(pattern).toHaveAttribute("width", gap.toString());
    expect(pattern).toHaveAttribute("height", gap.toString());
    expect(pattern).toHaveAttribute("patternUnits", "userSpaceOnUse");
  });

  it("아무 패턴도 없는 경우에는 빈 대지를 보여줘야 한다.", () => {
    const { container } = render(
      <Background pattern={BackgroundPattern.None} />
    );

    const pattern = container.querySelector("pattern");
    const path = container.querySelector("path");
    const circle = container.querySelector("circle");

    expect(pattern).toBeInTheDocument();
    expect(path).toBe(null);
    expect(circle).toBe(null);
  });
});
