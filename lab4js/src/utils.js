
export function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export function formatDate(date) {
  return date.toLocaleString();
}

import { transactions } from './transactions.js';

export function calculateTotal() {
  const total = transactions.reduce((acc, t) => acc + Number(t.amount), 0);
  document.getElementById('total').textContent = total.toFixed(2);
}
