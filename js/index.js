"use strict";

let totalDisplay = document.getElementById("total");
let totalValue = "0";
let finishedCalculation = true;

function setDisplayValue(value) {
    totalValue = value;
    totalDisplay.textContent = value;
}

function addNumber(num) {
    if (finishedCalculation) {
        totalValue = "0";
    }
    finishedCalculation = false;

    if (totalValue === "0") {
        setDisplayValue(num);
    } else {
        setDisplayValue(totalValue + num);
    }
}

function addPoint() {
    if (finishedCalculation) {
        totalValue = "0";
        finishedCalculation = false;
    }

    const length = totalValue.length;
    switch (totalValue[length - 1]) {
        case ".":
            // can't put 2 points in a row
            return;
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            totalValue = totalValue + "0";
    }

    setDisplayValue(totalValue + ".");
}

function addOperator(operator) {
    finishedCalculation = false;

    if (totalValue === "-") {
        // do nothing if the previous charactor is just a '-'
        return;
    } else if (totalValue === "0" && operator === "-") {
        // just switch from '0' to '-'
        setDisplayValue(operator);
    } else {
        const length = totalValue.length;
        switch (totalValue[length - 1]) {
            case "+":
            case "-":
            case "*":
            case "/":
                totalValue = totalValue.slice(0, -1) + operator;
                break;
            case ".":
                totalValue = totalValue.slice(0, -1);
                break;
            default:
                // if the previous charactor is number
                break;
        }
        // replace the last operator to the new operator
        setDisplayValue(totalValue + operator);
    }
}

function calculate() {
    setDisplayValue(evalCalculation(totalValue).toString());
    finishedCalculation = true;
}

function allClear() {
    setDisplayValue("0");
}

function backSpace() {
    const length = totalValue.length;
    if (length === 1) {
        setDisplayValue("0");
    } else {
        setDisplayValue(totalValue.slice(0, -1));
    }
}
