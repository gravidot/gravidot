import { Controls } from "@/features/controls";
import { render, screen } from "@testing-library/react";

describe("<Controls />", () => {
  it("여러 Controller 를 포함해야 한다.", () => {
    render(<Controls />);

    expect(screen.getByTestId("name-controller")).toBeInTheDocument();
    expect(screen.getByTestId("zoom-controller")).toBeInTheDocument();
  });
});
