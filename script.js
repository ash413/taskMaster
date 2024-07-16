let addButton = document.querySelector("#new-todo");
let newTodo = document.querySelector(".input")
let todos = [];

let todoList = document.querySelector(".todo-list");

function updateDisplay(){
    todoList.innerHTML = '';
    for(let i=0; i<todos.length; i++){
        let todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.innerHTML = `
            <span>${todos[i]}</span>
            <button onClick="{editTodo(${i})}">Edit</button>
            <button onClick="{deleteTodo(${i})}">Delete</button>
        `;
        todoList.appendChild(todoItem);
    }
}

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos(){
    let storedTodos = localStorage.getItem('todos');
    if(storedTodos){
        todos = JSON.parse(storedTodos);
    }
}

function addTodo(text){
    /*newTodo.innerText = text.push();*/
    text = newTodo.value.trim();
    if(text){
        todos.push(text);
        newTodo.value = '';
        updateDisplay();
        saveTodos();
    }
}

function editTodo(index, newText){
    newText = prompt("Edit your todo: " + todos[index]);
    updateDisplay();
    saveTodos();
}

function deleteTodo(index){
    todos.splice(index, 1);
    updateDisplay();
    saveTodos();
}

addButton.addEventListener("click", addTodo);
newTodo.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        e.preventDefault();
        addTodo();
    }
})

loadTodos();
updateDisplay();