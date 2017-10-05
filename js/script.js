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
  title.onchange = function() {
    const value = this.value;
    if (value !== 'other'){
      if (otherTitleShown){
        const fieldset = document.querySelector('fieldset');
        fieldset.removeChild(fieldset.lastChild);
        otherTitleShown = false;
      };
      return;
    } else {
      const form = document.querySelector('form');
      const fieldset = document.querySelector('fieldset');
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
    if(value === "js puns"){
      console.log('js puns');
    } else {
      console.log('heart js');
    };
  };
};

function runProgram(){
  highLight();
  titleForm();
  shirtForm();
};

runProgram();
