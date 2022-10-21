const form = document.getElementById('login-form');
const errorDiv = document.getElementById('error')

form.addEventListener('submit' , login)

async function login(e){
    e.preventDefault() ;
    errorDiv.innerHTML =''
    try {
        
        let loginDetails = {
            email:e.target.email.value,
            password:e.target.password.value
        }

        const response = await axios.post("http://localhost:3000/user/login", loginDetails)
        if(response.status === 200){
            alert("User login sucessful")
            window.location.href = '../expense/expense.html'
        }else{
            e.target.password.value='';
            console.log('error')
        }

    } catch (err) {
        e.target.password.value='';
        error.innerHTML = `<div style="color:red;text-align:center;padding:10px;margin-bottom:-30px">${err}</div>`
    }
}