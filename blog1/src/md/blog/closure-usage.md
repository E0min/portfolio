---
title: "클로저를 어디에다가 써요?"
date: "2024-10-01"
description: "클로저 활용방법에 대해 알아봅시다"
tags: ["자바스크립트", "클로저"]
---

클로저는 자바스크립트의 중요한 기능 중 하나로, **함수와 그 함수가 선언된 어휘적 환경(Lexical Environment)을 기억하는 메커니즘**이다. 클로저는 함수가 자신이 선언된 스코프(변수의 범위)에서 외부 함수의 변수를 참조할 수 있는 특성을 가지며, 외부 함수가 종료된 후에도 그 변수를 사용할 수 있다.

이전 게시글에서 클로저가 무엇인지에 대해 공부했다. 이번엔 클로저가 어디에 사용되는지에 대해서도 알아보자.

## 1. 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때

**예제 - 콜백함수와 클로저 1**

```javascript
var fruits = ['apple', 'banana', 'peach'];

var $ul = document.createElement('ul'); // 공통 코드

fruits.forEach(function (fruit) {       // (A)
  var $li = document.createElement('li');
  $li.innerText = fruit;

  $li.addEventListener('click', function () {   // (B)
    alert('your choice is ' + fruit);
  });

  $ul.appendChild($li);
});

document.body.appendChild($ul);
```

해당 코드에서는 배열 `fruits` 에 대해 `foreach` 를 활용해서 dom 요소들을 생성하는 코드이다. 이벤트 리스너에 콜백 함수로 들어간 부분에서 외부함수의 변수인 `fruit` 이 필요하므로, 클로저가 있다. 여기서 만약 콜백 함수가 재활용이 가능한 함수여서 외부에 선언했다고 생각해보자.

**예제 - 콜백함수와 클로저-2**

```javascript
var fruits = ['apple', 'banana', 'peach'];

var $ul = document.createElement('ul'); // 공통 코드
var alertFruit = function (fruit) {
    alert('your choice is ' + fruit);
  };
fruits.forEach(function (fruit) {       // (A)
  var $li = document.createElement('li');
  $li.innerText = fruit;

  $li.addEventListener('click', alertFruit);

  $ul.appendChild($li);
});

document.body.appendChild($ul);
alertFruit(fruits[1]);
```

주어진 코드에서 `addEventListener`에 전달된 `alertFruit` 함수는 `function (fruit)`으로 정의되어 있다. `addEventListener`는 이벤트가 발생할 때 자동으로 첫 번째 인자로 이벤트 객체를 콜백 함수에 전달하므로 `alertFruit` 함수는 `fruit` 대신 이벤트 객체를 받게 된다. 이 때문에 `alertFruit`가 호출될 때 `fruit`에는 클릭된 `<li>`에 해당하는 과일 이름이 아닌 이벤트 객체가 전달된다.

**Q1: 콜백함수를 `alertFruit(fruit)`으로 전달하면 되는 것이 아닌가?**

**A1:** 이 궁금증을 해결하기 위해서는 함수 호출과 함수 전달의 차이를 알아야 한다. `alertFruit(fruit)`는 함수 호출이다. 이 코드를 작성하면 즉시 `alertFruit`가 호출되고 그 결과를 `addEventListener`에 전달하려는 의도가 된다. 반면 `addEventListener`에 전달해야 하는 것은 함수 호출이 아니라 함수 그 자체이다. `alertFruit()`은 이벤트가 발생할 때만 호출되어야 하므로 콜백 함수로 전달해야 한다.

**Q2: `var alertFruit = function () {alert('your choice is ' + fruit);};` 함수를 이렇게 작성하면 안되나?**

**A2:** `alertFruit` 함수는 `fruit`라는 변수를 참조하고 있다. 하지만 이 `fruit` 변수는 함수 내에서 선언되지 않았으며, 함수 바깥에서 정의된 변수를 참조하려고 하고 있다. 하지만 `alertFruit`가 정의될 때 `fruit` 변수가 전역 변수로 선언되지 않았기 때문에, 함수 내부에서 `fruit`를 참조할 수 없다.

`addEventListner` 함수는 콜백함수를 호출할 때 첫 번째 인자에 ‘이벤트 객체’를 주입하는 문제는 `bind`함수를 사용하면서 해결할 수 있다.

**예제 - 콜백 함수와 클로저**

```javascript
var fruits = ['apple', 'banana', 'peach'];

var $ul = document.createElement('ul'); // 공통 코드
var alertFruit = function (fruit) {
    alert('your choice is ' + fruit);
  };
fruits.forEach(function (fruit) {       // (A)
  var $li = document.createElement('li');
  $li.innerText = fruit;

  $li.addEventListener('click', alertFruit.bind(null,fruit));

  $ul.appendChild($li);
});

document.body.appendChild($ul);
alertFruit(fruits[1]);
```

다만 이 방식을 사용하게 된다면 이벤트 객체가 인자로 넘어오는 순서가 바뀌는 점과 함수 내부에서의 `this`가 원래의 그것과 달라지는 점을 감안해야 한다. 인자가 넘어오는 순서가 바뀐다는 말은 `bind()`를 사용하면 함수의 첫 번째 인자부터 고정된 값이 전달되기 때문에, 이벤트 객체는 그 이후에 오는 인자로 처리된다는 뜻이다. 기본적으로 `addEventListener`가 호출될 때 이벤트 객체가 콜백 함수에 자동으로 첫 번째 인자로 전달되지만, `bind`를 사용하면 이벤트 객체는 두 번째 또는 그 이후의 인자로 전달된다. 그래서 만약 함수 내부에서 이벤트 객체를 사용하고 싶다면, 다음과 같이 인자를 맞춰서 처리해야 한다.

```javascript
var alertFruit = function (fruit, event) {
  alert('your choice is ' + fruit);
  console.log(event.type);  // 이벤트 객체에서 'click' 출력
};
```

이 모든 문제들을 해결하는 방법은 고차함수를 활용하는 것이다. 고차함수란 함수를 인자로 받거나 리턴하는 함수이다.

**예제 - 콜백함수와 클로저**

```javascript
var fruits = ['apple', 'banana', 'peach'];

var $ul = document.createElement('ul'); // 공통 코드

var createAlertFruitHandler = function (fruit) {
  return function (event) {   // 클릭 이벤트에 사용할 콜백 함수 반환
    alert('your choice is ' + fruit);   // fruit 값 사용
    console.log('이벤트 객체:', event);  // 이벤트 객체도 사용 가능
  };
};

fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerText = fruit;

  // 고차 함수를 사용하여 클릭 이벤트 핸들러 생성
  $li.addEventListener('click', createAlertFruitHandler(fruit));

  $ul.appendChild($li);
});

document.body.appendChild($ul);
```

고차 함수 `createAlertFruitHandler(fruit)` 함수는 `fruit` 값을 인자로 받아서, 실제로 클릭 이벤트가 발생했을 때 호출될 클릭 이벤트 핸들러 함수를 반환한다. 반환된 함수는 `fruit` 값을 클로저로 캡처하여, 클릭 이벤트가 발생할 때도 `fruit` 값을 참조할 수 있게 된다. `createAlertFruitHandler(fruit)`는 `addEventListener`에 고차 함수의 반환값을 전달하고 각 `fruit`에 맞는 클릭 이벤트 핸들러를 반환하므로, `addEventListener`에 이 반환된 함수를 등록한다. 이 방식으로, 각 `li`가 클릭될 때마다 적절한 `fruit` 값이 출력된다.

## 2. 정보 은닉

정보 은닉이란  객체 내부의 상태(변수)를 외부에서 직접 접근하지 못하게 보호하고, 오직 필요한 함수들(메서드)만을 통해서 그 상태를 변경하거나 조회할 수 있게 하는 방식이다. 이를 통해 데이터를 의도하지 않게 변경하거나 조작하는 실수를 방지할 수 있다. 자바스크립트에는 `private`, `protected`와 같은 접근 제어자가 존재하지 않지만 클로저를 통해 `public` 값과 `private` 한 값을 구분하는 것이 가능하다.

외부에 제공하고자 하는 정보들을 모아서 `return` 하고, 내부에서만 사용할 정보들은 `return` 하지 않는 것으로 접근 권한 제어가 가능하다.

**접근권한 제어하는 법**

1. 함수에서 지역변수 및 내부함수 등을 생성한다.
2. 외부에 접근권한을 주고자 하는 대상들로 구성된 참조형 데이터를 `return` 한다.

**예시 - 정보 은닉이 안되는 코드**

```javascript
var car = {
    fuel: Math.ceil(Math.random() * 10 + 10),  // 연료 (L)
    power: Math.ceil(Math.random() * 3 + 2),   // 연비 (km/L)
    moved: 0,  // 총 이동거리

    run: function () {
        var km = Math.ceil(Math.random() * 6);  // 이동할 거리 (0~6 km 랜덤)
        var wasteFuel = km / this.power;  // 이동에 필요한 연료량 계산

        if (this.fuel < wasteFuel) {  // 연료가 부족하면
            console.log('이동불가');  // 이동 불가 메시지 출력
            return;
        }

        this.fuel -= wasteFuel;  // 연료를 소비
        this.moved += km;  // 이동 거리 업데이트
        console.log(km + 'km 이동 (총 ' + this.moved + 'km). 남은 연료: ' + this.fuel);
    }
};
```

위의 코드는 `car.fuel` , `car.power` , `car.moved` 을 통해 객체 내부의 프로퍼티에 접근할 수 있다. 그래서 데이터가 의도치 않게 조작되거나 변경될 가능성이 있다. 클로저를 이용해서 위의 코드에 접근 제한을 줘보자.

**예시 - 클로저를 이용해서 객체 내부의 프로퍼티에 접근이 제한된 코드**

```javascript
var createCar = function () {
    var fuel = Math.ceil(Math.random() * 10 + 10);  // 비공개 변수: 연료(L)
    var power = Math.ceil(Math.random() * 3 + 2);   // 비공개 변수: 연비(km/L)
    var moved = 0;  // 비공개 변수: 이동거리

    return {
        get moved() {  // 총 이동 거리 반환 (읽기만 가능)
            return moved;
        },
        run: function () {
            var km = Math.ceil(Math.random() * 6);  // 이동할 거리 (0~6 km 랜덤)
            var wasteFuel = km / power;  // 이동에 필요한 연료 계산

            if (fuel < wasteFuel) {
                console.log('이동불가');  // 연료가 부족하면 이동 불가 메시지
                return;
            }

            fuel -= wasteFuel;  // 연료 소비
            moved += km;  // 이동 거리 업데이트
            console.log(km + 'km 이동 (총 ' + moved + 'km). 남은 연료: ' + fuel);
        }
    };
};
```

이 코드에서 `fuel`, `power`, `moved`는 비공개(private) 변수이다. 이는 함수 내부에서 선언되어 외부에서 직접 접근할 수 없다. 오직 반환된 객체의 메서드를 통해서만 이 변수들에 접근하거나 조작할 수 있다.

```javascript
car.run();
console.log(car.moved); // getter도 리턴되었으므로 3 출력
console.log(car.fuel); // undefined
console.log(car.power); // undefined
```

## 3. 부분 적용 함수

부분 적용 함수는 함수의 일부 인자만 고정하고, 나머지 인자는 나중에 채워넣을 수 있도록 만드는 함수 패턴이다.

**예시 - `bind`를 통한 부분 적용 함수 구현**

```javascript
var add = function () {
    var result = 0;
    for (var i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
};
var addPartial = add.bind(null, 1, 2, 3, 4, 5);
console.log(addPartial(6,7,8,9,10));
```

`add` 함수는 `this`를 사용하지 않기 때문에 굳이 `this` 값을 설정할 필요가 없다. 그래서 `bind()`에서 `this` 자리에 `null`을 넣어도 함수가 정상적으로 동작한다. 그러나 `this`의 값을 변경할 수밖에 없기 때문에 메서드에서는 사용할 수 없을 것 같다. 메서드(객체 내부의 함수)는 보통 해당 객체를 가리키는 `this` 값을 사용한다. 그런데 `bind()`는 `this` 값을 고정시키는 메서드이기 때문에, 메서드 내부에서 `this`를 사용하는 경우 `bind()`로 인해 원래 참조해야 할 객체를 참조하지 못할 수도 있다. 그래서 메서드에서는 `this`를 고정하는 `bind()`를 사용하는 것이 적절하지 않을 수 있다.

`bind()` 대신 클로저를 이용한 부분 적용 함수로 메서드에서 `this` 문제를 해결할 수 있다. `bind()`를 사용하면 `this` 값이 고정된다. 하지만 메서드에서는 `this`가 해당 객체를 참조해야 하므로, `bind()` 를 남용하면 `this`가 원래 참조해야 하는 객체를 참조하지 못하게 되어 문제가 발생할 수 있다.

**예시 - 클로저를 이용해 부분 적용 함수 구현**

```javascript
function add() {
    let result = 0;
    for (let i = 0; i < arguments.length; i++) {
        result += arguments[i];
    }
    return result;
}

// 클로저를 이용한 부분 적용 함수 생성기
function partialApply(fn, ...fixedArgs) {
    return function(...remainingArgs) {
        return fn(...fixedArgs, ...remainingArgs);
    };
}

// 기존 add 함수의 일부 인자를 고정한 부분 적용 함수
const addPartial = partialApply(add, 1, 2, 3, 4, 5);

// 나머지 인자를 전달해서 최종 계산
console.log(addPartial(6, 7, 8, 9, 10));  // 55
```

`partialApply()` 함수는 부분 적용 함수 생성기이다. 첫 번째 인자로 원본 함수(여기서는 `add`), 두 번째 인자로 고정할 인자들을 받는다.
내부에서는 클로저를 통해 `fixedArgs`(고정된 인자들)를 기억하고, 반환된 함수가 호출될 때 나머지 인자들(`remainingArgs`)을 함께 전달받는다.
반환된 함수는 `fixedArgs` 와 `remainingArgs`를 모두 결합하여 원본 함수(`add`)를 호출한다.

위와 같이 클로저를 이용해서 이번엔 객체의 메서드에서 `this`를 고정하지 않으면서 부분 적용 구현을 해보자. 그러기 위해서는 객체의 메서드를 다른 곳에 전달하거나, `this` 값이 바뀌는 상황에서 `this`가 원래 객체를 가리키지 못하는 문제를 해결해야 한다.

```javascript
const car = {
    speed: 100,
    drive: function(km) {
        console.log(`이동 거리: ${km}km, 속도: ${this.speed}km/h`);
    }
};

// 클로저를 사용한 부분 적용 함수
function partialApplyMethod(method, ...fixedArgs) {
    return function(...remainingArgs) {
        return method.call(this, ...fixedArgs, ...remainingArgs);  // 클로저로 this를 유지한 채로 호출
    };
}

// drive 메서드의 일부 인자(10km)를 고정한 함수
car.drive10 = partialApplyMethod(car.drive, 10);

// this는 여전히 car 객체를 참조
car.drive10();  // "이동 거리: 10km, 속도: 100km/h"
```

*   `partialApplyMethod()` : 이 함수는 부분 적용 함수와 비슷하게 동작하지만, `this` 가 바뀌지 않도록 `method.call(this, ...)` 을 사용하여 현재의 `this` 값을 유지한 상태로 메서드를 호출한다. 그리고 클로저를 사용하여 고정된 인자들(`fixedArgs`)를 기억하고, 나머지 인자들(`remainingArgs`)을 전달받아 메서드에 넘긴다.
*   `car.drive10` : `car.drive` 메서드의 일부 인자(10)를 고정한 새로운 함수이다. 이 함수는 호출될 때 자동으로 `this`가 `car` 객체를 참조한다. `car.drive10()`을 호출하면, `this`는 여전히 `car` 객체를 가리키며, 고정된 인자(10)와 함께 메서드가 실행된다.

## 4. 커링 함수

커링은 하나의 함수가 여러 인자를 한꺼번에 받는 대신, 하나의 인자만 받아서 그 인자를 처리하고 나머지 인자를 받는 새로운 함수를 반환하는 방식이다. 부분 적용 함수와 비슷하지만 커링은 한 번에 하나의 인자만 전달하는 것이 원칙이다.

커링 함수를 구현할 때 클로저를 활용하면 유용하다. 클로저는 외부 함수에서 선언된 변수를 기억하고 사용할 수 있기 때문에, 커링된 함수는 각 단계에서 전달받은 인자를 기억하고, 나중에 나머지 인자를 전달받아 처리할 수 있다.

**예시 - 커링 함수**

```javascript
function add(a) {
    return function(b) {
        return a + b;
    };
}

const add2 = add(2);  // 먼저 2라는 숫자를 고정
console.log(add2(3)); // 5
```

두 수의 합을 구하는 코드를 커링을 적용해서 작성한 함수이다. 커링의 장점은 인자를 미리 고정해두고, 나머지 인자는 나중에 채워넣을 수 있어서 함수의 재사용성을 높여준다. 필요한 정보만 당장 받아서 전달하고 또 필요한 정보가 들어오면 전달하는 방식으로 원하는 시점까지 함수 실행을 지연시킬 수도 있다.

커링 함수는 클로저를 이용하여 이전에 받은 인자들을 기억한다. 커링을 구현하려면 각 함수가 받은 인자를 클로저를 통해 저장해 두고, 이후에 나머지 인자를 받아 최종 계산을 수행한다.

```javascript
function multiply(a) {
    // 클로저: a를 기억함
    return function(b) {
        // 클로저: b를 기억함
        return function(c) {
            // 모든 인자를 모아서 최종 계산
            return a * b * c;
        };
    };
}

const multiplyBy2 = multiply(2);  // 첫 번째 인자 a = 2로 고정
const multiplyBy2And3 = multiplyBy2(3);  // 두 번째 인자 b = 3으로 고정
console.log(multiplyBy2And3(4));  // 24 (2 * 3 * 4)
```

첫 번째 함수 `multiply(2)`는 `a = 2` 를 기억하는 클로저를 반환한다. 두 번째 함수 `multiplyBy2(3)`는 `b = 3`를 기억하는 클로저를 반환한다. 마지막 함수에서 `c = 4`를 받아 최종적으로 `2 * 3 * 4 = 24`를 계산한다. 이처럼, 커링된 함수는 클로저 덕분에 각 단계에서 받은 인자들을 기억하고, 나중에 새로운 인자를 받아 처리할 수 있다.