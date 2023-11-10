const Operations = { 
    NONE: "", 
    ADD: "+", 
    SUB: "-", 
    MUL: "x", 
    DIV: "÷", 
    POW: "^", 
    SQRT: "√", 
    EQ: "="
};

var prevValue = "";
var curOperation = Operations.NONE;
var curValue = "0"
var valueChanged = false;

let updateView = () => {
    
    document.calc.expr.value = prevValue + curOperation;
    document.calc.txt.value = curValue;
    document.getElementById("clr").textContent = curValue == "0" ? "C" : "CE";
}

function onDigit(digit) {
    if (!valueChanged || curValue == "0")
        curValue =  digit != '.' ? digit : "0.";
    else
        curValue += digit;

    if (curOperation == Operations.EQ) {
        curOperation = Operations.NONE;
        prevValue = "";
    }

    valueChanged = true;
    updateView();
}

let unaryOp = (a, op) => {
    var result = "";

    switch (op) {
    case Operations.SQRT: result = a ** 0.5; break;
    }

    return result + "";
}

let binaryOp = (a, op, b) => {
    var result = "";

    switch (op) {
    case Operations.ADD: result = Number(a) + Number(b); break;
    case Operations.SUB: result =  a - b; break;
    case Operations.MUL: result =  a * b; break;
    case Operations.DIV: result =  a / b; break;
    case Operations.POW: result =  a ** b; break;
    }

    return result + "";
}

let onOperation = function(operation) {
    switch (operation) {
    case Operations.EQ:
        if (curOperation != Operations.NONE && curOperation != Operations.EQ) {
            var newValue = binaryOp(prevValue, curOperation, curValue);
            prevValue += curOperation + curValue;
            curOperation = operation;
            curValue = newValue;
            valueChanged = false;
        }
        break;
    case Operations.SQRT: 
        prevValue = operation + "(" + curValue + ")";
        curValue = unaryOp(curValue, operation);
        curOperation = Operations.EQ;
        valueChanged = false;
        break;
    case Operations.NONE: break;
    default:
        if (valueChanged && curOperation != Operations.NONE) {
            curValue = binaryOp(prevValue, curOperation, curValue);
            prevValue = curValue;
            valueChanged = false;
        }
        else if (curOperation == Operations.NONE || curOperation == Operations.EQ) {
            prevValue = curValue;
            valueChanged = false;
        }

        curOperation = operation;
    }
    updateView();
}

let onBackspace = () => {
    curValue = curValue.slice(0, -1);

    if (curValue == "")
        curValue = "0"

    if (curOperation == Operations.EQ) {
        prevValue = "";
        curOperation = Operations.NONE;
    }
    
    valueChanged = true;
    updateView();
}

let onDecimal = () => {
    if (curValue.indexOf(".") < 0 || !valueChanged) {
        onDigit('.');
    }
}

let onClear = () => {
    if (curOperation == Operations.EQ || curValue == "0") {
        prevValue = "";
        curOperation = Operations.NONE;
        valueChanged = false;
    }

    curValue = "0";
    updateView();
}