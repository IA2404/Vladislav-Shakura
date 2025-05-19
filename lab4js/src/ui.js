
import { transactions } from './transactions.js';
import { generateId, formatDate } from './utils.js';

export function addTransaction() {
  const desc = document.getElementById('description').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  const transaction = {
    id: generateId(),
    date: new Date(),
    amount,
    category,
    description: desc,
  };

  transactions.push(transaction);
  renderTransaction(transaction);
  document.getElementById('transaction-form').reset();
}

function renderTransaction(transaction) {
  const table = document.querySelector('#transaction-table tbody');
  const row = document.createElement('tr');
  row.className = transaction.amount >= 0 ? 'income' : 'expense';
  row.dataset.id = transaction.id;

  const shortDesc = transaction.description.split(' ').slice(0, 4).join(' ');

  row.innerHTML = \`
    <td>\${formatDate(transaction.date)}</td>
    <td>\${transaction.category}</td>
    <td>\${shortDesc}</td>
    <td><button class="delete-btn">Удалить</button></td>
  \`;

  row.addEventListener('click', (e) => {
    if (!e.target.classList.contains('delete-btn')) {
      document.getElementById('full-description').textContent = transaction.description;
    }
  });

  table.appendChild(row);
}

export function handleTableClick(e) {
  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.closest('tr');
    const id = row.dataset.id;
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions.splice(index, 1);
      row.remove();
      document.getElementById('full-description').textContent = '';
    }
  }
}
