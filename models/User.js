const mongoose = require('mongoose');

// Схема для пользователей
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Имя обязательно для заполнения'],
    trim: true,
    minlength: [2, 'Имя должно содержать минимум 2 символа'],
    maxlength: [50, 'Имя не должно превышать 50 символов']
  },
  email: { 
    type: String, 
    required: [true, 'Email обязателен для заполнения'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Введите корректный email']
  },
  age: { 
    type: Number,
    min: [0, 'Возраст не может быть отрицательным'],
    max: [150, 'Возраст не может превышать 150 лет']
  },
  city: { 
    type: String,
    trim: true,
    maxlength: [50, 'Название города не должно превышать 50 символов']
  },
  hobbies: [{ 
    type: String,
    trim: true,
    maxlength: [30, 'Название хобби не должно превышать 30 символов']
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Индексы для улучшения производительности
userSchema.index({ email: 1 }); // Уникальный индекс для email
userSchema.index({ name: 1 }); // Индекс для поиска по имени
userSchema.index({ city: 1 }); // Индекс для поиска по городу

// Автоматическое обновление поля updatedAt
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Метод для получения полной информации о пользователе
userSchema.methods.getFullInfo = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    age: this.age,
    city: this.city,
    hobbies: this.hobbies,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Статический метод для поиска пользователей по возрасту
userSchema.statics.findByAgeRange = function(minAge, maxAge) {
  return this.find({ age: { $gte: minAge, $lte: maxAge } });
};

// Экспорт модели
module.exports = mongoose.model('User', userSchema);
