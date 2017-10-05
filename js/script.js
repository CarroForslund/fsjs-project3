let otherJobRoleShown = false;

//highlight Name input field
function highLight(){
  var input = document.getElementById('name');
  input.focus();
  input.select();
};

//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
//Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
function jobRole(){
  const jobRole = document.getElementById("title");
  jobRole.onchange = function() {
    var value = this.value;
    if (value !== 'other'){
      if (otherJobRoleShown){
        const input = document.querySelector('fieldset');
        input.removeChild(input.lastChild);
        otherJobRoleShown = false;
      };
      return;
    } else {
      const form = document.querySelector('form');
      const basicInfo = document.querySelector('fieldset');
      const input = document.createElement('input');
      input.type = 'text';
      input.id = "other-title";
      input.name = "user_role";
      input.placeholder = "Your Job Role";
      basicInfo.appendChild(input);

      otherJobRoleShown = true;
    };
  }
};

const runProgram = function(){
  highLight();
  jobRole();
};

runProgram();
