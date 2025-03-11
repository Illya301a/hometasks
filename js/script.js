/*
 ! Завдання: Реалізація Функції з Каруванням для Послідовного Додавання Трьох Чисел

 Створіть функцію `curriedAdd`, яка демонструє принцип карування в JavaScript. Функція повинна приймати три числові аргументи, кожен з яких передається послідовно, і повертати суму цих трьох чисел.

 Функція `curriedAdd` повинна працювати наступним чином:
 1. При першому виклику `curriedAdd` приймає перший аргумент `a` і повертає функцію, яка приймає другий аргумент.
 2. При другому виклику ця повернена функція приймає другий аргумент `b` і повертає ще одну функцію, яка приймає третій аргумент.
 3. При третьому виклику остання функція приймає третій аргумент `c` і повертає суму `a + b + c`.

 Очікуваний вивід:
 - При виклику `curriedAdd(1)(2)(3)` повинно повертатися `6`.

 Задача вимагає глибокого розуміння концепцій функцій вищого порядку та замикань в JavaScript.
*/

function curriedAdd(a) {
    return function(b) {
      return function(c) {
        return a + b + c;
      }
    }
  }
  
  console.log(curriedAdd(1)(2)(3));




/*
 ! Завдання: Реалізація Функції з Каруванням для Побудови Повного Доменного Імені

 Створіть функцію `curriedDomain`, яка використовує принцип карування для побудови повного доменного імені. Функція повинна дозволяти послідовне встановлення компонентів доменного імені: протоколу, назви домену та домену верхнього рівня (TLD).

 Функція `curriedDomain` має працювати наступним чином:
 1. При першому виклику `curriedDomain` приймає протокол (`protocol`, наприклад, 'http' або 'https') і повертає функцію, яка приймає назву домену.
 2. При другому виклику ця повернена функція приймає назву домену (`domainName`, наприклад, 'example' або 'mywebsite') і повертає ще одну функцію, яка приймає домен верхнього рівня.
 3. При третьому виклику остання функція приймає домен верхнього рівня (`tld`, наприклад, 'com', 'org') і повертає повне доменне ім'я у форматі `protocol://domainName.tld`.

 Очікуваний вивід:
 - При виклику `curriedDomain('https')('example')('com')` повинно повертатися 'https://example.com'.

 Ця задача допоможе поглибити розуміння концепції карування та замикань у JavaScript, а також показує практичне застосування цих концепцій у реальних сценаріях програмування.
*/

function curriedDomain(protocol) {
    return function protocolSetter(domainName) {
        return function domainNameSetter(tld) {
            return protocol + "://" + domainName + "." + tld;
        }
    }
  }

  const protocolSetter = curriedDomain('https')
  const domainNameSetter = protocolSetter('github')
  const fullDomain = domainNameSetter('com')
  console.log('Full Domain:', fullDomain)



/*
 ! Завдання: Розробка Вищої Функції для Модифікації Поведінки Іншої Функції

 Створіть вищу функцію (higher-order function) modifyFunction, яка приймає як аргументи функцію originalFunction та число multiplier.

 Функція originalFunction приймає один числовий аргумент.

 modifyFunction повинна повертати нову функцію, яка при виклику з будь-яким числовим аргументом викликає originalFunction з цим аргументом і множить результат на multiplier.

 Наприклад, якщо originalFunction повертає вхідний аргумент, помножений на 2, і multiplier дорівнює 3, то повернута функція повинна повертати вхідний аргумент, помножений на 6.
*/

function originalFunction(num) {
    return num * num
  }
  
  function modifyFunction(originalFunc, multiplier) {
    return function(num) {
      return originalFunc(num) * multiplier
    }
  }

  const modifiedFunc = modifyFunction(originalFunction, 3)
  console.log('Original function output for 4:', originalFunction(4))
  console.log('Modified function output for 4:', modifiedFunc(4))
  


/*
! Завдання: Розробка Функції Трирівневої Вкладеності в JavaScript з Конкретною Операцією

Створіть функцію outerFunction, яка приймає один аргумент.

outerFunction повинна повертати функцію innerFunction, яка також приймає один аргумент.

innerFunction повинна повертати функцію deepInnerFunction, яка також приймає один аргумент.

deepInnerFunction повинна виконувати операцію множення з усіма переданими аргументами (один з кожної функції) і повертати результат цієї операції.

Результатом виклику outerFunction(arg1)(arg2)(arg3) має бути добуток arg1 * arg2 * arg3.
*/

function outerFunction(arg1) {
    return function innerFunction(arg2) {
      return function deepInnerFunction(arg3) {
        return arg1 * arg2 * arg3;
      }
      // code
    }
    // code
  }
  
  const result = outerFunction(2)(3)(4)
  console.log(result)
  