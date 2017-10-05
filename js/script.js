let otherJobroleShown = false;

//highlight Name input field
const highLight = function(){
  var input = document.getElementById('name');
  input.focus();
  input.select();
};

//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
//Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
function jobRoleField(){
  const jobRoleField = document.getElementById("title");
  jobRoleField.onchange = function() {
    var value = this.value;
    if (value !== 'other'){
      if (otherJobroleShown){
        const input = document.querySelector('fieldset');
        input.removeChild(input.lastChild);
        otherJobroleShown = false;
      };
      return;
    } else {
      const form = document.querySelector('form');
      const basicInfo = document.querySelector('fieldset');
      const input = document.createElement('input');
      input.type = 'text';
      input.id = "role";
      input.name = "user_role";
      input.placeholder = "Your Job Role";
      basicInfo.appendChild(input);

      otherJobroleShown = true;
    };
  }
};

const runProgram = function(){
  highLight();
  jobRoleField();
};

runProgram();
