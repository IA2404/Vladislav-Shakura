
# Лабораторная работа №2 (Шакура Владислав (IA2404))

## Тема: основы работы с массивами, функциями и объектами в JavaScript

---

## Цель работы

Изучить основы работы с массивами и функциями в JavaScript, применяя их для обработки и анализа транзакций.

---

## Описание задачи

В рамках лабораторной работы был разработан набор функций для обработки массива транзакций. Каждая транзакция представлена объектом с определёнными свойствами, такими как идентификатор, дата, сумма, тип (дебетовая или кредитная), описание, название магазина и тип карты. Были реализованы функции для анализа данных, фильтрации, подсчёта сумм и других операций с транзакциями.

---

## Структура проекта

1. **Тип данных**: Определён тип `Transaction` с помощью JSDoc для описания структуры объекта транзакции.  
2. **Функции**: Реализовано 14 функций для выполнения различных операций с массивом транзакций.  
3. **Тестирование**: Проведено тестирование на тестовом наборе данных, пустом массиве и массиве с одной транзакцией.

---

### Тип данных `Transaction`

```javascript
/**
 * @typedef {Object} Transaction
 * @property {string} transaction_id - Уникальный идентификатор транзакции
 * @property {string} transaction_date - Дата транзакции (в формате YYYY-MM-DD)
 * @property {number} transaction_amount - Сумма транзакции
 * @property {string} transaction_type - Тип транзакции: "debit" или "credit"
 * @property {string} transaction_description - Описание транзакции
 * @property {string} merchant_name - Название магазина или сервиса
 * @property {string} card_type - Тип карты: "debit" или "credit"
 */
```

---

### Реализуемые функции

1. **`getUniqueTransactionTypes`** — возвращает массив уникальных типов транзакций.

```javascript
function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}
```

2. **`calculateTotalAmount`** — вычисляет общую сумму всех транзакций.

```javascript
function calculateTotalAmount(transactions) {
  return transactions.reduce((total, t) => total + t.transaction_amount, 0);
}
```

3. **`getTransactionByType`** — возвращает транзакции указанного типа (debit/credit).

```javascript
function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}
```

4. **`getTransactionsInDateRange`** — возвращает транзакции в указанном диапазоне дат.

```javascript
function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => t.transaction_date >= startDate && t.transaction_date <= endDate);
}
```

5. **`getTransactionsByMerchant`** — возвращает транзакции указанного магазина.

```javascript
function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}
```

6. **`calculateAverageTransactionAmount`** — вычисляет среднюю сумму транзакций.

```javascript
function calculateAverageTransactionAmount(transactions) {
  if (transactions.length === 0) return 0;
  return calculateTotalAmount(transactions) / transactions.length;
}
```

7. **`getTransactionsByAmountRange`** — возвращает транзакции в указанном диапазоне сумм.

```javascript
function getTransactionsByAmountRange(transactions, min, max) {
  return transactions.filter(t => t.transaction_amount >= min && t.transaction_amount <= max);
}
```

8. **`calculateTotalDebitAmount`** — вычисляет общую сумму дебетовых транзакций.

```javascript
function calculateTotalDebitAmount(transactions) {
  return calculateTotalAmount(getTransactionByType(transactions, "debit"));
}
```

9. **`findMostTransactionsMonth`** — находит месяц с наибольшим количеством транзакций.

```javascript
function findMostTransactionsMonth(transactions) {
  const counts = {};
  transactions.forEach(t => {
    const month = t.transaction_date.slice(0, 7); // YYYY-MM
    counts[month] = (counts[month] || 0) + 1;
  });
  return Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
}
```

10. **`findMostDebitTransactionMonth`** — находит месяц с наибольшим количеством дебетовых транзакций.

```javascript
function findMostDebitTransactionMonth(transactions) {
  return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
}
```

11. **`mostTransactionTypes`** — определяет, каких транзакций больше (debit/credit/equal).

```javascript
function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;
  if (debitCount > creditCount) return "debit";
  if (creditCount > debitCount) return "credit";
  return "equal";
}
```

12. **`getTransactionsBeforeDate`** — возвращает транзакции до указанной даты.

```javascript
function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t => t.transaction_date < date);
}
```

13. **`findTransactionById`** — находит транзакцию по её идентификатору.

```javascript
function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id);
}
```

14. **`mapTransactionDescriptions`** — преобразует транзакции в массив их описаний.

```javascript
function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}
```

---

## Тестирование

Для проверки корректности работы функций использовался следующий набор данных:

```javascript
const testTransactions = [
  {
    transaction_id: "1",
    transaction_date: "2019-01-01",
    transaction_amount: 100,
    transaction_type: "debit",
    transaction_description: "Покупка продуктов",
    merchant_name: "Супермаркет",
    card_type: "Visa",
  },
  {
    transaction_id: "2",
    transaction_date: "2019-02-02",
    transaction_amount: 50,
    transaction_type: "credit",
    transaction_description: "Возврат товара",
    merchant_name: "ОнлайнМагазин",
    card_type: "MasterCard",
  },
  {
    transaction_id: "3",
    transaction_date: "2019-01-03",
    transaction_amount: 75,
    transaction_type: "debit",
    transaction_description: "Ужин с друзьями",
    merchant_name: "Ресторан",
    card_type: "Visa",
  },
];
```

---

### Примеры тестов

```javascript
console.log('Уникальные типы транзакций:', getUniqueTransactionTypes(testTransactions));
console.log('Общая сумма:', calculateTotalAmount(testTransactions));
console.log('Дебетовые транзакции:', getTransactionByType(testTransactions, 'debit'));
console.log('Транзакции в диапазоне дат:', getTransactionsInDateRange(testTransactions, '2019-01-01', '2019-01-02'));
console.log('Транзакции по магазину:', getTransactionsByMerchant(testTransactions, 'Супермаркет'));
console.log('Средняя сумма транзакции:', calculateAverageTransactionAmount(testTransactions));
console.log('Транзакции по диапазону суммы:', getTransactionsByAmountRange(testTransactions, 50, 75));
console.log('Общая сумма дебетовых транзакций:', calculateTotalDebitAmount(testTransactions));
console.log('Месяц с наибольшим количеством транзакций:', findMostTransactionsMonth(testTransactions));
console.log('Месяц с наибольшим количеством дебетовых транзакций:', findMostDebitTransactionMonth(testTransactions));
console.log('Каких транзакций больше:', mostTransactionTypes(testTransactions));
console.log('Транзакции до даты:', getTransactionsBeforeDate(testTransactions, '2019-01-03'));
console.log('Транзакция по ID:', findTransactionById(testTransactions, '1'));
console.log('Описания транзакций:', mapTransactionDescriptions(testTransactions));
```

---
Результаты тестирования
1. Тестовый массив транзакций:
![alt text](image.png)
1.1 "Развёрнутый" ответ на уникальные типы транзакций:
![alt text](image-1.png)
1.2 "Развёрнутый" ответ на дебетовые транзакции:
![alt text](image-2.png)
1.3 "Развёрнутый" ответ на транзакции в диапазоне дат:
![alt text](image-3.png)
1.5 "Развёрнутый" ответ на транзакции по диапазону суммы:
![alt text](image-4.png)
1.6 "Развёрнутый" ответ на транзакции до даты:
![alt text](image-5.png)
2. Тестовый пустой массив:
![alt text](image-6.png)
## Вывод

В ходе выполнения лабораторной работы были изучены и применены основы работы с массивами, функциями и объектами в JavaScript, а также реализованы функции для эффективного анализа финансовых транзакций.

---

## Контрольные вопросы

### Какие методы массивов можно использовать для обработки объектов в JavaScript?

- `forEach` — перебор элементов.  
- `map` — создание нового массива с преобразованными элементами.  
- `filter` — фильтрация элементов по условию.  
- `reduce` — сведение массива к одному значению.  
- `find` — поиск первого подходящего элемента.  
- `some` — проверка наличия элементов, удовлетворяющих условию.  
- `every` — проверка, удовлетворяют ли все элементы условию.  
- `sort` — сортировка массива.

### Как сравнивать даты в строковом формате в JavaScript?

Для корректного сравнения дат в виде строк используют формат `YYYY-MM-DD`, так как строки в таком формате можно сравнивать лексикографически (как обычные строки), и результат будет верным.

### В чем разница между map(), filter() и reduce() при работе с массивами объектов?
map() — преобразует элементы, возвращает новый массив той же длины.
filter() — отбирает элементы по условию, возвращает новый массив меньшей или равной длины.
reduce() — сводит массив к одному значению (например, сумме).