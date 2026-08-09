const display = document.getElementById('display');

function appendNumber(number) {
    if (display.value === '0') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const lastChar = display.value[display.value.length - 1];
    
    // Prevent multiple operators in a row (except for decimal point)
    if (['+', '-', '*', '/'].includes(lastChar)) {
        return;
    }
    
    // Handle decimal point - only one per number
    if (operator === '.') {
        const lastOperator = Math.max(
            display.value.lastIndexOf('+'),
            display.value.lastIndexOf('-'),
            display.value.lastIndexOf('*'),
            display.value.lastIndexOf('/')
        );
        const currentNumber = display.value.substring(lastOperator + 1);
        
        if (currentNumber.includes('.')) {
            return;
        }
    }
    
    display.value += operator;
}

function deleteLast() {
    if (display.value === '0') {
        return;
    }
    display.value = display.value.slice(0, -1);
    if (display.value === '') {
        display.value = '0';
    }
}

function clearDisplay() {
    display.value = '0';
}

function calculate() {
    try {
        const result = eval(display.value);
        
        // Check if result is a valid number
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        // Round to avoid floating point issues
        display.value = Math.round(result * 100000000) / 100000000;
    } catch (error) {
        display.value = 'Error';
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        appendOperator(e.key);
    } else if (e.key === '.') {
        appendOperator('.');
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    }
});