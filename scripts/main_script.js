const buttons = document.querySelectorAll(".button");
const buttonsMemory = document.querySelectorAll(".memory__button");
const displayResult = document.querySelector(".display__result");
const displayOperation = document.querySelector(".display__operation");
const listMemory = document.querySelector(".listmemory");
const buttonViewListMemory = document.querySelector(".memory__button--list");



//----DECLARAR NOMBRE DE TECLAS----\\
let numberOne = 0;
let numberTwo = 0;
let waitSecondNumber = false;
let resultObtained = false;
let operationRealized = false;
let newNumberEntered = false;
let matchSign = '';
let memory = 0;
let memorySelected = 0;
buttonsMemory[0].disabled = true;
buttonsMemory[1].disabled = true;
listMemory.style.transform = "translateX(-200px)"

for (let index = 0; index < buttons.length; index++) {

    buttons[index].addEventListener("mousedown", function () {
        let indexOfSign = displayOperation.textContent.search(/[÷x+-]/g);
        //let matchSign = displayOperation.textContent.match(/[÷x+-]/g);
        let operation = displayOperation.textContent.substring(indexOfSign, indexOfSign + 1);

        //displayResult.textContent = displayResult.textContent.replace(',', '');

        switch (index) {
            case 0:
                //PORCENTAGE
                ValidateOperation(true, true)
                break;
            case 1:
                //CLEAR ALL
                displayOperation.textContent = "0";
                displayResult.textContent = "0";
                numberOne = "0";
                numberTwo = "0";
                displayResult.style.fontSize = "2.5rem";
                break;
            case 2:
                //CLEAR
                displayOperation.textContent = "0";
                displayResult.textContent = "0";
                numberOne = "0";
                numberTwo = "0";
                displayResult.style.fontSize = "2.5rem";
                break;
            case 3:
                //BACKSPACE
                displayResult.textContent = displayResult.textContent.substring(0, displayResult.textContent.length - 1)
                if (displayResult.textContent == "") displayResult.textContent = "0";
                break;
            case 4:
                //DERIVATIVE
                if (displayResult.textContent != "0") {
                    numberOne = displayResult.textContent;
                    displayResult.textContent = 1 / displayResult.textContent;
                    displayOperation.textContent = `1/(${numberOne})`
                }
                break;
            case 5:
                //EXPONENT SQUARED
                if (displayResult.textContent != "0") {
                    numberOne = displayResult.textContent;
                    displayResult.textContent = numberOne * numberOne;
                    displayOperation.textContent = `1/(${numberOne})`
                }
                break;
            case 6:
                //SQUARE ROOT
                if (displayResult.textContent != "0") {
                    numberOne = displayResult.textContent;
                    displayResult.textContent = Math.sqrt(displayResult.textContent);
                    displayOperation.textContent = `√(${numberOne})`
                }
                break;
            case 7:
                //DIVISION
                SelectOperation("÷");
                break;
            case 8:
                //NUMBER SEVEN
                SelectNumberPress("7");
                break;
            case 9:
                //NUMBER EIGHT
                SelectNumberPress("8");
                break;
            case 10:
                //NUMBER NINE
                SelectNumberPress("9");
                break;
            case 11:
                //MULTIPLICATION
                SelectOperation("x");
                break;
            case 12:
                //NUMBER FOUR
                SelectNumberPress("4");
                break;
            case 13:
                //NUMBER FIVE
                SelectNumberPress("5");
                break;
            case 14:
                //NUMBER SIX
                SelectNumberPress("6");
                break;
            case 15:
                //SUBSTRACTION
                SelectOperation("-");
                break;
            case 16:
                //NUMBER ONE
                SelectNumberPress("1");
                break;
            case 17:
                //NUMBER TWO
                SelectNumberPress("2");
                break;
            case 18:
                //NUMBER THREE
                SelectNumberPress("3");
                break;
            case 19:
                //ADDITION
                SelectOperation("+");
                break;
            case 20:
                //SIGN
                if (displayResult.textContent > 0) {
                    displayResult.textContent = "-" + displayResult.textContent;
                } else {
                    displayResult.textContent = displayResult.textContent.replace("-", "");
                }
                break;
            case 21:
                //NUMBER ZERO
                SelectNumberPress("0");
                break;
            case 22:
                //DOT
                if (!displayResult.textContent.includes(".")) {
                    if (waitSecondNumber || resultObtained) {
                        displayResult.textContent = '0';
                        waitSecondNumber = false;
                    }
                    //if (displayResult.textContent == '0') displayResult.textContent = '';
                    displayResult.textContent += ".";
                    newNumberEntered = true;
                }
                break;
            case 23:
                //EQUAL
                ValidateOperation(true, false);
                break;
            default:
                break;
        }
        if (displayResult.textContent.length > 14 && displayResult.textContent.length < 18) {
            displayResult.style.fontSize = "2rem";
        } else if (displayResult.textContent.length > 17) {
            displayResult.style.fontSize = "1.5rem";
        } else if (displayResult.textContent.length < 14) {
            displayResult.style.fontSize = "2.5rem";
        }
    })
}

for (let index = 0; index < buttonsMemory.length; index++) {
    buttonsMemory[index].addEventListener("mousedown", function () {
        switch (index) {
            case 0:
                memory = 0;
                while (listMemory.firstChild) {
                    listMemory.removeChild(listMemory.firstChild);
                }
                buttonsMemory[0].disabled = true;
                buttonsMemory[1].disabled = true;
                break;
            case 1:
                displayResult.textContent = memory;
                displayResult.textContent = listMemory.children[memorySelected].textContent;
                break;
            case 2:
                memory = Number(displayResult.textContent) + Number(memory);
                listMemory.children[memorySelected].children[0].innerText = `${memory}`;
                memory = 0;
                break;
            case 3:
                memory = Number(memory) - Number(displayResult.textContent);
                listMemory.children[memorySelected].children[0].innerText = `${memory}`;
                memory = 0;
                break;
            case 4:
                memory = displayResult.textContent;
                buttonsMemory[0].disabled = false;
                buttonsMemory[1].disabled = false;
                CreateListMemory();
                break;
            default:
                break;
        }

    })
}

function CreateListMemory() {
    const newMemoryNode = document.createElement("div");
    listMemory.appendChild(newMemoryNode);

    const newMemoryContent = document.createElement("p");
    const memoryText = document.createTextNode(displayResult.textContent);
    newMemoryContent.appendChild(memoryText);
    newMemoryNode.appendChild(newMemoryContent);


    const newButtonDelete = document.createElement("button");
    newMemoryNode.appendChild(newButtonDelete);

    newButtonDelete.addEventListener("mousedown", function () {
        newMemoryNode.remove(newButtonDelete);

    })
    newMemoryNode.addEventListener("mousedown", function (e) {
        for (let index = 0; index < listMemory.childElementCount; index++) {
            listMemory.children[index].style.background = "linear-gradient(-45deg,#1a1a1a, #161616)";
            listMemory.children[index].style.color = "whitesmoke"
            listMemory.children[index].style.fontWeight = "200";
            if (e.target == listMemory.children[index]) {
                memorySelected = index;
                memory = listMemory.children[index].textContent;
                e.target.style.background = "rgb(172, 120, 9)";
                e.target.style.color = "black";
                e.target.style.fontWeight = "300";
            }
        }

    })
}
buttonViewListMemory.addEventListener("mousedown", function () {
    if (listMemory.style.transform == "translateX(-200px)") {
        listMemory.style.transform = "translateX(1px)"
        buttonViewListMemory.textContent = "◄";
    } else {
        listMemory.style.transform = "translateX(-200px)"
        buttonViewListMemory.textContent = "►"
    }
})


function SelectNumberPress(number) {
    if (displayResult.textContent.length < 25) {
        if (waitSecondNumber || resultObtained) {
            displayResult.textContent = '0';
            waitSecondNumber = false;
        }
        if (displayResult.textContent == '0') displayResult.textContent = '';
        displayResult.textContent += number;
        newNumberEntered = true;
    }
}
function SelectOperation(operator) {
    operationRealized = false;
    if (displayResult.textContent != '0' && !displayOperation.textContent.includes(operator)) {
        numberOne = Number(displayResult.textContent);
        matchSign = operator;
        displayOperation.textContent = `${numberOne}${matchSign}`;
        newNumberEntered = false;
    }
    if (displayOperation.textContent.includes("=")) {
        numberOne = Number(displayResult.textContent);
        matchSign = operator;
        displayOperation.textContent = `${numberOne}${matchSign}`;
        newNumberEntered = false;
    }
    if (numberTwo == 0 && newNumberEntered) {
        ValidateOperation(false, false);
    }
    waitSecondNumber = true;
}



function ValidateOperation(type, porcentage) {
    if (displayResult.textContent != "0" && !operationRealized) {
        numberTwo = Number(displayResult.textContent)
    } else {
        numberOne = Number(displayResult.textContent)
    }
    if (matchSign == '') {
        displayOperation.textContent = displayResult.textContent + "=";
        resultObtained = true;
    }
    if (matchSign != '') {
        if (porcentage) {
            numberTwo = ((Number(numberOne) / 100) * Number(numberTwo));
            if(porcentage && (matchSign == "x" || matchSign == "÷")) numberOne = 1;
        }
        switch (matchSign) {
            case '+':
                displayResult.textContent = Number(numberOne) + Number(numberTwo);
                break;
            case '-':
                displayResult.textContent = Number(numberOne) - Number(numberTwo);
                break;
            case '÷':
                displayResult.textContent = Number(numberOne) / Number(numberTwo);
                break;
            case 'x':
                displayResult.textContent = Number(numberOne) * Number(numberTwo);
                break;
            default:
                break;
        }
    }
    if (type) {
        displayOperation.textContent = `${numberOne}${matchSign}${numberTwo}=`;

    } else {
        displayOperation.textContent = `${numberOne}${matchSign}`;
        numberTwo = 0;
    }
    numberOne = displayResult.textContent;

    operationRealized = true;
}




