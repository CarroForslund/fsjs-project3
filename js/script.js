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

  //const activities = [];
  //let selectedActivities = [];

  //When checkbox state change
  //get time and price
  for (let i = 0; i < activitiesInput.length; i++){

    //const activityDetails = getActivityDetails(activitiesInput[i]);

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
              console.log(comparedActivitysDetails.name + ' is at the same time');
              comparedActivity.setAttribute("disabled", "");
            };
          };
        };

      } else {
        const deselectedActivityDetails = getActivityDetails(activitiesInput[i]);
        console.log(deselectedActivityDetails.name + 'is unchecked');

        //compare unchecked checkboxes
        //disable checkboxes with same time as checked
        for (let i = 0; i < activitiesInput.length; i++){

          if (activitiesInput[i].hasAttribute("disabled")){
            console.log(activitiesInput[i]);
            const comparedActivity = activitiesInput[i];
            const comparedActivitysDetails = getActivityDetails(comparedActivity);
            if (comparedActivitysDetails.time === deselectedActivityDetails.time){
              comparedActivity.removeAttribute("disabled");
            };
          };
        };
      };

      //console.log(this.parentNode.textContent.slice(0, this.parentNode.textContent.indexOf(",")));
    };

    // function disableCheckbox(activityIndex, time){
    //   console.log(activityIndex);
    //   for (let j = 0; j < activitiesInput.length; j++){
    //     const string = activitiesInput[i].parentNode.textContent;
    //
    //     if (activityIndex !== activitiesInput[i]){
    //       if(string.includes(time) ){
    //         console.log("same time");
    //       };
    //     };
    //     // console.log(time);
    //     // console.log('string' + string);
    //     //
    //   };

  //console.log(activitiesInput[i]);
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

function runProgram(){
  highLight();
  titleForm();
  shirtForm();
  activities();
};

runProgram();
