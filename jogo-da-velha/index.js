// DOM Elements
const elements = document.querySelectorAll(".element");

// Variables

let playerTurn = 0;
let restarting = false;

let values = [[NaN, NaN, NaN], [NaN, NaN, NaN], [NaN, NaN, NaN]];

// Events

window.onload = function() {
    buildBoardGrid();

    for (let i = 0; i < elements.length; i += 1) {
        const el = elements[i];
        el.onclick = function() {
            if (parseInt(el.dataset.clicked, 10) === 0 && restarting === false) {
                setElementContent(el);
                check();
            };
        };
    };
};

// Functions

function setElementContent(el) {
    switch (playerTurn) {
        case 0:
            playerTurn = 1;
            el.querySelector("p").textContent = "X";
            saveElementValue(el, 1);
            break;
        case 1:
            playerTurn = 0;
            el.querySelector("p").textContent = "O";
            saveElementValue(el, 0);
            break;
    };

    el.dataset.clicked = 1;
};

function saveElementValue(el, value) {
    const [ line, column ] = el.dataset.element.split("-");
    values[line][column] = value;
};

function check() {
    let end = false;

    // lines
    if (values[0][0] === values[0][1] && values[0][0] === values[0][2]) {
        showLine("line0");
        end = true;
    };
    if (values[1][0] === values[1][1] && values[1][0] === values[1][2]) {
        showLine("line1");
        end = true;
    };
    if (values[2][0] === values[2][1] && values[2][0] === values[2][2]) {
        showLine("line2");
        end = true;
    };

    // columns
    if (values[0][0] === values[1][0] && values[0][0] === values[2][0]) {
        showLine("column0");
        end = true;
    };
    if (values[0][1] === values[1][1] && values[0][1] === values[2][1]) {
        showLine("column1");
        end = true;
    };
    if (values[0][2] === values[1][2] && values[0][2] === values[2][2]) {
        showLine("column2");
        end = true;
    };

    // diagonals
    if (values[0][0] === values[1][1] && values[0][0] === values[2][2]) {
        showLine("diagonal0");
        end = true;
    };
    if (values[0][2] === values[1][1] && values[0][2] === values[2][0]) {
        showLine("diagonal1");
        end = true;
    };

    if (end || tied()) {
        initRestart();
    };
};

function tied() {
    for (let i = 0; i < values.length; i += 1) {
        for (let j = 0; j < values[i].length; j += 1) {
            if (isNaN(values[i][j])) {
                return false;
            };
        };
    };

    return true;
};

function initRestart() {
    restarting = true;
    setTimeout(restart, 2000);
};

function restart() {
    values = [[NaN, NaN, NaN], [NaN, NaN, NaN], [NaN, NaN, NaN]];

    for (let i = 0; i < elements.length; i += 1) {
        elements[i].dataset.clicked = 0;
        elements[i].querySelector("p").textContent = "";

        const lines = elements[i].querySelectorAll("div");
        for (let j = 0; j < lines.length; j += 1) {
            lines[j].style.display = "none";
        };
    };

    restarting = false;
};

function buildBoardGrid() {
    for (let i = 0; i < elements.length; i += 1) {
        switch (i) {
            case 0: case 1: case 3: case 4: case 6: case 7:
                elements[i].style.borderRight = "solid 3px #212121";
                break;
        };

        switch (i) {
            case 0: case 1: case 2: case 3: case 4: case 5:
                elements[i].style.borderBottom = "solid 3px #212121";
                break;
        };
    };
};

function showLine(position) {
    switch (position) {
        case "line0":
            elements[0].querySelector(".horizontal").style.display = "flex";
            elements[1].querySelector(".horizontal").style.display = "flex";
            elements[2].querySelector(".horizontal").style.display = "flex";
            break;
        case "line1":
            elements[3].querySelector(".horizontal").style.display = "flex";
            elements[4].querySelector(".horizontal").style.display = "flex";
            elements[5].querySelector(".horizontal").style.display = "flex";
            break;
        case "line2":
            elements[6].querySelector(".horizontal").style.display = "flex";
            elements[7].querySelector(".horizontal").style.display = "flex";
            elements[8].querySelector(".horizontal").style.display = "flex";
            break;
        case "column0":
            elements[0].querySelector(".vertical").style.display = "flex";
            elements[3].querySelector(".vertical").style.display = "flex";
            elements[6].querySelector(".vertical").style.display = "flex";
            break;
        case "column1":
            elements[1].querySelector(".vertical").style.display = "flex";
            elements[4].querySelector(".vertical").style.display = "flex";
            elements[7].querySelector(".vertical").style.display = "flex";
            break;
        case "column2":
            elements[2].querySelector(".vertical").style.display = "flex";
            elements[5].querySelector(".vertical").style.display = "flex";
            elements[8].querySelector(".vertical").style.display = "flex";
            break;
        case "diagonal0":
            elements[0].querySelector(".diagonal-desc").style.display = "flex";
            elements[4].querySelector(".diagonal-desc").style.display = "flex";
            elements[8].querySelector(".diagonal-desc").style.display = "flex";
            break;
        case "diagonal1":
            elements[2].querySelector(".diagonal-asc").style.display = "flex";
            elements[4].querySelector(".diagonal-asc").style.display = "flex";
            elements[6].querySelector(".diagonal-asc").style.display = "flex";
            break;
    };
};
