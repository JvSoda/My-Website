function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteLastChar() {
    let display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function sin() {
    let display = document.getElementById('display');
    display.value = Math.sin(eval(display.value));
}

function cos() {
    let display = document.getElementById('display');
    display.value = Math.cos(eval(display.value));
}

function tan() {
    let display = document.getElementById('display');
    display.value = Math.tan(eval(display.value));
}

function log() {
    let display = document.getElementById('display');
    display.value = Math.log10(eval(display.value));
}

function power() {
    appendToDisplay('**');
}

function sqrt() {
    let display = document.getElementById('display');
    display.value = Math.sqrt(eval(display.value));
}

function toBinary() {
    let display = document.getElementById('display');
    let decimal = parseInt(display.value);
    if (isNaN(decimal)) {
        display.value = 'Error';
    } else {
        display.value = decimal.toString(2);
    }
}

function toHex() {
    let display = document.getElementById('display');
    let decimal = parseInt(display.value);
    if (isNaN(decimal)) {
        display.value = 'Error';
    } else {
        display.value = decimal.toString(16).toUpperCase();
    }
}

function toOctal() {
    let display = document.getElementById('display');
    let decimal = parseInt(display.value);
    if (isNaN(decimal)) {
        display.value = 'Error';
    } else {
        display.value = decimal.toString(8);
    }
}

function fromBinary() {
    let display = document.getElementById('display');
    let binary = display.value;
    if (!/^[01]+$/.test(binary)) {
        display.value = 'Error';
    } else {
        display.value = parseInt(binary, 2);
    }
}