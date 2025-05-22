let expression = '';

export function handleInput(button, display) {
  const digit = button.dataset.digit;
  const action = button.dataset.action;

  if (digit !== undefined) {
    expression += digit;
  } else if (action === 'clear') {
    expression = '';
  } else if (action === 'delete') {
    expression = expression.slice(0, -1);
  } else if (action === 'operator') {
    const operator = button.textContent;
    if (expression && !/[+\-*/]$/.test(expression)) {
      expression += operator;
    }
  } else if (action === 'equals') {
    try {
      if (/^[0-9.+\-*/]+$/.test(expression)) {
        expression = eval(expression).toString();
      } else {
        expression = 'Ошибка';
      }
    } catch {
      expression = 'Ошибка';
    }
  }

  display.textContent = expression || '0';
}
