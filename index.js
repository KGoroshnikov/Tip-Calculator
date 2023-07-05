let billInput = document.getElementById("bill-inpt");
let errorBill = document.getElementById("error-bill");
let finalBill = 0;

let peopleInput = document.getElementById("people-inpt");
let errorState = document.getElementById("error");
let finalPeople = 0;

let tipInput = document.getElementById("tip-inpt");
let tipAmount = 0;

let tipOutput = document.getElementById("output-tip-js");
let totalOutput = document.getElementById("output-total-js");
let lastTipBtn = null;

let resetBtn = document.getElementById("reset-button");
let resetActive = false;

peopleInput.addEventListener('input', function (evt) {inputChange(errorState, peopleInput.value, peopleInput, 1);});
billInput.addEventListener('input', function (evt) {inputChange(errorBill, billInput.value, billInput, 2);});
tipInput.addEventListener('input', function (evt) {tipSelected(null, tipInput.value);});

function inputChange(error, val, inpt, type){
  if (val == "" || isNaN(val) || Number(val) == 0 || (type == 1 && /^\d+$/.test(val) == false)){
    error.style.display = "block";
    inpt.style.borderColor = "rgb(255, 107, 107)";
  }
  else{
    if (type == 2) finalBill = Number(val);
    else if (type == 1) finalPeople = Number(val);

    error.style.display = "none";
    inpt.style.borderColor = null;
  }

  displayResult();
}

function tipSelected(btn, val){
  if (val == "" || isNaN(val)) return;
  
  if (btn != null)
  {
    btn.style.backgroundColor = "hsl(172, 67%, 50%)";
    btn.style.color = "hsl(183, 100%, 15%)";
    if (lastTipBtn != null)
    {
      lastTipBtn.style.backgroundColor = "hsl(183, 100%, 15%)";
      lastTipBtn.style.color = "hsl(189, 41%, 97%)";
    }
    lastTipBtn = btn;
  }
  tipAmount = val;
  
  displayResult();
}

function displayResult(){
  if (finalPeople == 0) return;

  resetActive = true;
  resetBtn.style.opacity = "1";

  let allTips = finalBill / 100 * tipAmount;
  let tipPerPerson = allTips / finalPeople;
  let totalPerPerson = (finalBill + allTips) / finalPeople;

  tipOutput.textContent = "$" + tipPerPerson.toFixed(2);
  totalOutput.textContent = "$" + totalPerPerson.toFixed(2);

  if (String(tipPerPerson.toFixed(2)).length >= 10 || String(totalPerPerson.toFixed(2)).length >= 10){
    if (window.screen.width > 550){
      tipOutput.style.fontSize = "40px";
      totalOutput.style.fontSize = "40px";
    }
    else{
      tipOutput.style.fontSize = "30px";
      totalOutput.style.fontSize = "30px";
    }
  }
}

function resetButton(){
  if(!resetActive) return;

  resetBtn.style.backgroundColor = "hsl(172, 67%, 75%)";
  setTimeout(resetHoverOUT, 150);

  finalPeople = 1;
  finalBill = 0;
  tipAmount = 0;
  displayResult();
  finalPeople = 0;
  resetActive = false;
  diactivateReset();
  resetHover();
  billInput.value = "";
  peopleInput.value = "";
  tipInput.value = "";
  if (lastTipBtn != null)
  {
    lastTipBtn.style.backgroundColor = "hsl(183, 100%, 15%)";
    lastTipBtn.style.color = "hsl(189, 41%, 97%)";
  }
}

function diactivateReset(){
  resetBtn.style.opacity = "0.3";
}

function resetHover(){
  if(!resetActive) return;
  resetBtn.style.backgroundColor = "hsl(172, 67%, 60%)";
}

function resetHoverOUT(){
  if(!resetActive) return;
  resetBtn.style.backgroundColor = "hsl(172, 67%, 45%)";
}