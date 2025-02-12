// Get references to the HTML elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

// Store the current input and the operation
let currentInput = '';
let previousInput = '';
let operator = '';

// Function to update the display
const updateDisplay = (value) => {
    display.textContent = value;
};

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const buttonValue = event.target.textContent;

        if (buttonValue === 'C') {
            // Clear button
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('0');
        } else if (buttonValue === '←') {
            // Backspace button
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
        } else if (buttonValue === '=') {
            // Equals button
            if (currentInput && previousInput) {
                currentInput = evaluateExpression(previousInput, operator, currentInput);
                updateDisplay(currentInput);
                previousInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(buttonValue)) {
            // Operator button (+, -, *, /)
            if (currentInput) {
                if (previousInput) {
                    currentInput = evaluateExpression(previousInput, operator, currentInput);
                }
                previousInput = currentInput;
                operator = buttonValue;
                currentInput = '';
            }
        } else {
            // Regular number or decimal
            currentInput += buttonValue;
            updateDisplay(currentInput);
        }
    });
});

// Function to evaluate the expression
const evaluateExpression = (a, op, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return (b !== 0) ? (a / b).toString() : 'Error';
        default:
            return b.toString();
    }
};
