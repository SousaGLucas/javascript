// DOM Elements

const body = document.querySelector("body");

// Listenners

body.onload = function() {
    const primeNumbers = prime100000();

    primeNumbers.forEach((item, index) => {
        const p = document.createElement("p");
        p.textContent = item;
        document.querySelector(`#column${(index % 13) + 1}`).appendChild(p);
    });
};

// Functions

function prime100000() {
    const max = 100000;
    const primeNumbers = [];

    for (let num = 1; num < max; num += 1) {
        let isPrime = true;
        for (let i = 1; i < num; i += 1) {
            if (num % i === 0 && i !== 1) {
                isPrime = false;
                break;
            };
        };

        if (isPrime) {
            primeNumbers.push(num);
        };
    };

    return primeNumbers;
};
