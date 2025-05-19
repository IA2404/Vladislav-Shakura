
import { addTransaction, handleTableClick } from './ui.js';
import { calculateTotal } from './utils.js';

document.getElementById('transaction-form').addEventListener('submit', (e) => {
  e.preventDefault();
  addTransaction();
  calculateTotal();
});

document.getElementById('transaction-table').addEventListener('click', handleTableClick);
