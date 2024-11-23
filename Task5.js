// 1. Функция debounce
// Напишите функцию debounce. Эта функция должна гарантировать, что данная
// функция не вызывается слишком часто. При вызове она должна ожидать
// определенное количество времени перед выполнением. Если функция вызывается
// снова в течение этого времени, таймер должен быть сброшен.

function debounce(func, delay) {
  let timerId; // Переменная для хранения идентификатора таймера

  return function (...args) {
    // Если таймер уже существует, сбросим его
    if (timerId) {
      clearTimeout(timerId);
    }

    // Установим новый таймер
    timerId = setTimeout(() => {
      func.apply(this, args); // Вызовем переданную функцию с сохранением контекста и аргументов
    }, delay);
  };
}

// Пример использования
const debouncedFunction = debounce(() => {
  console.log("Вызвана функция с задержкой");
}, 2000);

// Тестирование
debouncedFunction(); // Таймер запущен
debouncedFunction(); // Таймер сброшен, перезапущен
debouncedFunction(); // Таймер снова сброшен, перезапущен
// Функция вызовется только один раз через 2 секунды после последнего вызова debouncedFunction.

// 2. Глубокое клонирование объекта
// Напишите функцию, которая выполняет глубокое клонирование объекта, т.е.
// вложенные объекты также должны быть склонированы, а не переданы по ссылке.

function deepClone(obj) {
  // Если obj не объект или null, возвращаем его
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Если obj — это массив, создаем новый массив и рекурсивно копируем элементы
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  // Если obj — это объект, создаем новый объект и рекурсивно копируем свойства
  const clone = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

// Пример использования
const original = {
  name: "John",
  address: {
    city: "New York",
    country: "USA",
  },
  hobbies: ["reading", "traveling"],
};

const copy = deepClone(original);
copy.address.city = "Los Angeles";
copy.hobbies[0] = "sports";

console.log(original.address.city); // New York
console.log(copy.address.city); // Los Angeles
console.log(original.hobbies[0]); // reading
console.log(copy.hobbies[0]); // sports
