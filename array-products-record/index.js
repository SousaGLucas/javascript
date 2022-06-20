// PRODUCTS

    const products = [];

// DOM ELEMENTS

    // LABELS
    const productNameLabel = document.querySelector("#product-name-label");
    const productDescriptionLabel = document.querySelector("#product-description-label");
    const productValueLabel = document.querySelector("#product-value-label");

    // INPUTS
    const productNameInput = document.querySelector("#product-name");
    const productDescriptionInput = document.querySelector("#product-description");
    const productValueInput = document.querySelector("#product-value");

        // DEFAULT VALUES
        productValueInput.value = "0,00";

    // ERRORS MESSAGES
    const generalError = document.querySelector("#general-error");
    const productNameError = document.querySelector("#product-name-error");
    const productDescriptionError = document.querySelector("#product-description-error");
    const productValueError = document.querySelector("#product-value-error");

    // BUTTONS
    const saveProductBtn = document.querySelector("#register-btn");
    const listProductsBtn = document.querySelector("#list-products-btn");

// LISTENNERS

    // INPUTS
        productNameInput.addEventListener("input", resetProductNameError);
        productDescriptionInput.addEventListener("input", resetProductDescriptionError);

        productValueInput.addEventListener("input", (event) => {
            const input = parseInt(event.data, 10);
            let value = event.target.value;

            const position = productValueInput.selectionStart;
            
            resetProductValueError();

            if (isNaN(input) && event.inputType !== "deleteContentBackward") {
                value = `${value.substring(0, position -1)}${value.substring(position)}`;
                productValueInput.value = value;
                productValueInput.setSelectionRange(position - 1, position - 1);
                return;
            };

            // only numbers in value
            value = value.replace(",", "");

            // remove on the left
            while (value[0] === "0") {
                value = value.slice(1);
            };

            switch (value.length) {
                case 0:
                    productValueInput.value = `0,00`;
                    break;
                case 1:
                    productValueInput.value = `0,0${value}`;
                    break;
                case 2:
                    productValueInput.value = `0,${value}`;
                    break;
                case 3:
                    productValueInput.value = `${value[0]},${value.slice(-2)}`;
                    break;
                default:
                    productValueInput.value = `${value.slice(0, -2)},${value.slice(-2)}`;
            };

            productValueInput.setSelectionRange(position, position);
        });

    // BUTTONS

        saveProductBtn.addEventListener("click", (event) => {
            event.preventDefault();

            if (validateEntries() === false) {
                
            };
        });
    

    // MODALS

        

// FUNCTIONS


// ACTIONS

    function validateEntries() {
        const name = productNameInput.value;
        const description = productDescriptionInput.value;
        const value = parseFloat(productValueInput.value, 10).toFixed(2);

        let hasError = false;

        console.log(name === "", description === "", value);

        resetErrors();

        if (name === "") {
            setProductNameError();
            hasError = true;
        };

        if (description === "") {
            setProductDescriptionError();
            hasError = true;
        };

        if (isNaN(value) || value < 0) {
            setProductValueError();
            hasError = true;
        };

        if (hasError) {
            setGeneralError();
            return false;
        };

        return true;
    };

    // SET ERRORS

        function setGeneralError() {
            generalError.textContent = "Falha no cadastro do produto!";
        };

        function setProductNameError() {
            productNameInput.style.borderColor = "#FF2030";
            productNameInput.style.color = "#FF2030";
            productNameLabel.style.color = "#FF2030";
            productNameError.textContent = "Nome obrigatório";
        };

        function setProductDescriptionError() {
            productDescriptionInput.style.borderColor = "#FF2030";
            productDescriptionInput.style.color = "#FF2030";
            productDescriptionLabel.style.color = "#FF2030";
            productDescriptionError.textContent = "Nome obrigatório";
        };

        function setProductValueError() {
            productValueInput.style.borderColor = "#FF2030";
            productValueInput.style.color = "#FF2030";
            productValueLabel.style.color = "#FF2030";
            productValueError.textContent = "Valor inválido";
        };

    // RESET ERRORS

        function resetErrors() {
            generalError.textContent = "";

            resetProductNameError();
            resetProductDescriptionError();
            resetProductValueError();
        };

        function resetProductNameError() {
            productNameError.textContent = "";
            productNameInput.style.borderColor = "#212121";
            productNameInput.style.color = "#212121";
            productNameLabel.style.color = "#212121";
        };

        function resetProductDescriptionError() {
            productDescriptionError.textContent = "";
            productDescriptionInput.style.borderColor = "#212121";
            productDescriptionInput.style.color = "#212121";
            productDescriptionLabel.style.color = "#212121";
        };

        function resetProductValueError() {
            productValueError.textContent = "";
            productValueInput.style.borderColor = "#212121";
            productValueInput.style.color = "#212121";
            productValueLabel.style.color = "#212121";
        };
