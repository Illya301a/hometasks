console.log('#1. Приклад домашнього завдання з JavaScript');

/*
 * #1
 *
 * Створіть змінні зі значеннями.
 */

// ім'я змінної: myNum, значення: 10
// ім'я змінної: myStr, значення: 'some string'
// ім'я змінної: myBool, значення: true
// ім'я змінної: myArr, значення: 1, 2, 3, 4, 5
// ім'я змінної myObj, значення: first: 'First Name', last: 'Last Name'

let myNum = 10;
let myStr = "some string";
let myBool = true;
let myArr = [1, 2, 3, 4, 5];
let myObj = {
  first: "First Name",
  last: "Last Name"
}
console.log(myNum, myStr, myBool, myArr, myObj);

/*
 * #2
 *
 * Відформатуйте ціле число, яке зберігається в змінній myNum, щоб отримати результат з 2 знаками після коми.
 * Результат збережіть у змінній decimal2.
 */

let decimal2 = myNum.toFixed(2);
console.log(decimal2);

/*
 * #3
 *
 * Створіть змінну i, для якої виконайте префіксний та постфіксний інкремент та декремент.
 * Поекспериментуйте з результатами, виводячи їх у консоль.
 */

let i = 0;
console.log(++i, i++, i, --i, i--);

/*
 * #4
 *
 * Створіть нову змінну myTest та присвойте їй значення 20.
 * Виконайте присвоєння з операцією, використовуючи оператори: +=, –=, *=, /=, %=.
 * Результати присвоюються в myTest, потім виводяться в консоль.
 * У розрахунках можна використовувати раніше оголошену змінну myNum та/або числа.
 */

let myTest = 20;
myTest += myNum;
console.log(myTest);
myTest -= myNum;
console.log(myTest);
myTest *= myNum;
console.log(myTest);
myTest /= myNum;
console.log(myTest);
myTest %= myNum;
console.log(myTest);

/*
 * #5
 *
 * Використовуючи властивості та методи об'єкта Math, присвойте змінним та відобразіть у консолі.
 */

const myPi = Math.PI;
const myRound = Math.round(89.279);
const myRandom = Math.random() * 10;
const myPow = Math.pow(3, 5);
console.log(myPi, myRound, myRandom, myPow);

/*
 * #6
 *
 * Створіть об'єкт з ім'ям strObj.
 * Присвойте ключу str рядок тексту "Мама мыла раму, рама мыла маму", ключу length встановіть довжину цього рядка.
 */

let strObj = {
  str: "Мама мыла раму, рама мыла маму",
  length: "Мама мыла раму, рама мыла маму".length
}
console.log(strObj);

/*
 * #7
 *
 * Перевірте наявність тексту 'рама' у полі str об'єкта strObj (див.п.6), результат збережіть у змінній isRamaPos та виведіть її у консоль.
 * Результатом для isRamaPos має бути індекс входження.
 * Результатом для isRama має бути буль true.
 */

let isRamaPos = strObj.str.indexOf("рама");
let isRama = strObj.str.includes("рама");
console.log(isRamaPos, isRama);

/*
 * #8
 *
 * Виконайте перейменування підрядка у рядку.
 * Як вихідний рядок використовуйте значення поля str об'єкта strObj (див.п.6), результат збережіть у змінній strReplace та відобразіть у консолі.
 * Вихідний рядок: 'Мама мыла раму, рама мыла маму'
 *      Результат: 'Мама моет раму, Рама держит маму'
 */

let strReplace = strObj.str.replace("мыла", "моет").replace("рама", "Рама").replace("мыла", "держит");
console.log(strReplace);

/*
 * #9
 *
 * Преобразуйте текст 'some STRING' у верхній, потім у нижній регістри, результат відобразіть у консолі.
 */

let someStr = "some STRING";
let upperStr = someStr.toUpperCase();
let lowerStr = someStr.toLowerCase();
console.log(someStr +", "+ upperStr +", "+ lowerStr); 
