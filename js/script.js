/*
 ! Завдання: Реалізація Функції з Каруванням для Послідовного Додавання Трьох Чисел
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
*/

function outerFunction(arg1) {
    return function innerFunction(arg2) {
      return function deepInnerFunction(arg3) {
        return arg1 * arg2 * arg3;
      }
    }
  }
  
  const result = outerFunction(2)(3)(4)
  console.log(result)
  