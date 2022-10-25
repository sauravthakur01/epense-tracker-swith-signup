window.addEventListener('DOMContentLoaded', fetchuserExpenses)

const expenseDiv = document.getElementById('expense-div');

async function fetchuserExpenses(e){
   e.preventDefault()

   let token = localStorage.getItem('token');
   let loadUserId = localStorage.getItem('clickedUser')
//    console.log(loadUserId , token)
    try {
        let response = await axios.post('http://localhost:3000/expense/leaderboard-user' , {loadUserId} ,{headers : {'Authorization': token}} )
        if(response.data.success){
            response.data.data.map(data=>{
                showOnScreen(data);
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}

function showOnScreen(data){
    let child = `<li class="list" >
    <span class="expense-info"> ₹ ${data.amount} - ${data.category} - ${data.description}</span>
</li>`

expenseDiv.innerHTML += child
}

