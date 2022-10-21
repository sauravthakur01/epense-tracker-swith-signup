const form = document.getElementById('expense-form')
const expenseDiv = document.getElementById('expense-div');

window.addEventListener('DOMContentLoaded' , loadScreen);

async function loadScreen(e){
    e.preventDefault();

    try {
        let response = await axios.get("http://localhost:3000/expense/")
        console.log(response.data)
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
    
        let response = await axios.post("http://localhost:3000/expense/add-expense", expenseDetails)
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
        await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`)
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