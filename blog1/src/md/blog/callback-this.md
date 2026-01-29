---
title: "콜백함수에서 this를 정하기 vs 제어권을 가진 코드가 this를 정하기"
date: "2024-09-28"
description: "this를 고정하는 두가지 경우 하나는 제어권을 가진 코드가 콜백 함수의 this를 설정하는 경우, 다른 하나는 콜백 함수 내부에서 this를 지정하는 경우. 이 두 상황에서 각각 언제 this를 정하게 되는지 궁금해서 찾아보았다."
tags: ["this", "자바스크립트", "콜백 함수"]
---


this 바인딩에 대해 배우면서, `bind()`, `call()`, `apply()`를 사용해 `this`를 설정하거나 고정할 수 있다는 것을 공부했다. 그런데 예제를 보다 보니 `this`를 고정하는 상황이 두 가지로 나뉜다는 점을 알았다. 하나는 **제어권을 가진 코드가 콜백 함수의 `this`를 설정하는 경우**, 다른 하나는 **콜백 함수 내부에서 `this`를 지정하는 경우**이다. 이 두 상황에서 각각 언제 `this`를 정하게 되는지 궁금해서 찾아보았다.

## 콜백 함수 내부에서 `this`를 지정해야 하는 상황

콜백 함수 내부에서 `this`를 지정해야 하는 상황은 주로 콜백이 호출되는 컨텍스트가 바뀌어서 `this`가 의도한 객체를 가리키지 않을 때 발생한다. 자바스크립트에서 `this`는 함수가 어떻게 호출되는지에 따라 동적으로 결정되므로, 콜백 함수가 의도한 `this`를 유지하기 위해 내부에서 `this`를 명시적으로 설정해야 할 경우가 있다.

### 1. 이벤트 핸들러에서 `this`를 유지해야 할 때

브라우저의 이벤트 핸들러는 기본적으로 `this`를 이벤트를 발생시킨 요소로 설정한다. 그러나 이벤트 핸들러 내부에서 다른 객체의 메서드를 호출하고 싶을 때, `this`가 올바르게 유지되지 않으면 문제가 발생할 수 있다.

**⭐️문제 - 이벤트 핸들러에서 `this` 가 유지되지 않는 상황**

```javascript
const buttonHandler = {
  name: 'ButtonHandler',
  handleClick: function() {
    console.log(this.name);
  }
};

const button = document.querySelector('button');

// 이벤트 핸들러를 할당할 때 this는 이벤트를 발생시킨 요소(버튼)가 된다
button.addEventListener('click', buttonHandler.handleClick);  // undefined
```

위 코드에서 `buttonHandler.handleClick`은 객체 `buttonHandler`의 메서드이므로 `this`가 `buttonHandler`를 가리켜야 한다. 하지만 `addEventListener`로 콜백을 전달하면, `this`는 이벤트를 발생시킨 버튼 요소가 되어, 의도한 `this`가 아니다.

**⭐️해결 - `bind()` 를 통해 `this` 고정**

```javascript
button.addEventListener('click', buttonHandler.handleClick.bind(buttonHandler));  // 'ButtonHandler'
```

`bind()`를 사용해 `this`를 `buttonHandler`로 고정해주면, 이벤트 핸들러 내부에서도 `this`가 `buttonHandler`를 가리키게 된다.

### 2. 타이머 함수에서 `this` 유지

`setTimeout()`이나 `setInterval()`에서 콜백 함수가 실행될 때 `this`는 전역 객체(`window` 또는 `undefined`가 될 수 있음)를 가리킨다. 그러나 콜백 내부에서 원래 객체의 메서드를 호출해야 할 때 `this`가 유지되지 않으면, 의도한 동작을 할 수 없다.

**⭐️문제 - 타이머 함수에서 `this` 가 유지되지 않는 상황**

```javascript
const obj = {
  name: 'MyObject',
  logName: function() {
    console.log(this.name);
  },

  startTimer: function() {
    setTimeout(function() {
      this.logName();  // this는 전역 객체를 가리키므로 오류 발생
    }, 1000);
  }
};

obj.startTimer();  // 오류 발생
```

`setTimeout` 내부에서 `this`는 전역 객체를 가리키기 때문에 `this.logName()`을 호출하면 오류가 발생한다.

**⭐️해결 - 화살표 함수를 이용해 `this` 를 고정**

```javascript
startTimer: function() {
  setTimeout(() => {
    this.logName();  // 화살표 함수로 this를 obj로 고정
  }, 1000);
}
```

화살표 함수를 사용하면 `this`는 상위 스코프의 `this`를 참조하므로, `setTimeout` 내부에서도 `this`가 `obj`를 가리키게 된다.

### 3. 콜백 함수가 외부 라이브러리나 API에서 호출될 때

외부 라이브러리나 API가 제공하는 함수에 콜백을 전달할 때, 해당 함수가 콜백을 호출하는 방식에 따라 `this`가 의도한 객체를 가리키지 않을 수 있다.

**⭐️문제 - 배열의 `map()` 메서드에서 `this` 가 전역 객체를 가리키는 상황**

`map()` 메서드는 배열의 각 요소에 대해 함수를 호출하지만, 기본적으로 콜백 함수의 `this`는 배열 자체가 아니라 전역 객체를 참조한다.

```javascript
const obj = {
  multiplier: 2,
  multiply: function(num) {
    return num * this.multiplier;  // this가 전역 객체를 참조하면 undefined
  }
};

const numbers = [1, 2, 3];
const results = numbers.map(obj.multiply);  // NaN
```

`obj.multiply`를 `map()`에 콜백으로 전달했지만, `this`가 전역 객체를 가리켜서 `this.multiplier`가 `undefined`로 처리된다.

**⭐️해결 - `bind()` 를 사용해 `this` 고정**

```javascript
const results = numbers.map(obj.multiply.bind(obj));  // [2, 4, 6]
```

`bind()`를 사용해 `this`를 `obj`로 고정하면, 콜백이 실행될 때도 `this`가 `obj`를 가리키게 되어 올바른 결과가 나온다.

### 4. 클래스 메서드와 `this` 문제

ES6 클래스에서 메서드를 이벤트 핸들러나 콜백으로 전달할 때도, `this`가 클래스 인스턴스를 가리키지 않게 되는 문제가 발생할 수 있다.

**⭐️문제 - 클래스 메서드를 콜백으로 전달 시 `this`가 클래스 인스턴스를 가리키지 않는 상황**

```javascript
class MyClass {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

const instance = new MyClass('JavaScript');

setTimeout(instance.sayName, 1000);  // undefined
```

`setTimeout`은 `this`를 전역 객체로 설정하기 때문에, `this.name`이 `undefined`가 된다.

**⭐️해결 - `bind()` 로 `this` 를 고정한다.**

```javascript
setTimeout(instance.sayName.bind(instance), 1000);  // 'JavaScript'
```

`bind()`로 `this`를 인스턴스로 고정해주면, `this.name`이 올바르게 인스턴스의 속성을 참조하게 된다.

## 정리

콜백 함수 내부에서 `this`를 지정해야 하는 상황은 주로 자바스크립트의 동적 `this` 바인딩 때문에 발생한다. `this`가 의도한 객체를 가리키지 않을 때(이벤트 핸들러, 타이머, 외부 API 등), 콜백 함수 내부에서 `this`를 명시적으로 고정해야 한다. 이러한 문제들은 `bind()`, 화살표 함수 등을 사용하여 `this`를 의도한 객체로 설정할 수 있다.

---

## 제어권을 전달받은 코드에서 `this`를 지정해야 하는 상황

제어권을 전달받은 코드에서 `this`를 지정해야 하는 상황은 주로 콜백 함수의 실행 문맥을 제어권을 가진 함수가 결정할 때 발생한다. 즉, 콜백 함수가 제어권을 가진 함수에 의해 호출되지만, 그 콜백 함수의 `this`가 적절한 객체를 참조해야 하는 상황에서 제어권을 가진 함수가 `this`를 명시적으로 지정해줘야 한다.

### 1. 다양한 컨텍스트에서 동일한 콜백 함수를 호출해야 할 때

제어권을 가진 함수가 다양한 객체 또는 다양한 컨텍스트에서 같은 콜백을 호출해야 하는 경우가 있다. 이때 콜백이 호출되는 시점마다 `this`가 다르게 설정될 수 있도록 제어권을 가진 함수에서 `this`를 명시적으로 설정해야 한다.

**⭐️예제 - 제어권을 가진 함수(`executeCallback`)가 `this`를 명시적으로 설정**

```javascript
function executeCallback(callback, context) {
  // context를 `this`로 설정하고 콜백 함수 호출
  callback.call(context);
}

const obj1 = { name: 'Object 1' };
const obj2 = { name: 'Object 2' };

function sayHello() {
  console.log('Hello from ' + this.name);
}

// 여러 객체에 대해 같은 콜백을 실행
executeCallback(sayHello, obj1);  // 'Hello from Object 1'
executeCallback(sayHello, obj2);  // 'Hello from Object 2'
```

제어권을 가진 함수(`executeCallback`)가 콜백을 호출할 때, 그 콜백이 참조할 `this`가 다른 객체를 가리키도록 해야 한다. 이 경우 `call()`을 사용하여 `this`를 동적으로 설정할 수 있다.

### 2. 콜백 함수가 동적으로 생성된 객체에 대해 동작해야 할 때

제어권을 가진 함수가 여러 객체를 동적으로 생성하고, 그 객체마다 콜백 함수가 다른 `this`를 참조해야 하는 상황이 있을 수 있다. 이러한 경우, 제어권을 가진 함수가 콜백이 호출될 때마다 적절한 `this`를 지정해줘야 한다.

**⭐️예제 - 제어권을 가진 함수가 콜백이 호출될 때마다 적절한 `this`를 지정**

```javascript
function createObjectsAndExecuteCallback(callback) {
  const obj1 = { name: 'Object 1' };
  const obj2 = { name: 'Object 2' };

 // 각 객체에 대해 콜백 함수 호출, `this`를 해당 객체로 설정
  callback.call(obj1);  // 'Hello from Object 1'
  callback.call(obj2);  // 'Hello from Object 2'
}

function sayHello() {
  console.log('Hello from ' + this.name);
}

createObjectsAndExecuteCallback(sayHello);
```

제어권을 가진 함수(`createObjectsAndExecuteCallback`)가 두 개의 객체를 생성한 후, 각각에 대해 같은 콜백 함수가 다른 `this`를 참조하도록 한다. 이 경우 `call()`을 사용해 동적으로 `this`를 설정할 수 있다.

### 3. 콜백 함수가 `this`에 의존하는 경우 (특정 문맥에서만 유효할 때)

콜백 함수가 `this`에 의존하여 동작하는 경우, 제어권을 가진 함수가 그 콜백이 실행되는 문맥을 설정해야 하는 상황이 발생한다. 이를테면, 콜백 함수가 특정 객체의 속성에 의존할 때, 그 객체를 `this`로 설정해야만 콜백 함수가 올바르게 동작할 수 있다.

**⭐️예제 - 제어권을 가진 함수가 그 콜백이 실행되는 문맥을 설정**

```javascript
const car = {
  brand: 'Toyota',
  getBrand: function() {
    console.log(this.brand);
  }
};

function executeCallback(callback, context) {
  callback.call(context);  // 특정 문맥에서 콜백 함수 실행
}

executeCallback(car.getBrand, car);  // 'Toyota'
```

여기서 제어권을 가진 함수(`executeCallback`)가 콜백 함수(`getBrand`)가 실행될 때 `this`를 명시적으로 설정하지 않으면 `getBrand()` 함수가 `this.brand`에 접근할 수 없게 된다. `call()`을 사용해 `this`가 `car`를 가리키도록 설정함으로써, 콜백이 올바르게 동작하게 된다.

### 4. 다양한 콜백 함수에 대해 동일한 제어권을 제공해야 할 때

여러 콜백 함수가 각각 다른 `this`를 필요로 하는 경우, 제어권을 가진 함수가 각 콜백 함수마다 다르게 `this`를 설정해줄 필요가 있다. 이러한 경우 제어권을 가진 함수는 각 콜백이 다른 객체를 참조하도록 유연하게 제어해야 한다.

**⭐️예제 - 제어권을 가진 함수가 각 콜백 함수마다 다르게 `this`를 설정**

```javascript
function executeMultipleCallbacks(callbacks, contexts) {
  callbacks.forEach((callback, index) => {
    callback.call(contexts[index]);  // 각 콜백에 맞는 `this` 설정
  });
}

const obj1 = { name: 'Object 1' };
const obj2 = { name: 'Object 2' };

function sayHello() {
  console.log('Hello from ' + this.name);
}

executeMultipleCallbacks([sayHello, sayHello], [obj1, obj2]);
// 'Hello from Object 1'
// 'Hello from Object 2'
```

제어권을 가진 함수(`executeMultipleCallbacks`)는 여러 콜백과 그에 맞는 컨텍스트를 받아, 각각의 콜백에 대해 다른 `this`를 설정해줄 수 있다.

### 5. 콜백 함수가 비동기적으로 호출될 때

비동기 작업에서 콜백 함수가 실행될 때, 콜백이 다른 `this`를 참조해야 하는 경우, 제어권을 가진 함수에서 적절히 `this`를 설정해줄 필요가 있다. 예를 들어, 여러 비동기 작업을 병렬로 실행하면서 각각의 콜백이 다른 문맥을 가리킬 때가 있다.

**⭐️예제 - 비동기 작업에서 콜백함수가 다른 `this` 를 참조 해야 할 때**

```javascript
function performAsyncTask(callback, context) {
  setTimeout(function() {
    callback.call(context);  // 비동기 작업 후 콜백 실행 시 `this` 설정
  }, 1000);
}

const obj = { name: 'Async Object' };

function logName() {
  console.log('Name:', this.name);
}

performAsyncTask(logName, obj);  // 1초 후 'Name: Async Object'
```

비동기 작업(`setTimeout`)이 완료된 후, 제어권을 가진 함수(`performAsyncTask`)는 콜백 함수가 실행될 때 `this`를 명시적으로 설정해야 한다. 그렇지 않으면 비동기 작업이 완료된 후 콜백 함수가 전역 객체를 참조하게 되어 잘못된 동작이 발생할 수 있다.

## 정리

제어권을 가진 함수에서 `this`를 지정해야 하는 상황은 주로 콜백 함수가 특정 객체나 문맥에 의존할 때, 제어권을 가진 함수가 콜백의 실행 시점을 제어하면서, 그 콜백이 적절한 `this`를 참조하도록 해야 할 때 발생한다. 주로 `call()`, `apply()`, `bind()` 등을 사용하여 콜백 함수가 참조할 `this`를 명시적으로 설정한다.