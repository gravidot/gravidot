import { Shape } from "@/entities/shape";
import { ColorType, Position, Size, Vertex } from "@/entities/shape/types";
import { RefObject } from "react";

const mockCanvasContext = {
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  rotate: jest.fn(),
  fill: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  rect: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  fillText: jest.fn(),
  fillStyle: "",
  font: "",
  textAlign: "",
  textBaseline: "",
  shadowColor: "",
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowBlur: 0,
};

const mockCanvasRef: RefObject<HTMLCanvasElement> = {
  current: {
    getContext: jest.fn().mockReturnValue(mockCanvasContext),
  } as unknown as HTMLCanvasElement,
};

const mockTransform = {
  x: 0,
  y: 0,
  zoomScale: 1,
};

describe("Shape class", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("new 키워드로 Shape 인스턴스 생성이 정상적이어야 한다.", () => {
    const position: Position = { x: 50, y: 50 };
    const size: Size = { w: 100, h: 100 };
    const shape = new Shape({ position, size });

    expect(shape.position).toEqual(position);
    expect(shape.size).toEqual(size);
    expect(Object.values(ColorType)).toContainEqual(shape.color);
    expect(Object.values(Vertex)).toContain(shape.vertex);
    expect(shape.rotate).toBeGreaterThanOrEqual(0);
    expect(shape.rotate).toBeLessThan(45);
    expect(shape.content).toBe("Touch Ideas!");
  });

  test("draw 메서드 호출 시 컨텍스트 메서드를 반드시 호출할 수 있어야 한다.", () => {
    const position: Position = { x: 50, y: 50 };
    const shape = new Shape({ position });

    shape.draw({ canvasRef: mockCanvasRef, transform: mockTransform });

    expect(mockCanvasContext.save).toHaveBeenCalledTimes(2);
    expect(mockCanvasContext.restore).toHaveBeenCalledTimes(2);
    expect(mockCanvasContext.translate).toHaveBeenCalled();
    expect(mockCanvasContext.rotate).toHaveBeenCalled();
    expect(mockCanvasContext.fill).toHaveBeenCalled();
  });

  test("drawText 는 텍스트를 올바르게 그려야 한다.", () => {
    const position: Position = { x: 0, y: 0 };
    const shape = new Shape({ position, content: "Gravidot!!" });

    shape.draw({ canvasRef: mockCanvasRef, transform: mockTransform });

    expect(mockCanvasContext.fillText).toHaveBeenCalledWith("Gravidot!!", 0, 0);
    expect(mockCanvasContext.font).toBe("16px Pretendard");
    expect(mockCanvasContext.textAlign).toBe("center");
    expect(mockCanvasContext.textBaseline).toBe("middle");
  });

  test("applyShadow 는 그림자를 설정한다.", () => {
    const position: Position = { x: 0, y: 0 };
    const shape = new Shape({ position });

    shape.draw({ canvasRef: mockCanvasRef, transform: mockTransform });

    expect(mockCanvasContext.shadowColor).toBeDefined();
    expect(mockCanvasContext.shadowOffsetX).toBeDefined();
    expect(mockCanvasContext.shadowOffsetY).toBeDefined();
    expect(mockCanvasContext.shadowBlur).toBeDefined();
  });
});
