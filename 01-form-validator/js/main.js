const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//FUNCTIONS
//Show input error message
function showError(input, message){
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show success outline
function showSucces(input){
    const formControl = input.parentElement;
    formControl.classList.add('success');
}

//Check email is valid
function checkEmail(input){
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(regex.test(input.value.trim())){
        showSucces(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

//Get fieldname
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check required fields
function checkRequired(inputArr){
    inputArr.forEach(input => {
        if(input.value.trim() === '') {
            console.log(input);
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSucces(input);
        }
    });
}

//Check input lenght
function checkLenght(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSucces(input);
    }
}

//Check passwords are the same 
function checkPassword(input1, input2){
    if(input1.value !== input2.value){
        showError(input2, "Passwords don't match");
    }
}

//Clear error 
function clearErr(inputArr){
    inputArr.forEach(input => {
        if(input.parentElement.classList.contains('error')) {
            input.parentElement.classList.remove('error');
        }
    });
}

//EVENT LISTENERS
form.addEventListener('submit', function(e){
    e.preventDefault();

    clearErr([username, email, password, password2]);
    checkRequired([username, email, password, password2]);
    checkLenght(username, 3, 15);
    checkLenght(password, 6, 25);
    checkEmail(email);
    checkPassword(password, password2);

});
