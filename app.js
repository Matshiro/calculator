const allButtons = document.querySelector("#numpad");
const resultWindow = document.getElementById("bottomText");
const lastResultWindow = document.getElementById("upperText");
let functionButtonUsed = false;
let decimalButtonUsed = false;
let valueOne = 0;
let valueSecond = 0;
let operator = "";
let resetted = false;

allButtons.addEventListener('click', (event) =>{
    if(!event.target.closest("button")) return;

    const key = event.target;
    const keyValue = key.textContent;
    

    if(key.classList.contains("numberButton")){       
        if(decimalButtonUsed == true && key.id == "decimalButton") return;
        if(lastResultWindow.textContent.includes("=")){
            resetAll();
        }
        if(valueOne > 0 && operator != "" && resetted == false){
            resultWindow.textContent = "0";
            resetted = true;
        }
        if(resultWindow.textContent === "0"){
            if(key.id == "decimalButton"){
                resultWindow.textContent += keyValue;
            }
            resultWindow.textContent = keyValue;
        }
        else{
            console.log(resultWindow.textContent.length);
            if(resultWindow.textContent.length >= 7) return;
            resultWindow.textContent += keyValue;
        }
        if(key.id == "decimalButton"){
            decimalButtonUsed = true;
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
            valueOne = parseInt(resultWindow.textContent);
            operator = keyValue;
            decimalButtonUsed = false;
        }
        else if(key.id == "plusminusButton"){
            if(parseInt(resultWindow.textContent) > 0){
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
            valueOne = parseInt(resultWindow.textContent);
        }
        else{
            valueSecond = parseInt(resultWindow.textContent);
        }
        calculate();
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
    if(operator == "+") resultWindow.textContent = valueOne + valueSecond;
    if(operator == "-") resultWindow.textContent = valueOne - valueSecond;
    if(operator == "*") resultWindow.textContent = valueOne * valueSecond;
    if(operator == "/"){
        if(valueSecond == 0){
            resultWindow.textContent = "Don't divide by 0 pls.";
            return;
        }
        else resultWindow.textContent = valueOne / valueSecond;
    }
    lastResultWindow.textContent = valueOne + operator + valueSecond + "=";
}