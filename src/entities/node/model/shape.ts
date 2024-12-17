import { BoardTransform } from "@/entities/board/model";
import { darkenColor } from "@/shared/utils/darkenColor";
import { getRandomValue } from "@/shared/utils/getRandomValue";
import { RefObject } from "react";
import { Color, ColorType, Position, Shadow, Size, Vertex } from "./index";

export class Shape {
  position: Position;
  size: Size;
  vertex: number;
  color: Color;
  content: string;
  isEditing: boolean = false;

  constructor({
    position,
    size = { w: 120, h: 120 },
    color = getRandomValue(ColorType)().value,
    vertex = getRandomValue(Vertex)().value,
    content = "Touch Idea!",
  }: {
    position: Position;
    size?: Size;
    color?: Color;
    vertex?: number;
    content?: string;
  }) {
    this.position = position;
    this.size = size;
    this.color = color;
    this.vertex = vertex;
    this.content = content;
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
    this.applyShadow(ctx);
    this.applyTransform(ctx, transform);
    this.drawShape(ctx, transform);
    this.drawText(ctx);
    this.setEditing(ctx, isSelected);
    ctx.restore();
  }

  private applyShadow(ctx: CanvasRenderingContext2D) {
    ctx.shadowColor = Shadow.shadowColor;
    ctx.shadowOffsetX = Shadow.offsetX;
    ctx.shadowOffsetY = Shadow.offsetY;
    ctx.shadowBlur = Shadow.blur;
  }

  private applyTransform(
    ctx: CanvasRenderingContext2D,
    transform: BoardTransform
  ) {
    const fixedX = this.position.x / transform.zoomScale;
    const fixedY = this.position.y / transform.zoomScale;

    ctx.translate(fixedX, fixedY);
  }

  private drawShape(ctx: CanvasRenderingContext2D, transform: BoardTransform) {
    ctx.fillStyle = this.color.fill;

    const radius = this.size.w * transform.zoomScale;

    if (this.vertex === Vertex.circle) {
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.8, 0, 2 * Math.PI);
    } else if (this.vertex === Vertex.square) {
      const halfSide = radius / Math.sqrt(2);
      ctx.beginPath();
      ctx.rect(-halfSide, -halfSide, 2 * halfSide, 2 * halfSide);
    } else if (this.vertex === Vertex.star) {
      this.drawStar(ctx, radius);
    } else {
      const angle = (2 * Math.PI) / Math.min(this.vertex, 6);
      ctx.beginPath();

      for (let i = 0; i < this.vertex; i++) {
        const x = radius * 0.9 * Math.cos(angle * i);
        const y = radius * 0.9 * Math.sin(angle * i);
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
}
