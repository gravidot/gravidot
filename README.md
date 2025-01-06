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
  - [1. 무한 캔버스의 백그라운드 그리드 구현](#1.-무한-캔버스의-백그라운드-그리드-구현)
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
- 익명 로그인을 제공합니다. 사용자는 랜덤의 이름으로 보드를 이용할 수 있습니다.
- 보드의 제목을 편집할 수 있고, 새로운 보드를 생성할 수 있습니다.

![IMG_1258](https://github.com/user-attachments/assets/f0857451-a494-499d-91cf-884aced70373)

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
### [1. 무한 캔버스의 백그라운드 그리드 구현](#목차)
무한 캔버스의 백그라운드 그리드를 구현하는 방법은 두 가지가 있습니다

#### 1. SVG의 을 사용하는 방법

장점
	•	SVG는 벡터 기반으로, 크기를 늘리거나 줄여도 품질 저하 없이 렌더링되므로 확대/축소(Zoom)에도 선명한 출력을 제공합니다.
	•	<pattern> 태그를 사용하면 그리드 패턴을 보다 손쉽게 생성할 수 있습니다.
	•	DOM에 추가된 SVG 요소를 직접 조작하거나 스타일을 변경하기도 용이합니다. SVG는 자체적으로 내부 DOM을 생성하기 때문입니다.
	•	CSS와의 연동이 가능하여, fill 속성을 활용해 패턴 스타일링을 간편하게 할 수 있습니다.
	•	SVG는 브라우저의 GPU 가속을 활용하므로, 확대/축소 시 비교적 부드럽게 동작합니다.

단점
	•	DOM 요소가 많아질수록 성능 저하가 발생할 수 있습니다. 특히 복잡한 애니메이션이나 빠른 동작 처리 시 성능이 떨어질 가능성이 있습니다.
	•	정교한 그리드 패턴 제어가 어렵습니다.
	•	Canvas처럼 픽셀 단위로 세밀하게 점의 크기, 간격 등을 동적으로 변경하기에는 제약이 따릅니다.

#### 2. Canvas 태그 내에서 동적으로 생성하는 방법

장점
	•	Canvas는 벡터가 아닌 픽셀 단위로 렌더링되므로, 대규모 그래픽 처리에 적합하며 고성능을 발휘합니다.
	•	DOM 요소를 추가하지 않으므로, 대량의 점이나 복잡한 그래픽을 렌더링할 때 DOM 복잡도가 줄어들어 효율적입니다.
	•	동적 렌더링에 강점이 있습니다.
	•	JavaScript를 사용해 점의 크기, 간격, 위치 등을 실시간으로 제어할 수 있습니다.
	•	줌이나 팬과 같은 동작도 유연하게 처리할 수 있습니다.
	•	애니메이션 구현에 유리합니다.
	•	Canvas는 프레임 단위로 재렌더링을 처리하므로 자연스러운 애니메이션을 지원합니다.

단점
	•	화질 저하 가능성
	•	확대/축소 시 저해상도 느낌이 들 수 있습니다. 이 문제는 고해상도 Canvas 설정으로 어느 정도 완화할 수 있습니다.
	•	브라우저 크기가 변경되면 Canvas 크기를 다시 설정해야 하는 번거로움이 있습니다.
	•	이벤트 처리의 어려움
	•	Canvas는 픽셀 기반이기 때문에 DOM 이벤트와 직접적으로 연동하기 어렵습니다.
	•	특정 점이나 영역의 클릭 이벤트를 처리하려면 별도의 로직을 구현해야 합니다.

확대/축소 시 품질 유지, 구현의 간결성, CSS와의 연동, GPU 가속 지원, 그리고 DOM 조작의 유연성 때문에  SVG의 <pattern>을 채택했습니다.

### [2. 멀티터치 hook 구현](#목차)

Web API 의 touch 인터페이스에서 제공해주는 속성을 통해 도형 노드 편집 기준을 작성했습니다.

<br>
