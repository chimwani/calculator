let display = document.getElementById('display');
let currentOperand = '';
let previousOperand = '';
let operation = null;

function appendNumber(number) {
    if (currentOperand.length >= 10) return; // Limit display length
    currentOperand += number;
    updateDisplay();
}

function setOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculateResult();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentOperand = result;
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    display.value = currentOperand;
}

// Example of adding event listeners instead of inline HTML event handlers
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.innerText;
        if (!isNaN(value)) {
            appendNumber(value);
        } else if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculateResult();
        } else {
            setOperation(value);
        }
    });
});
