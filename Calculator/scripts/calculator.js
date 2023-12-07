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

let makeCalculator = function() {
    var prevValue = "";
    var curOperation = Operations.NONE;
    var curValue = "0"
    var valueChanged = false;

    function updateView() {
        
        document.calc.expr.value = prevValue + curOperation;
        document.calc.txt.value = curValue;
        document.getElementById("clr").textContent = curValue == "0" ? "C" : "CE";
    }

    function doProcessDigit(digit) {
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

    function doProcessEqual() {
        if (curOperation != Operations.NONE && curOperation != Operations.EQ) {
            var newValue = binaryOp(prevValue, curOperation, curValue);
            prevValue += curOperation + curValue;
            curOperation = Operations.EQ;
            curValue = newValue;
            valueChanged = false;
        }
    }

    function doProcessUnaryOp(operation) {
        prevValue = operation + "(" + curValue + ")";
        curValue = unaryOp(curValue, operation);
        curOperation = Operations.EQ;
        valueChanged = false;
    }
    
    function doProcessOpDefault(operation) {
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

    return {
        processDigit: function(digit) {
           doProcessDigit(digit);
        }, 
        processOperation: function(operation) {
            switch (operation) {
            case Operations.EQ: 
                doProcessEqual(); break;
            case Operations.SQRT: 
                doProcessUnaryOp(operation); break;
            case Operations.NONE:
                break;
            default:
                doProcessOpDefault(operation);
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
                doProcessDigit('.');
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
    };
};

let calculatorObject = makeCalculator();

var onDigit = digit => {
    calculatorObject.processDigit(digit);
}

var onOperation = operation => {
    calculatorObject.processOperation(operation);
}

var onBackspace = () => {
    calculatorObject.processBackspace();
}

var onDecimal = () => {
    calculatorObject.processDecimal();
}

var onClear = () => {
    calculatorObject.processClear();
}