const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');

// lOAD ALL THE EVENT LISTENERS : 
loadListener();


function loadListener(){
    // Add Task Event : 
    form.addEventListener('submit', addTask);
    // REMOVE TASK : 
    taskList.addEventListener('click', removeTask);
    // Clear Tasks :
    clearBtn.addEventListener('click', clearTasks);
    // FILTER TASKS : 
    filter.addEventListener('keyup', filterTasks);
    // LOCAL STORAGE SHOW : 
    document.addEventListener('DOMContentLoaded', getTasks);
}

function addTask(e){
    if(taskInput.value === ""){
        alert('Add a task');
    }

    // CREATE LI ELEMENT : 
    const li = document.createElement('li');
    // ADD CLASS :  
    li.className = 'collection-item';
    // APPEND : 
    li.appendChild(document.createTextNode(taskInput.value));
    //CREATE LINK : 
    const link = document.createElement('a');
    // ADD LINK CLASS : 
    link.className = 'delete-item secondary-content';
    //ADD ICON HTML : 
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    // ADD LINK TO LI :
    li.appendChild(link);
    e.preventDefault();

    //console.log(li);
    taskList.appendChild(li);
    // ADD TO LS : 
    storeInLS(taskInput.value);
    // CLEAR THE INPUT : 
    taskInput.value = '';

}

// STORE IN LS : 

function storeInLS(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    //console.log(e.target.parentElement);
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
    // REMOVE FROM LS : 
    removefromLS(e.target.parentElement.parentElement);
}

function clearTasks(e){
    // FIRST WAY : 
    //taskList.innerHTML = '';

    // FASTER :
    while(taskList.firstChild){
        taskList.firstChild.remove();
    }

    // Remove from LS : 
    clearFromLS();
}

function clearFromLS(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    const nl = document.querySelectorAll('.collection-item');
    nl.forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function removefromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}