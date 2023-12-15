function filled(id,errorId){
    inputElement=document.getElementById(id);
    if (inputElement.value!=""){
        document.getElementById(id).style.borderColor="green";
        document.getElementById(id).style.borderWidth="2px";
        document.getElementById(errorId).textContent=""
    }
}

function validateName(){
    let inputUser = document.getElementById("registerName");
    if (inputUser.value==""){
        document.getElementById("nameError").textContent =  "Please enter a name";
        document.getElementById("registerName").style.borderColor = "red";
        return
    }
    if (inputUser.value.length<3||inputUser.value.length>25){
        document.getElementById("nameError").textContent ="Username must be between 3 and 25 characters";
        document.getElementById("registerName").style.borderColor = "red";
        return false;
    }
    else{
        return true;
    }
}

function validateEmail(){
    let inputEmail = document.getElementById("registerEmail");
    if (inputEmail.value==""){
        document.getElementById("emailError").textContent =  "Please enter an email";
        document.getElementById("registerEmail").style.borderColor = "red";
        return
    }
    if (inputEmail.value==""||inputEmail.value.indexOf("@")==-1||inputEmail.value.indexOf(".")==-1){
        document.getElementById("emailError").textContent = "Please enter a valid email e.g name@gmail.com";
        document.getElementById("registerEmail").style.borderColor = "red";
        return false;
    }
    else{
        return true;
    }
}

function validatePassword(){
    inputPass = document.getElementById("registerPassword");
    let test = true;
    let special=false;
    if(inputPass.value.length < 8 ){
        test = false;
    }
    if (!inputPass.value.match(/[a-z]/)){
        test=false;
    }
    if (!inputPass.value.match(/[A-Z]/)){
        test=false;
    }
    if (!inputPass.value.match(/\d/)){
        test=false;
    }
    if (!inputPass.value.match(/[!\@\#\$\%\^\&\*]/)){
        test =false;
    }

    if (!test){
        document.getElementById("passwordError").textContent = "Password must have at least 8 characters that includes at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character in (!@#$%^&*)"
        document.getElementById("registerPassword").style.borderColor = "red";
        return false;
    }
    else{
        return true;
    }
}

function validatePasswordCon(){
    let pass = document.getElementById("registerPassword");
    let passCon = document.getElementById("registerConfirm");
    if (passCon.value==""){
        document.getElementById("conPassError").textContent =  "Please enter the password again";
        document.getElementById("registerConfirm").style.borderColor = "red";
        return
    }


    if (pass.value != passCon.value){
        document.getElementById("conPassError").textContent =  "Passwords doesn't match";
        document.getElementById("registerConfirm").style.borderColor = "red";
        return false
    }
    else{
        return true
    }
}

function validateForm(){
    const nameValid = validateName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const passwordConValid = validatePasswordCon();
    if (nameValid && emailValid && passwordValid && passwordConValid){
        return true
    }
    else{
        return false
    }
}