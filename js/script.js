//highlight Name input field
var input = document.getElementById('name');
input.focus();
input.select();

//A text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
//Give the field an id of “other-title,” and add the placeholder text of "Your Job Role" to the field.
function jobRoleField(){
  const jobRoleField = document.getElementById("title")
  jobRoleField.onchange=function() {
    var value = this.value;
    if (value !== 'other'){
      console.log('nope');
      return;
    } else {
      console.log('time to print text input field to html');
      const form = document.querySelector('form');
      const basicInfo = document.querySelector('fieldset');
      console.log(basicInfo);
      const input = document.createElement('input');
      input.type = 'text';
      input.id = "role";
      input.name = "user_role";
      input.placeholder = "Your Job Role";
      basicInfo.appendChild(input);
      // <input type="text" id="role" name="user_role" placeholder="Your Job Role">
    };
  }
};

jobRoleField();
