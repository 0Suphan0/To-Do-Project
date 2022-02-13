// Element Choosing

const form = document.querySelector("#todo-form");
const inputValue = document.querySelector("#todo");
const listGroup = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filterInput= document.querySelector("#filter");
const clearTodos= document.querySelector("#clear-todos")



AllEventListeners();

function AllEventListeners() {

    form.addEventListener("submit", CreateTodo)
    document.addEventListener("DOMContentLoaded", PrintUIFromStorage)
    secondCardBody.addEventListener("click", DeleteTodo)
    filterInput.addEventListener("keyup", filterTodos)
    clearTodos.addEventListener("click",deleteAllTodos)
    document.addEventListener("DOMContentLoaded", doControlTodo)
 

}


function doControlTodo(){
    const allList=document.querySelectorAll(".list-group-item");
    if(allList.length===0){
        //butonu kapat
    }
}


function deleteAllTodos(){

    // Remove from UI

    if(confirm("Tümünü Silmek İstediğinize Emin Misiniz?")){
        const allList=document.querySelectorAll(".list-group-item");
        allList.forEach(function(e){
            e.remove();
        })
    
    }
   
    // Remove from Storage

    localStorage.removeItem("todos")


}



function filterTodos(e) {

    const filterValue = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll(".list-group-item");

    listItem.forEach(function(e){
        let text=e.textContent.toLowerCase();
        if(text.indexOf(filterValue)===-1){
            e.setAttribute("style","display:none !important")
            console.log("girer")
        }else{
            e.setAttribute("style","display:block")
        }

    })




}


let isThere = false;
function CreateTodo(e) {
    clearTodos.setAttribute("style","display:block ")

    const newTodo = inputValue.value.trim();

    if (newTodo === "") {

        if (isThere == false) {
            ShowAlert("danger", "Lütfen todo giriniz");
            isThere = true;

        }

    } else {
        ShowAlert("success", "Todo Başarıyla Eklendi");
        AddToUI(newTodo);
        AddToLocalStorage(newTodo);
    }
    e.preventDefault();

}



function DeleteTodo(e) {


    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
    }

    let item = GetTodosFromStorage();

    
    for (let index = 0; index < item.length; index++) {

        if (item[index] === e.target.parentElement.parentElement.textContent) {
            item.splice(index, 1);

            localStorage.setItem("todos", JSON.stringify(item));

        }

    }

}

function ShowAlert(type, message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    firstCardBody.append(alertDiv);

    setTimeout(function () {
        alertDiv.remove()
        isThere=false;
    }, 1000)
}

function AddToUI(newItemValue){
    const newListItem = document.createElement("li");
    newListItem.className = "list-group-item d-flex justify-content-between";

    const text = document.createTextNode(newItemValue)
    const newLink = document.createElement("a");
    newLink.href = "#";
    newLink.className = "delete-item";
    newLink.innerHTML = "<i class = 'fa fa-remove'></i>";

    newListItem.appendChild(text);
    newListItem.appendChild(newLink);
    listGroup.append(newListItem);
    inputValue.value = "";
  
}  

function GetTodosFromStorage(){ // Storage'dan ToDoları almak...
    
    let todos;

    if(localStorage.getItem("todos")===null){
        todos=[];

    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    return todos;

}

function AddToLocalStorage(newTodo){
    let todos = GetTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));

}


function PrintUIFromStorage() {
    
    if (localStorage.getItem("todos")) {
        console.log("Hey")
        clearTodos.setAttribute("style","display:block ")

        let values = JSON.parse(localStorage.getItem("todos"))

        for (let index = 0; index < values.length; index++) {
            AddToUI(values[index])

        }

    }else{
        console.log("hay")
        clearTodos.setAttribute("style","display:none !important")
    }


}

