// Задание 1: Основные алгоритмические задачи

// 1. Проверка на палиндром
// Напишите функцию, которая проверяет, является ли строка палиндромом. Палиндром
// — это слово, фраза, число или другая последовательность символов, которая
// читается одинаково слева направо и справа налево (игнорируя пробелы, знаки
// препинания и регистр).

function isPalindrome(text) {
  let cleanText = text.replace(/[^a-zA-Z0-9а-яА-ЯёЁ]/g, "").toLowerCase();
  let reverseText = cleanText.split("").reverse().join("");
  return cleanText === reverseText;
}

// 2. FizzBuzz
// Напишите функцию, которая выводит числа от 1 до 100. Но для кратных трём
// выводите "Fizz" вместо числа, а для кратных пяти — "Buzz". Для чисел, кратных как
// трём, так и пяти, выводите "FizzBuzz".

function fizzBuzz() {
  const result = [];
  for (let i = 1; i <= 100; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
          result.push("FizzBuzz");
      } else if (i % 3 === 0) {
          result.push("Fizz");
      } else if (i % 5 === 0) {
          result.push("Buzz");
      } else {
          result.push(i);
      }
  }
  return result;
}

// 3. Разбиение массива на части
// Напишите функцию, которая разбивает массив на группы заданного размера.

function chunkArray(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

// Вспомогательные функции для DOM

function checkPalindrome() {
  const text = document.querySelector("#palindromeInput").value;
  const resultElement = document.querySelector("#palindromeResult");
  if (isPalindrome(text)) {
    resultElement.textContent = `"${text}" является палиндромом.`;
  } else {
    resultElement.textContent = `"${text}" не является палиндромом.`;
  }
}

function runFizzBuzz() {
  const fizzBuzzResult = fizzBuzz();
  const resultElement = document.getElementById("fizzBuzzResult");
  resultElement.innerHTML = fizzBuzzResult.join(", ");
}

function splitArray() {
  const arrayInput = document.getElementById("arrayInput").value;
  const chunkSize = parseInt(document.getElementById("chunkSize").value, 10);
  const resultElement = document.getElementById("chunkResult");

  if (!arrayInput || isNaN(chunkSize) || chunkSize <= 0) {
    resultElement.textContent = "Введите корректные данные.";
    return;
  }

  const array = arrayInput.split(",").map((item) => item.trim());
  const chunks = chunkArray(array, chunkSize);

  resultElement.textContent = `Разделённый массив: ${JSON.stringify(chunks)}`;
}
