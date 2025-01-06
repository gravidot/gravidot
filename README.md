# Gravidot
[![display mode](https://github.com/user-attachments/assets/da9f10b1-0f8a-41f2-91de-dbf5eace8394)](https://www.gravidot.com/)

<div align="center">

### Play and share your ideas with multiple gestures!
#### 멀티터치로 아이디어를 연결하고 실시간 협업이 가능한 브레인스토밍 서비스

<br>
  
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fgravidot%2Fgravidot&count_bg=%2338A1FF&title_bg=%23141414&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://github.com/gravidot/gravidot)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fwww.gravidot.com&count_bg=%23FF641E&title_bg=%23000000&icon=livejournal.svg&icon_color=%23FFFFFF&title=Gravidot&edge_flat=false)](https://www.gravidot.com/)
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fmedium.com%2F%40howyoujini%2Fgravidot-0-1-0-%25EB%258B%25A4%25EA%25B0%2599%25EC%259D%25B4-%25EC%2595%2584%25EC%259D%25B4%25EB%2594%2594%25EC%2596%25B4%25EB%25A5%25BC-%25ED%2584%25B0%25EC%25B9%2598%25ED%2595%25B4%25EB%25B3%25BC%25EA%25B9%258C%25EC%259A%2594-%25EF%25B8%258F-f814499cd39c&count_bg=%2382F132&title_bg=%23000000&icon=medium.svg&icon_color=%23FFFFFF&title=Medium&edge_flat=false)](https://medium.com/@howyoujini/gravidot-0-1-0-%EB%8B%A4%EA%B0%99%EC%9D%B4-%EC%95%84%EC%9D%B4%EB%94%94%EC%96%B4%EB%A5%BC-%ED%84%B0%EC%B9%98%ED%95%B4%EB%B3%BC%EA%B9%8C%EC%9A%94-%EF%B8%8F-f814499cd39c)

</div>

<br>

## 목차
- [아이디어 등장 배경](#아이디어-등장-배경)
- [기능 소개](#기능-소개)
  - [1. 노드 생성](#1.-노드-생성-및-편집)
  - [2. 보드 편집](#2.-보드-편집)
- [기술 스택](#기술-스택)
- [고민했던 부분](#고민했던-부분)
  - [1. Canvas 기반의 도형 노드 편집](#1.-Canvas-기반의-도형-노드-편집)
  - [2. 멀티터치 hook 구현](#2.-멀티터치-hook-구현)

<br>

## [아이디어 등장 배경](#목차)
**멀티 터치를 활용해 아이디어 스케치와 구체화를 더욱 직관적이고 재밌게 만들어보자!**

데스크탑에서 기존의 키보드와 마우스 중심 생산성 도구는 창의적인 작업에서 클릭, 더블클릭, 드래그 등의 정형화된 경험을 제공합니다. 하지만 터치디바이스에서만큼은 멀티 터치를 통해 손가락의 자연스러운 움직임으로 다양한 입력 방식을 제공하여 아이디어 정리와 시각화를 도울 수 있을 것이라 생각했습니다. 특히, 두 손가락 이상의 제스처 기반 인터페이스는 복잡한 아이디어를 빠르게 구조화하거나 새로운 방식으로 노드를 편집할 수 있습니다. 멀티터치 인터페이스를 통해 창의적이고 실험적인 브레인스토밍 환경을 제공하려는 비전에서 출발했습니다.

## [기능 소개](#목차)

### [1. 노드 생성 및 편집](#목차)
(터치된 순서를 기준으로 손가락 번호가 부여됩니다.)

- **더블 클릭**: 도형 노드를 생성할 수 있습니다.
- **한 손가락 드래그**: 도형 노드의 위치를 변경할 수 있습니다.
- **두 손가락 핀치**: 두 손가락의 거리와 각도를 통해 도형 노드의 크기와 각도를 편집할 수 있습니다.
- **세 손가락**: 세 손가락 중, 1번째와 3번째의 각도를 통해 도형 노드의 꼭짓점을 편집할 수 있습니다.
- **네 손가락**: 네 손가락 중, 1번째와 4번째의 거리를 통해 도형 노드의 높이와 너비를 각각 조절할 수 있습니다.
- **다섯 손가락**: 다섯 손가락의 거리에 따라 도형 노드의 색을 변경할 수 있습니다.
- **도형 선택 후 좌우 드래그 8번 이상**: 도형 노드를 삭제할 수 있습니다.

![gravidot](https://github.com/user-attachments/assets/029d1eb4-dca5-4ac3-9cd2-79865b8bdb70)

### [2. 보드 편집모드](#목차)




<br>

## [기술 스택](#목차)
![next.js](https://img.shields.io/badge/next-141414?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue.svg?style=for-the-badge&logo=TypeScript&logoColor=white)
![zustand](https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white)
![tailwindcss](https://img.shields.io/badge/tailwindcss-61DAFB?style=for-the-badge&logo=tailwindcss&logoColor=white)

![supabase](https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

![ESLint](https://img.shields.io/badge/ESLint-FFD93E?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-pink?style=for-the-badge&logo=prettier&logoColor=white)
![npm](https://img.shields.io/badge/npm-red?style=for-the-badge&logo=npm&logoColor=white)
![vercel](https://img.shields.io/badge/vercel-f0f0f0?style=for-the-badge&logo=vercel&logoColor=black)

<br>

## [고민했던 부분](#목차)
### [1. Canvas 기반의 도형 노드 편집](#목차)

HTML5 Canvas 기반으로 직접 도형을 렌더링하고 위치, 크기, 색상, 회전 등 다양한 속성을 지원하는 Shape 클래스를 설계했습니다.
라이브러리 없이 멀티터치 입력을 직접 처리해, 여러 손가락으로 스케일 및 회전, 모양, 크기, 색상을 편집하는 기능 구현했습니다.

```ts
import { BoardTransform } from "@/entities/board/model";
import { darkenColor } from "@/shared/utils/darkenColor";
import { getRandomValue } from "@/shared/utils/getRandomValue";
import { RefObject } from "react";
import { Color, ColorType, Position, Size, Vertex, VertexType } from "./index";

export class Shape {
  position: Position;
  size: Size;
  vertex: Vertex;
  color: Color;
  content: string;
  isEditing: boolean = false;
  scale: number = 1;
  rotation: number = 0;

  constructor({
    position,
    size = { w: 120, h: 120 },
    color = getRandomValue(ColorType)().value,
    vertex = getRandomValue(VertexType)().value,
    content = "Touch Idea!",
    scale = 1,
    rotation = 0,
  }: {
    position: Position;
    size?: Size;
    color?: Color;
    vertex?: Vertex;
    content?: string;
    scale?: number;
    rotation?: number;
  }) {
    this.position = position;
    this.size = size;
    this.color = color;
    this.vertex = vertex;
    this.content = content;
    this.scale = scale;
    this.rotation = rotation;
  }

  draw({
    canvasRef,
    transform,
    isSelected,
  }: {
    canvasRef: RefObject<HTMLCanvasElement>;
    transform: BoardTransform;
    isSelected: boolean;
  }) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();

    this.applyTransform(ctx, transform);
    this.drawShape(ctx, transform);
    this.drawText(ctx);
    this.setEditing(ctx, isSelected);
    ctx.restore();
  }

  private applyTransform(
    ctx: CanvasRenderingContext2D,
    transform: BoardTransform
  ) {
    const fixedX = this.position.x / transform.zoomScale;
    const fixedY = this.position.y / transform.zoomScale;

    ctx.translate(fixedX, fixedY);
    ctx.rotate(this.rotation);
    ctx.scale(this.scale, this.scale);
  }

  private drawShape(ctx: CanvasRenderingContext2D, transform: BoardTransform) {
    ctx.fillStyle = this.color.fill;

    const width = this.size.w * transform.zoomScale;
    const height = this.size.h * transform.zoomScale;

    if (this.vertex === VertexType.circle) {
      ctx.beginPath();
      ctx.arc(0, 0, width * 0.8, 0, 2 * Math.PI);
    } else if (this.vertex === VertexType.square) {
      const halfSideW = width / Math.sqrt(2);
      const halfSideH = height / Math.sqrt(2);
      ctx.beginPath();
      ctx.rect(-halfSideW, -halfSideH, 2 * halfSideW, 2 * halfSideH);
    } else if (this.vertex === VertexType.star) {
      this.drawStar(ctx, width);
    } else {
      const sides = Math.min(this.vertex, 6);
      const angle = (2 * Math.PI) / sides;

      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const x = width * 0.9 * Math.cos(angle * i);
        const y = height * 0.9 * Math.sin(angle * i);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
    }

    ctx.fill();
  }

  private drawStar(ctx: CanvasRenderingContext2D, radius: number) {
    const outerRadius = radius;
    const innerRadius = radius / 2;
    const points = 5;
    const step = Math.PI / points;

    ctx.beginPath();

    for (let i = 0; i < 2 * points; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const x = r * Math.sin(i * step);
      const y = -r * Math.cos(i * step);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
  }

  private drawText(ctx: CanvasRenderingContext2D) {
    const maxWidth = this.size.w;
    const maxHeight = this.size.h;

    ctx.fillStyle = darkenColor(this.color.fill);
    ctx.font = "14px Pretendard";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeight = 20;

    const getLines = (text: string, maxWidth: number): string[] => {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + " " + word;
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    let lines = this.content
      .split("\n")
      .flatMap((line) => getLines(line, maxWidth));

    const maxLines = Math.floor(maxHeight / lineHeight);

    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      const lastLine = lines[lines.length - 1];
      let truncatedLine = lastLine;

      while (
        ctx.measureText(truncatedLine + "...").width > maxWidth &&
        truncatedLine.length > 0
      ) {
        truncatedLine = truncatedLine.slice(0, -1);
      }

      lines[lines.length - 1] = truncatedLine + "...";
    }

    const startY = -((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, index) => {
      ctx.fillText(line, 0, startY + index * lineHeight);
    });
  }

  private setEditing(ctx: CanvasRenderingContext2D, isEditing: boolean) {
    this.isEditing = isEditing;
    if (this.isEditing) {
      ctx.strokeStyle = darkenColor(this.color.fill);
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }

  setContent(ctx: CanvasRenderingContext2D, newContent: string) {
    this.content = newContent;
    this.drawText(ctx);
  }

  setPosition(newX: number, newY: number) {
    this.position.x = newX;
    this.position.y = newY;
  }

  setScale(newScale: number) {
    this.scale = newScale;
  }

  setRotate(angleInDegrees: number) {
    this.rotation = (angleInDegrees * Math.PI) / 180;
  }

  setVertex(newVertex: Vertex) {
    this.vertex = newVertex;
  }

  setSize(newW: number, newH: number) {
    this.size.w = newW;
    this.size.h = newH;
  }

  setColor(newColor: Color) {
    this.color = newColor;
  }
}
```

### [2. 멀티터치 hook 구현](#목차)

Web API 의 touch 인터페이스에서 제공해주는 속성을 통해 도형 노드 편집 기준을 작성했습니다.

```tsx
import { ColorType, VertexType } from "@/entities/node/model";
import { Shape } from "@/entities/node/model/shape";
import { useCallback, useRef, useState } from "react";

export function useMultiTouch(
  isActive: boolean,
  selectedShapeIndex: number | null,
  updateShape: (index: number, changes: Partial<Shape>) => void
) {
  const initialDistance = useRef<number | null>(null);
  const initialAngle = useRef<number | null>(null);
  const [touchPoints, setTouchPoints] = useState<{ x: number; y: number }[]>(
    []
  );
  const activeTouchType = useRef<string | null>(null);
  const endTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (!isActive || selectedShapeIndex === null) return;

      const touchCount = event.touches.length;
      activeTouchType.current = `${touchCount}touch`;

      if (touchCount === 2) {
        const [touch1, touch2] = event.touches;

        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
        ]);

        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        const currentAngle = Math.atan2(
          touch2.clientY - touch1.clientY,
          touch2.clientX - touch1.clientX
        );

        if (initialDistance.current === null || initialAngle.current === null) {
          initialDistance.current = currentDistance;
          initialAngle.current = currentAngle;
          return;
        }

        const scale = Math.max(
          0.5,
          Math.min(3, currentDistance / initialDistance.current)
        );
        const rotation =
          ((currentAngle - initialAngle.current) * 180) / Math.PI;

        updateShape(selectedShapeIndex, { scale, rotation });
      } else if (touchCount === 3) {
        const [touch1, touch2, touch3] = event.touches;

        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
          { x: touch3.clientX, y: touch3.clientY },
        ]);

        const angleRad = Math.atan2(
          touch3.clientY - touch1.clientY,
          touch3.clientX - touch1.clientX
        );

        let angleDeg = Math.abs(((angleRad * 180) / Math.PI) % 360);

        if (angleDeg > 30) {
          angleDeg = 30;
        }

        let selectedVertex;
        if (angleDeg <= 6) {
          selectedVertex = VertexType.circle;
        } else if (angleDeg <= 12) {
          selectedVertex = VertexType.square;
        } else if (angleDeg <= 18) {
          selectedVertex = VertexType.pentagon;
        } else if (angleDeg <= 24) {
          selectedVertex = VertexType.hexagon;
        } else {
          selectedVertex = VertexType.star;
        }

        updateShape(selectedShapeIndex, { vertex: selectedVertex });
      } else if (touchCount === 4) {
        const [touch1, touch2, touch3, touch4] = event.touches;

        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
          { x: touch3.clientX, y: touch3.clientY },
          { x: touch4.clientX, y: touch4.clientY },
        ]);

        const points = [
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
          { x: touch3.clientX, y: touch3.clientY },
          { x: touch4.clientX, y: touch4.clientY },
        ];

        const minX = Math.min(...points.map((point) => point.x));
        const maxX = Math.max(...points.map((point) => point.x));
        const minY = Math.min(...points.map((point) => point.y));
        const maxY = Math.max(...points.map((point) => point.y));

        const size = {
          w: Math.max(100, (maxX - minX) / 2),
          h: Math.max(100, maxY - minY),
        };

        updateShape(selectedShapeIndex, { size });
      } else if (touchCount === 5) {
        const [touch1, touch2, touch3, touch4, touch5] = event.touches;

        setTouchPoints([
          { x: touch1.clientX, y: touch1.clientY },
          { x: touch2.clientX, y: touch2.clientY },
          { x: touch3.clientX, y: touch3.clientY },
          { x: touch4.clientX, y: touch4.clientY },
          { x: touch5.clientX, y: touch5.clientY },
        ]);

        const distance = Math.hypot(
          touch5.clientX - touch1.clientX,
          touch5.clientY - touch1.clientY
        );

        let selectedColor;

        if (distance < 300) {
          selectedColor = ColorType.blue;
        } else if (distance < 340) {
          selectedColor = ColorType.green;
        } else if (distance < 380) {
          selectedColor = ColorType.pink;
        } else if (distance < 420) {
          selectedColor = ColorType.purple;
        } else if (distance < 460) {
          selectedColor = ColorType.yellow;
        } else {
          selectedColor = ColorType.transparent;
        }

        updateShape(selectedShapeIndex, { color: selectedColor });
      }
    },
    [isActive, selectedShapeIndex, updateShape]
  );

  const handleTouchEnd = useCallback(() => {
    if (endTimer.current) {
      clearTimeout(endTimer.current);
    }

    endTimer.current = setTimeout(() => {
      initialDistance.current = null;
      initialAngle.current = null;
      setTouchPoints([]);
      activeTouchType.current = null;
    }, 300);
  }, []);

  return { handleTouchMove, handleTouchEnd, touchPoints };
}
```

<br>
