let num1, num2, operator, operatorPressed;
operator = '';
num1 = '0';
num2 = '';
operatorPressed = false;
const operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.number-button');
const display = document.querySelector('.display');
const equals = document.querySelector('#equals');
const reset = document.querySelector('#reset');
const del = document.querySelector('#delete');
display.textContent = num1;

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}
function operate(operator) {
    switch (operator) {
        case 'add':
            return add(+num1, +num2);
        case 'subtract':
            return subtract(+num1, +num2);
        case 'divide':
            return divide(+num1, +num2);
        case 'multiply':
            return multiply(+num1, +num2);
    }
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (!operatorPressed) {
            num1 += number.value;
            display.textContent = +num1;
            return;
        }
        num2 += number.value;
        display.textContent = +num2;
    });
})
operators.forEach(sign => {
    sign.addEventListener('click', () => {
        if (!num1) {
            num1 = result;
        }
        operatorPressed = true;
        currentOperator = operator;
        operator = sign.value;
        if (!num2) {
            return;
        }
        num1 = operate(currentOperator);
        num1 = num1.toString();
        display.textContent = num1;
        num2 = '';
    })
})
equals.onclick = () => {
    if (!num2) {
        return;
    }
    result = operate(operator);
    display.textContent = result;
    num1 = ''
    num2 = ''
    operatorPressed = false;
}

reset.onclick = () => {
    operator = '';
    num1 = '0';
    num2 = '';
    operatorPressed = false;
    display.textContent = num1;
}
del.onclick = () => {
    if (!num1) {
        num1 = result.toString();
    }
    if (!num2) {
        num1 = num1.slice(0,-1); 
        display.textContent = +num1;
        if (!num1){
            num1 = '0';
        }
        return;
    }
    num2 = num2.slice(0,-1);
    display.textContent = +num2;
}