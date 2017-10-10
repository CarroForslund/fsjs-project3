/* VARIABLE DECLARATION
*/
const nameField = document.querySelector("fieldset").querySelector("input[id='name']");
const emailField = document.querySelector("fieldset").querySelector("input[id='mail']");
const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const paymentSelect = document.getElementById("payment");
const creditCardOption = paymentSelect.querySelector("option[value='credit card']");
const cardNumberField = document.querySelector("input[id='cc-num']");
const cardZipCodeField = document.querySelector("input[id='zip']");
const cardCVVField = document.querySelector("input[id='cvv']");

//Variables for input values
let name = document.querySelector("fieldset").querySelector("input[id='name']").value;
let email = document.querySelector("fieldset").querySelector("input[id='mail']").value;
let cardNumber = document.querySelector("input[id='cc-num']").value;
let cardZipCode = document.querySelector("input[id='zip']").value;
let cardCVV = document.querySelector("input[id='cvv']").value;

//Variables for Error Messages
let nameErrorMessageShow = false;
let emailErrorMessageShow = false;
let activityErrorMessageShow = false;
let cardErrorMessageShow = false;
let zipErrorMessageShow = false;
let cvvErrorMessageShow = false;
//let checkedActivity = checkActivities(); //If at least one activity is selected it will be true

/* HIGHLIGHT NAME INPUT FIELD ON PAGE LOAD
*/
function highLight(){
  nameField.focus();
  nameField.select();
};

/* HIDE/SHOW OTHER JOB ROLE FIELD
** Show when the "Other" option is selected from the "Job Role" drop down menu.
** Hide on all the other job role options
*/
function titleForm(){
  const title = document.getElementById("title");
  const fieldset = document.querySelector("fieldset");
  const otherRole = document.querySelector("input[id='other-title']");
  otherRole.setAttribute("style", "display: none");

  title.onchange = function() {
    const value = this.value;
    if (value !== 'other'){
      otherRole.setAttribute("style", "display: none");
      return;
    } else {
      otherRole.setAttribute("style", "display: block");
      otherRole.placeholder = "Your Job Role";
    };
  }
};

/* T-SHIRT FORM SECTION
** Display the color options that match
** the design selected in the "Design" menu.
*/
function shirtForm(){
  const design = document.getElementById("design");
  removeColorOptions();

  design.onchange = function() {
    const value = this.value;
    removeColorOptions();
    addColorOptions(value);
  };

  function removeColorOptions(){
    const colors = document.getElementById("colors-js-puns");
    if(typeof colors !== 'undefined' && colors !== null){
      colors.parentNode.removeChild(colors);
    };
  };

  function addColorOptions(value){
    const shirtFieldset = document.querySelector('fieldset[class="shirt"]');
    const div = document.createElement("div");
    div.id ="colors-js-puns";
    div.class = "";
    shirtFieldset.appendChild(div);

    const label = document.createElement("label");
    label.for = "color";
    label.textContent = "Color:";
    div.appendChild(label);

    const select = document.createElement("select");
    select.id = "color";
    div.appendChild(select);

    if(value === "js puns"){

      const option1 = document.createElement('option');
      option1.value = "cornflowerblue";
      option1.text = "Cornflower Blue";
      select.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = "darkslategrey";
      option2.text = "Dark Slate Grey";
      select.appendChild(option2);

      const option3 = document.createElement('option');
      option3.value = "gold";
      option3.text = "Gold";
      select.appendChild(option3);

    } else if(value === "heart js"){

      const option1 = document.createElement('option');
      option1.value = "tomato";
      option1.text = "Tomato";
      select.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = "steelblue";
      option2.text = "Steel Blue";
      select.appendChild(option2);

      const option3 = document.createElement('option');
      option3.value = "dimgrey";
      option3.text = "Dim Grey";
      select.appendChild(option3);

    } else {
      removeColorOptions();
    };
  };
};

/* ACTIVITY CHECKBOX FORM SECTION
** Makes sure you can't book colliding activities.
** Calculates the total price of selected activities.
*/
function activities(){
  const activityFieldset = document.querySelector('fieldset[class="activities"]');
  const activitiesInput = activityFieldset.querySelectorAll('input[type="checkbox"]');

  let totalPrice = 0;
  let priceParagraph = document.createElement("p");
  priceParagraph.textContent = "Total Price: $" + totalPrice;
  activityFieldset.appendChild(priceParagraph);

  //When checkbox state change get time and price
  for (let i = 0; i < activitiesInput.length; i++){

    activitiesInput[i].onchange = function() {

      if (activitiesInput[i].checked){
        const selectedActivityDetails = getActivityDetails(activitiesInput[i]);

        //compare unchecked checkboxes disable checkboxes with same time as checked
        for (let i = 0; i < activitiesInput.length; i++){

          if (!activitiesInput[i].checked){
            const comparedActivity = activitiesInput[i];
            const comparedActivitysDetails = getActivityDetails(comparedActivity);
            if (comparedActivitysDetails.time === selectedActivityDetails.time){
              comparedActivity.setAttribute("disabled", "");
            };
          };
        };
        totalPrice += parseInt(selectedActivityDetails.price);
        priceParagraph.textContent = "Total Price: $" + totalPrice;

      } else {
        const deselectedActivityDetails = getActivityDetails(activitiesInput[i]);

        //compare unchecked checkboxes and disable checkboxes with same time as checked
        for (let i = 0; i < activitiesInput.length; i++){

          if (activitiesInput[i].hasAttribute("disabled")){
            const comparedActivity = activitiesInput[i];
            const comparedActivitysDetails = getActivityDetails(comparedActivity);
            if (comparedActivitysDetails.time === deselectedActivityDetails.time){
              comparedActivity.removeAttribute("disabled");
            };
          };
        };
        totalPrice -= parseInt(deselectedActivityDetails.price);
        priceParagraph.textContent = "Total Price: $" + totalPrice;
      };
    };
  };

  function getActivityDetails(activity){
    const string = activity.parentNode.textContent; //all the text content
    const name = string.slice(1, string.indexOf("—") -1); //Only the activity name
    const price = string.substring(string.indexOf("$") + 1); //Only the price (excl $ sign)
    let time = "No time set";
    if (name !== "Main Conference"){
      time = string.substring(string.indexOf("—") + 2);
      time = time.slice(0, time.indexOf(","));
    };
    let activityDetails = {
      name: "",
      time: "",
      price: ""
    };

    activityDetails.name = name;
    activityDetails.time = time;
    activityDetails.price = price;

    return activityDetails;
  };
};

/* PAYMENT SECTION
** Select and deselect options
** Only show relevant information to chosen payment method
*/
function paymentSection(){
  //Declare variables
  const creditCardDiv = document.getElementById("credit-card");
  const paypalDiv = document.getElementById("paypal");
  const bitcoinDiv = document.getElementById("bitcoin");
  const paypalOption = document.querySelector("option[value='paypal']");
  const bitcoinOption = document.querySelector("option[value='bitcoin']");
  const paymentSelect = document.getElementById("payment");

  //Set credit card to default payment method
  creditCardOption.setAttribute("selected", "selected");

  //Hide paypal and bitcoin payment information
  paypalDiv.setAttribute("style", "display: none");
  bitcoinDiv.setAttribute("style", "display: none");

  //Hide/show fields depending on what payment method is selected
  //Select the chosen option in the list
  paymentSelect.onchange = function() {
    const value = this.value;

    if (value === "paypal"){
      displayNone(creditCardDiv);
      displayNone(bitcoinDiv);
      displayBlock(paypalDiv);

      deselect(creditCardOption);
      deselect(bitcoinOption);
      select(paypalOption);

    } else if (value === "bitcoin"){
      displayNone(creditCardDiv);
      displayBlock(bitcoinDiv);
      displayNone(paypalDiv);

      deselect(creditCardOption);
      deselect(paypalOption);
      select(bitcoinOption);

    } else {
      displayBlock(creditCardDiv);
      displayNone(bitcoinDiv);
      displayNone(paypalDiv);

      deselect(bitcoinOption);
      deselect(paypalOption);
      select(creditCardOption);
    };
  };
};

/* CHECK IF NAME IS FILLED IN
** At least 1 character
*/
function nameValidation(triggerFunction){
  name = document.querySelector("fieldset").querySelector("input[id='name']").value;
  if (name === ""){
    invalidStyle(nameField);
    if (triggerFunction !== "liveValidate"){
      if(nameErrorMessageShow){
        hideErrorMessage("name");
      };
      showErrorMessage("name", "You have to enter your name", nameField);
      nameErrorMessageShow = true;
    };
    return false;
  } else {
    validStyle(nameField);
    if(nameErrorMessageShow){
      hideErrorMessage("name");
      nameErrorMessageShow = false;
    };
    return true;
  };
};

/* CHECK IF EMAIL ADDRESS IS FILLED IN AND VALID
*/
function emailValidation(triggerFunction){
  email = document.querySelector("fieldset").querySelector("input[id='mail']").value;
  if (email === ""){
    invalidStyle(emailField);
    if (triggerFunction !== "liveValidate"){
      if(emailErrorMessageShow){
        hideErrorMessage("email");
      };
      showErrorMessage("email", "You have to enter your email address", emailField);
      emailErrorMessageShow = true;
    };
    return false;
  } else if (email !== "" && !validEmail.test(email)){
    if (triggerFunction !== "liveValidate"){
      if(emailErrorMessageShow){
        hideErrorMessage("email");
      };
      showErrorMessage("email", "You have to enter a valid email address", emailField);
      emailErrorMessageShow = true;
    };
    invalidStyle(emailField);
    return false;
  } else {
    validStyle(emailField);
    if(emailErrorMessageShow){
      hideErrorMessage("email");
      emailErrorMessageShow = false;
    };
    return true;
  };
};

/* CHECK IF AT LEAST ONE ACTIVITY IS SELECTED
*/
function checkActivities(triggerFunction){
  const activityFieldset = document.querySelector('fieldset[class="activities"]');
  const activitiesInput = activityFieldset.querySelectorAll('input[type="checkbox"]');

  for (let i = 0; i < activitiesInput.length; i++){
    if(activitiesInput[i].checked){
      for (let i = 0; i < activitiesInput.length; i++){
        activitiesInput[i].removeAttribute("style", "outline");
      };
      if(activityErrorMessageShow){
        hideErrorMessage("activity");
        activityErrorMessageShow = false;
      };
      return true;
    }
  };
  if(triggerFunction !== "liveValidate"){
    invalidStyle(activityFieldset);
    if(activityErrorMessageShow){
      hideErrorMessage("activity");
    };
    for (let i = 0; i < activitiesInput.length; i++){
      activitiesInput[i].setAttribute("style", "outline: 1px solid red");
    };
    showErrorMessage("activity", "You have to choose at least one activity", activityFieldset);
    activityErrorMessageShow = true;
  };
  return false;
};

/* CHECK THAT CARD NUMBER IS FILLED IN AND A VALID NUMBER
** 13-16 digits
*/
function cardNumberValidation(triggerFunction){
  cardNumber = document.querySelector("input[id='cc-num']").value;
  if (cardNumber === ""){
    invalidStyle(cardNumberField);
    if(triggerFunction !== "liveValidate"){
      if(cardErrorMessageShow){
        hideErrorMessage("card");
      };
      showErrorMessage("card", "You have to enter a credit card number", cardNumberField);
      cardErrorMessageShow = true;
    };
    return false;
  } else if (!isNaN(cardNumber) && cardNumber.length < 13){
    invalidStyle(cardNumberField);
    if(triggerFunction !== "liveValidate"){
      if(cardErrorMessageShow){
        hideErrorMessage("card");
      };
      showErrorMessage("card", "Credit card number is too short", cardNumberField);
      cardErrorMessageShow = true;
    };
    return false;
  } else if (!isNaN(cardNumber) && cardNumber.length > 16){
    invalidStyle(cardNumberField);
    if(triggerFunction !== "liveValidate"){
      if(cardErrorMessageShow){
        hideErrorMessage("card");
      };
      showErrorMessage("card", "Credit card number is too long", cardNumberField);
      cardErrorMessageShow = true;
    };
    return false;
  } else if (isNaN(cardNumber)){
    invalidStyle(cardNumberField);
    if(triggerFunction !== "liveValidate"){
      if(cardErrorMessageShow){
        hideErrorMessage("card");
      };
      showErrorMessage("card", "Credit card number have to be a number", cardNumberField);
      cardErrorMessageShow = true;
    };
    return false;
  } else {
    validStyle(cardNumberField);
    if(cardErrorMessageShow){
      hideErrorMessage("card");
      cardErrorMessageShow = false;
    };
    return true;
  };
};

/* CHECK THAT ZIP CODE IS A 5 DIGIT NUMBER
*/
function cardZipCodeValidation(triggerFunction){
  cardZipCode = document.querySelector("input[id='zip']").value;
  if (isNaN(cardZipCode) || cardZipCode.length !== 5 || cardZipCode === ""){
    invalidStyle(cardZipCodeField);
    if(triggerFunction !== "liveValidate"){
      if(zipErrorMessageShow){
        hideErrorMessage("zip");
      };
      showErrorMessage("zip", "Zip code have to contain 5 digits", cardZipCodeField);
      zipErrorMessageShow = true;
    };
    return false;
  } else {
    validStyle(cardZipCodeField);
    if(zipErrorMessageShow){
      hideErrorMessage("zip");
      zipErrorMessageShow = false;
    };
    return true;
  };
};

/* CHECK THAT CVV IS A 3 DIGIT NUMBER
*/
function cardCVVValidation(triggerFunction){
  cardCVV = document.querySelector("input[id='cvv']").value;
  if (isNaN(cardCVV) || cardCVV.length !== 3 || cardCVV === ""){
    invalidStyle( cardCVVField);
    if(triggerFunction !== "liveValidate"){
      if(cvvErrorMessageShow){
        hideErrorMessage("cvv");
      };
      showErrorMessage("cvv", "CVV have to contain 3 digits", cardCVVField);
      cvvErrorMessageShow = true;
    };
    return false;
  } else {
    validStyle(cardCVVField);
    if(cvvErrorMessageShow){
      hideErrorMessage("cvv");
      cvvErrorMessageShow = false;
    };
    return true;
  };
};

/* EXECUTE LIVE VALIDATION
** On the following fields:
** nameField, emailField, cardNumberField, cardNumberField, cardCVVField
*/
function liveValidation(){
  liveValidate(nameField, nameValidation);
  onblurValidate(nameField, nameValidation);

  liveValidate(emailField, emailValidation);
  onblurValidate(emailField, emailValidation);

  liveValidate(cardNumberField, cardNumberValidation);
  onblurValidate(cardNumberField, cardNumberValidation);

  liveValidate(cardZipCodeField, cardZipCodeValidation);
  onblurValidate(cardZipCodeField, cardZipCodeValidation);

  liveValidate(cardCVVField, cardCVVValidation);
  onblurValidate(cardCVVField, cardCVVValidation);
};

/* LIVE VALIDATION WHILE TYPING
** Give instant feedback while user is typing
*/
function liveValidate(inputField, validationFunction){
  inputField.onkeyup = function(){
    validationFunction("liveValidate");
  };
};

/* LIVE VALIDATION WHEN INPUT FIELD LOSES FOCUS
** Give instant feedback when user leave the input field
*/
function onblurValidate(inputField, validationFunction){
  inputField.onblur = function(){
    validationFunction("onblurValidate");
  };
};

/* VALIDATE FORM ON SUBMIT
** Check if any field is not valid
*/
function submitValidation(){
  let validates = true; //Tells if form validates

  if (!nameValidation("submitValidation")){
    validates = false;
  };
  if (!emailValidation("submitValidation")){
    validates = false;
  };
  if (!checkActivities("submitValidation")){
    validates = false;
  };
  if(!cardNumberValidation("submitValidation")){
    validates = false;
  };
  if(!cardZipCodeValidation("submitValidation")){
    validates = false;
  };
  if(!cardCVVValidation("submitValidation")){
    validates = false;
  };
  return validates;
};

/* INSERT AFTER NODE FUNCTION
*/
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

/* SHOW ERROR MESSAGE
** Create and display div with error message
** Insert div after the validated field
*/
function showErrorMessage(field, message, after){
  div = document.createElement('div');
  div.setAttribute("id", field + "-error");
  div.setAttribute("style", "display: block");
  p = document.createElement('p');
  p.textContent = message;
  p.setAttribute("style", "font-style: italic");
  div.appendChild(p);
  insertAfter(div, after);
};

/* REMOVE ERROR MESSAGE
** Remove div with error message
*/
function hideErrorMessage(field){
  const element = document.getElementById(field + "-error");
  element.parentNode.removeChild(element);
};

/* GREEN BORDER ON VALID FIELD
*/
function validStyle(element){
  element.setAttribute("style", "border-color: green");
};

/* RED BORDER ON INVALID FIELD
*/
function invalidStyle(element){
  element.setAttribute("style", "border-color: red");
};

/* DISPLAY NONE
** CSS style of chosen element
*/
function displayNone(element){
  element.setAttribute("style", "display: none");
};

/* DISPLAY BLOCK
** CSS style of chosen element
*/
function displayBlock(element){
  element.setAttribute("style", "display: block");
};

/* SELECT FORM OPTION
** set attribute for form options
*/
function select(element){
  element.setAttribute("selected", "selected");
};

/* DESELECT FORM OPTION
** remove attribute for form options
*/
function deselect(element){
  element.removeAttribute("selected");
};

/* SUBMIT ONLY WHEN FORM VALIDATES
** If not prevent default submit functionality
*/
function submitButton(){
  const form = document.querySelector("form");
  const submitButton = form.querySelector("[type=Submit]");

  form.addEventListener("submit", (e) => {
    if (!submitValidation()){
      e.preventDefault();
      //Not the best solution, only to show the reviewer in a quick simple way
      alert("Form was not submitted. Make sure all fields contains valid information!");
    } else {
      //Not the best solution, only to show the reviewer in a quick simple way
      alert("Form was submitted.");
    };
  });
};

/* RUN FUNCTIONS ON PROGRAM START
**
*/
function runProgram(){
  highLight();
  titleForm();
  shirtForm();
  activities();
  paymentSection();
  liveValidation();
  submitButton();
};

runProgram();
