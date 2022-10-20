const form  = document.getElementById('signup-form')
const errorDiv = document.getElementById('error')

form.addEventListener('submit' , signup)

async function signup(e){
    
    e.preventDefault();
    errorDiv.innerHTML =''
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
        

    } catch (err) {
        error.innerHTML = `<div style="color:red;text-align:center;padding:10px;margin-bottom:-30px">${err}</div>`
    }
    
}