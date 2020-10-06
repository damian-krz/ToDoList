let $toDoInput;
let $addButton;
let $noTaskAlert;
let $taskList;
let $newTask;

const main = () => {
    domElements();
    domEvents();
};

const domElements = () => {
    $toDoInput = document.querySelector(".toDoInput");
    $addButton = document.querySelector(".addButton");
    $noTaskAlert = document.querySelector(".taskAlert");
    $taskList = document.querySelector(".toDoList ul");
};

const domEvents = () => {
    $addButton.addEventListener("click", addNewTask);
};

const addNewTask = () => {
    if($toDoInput.value != "") {
        $newTask = document.createElement("li");
        $newTask.innerText = $toDoInput.value;
        $taskList.appendChild($newTask);
        $toDoInput.value = "";
        $noTaskAlert.innerText = "";
    } else {
        $noTaskAlert.innerText = "Enter the task content!";
    }
}

document.addEventListener("DOMContentLoaded", main);
