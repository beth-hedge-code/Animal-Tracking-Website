//***Regular Expressions***
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const regPhone = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

//================== VALIDATION FUNCTIONS ==================//
function toggleHelpBlock(helpBlock, valid){
    if(valid){
        helpBlock.classList.remove('text-danger', 'text-white');
        helpBlock.classList.add('text-success');
    } else {
        helpBlock.classList.remove('text-success', 'text-white');
        helpBlock.classList.add('text-danger');
    }
}

function validateEmail(email, helpBlockId){
    const helpBlock = document.querySelector(helpBlockId);
    const valid = regEmail.test(email);
    toggleHelpBlock(helpBlock, valid);
    return valid;
}

function validatePassword(password, helpBlockId){
    const helpBlock = document.querySelector(helpBlockId);
    const valid = regPassword.test(password);
    toggleHelpBlock(helpBlock, valid);
    return valid;
}

function validateName(name){
    return name.length > 0;
}

function validatePhone(phone){
    const helpBlock = document.querySelector('#phoneHelpBlock');
    const valid = regPhone.test(phone);
    toggleHelpBlock(helpBlock, valid);
    return valid;
}

//================== EVENT LISTENERS ==================//

// Switch cards
document.querySelector('#btnLoginSignup').addEventListener('click', () => {
    document.querySelector('#LoginCard').classList.remove('d-none');
    document.querySelector('#WelcomeCard').classList.add('d-none');
});
document.querySelector('#btnSignUpRef').addEventListener('click', () => {
    document.querySelector('#SignUpCard').classList.remove('d-none');
    document.querySelector('#LoginCard').classList.add('d-none');
});
document.querySelector('#btnLoginRef').addEventListener('click', () => {
    document.querySelector('#LoginCard').classList.remove('d-none');
    document.querySelector('#SignUpCard').classList.add('d-none');
});

// Real-time validation for login inputs
document.querySelector('#txtLoginEmail').addEventListener('input', e => validateEmail(e.target.value, '#emailHelpBlock'));
document.querySelector('#txtLoginPassword').addEventListener('input', e => validatePassword(e.target.value, '#passwordHelpBlock'));

// Real-time validation for sign-up inputs
document.querySelector('#txtSignUpEmail').addEventListener('input', e => validateEmail(e.target.value, '#emailHelpBlock'));
document.querySelector('#txtSignUpPassword').addEventListener('input', e => validatePassword(e.target.value, '#passwordHelpBlock'));
document.querySelector('#txtFirstName').addEventListener('input', e => {
    if(!validateName(e.target.value)){
        document.querySelector('#txtFirstName').classList.add('is-invalid');
    } else {
        document.querySelector('#txtFirstName').classList.remove('is-invalid');
    }
});
document.querySelector('#txtLastName').addEventListener('input', e => {
    if(!validateName(e.target.value)){
        document.querySelector('#txtLastName').classList.add('is-invalid');
    } else {
        document.querySelector('#txtLastName').classList.remove('is-invalid');
    }
});
document.querySelector('#txtTelephone').addEventListener('input', e => validatePhone(e.target.value));

//================== LOGIN ==================//
document.querySelector('#btnLogin').addEventListener('click', async function(e){
    e.preventDefault();
    //  checks data in input elements
    let email = document.querySelector('#txtLoginEmail').value.trim();
    let password = document.querySelector('#txtLoginPassword').value.trim();
    let blnError = false;
    let strError = '';
    //errors for invalid emal or password
    if(!validateEmail(email, '#emailHelpBlock')){
        blnError = true;
        strError += '<p>You must enter a valid email.</p>';
    }
    if(!validatePassword(password, '#passwordHelpBlock')){
        blnError = true;
        strError += '<p>You must enter a valid Password.</p>';
    }
    //throws up a error via sweet alerts that tells user to check thier work
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
        body: new URLSearchParams({ txtLoginEmail: email, txtLoginPassword: password })
    });

    const data = await response.json();
    //throws up a error via sweet alerts that tells user thier login failed
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

//================== SIGN-UP ==================//
document.querySelector('#btnSignUp').addEventListener('click', async function(e){
    e.preventDefault();
    //finds the data for signing up via elements
    let email = document.querySelector('#txtSignUpEmail').value.trim();
    let password = document.querySelector('#txtSignUpPassword').value.trim();
    let firstName = document.querySelector('#txtFirstName').value.trim();
    let lastName = document.querySelector('#txtLastName').value.trim();
    let phone = document.querySelector('#txtTelephone').value.trim();

    let blnError = false;
    let strError = '';
    //errors for invalid elements
    if(!validateEmail(email, '#emailHelpBlock')){ blnError = true; strError += '<p>Invalid email.</p>'; }
    if(!validatePassword(password, '#passwordHelpBlock')){ blnError = true; strError += '<p>Invalid password.</p>'; }
    if(!validateName(firstName)){ blnError = true; strError += '<p>First name required.</p>'; }
    if(!validateName(lastName)){ blnError = true; strError += '<p>Last name required.</p>'; }
    if(!validatePhone(phone)){ blnError = true; strError += '<p>Invalid phone number.</p>'; }
    //throws error via sweet alert
    if(blnError){
        Swal.fire({
            title:'Oh no! Please check your work',
            html:strError,
            icon:'error',
            confirmButtonColor: '#d88a0cff'
        });
        return;
    }

    let formData = new URLSearchParams(new FormData(document.querySelector('#signUpForm')));
    const response = await fetch("/signup", { method: "POST", body: formData });
    const data = await response.json();
    //error response
    if(data.error){
        Swal.fire("Error", data.error, "error");
        return;
    }
    //success
    Swal.fire({
        title: "Welcome!",
        text: "Your account has been created.",
        icon: "success"
    }).then(() => {
        window.location.href = `./AnimalTable.html?userid=${data.userid}`;
    });
});
