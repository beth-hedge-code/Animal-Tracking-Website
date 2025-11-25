//***STUFF***
const regEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const regPhone = /^([+]?\d{1,2}[-\s]?|)\d{3}[-\s]?\d{3}[-\s]?\d{4}$/
const regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

//***INDEX***

//Functions
function validateEmail(strEmail){
    if(!regEmail.test(strEmail)){
        document.querySelector('#passwordHelpBlock').classList.remove('text-success')
        document.querySelector('#passwordHelpBlock').classList.add('text-danger')
        return true   
    }
    else{
        document.querySelector('#passwordHelpBlock').classList.remove('text-danger')
        document.querySelector('#passwordHelpBlock').classList.add('text-success')
        return false
    }
}
function validateName(strName){
    if(strName < 1){
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
        return true
    }
    
}

function validatePassword(strPassword){
    if(!regPassword.test(strPassword)){
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
    let strEmail = document.querySelector('#txtEmail').value.trim()
    let blnError = false
    let strError = ''
    
    if(validateEmail(strEmail) == true){
        blnError = true
        strError += "Invalid Email. "
    }

    if(validatePassword(strPassword) == true){
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
        //Sends User to Animal Home Page
        //Got from W3Schools 
        //No user specfic verfication. 
        window.location.replace("animalhome.html");
    }
})

document.querySelector('#btnSignUp').addEventListener('click',function(){
    let strEmail = document.querySelector('#txtEmail').value.trim()
    let strName = document.querySelector('#txtName').value.trim()
    let blnError = false
    let strError = ''
    
    if(validateEmail(strEmail) == true){
        blnError = true
        strError += "Invalid Email. "
    }
    if(validatePassword(strPassword) == true){
        blnError = true
        strError += "Invalid Password. "
    }
    if(validateName(strName) == true){
        blnError = true
        strError += "Invalid Name. "
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
        window.location.replace("animalhome.html");
    }
})




//***ANIMAL HOME***

//button to add a new animal
document.querySelector('#btnNewAnimal').addEventListener('click',function(){
    //open a new card labeled "newAnimal" here?
})

//buttont o filter animals by category
document.querySelector('#btnFilter').addEventListener('click',function(){
    //select from a list 
})