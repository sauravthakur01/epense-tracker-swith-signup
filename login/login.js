const form = document.getElementById('login-form');

form.addEventListener('submit' , login)

async function login(e){
    e.preventDefault() ;
    try {

        let loginDetails = {
            email:e.target.email.value,
            password:e.target.password.value
        }

        const response = await axios.post("http://localhost:3000/user/login", loginDetails)
        if(response.status === 200){
            alert("User login sucessful")
        }else{
            console.log('error')
        }

    } catch (err) {
        console.log(err)
    }
}