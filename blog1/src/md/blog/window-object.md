---
title: "Window 객체로 할 수 있는것"
date: "2024-09-06"
description: "Window객체로 브라우저의 DOM과 BOM 요소에 접근할 수 있다. 못믿겠음 당장 크롬에 F12누르고 콘솔에console.log(window) 을 입력하도록 휴먼"
tags: ["자바스크립트"]
---


## 자바스크립트와 브라우저의 관계

자바스크립트는 프로그래밍 언어로서 웹 페이지에서 동적인 기능을 구현하는 데 사용된다. 자바스크립트는 다양한 환경에서 실행될 수 있고 브라우저는 그 중 하나의 실행 환경일 뿐이다. 예를 들어, 자바스크립트는 Node.js와 같은 브라우저 외부의 환경에서도 실행될 수 있다. 브라우저 또한 자바스크립트를 실행할 수 있는 하나의 플랫폼으로, 웹 페이지를 처리하고 표시하는 데 필요한 여러 객체를 제공한다. `window` 객체는 브라우저에서 제공하는 핵심 객체 중 하나이다.

## Window 객체란?

`window` 객체는 **브라우저 환경에서 제공하는 전역 객체**입니다. 웹 페이지가 로드될 때 생성되고, 웹 페이지와 관련된 모든 정보(예: DOM, URL, 타이머, alert/confirm 등)를 포함하고 있습니다.

*   `window`객체는 브라우저에 의해 자동으로 생성되며 웹 브라우저의 창을 나타낸다.
*   `window`객체는 브라우저의 객체지 javascript의 객체가 아니다. 자바스크립트 자체에는 `window`라는 객체가 포함되어 있지 않다. 이는 브라우저 환경에서만 제공되는 객체이기 때문이다.
*   `window` 객체는 브라우저의 글로벌 컨텍스트를 의미하며, 자바스크립트 코드에서 전역 객체로 동작한다. 글로벌 컨텍스트는 자바스크립트가 가장 처음 실행되었을 때의 기본 환경으로 자바스크립트 코드가 웹 페이지에서 실행될 때, 아무 함수나 객체 안에 있지 않은 코드들은 모두 글로벌 컨텍스트에서 실행된다. 브라우저에서는 이 글로벌 컨텍스트가 `window` 객체에 의해 나타난다. 즉, 브라우저에서 모든 전역 변수와 함수는 사실 `window` 객체의 속성으로 저장되는 것이다.

> 우리가 `var` 키워드를 이용해 만드는 전역변수도 브라우저에서 `window`객체에 저장된다. 그러나 `let`이나 `const`를 이용해 전역변수를 만들면 `window` 객체에 추가되지는 않는다. 혹시 그 이유를 알고 싶다면 이것을 누르도록!

## 그래서 Window객체로 무엇을 할 수 있나

`window` 객체를 통해 접근할 수 있는 브라우저 기능은 크게 **BOM**과 **DOM** 이 두 가지로 나눌 수 있다.

### BOM (Browser Object Model)

**BOM**은 브라우저 자체와 관련된 객체들을 다룬다. 즉, 브라우저 창, URL, 탐색 기록, 화면 정보 등 브라우저 그 자체와 상호작용할 수 있게 해주는 객체들로 구성된다.

### DOM (Document Object Model)

**DOM**은 웹 페이지의 구조와 관련된 객체들을 다룬다. 즉, HTML 문서의 각 요소(태그)와 그 속성을 자바스크립트로 제어할 수 있게 해주는 모델이다. 웹 페이지의 내용을 동적으로 수정하거나, 특정 요소에 이벤트를 추가하는 등의 작업이 가능하다.

*   **BOM**은 브라우저 환경(창, URL, 탐색 기록 등)을 다루고, **DOM**은 웹 페이지의 내용(HTML 문서 구조)을 다룬다.

> 혹시라도 자기가 지금 윈도우 객체로 다룰 수 있는 모든 것들을 알고싶다면 [MDN Window](https://developer.mozilla.org/ko/docs/Web/API/Window) 여기에서 확인할 수 있다.

```text
window
│
├── BOM
│   ├── window.location
│   ├── window.history
│   ├── window.navigator
│   └── window.screen
│
└── DOM
    ├── window.document
    ├── document.getElementById()
    ├── document.querySelector()
    └── document.createElement()
```

## 참고

*   [MDN Window](https://developer.mozilla.org/ko/docs/Web/API/Window)
*   [Velog - Window 객체는 무엇인가](https://velog.io/@jelkov/window-객체는-무엇인가)

profile
이영민