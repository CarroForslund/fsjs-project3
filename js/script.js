let otherTitleShown = false;

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
  const fieldset = document.querySelector('fieldset');

  title.onchange = function() {
    const value = this.value;
    if (value !== 'other'){
      if (otherTitleShown){
        fieldset.removeChild(fieldset.lastChild);
        otherTitleShown = false;
      };
      return;
    } else {
      const form = document.querySelector('form');
      const input = document.createElement('input');
      input.type = 'text';
      input.id = "other-title";
      input.name = "user_role";
      input.placeholder = "Your Job Role";
      fieldset.appendChild(input);

      otherTitleShown = true;
    };
  }
};

// ”T-Shirt Info” section of the form:
// For the T-Shirt color menu, only display the color options that
//match the design selected in the "Design" menu.
function shirtForm(){
  const design = document.getElementById("design");
  design.onchange = function() {
    const value = this.value;
    colorForm(value);
  };
};

function colorForm(value){
  const selectColor = document.getElementById('color');
  while (selectColor.firstChild) {
    selectColor.removeChild(selectColor.firstChild);
  };
  if(value === "js puns"){

    const option1 = document.createElement('option');
    option1.value = "cornflowerblue";
    option1.text = "Cornflower Blue";
    selectColor.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = "darkslategrey";
    option2.text = "Dark Slate Grey";
    selectColor.appendChild(option2);

    const option3 = document.createElement('option');
    option3.value = "gold";
    option3.text = "Gold";
    selectColor.appendChild(option3);

  } else {

    const option1 = document.createElement('option');
    option1.value = "tomato";
    option1.text = "Tomato";
    selectColor.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = "steelblue";
    option2.text = "Steel Blue";
    selectColor.appendChild(option2);

    const option3 = document.createElement('option');
    option3.value = "dimgrey";
    option3.text = "Dim Grey";
    selectColor.appendChild(option3);

  };
};

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

  //When checkbox state change
  //get time and price
  for (let i = 0; i < activitiesInput.length; i++){
    activitiesInput[i].onchange = function() {

      //Get information about selected activities
      const string = this.parentNode.textContent; //all the text content
      const activity = string.slice(1, string.indexOf("—") -1); //Only the activity
      const price = string.substring(string.indexOf("$") + 1); //Only the price (excl $ sign)
      let time = "No time set";
      if (activity !== "Main Conference"){
        time = string.substring(string.indexOf("—") + 2);
        time = time.slice(0, time.indexOf(","));
      };
      console.log(activity);
      console.log(price);
      console.log(time);

      //console.log(this.parentNode.textContent.slice(0, this.parentNode.textContent.indexOf(",")));
    };
  //console.log(activitiesInput[i]);
  };
};

function runProgram(){
  highLight();
  titleForm();
  shirtForm();
  activities();
};

runProgram();
