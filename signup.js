const form  = document.getElementById('signup-form')

form.addEventListener('submit' , signup)

async function signup(e){
    
    e.preventDefault();

    try {
        
        const signupDetails ={
            name:e.target.name.value,
            email:e.target.email.value,
            pass:e.target.password.value
        }
        
        const response = await axios.post('http://localhost:300/user/signup' , signupDetails)
        if (response.status === 201){
            // window.location.href()
        }else{

        }

    } catch (error) {
        document.body.innerHTML = `<div style="color:red;text-align:center">${error}</div>`
    }
    
}