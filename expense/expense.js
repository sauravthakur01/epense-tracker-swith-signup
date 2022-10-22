const form = document.getElementById('expense-form')
const expenseDiv = document.getElementById('expense-div');


let token = localStorage.getItem('token');

window.addEventListener('DOMContentLoaded' , loadScreen);

async function loadScreen(e){
    e.preventDefault();

    const usertype = localStorage.getItem('user');
    console.log(usertype == "true")
    if(usertype == "true"){
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        document.getElementsByClassName('center')[0].classList.remove('light')
        document.getElementsByClassName('center')[0].classList.add('dark')
        document.getElementById('expense-div').classList.remove('light')
        document.getElementById('expense-div').classList.add('dark')
    }


    try {
        let response = await axios.get("http://localhost:3000/expense/" , {headers:{"Authorization" : token}})
        // console.log(response.data)
        response.data.map(expense=>showExpenseOnScreen(expense))
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit' , addExpense)

async function addExpense(e){
    e.preventDefault() ;
    
    try {
        const expenseDetails = {
            amount:e.target.amount.value ,
            description: e.target.description.value ,
            category:e.target.category.value
        }
        
        let response = await axios.post("http://localhost:3000/expense/add-expense", expenseDetails, {headers : {'Authorization': token}})
        if(response.status === 201){
            // console.log(response.data.data)
            showExpenseOnScreen(response.data.data)
        }else{
            throw new Error ('unavle to add Expense')
        }
        
    } catch (error) {
        console.log(error);
    }  
}


function showExpenseOnScreen(data){
    const child = `<li class="list" id=${data.id}>
        <span class="expense-info"> ${data.amount} -${data.description} - ${data.category}</span>
        <span class="btns">
            <button>Edit</button> 
            <button onclick="remove('${data.id}')">Delete</button>
        </span>
    </li>`

    expenseDiv.innerHTML += child
}

async function remove (id){
    try {
        await axios.delete(`http://localhost:3000/expense/delete-expense/${id}` , {headers : {'Authorization': token}} )
        removeFromScreen(id)
    } catch (error) {
        console.log(error);
    }
}

function removeFromScreen(id){
    let child = document.getElementById(id);
    if(child){
        expenseDiv.removeChild(child);
    }
}

document.getElementById('premium').onclick = async function(e){
    var x =0;
    try {
        const response = await axios.post('http://localhost:3000/payment/premiummembership', x, {headers : {'Authorization': token}})

        checkout(response.data);
    } catch (error) {
        console.log(error)
    }
}

function checkout(order){

    // console.log(order);
    // console.log(order.order.id)

    var options = {
        "key" : order.key_id,
        "amount": order.order.amount,
        "currency": "INR",
        "order_id": order.order.id,
        "handler": function (response) {
            
            alert(`Payment successfull . Payment Id:- ${response.razorpay_payment_id} ` );
            
            // console.log(response.razorpay_payment_id);
            // console.log(response.razorpay_order_id);
            // console.log(response.razorpay_signature);

            axios.post('http://localhost:3000/payment/updatestatus', response,
             {headers : {'Authorization': token}})
            .then(res => {
                console.log("done");
                console.log(res);
                alert("You are a premium user now");
                premiumUser();
            })
            .catch(err => console.log(err));
        },
        "prefill": {
            "name": "Test User",
            "email": "test.user@example.com",
            "contact": "7003442036"
          },
        "theme": {
            "color": "#3399cc",
        },

        "callback_url": "expense.html"
    }

    var razorpay_1 = new Razorpay(options);

    razorpay_1.on('payment.failed', function(res) {
        alert(res.error.code);
        alert(res.error.description);
    });

    razorpay_1.open();
}

function premiumUser(){
    document.body.classList.remove('light')
    document.body.classList.add('dark')
    document.getElementsByClassName('center')[0].classList.remove('light')
    document.getElementsByClassName('center')[0].classList.add('dark')
    document.getElementById('expense-div').classList.remove('light')
    document.getElementById('expense-div').classList.add('dark')
}

document.getElementById('logout').onclick = function(e){
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '../login/login.html'
}