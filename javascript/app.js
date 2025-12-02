//***STUFF***
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const regPhone = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

//***INDEX***

//Functions
function validateEmail(strSignUpEmail){
    if(!regEmail.test(strSignUpEmail)){
        document.querySelector('#emailHelpBlock').classList.remove('text-success')
        document.querySelector('#emailHelpBlock').classList.add('text-danger')
        return false   
    }
    else{
        document.querySelector('#emailHelpBlock').classList.remove('text-danger')
        document.querySelector('#emailHelpBlock').classList.add('text-success')
    }
    return true
}
function validateEmail(strLoginEmail){
    if(!regEmail.test(strLoginEmail)){
        document.querySelector('#emailHelpBlock').classList.remove('text-success')
        document.querySelector('#emailHelpBlock').classList.add('text-danger')
        return false   
    }
    else{
        document.querySelector('#emailHelpBlock').classList.remove('text-danger')
        document.querySelector('#emailHelpBlock').classList.add('text-success')
    }
    return true

}
function validateFirstName(strFirstName){
    if(strFirstName < 1){
        return true
    }
    else{
        return false
    }
}
function validateLastName(strFirstName){
    if(strFirstName < 1){
        return true
    }
    else{
        return false
    }
}

 function validatePhone(strPhone){
    if(!regPhone.test(strPhone)){
        document.querySelector('#phoneHelpBlock').classList.remove('text-success')
        document.querySelector('#phoneHelpBlock').classList.add('text-danger')
        return false
    } else {
        document.querySelector('#phoneHelpBlock').classList.remove('text-danger')
        document.querySelector('#phoneHelpBlock').classList.add('text-success')
    }
    return true    
}

function validatePassword(strLoginPassword){
    if(!regPassword.test(strLoginPassword)){
        document.querySelector('#passwordHelpBlock').classList.remove('text-success')
        document.querySelector('#passwordHelpBlock').classList.add('text-danger')
        return false
    } else {
        document.querySelector('#passwordHelpBlock').classList.remove('text-danger')
        document.querySelector('#passwordHelpBlock').classList.add('text-success')
    }
    return true
}
function validatePassword(strSignUpPassword){
    if(!regPassword.test(strSignUpPassword)){
        document.querySelector('#passwordHelpBlock').classList.remove('text-success')
        document.querySelector('#passwordHelpBlock').classList.add('text-danger')
        return false
    } else {
        document.querySelector('#passwordHelpBlock').classList.remove('text-danger')
        document.querySelector('#passwordHelpBlock').classList.add('text-success')
    }
    return true
}

// Buttons to switch cards (NO USER INPUT) on Index
document.querySelector('#btnLoginSignup').addEventListener('click',function(){
    document.querySelector('#LoginCard').classList.remove('d-none')
    document.querySelector('#WelcomeCard').classList.add('d-none')
})
document.querySelector('#btnSignUpRef').addEventListener('click',function(){
    document.querySelector('#SignUpCard').classList.remove('d-none')
    document.querySelector('#LoginCard').classList.add('d-none')
})
document.querySelector('#btnLoginRef').addEventListener('click',function(){
    document.querySelector('#LoginCard').classList.remove('d-none')
    document.querySelector('#SignUpCard').classList.add('d-none')
})


// Buttons for user inputs
document.querySelector('#btnLogin').addEventListener('click',function(){
    let strLoginEmail = document.querySelector('#txtLoginEmail').value.trim()
    let strLoginPassword = document.querySelector('#txtLoginPassword').value.trim()
    let blnError = false
    let strError = ''
    
    if(validateEmail(strLoginEmail) == true){
        blnError = true
        strError += "Invalid Email. "
    }

    if(validatePassword(strLoginPassword) == true){
        blnError = true
        strError += "Invalid Password. "
    }


    if(blnError == true){
        Swal.fire({
            title:'Oh no! Please check your work',
            html:strError,
            icon:'error',
            confirmButtonColor: '#d88a0cff'
        })
    }
    else{ 
        document.getElementById("loginForm").addEventListener("submit", async (e) => {
            e.preventDefault(); //Prevents the page from reloading getting rid of our data

            const email = document.getElementById("txtLoginEmail").value;
            const password = document.getElementById("txtLoginPassword").value;

            await fetch("/add-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email,password })
            });
        });
        window.location.replace("animalhome.html");
    }
})

document.querySelector('#btnSignUp').addEventListener('click',function(){
    let strSignUpEmail = document.querySelector('#txtSignUpEmail').value.trim()
    let strFirstName = document.querySelector('#txtFirstName').value.trim()
    let strLastName = document.querySelector('#txtLastName').value.trim()
    let strSignUpPassword = document.querySelector('#txtSignUpPassword').value.trim()
    let strPhone = document.querySelector('#txtTelephone').value.trim()
    let blnError = false
    let strError = ''
    
    if(validateEmail(strSignUpEmail) == true){
        blnError = true
        strError += "Invalid Email. "
    }
    if(validatePassword(strSignUpPassword) == true){
        blnError = true
        strError += "Invalid Password. "
    }
    if(validateFirstName(strFirstName) == true){
        blnError = true
        strError += "Invalid First Name. "
    }
   if(validateLastName(strLastName) == true){
        blnError = true
        strError += "Invalid Last Name. "
    }
    if(validatePhone(strPhone) == true){
        blnError = true
        strError += "Invalid Phone Number. "
    }

    if(blnError == true){
        Swal.fire({
            title:'Oh no! Please check your work',
            html:strError,
            icon:'error',
            confirmButtonColor: '#d88a0cff' 
        })
    }
    else{
        //Would Like to have a Welcome Pop up Happen Some How! 
        Swal.fire({
            title: "Welcome!",
            text: "Your account has been created.",
            icon: "success"
        });
        window.location.replace("animalhome.html");
    }
})
