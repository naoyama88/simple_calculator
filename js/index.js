"use strict";

let totalDisplay = document.getElementById("total");
let totalValue = "0";
let finishedCalculation = true;

function setDisplayValue(value) {
    totalValue = value;
    totalDisplay.textContent = value;
}

function addNumber(num) {
    clickInit();
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
    clickInit();
    if (finishedCalculation) {
        totalValue = "0";
        finishedCalculation = false;
    }

    const length = totalValue.length;
    switch (totalValue[length - 1]) {
        case ".":
            // can't put 2 points in a row
            return;
        case "+":
        case "-":
        case "*":
        case "/":
            totalValue = totalValue + "0";
    }

    let lastNumber = getLastOperand(totalValue);
    if (hasPoint(lastNumber)) {
        // point already exists
        return;
    }

    setDisplayValue(totalValue + ".");
}

function addOperator(operator) {
    clickInit();
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
    clickInit();
    try {
        setDisplayValue(evalCalculation(totalValue).toString());
        finishedCalculation = true;
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.log(totalValue);
            console.log("This formula cannot be calculated.");
            document.getElementById('errorMessage').classList.add('errorMessage--active');
        } else {
            console.log("I caught an error, but it wasn't a SyntaxError. I handle all non-SyntaxErrors here.");
        }
    }
}

function allClear() {
    clickInit();
    setDisplayValue("0");
}

function backSpace() {
    clickInit();
    const length = totalValue.length;
    if (length === 1) {
        setDisplayValue("0");
    } else {
        setDisplayValue(totalValue.slice(0, -1));
    }
}

function getLastOperand(numStr) {
    return numStr.split(/(\+|\-|\*|\/)/).pop();
}

function hasPoint(numStr) {
    if (numStr.match(/\./)) {
        // point already exists
        return true;
    }

    return false;
}

function clickInit() {
    document.getElementById('errorMessage').classList.remove('errorMessage--active');
}