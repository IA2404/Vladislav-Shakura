/**
 * {Object} Transaction
 * {string} transaction_id - Уникальный идентификатор транзакции
 * {string} transaction_date - Дата транзакции (ГГГГ-ММ-ДД)
 * {number} transaction_amount - Сумма транзакции
 * {"debit"|"credit"} transaction_type - Тип транзакции (расход/приход)
 * {string} transaction_description - Описание транзакции
 * {string} merchant_name - Название магазина/сервиса
 * {string} card_type - Тип карты (Visa, MasterCard и т.д.)
 */

/**
 * Возвращает массив уникальных типов транзакций
 * {Transaction[]} transactions - Массив транзакций
 * {string[]} Массив уникальных типов транзакций
 */
function getUniqueTransactionTypes(transactions) {
    const types = transactions.map(t => t.transaction_type);
    return [...new Set(types)];
  }
  
  /**
   * Вычисляет общую сумму всех транзакций
   * {Transaction[]} transactions - Массив транзакций
   * {number} Общая сумма
   */
  function calculateTotalAmount(transactions) {
    return transactions.reduce((total, t) => total + t.transaction_amount, 0);
  }
  
  /**
   * Вычисляет сумму транзакций за указанную дату или период
   * {Transaction[]} transactions - Массив транзакций
   * {number} [year] - Год для фильтрации
   * {number} [month] - Месяц для фильтрации (1-12)
   * {number} [day] - День для фильтрации (1-31)
   * {number} Сумма транзакций за указанный период
   */
  function calculateTotalAmountByDate(transactions, year, month, day) {
    return transactions.reduce((total, t) => {
      const date = new Date(t.transaction_date);
      const matchesYear = year === undefined || date.getFullYear() === year;
      const matchesMonth = month === undefined || date.getMonth() + 1 === month;
      const matchesDay = day === undefined || date.getDate() === day;
      
      if (matchesYear && matchesMonth && matchesDay) {
        return total + t.transaction_amount;
      }
      return total;
    }, 0);
  }
  
  /**
   * Возвращает транзакции указанного типа
   * {Transaction[]} transactions - Массив транзакций
   * {"debit"|"credit"} type - Тип транзакции для фильтрации
   * {Transaction[]} Отфильтрованные транзакции
   */
  function getTransactionByType(transactions, type) {
    return transactions.filter(t => t.transaction_type === type);
  }
  
  /**
   * Возвращает транзакции в указанном диапазоне дат
   * {Transaction[]} transactions - Массив транзакций
   * {string} startDate - Начальная дата (ГГГГ-ММ-ДД)
   * {string} endDate - Конечная дата (ГГГГ-ММ-ДД)
   * {Transaction[]} Транзакции в указанном диапазоне дат
   */
  function getTransactionsInDateRange(transactions, startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return date >= start && date <= end;
    });
  }
  
  /**
   * Возвращает транзакции указанного магазина
   * {Transaction[]} transactions - Массив транзакций
   * {string} merchantName - Название магазина для фильтрации
   * {Transaction[]} Транзакции указанного магазина
   */
  function getTransactionsByMerchant(transactions, merchantName) {
    return transactions.filter(t => t.merchant_name === merchantName);
  }
  
  /**
   * Вычисляет среднюю сумму транзакций
   * {Transaction[]} transactions - Массив транзакций
   * {number} Средняя сумма транзакции
   */
  function calculateAverageTransactionAmount(transactions) {
    if (transactions.length === 0) return 0;
    return calculateTotalAmount(transactions) / transactions.length;
  }
  
  /**
   * Возвращает транзакции с суммой в указанном диапазоне
   * {Transaction[]} transactions - Массив транзакций
   * {number} minAmount - Минимальная сумма (включительно)
   * {number} maxAmount - Максимальная сумма (включительно)
   * {Transaction[]} Транзакции в указанном диапазоне сумм
   */
  function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(t => 
      t.transaction_amount >= minAmount && 
      t.transaction_amount <= maxAmount
    );
  }
  
  /**
   * Вычисляет общую сумму дебетовых транзакций
   * {Transaction[]} transactions - Массив транзакций
   * {number} Общая сумма дебетовых транзакций
   */
  function calculateTotalDebitAmount(transactions) {
    return getTransactionByType(transactions, 'debit')
      .reduce((total, t) => total + t.transaction_amount, 0);
  }
  
  /**
   * Находит месяц с наибольшим количеством транзакций (формат "ГГГГ-ММ")
   * {Transaction[]} transactions - Массив транзакций
   * {string} Месяц с наибольшим количеством транзакций в формате "ГГГГ-ММ"
   */
  function findMostTransactionsMonth(transactions) {
    const monthCounts = {};
    
    transactions.forEach(t => {
      const date = new Date(t.transaction_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
    });
    
    return Object.entries(monthCounts)
      .sort((a, b) => b[1] - a[1])[0][0];
  }
  
  /**
   * Находит месяц с наибольшим количеством дебетовых транзакций (формат "ГГГГ-ММ")
   * {Transaction[]} transactions - Массив транзакций
   * {string} Месяц с наибольшим количеством дебетовых транзакций
   */
  function findMostDebitTransactionMonth(transactions) {
    const debitTransactions = getTransactionByType(transactions, 'debit');
    return findMostTransactionsMonth(debitTransactions);
  }
  
  /**
   * Определяет, каких транзакций больше
   * {Transaction[]} transactions - Массив транзакций
   * {"debit"|"credit"|"equal"} Каких транзакций больше
   */
  function mostTransactionTypes(transactions) {
    const debitCount = getTransactionByType(transactions, 'debit').length;
    const creditCount = getTransactionByType(transactions, 'credit').length;
    
    if (debitCount > creditCount) return 'debit';
    if (creditCount > debitCount) return 'credit';
    return 'equal';
  }
  
  /**
   * Возвращает транзакции до указанной даты
   * {Transaction[]} transactions - Массив транзакций
   * {string} date - Граничная дата (ГГГГ-ММ-ДД)
   * {Transaction[]} Транзакции до указанной даты
   */
  function getTransactionsBeforeDate(transactions, date) {
    const cutoff = new Date(date);
    return transactions.filter(t => new Date(t.transaction_date) < cutoff);
  }
  
  /**
   * Находит транзакцию по её ID
   * {Transaction[]} transactions - Массив транзакций
   * {string} id - ID транзакции для поиска
   * {Transaction|undefined} Найденная транзакция или undefined
   */
  function findTransactionById(transactions, id) {
    return transactions.find(t => t.transaction_id === id);
  }
  
  /**
   * Преобразует транзакции в массив их описаний
   * {Transaction[]} transactions - Массив транзакций
   * {string[]} Массив описаний транзакций
   */
  function mapTransactionDescriptions(transactions) {
    return transactions.map(t => t.transaction_description);
  }
  
  // Тестирование функций
  const testTransactions = [
    {
      transaction_id: "1",
      transaction_date: "2019-01-01",
      transaction_amount: 100.0,
      transaction_type: "debit",
      transaction_description: "Покупка продуктов",
      merchant_name: "Супермаркет",
      card_type: "Visa",
    },
    {
      transaction_id: "2",
      transaction_date: "2019-02-02",
      transaction_amount: 50.0,
      transaction_type: "credit",
      transaction_description: "Возврат товара",
      merchant_name: "ОнлайнМагазин",
      card_type: "MasterCard",
    },
    {
      transaction_id: "3",
      transaction_date: "2019-01-03",
      transaction_amount: 75.0,
      transaction_type: "debit",
      transaction_description: "Ужин с друзьями",
      merchant_name: "Ресторан",
      card_type: "Visa",
    },
  ];
  
  console.log('Уникальные типы транзакций:', getUniqueTransactionTypes(testTransactions));
  console.log('Общая сумма:', calculateTotalAmount(testTransactions));
  console.log('Сумма за январь 2019:', calculateTotalAmountByDate(testTransactions, 2019, 1));
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
  
  // Тестирование с пустым массивом
  const emptyTransactions = [];
  console.log('\nТестирование с пустым массивом:');
  console.log('Уникальные типы:', getUniqueTransactionTypes(emptyTransactions));
  console.log('Общая сумма:', calculateTotalAmount(emptyTransactions));
  console.log('Средняя сумма:', calculateAverageTransactionAmount(emptyTransactions));
  
  // Тестирование с одной транзакцией
  const singleTransaction = [testTransactions[0]];
  console.log('\nТестирование с одной транзакцией:');
  console.log('Уникальные типы:', getUniqueTransactionTypes(singleTransaction));
  console.log('Общая сумма:', calculateTotalAmount(singleTransaction));
  console.log('Средняя сумма:', calculateAverageTransactionAmount(singleTransaction));