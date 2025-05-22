import { handleInput } from './calculator.js';

export function setupUI() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.buttons button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      handleInput(button, display);
    });
  });
}
