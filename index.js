let current_step = 0;
let current_move = 0;
let steps = [];

const nextButton = document.querySelector("#next-step");
const resetButton = document.querySelector("#reset");
const compileButton = document.querySelector("#compile");
const textArea = document.querySelector("#input");
const buttons = document.querySelectorAll(".element");
const moveText = document.querySelector("#move");
const actionNo = document.querySelector("#action-no");

const reset = () => {
    buttons.forEach((x) => (x.innerHTML = 0));
    current_move = 0;
    current_step = 0;
};

const resetValue = (n) => {
    buttons[n].innerHTML = 0;
};

const addValue = (n) => {
    let currentValue = parseInt(buttons[n].innerHTML);
    buttons[n].innerHTML = ++currentValue;
};

const assignValue = (n, m) => {
    buttons[m].innerHTML = buttons[n].innerHTML;
};

const move = (n, m, q) => {
    console.log(buttons[m].innerHTML == buttons[n].innerHTML);
    console.log(q);
    if (buttons[m].innerHTML == buttons[n].innerHTML) {
        current_step = q;
    } else {
        current_step++;
    }
};

const actions = {
    Z: resetValue,
    S: addValue,
    T: assignValue,
    I: move,
};

compileButton.addEventListener("click", () => {
    current_step = 0;

    const text = textArea.value;

    steps = text.split(";");

    current_move = 0;
    moveText.innerHTML = 0;
    reset();
});

resetButton.addEventListener("click", reset);

nextButton.addEventListener("click", () => {
    if (current_step >= steps.length) {
        alert("end");
        return;
    }
    moveText.innerHTML = ++current_move;

    const step = steps[current_step];
    const action = step.trim().charAt(0).toUpperCase();
    if (action == "Z" || action == "S") {
        arg = step.split("(")[1].charAt(0);
        actions[action](arg);
    }

    if (action == "T") {
        const arg1 = step.split("(")[1].split(",")[0].trim().charAt(0);
        const arg2 = step.split("(")[1].split(",")[1].trim().charAt(0);

        actions[action](arg1, arg2);
    }

    if (action == "I") {
        console.log(step.split("(")[1].split(","));

        const arg1 = step.split("(")[1].split(",")[0].trim().charAt(0);
        const arg2 = step.split("(")[1].split(",")[1].trim().charAt(0);
        const arg3 = step.split("(")[1].split(",")[2].trim().charAt(0);
        actions[action](arg1, arg2, arg3);
    } else {
        current_step++;
    }

    actionNo.innerHTML = current_step;
});

reset();
