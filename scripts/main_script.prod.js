"use strict";var buttons=document.querySelectorAll(".button"),buttonsMemory=document.querySelectorAll(".memory__button"),displayResult=document.querySelector(".display__result"),displayOperation=document.querySelector(".display__operation"),listMemory=document.querySelector(".listmemory"),buttonViewListMemory=document.querySelector(".memory__button--list"),numberOne=0,numberTwo=0,waitSecondNumber=!1,resultObtained=!1,operationRealized=!1,newNumberEntered=!1,matchSign="",memory=0,memorySelected=0;buttonsMemory[0].disabled=!0,buttonsMemory[1].disabled=!0,listMemory.style.transform="translateX(-200px)";for(var _loop=function(t){buttons[t].addEventListener("mousedown",function(){var e=displayOperation.textContent.search(/[÷x+-]/g);displayOperation.textContent.substring(e,e+1);switch(t){case 0:ValidateOperation(!0,!0);break;case 1:case 2:displayOperation.textContent="0",displayResult.textContent="0",numberTwo=numberOne="0",displayResult.style.fontSize="2.5rem";break;case 3:displayResult.textContent=displayResult.textContent.substring(0,displayResult.textContent.length-1),""==displayResult.textContent&&(displayResult.textContent="0");break;case 4:"0"!=displayResult.textContent&&(numberOne=displayResult.textContent,displayResult.textContent=1/displayResult.textContent,displayOperation.textContent="1/(".concat(numberOne,")"));break;case 5:"0"!=displayResult.textContent&&(numberOne=displayResult.textContent,displayResult.textContent=numberOne*numberOne,displayOperation.textContent="1/(".concat(numberOne,")"));break;case 6:"0"!=displayResult.textContent&&(numberOne=displayResult.textContent,displayResult.textContent=Math.sqrt(displayResult.textContent),displayOperation.textContent="√(".concat(numberOne,")"));break;case 7:SelectOperation("÷");break;case 8:SelectNumberPress("7");break;case 9:SelectNumberPress("8");break;case 10:SelectNumberPress("9");break;case 11:SelectOperation("x");break;case 12:SelectNumberPress("4");break;case 13:SelectNumberPress("5");break;case 14:SelectNumberPress("6");break;case 15:SelectOperation("-");break;case 16:SelectNumberPress("1");break;case 17:SelectNumberPress("2");break;case 18:SelectNumberPress("3");break;case 19:SelectOperation("+");break;case 20:0<displayResult.textContent?displayResult.textContent="-"+displayResult.textContent:displayResult.textContent=displayResult.textContent.replace("-","");break;case 21:SelectNumberPress("0");break;case 22:displayResult.textContent.includes(".")||((waitSecondNumber||resultObtained)&&(displayResult.textContent="0",waitSecondNumber=!1),displayResult.textContent+=".",newNumberEntered=!0);break;case 23:ValidateOperation(!0,!1)}14<displayResult.textContent.length&&displayResult.textContent.length<18?displayResult.style.fontSize="2rem":17<displayResult.textContent.length?displayResult.style.fontSize="1.5rem":displayResult.textContent.length<14&&(displayResult.style.fontSize="2.5rem")})},index=0;index<buttons.length;index++)_loop(index);for(var _loop2=function(e){buttonsMemory[e].addEventListener("mousedown",function(){switch(e){case 0:for(memory=0;listMemory.firstChild;)listMemory.removeChild(listMemory.firstChild);buttonsMemory[0].disabled=!0,buttonsMemory[1].disabled=!0;break;case 1:displayResult.textContent=memory,displayResult.textContent=listMemory.children[memorySelected].textContent;break;case 2:memory=Number(displayResult.textContent)+Number(memory),listMemory.children[memorySelected].children[0].innerText="".concat(memory),memory=0;break;case 3:memory=Number(memory)-Number(displayResult.textContent),listMemory.children[memorySelected].children[0].innerText="".concat(memory),memory=0;break;case 4:memory=displayResult.textContent,buttonsMemory[0].disabled=!1,buttonsMemory[1].disabled=!1,CreateListMemory()}})},_index=0;_index<buttonsMemory.length;_index++)_loop2(_index);function CreateListMemory(){var e=document.createElement("div");listMemory.appendChild(e);var t=document.createElement("p"),n=document.createTextNode(displayResult.textContent);t.appendChild(n),e.appendChild(t);var r=document.createElement("button");e.appendChild(r),r.addEventListener("mousedown",function(){e.remove(r)}),e.addEventListener("mousedown",function(e){for(var t=0;t<listMemory.childElementCount;t++)listMemory.children[t].style.background="linear-gradient(-45deg,#1a1a1a, #161616)",listMemory.children[t].style.color="whitesmoke",listMemory.children[t].style.fontWeight="200",e.target==listMemory.children[t]&&(memorySelected=t,memory=listMemory.children[t].textContent,e.target.style.background="rgb(172, 120, 9)",e.target.style.color="black",e.target.style.fontWeight="300")})}function SelectNumberPress(e){displayResult.textContent.length<25&&((waitSecondNumber||resultObtained)&&(displayResult.textContent="0",waitSecondNumber=!1),"0"==displayResult.textContent&&(displayResult.textContent=""),displayResult.textContent+=e,newNumberEntered=!0)}function SelectOperation(e){operationRealized=!1,"0"==displayResult.textContent||displayOperation.textContent.includes(e)||(numberOne=Number(displayResult.textContent),matchSign=e,displayOperation.textContent="".concat(numberOne).concat(matchSign),newNumberEntered=!1),displayOperation.textContent.includes("=")&&(numberOne=Number(displayResult.textContent),matchSign=e,displayOperation.textContent="".concat(numberOne).concat(matchSign),newNumberEntered=!1),0==numberTwo&&newNumberEntered&&ValidateOperation(!1,!1),waitSecondNumber=!0}function ValidateOperation(e,t){if("0"==displayResult.textContent||operationRealized?numberOne=Number(displayResult.textContent):numberTwo=Number(displayResult.textContent),""==matchSign&&(displayOperation.textContent=displayResult.textContent+"=",resultObtained=!0),""!=matchSign)switch(t&&(numberTwo=Number(numberOne)/100*Number(numberTwo),!t||"x"!=matchSign&&"÷"!=matchSign||(numberOne=1)),matchSign){case"+":displayResult.textContent=Number(numberOne)+Number(numberTwo);break;case"-":displayResult.textContent=Number(numberOne)-Number(numberTwo);break;case"÷":displayResult.textContent=Number(numberOne)/Number(numberTwo);break;case"x":displayResult.textContent=Number(numberOne)*Number(numberTwo)}e?displayOperation.textContent="".concat(numberOne).concat(matchSign).concat(numberTwo,"="):(displayOperation.textContent="".concat(numberOne).concat(matchSign),numberTwo=0),numberOne=displayResult.textContent,operationRealized=!0}buttonViewListMemory.addEventListener("mousedown",function(){"translateX(-200px)"==listMemory.style.transform?(listMemory.style.transform="translateX(1px)",buttonViewListMemory.textContent="◄"):(listMemory.style.transform="translateX(-200px)",buttonViewListMemory.textContent="►")});