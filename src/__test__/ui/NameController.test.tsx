import { useBoardStore } from "@/entities/board/store";
import { NameController } from "@/features/controls/ui/NameController";
import { fireEvent, render, screen } from "@testing-library/react";

describe("<NameController />", () => {
  test("입력값이 변경되면 name 의 상태값도 변경되어야 한다.", () => {
    render(<NameController />);

    const input = screen.getByTestId("name-input");

    fireEvent.change(input, { target: { value: "LongerTestString" } });

    expect(useBoardStore.getState().name).toEqual("LongerTestString");
  });
});
