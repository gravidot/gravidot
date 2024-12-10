import { BoardTransform } from "@/features/background/hooks";
import { darkenColor } from "@/shared/utils/darkenColor";
import { getRandomValue } from "@/shared/utils/getRandomValue";
import { RefObject } from "react";
import { Color, ColorType, Position, Shadow, Size, Vertex } from "./types";

export class Shape {
  position: Position;
  size: Size;
  vertex: number;
  rotate: number;
  color: Color;
  content: string;

  constructor({
    position,
    size = { w: 120, h: 120 },
    color = getRandomValue(ColorType)().value,
    vertex = getRandomValue(Vertex)().value,
    rotate = Math.floor(Math.random() * 45),
    content = "Touch Ideas!",
  }: {
    position: Position;
    size?: Size;
    color?: Color;
    vertex?: number;
    rotate?: number;
    content?: string;
  }) {
    this.position = position;
    this.size = size;
    this.color = color;
    this.vertex = vertex;
    this.rotate = rotate;
    this.content = content;
  }

  draw({
    canvasRef,
    transform,
  }: {
    canvasRef: RefObject<HTMLCanvasElement>;
    transform: BoardTransform;
  }) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();
    this.applyShadow(ctx);
    this.applyTransform(ctx, transform);

    this.drawShape(ctx, transform);

    ctx.restore();
    ctx.save();
    this.applyShadow(ctx);
    this.drawText(ctx, transform);

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
    const fixedX = (this.position.x + transform.x) / transform.zoomScale;
    const fixedY = (this.position.y + transform.y) / transform.zoomScale;
    ctx.translate(fixedX, fixedY);
    ctx.rotate((this.rotate * Math.PI) / 180);
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

  private drawText(ctx: CanvasRenderingContext2D, transform: BoardTransform) {
    const fixedX = (this.position.x + transform.x) / transform.zoomScale;
    const fixedY = (this.position.y + transform.y) / transform.zoomScale;
    ctx.translate(fixedX, fixedY);

    ctx.fillStyle = darkenColor(this.color.fill);
    ctx.font = "16px Pretendard";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.content, 0, 0);
  }
}
