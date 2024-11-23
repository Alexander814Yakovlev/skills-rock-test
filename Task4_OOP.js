// 1. Реализация простого калькулятора
// Создайте класс Calculator, который симулирует работу простого калькулятора с
// методами:
// ● add(a, b) - возвращает сумму a и b.
// ● subtract(a, b) - возвращает разность a и b.
// ● multiply(a, b) - возвращает произведение a и b.
// ● divide(a, b) - возвращает результат деления a на b. Если b равно 0,
// возвращает сообщение об ошибке.
// Создайте экземпляр класса и продемонстрируйте его использование, вызывая методы
// с разными аргументами.

class Calculator {
  constructor() {
    // Свойство для хранения истории операций
    this.history = [];
  }

  // Метод для добавления записи в историю
  addHistory(operation, a, b, result) {
    this.history.push(`${operation}: ${a} и ${b} = ${result}`);
  }

  // Метод для сложения
  add(a, b) {
    const result = a + b;
    this.addHistory("Сложение", a, b, result);
    return result;
  }

  // Метод для вычитания
  subtract(a, b) {
    const result = a - b;
    this.addHistory("Вычитание", a, b, result);
    return result;
  }

  // Метод для умножения
  multiply(a, b) {
    const result = a * b;
    this.addHistory("Умножение", a, b, result);
    return result;
  }

  // Метод для деления
  divide(a, b) {
    if (b === 0) {
      throw new Error("Деление на ноль невозможно.");
    }
    const result = a / b;
    this.addHistory("Деление", a, b, result);
    return result;
  }

  // Метод для отображения истории операций
  getHistory() {
    return this.history;
  }
}

// Пример использования:
const calc = new Calculator();

console.log(calc.add(5, 3)); // 8
console.log(calc.subtract(10, 7)); // 3
console.log(calc.multiply(2, 4)); // 8
console.log(calc.divide(9, 3)); // 3

console.log(calc.getHistory());
// Вывод истории:
// [
//   'Сложение: 5 и 3 = 8',
//   'Вычитание: 10 и 7 = 3',
//   'Умножение: 2 и 4 = 8',
//   'Деление: 9 и 3 = 3'
// ]

// 2. Система управления библиотекой

// Создайте класс Book с следующими свойствами:
// ● Название
// ● Автор
// ● ISBN
// ● Статус (взята или доступна)

// Далее создайте класс Library, который:
// ● Позволяет добавлять новые книги.
// ● Позволяет брать книгу по её ISBN.
// ● Позволяет возвращать взятую книгу по её ISBN.
// ● Показывает список доступных книг.

// Реализуйте методы для управления книгами и их статусами.

class Book {
  constructor(title, author, isbn) {
    this.title = title; // Название книги
    this.author = author; // Автор книги
    this.isbn = isbn; // Уникальный ISBN книги
    this.status = "available"; // Статус книги: 'available' или 'borrowed'
  }

  // Метод для изменения статуса книги
  setStatus(status) {
    this.status = status;
  }

  // Метод для получения статуса книги
  getStatus() {
    return this.status;
  }
}

class Library {
  constructor() {
    this.books = []; // Массив для хранения всех книг в библиотеке
  }

  // Метод для добавления новой книги
  addBook(book) {
    // Проверяем, что книга с таким ISBN ещё не добавлена
    if (this.books.some((existingBook) => existingBook.isbn === book.isbn)) {
      console.log(`Книга с ISBN ${book.isbn} уже существует в библиотеке.`);
      return;
    }
    this.books.push(book);
    console.log(`Книга "${book.title}" добавлена в библиотеку.`);
  }

  // Метод для взятия книги по ISBN
  borrowBook(isbn) {
    const book = this.books.find((b) => b.isbn === isbn);
    if (!book) {
      console.log(`Книга с ISBN ${isbn} не найдена.`);
      return;
    }
    if (book.getStatus() === "borrowed") {
      console.log(`Книга "${book.title}" уже взята.`);
    } else {
      book.setStatus("borrowed");
      console.log(`Вы взяли книгу "${book.title}".`);
    }
  }

  // Метод для возврата книги по ISBN
  returnBook(isbn) {
    const book = this.books.find((b) => b.isbn === isbn);
    if (!book) {
      console.log(`Книга с ISBN ${isbn} не найдена.`);
      return;
    }
    if (book.getStatus() === "available") {
      console.log(`Книга "${book.title}" уже доступна.`);
    } else {
      book.setStatus("available");
      console.log(`Вы вернули книгу "${book.title}".`);
    }
  }

  // Метод для отображения списка доступных книг
  listAvailableBooks() {
    const availableBooks = this.books.filter(
      (b) => b.getStatus() === "available"
    );
    if (availableBooks.length === 0) {
      console.log("Нет доступных книг.");
    } else {
      console.log("Доступные книги:");
      availableBooks.forEach((book) => {
        console.log(
          `- "${book.title}" (Автор: ${book.author}, ISBN: ${book.isbn})`
        );
      });
    }
  }
}

// Пример использования
const library = new Library();

const book1 = new Book("Война и мир", "Лев Толстой", "978-5-4467-1234-5");
const book2 = new Book(
  "Преступление и наказание",
  "Фёдор Достоевский",
  "978-5-4467-5678-9"
);

library.addBook(book1);
library.addBook(book2);
library.addBook(book1); // Попытка добавить дубликат

library.listAvailableBooks(); // Список доступных книг

library.borrowBook("978-5-4467-1234-5"); // Берём книгу
library.listAvailableBooks(); // Обновленный список доступных книг

library.returnBook("978-5-4467-1234-5"); // Возвращаем книгу
library.listAvailableBooks(); // Список доступных книг снова
