
// Name: IAN GEFRNEY SANGALANG | Section: IV-BSIT B | Activity: N2 | Date: 2026-11-23

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
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }

    return a / b;
}

function average(numbers) {
    if (!numbers.length) {
        throw new Error("Provide at least one number.");
    }

    return numbers.reduce((total, value) => total + value, 0) / numbers.length;
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    average 
};
