let num1, num2, operator, operatorPressed, result
operator = '';
num1 = '';
num2 = '';
result = '0';
operatorPressed = false;
const operators = document.querySelectorAll('.operators');
const numbers = document.querySelectorAll('.number-button');
const display = document.querySelector('.display');
const equals = document.querySelector('#equals');
const reset = document.querySelector('#reset');
const del = document.querySelector('#delete');
const dec = document.querySelector('#decimal');
const sign = document.querySelector('#sign');


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
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
function precisionGetter() {
    prec1 = 0;
    prec2 = 0;
    if (num1.indexOf(dec.value) != -1) {
        prec1 = num1.length - 1 - num1.indexOf(dec.value);
    }
    if (num2.indexOf(dec.value) != -1) {
        prec2 = num2.length - 1 - num2.indexOf(dec.value);
    }
    return prec1 > prec2 ? prec1 : prec2;
}

numbers.forEach(number => {
    number.addEventListener('click', () => {
        if (!operatorPressed) {
            num1 += number.value;
            display.textContent = num1;
            return;
        }
        num2 += number.value;
        display.textContent = num2;
    });
})
operators.forEach(sign => {
    sign.addEventListener('click', () => {
        if (!num1) {
            num1 = result;
            display.textContent = num1;
        }
        if (Number.isNaN(+num1)) {
            return;
        }
        operatorPressed = true;
        currentOperator = operator;
        operator = sign.value;
        if (!num2 || Number.isNaN(+num2)) {
            return;
        }
        num1 = round(operate(currentOperator), precisionGetter());
        num1 = num1.toString();
        display.textContent = num1;
        num2 = '';
    })
})
equals.onclick = () => {
    if (!num2 || Number.isNaN(+num2)) {
        return;
    }
    result = round(operate(operator), precisionGetter());
    result = result.toString();
    display.textContent = result
    num1 = ''
    num2 = ''
    operatorPressed = false;
}

reset.onclick = () => {
    operator = '';
    num1 = '';
    num2 = '';
    result = '0';
    operatorPressed = false;
    display.innerHTML = '&nbsp;';
}
del.onclick = () => {
    if (!num1) {
        return;
    }
    if (!operatorPressed) {
        num1 = num1.slice(0, -1);
        display.textContent = num1;
        if (!num1) {
            display.innerHTML = '&nbsp;';
        }
        return;
    }
    if (!num2){
        return;
    }
    num2 = num2.slice(0, -1);
    display.textContent = num2;
    if (!num2) {
        display.innerHTML = '&nbsp;';
    }
    
}
dec.onclick = () => {
    if (!operatorPressed && num1.indexOf(dec.value) == -1) {
        num1 += dec.value;
        display.textContent = num1;
        return;
    }
    if (operatorPressed && num2.indexOf(dec.value) == -1) {
        num2 += dec.value;
        display.textContent = num2;
    }
}
sign.onclick = () => {
    switch (true) {
        case num1&&!operatorPressed && num1.indexOf(sign.value)==-1:
            num1 = sign.value + num1;
            display.textContent = num1;
            break;
        case num1&&!operatorPressed && num1.indexOf(sign.value)!=-1:
            num1 = num1.slice(1);
            display.textContent = num1;
            break;
        case num2&&operatorPressed && num2.indexOf(dec.value) == -1 :
            num2 = sign.value + num2;
            display.textContent = num2;
            break;
        case num2&&operatorPressed && num2.indexOf(dec.value) != -1:
            num2 = num2.slice(1);
            display.textContent = num2;
            break;
    }
}