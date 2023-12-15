const db = new Dexie('userDatabase');
db.version(1).stores({
  users: '++id, name, email, password'
});


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
        return false;
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

function validateEmail() {
    let inputEmail = document.getElementById("registerEmail");
    let emailErrorElement = document.getElementById("emailError");
    let email = inputEmail.value.trim();

    if (email === "") {
        emailErrorElement.textContent = "Please enter an email";
        inputEmail.style.borderColor = "red";
        return false;
    }

    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        emailErrorElement.textContent = "Please enter a valid email, e.g., name@gmail.com";
        inputEmail.style.borderColor = "red";
        return false;
    }
    else {
        return true;
    }
}

async function isDuplicateEmail() {
    let inputEmail = document.getElementById("registerEmail");
    let emailErrorElement = document.getElementById("emailError");
    let email = inputEmail.value.trim();

    try {
        let existingUser = await db.users.where('email').equals(email).first();

        if (existingUser) {
            emailErrorElement.textContent = "Email is already registered. Please use a different email.";
            inputEmail.style.borderColor = "red";
            console.log("dup");
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error checking email existence:', error);
        return false;
    }
}

function validatePassword(){
    inputPass = document.getElementById("registerPassword");
    let test = true;
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

    if (inputPass.value==""){
        document.getElementById("passwordError").textContent =  "Please enter a password ";
        document.getElementById("registerPassword").style.borderColor = "red";
        return false
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
        return false
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

async function validateForm(){
    const nameValid = validateName();
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    const passwordConValid = validatePasswordCon();
    const duplicateEmail = await isDuplicateEmail();
    if (nameValid && emailValid && passwordValid && passwordConValid && !duplicateEmail){
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        try {
            await db.users.add({ name, email, password });
            console.log('User added to the database!');
            return true;
        } catch (error) {
            console.error('Error adding user to the database:', error);
            return false;
        }
    }
    else{
        return false
    }
}

async function submitForm(event) {
    event.preventDefault();

    const isFormValid = await validateForm();

    if (isFormValid) {
        document.getElementById('registerForm').submit();
    } else {
        console.log('Form is not valid. Submission aborted.');
    }
}

function loginUser() {
    const email = document.getElementById('inputEmail').value;
    const password = document.getElementById('inputPassword').value;
    db.users
      .where({ email, password })
      .first()
      .then(user => {
        if (user) {
          console.log('User Logged in!');
        } else {
          console.log('not logged!');
          alert('Invalid email or password. Please try again.');
          document.getElementById("loginError").textContent =  "Invalid email or password. Please try again.";
        }
      })
      .catch(error => {
        console.error('Error checking user credentials:', error);
      });
  
    return false;
  }
  
  function clearUserData() {
    db.users
      .clear()
      .then(() => {
        console.log('All data cleared from the "users" store');
      })
      .catch(error => {
        console.error('Error clearing data:', error);
      });
  }