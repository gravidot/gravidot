import { Controls } from "@/features/controls";
import { render, screen } from "@testing-library/react";

const mockRouterReplace = jest.fn();
const mockRouterRefresh = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("next/navigation", () => {
  const originalModule = jest.requireActual("next/navigation");
  return {
    __esModule: true,
    ...originalModule,
    useRouter: jest.fn().mockImplementation(() => {
      return {
        push: mockRouterPush,
        replace: mockRouterReplace,
        refresh: mockRouterRefresh,
      };
    }),
    useSearchParams: jest.fn().mockImplementation(() => {
      return new URLSearchParams(window.location.search);
    }),
    usePathname: jest.fn().mockImplementation((pathArg) => {
      return pathArg;
    }),
  };
});

jest.mock("@/shared/api/supabaseClient", () => jest.fn());

describe("<Controls />", () => {
  it("여러 Controller 를 포함해야 한다.", () => {
    render(<Controls />);

    expect(screen.getByTestId("name-controller")).toBeInTheDocument();
    expect(screen.getByTestId("zoom-controller")).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
