import { useBackgroundStore } from "@/features/background/hooks";
import { NameController } from "@/features/background/ui";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<NameController />", () => {
  test("입력값이 변경되면 name 의 상태값도 변경되어야 한다.", () => {
    render(<NameController />);

    const input = screen.getByTestId("name-input");

    fireEvent.change(input, { target: { value: "LongerTestString" } });

    expect(useBackgroundStore.getState().name).toEqual("LongerTestString");
  });
});
