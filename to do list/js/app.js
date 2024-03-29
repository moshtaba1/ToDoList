let input = document.querySelector("input")
let todoListElem = document.querySelector("#todoList")
let addButton = document.querySelector("#addButton")
let deleteBtn = document.querySelector(".deleteBtn")
let completeBtn = document.querySelector(".completeBtn")
let clearButton = document.querySelector("#clearButton")

let toDoArray = []

function addToDo () {
    let toDoObg = {
        id : toDoArray.length + 1 ,
        title : input.value ,
        status: false
    }
    toDoArray.push(toDoObg)
    setLocalStorage(toDoArray)
    todoGenrator(toDoArray)
    input.value = ""
    input.focus()
}

function setLocalStorage (todosList) {
    localStorage.setItem("todos", JSON.stringify(todosList))
}

function todoGenrator (todosList) {

    let newLi,newLabel,newCompBtn,newDeleteBtn;

    todoListElem.innerHTML = ""

    todosList.forEach(function (todo){
        newLi = document.createElement("li")
        newLi.className = "completed well"
        
        newLabel = document.createElement("label")
        newLabel.innerHTML = todo.title
        
        newCompBtn = document.createElement("btn")
        newCompBtn.innerHTML = "Complete"
        newCompBtn.className = " btn btn-success"
        newCompBtn.setAttribute("onclick", "changeTodo(" + todo.id + ")")

        
        newDeleteBtn = document.createElement("btn")
        newDeleteBtn.innerHTML = "Delete"
        newDeleteBtn.className = " btn btn-danger"
        newDeleteBtn.setAttribute("onclick", "deleteToDo(" + todo.id + ")")

        if(todo.status){
            newLi.className = "uncompleted well"
            newCompBtn.innerHTML = "unComplete"

        }

        
        newLi.append(newLabel,newCompBtn,newDeleteBtn);
        todoListElem.append(newLi);
    })
}

function changeTodo (todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))

    toDoArray = localStorageTodos

    toDoArray.forEach(function(todo){
        if(todo.id === todoId){
            todo.status = !todo.status
        }
    })

    setLocalStorage(toDoArray)
    todoGenrator(toDoArray)
}

function deleteToDo (todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))

    toDoArray = localStorageTodos

    let mainIndex = toDoArray.findIndex(function(todo){
        return todo.id === todoId
    })

    toDoArray.splice(mainIndex , 1)

    console.log(mainIndex)

    setLocalStorage(toDoArray)
    todoGenrator(toDoArray)
    
}


function getLocalStorage (){
    let localStorageTodos = JSON.parse(localStorage.getItem("todos"))
    if(localStorageTodos){
        toDoArray = localStorageTodos
    }else{
        toDoArray = []
    }
    
    todoGenrator(toDoArray)
}

function clearAllToDo (){
    toDoArray = []
    todoGenrator(toDoArray)
    localStorage.removeItem("todos")
}




window.addEventListener("load", getLocalStorage)
addButton.addEventListener("click", addToDo )
clearButton.addEventListener("click", clearAllToDo)
input.addEventListener("keypress", function (event){
    if(event.keyCode === 13){
        addToDo()
    }
})
// deleteBtn.addEventListener("click", deleteToDo)
// completeBtn.addEventListener("click", changeStatus)

// function changeStatus () {
//     toDoObg.status = true
//     newCompBtn.innerHTML = "incomplete"
//     newLi.classList.add("uncompleted")
// }