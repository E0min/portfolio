---
title: "Closer to closure"
date: "2024-09-30"
description: "Let's get closer to closure"
tags: ["자바스크립트", "클로저"]
---


클로저와 더 가까워지자. Let's get closer to closure

## 1. 클로저란?

클로저는 자바스크립트의 중요한 기능 중 하나로, **함수와 그 함수가 선언된 어휘적 환경(Lexical Environment)을 기억하는 메커니즘**이다. 클로저는 함수가 자신이 선언된 스코프(변수의 범위)에서 외부 함수의 변수를 참조할 수 있는 특성을 가지며, 외부 함수가 종료된 후에도 그 변수를 사용할 수 있다.

함수가 자신이 선언된 스코프에서 외부 함수의 변수를 참조할 수 있는 것은, `outerEnvironmentReference`를 통해 가능한 것은 알겠지만, 어떻게 외부함수가 종료된 후에도 그 변수를 사용할 수 있는지 정의를 봐도 바로 와닿지 않는다. 예시를 보면서 이해해보자.

### 예제 1 : 외부 함수의 변수를 참조하는 내부 함수

```javascript
var outer = function(){ // 외부함수
	var a = 1;
	var inner = function(){ // 내부함수
		console.log(a++);
	};
	inner();
};
outer();
```

`outer` 함수에서 변수 `a`를 선언했고, `outer`의 내부함수인 `inner`함수에서 `a`의 값을 1만큼 증가시킨 다음 출력한다. `inner`함수 내부에서는 `a`를 선언하지 않았기 대문에 `environmentRecord`에서 값을 찾지 못하므로 `outerenvironmentReference`에 지정된 상위 컨텍스트인 `outer`함수의 `LexicalEnvironment`에 접근해서 `a`를 찾는다. `outer` 함수의 실행 컨텍스트가 종료 되면 `LexicalEnvironment`에 저장된 식별자들(`a`, `inner`)에 대한 참조를 지운다. 참조하는 변수가 없게 되면 GC가 수거해 간다.

위의 예제는 외부함수가 종료되면 외부함수의 스코프에 있는 변수를 쓸 수 있는 상황이 아니다.

그러면 어떻게 외부함수가 종료된 후에도 그 변수를 사용할 수 있을까?

### 예제 2 : 외부 함수의 변수를 참조하는 내부 함수

```javascript
var outer = function() {
	var a = 1;
	var inner = function () {
		return ++a;
		};
	return inner;
};
var outer2 = outer();
console.log(outer2());  // ㄱ -- 2
console.log(outer2());  // ㄴ -- 3
```

위의 예제에서는 `outer`의 실행 컨텍스트가 종료된 후에도 `inner` 함수를 호출할 수 있게 만들었다. `outer`함수는 `inner`함수 자체를 리턴한다. `outer2` 변수는 `outer`의 실행 결과인 `inner` 함수를 참조하게 된다. 이후 `outer2`를 호출하면 앞서 반환된 `inner`가 실행된다. `inner`함수는 `outer` 함수 내부에서 선언되었으므로, `outer` 함수의 `LexicalEnvironment`가 담길 것이다.

**Q: 근데 `inner` 함수가 실행되는 ㄱ,ㄴ 시점에서 `outer`함수는 이미 실행이 종료되었는데, 어떻게 `outer`함수의 `LexicalEnvironment`에 접근할 수 있을까?**

**A:** GC는 어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 않는다. 위의 예제에서 `outer` 함수가 실행 종료 시점에 `inner`함수를 반환한다. `outer`의 실행이 종료되어도 `inner`함수의 `outerEnvironmentReference`가 `outer`함수의 `LexicalEnvironment`를 참조하므로 `outer`함수의 `LexicalEnvieonment`는 GC의 수거 대상에서 제외된다.

함수의 실행 컨텍스트가 종료된 후에도 `LexicalEnvieonment`가 GC의 수집 대상에서 제외되는 경우는 외부함수의 지역변수를 참조하는 내부함수가 외부로 전달된 경우가 유일하다. 즉, 내부함수의 `outerEnvironmentReference` 가 외부함수의 `LexicalEnvorionment`를 참조해 외부함수의 `LexicalEnvorionment`가 GC에 수거되지 않는 것이다.

**클로저란 이렇게 말할 수 있다.**

> 어떤 외부함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상이다.

## 2. 클로저와 메모리 관리

클로저는 외부 함수의 `LexicalEnvironment`를 의도적으로 GC에 수거되지 않도록 하는 방식으로 과도한 클로저의 사용은 메모리 낭비로 이어질 수 있다. 그래서 클로저가 더 이상 필요하지 않다면, 참조를 명시적으로 제거하는 것이 중요하다. 예를 들어, 클로저를 담고 있는 변수를 `null`로 설정하면, 자바스크립트 가비지 컬렉터가 해당 클로저와 그 내부에서 참조하고 있는 변수들을 메모리에서 해제할 수 있다.

**예제 - 클로저에서 참조를 명시적으로 제거**

```javascript
function outer() {
    let data = "important data";
    return function() {
        console.log(data);
    };
}

let closure = outer();
closure(); // "important data"
closure = null; // 클로저와 그 변수가 가비지 컬렉터에 의해 수집될 수 있음
```