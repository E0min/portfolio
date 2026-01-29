---
title: "__proto__ 가 생략 가능하다는 의미란 정확히 무엇인가?"
date: "2024-10-06"
description: "__proto__는 read와 write 시 동일한 동작을 수행하지 않는데 그 이유를 알아보자!"
tags: ["자바스크립트", "프로토타입"]
---


## `__proto__`가 생략 가능한 이유

`__proto__`가 생략 가능한 이유는 자바스크립트의 **프로토타입 체인**과 관련된 자동 탐색 메커니즘 덕분이다. 자바스크립트에서 객체는 직접적인 속성을 찾지 못하면 자동으로 프로토타입 체인을 탐색하면서 부모 객체(프로토타입)에서 해당 속성을 찾는다. 이 메커니즘 때문에 `__proto__`를 명시적으로 사용하지 않아도 자바스크립트는 프로토타입 체인에 접근할 수 있다.

## 프로토타입 체인

자바스크립트는 프로토타입 기반 언어다. 객체는 다른 객체의 속성이나 메서드를 상속받기 위해 프로토타입 객체와 연결된다. 이 연결은 프로토타입 체인을 통해 이루어지며, `__proto__`는 객체가 연결된 프로토타입 객체를 가리키는 속성이다. 객체의 프로퍼티 탐색을 자세히 살펴보자.

*   자바스크립트에서 객체의 속성을 접근할 때, 해당 속성이 그 객체에 존재하지 않으면, 자바스크립트는 자동으로 프로토타입 체인을 통해 부모 객체(프로토타입)를 탐색한다.
*   인스턴스에서 프로토타입 객체를 직접 참조하기 위해 `__proto__` 속성이 존재하지만, 이 속성을 명시적으로 사용할 필요는 없다. 자바스크립트는 기본적으로 객체가 참조하는 프로토타입에서 속성이나 메서드를 자동으로 탐색한다.

## 예제 - 프로토타입 체인

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const john = new Person("John");

john.sayHello();  // 자동으로 프로토타입에서 sayHello를 찾음
```

*   `john` 객체에는 직접 `sayHello` 메서드가 존재하지 않지만, 자바스크립트는 자동으로 `john.__proto__`(즉, `Person.prototype`)에서 `sayHello` 메서드를 찾아 실행한다.
*   `john.__proto__.sayHello`를 명시적으로 호출할 필요 없이 `john.sayHello()`로 호출할 수 있는 이유는 프로토타입 체인이 자동으로 동작하기 때문이다.

### 왜 `__proto__`가 생략 가능한가?

`__proto__`는 사실상 내부적으로만 동작하는 참조 속성이고, 일반적으로 객체의 프로토타입에 접근하기 위해 직접 사용할 필요는 없다. 이는 자바스크립트가 프로토타입 체인에서 필요한 속성이나 메서드를 자동으로 찾는 메커니즘을 제공하기 때문이다. 객체에 없는 속성이나 메서드가 자동으로 프로토타입을 통해 상속되고 사용될 수 있기 때문에, 우리는 객체에서 속성을 참조할 때 직접 `__proto__`를 명시하지 않고도 프로토타입 속성을 사용할 수 있다.

## proto는 생략 가능하다고 했는데 왜 두 결과가 차이가 날까?

```javascript
function Animal() {
  this.type = 'Animal';
}

function NewConstructor() {
  console.log('new constructor');
}

const dog = new Animal();
const cat = new Animal();

console.log(dog.constructor);  // Animal

dog.constructor = NewConstructor; // dog 인스턴스의 constructor를 직접 수정
console.log(dog.constructor);  // NewConstructor
console.log(cat.constructor);  // Animal
```

```javascript
function Animal() {
  this.type = 'Animal';
}

function NewConstructor() {
  console.log('new constructor');
}

const dog = new Animal();
const cat = new Animal();

dog.__proto__.constructor = NewConstructor;

console.log(dog.constructor);  // NewConstructor
console.log(cat.constructor);  // NewConstructor
```

### `__proto__` 는 Read 시에는 생략 가능하지만 Write할 때는 생략할 수 없다.

`dog.constructor`를 읽을 때 자바스크립트는 먼저 객체 자신(즉, `dog`)에 `constructor` 속성이 있는지 확인한다. 만약 객체 자체에 없다면, 프로토타입 체인을 탐색하여 `dog.__proto__`(즉, `Animal.prototype`)에서 `constructor` 속성을 찾는다. 따라서, **읽을 때** `dog.constructor` 에 객체가 없다면 , `dog.constructor` 와 `dog.__proto__.constructor`(또는 `Animal.prototype.constructor`)는 동일하게 동작한다. 이것이 "생략 가능하다"는 의미이다.

그러나 **쓰기(write)** 시에는 동작이 다르다. 자바스크립트에서 객체에 새로운 속성을 할당할 때는 그 속성이 인스턴스 자체에 추가된다. 즉, 프로토타입 체인에 있는 속성을 덮어쓰는 것이 아니라, 객체 자체에 새로운 속성이 추가되는 것이다.

### 두 코드의 동작 차이

#### 1. 인스턴스 자체에 constructor 설정

```javascript
dog.constructor = NewConstructor;  // 인스턴스인 dog에 직접 constructor 설정
```

이 코드는 `dog` 객체에 `constructor`라는 새로운 속성을 직접 추가한 것이다. 자바스크립트에서는 먼저 객체 자신의 속성을 탐색하고, 해당 속성이 없을 때 프로토타입 체인을 탐색한다. `dog.constructor = NewConstructor`를 설정했으니, `dog` 객체 자체에 `constructor` 속성이 생성된다. 

원래는 우리가 인스턴스에서 속성이나 메서드를 호출할 때, 해당 속성이 인스턴스에 직접 정의되어 있지 않다면 자바스크립트는 프로토타입 체인을 따라 올라가면서 해당 속성을 찾는다. 그러나 인스턴스 자체에 `dog.constructor`를 직접 설정한 경우 자바스크립트는 객체의 속성 탐색 순서에서 먼저 인스턴스 자체의 속성을 찾는다. 그래서 인스턴스 자체에 `constructor` 속성을 설정하면, 프로토타입에 있는 `constructor`를 덮어쓰지 않고 해당 인스턴스에만 적용된다.

이제 `dog.constructor`는 더 이상 프로토타입에 있는 `Animal.prototype.constructor`를 참조하지 않고, `dog` 객체에 직접 추가된 `NewConstructor`를 참조하게 된다. 하지만, `cat`은 여전히 프로토타입 체인을 통해 `Animal.prototype.constructor`를 참조하므로 `Animal`을 반환하게 된다.

#### 2. 프로토타입(`__proto__`)에 constructor 설정

```javascript
dog.__proto__.constructor = NewConstructor;  // 프로토타입 자체의 constructor를 변경
```

이 코드는 `dog.__proto__`, 즉 `Animal.prototype`의 `constructor` 속성을 변경한 것이다. `dog`와 `cat`은 모두 `Animal.prototype`을 공유하므로, `Animal.prototype.constructor`를 변경하면 `dog`와 `cat` 모두 변경된 `constructor` 값을 참조하게 된다. 즉, 프로토타입 레벨에서 변경된 내용은 해당 프로토타입을 사용하는 모든 객체에 적용된다.