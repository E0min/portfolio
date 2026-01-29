---
title: "Variable Environment의 존재이유"
date: "2024-09-28"
description: "Variable Environment에 담기는 내용은 Lexical Environment와 같지만 복사한 Lexical Environment를 사용한다고 하는데 굳이 Variable Environment가 필요한 이유가 뭘까?"
tags: ["Variable Environmnet", "lexical environment", "실행 컨텍스트", "자바스크립트"]
---


Variable Environment에 담기는 내용은 Lexical Environment와 같지만 Variable Environment은 실행 컨텍스트가 최초 생성될 때의 스냅샷이고 이후에는 Variable Environment를 복사한 Lexical Environment를 사용한다고 하는데 굳이 Variable Environment가 필요한 이유가 뭘까?

*   **Variable Environment**: 실행 컨텍스트가 생성될 때 한 번 설정되는 변수들의 스냅샷. 즉, 초기 상태의 변수들을 기록해 둔다.
*   **Lexical Environment**: 실행 도중 실제로 사용되는 환경으로, 함수 실행 중에 변수의 상태가 동적으로 변화할 때 이를 반영하는 역할을 한다.

## 왜 Variable Environment가 필요한가?

자바스크립트에서 Variable Environment는 실행 컨텍스트가 생성될 때 변수의 초기 상태를 관리하고, 변수 호이스팅, 변경된 값 추적, 재귀 및 클로저 관리 등과 같은 중요한 기능을 제공하는 핵심 개념이다. 이를 통해 자바스크립트 엔진은 실행 중 변수를 효율적으로 관리하며, 다양한 상황에서 발생할 수 있는 문제를 해결할 수 있다. 이를 더 상세히 설명하겠다.

### 1. 호이스팅(Variable Hoisting) 처리

자바스크립트에서 변수 호이스팅이란, 변수가 선언된 위치와 상관없이 코드의 상단으로 끌어올려져 처리되는 현상을 말한다. 이는 코드 작성 시 혼란을 방지하고, 선언된 변수를 나중에 사용하려 할 때 예측 가능한 동작을 보장하기 위한 중요한 메커니즘이다.

**어떻게 동작하는가?:**

*   자바스크립트 엔진은 실행 컨텍스트를 생성할 때, 코드가 실제로 실행되기 전에 변수 선언부만 스캔하여 메모리에 저장한다. 즉, 변수 선언부는 코드 상단으로 끌어올려져 있는 것처럼 처리되며, 그 값은 초기화 이전에는 `undefined`로 설정된다.
*   이러한 변수 선언과 초기화가 **Variable Environment**에 저장된다.

**Variable Environment의 역할:**

*   Variable Environment는 변수 선언과 초기화 상태를 관리하는 공간으로, 호이스팅된 변수를 메모리 공간에 할당하고, 초기값을 저장한다.
*   예를 들어, 함수가 실행되기 전에 Variable Environment는 해당 함수에 선언된 모든 변수를 스캔하고, 이를 메모리 공간에 할당하여 이후 코드에서 참조할 수 있도록 준비한다.

**예제**

```javascript
console.log(x);  // undefined (호이스팅 발생)
var x = 10;
console.log(x);  // 10
```

위 코드에서 `console.log(x)`를 호출하기 전에 `x`가 선언되지 않은 것처럼 보이지만, 자바스크립트 엔진은 **Variable Environment**에서 `x`의 선언을 미리 인식하고 초기화 전의 값인 `undefined`를 반환한다. Variable Environment가 변수 선언과 초기화를 관리하며, 이후 실행 중에는 Lexical Environment가 변수의 변경된 값을 관리한다.

### 2. 상태의 초기 스냅샷 보존

Variable Environment는 함수가 처음 호출될 때의 변수를 기억하고, 함수 실행 도중이나 함수가 종료된 이후에도 초기 상태를 추적하는 역할을 한다. 이 초기 스냅샷은 함수가 실행될 때마다 새롭게 설정되며, 함수가 어떻게 호출되었는지에 대한 정보를 포함한다.

**초기 스냅샷의 역할:**

*   실행 컨텍스트가 생성될 때, Variable Environment는 변수 선언 시점의 상태를 기록한다. 이후 함수가 실행되면 Lexical Environment는 변수의 동적인 변화를 관리하지만, Variable Environment는 초기 상태를 유지한다.

**클로저와의 연관성:**

*   클로저는 함수가 선언된 당시의 렉시컬 환경을 기억하는 현상이다. Variable Environment는 함수가 선언될 때 그 시점의 변수 상태를 캡처하고, 클로저가 해당 변수를 나중에 참조할 때 초기 상태의 값을 제공한다.

**예제**

```javascript
function outer() {
  var x = 10;
  return function inner() {
    console.log(x);  // x는 outer의 스코프에 속한 변수
  };
}

const closure = outer();
closure();  // 10
```

`closure()`가 호출될 때, 함수 `inner`는 `outer` 함수의 렉시컬 환경을 기억하고 있으며, 이때 `x = 10`이라는 초기 상태가 유지된다. Variable Environment가 함수 호출 시 `x`의 초기값을 기억하고, 이를 클로저를 통해 나중에 접근할 수 있게 해준다.

### 3. 재귀 호출과 중첩 함수에서의 관리

자바스크립트에서 재귀 함수나 중첩 함수는 각 함수 호출마다 새로운 실행 컨텍스트가 생성되고, 각 호출에 대해 독립적인 환경이 필요하다. Variable Environment는 이러한 재귀적 호출이나 중첩 함수에서 각 실행 컨텍스트마다 고유한 변수 스냅샷을 유지하며, 이를 통해 변수 충돌이나 상태 관리 문제를 방지한다.

**재귀 호출:**

*   함수가 재귀적으로 호출될 때마다 새로운 실행 컨텍스트가 생성되며, 그때마다 각기 다른 Variable Environment가 설정된다. 이렇게 하면 각 호출 스택에서의 변수 상태를 독립적으로 유지할 수 있다.

**중첩 함수:**

*   중첩 함수는 외부 함수의 변수에 접근할 수 있는데, 이때도 Variable Environment는 각 중첩 함수에서 독립적인 변수 상태를 유지하는 데 중요한 역할을 한다.

**예제**

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));  // 120
```

재귀 함수 `factorial`이 실행될 때마다 새로운 실행 컨텍스트가 생성되고, 각각의 Variable Environment는 `n`에 대한 상태를 독립적으로 관리한다. 각 호출마다 `n`의 값이 달라지더라도 충돌 없이 값을 유지하며 계산할 수 있다.

### 4. 변경과 초기화를 구분

Lexical Environment는 실행 중 변수의 현재 상태를 반영하고, 그 값은 함수 실행 도중 동적으로 변화할 수 있다. 반면, Variable Environment는 초기 상태의 변수 값을 기억하고 있으므로, 초기화 상태와 변경된 상태를 구분할 수 있게 해준다.

**초기 상태와 변경된 상태의 관리:**

*   Variable Environment는 초기 값을 기록해두고, Lexical Environment는 그 값이 실행 중에 변경되더라도 이를 추적한다.
*   이는 디버깅 시 특정 시점의 변수를 복원하거나, 함수의 초기 상태를 참조해야 할 때 유용하다.

**실행 컨텍스트 내의 변수 관리:**

*   실행 컨텍스트가 생성될 때 변수는 Variable Environment에 초기화되며, 이후 값이 변경될 때는 Lexical Environment에서 이를 추적한다. 이로써 변수의 초기화와 변경 상태를 분리하여 관리할 수 있다.

**예제**

```javascript
function example() {
  var x = 1;  // Variable Environment에서 초기화
  x = 2;      // Lexical Environment에서 변경
  console.log(x);  // 2
}
```

`x = 1`이 처음 할당될 때 Variable Environment에 초기화되지만, `x = 2`로 변경될 때는 Lexical Environment에서 그 변경된 값을 반영한다. 이를 통해 자바스크립트 엔진은 초기 값과 현재 값의 차이를 명확히 추적할 수 있다.

## 정리

Variable Environment는 자바스크립트 엔진에서 변수의 초기 상태를 관리하는 핵심 요소이다. 변수 호이스팅, 초기 값 관리, 클로저와 재귀 함수 처리, 초기화와 변경 상태의 구분 등 다양한 측면에서 중요한 역할을 한다.

*   **호이스팅 처리**: 변수 선언과 초기화 상태를 추적하여 호이스팅을 구현하고, 변수 접근 시 예측 가능한 동작을 보장한다.
*   **초기 스냅샷 보존**: 함수가 호출될 때의 초기 변수를 저장하고, 클로저나 디버깅 시점에 해당 상태를 기억한다.
*   **재귀 호출과 중첩 함수 관리**: 각 실행 컨텍스트마다 독립적인 변수 상태를 유지하여 변수 충돌을 방지하고, 상태를 올바르게 관리한다.
*   **변경과 초기화 구분**: 변수의 초기화 상태와 변경 상태를 분리하여 추적할 수 있게 하여 코드 실행 흐름을 명확하게 한다.

이러한 이유로 자바스크립트 엔진은 Variable Environment와 Lexical Environment를 구분하여, 각기 다른 역할을 통해 효율적인 변수 관리와 스코프 처리 메커니즘을 제공한다.