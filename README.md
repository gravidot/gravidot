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

<br>

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


## 기술 스택 선정 및 이유

- 플랫폼: `Web`
    - 데스크톱/태블릿/모바일 모든 플랫폼에서도 브라우저 앱으로 접근할 수 있기 때문에 선정했습니다.
    - **태블릿** 사용자 편의성을 지원한다면 오프라인에서도 사용가능한 `PWA` 도 지원할 수도 있기 때문에 선정했습니다.

- 언어: `typescript`
    - 자바스크립트의 정적 타입을 지원하기 때문에, 이후 타입스크립트로 `type` 과 `interface` **설계를 더욱 용이**하게 하고 더 쉽게 **타입 오류를 잡을 수도** 있기 때문에 선정했습니다. 휴먼에러나 타입에러를 런타임 시점까지 보내지 않고, 오류를 발견하는 사이클을 줄일 수 있습니다.

- 프레임워크: `Next v15`
    - `React` 와 비슷한 생태계이기 때문에 Next 를 사용할 때 **러닝커브가 낮다고 판단**했습니다.
    - 바닐라 자바스크립트로 하기에는 명령형 UI이기 때문에 유지보수를 위해 **선언형 UI를 지원**하기 위해 선정했습니다.
    - **실시간 협업 페이지의 첫 로딩 속도가 중요**하다고 판단했기 때문에, SSR을 지원하는 Next 를 도입해보려고 합니다. ([**TTFB (Time to First Byte)를 약간 증가**시킬 수 있지만, 전체적인 FCP(First Contentful Paint)와 LCP(Largest Contentful Paint)가 개선됨](https://nextjs.org/conf/session/optimizing-lcp-partial-prerendering-deep-dive?utm_source))
    - 추가적으로 **브레인스토밍 템플릿을 지원**한다면 이런 정적 데이터는 **SSR를 통해 미리 렌더링**하여 클라이언트에 빠르게 제공할 수 있기 때문에 Next 를 도입하기로 결정했습니다.
    - Next 의 `Image` 컴포넌트를 사용해 **이미지 자동 최적화를** 지원받기 위해서 선정했습니다. 
    https://reactnext-central.xyz/blog/nextjs/image-component

- 그 외 라이브러리
    - `react-use-gesture` : 멀티제스쳐 인터페이스를 지원해줍니다.
        
        https://github.com/pmndrs/use-gesture : 데스크탑 / 패드 / 모바일 웹에서 일어날 수 있는 모든 제스쳐 이벤트들을 [테스트 코드](https://github.com/pmndrs/use-gesture/blob/main/test/pinch.test.tsx)를 거친 라이브러리를 도입하면 안정적으로 제스쳐를 핸들링할 수 있습니다. 또, 일반 브라우저 이벤트에는 없는 속도, 거리, 델타 등의 추가적인 kinematics(운동학적) 속성을 통해 업그레이드 된 제스처를 다룰 수 있습니다.
        
        **[초반결정 - 실시간협업 관련기능]**
        
    - [`socket.io`](http://socket.io) : 웹소켓과 소켓IO 는 조금 다른 특징이 있습니다. 웹 소켓의 경우, 대용량 데이터를 실시간으로 확인할 수 있는 예를 들어, 주식사이트 등이 유용하다고 생각합니다. 하지만 **gravidot** 서비스의 경우엔 socket.io 의 Room 이라는 개념이 좀 더 적합해보입니다. 하지만, 많은 이벤트의 양을 계속 보내야하는 부분을 신경 써야 할 것 같긴 합니다. [**Long Polling, Streaming**](https://doozi0316.tistory.com/entry/WebSocket%EC%9D%B4%EB%9E%80-%EA%B0%9C%EB%85%90%EA%B3%BC-%EB%8F%99%EC%9E%91-%EA%B3%BC%EC%A0%95-socketio-Polling-Streaming)
        
        또, [socket.io](http://socket.io) 의 경우, 특정 Port 를 통해 연결을 유지하며 양방향통신을 합니다. socket.io 는 js 를 이용하여 **브라우저 종류에 상관없이** 실시간 웹을 구현할 수 있습니다.
        
        - [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) : 실시간 협업을 지원하기 위해 클라이언트와 서버가 양방향 통신하도록 하는 프로토콜입니다. https://www.peterkimzz.com/websocket-vs-socket-io#websocket-vs-socketio
        
        https://socket.io/how-to/use-with-nextjs → `Next` 와도 [socket.io](http://socket.io) 는 호환가능합니다.
        
        ---
        
        **[좀 더 생각한 후, 더 나은 합리적인 결정 - 실시간협업 관련기능]**
        
        https://supabase.com/docs/guides/realtime 을 사용하면, 내부적으로 [socket.io](http://socket.io) 서버를 superbase 에서 따로 지원을 해주므로, `Vercel` 로 배포가 가능합니다.
        

- 번들링: [`Turbopack`](https://turbo.build/pack/docs) (Next.js 12 이후 실험적 도입)
    - Rust로 작성되어 훨씬 빠른 성능을 제공해줍니다.
    - dev 모드에서 더욱 빠른 핫 리로딩(Hot Reloading) 속도를 지원합니다.
    - Webpack과 비교해 더 낮은 리소스로 번들링할 수 있습니다.

- 테스트 도구: [`Jest`](https://jestjs.io/docs/getting-started) / [`Playwright`](https://playwright.dev/)
    - 타입스크립트 단위 테스트를 진행하기 위해 선정했습니다. https://jestjs.io/
    - `cypress` ****보다는 **여러 장치와 브라우저**에서 자동화된 UI 테스트를 진행해보고자 선정했습니다.
    https://playwright.dev/

- 환경 버전 관리: `nvm use 20.18.0` = `node@20.18.0`
    - next 나 여러 다른 라이브러리가 node version 18+ 이상일 때, 지원해주기 때문입니다.

- 상태관리: `Zustand`
    - 단순하고 가벼운 (Redux 처럼 보일러플레이트가 많지 않음) API로 복잡한 상태를 효율적으로 관리할 수 있기 때문에 선정했습니다.
    - WebSocket 과 결합하기 쉽습니다. 상태와 비동기 데이터 처리를 직관적으로 연동할 수 있습니다.
    - Next 와 쉽게 통합 가능합니다.

- 스타일링: `Tailwind CSS`
    - 코드 수가 줄고 핵심 비지니스 로직에 스타일 코드가 침범하지 않는다는 장점을 활용할 수 있습니다.
    - 다크모드나 반응형 디자인을 쉽게 구현할 수 있습니다.
    - PostCSS와 같은 플러그인 기반의 툴과 잘 통합됩니다.
        - autoprefixer가 css코드에 vender prefixes를 자동으로 추가해주어 브라우저 호환성 관리 용이합니다.

- 배포: `Vercel`
    
    [초반결정 - 배포]
    
    - `Vercel` 은 https://socket.io/how-to/use-with-nextjs 에서 적힌 이유로, websocket 을 지원하지 않기 때문에 `AWS` 배포가 필수 일 것 같습니다.
    - 하지만 Netlify 나 Vercel 의 경우, 정적 사이트 배포이므로, 대용량 트래픽을 지원해주지 않기 때문에 **로드 밸런싱**을 지원해주는 `AWS` 로 배포하고자 합니다.
    
    ---
    
    **[좀 더 생각한 한 후, 결정한 합리적인 사항 - 배포]**
    
    - [socket.io](http://socket.io) 를 활용하면, `Vercel` 을 사용할 수 없습니다. 이유는 로드밸런싱을 지원하지 않기 때문입니다. 하지만 superbase 의 realtime API 를 활용하면, Vercel 로 배포를 할 수 있기 때문에 이를 활용하기로 합리적인 결정을 하게 되었습니다.

- 형상관리도구: `git`
    - 파일과 폴더로 협업하기 위해 버전관리 시스템 선택했습니다.

- CI/CD: `Github Action`
    - 이미 github 을 사용하고 있어 github 과 `Github Action`의 통합으로 관리가 편하고, 무엇보다 간단하게 파이프라인을 작성할 수 있습니다.
    - 직접 commit 할 때마다 prettier, lint, test 를 수동으로 하지 않아도 되기 때문입니다.
    - 코드 변경 시 자동으로 테스트를 실행하여 기능이 깨지지 않도록 미리 테스트 해보려고 합니다.
    - 그리고 가능하다면, 여러 장치와 브라우저에서 자동화된 UI 테스트 실행해보면 좋을 것 같습니다.
    - `on` 스크립트에서 main 에 push/merge 되었을 때, 이벤트 시점을 정하여 자동배포할 수 있기 때문입니다.
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


<br>
