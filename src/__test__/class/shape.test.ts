import { BoardTransform } from "@/entities/board/model";
import { Shape } from "@/entities/shape/model";
import { ColorType, Position, Size, Vertex } from "@/entities/shape/types";
import { darkenColor } from "@/shared/utils/darkenColor";
import { RefObject } from "react";

const mockTextMetrics: TextMetrics = {
  width: 10 as number,
  actualBoundingBoxAscent: 0,
  actualBoundingBoxDescent: 0,
  actualBoundingBoxLeft: 0,
  actualBoundingBoxRight: 0,
  alphabeticBaseline: 0,
  emHeightAscent: 0,
  emHeightDescent: 0,
  fontBoundingBoxAscent: 0,
  fontBoundingBoxDescent: 0,
  hangingBaseline: 0,
  ideographicBaseline: 0,
};

const mockContext = {
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  fill: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  rect: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn().mockReturnValue(mockTextMetrics),
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
    getContext: jest.fn().mockReturnValue(mockContext),
  } as unknown as HTMLCanvasElement,
};

const mockCanvasRefWithNull = {
  current: null,
} as unknown as RefObject<HTMLCanvasElement>;

const mockCanvasRefWithNullCtx = {
  current: {
    getContext: jest.fn().mockReturnValue(null),
  },
} as unknown as RefObject<HTMLCanvasElement>;

const mockTransform: BoardTransform = {
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
    expect(shape.content).toBe("Touch Idea!");
  });

  test("draw 메서드 호출 시 컨텍스트 메서드를 반드시 호출할 수 있어야 한다.", () => {
    const position: Position = { x: 50, y: 50 };
    const shape = new Shape({ position });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockContext.save).toHaveBeenCalledTimes(1);
    expect(mockContext.restore).toHaveBeenCalledTimes(1);
    expect(mockContext.translate).toHaveBeenCalled();
    expect(mockContext.fill).toHaveBeenCalled();
  });

  test("drawText 는 텍스트를 올바르게 그려야 한다.", () => {
    const position: Position = { x: 0, y: 0 };
    const shape = new Shape({ position, content: "Gravidot!!" });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockContext.fillText).toHaveBeenCalledWith("Gravidot!!", 0, 0);
    expect(mockContext.font).toBe("14px Pretendard");
    expect(mockContext.textAlign).toBe("center");
    expect(mockContext.textBaseline).toBe("middle");
  });

  test("applyShadow 는 그림자를 설정한다.", () => {
    const position: Position = { x: 0, y: 0 };
    const shape = new Shape({ position });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockContext.shadowColor).toBeDefined();
    expect(mockContext.shadowOffsetX).toBeDefined();
    expect(mockContext.shadowOffsetY).toBeDefined();
    expect(mockContext.shadowBlur).toBeDefined();
  });
});

describe("Shape 클래스의 drawShape 메서드", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Circle을 그려야 한다", () => {
    const shape = new Shape({
      position: { x: 50, y: 50 },
      vertex: Vertex.circle,
      color: ColorType.blue,
    });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.arc).toHaveBeenCalledWith(0, 0, 96, 0, 2 * Math.PI);
    expect(mockContext.fill).toHaveBeenCalled();
  });

  test("Square를 그려야 한다", () => {
    const shape = new Shape({
      position: { x: 50, y: 50 },
      vertex: Vertex.square,
      color: ColorType.green,
    });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    const halfSide = 120 / Math.sqrt(2);

    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.rect).toHaveBeenCalledWith(
      -halfSide,
      -halfSide,
      2 * halfSide,
      2 * halfSide
    );
    expect(mockContext.fill).toHaveBeenCalled();
  });

  test("Star를 그려야 한다", () => {
    const shape = new Shape({
      position: { x: 50, y: 50 },
      vertex: Vertex.star,
      color: ColorType.pink,
    });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.moveTo).toHaveBeenCalled();
    expect(mockContext.lineTo).toHaveBeenCalled();
    expect(mockContext.closePath).toHaveBeenCalled();
    expect(mockContext.fill).toHaveBeenCalled();
  });

  test("Polygon 육각형을 그려야 한다", () => {
    const shape = new Shape({
      position: { x: 50, y: 50 },
      vertex: 6,
      color: ColorType.yellow,
    });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockContext.beginPath).toHaveBeenCalled();
    expect(mockContext.moveTo).toHaveBeenCalled();
    expect(mockContext.lineTo).toHaveBeenCalledTimes(5);
    expect(mockContext.closePath).toHaveBeenCalled();
    expect(mockContext.fill).toHaveBeenCalled();
  });

  test("도형의 색상이 올바르게 설정되어야 한다", () => {
    const shape = new Shape({
      position: { x: 50, y: 50 },
      vertex: Vertex.square,
      color: ColorType.purple,
    });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockContext.fillStyle).toBe(darkenColor(ColorType.purple.fill));
  });
});

describe("shape.draw 메서드에서 canvas와 context를 확인한다.", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("canvas가 null일 경우 draw 메서드가 종료되어야 한다.", () => {
    const shape = new Shape({
      position: { x: 50, y: 50 },
      vertex: Vertex.square,
      color: ColorType.green,
    });

    shape.draw({
      canvasRef: mockCanvasRefWithNull,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockCanvasRefWithNull.current).toBeNull();
    expect(mockContext.save).not.toHaveBeenCalled();
  });

  test("ctx가 null일 경우 draw 메서드가 종료되어야 한다.", () => {
    const shape = new Shape({
      position: { x: 50, y: 50 },
      vertex: Vertex.square,
      color: ColorType.green,
    });

    shape.draw({
      canvasRef: mockCanvasRefWithNullCtx,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockCanvasRefWithNullCtx.current?.getContext).toHaveBeenCalledWith(
      "2d"
    );
    expect(mockContext.save).not.toHaveBeenCalled();
  });

  test("canvas와 ctx가 모두 존재할 경우 draw 메서드가 정상적으로 실행되어야 한다.", () => {
    const shape = new Shape({
      position: { x: 50, y: 50 },
      vertex: Vertex.square,
      color: ColorType.green,
    });

    shape.draw({
      canvasRef: mockCanvasRef,
      transform: mockTransform,
      isSelected: false,
    });

    expect(mockCanvasRef.current?.getContext).toHaveBeenCalledWith("2d");
    expect(mockContext.save).toHaveBeenCalled();
    expect(mockContext.restore).toHaveBeenCalled();
  });
});
