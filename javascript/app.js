//***Regular Expressions***
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const regPhone = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

//Functions for input validation
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Button event listeners to switch cards
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//LOGIN
document.querySelector('#btnLogin').addEventListener('click', async function(e){
    e.preventDefault();

    let email = document.querySelector('#txtLoginEmail').value.trim();
    let password = document.querySelector('#txtLoginPassword').value.trim();
    let blnError = false;
    let strError = '';

    if(!validateEmail(email)){
        blnError = true;
        strError += '<p>You must enter a valid email.</p>';
    }
    if(!validatePassword(password)){
        blnError = true;
        strError += '<p>You must enter a valid Password.</p>';
    }

    if(blnError){
        Swal.fire({
            title:'Oh no! Please check your work',
            html:strError,
            icon:'error',
            confirmButtonColor: '#d88a0cff'
        });
        return;
    }

    const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            txtLoginEmail: email,
            txtLoginPassword: password
        })
    });

    const data = await response.json();

    if(data.error){
        Swal.fire({
            title:"Login Failed",
            text:data.error,
            icon:"error"
        });
        return;
    }

    window.location.href = `./AnimalTable.html?userid=${data.userid}`;
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Sign UP
document.querySelector('#btnSignUp').addEventListener('click',async function(e){
    e.preventDefault();
    let strSignUpEmail = document.querySelector('#txtSignUpEmail').value.trim()
    let strFirstName = document.querySelector('#txtFirstName').value.trim()
    let strLastName = document.querySelector('#txtLastName').value.trim()
    let strSignUpPassword = document.querySelector('#txtSignUpPassword').value.trim()
    let strPhone = document.querySelector('#txtTelephone').value.trim()
    let blnError = false
    let strError = ''

    
    if(!validateEmail(strSignUpEmail) == true){
        blnError = true
        strError += '<p>You must enter a valid email.</p>'
    }
    if(!validatePassword(strSignUpPassword) == true){
        blnError = true
        strError += '<p>You must enter a valid Password.</p>'
    }

        if(strFirstName.length < 1){
        blnError = true
        strError += '<p>You must enter a First Name.</p>'
    }

        if(strLastName.length < 1){
        blnError = true
        strError += '<p>You must enter a Last Name.</p>'
    }

    if(!validatePhone(strPhone) == true){
        blnError = true
        strError += '<p>Invalid Phone Number.</p>'
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

         let formData = new URLSearchParams(new FormData(document.querySelector('#signUpForm')));
        const response = await fetch("/signup", { method: "POST", body: formData });
        const data = await response.json();

        if(data.error){
            Swal.fire("Error", data.error, "error");
            return;
        }

        //Would Like to have a Welcome Pop up Happen Some How! 
        Swal.fire({
            title: "Welcome!",
            text: "Your account has been created.",
            icon: "success"
        }).then(() => {
        window.location.href = `./AnimalTable.html?userid=${data.userid}`;
        });
    }
})
