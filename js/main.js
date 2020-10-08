let $toDoListInput;
let $taskList;
let $addTaskButton;
let $taskListAlert;
let $popUpEditTask;
let $popUpEditTaskH3;
let $popUpEditTaskInput;
let $popUpEditTaskAlert;
let $getElementsByTagNameTaskList
let $newTask;
let $idTaskNumber = 0;
let $editedTask;

const main = () => {
    domElements();
    domEvents();
};

const domElements = () => {
    $toDoListInput = document.querySelector(".toDoListInput");
    $taskList = document.querySelector(".toDoList ul");
    $addTaskButton = document.querySelector(".addTaskButton");
    $taskListAlert = document.querySelector(".taskListAlert");
    $popUpEditTask = document.querySelector(".popUpEditTask");
    $popUpEditTaskH3 = document.querySelector(".popUpEditTask h3");
    $popUpEditTaskInput = document.querySelector(".popUpEditTaskInput");
    $popUpEditTaskAlert = document.querySelector(".popUpEditTaskAlert");
    $getElementsByTagNameTaskList = $taskList.getElementsByTagName("li");
};

const domEvents = () => {
    $addTaskButton.addEventListener("click", addNewTask);
    $taskList.addEventListener("click", clickedInTaskList);
    $popUpEditTask.addEventListener("click", clickedInPopUpEditTask);
    $toDoListInput.addEventListener("keyup", useKeyboardButton);
};

const addNewTask = () => {
    if ($toDoListInput.value !== "") {
        $idTaskNumber++;
        $newTask = document.createElement("li");
        $newTask.innerText = $toDoListInput.value;
        $newTask.setAttribute("id", `taskNumber-${$idTaskNumber}`);
        $taskList.appendChild($newTask);
        $toDoListInput.value = "";
        $taskListAlert.innerText = "";
        createToolButtonsArea();
    } else {
        $taskListAlert.innerText = "Enter the task content!";
    }
};

const useKeyboardButton = (e) => {
    if(e.code === 'Enter') {
        addNewTask();
    }
};

const createToolButtonsArea = () => {
    const toolButtons = document.createElement("div");
    const checkmarkButton = document.createElement("button");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    
    addToolButtons(toolButtons);
    addCheckmarkButton(checkmarkButton);
    addEditButton(editButton);
    addDeleteButton(deleteButton);
    toolButtonsAppendChild(toolButtons, checkmarkButton, editButton, deleteButton);
};

const addToolButtons = (toolButtons) => {
    toolButtons.classList.add("toolButtons");
    $newTask.appendChild(toolButtons);
};

const addCheckmarkButton = (checkmarkButton) => {
    checkmarkButton.classList.add("checkmark");
    checkmarkButton.classList.add("checkmarkStyle");
    checkmarkButton.innerHTML = `<i class="fas fa-check-square"></i>`;
};

const addEditButton = (editButton) => {
    editButton.classList.add("edit");
    editButton.innerHTML = `<i class="fas fa-pen-square"></i>`;
};

const addDeleteButton = (deleteButton) => {
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = `<i class="fas fa-times-circle"></i>`;
};

const toolButtonsAppendChild = (toolButtons, checkmarkButton, editButton, deleteButton) => { 
    toolButtons.appendChild(checkmarkButton);
    toolButtons.appendChild(editButton);
    toolButtons.appendChild(deleteButton);
};

const clickedInTaskList = (e) => {
    if (e.target.closest("button").classList.contains("checkmark")) {
        checkmarkTask(e);
    } else if (e.target.closest("button").classList.contains("edit")) {
        editTask(e);
    } else if (e.target.closest("button").classList.contains("delete")) {
        deleteTask(e);
    }
};

const checkmarkTask = (e) => {
    e.target.closest("button").classList.toggle("checkmarkStyle");
    e.target.closest("button").classList.toggle("checked");
    e.target.closest("li").classList.toggle("checked");
}

const editTask = (e) => {
    $popUpEditTask.style.display = "flex";
    const taskWithId = e.target.closest("li").id;
    $editedTask = document.getElementById(taskWithId);
    $popUpEditTaskInput.value = $editedTask.firstChild.textContent;
    $popUpEditTaskH3.innerText = `Edit task '${$popUpEditTaskInput.value}':`;
    clickedInPopUpEditTask();
}

const clickedInPopUpEditTask = (e) => {
    if (e.target.closest("button").classList.contains("accept")) {
        inputWindowPopUpEditTask();
    } else if (e.target.closest("button").classList.contains("cancel")) {
        cancelClickPopUpEditTask();
    }
}

const inputWindowPopUpEditTask = () => { 
    if($popUpEditTaskInput.value !== "") {
        $editedTask.firstChild.textContent = $popUpEditTaskInput.value;
        $popUpEditTask.style.display = "none";
        $popUpEditTaskAlert.innerText = "";
    } else {
        $popUpEditTaskAlert.innerText = "Enter any task content.";
    }
}

const cancelClickPopUpEditTask = () => {
    $popUpEditTask.style.display = "none";
    $popUpEditTaskAlert.innerText = "";
}

const deleteTask = (e) => {
    e.target.closest("li").remove();
    $popUpEditTask.style.display = "none";
    emptyTaskListAlert();
} 

const emptyTaskListAlert = () => {
    if ($getElementsByTagNameTaskList.length === 0) {
        $taskListAlert.innerText = "There are no tasks on the list."
    }
}

document.addEventListener("DOMContentLoaded", main);