const { ageClassification, weekFn } = require('../hometask.js');

describe('ageClassification', () => {
  test('повертає null для від\'ємних значень', () => {
    expect(ageClassification(-1)).toBe(null);
    expect(ageClassification(-10)).toBe(null);
  });

  test('повертає "Дитинство" для віку від 0 до 24', () => {
    expect(ageClassification(0)).toBe('Дитинство');
    expect(ageClassification(1)).toBe('Дитинство');
    expect(ageClassification(12)).toBe('Дитинство');
    expect(ageClassification(24)).toBe('Дитинство');
  });

  test('повертає "Молодість" для віку від 24.01 до 44', () => {
    expect(ageClassification(24.01)).toBe('Молодість');
    expect(ageClassification(30)).toBe('Молодість');
    expect(ageClassification(44)).toBe('Молодість');
  });

  test('повертає "Зрілість" для віку від 44.01 до 65', () => {
    expect(ageClassification(44.01)).toBe('Зрілість');
    expect(ageClassification(50)).toBe('Зрілість');
    expect(ageClassification(65)).toBe('Зрілість');
  });

  test('повертає "Старість" для віку від 65.1 до 75', () => {
    expect(ageClassification(65.1)).toBe('Старість');
    expect(ageClassification(70)).toBe('Старість');
    expect(ageClassification(75)).toBe('Старість');
  });

  test('повертає "Довголіття" для віку від 75.01 до 90', () => {
    expect(ageClassification(75.01)).toBe('Довголіття');
    expect(ageClassification(80)).toBe('Довголіття');
    expect(ageClassification(90)).toBe('Довголіття');
  });

  test('повертає "Рекорд" для віку від 90.01 до 122', () => {
    expect(ageClassification(90.01)).toBe('Рекорд');
    expect(ageClassification(100)).toBe('Рекорд');
    expect(ageClassification(122)).toBe('Рекорд');
  });

  test('повертає null для віку більше 122', () => {
    expect(ageClassification(122.01)).toBe(null);
    expect(ageClassification(150)).toBe(null);
    expect(ageClassification(200)).toBe(null);
  });
});

describe('weekFn', () => {
  test('повертає правильні назви днів тижня для чисел 1-7', () => {
    expect(weekFn(1)).toBe('Понеділок');
    expect(weekFn(2)).toBe('Вівторок');
    expect(weekFn(3)).toBe('Середа');
    expect(weekFn(4)).toBe('Четвер');
    expect(weekFn(5)).toBe('П\'ятниця');
    expect(weekFn(6)).toBe('Субота');
    expect(weekFn(7)).toBe('Неділя');
  });

  test('повертає null для невалідних значень', () => {
    expect(weekFn(0)).toBe(null);
    expect(weekFn(8)).toBe(null);
    expect(weekFn(9)).toBe(null);
    expect(weekFn(1.5)).toBe(null);
    expect(weekFn('2')).toBe(null);
    expect(weekFn('hello')).toBe(null);
    expect(weekFn(null)).toBe(null);
    expect(weekFn(undefined)).toBe(null);
  });
});
