import { fireEvent, waitFor, within } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import { useBackgroundStore } from "../../features/background/hooks";
import { ZoomController } from "../../features/background/ui";

describe("<ZoomController />", () => {
  test("컴포넌트가 렌더링되고 현재 줌 비율이 표시된다", () => {
    render(<ZoomController />);
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  test("줌 버튼을 클릭하면 옵션 목록이 표시된다", () => {
    render(<ZoomController />);
    const zoomButton = screen.getByTestId("zoom-button");

    fireEvent.click(zoomButton);

    const options = screen.getByTestId("zoom-options");
    const withinOptions = within(options);

    expect(withinOptions.getByText("200%")).toBeInTheDocument();
    expect(withinOptions.getByText("125%")).toBeInTheDocument();
    expect(withinOptions.getAllByText("100%")).toHaveLength(1);
    expect(withinOptions.getByText("75%")).toBeInTheDocument();
    expect(withinOptions.getByText("50%")).toBeInTheDocument();
  });

  test("옵션을 클릭하면 setTransform 이 호출되고 목록이 닫힌다", async () => {
    render(<ZoomController />);
    const zoomButton = screen.getByTestId("zoom-button");

    fireEvent.click(zoomButton);

    const options = screen.getByTestId("zoom-options");
    const withinOptions = within(options);

    const option = withinOptions.getByText(/125%/);
    fireEvent.click(option);

    await waitFor(() => {
      const scale = screen.getByTestId("zoom-scale");
      const withinScale = within(scale);
      expect(withinScale.getByText("125%")).toBeInTheDocument();
    });
  });

  it("줌 확대배율을 선택하면, transform 의 zoomScale 이 선택한 배율에 맞게 변해야 한다.", () => {
    render(<ZoomController />);

    const zoomButton = screen.getByTestId("zoom-button");
    fireEvent.click(zoomButton);

    const options = screen.getByTestId("zoom-options");
    const withinOptions = within(options);

    const option = withinOptions.getByText(/125%/);
    fireEvent.click(option);

    expect(useBackgroundStore.getState().transform.zoomScale).toBe(1.25);
  });
});
