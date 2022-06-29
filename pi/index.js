// DOM Elements

const body = document.querySelector("body");
const contaniner = document.querySelector("#pi");

// Listenners

body.onload = function() {
    const value = pi().toString();
    contaniner.textContent = `${value[0]},${value.slice(1)}`;
};

// Functions

function pi() {
    const precision = 100n;
    let pi = 3n * (10n ** precision);

    for (let i = 1n; i <= 1000000n; i += 1n) {
        pi += (-1n) * ( ((-1n) ** i)) * ((4n * (10n ** precision)) / ((2n * i) * ((2n * i) + 1n) * ((2n * i) + 2n)));
    };

    return pi;
};
