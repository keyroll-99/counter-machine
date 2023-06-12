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
const setArgsButton = document.querySelector("#set-args");
const x = document.querySelector("#x");
const y = document.querySelector("#y");

const setArgs = () => {
    const xValue = x.value;
    const yValue = y.value;

    buttons[1].innerHTML = xValue;
    buttons[2].innerHTML = yValue;
};

const reset = () => {
    buttons.forEach((x) => (x.innerHTML = 0));
    current_move = 0;
    current_step = 0;
    setArgs();
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
    let action = step.trim();
    if (action.includes(".")) {
        action = action.split(".")[1].charAt(0).toUpperCase();
    } else {
        action = action.charAt(0).toUpperCase();
    }
    console.log(step);
    console.log(action);
    if (action == "Z" || action == "S") {
        arg = step.split("(")[1].trim();
        arg = arg.replace(")", "");
        actions[action](arg);
    }

    if (action == "T") {
        const arg1 = step.split("(")[1].split(",")[0].trim();
        let arg2 = step.split("(")[1].split(",")[1].trim();
        arg2 = arg2.replace(")", "");

        actions[action](arg1, arg2);
    }

    if (action == "I") {
        console.log(step.split("(")[1].split(","));

        const arg1 = step.split("(")[1].split(",")[0].trim();
        const arg2 = step.split("(")[1].split(",")[1].trim();
        let arg3 = step.split("(")[1].split(",")[2].trim();
        arg3 = arg3.replace(")", "");
        actions[action](arg1, arg2, arg3);
    } else {
        current_step++;
    }

    actionNo.innerHTML = current_step;
});

setArgsButton.addEventListener("click", setArgs);

reset();
