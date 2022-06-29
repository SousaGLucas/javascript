// DOM Elements

const numInput = document.querySelector("#num-input");
const factorialSubtitle = document.querySelector("#factorial-subtitle");
const factorialOutput = document.querySelector("#factorial-output");
const eulerSubtitle = document.querySelector("#euler-subtitle");
const eulerOutput = document.querySelector("#euler-output");

// Listenners

numInput.addEventListener("input", (event) => {
    const cursorPosition = numInput.selectionStart;
    const input = parseInt(event.data, 10);
    const num = parseInt(event.target.value, 10);

    if (isNaN(input) && event.inputType !== "deleteContentBackward") {
        numInput.value = `${event.target.value.substring(0, cursorPosition - 1)}${event.target.value.substring(cursorPosition)}`;
        numInput.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
        return;
    };

    if (isNaN(num)) {
        factorialSubtitle.textContent = ``;
        factorialOutput.textContent = ``;
        eulerSubtitle.textContent = ``;
        eulerOutput.textContent = ``;
        return;
    };

    const fact = factorial(num);
    factorialSubtitle.textContent = `Fatorial de ${num}`;
    factorialOutput.textContent = `${num}! = ${fact}`;

    const e = euler(num);
    eulerSubtitle.textContent = `Número de euler`;
    eulerOutput.textContent = `${e}`;
});

// Functions

function factorial(num) {
    const bigNum = BigInt(num);
    let aggregated = bigNum;

    function factorialFunc(bigNum) {
        if (bigNum === 0n) {
            return 1n;
        } else if (bigNum === 1n) {
            return aggregated;
        };

        aggregated *= bigNum - 1n;
        return factorialFunc(bigNum - 1n);
    };

    return factorialFunc(bigNum);
};

function euler() {
    let euler = 0n;
    const precision = 100n;

    for (let i = 100n; i >= 0n; i -= 1n) {
        euler += (1n * (10n ** precision)) / factorial(i);
    };

    return `${euler.toString()[0]},${euler.toString().slice(1)}`;
};
