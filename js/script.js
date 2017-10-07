let otherTitleShown = true;

//highlight Name input field
function highLight(){
  var input = document.getElementById('name');
  input.focus();
  input.select();
};

//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
//Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
function titleForm(){
  const title = document.getElementById("title");
  const fieldset = document.querySelector("fieldset");
  const otherRole = document.querySelector("input[id='other-title']");
  otherRole.setAttribute("style", "display: none");

  title.onchange = function() {
    const value = this.value;
    if (value !== 'other'){
      otherRole.setAttribute("style", "display: none");
      // if (otherTitleShown){
      //   fieldset.removeChild(fieldset.lastChild);
      //   otherTitleShown = false;
      // };
      return;
    } else {
      otherRole.setAttribute("style", "display: block");
      otherRole.placeholder = "Your Job Role";
      // const form = document.querySelector('form');
      // const input = document.createElement('input');
      // input.type = 'text';
      // input.id = "other-title";
      // input.name = "user_role";
      // input.placeholder = "Your Job Role";
      // fieldset.appendChild(input);

      // otherTitleShown = true;
    };
  }
};

// ”T-Shirt Info” section of the form:
// For the T-Shirt color menu, only display the color options that
//match the design selected in the "Design" menu.
function shirtForm(){
  const design = document.getElementById("design");
  removeColorOptions();

  design.onchange = function() {
    const value = this.value;
    //color(value);
    removeColorOptions();
    addColorOptions(value);
  };
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

// COLOR SELECT LIST (MEETS EXPECTATIONS)
// function color(value){
//   const selectColor = document.getElementById('color');
//   while (selectColor.firstChild) {
//     selectColor.removeChild(selectColor.firstChild);
//   };
//   if(value === "js puns"){
//
//     const option1 = document.createElement('option');
//     option1.value = "cornflowerblue";
//     option1.text = "Cornflower Blue";
//     selectColor.appendChild(option1);
//
//     const option2 = document.createElement('option');
//     option2.value = "darkslategrey";
//     option2.text = "Dark Slate Grey";
//     selectColor.appendChild(option2);
//
//     const option3 = document.createElement('option');
//     option3.value = "gold";
//     option3.text = "Gold";
//     selectColor.appendChild(option3);
//
//   } else if ((value === "heart js")) {
//
//     const option1 = document.createElement('option');
//     option1.value = "tomato";
//     option1.text = "Tomato";
//     selectColor.appendChild(option1);
//
//     const option2 = document.createElement('option');
//     option2.value = "steelblue";
//     option2.text = "Steel Blue";
//     selectColor.appendChild(option2);
//
//     const option3 = document.createElement('option');
//     option3.value = "dimgrey";
//     option3.text = "Dim Grey";
//     selectColor.appendChild(option3);
//
//   } else {
//     const option1 = document.createElement('option');
//     option1.text = "Please select a T-shirt theme";
//     selectColor.appendChild(option1);
//   };
// };

/* ACTIVITY CHECKBOX CHANGE
**
*/
function activities(){
  //Some events are at the same time as others. Don't allow selection of a workshop at the same date and time
    //disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
  // When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
  // As a user selects activities, a running total should display below the list of checkboxes.
  const activityFieldset = document.querySelector('fieldset[class="activities"]');
  const activitiesInput = activityFieldset.querySelectorAll('input[type="checkbox"]');

  let totalPrice = 0;
  let priceParagraph = document.createElement("p");
  priceParagraph.textContent = "Total Price: $" + totalPrice;
  activityFieldset.appendChild(priceParagraph);

  //const activities = [];
  //let selectedActivities = [];

  //When checkbox state change
  //get time and price
  for (let i = 0; i < activitiesInput.length; i++){

    activitiesInput[i].onchange = function() {

      if (activitiesInput[i].checked){
        const selectedActivityDetails = getActivityDetails(activitiesInput[i]);

        //compare unchecked checkboxes
        //disable checkboxes with same time as checked
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

        //compare unchecked checkboxes
        //disable checkboxes with same time as checked
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

      // if (totalPrice > 0){
      //   const p = document.createElement('p');
      //   p.textContent = "$" + totalPrice;
      //   activityFieldset.appendChild(p);
      // };
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

function paymentSection(){

  const creditCardDiv = document.getElementById("credit-card");
  const paypalDiv = document.getElementById("paypal");
  const bitcoinDiv = document.getElementById("bitcoin");

  //const creditCardOption = document.querySelector("option[value='credit-card']");
  const paypalOption = document.querySelector("option[value='paypal']");
  const bitcoinOption = document.querySelector("option[value='bitcoin']");
  const paymentSelect = document.getElementById("payment");

  creditCardOption = paymentSelect.querySelector('option[value="credit card"]');
  creditCardOption.setAttribute("selected", "selected");
  paypalDiv.setAttribute("style", "display: none");
  bitcoinDiv.setAttribute("style", "display: none");

  paymentSelect.onchange = function() {
    const value = this.value;

    if (value === "paypal"){
      creditCardDiv.setAttribute("style", "display: none");
      paypalDiv.setAttribute("style", "display: block");
      bitcoinDiv.setAttribute("style", "display: none");

      creditCardOption.removeAttribute("selected");
      bitcoinOption.removeAttribute("selected");
      paypalOption.setAttribute("selected", "selected");

    } else if (value === "bitcoin"){
      creditCardDiv.setAttribute("style", "display: none");
      paypalDiv.setAttribute("style", "display: none");
      bitcoinDiv.setAttribute("style", "display: block");

      creditCardOption.removeAttribute("selected");
      paypalOption.removeAttribute("selected");
      bitcoinOption.setAttribute("selected", "selected");

    } else {
      creditCardDiv.setAttribute("style", "display: block");
      paypalDiv.setAttribute("style", "display: none");
      bitcoinDiv.setAttribute("style", "display: none");

      bitcoinOption.removeAttribute("selected");
      paypalOption.removeAttribute("selected");
      creditCardOption.setAttribute("selected", "selected");
    };

  };



};

function formValidates(){
  let validates = true;

  const name = document.querySelector("fieldset").querySelector('input[id="name"]').value;
  const email = document.querySelector("fieldset").querySelector('input[id="mail"]').value;
  const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const cardNumber = document.querySelector("input[id='cc-num']").value;
  const cardZipCode = document.querySelector("input[id='zip']").value;
  const cardCVV = document.querySelector("input[id='cvv']").value;

  let checkedActivity = checkActivities();

  function checkActivities(){
    const activityFieldset = document.querySelector('fieldset[class="activities"]');
    const activitiesInput = activityFieldset.querySelectorAll('input[type="checkbox"]');

    for (let i = 0; i < activitiesInput.length; i++){
      if(activitiesInput[i].checked){
        return true;
      }
    };
    return false;
  };

  const paymentSelect = document.getElementById("payment");
  creditCardOption = paymentSelect.querySelector('option[value="credit card"]');

  if (name === "") {
    console.log("Name must be filled out");
    validates = false;
  };
  if (!validEmail.test(email)){
    console.log("Please provide a valid email address");
    validates = false;
  };
  if (!checkedActivity){
    console.log("You have to register for at least one activity");
    validates = false;
  };
  if (creditCardOption.hasAttribute("selected")){
    if (isNaN(cardNumber)){
      console.log("Credit card number have to be a number");
      validates = false;
    };
    if (cardNumber.length < 13 || cardNumber.length > 16  || cardNumber === ""){
      console.log("Credit card number have to contain 13-16 numbers");
      validates = false;
    };
    if (isNaN(cardZipCode)){
      console.log("Zip code have to be a number");
      validates = false;
    };
    if (cardZipCode.length !== 5|| cardZipCode === ""){
      console.log("Zip code have to contain 5 numbers");
      validates = false;
    };
    if (isNaN(cardCVV)){
      console.log("CVV have to be a number");
      validates = false;
    };
    if (cardCVV.length !== 3 || cardCVV === ""){
      console.log("CVV have to contain 3 numbers");
      validates = false;
    };
  };
  return validates;
};

function submitButton(){
  const form = document.querySelector("form");
  const submitButton = form.querySelector("[type=Submit]");

  form.addEventListener("submit", (e) => {
    if (formValidates()){
      e.preventDefault(); //Remove when ready
      console.log('submitted');
    } else {
      e.preventDefault();
      console.log('check again');
    };

  });

  // if(formValidates()){
  //
  //
  // } else {
  //   submitButton.disabled = true;
  //   console.log('check again');
  // };
};


function runProgram(){
  highLight();
  titleForm();
  shirtForm();
  activities();
  paymentSection();
  submitButton();
};

runProgram();
