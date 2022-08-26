//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector("#todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//eventlistners
todoButton.addEventListener("click", function addtodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //add Todo DIV
    const TodoDiv = document.createElement("div");
    //adding the class to TodoDiv
    TodoDiv.setAttribute("class", "todo");
    //adding LI
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-item");

    //checking if the user entering the empty string and returning him out of the function if he do so
    if (todoInput.value === '') {
        alert("you are entering the empty string!");
        return;
    } //otherwise adding the input to the todo list
    else {
        newTodo.innerText = todoInput.value;
    }
    TodoDiv.appendChild(newTodo);

    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    TodoDiv.appendChild(completedButton);
    // TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    TodoDiv.appendChild(trashButton);
    //APPEND TO THE LIST
    todoList.appendChild(TodoDiv);
    //saving to the local storage
    saveTodo(todoInput.value);
    //clear todo input value
    todoInput.value = "";
});

//for listening to the delete and check button event

todoList.addEventListener('click', function (e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add('fall');

        // we are using another event listner which waits for the transition to end and then execute the function
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });

        //after 1 sec removing the todo item from the list by set time out function
        // setTimeout(() => {
        // todo.remove();
        // }, 1000);
    }

    //check todo
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
});

//for filtering the tasks on the basis of completion
filterOption.addEventListener('click', function (e) {
    const Todos = todoList.childNodes;
    Todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    console.log("done");
                } else {
                    todo.style.display = "none";
                }
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                    console.log("done");
                } else {
                    todo.style.display = "none";
                }

        }

    });
});

//for saving the todo to the local storage
function saveTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}