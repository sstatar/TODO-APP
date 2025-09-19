let taskList = [];
let doneList = [];

const form = document.getElementById("addTaskForm");
const taskInput = document.getElementById("todo-input");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskName = taskInput.value;
    addTask(taskName);
    taskInput.value = "";
});

function addTask(taskName) {
    taskList.push({ name: taskName });
    displayTasks();
    displayNextTasks();
}

function displayNextTasks() {
    const nextTaskSection = document.querySelector(".nextTask-section");
    nextTaskSection.innerHTML = "";

    if (taskList.length > 0) {
        const nextTaskTitle = document.createElement("h3");
        nextTaskTitle.className = "cover-title";
        nextTaskTitle.textContent = "Next";

        const nextTaskContainer = document.createElement("div");
        nextTaskContainer.className = "next-task";

        const divTaskContent = document.createElement("div");
        divTaskContent.id = "nextTask-content";
        const taskElement = document.createElement("div");
        taskElement.className = "task-name";
        taskElement.id = "nextTask-name";

        const taskPicture = document.createElement("img");
        taskPicture.id = "task-picture";
        taskPicture.src = "activityPicture.png";

        taskElement.textContent = taskList[0].name;

        const checkBtn = createSuccessButton(0);
        checkBtn.id ="nextTask-checkBtn";

        const deleteBtn = createDeleteButton(0, taskList);
        deleteBtn.id = "nextTask-deleteBtn";

        taskElement.appendChild(checkBtn);
        divTaskContent.appendChild(taskPicture);
        divTaskContent.appendChild(taskElement);
        nextTaskContainer.appendChild(divTaskContent);
        nextTaskContainer.appendChild(deleteBtn);
        nextTaskSection.appendChild(nextTaskTitle);
        nextTaskSection.appendChild(nextTaskContainer);
    }
}

function displayTasks() {
    const taskListContainer = document.querySelector(".task-list");
    taskListContainer.innerHTML = "";

    taskList.forEach(function (task, index) {
        const divTaskContent = document.createElement("div");
        divTaskContent.className = "task-content";
        const taskElement = document.createElement("div");
        taskElement.className = "task-name";
        taskElement.id = "allTask-name";

        taskElement.textContent = task.name;

        const checkBtn = createSuccessButton(index);

        const deleteBtn = createDeleteButton(index, taskList);
        deleteBtn.id = "allTask-deleteBtn";

        taskElement.appendChild(checkBtn);
        divTaskContent.appendChild(taskElement);
        taskListContainer.appendChild(divTaskContent);
        divTaskContent.appendChild(deleteBtn);
    });
}

function displayDonetasks() {
    const doneListSection = document.querySelector(".doneTask-section");
    doneListSection.innerHTML = "";

    if (doneList.length > 0) {
        const doneTitle = document.createElement("h3");
        doneTitle.textContent = "Done Task";
        doneListSection.appendChild(doneTitle);

        const doneListContainer = document.createElement("div");
        doneListContainer.className = "doneList-container";

        doneList.forEach(function (task, index) {
            const doneElement = document.createElement("div");
            doneElement.className = "doneTask-element";
            doneElement.textContent = task.name;
            doneElement.style.textDecoration = "line-through";

            const doneContent = document.createElement("div");
            doneContent.classList = "doneTask-content";

            const deleteBtn = createDeleteButton(index, doneList);
            deleteBtn.id = "donTask-deleteBtn";

            doneContent.appendChild(doneElement);
            doneContent.appendChild(deleteBtn);
            doneListContainer.appendChild(doneContent);
            doneListSection.appendChild(doneListContainer);
        });
    }
}

function createSuccessButton(index) {
    const checkBtn = document.createElement("button");
    // checkBtn.textContent = "Success";
    checkBtn.className = "success-btn";
    checkBtn.addEventListener("click", function () {
        const movedTask = taskList.splice(index, 1)[0];
        doneList.push(movedTask);
        updateAllDisplay();
    });
    return checkBtn;
}

function createDeleteButton(index, fromList) {
    const button = document.createElement("img");
    button.src = "binPicture.png";
    button.className = "delete-btn";
    button.addEventListener("click", function () {
        fromList.splice(index, 1);
        if (fromList === taskList) {
            displayTasks();
            displayNextTasks();
        } else {
            displayDonetasks();
        }
    });
    return button;
}

function updateAllDisplay() {
    displayNextTasks();
    displayTasks();
    displayDonetasks();
}
