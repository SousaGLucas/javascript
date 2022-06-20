// PRODUCTS

    const products = [
        {
            "id": 1,
            "name": "Produto A",
            "description": "Descrição do produto.",
            "value": 23.00,
            "includedAt": new Date().getTime()
        },
        {
            "id": 2,
            "name": "Produto B",
            "description": "Descrição do produto.",
            "value": 42.00,
            "includedAt": new Date().getTime()
        }
    ];

// MODALS STATES

    let listModalOn = false;
    let dataModalOn = false;
    let editModalOn = false;
    let confirmationModalOn = false;

// DOM ELEMENTS

    // LABELS
    const addNameLabel = document.querySelector("#add-name-label");
    const addDescriptionLabel = document.querySelector("#add-description-label");
    const addValueLabel = document.querySelector("#add-value-label");

    const editNameLabel = document.querySelector("#edit-name-label");
    const editDescriptionLabel = document.querySelector("#edit-description-label");
    const editValueLabel = document.querySelector("#edit-value-label");

    // INPUTS
    const addNameInput = document.querySelector("#add-name");
    const addDescriptionInput = document.querySelector("#add-description");
    const addValueInput = document.querySelector("#add-value");

    const editNameInput = document.querySelector("#edit-name");
    const editDescriptionInput = document.querySelector("#edit-description");
    const editValueInput = document.querySelector("#edit-value");

        // DEFAULT VALUES
        addValueInput.value = "0,00";
        editValueInput.value = "0,00";
    
    // SUCCESS MESSAGES
    const addSuccess = document.querySelector("#add-success");
    const editSuccess = document.querySelector("#edit-success");

    // ERRORS MESSAGES
    const addError = document.querySelector("#add-error");
    const addNameError = document.querySelector("#add-name-error");
    const addDescriptionError = document.querySelector("#add-description-error");
    const addValueError = document.querySelector("#add-value-error");

    const editError = document.querySelector("#edit-error");
    const editNameError = document.querySelector("#edit-name-error");
    const editDescriptionError = document.querySelector("#edit-description-error");
    const editValueError = document.querySelector("#edit-value-error");

    // BUTTONS
    const saveProductBtn = document.querySelector("#register-btn");
    const listProductsBtn = document.querySelector("#list-products-btn");

    // MODALS
    const modalContainer = document.querySelector("#modal-container");
    const productsListModal = document.querySelector("#products-list-modal");
    const productDataModal = document.querySelector("#products-data-modal");
    const editProductModal = document.querySelector("#edit-product-modal");
    const actionConfirmationModal = document.querySelector("#action-confirmation-modal");

    const listModalCloseBtn = document.querySelector("#products-list-modal-close-btn");
    const dataModalCloseBtn = document.querySelector("#products-data-modal-close-btn");
    const editModalCloseBtn = document.querySelector("#edit-product-modal-close-btn");

    // CONTAINERS
    const productsListContainer = document.querySelector("#modal-list");


// LISTENNERS

    // INPUTS
        addNameInput.addEventListener("input", resetNameError);
        addDescriptionInput.addEventListener("input", resetDescriptionError);

        addValueInput.addEventListener("input", (event) => {
            const input = parseInt(event.data, 10);
            let value = event.target.value;

            const position = addValueInput.selectionStart;
            
            resetValueError();

            if (isNaN(input) && event.inputType !== "deleteContentBackward") {
                value = `${value.substring(0, position -1)}${value.substring(position)}`;
                addValueInput.value = value;
                addValueInput.setSelectionRange(position - 1, position - 1);
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
                    addValueInput.value = `0,00`;
                    break;
                case 1:
                    addValueInput.value = `0,0${value}`;
                    break;
                case 2:
                    addValueInput.value = `0,${value}`;
                    break;
                case 3:
                    addValueInput.value = `${value[0]},${value.slice(-2)}`;
                    break;
                default:
                    addValueInput.value = `${value.slice(0, -2)},${value.slice(-2)}`;
            };

            addValueInput.setSelectionRange(position, position);
        });

        editNameInput.addEventListener("input", resetNameError);
        editDescriptionInput.addEventListener("input", resetDescriptionError);

        editValueInput.addEventListener("input", (event) => {
            const input = parseInt(event.data, 10);
            let value = event.target.value;

            const position = addValueInput.selectionStart;
            
            resetValueError();

            if (isNaN(input) && event.inputType !== "deleteContentBackward") {
                value = `${value.substring(0, position -1)}${value.substring(position)}`;
                addValueInput.value = value;
                addValueInput.setSelectionRange(position - 1, position - 1);
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
                    addValueInput.value = `0,00`;
                    break;
                case 1:
                    addValueInput.value = `0,0${value}`;
                    break;
                case 2:
                    addValueInput.value = `0,${value}`;
                    break;
                case 3:
                    addValueInput.value = `${value[0]},${value.slice(-2)}`;
                    break;
                default:
                    addValueInput.value = `${value.slice(0, -2)},${value.slice(-2)}`;
            };

            addValueInput.setSelectionRange(position, position);
        });

    // BUTTONS

        saveProductBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const name = addNameInput.value;
            const description = addDescriptionInput.value;
            const value = parseFloat(addValueInput.value.replace(",", "."), 10);

            if (validateEntries(name, description, value) !== true) {
                return;
            };

            saveProduct(name, description, value);
        });

        listProductsBtn.addEventListener("click", () => {
            openModalContainer();
            openListModal();

            showProductsList();
        });
    
    // MODALS

        listModalCloseBtn.addEventListener("click", () => {
            closeConfirmationModal();
            closeEditModal();
            closeDataModal();
            closeListModal();
            closeModalContainer();
        });


// ACTIONS

    // VALIDATION
        function validateEntries(name, description, value) {
            let hasError = false;

            resetErrors();

            if (name === "") {
                setAddNameError();
                hasError = true;
            };

            if (description === "") {
                setAddDescriptionError();
                hasError = true;
            };

            if (isNaN(value) || value < 0) {
                setAddValueError();
                hasError = true;
            };

            if (hasError) {
                setAddError();
                return false;
            };

            return true;
        };

    // RESET INPUTS

        function resetAddInputs() {
            addNameInput.value = "";
            addDescriptionInput.value = "";
            addValueInput.value = "";
        };

        function resetEditInputs() {
            editNameInput.value = "";
            editDescriptionInput.value = "";
            editValueInput.value = "";
        };

    // SET SUCCESS

        function setAddSuccess(product) {
            addSuccess.textContent = `Produto ${product.name} incluído com sucesso!`;
        };

        function setEditSuccess(product) {
            editSuccess.textContent = `Produto ${product.name} editado com sucesso!`;
        };

    // RESET SUCCESS

        function resetAddSuccess() {
            addSuccess.textContent = ``;
        };

        function resetEditSuccess() {
            editSuccess.textContent = ``;
        };

    // SET ERRORS

        function setAddError() {
            addError.textContent = "Falha no cadastro do produto!";
        };

        function setEditError() {
            editError.textContent = "Falha no cadastro do produto!";
        };

        function setAddNameError() {
            addNameInput.style.borderColor = "#FF2030";
            addNameInput.style.color = "#FF2030";
            addNameLabel.style.color = "#FF2030";
            addNameError.textContent = "Nome obrigatório";
        };
        function setEditNameError() {
            editNameInput.style.borderColor = "#FF2030";
            editNameInput.style.color = "#FF2030";
            editNameLabel.style.color = "#FF2030";
            editNameError.textContent = "Nome obrigatório";
        };

        function setAddDescriptionError() {
            addDescriptionInput.style.borderColor = "#FF2030";
            addDescriptionInput.style.color = "#FF2030";
            addDescriptionLabel.style.color = "#FF2030";
            addDescriptionError.textContent = "Descrição obrigatória";
        };

        function setEditDescriptionError() {
            editDescriptionInput.style.borderColor = "#FF2030";
            editDescriptionInput.style.color = "#FF2030";
            editDescriptionLabel.style.color = "#FF2030";
            editDescriptionError.textContent = "Descrição obrigatória";
        };

        function setAddValueError() {
            addValueInput.style.borderColor = "#FF2030";
            addValueInput.style.color = "#FF2030";
            addValueLabel.style.color = "#FF2030";
            addValueError.textContent = "Valor inválido";
        };

        function setEditValueError() {
            editValueInput.style.borderColor = "#FF2030";
            editValueInput.style.color = "#FF2030";
            editValueLabel.style.color = "#FF2030";
            editValueError.textContent = "Valor inválido";
        };

    // RESET ERRORS

        function resetErrors() {
            addError.textContent = "";

            resetNameError();
            resetDescriptionError();
            resetValueError();
        };

        function resetNameError() {
            addNameError.textContent = "";
            addNameInput.style.borderColor = "#212121";
            addNameInput.style.color = "#212121";
            addNameLabel.style.color = "#212121";
        };

        function resetDescriptionError() {
            addDescriptionError.textContent = "";
            addDescriptionInput.style.borderColor = "#212121";
            addDescriptionInput.style.color = "#212121";
            addDescriptionLabel.style.color = "#212121";
        };

        function resetValueError() {
            addValueError.textContent = "";
            addValueInput.style.borderColor = "#212121";
            addValueInput.style.color = "#212121";
            addValueLabel.style.color = "#212121";
        };

    // SHOW
        
        function showProductsList() {
            if (productsListContainer.contains(document.querySelector("#modal-list p"))) {
                removeEmptyListMessage();
            };

            if (productsListContainer.contains(document.querySelector("#product-table"))) {
                removeProductsList();
            };

            if (products.length === 0) {
                buildEmptyListMessage();
                return;
            };
            
            buildProductsList();
        };
    
// MODALS ACTIONS

    function openModalContainer() {
        modalContainer.style.display = "flex";
    };

    function closeModalContainer() {
        modalContainer.style.display = "none";
    };
    
    function openListModal() {
        listModalOn = true;
        productsListModal.style.display = "flex";
    };

    function closeListModal() {
        listModalOn = false;
        productsListModal.style.display = "none";
    };

    function openDataModal() {
        dataModalOn = true;
        productDataModal.style.display = "flex";
    };

    function closeDataModal() {
        dataModalOn = false;
        productDataModal.style.display = "none";
    };

    function openEditModal() {
        editModalOn = true;
        editProductModal.style.display = "flex";
    };

    function closeEditModal() {
        editModalOn = false;
        editProductModal.style.display = "none";
    };

    function openConfirmationModal() {
        confirmationModalOn = true;
        actionConfirmationModal.style.display = "flex";
    };

    function closeConfirmationModal() {
        confirmationModalOn = false;
        actionConfirmationModal.style.display = "none";
    };




// FUNCTIONS

    function saveProduct(name, description, value) {
        const product = {
            "id": products.length + 1,
            "name": name,
            "description": description,
            "value": value,
            "includedAt": new Date().getTime()
        };

        products.push(product);
        setAddSuccess(product);

        console.log(products);

        resetAddInputs();
        setTimeout(() => {
            resetAddSuccess();
        }, 3000);
    };

    // function showProductData(product) {
    //     openDataModal();

        
    // };


// COMPONENTS

    // EMPTY LIST MESSAGE

        function buildEmptyListMessage() {
            const message = document.createElement("p");
            message.textContent = "Não há produtos cadastrados!";

            productsListContainer.appendChild(message);
        };

        function removeEmptyListMessage() {
            productsListContainer.removeChild(document.querySelector("#modal-list p"));
        };

    // PRODUCTS LIST

        function buildProductsList() {
            let i = 0;

            const table = document.createElement("table");
            table.setAttribute("id", "product-table");

            const header = buildProductsListHeader();
            table.appendChild(header);

            while (i < products.length) {
                const item = buildProductsListItem(products[i]);
                table.appendChild(item);

                i += 1;
            };

            productsListContainer.appendChild(table);
        };

        function buildProductsListHeader() {
            const tr = document.createElement("tr");

            const thID = document.createElement("th");
            thID.setAttribute("class", "product-table-id-column");
            thID.textContent = "ID";

            const thName = document.createElement("th");
            thName.setAttribute("class", "product-table-name-column");
            thName.textContent = "Produto";

            const thValue = document.createElement("th");
            thValue.setAttribute("class", "product-table-value-column");
            thValue.textContent = "Valor";

            tr.appendChild(thID);
            tr.appendChild(thName);
            tr.appendChild(thValue);

            return tr;
        };

        function buildProductsListItem(product) {
            const tr = document.createElement("tr");
            tr.setAttribute("class", "product-banner");

            const tdID = document.createElement("td");
            tdID.setAttribute("class", "product-table-id-column");
            tdID.textContent = product.id;

            const tdName = document.createElement("td");
            tdName.setAttribute("class", "product-table-name-column");
            tdName.appendChild(buildNameButton(product));

            const tdValue = document.createElement("td");
            tdValue.setAttribute("class", "product-table-value-column");
            tdValue.textContent = `R$ ${product.value.toFixed(2).toString().replace(".", ",")}`;

            const tdEditButton = document.createElement("td");
            tdEditButton.setAttribute("class", "product-table-icon-column");
            tdEditButton.appendChild(buildEditButton(product));

            const tdDeleteButton = document.createElement("td");
            tdDeleteButton.setAttribute("class", "product-table-icon-column");
            tdDeleteButton.appendChild(buildDeleteButton(product));

            tr.appendChild(tdID);
            tr.appendChild(tdName);
            tr.appendChild(tdValue);
            tr.appendChild(tdEditButton);
            tr.appendChild(tdDeleteButton);

            return tr;
        };

        function buildNameButton(product) {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "text-btn");
            button.textContent = product.name;
            button.onclick = () => {console.log(`Name ${product.id}`)};
            return button;
        };

        function buildEditButton(product) {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "icon-btn");
            button.onclick = () => {console.log(`Edit ${product.id}`)};

            const img = document.createElement("img");
            img.setAttribute("src", "./icons/icon-edititon.svg");
            img.setAttribute("alt", "editar produto");

            button.appendChild(img);
            return button;
        };

        function buildDeleteButton(product) {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "icon-btn");
            button.onclick = () => {console.log(`Delete ${product.id}`)};

            const img = document.createElement("img");
            img.setAttribute("src", "./icons/icon-deletion.svg");
            img.setAttribute("alt", "deletar produto");

            button.appendChild(img);
            return button;
        };

        function removeProductsList() {
            productsListContainer.removeChild(document.querySelector("#product-table"));
        };

    // PRODUCT DATA

        