// DOM ELEMENTS

const input1 = document.querySelector("#input1");
const input2 = document.querySelector("#input2");
const message = document.querySelector("#message");

// LISTENNERS

    // SUM

    document.querySelector("#sum-btn").addEventListener("click", function() {
        resetMessage();

        const valid = validateEntries("sum", input1.value, input2.value);
        if (valid === false) {
            return;
        };

        const num1 = parseInt(input1.value, 10);
        const num2 = parseInt(input2.value, 10);

        const result = sum(num1, num2);
        setMessageResult("sum", result);
    });

    // SUBTRACTION

    document.querySelector("#subtraction-btn").addEventListener("click", function() {
        resetMessage();

        const valid = validateEntries("subtraction", input1.value, input2.value);
        if (valid !== true) {
            return;
        };

        const num1 = parseInt(input1.value, 10);
        const num2 = parseInt(input2.value, 10);

        const result = subtraction(num1, num2);
        setMessageResult("subtraction", result);
    });

    // MULTIPLICATION

    document.querySelector("#multiplication-btn").addEventListener("click", function() {
        resetMessage();

        const valid = validateEntries("multiplication", input1.value, input2.value);
        if (valid !== true) {
            return;
        };

        const num1 = parseInt(input1.value, 10);
        const num2 = parseInt(input2.value, 10);

        const result = multiplication(num1, num2);
        setMessageResult("multiplication", result);
    });

    // POTENTIATION

    document.querySelector("#potentiation-btn").addEventListener("click", function() {
        resetMessage();

        const valid = validateEntries("potentiation", input1.value, input2.value);
        if (valid !== true) {
            return;
        };

        const num1 = parseInt(input1.value, 10);
        const num2 = parseInt(input2.value, 10);

        const result = potentiation(num1, num2);
        setMessageResult("potentiation", result);
    });

    // DIVISION

    document.querySelector("#division-btn").addEventListener("click", function() {
        resetMessage();

        const valid = validateEntries("division", input1.value, input2.value);
        if (valid !== true) {
            return;
        };

        const num1 = parseInt(input1.value, 10);
        const num2 = parseInt(input2.value, 10);

        const result = division(num1, num2);
        setMessageResult("division", result);
    });

// ACTIONS

    function resetMessage() {
        message.setAttribute("class", "text text-ligth");
        message.textContent = "";
    };

    function setMessageError(error) {
        message.setAttribute("class", "error");
        message.textContent = error;
    };

    function setMessageResult(operation, result) {
        switch (operation) {
            case "sum":
                message.textContent = `A soma ${input1.value} + ${input2.value} é igual a ${result}`;
                break;
            case "subtraction":
                message.textContent = `A subtração ${input1.value} - ${input2.value} é igual a ${result}`;
                break;
            case "multiplication":
                message.textContent = `A multiplicação ${input1.value} * ${input2.value} é igual a ${result}`;
                break;
            case "potentiation":
                message.textContent = `A potência ${input1.value} ** ${input2.value} é igual a ${result}`;
                break;
            case "division":
                message.textContent = `A divisão ${input1.value} / ${input2.value} é igual a ${result}`;
                break;
        };
    };

    function validateEntries(operation, param1, param2) {
        const num1 = parseInt(param1, 10);
        const num2 = parseInt(param2, 10);

        try {
            if (operation === "subtraction" && num2 > num1) {
                throw `Error: [subtract] Impossible to subtract ${param1} - ${param2}`;
            };

            if (operation === "division" && num2 === 0) {
                throw `Error: [divide] Division by zero`;
            };

            if (isNaN(num1) || isNaN(num2) || num1 < 0 || num2 < 0) {
                console.log(num1, num2);

                switch (operation) {
                    case "sum":
                        throw `Error: [sum] Impossible to sum ${param1} + ${param2}`;
                    case "subtraction":
                        throw `Error: [subtract] Impossible to subtract ${param1} - ${param2}`;
                    case "multiplication":
                        throw `Error: [multiply] Impossible to multiply ${param1} * ${param2}`;
                    case "potentiation":
                        throw `Error: [multiply] Impossible to multiply ${param1} * ${param1}`;
                    case "division":
                        throw `Error: [divide] Impossible to divice ${param1} / ${param2}`;
                };
            };

            return true;
        } catch (e) {
            setMessageError(e);
            return false;
        };
    };

// FUNCTIONS

    // SUM

    function sum(num1, num2) {
        return num1 + num2;
    };

    // SUBTRACTION

    function subtraction(param1, param2) {
        let calls = 0;

        function subtractionFunc(num1, num2) {
            if (num2 === num1) {
                return calls;                
            };

            calls = sum(calls, 1);

            return subtractionFunc(num1, sum(num2, 1));
        };

        return subtractionFunc(param1, param2);
    };

    // MULTIPLICATION

    function multiplication(param1, param2) {
        let calls = 0;
        let aggregated = 0;

        function multiplicationFunc(num1, num2) {
            if (calls === num2) {
                return aggregated;
            };
    
            aggregated = sum(aggregated, num1);
            calls = sum(calls, 1);
            return multiplicationFunc(num1, num2);
        };

        return multiplicationFunc(param1, param2);
    };

    // POTENTIATION

    function potentiation(param1, param2) {
        let calls = 0;
        let aggregated = param1;

        if (param2 === 0) {
            return 1;
        };

        function potentiationFunc(num1, num2) {
            if (calls === subtraction(num2, 1)) {
                return aggregated;
            };

            aggregated = multiplication(aggregated, num1);
            calls = sum(calls, 1);

            return potentiationFunc(num1, num2);
        };

        return potentiationFunc(param1, param2);
    };

    // DIVISION

    function division(param1, param2) {
        let calls = 0;
        let rest = param1;

        function divisionFunc(num1, num2) {
            if (rest < num2) {
                return calls;
            };
    
            rest = subtraction(rest, num2);
            calls = sum(calls, 1);
    
            return divisionFunc(num1, num2);
        };
        
        return divisionFunc(param1, param2);
    };
