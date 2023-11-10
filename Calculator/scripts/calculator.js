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

var makeCalculator = function () {
    var prevValue = "";
    var curOperation = Operations.NONE;
    var curValue = "0"
    var valueChanged = false;

    function updateView() {
        
        document.calc.expr.value = prevValue + curOperation;
        document.calc.txt.value = curValue;
        document.getElementById("clr").textContent = curValue == "0" ? "C" : "CE";
    }

    return {
        processDigit: function(digit) {
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
        }, 
        processOperation: function(operation) {
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
        },
        processBackspace: function() {
            curValue = curValue.slice(0, -1);

            if (curValue == "")
                curValue = "0"

            if (curOperation == Operations.EQ) {
                prevValue = "";
                curOperation = Operations.NONE;
            }
            
            valueChanged = true;
            updateView();
        },
        processDecimal: function() {
            if (curValue.indexOf(".") < 0 || !valueChanged) {
                onDigit('.');
            }
        },
        processClear: function() {
            if (curOperation == Operations.EQ || curValue == "0") {
                prevValue = "";
                curOperation = Operations.NONE;
                valueChanged = false;
            }
        
            curValue = "0";
            updateView();
        }
    }
};

var calculatorObject = makeCalculator();

let onDigit = digit => {
    calculatorObject.processDigit(digit);
}

let onOperation = operation => {
    calculatorObject.processOperation(operation);
}

let onBackspace = () => {
    calculatorObject.processBackspace();
}

let onDecimal = () => {
    calculatorObject.processDecimal();
}

let onClear = () => {
    calculatorObject.processClear();
}