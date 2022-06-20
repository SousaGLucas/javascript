// PRODUCTS

    const products = [];

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

    // ERRORS MESSAGES
    const addError = document.querySelector("#add-error");
    const addNameError = document.querySelector("#add-name-error");
    const addDescriptionError = document.querySelector("#add-description-error");
    const addValueError = document.querySelector("#add-value-error");

    const editError = document.querySelector("#edit-error");
    const editNameError = document.querySelector("#edit-name-error");
    const editDescriptionError = document.querySelector("#edit-description-error");
    const editValueError = document.querySelector("#edit-value-error");

    // FORMS
    const saveProductForm = document.querySelector("#register-form");
    const updateProductForm = document.querySelector("#update-form");

    // BUTTONS
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

            const position = editValueInput.selectionStart;
            
            resetValueError();

            if (isNaN(input) && event.inputType !== "deleteContentBackward") {
                value = `${value.substring(0, position -1)}${value.substring(position)}`;
                editValueInput.value = value;
                editValueInput.setSelectionRange(position - 1, position - 1);
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
                    editValueInput.value = `0,00`;
                    break;
                case 1:
                    editValueInput.value = `0,0${value}`;
                    break;
                case 2:
                    editValueInput.value = `0,${value}`;
                    break;
                case 3:
                    editValueInput.value = `${value[0]},${value.slice(-2)}`;
                    break;
                default:
                    editValueInput.value = `${value.slice(0, -2)},${value.slice(-2)}`;
            };

            // set cursor position
            if (value.length <= 3 && event.inputType === "deleteContentBackward") {
                editValueInput.setSelectionRange(position + 1, position + 1);
            } else {
                editValueInput.setSelectionRange(position, position);
            };
        });

    // BUTTONS

        saveProductForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = event.target["add-name"].value;
            const description = event.target["add-description"].value;
            const value = parseFloat(event.target["add-value"].value.replace(",", "."), 10);

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

        updateProductForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const id = event.target["edit-id"].value;
            const name = event.target["edit-name"].value;
            const description = event.target["edit-description"].value;
            const value = parseFloat(event.target["edit-value"].value.replace(",", "."), 10);

            if (validateEntries(name, description, value) !== true) {
                return;
            };

            updateProduct(id, name, description, value);
        });

        listModalCloseBtn.addEventListener("click", () => {
            closeConfirmationModal();
            closeEditModal();
            closeDataModal();
            closeListModal();
            closeModalContainer();
        });

        dataModalCloseBtn.addEventListener("click", () => {
            closeDataModal();
        });


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

        resetAddInputs();
        setTimeout(() => {
            resetAddSuccess();
        }, 3000);
    };

    function updateProduct(id, name, description, value) {
        let i = 0;

        const product = {
            "id": parseInt(id, 10),
            "name": name,
            "description": description,
            "value": parseFloat(value, 10),
            "includedAt": new Date().getTime()
        };

        do {
            if (products[i].id === parseInt(id, 10)) {
                break;
            };

            i += 1;
        } while (i < products.length);

        products[i] = product;

        resetEditInputs();
        closeEditModal();
        refreshProductsList();
    };

    function excludeProduct(id) {
        let i = 0;

        do {
            if (products[i].id === parseInt(id, 10)) {
                break;
            };

            i += 1;
        } while (i < products.length);

        products.splice(i, 1);
        refreshProductsList();
    };


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

    // MODALS
        
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

        function refreshProductsList() {
            removeProductsList();

            if (products.length === 0) {
                buildEmptyListMessage();
                return;
            };
            
            buildProductsList();
        };
    
        function showProductDataModal(product) {
            openDataModal();
    
            document.querySelector("#product-id").textContent = product.id;
            document.querySelector("#product-name").textContent = product.name;
            document.querySelector("#product-description").textContent = product.description;
            document.querySelector("#product-value").textContent = `R$ ${product.value.toFixed(2).replace(".", ",")}`;
            document.querySelector("#product-included-at").textContent = new Date(product.includedAt).toLocaleString();
        };

        function showEditModal(product) {
            openEditModal();
    
            document.querySelector("#edit-id").value = product.id;
            document.querySelector("#edit-name").value = product.name;
            document.querySelector("#edit-description").value = product.description;
            document.querySelector("#edit-value").value = product.value.toFixed(2).replace(".", ",");
        };
    
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

            button.onclick = () => {
                showProductDataModal(product);
            };
            return button;
        };

        function buildEditButton(product) {
            const button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "icon-btn");

            button.onclick = () => {
                showEditModal(product);
            };

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

            button.onclick = () => {
                excludeProduct(product.id);
            };

            const img = document.createElement("img");
            img.setAttribute("src", "./icons/icon-deletion.svg");
            img.setAttribute("alt", "deletar produto");

            button.appendChild(img);
            return button;
        };

        function removeProductsList() {
            productsListContainer.removeChild(document.querySelector("#product-table"));
        };
