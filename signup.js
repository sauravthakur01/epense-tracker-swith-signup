const form  = document.getElementById('signup-form')

form.addEventListener('submit' , signup)

async function signup(e){
    
    e.preventDefault();

    try {
        
        const signupDetails ={
            name:e.target.name.value,
            email:e.target.email.value,
            password:e.target.password.value
        }

        const response = await axios.post("http://localhost:3000/user/signup" , signupDetails)
        if (response.status === 201){
            console.log('success');
            // window.location.href()
        }else{
            console.log('bye')
        }
        

    } catch (error) {
        document.body.innerHTML = `<div style="color:red;text-align:center">${error}</div>`
    }
    
}