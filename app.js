const allButtons = document.querySelector("#numpad");
const resultWindow = document.getElementById("bottomText");
const lastResultWindow = document.getElementById("upperText");
let functionButtonUsed = false;
let decimalButtonUsed = false;
let valueOne = 0;
let valueSecond = 0;
let operator = "";
let resetted = false;
let inputLimit = 9;

allButtons.addEventListener('click', (event) =>{
    if(!event.target.closest("button")) return;

    const key = event.target;
    const keyValue = key.textContent;
    

    if(key.classList.contains("numberButton")){       
        if(decimalButtonUsed == true && key.id == "decimalButton") return;
        if(lastResultWindow.textContent.includes("=")){
            resetAll();
        }
        if(key.id == "decimalButton"){
            decimalButtonUsed = true;
        }
        if(valueOne > 0 && operator != "" && resetted == false||
           valueOne < 0 && operator != "" && resetted == false){
            resultWindow.textContent = "0";
            resetted = true;
        }
        if(resultWindow.textContent == "0"){
            if(key.id == "decimalButton"){
                resultWindow.textContent = 0 + keyValue;
                return;
            }
            resultWindow.textContent = keyValue;
        }
        else{
            if(resultWindow.textContent.length >= inputLimit) return;
            resultWindow.textContent += keyValue;
        }
        
    }
    else if(key.classList.contains("functionButton")){
        tooMany = false;
        if(lastResultWindow.textContent.includes("=")){
            operator = keyValue;
            lastResultWindow.textContent = valueOne + operator;
        }
        if(key.id != "plusminusButton" && functionButtonUsed == false){
            lastResultWindow.textContent = resultWindow.textContent + keyValue;
            functionButtonUsed = true;
            valueOne = parseFloat(resultWindow.textContent);
            operator = keyValue;
            decimalButtonUsed = false;
        }
        else if(key.id == "plusminusButton"){
            if(parseFloat(resultWindow.textContent) > 0){
                resultWindow.textContent = Math.abs(resultWindow.textContent) * -1;
            }
            else{
                resultWindow.textContent = Math.abs(resultWindow.textContent);
            }
        }
    }
    else if(key.id == "ceButton"){
        resultWindow.textContent = "0";
        valueSecond = 0;
        decimalButtonUsed = false;
        resetted = false;
    }
    else if(key.id == "cButton"){
        resetAll();
    }
    else if(key.id == "equalsButton"){
        resetted = false;
        if(lastResultWindow.textContent.includes("=")){
            valueOne = parseFloat(resultWindow.textContent);
        }
        else{
            valueSecond = parseFloat(resultWindow.textContent);
        }
        if(valueOne != 0) calculate();
    }
}
);

function resetAll(){
    resultWindow.textContent = "0";
    lastResultWindow.textContent = "";
    valueOne = 0;
    valueSecond = 0;
    operator = "";
    functionButtonUsed = false;
    decimalButtonUsed = false;
    changedOperator = false;
    resetted = false;
}

function calculate(){
    let resultBeforeCheck
    if(operator == "+") resultBeforeCheck = valueOne + valueSecond;
    if(operator == "-") resultBeforeCheck = valueOne - valueSecond;
    if(operator == "*") resultBeforeCheck = valueOne * valueSecond;
    if(operator == "/"){
        if(valueSecond == 0){
            resultWindow.textContent = "Pls don't";
            return;
        }
        else resultBeforeCheck = valueOne / valueSecond;
    }
    let fixedDecimal = resultBeforeCheck.toFixed(3);
    console.log(fixedDecimal.toString());
    if(fixedDecimal.toString().length >= inputLimit){
        resultWindow.textContent = resultBeforeCheck.toExponential(3);
    }
    else resultWindow.textContent = resultBeforeCheck.toFixed(3);
    lastResultWindow.textContent = valueOne + operator + valueSecond + "=";
}