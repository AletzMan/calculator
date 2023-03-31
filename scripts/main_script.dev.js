"use strict";

var buttons = document.querySelectorAll(".button");
var buttonsMemory = document.querySelectorAll(".memory__button");
var displayResult = document.querySelector(".display__result");
var displayOperation = document.querySelector(".display__operation");
var listMemory = document.querySelector(".listmemory");
var buttonViewListMemory = document.querySelector(".memory__button--list"); //----DECLARAR NOMBRE DE TECLAS----\\

var numberOne = 0;
var numberTwo = 0;
var waitSecondNumber = false;
var resultObtained = false;
var operationRealized = false;
var newNumberEntered = false;
var matchSign = '';
var memory = 0;
var memorySelected = 0;
buttonsMemory[0].disabled = true;
buttonsMemory[1].disabled = true;
listMemory.style.transform = "translateX(-200px)";

var _loop = function _loop(index) {
  buttons[index].addEventListener("mousedown", function () {
    var indexOfSign = displayOperation.textContent.search(/[÷x+-]/g); //let matchSign = displayOperation.textContent.match(/[÷x+-]/g);

    var operation = displayOperation.textContent.substring(indexOfSign, indexOfSign + 1); //displayResult.textContent = displayResult.textContent.replace(',', '');

    switch (index) {
      case 0:
        //PORCENTAGE
        ValidateOperation(true, true);
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
        displayResult.textContent = displayResult.textContent.substring(0, displayResult.textContent.length - 1);
        if (displayResult.textContent == "") displayResult.textContent = "0";
        break;

      case 4:
        //DERIVATIVE
        if (displayResult.textContent != "0") {
          numberOne = displayResult.textContent;
          displayResult.textContent = 1 / displayResult.textContent;
          displayOperation.textContent = "1/(".concat(numberOne, ")");
        }

        break;

      case 5:
        //EXPONENT SQUARED
        if (displayResult.textContent != "0") {
          numberOne = displayResult.textContent;
          displayResult.textContent = numberOne * numberOne;
          displayOperation.textContent = "1/(".concat(numberOne, ")");
        }

        break;

      case 6:
        //SQUARE ROOT
        if (displayResult.textContent != "0") {
          numberOne = displayResult.textContent;
          displayResult.textContent = Math.sqrt(displayResult.textContent);
          displayOperation.textContent = "\u221A(".concat(numberOne, ")");
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
          } //if (displayResult.textContent == '0') displayResult.textContent = '';


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
  });
};

for (var index = 0; index < buttons.length; index++) {
  _loop(index);
}

var _loop2 = function _loop2(_index) {
  buttonsMemory[_index].addEventListener("mousedown", function () {
    switch (_index) {
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
        listMemory.children[memorySelected].children[0].innerText = "".concat(memory);
        memory = 0;
        break;

      case 3:
        memory = Number(memory) - Number(displayResult.textContent);
        listMemory.children[memorySelected].children[0].innerText = "".concat(memory);
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
  });
};

for (var _index = 0; _index < buttonsMemory.length; _index++) {
  _loop2(_index);
}

function CreateListMemory() {
  var newMemoryNode = document.createElement("div");
  listMemory.appendChild(newMemoryNode);
  var newMemoryContent = document.createElement("p");
  var memoryText = document.createTextNode(displayResult.textContent);
  newMemoryContent.appendChild(memoryText);
  newMemoryNode.appendChild(newMemoryContent);
  var newButtonDelete = document.createElement("button");
  newMemoryNode.appendChild(newButtonDelete);
  newButtonDelete.addEventListener("mousedown", function () {
    newMemoryNode.remove(newButtonDelete);
  });
  newMemoryNode.addEventListener("mousedown", function (e) {
    for (var _index2 = 0; _index2 < listMemory.childElementCount; _index2++) {
      listMemory.children[_index2].style.background = "linear-gradient(-45deg,#1a1a1a, #161616)";
      listMemory.children[_index2].style.color = "whitesmoke";
      listMemory.children[_index2].style.fontWeight = "200";

      if (e.target == listMemory.children[_index2]) {
        memorySelected = _index2;
        memory = listMemory.children[_index2].textContent;
        e.target.style.background = "rgb(172, 120, 9)";
        e.target.style.color = "black";
        e.target.style.fontWeight = "300";
      }
    }
  });
}

buttonViewListMemory.addEventListener("mousedown", function () {
  if (listMemory.style.transform == "translateX(-200px)") {
    listMemory.style.transform = "translateX(1px)";
    buttonViewListMemory.textContent = "◄";
  } else {
    listMemory.style.transform = "translateX(-200px)";
    buttonViewListMemory.textContent = "►";
  }
});

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
    displayOperation.textContent = "".concat(numberOne).concat(matchSign);
    newNumberEntered = false;
  }

  if (displayOperation.textContent.includes("=")) {
    numberOne = Number(displayResult.textContent);
    matchSign = operator;
    displayOperation.textContent = "".concat(numberOne).concat(matchSign);
    newNumberEntered = false;
  }

  if (numberTwo == 0 && newNumberEntered) {
    ValidateOperation(false, false);
  }

  waitSecondNumber = true;
}

function ValidateOperation(type, porcentage) {
  if (displayResult.textContent != "0" && !operationRealized) {
    numberTwo = Number(displayResult.textContent);
  } else {
    numberOne = Number(displayResult.textContent);
  }

  if (matchSign == '') {
    displayOperation.textContent = displayResult.textContent + "=";
    resultObtained = true;
  }

  if (matchSign != '') {
    if (porcentage) {
      numberTwo = Number(numberOne) / 100 * Number(numberTwo);
      if (porcentage && (matchSign == "x" || matchSign == "÷")) numberOne = 1;
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
    displayOperation.textContent = "".concat(numberOne).concat(matchSign).concat(numberTwo, "=");
  } else {
    displayOperation.textContent = "".concat(numberOne).concat(matchSign);
    numberTwo = 0;
  }

  numberOne = displayResult.textContent;
  operationRealized = true;
}