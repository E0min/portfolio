---
title: "var, let, const 차이"
date: "2024-09-06"
description: "var보다 let과 const를 쓰자...!"
tags: ["자바스크립트"]
---


자바스크립트에는 변수의 타입이 없지만 변수를 선언할 때, `var`, `let`, `const`와 같은 변수 선언자를 이용한다. 변수 선언자를 이용하여 스코프와 재할당 가능 여부 등을 제어한다.

## 1. `var`

`var`는 ES6(ECMAScript 2015) 이전에 변수를 선언할 때 사용된 전통적인 방식이다.

### `var`의 스코프(범위)

*   `var` 변수가 함수 외부에서 선언될 때의 범위는 **전역**이다. 즉, 함수 블록 외부에서 `var`를 사용하여 선언된 모든 변수를 전체 윈도우 상에서 사용할 수 있는 것이다.
*   `var`가 함수 내에서 선언될 때는 **함수 범위**로 지정된다. 즉, 해당 함수 내에서만 사용하고 접근할 수 있다. 블록 스코프는 무시하고 함수 스코프를 가진다.

> 자바스크립트 초기에는 전역 변수를 전역 객체와 동일시하는 방식으로 설계되었기 때문에, 전역 스코프에서 `var`로 선언된 변수는 전역 객체의 속성이 되었다.

**var의 함수범위 scope(+블록스코프 무시) 예제**

```javascript
function myFunction() {
    var message = "Hello, World!"; // 함수 내에서 var로 선언된 변수
    console.log(message); // "Hello, World!" 출력
    if (true) {
        var x = 10; // if 블록 내에서 var로 변수 선언
    }
    console.log(x); // 10 (if 블록 밖에서도 접근 가능)
}

myFunction();

console.log(message); // Error: message is not defined
```

**var의 전역 범위 scope 예제**

```javascript
var greeter = "hey hi"; // 전역 변수

function newFunction() {
    var hello = "hello"; // 함수 범위 내의 변수
    console.log(hello); // "hello" 출력
}

newFunction();

console.log(greeter); // "hey hi" 출력
console.log(hello); // Error: hello is not defined
```

### `var`의 호이스팅

`var`의 **호이스팅(hoisting)**은 자바스크립트의 독특한 동작 방식 중 하나로, `var`로 선언된 변수가 해당 스코프의 최상단으로 “끌어올려지는” 것처럼 동작하는 현상을 의미한다. 하지만, 실제로 변수의 선언만 끌어올려지고 초기화나 할당은 원래의 위치에서 이루어진다. 그래서 초기화되기 전에 변수에 접근하면 `undefined`가 반환된다.

**호이스팅 예제**

```javascript
console.log(a); // undefined 출력
var a = 10;
console.log(a); // 10 출력
```

**호이스팅에 의해 자바스크립트 엔진이 해석하는 방식**

```javascript
var a;          // 선언이 호이스팅됨 (초기화와 할당은 아님)
console.log(a); // undefined (변수 a는 선언되었지만 값이 할당되지 않았기 때문에 undefined)
a = 10;         // 변수 a에 10 할당
console.log(a); // 10 (이제 a는 10으로 초기화됨)
```

### `var`의 특징: 재선언이 된다

일반적으로 여러 프로그래밍 언어에서 상수타입을 사용한 경우를 제외하고 변수에 값을 재할당 하는 것은 자연스럽다. 하지만 같은 범위 내에서의 재선언은 흔치 않다. 자바스크립트에서는 `var`로 선언된 변수를 동일한 스코프 내에서 재선언과 재할당이 가능하다.

**var의 재선언 및 재할당 예제**

```javascript
var b = 30; // 변수 b를 30으로 초기화
console.log(b); // 30 출력

var b = 40; // 동일한 변수 b를 다시 선언하고 40으로 초기화
console.log(b); // 40 출력
```

### `var`의 문제점

`var`은 같은 함수 범위 스코프 내에서 재선언과 재할당이 가능하다고 했다.

```javascript
var greeter = "hey hi";
var times = 4;

if (times > 3) {
    var greeter = "say Hello instead"; 
}

console.log(greeter) // "say Hello instead"
```

위 코드에서 의도적으로 `var greeter = "say Hello instead"`를 재선언 재할당했다면 괜찮지만 코드를 작성하는 사람이 변수 `var greeter = "hey hi"`가 이미 선언 되었고 할당 되었다는 것을 모른다면 문제가 된다. 의도치 않게 변수의 값이 변한 것이다.

## 2. `let`

현재는 `var`선언에 대한 개선을 반영한 `let`이 현재 변수 선언에서 선호되고 있다. 방금 다뤘던 `var`의 문제점을 해결할 수 있었던 이유들을 살펴보자.

### `let`의 스코프(범위)

`let`은 **블록 스코프(Block Scope)**를 가지는 변수 선언 키워드다. 이는 `let`으로 선언된 변수가 해당 블록 내에서만 유효함을 의미한다. 블록은 중괄호({})로 감싸진 코드 영역을 말하며, 함수, 조건문, 반복문 등의 코드 구조에서 자주 사용된다.

`let`과 `const`는 이러한 문제를 피하기 위해, 전역 스코프에서 선언되더라도 전역 객체의 속성으로 등록되지 않도록 설계되었다. 이는 코드의 예측 가능성을 높이고, 전역 네임스페이스 오염을 방지하는 데 도움이 된다. ES6에서 도입된 `let`과 `const`는 블록 스코프를 가지며, 이를 통해 변수의 범위를 명확하게 제한하고자 했다.

**let의 블록 스코프 예제**

```javascript
{
    let a = 1;
    {
        let a = 2;
        console.log(a); // 2 출력 (내부 블록의 a)
    }
    console.log(a); // 1 출력 (외부 블록의 a)
}

console.log(a); // ReferenceError: a is not defined
```

```javascript
let y = 'letVariable';
var x = 'hi';
console.log(window.x) // hi
console.log(window.y); // undefined 전역 스코이나 전역 객체에 등록되지 않음
console.log(y); //'letVariable'전역 스코프
```

### `let`의 호이스팅

`let` 키워드로 선언된 변수도 호이스팅(hoisting)이 발생한다. 하지만 `var`와 달리, `let`은 호이스팅되더라도 변수가 초기화되지 않은 상태로 남아 있으며, 이로 인해 변수가 선언되기 전에는 해당 변수에 접근할 수 없다. 이 구간을 **일시적 사각지대(Temporal Dead Zone, TDZ)**라고 부른다.

*   **일시적 사각지대(TDZ)**: 변수가 선언되기 전까지의 영역으로, 이 구간에서 변수를 사용하려고 하면 `ReferenceError`가 발생한다.
*   **왜 TDZ가 존재할까?**: TDZ는 코드를 더 안전하게 작성할 수 있도록 도와준다. 변수 선언 이전에 해당 변수에 접근하는 실수를 방지하며, 이로 인해 예측 가능한 코드 동작을 유지할 수 있다.

**함수 내에서의 let 호이스팅**

```javascript
function test() {
    console.log(y); // ReferenceError: Cannot access 'y' before initialization
    let y = 5;
    console.log(y); // 5
}

test();
```

### `let`의 특징: 재할당은 가능하나 재선언은 불가능하다

`var`와 마찬가지로 `let`으로 선언된 변수는 해당 범위 내에서 업데이트될 수 있다. 하지만, `var`와 달리 `let` 변수는 범위 내에서 다시 선언할 수 없다.

**동일한 범위에서 재선언 시 에러 발생**

```javascript
let greeting = "say Hi";
let greeting = "say Hello instead"; // error: Identifier 'greeting' has already been declared
```

동일한 변수가 다른 범위 내에서 정의된다면, 에러는 더 이상 발생하지 않는다.

```javascript
let greeting = "say Hi";
if (true) {
    let greeting = "say Hello instead";
    console.log(greeting); // "say Hello instead"
}
console.log(greeting); // "say Hi"
```

*   **오류가 없는 이유는 무엇일까?**: 두 예제가 서로 다른 범위를 가지므로 서로 다른 변수로 취급되기 때문이다. 따라서 `var`보다 `let`이 더 나은 선택이 될 수 있는 것이다. `let`을 사용하는 경우라면, 변수가 범위 내에서만 존재하기 때문에 이전에 이미 사용한 적이 있는 변수 명에 대해서 더 이상 신경쓰지 않아도 좋다. 또한, 범위 내에서 동일한 변수를 두 번 이상 선언할 수 없기 때문에 앞서 설명한 `var`의 문제가 발생하지 않는다. 이러한 특징들로 인해 `let`은 `var`보다 더 안전하고 예측 가능한 코드를 작성하는 데 유리하다.

## 3. `const`

### `const` 의 스코프(범위)

`let` 과 마찬가지로 **블록 스코프(Block Scope)**를 가지는 변수 선언 키워드다.

### `const` 의 호이스팅

`let`과 마찬가지로 `const` 선언도 맨 위로 끌어올려지지만, 초기화되지는 않는다.

### `const` 의 특징: 재할당도 안되고 재선언도 안된다

`const`로 선언된 변수는 값이 해당 범위 내에서 동일하게 유지된다. `const`로 선언된 변수는 선언과 동시에 초기화되지 않으면 자바스크립트에서 `SyntaxError`가 발생한다.

**const 는 재할당이 불가능하다.**

```javascript
const greeting = "say Hi";
greeting = "say Hello instead";// error: Assignment to constant variable.
```

**const 는 재선언이 불가능하다.**

```javascript
const greeting = "say Hi";
const greeting = "say Hello instead";// error: Identifier 'greeting' has already been declared
```

### `const` 와 참조형 변수

만약 기본형 타입의 변수를 `const` 로 선언했다면, 재할당은 불가능하다. `const`로 선언된 참조형 타입 변수는 참조(메모리 주소)가 변경되지 않기 때문에 새로운 객체나 배열로 재할당할 수 없지만, 객체나 배열의 프로퍼티나 요소는 변경할 수 있다.

profile
이영민