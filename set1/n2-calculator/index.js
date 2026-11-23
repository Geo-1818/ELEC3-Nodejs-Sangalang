
// Name: IAN GEOFREY SANGALANG | Section: IV-BSIT B | Activity: N2 | Date: 2026-11-23

const ops = require("./operations");
const formatResult = require("./formatter");
const path = require("path");

const [operation, ...rawNumbers] = process.argv.slice(2);
const numbers = rawNumbers.map(Number);

console.log("Running:", path.basename(__filename));

try {
    if (!operation) {
        throw new Error("Usage: node index.js <add|subtract|multiply|divide|average> numbers...");
    }

    if (!numbers.length || numbers.some(Number.isNaN)) {
        throw new Error("Provide valid numeric arguments.");
    }

    let result;

    if (operation === "average") {
        result = ops.average(numbers);
    } else {
        if (numbers.length !== 2) {
            throw new Error("This operation requires exactly two numbers.");
        }

        const [a, b] = numbers;

        const choices = {
            add: () => ops.add(a, b),
            subtract: () => ops.subtract(a, b),
            multiply: () => ops.multiply(a, b),
            divide: () => ops.divide(a, b)
        };

        if (!choices[operation]) {
            throw new Error("Unknown operation: " + operation);
        }

        result = choices[operation]();
    }

    console.log(formatResult(operation, numbers, result));

} catch (error) {
    console.error("Error:", error.message);
    process.exitCode = 1;
}
