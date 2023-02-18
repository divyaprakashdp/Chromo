let timeContainer = document.getElementById('time');
let inputField = document.getElementById('task');
let user = document.getElementById("userName");
let greetingMessage = document.getElementById('greeting');
let changeNameBtn = document.getElementById('changeName');
let todoInput = document.getElementById('todo-input');
let squareBox = document.getElementById('squarebox');
var today = new Date();

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    timeContainer.innerHTML = hours + ":" + minutes;
    const timer = setTimeout(function() {
        startTime()
    }, 60000);
}
startTime();

todoInput.addEventListener("keypress", function onEvent(event) {
    let todoId = 1
    if (event.key === 'Enter') {
        localStorage.setItem('todo', `${todoInput.innerHTML}`);
        document.body.appendChild(`${<span id={todoId++} contenteditable="true">Enter task for today</span>}`);
        todoInput.setAttribute("contenteditable", "false");
        todoInput.innerHTML = localStorage.getItem('todo');
        todoInput.style.border = 0;
    }
})


user.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        localStorage.setItem('name', `${user.innerHTML}`)
        user.setAttribute("contenteditable", "false");
        user.innerHTML = `${localStorage.getItem('name')}.`;
        user.style.border = 0;
    }
})

function checkLocalStorageName() {
    if (localStorage.getItem('name') == null) {
        user.setAttribute('placeholder', 'enter name');
    } else {
        // var greeting = document.getElementById('greetingHeading');
    
    if (today.getHours() > 4 && today.getHours() < 12) {
        greetingMessage.innerHTML = 'Good morning,' + ' ';
    }
    if(today.getHours() >= 12 && today.getHours() < 16){
        greetingMessage.innerHTML = 'Good afternoon,' + ' ';
    }
    if(today.getHours() >= 16 && today.getHours() <= 24){
        greetingMessage.innerHTML = 'Good evening,' + ' ';
    }
        // greetingMessage.innerHTML = 'Good evening,' + ' ';
        user.innerHTML = `${localStorage.getItem('name')}!`;
        user.setAttribute('contenteditable', 'false');
        user.style.border = 0;
        greetingMessage.appendChild(user)
    }
}

checkLocalStorageName();

function checkLocalStorageTodo() {
    if (localStorage.getItem('todo') == null) {
        todoInput.setAttribute('placeholder', 'enter task here');
    } else {
        todoInput.innerHTML = localStorage.getItem('todo');
        console.log(todoInput.innerHTML)
        todoInput.setAttribute('contenteditable', 'false');
        todoInput.style.border = 0;
        todoInput.style.textDecoration = localStorage.getItem('textDecoration');
        squareBox.className = localStorage.getItem('checkbox') || 'fas fa-square fa-xs';
        document.getElementById("deleteTask").disabled=false;
        
    }
}

checkLocalStorageTodo();

todoInput.addEventListener('dblclick', function(event) {
    todoInput.setAttribute('contenteditable', 'true');
    todoInput.style.borderBottom = '2px solid #ffffff';
    if (localStorage.getItem('todo') != todoInput.innerHTML) {
        localStorage.removeItem('todo')
        checkLocalStorageTodo()
    } else {
        todoInput.setAttribute('contenteditable', 'false');
    }
})

user.addEventListener('dblclick', (event) => {
    user.setAttribute('contenteditable', 'true');
    user.style.borderBottom = '2px solid #ffffff';
})

user.addEventListener('blur', (event) => {
    if (localStorage.getItem('name') == user.innerHTML) {
        user.innerHTML = localStorage.getItem('name');
    } else {
        user.innerHTML = 'enter name';
        localStorage.removeItem('name');
    }
})


function deleteTask() {

    localStorage.removeItem('todo');
    todoInput.innerHTML = 'Enter task for today';
    todoInput.setAttribute('contenteditable', 'true');
    todoInput.style.border = 0;
}
document.getElementById("deleteTask").addEventListener("click", deleteTask);

squareBox.onclick = swapClass;

function swapClass() {
    if (squareBox.className === 'fas fa-square fa-xs') {
        todoInput.style.textDecoration = 'line-through';
        localStorage.setItem('textDecoration', 'line-through');
        squareBox.className = 'far fa-check-square';
        localStorage.setItem('checkbox', 'far fa-check-square');
    } else {
        squareBox.className = 'fas fa-square fa-xs';
        todoInput.style.textDecoration = 'none';
        localStorage.setItem('textDecoration', 'none');
        localStorage.setItem('checkbox', 'fas fa-square fa-xs');
    }
};

function addNewTodo(){

}