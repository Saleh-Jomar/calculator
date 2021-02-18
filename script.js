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
const dec = document.querySelector('#decimal')
display.textContent = +num1;

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
function precisionGetter () {
    prec1 = 0;
    prec2 = 0;
    if (num1.indexOf(dec.value)!=-1){
        prec1 = num1.length - 1 - num1.indexOf(dec.value);
    }
    if (num2.indexOf(dec.value)!=-1){
        prec2 = num2.length - 1 - num2.indexOf(dec.value);
    }
    return prec1 > prec2 ? prec1 : prec2;
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
        if (!num2||Number.isNaN(+num2)) {
            return;
        }
        num1 = round(operate(currentOperator),precisionGetter());
        num1 = num1.toString();
        display.textContent = num1;
        num2 = '';
    })
})
equals.onclick = () => {
    if (!num2||Number.isNaN(+num2)) {
        return;
    }
    result = round(operate(operator),precisionGetter());
    result = result.toString();
    display.textContent = result
    num1 = ''
    num2 = ''
    operatorPressed = false;
}

reset.onclick = () => {
    operator = '';
    num1 = '0';
    num2 = '';
    operatorPressed = false;
    display.textContent = +num1;
}
del.onclick = () => {
    if (!num1) {
        return;
    }
    if (!operatorPressed) {
        num1 = num1.slice(0, -1);
        display.textContent = +num1;
        if (num1.indexOf(dec.value)!==-1){
            display.textContent = num1;
        }
        if (!num1) {
            num1 = '0';
        }
        return;
    }
    num2 = num2.slice(0, -1);
    display.textContent = +num2;
    if (!num2) {
        num2 = '0';
    }
    if (num2.indexOf(dec.value)!==-1){
        display.textContent = num2;
    }
}
dec.onclick = () => {
    if (!operatorPressed && num1.indexOf(dec.value)==-1){
        num1 += dec.value;
        if (num1[0]=='0'){
            num1 = num1.slice(1);
        }
        display.textContent = num1;
        return;
    }
    if (operatorPressed && num2.indexOf(dec.value) == -1) {
        num2 += dec.value;
        display.textContent = num2;
    }
}