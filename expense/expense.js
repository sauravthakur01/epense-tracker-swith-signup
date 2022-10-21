const form = document.getElementById('expense-form')
const expenseDiv = document.getElementById('expense-div');

window.addEventListener('DOMContentLoaded' , loadScreen);

async function loadScreen(e){
    e.preventDefault();
    let token = localStorage.getItem('token');
    // console.log(token)

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
    let token = localStorage.getItem('token')
    
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
    let token = localStorage.getItem('token')
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