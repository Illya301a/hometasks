/*
Створіть функцію sumBigIntegers, яка приймає два рядки (numStr1 та numStr2), що представляють великі числа.
Функція повинна перетворити ці рядки на BigInt і повернути їх суму.
console.log(sumBigIntegers("9007199254740991", "9007199254740991")); // виводить 18014398509481982n
*/

function sumBigIntegers(numStr1, numStr2) {
    return bigInt = BigInt(numStr1) + BigInt(numStr2);
  }
  
console.log(sumBigIntegers("9007199254740991", "9007199254740991"));



/* 
Ваше завдання - створити функцію greet в JavaScript. Ця функція повинна приймати два аргументи:
msg: Рядок, який представляє привітання, наприклад “Hi”, “Hey” або “Hello”.
name: Рядок, який представляє ім’я особи, наприклад “John”, “Bob” або “Mary”.
*/

function greet(msg, name) {
    return (msg + ", " + name);
  }

console.log(greet("Hi", "John"));
console.log(greet("Hey", "Bob"));
console.log(greet("Hello", "Mary"));



/*
Створіть функцію `getRandomInt`, яка приймає два цілих числа: `min` та `max`. 
Ця функція повинна генерувати випадкове ціле число в діапазоні від `min` до `max` (включно).
*/
  
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  

console.log(getRandomInt(1, 10));
console.log(getRandomInt(40, 50));
console.log(getRandomInt(1, 100));