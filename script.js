const nameInput = document.getElementById("name");
const submitNameButton = document.getElementById("submit-name");
const greetingParagraph = document.getElementById("greeting");

const taskInput = document.getElementById("task");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

const pendingTasksButton = document.getElementById("pending-tasks");
const completedTasksButton = document.getElementById("completed-tasks");

const progressBar = document.getElementById("progress-bar");

const darkModeButton = document.getElementById("dark-mode");
const lightModeButton = document.getElementById("light-mode");

let tasks = [];
let userName = "";

// Set username and display greeting
submitNameButton.addEventListener("click", () => {
    userName = nameInput.value;
    greetingParagraph.textContent = `Hello, ${userName}!`;
    localStorage.setItem("userName", userName);
});

// Handle task creation
addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        const task = {
            name: taskName,
            completed: false
        };
        tasks.push(task);
        taskInput.value = ""; // Clear input field
        updateTaskList();
        updateProgress();
    }
});

// Update task list based on task completion status
function updateTaskList(showCompleted = false) {
    taskList.innerHTML = ""; // Clear the current list
    const filteredTasks = tasks.filter(task => task.completed === showCompleted);

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = task.name;

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", () => toggleTaskCompletion(index));
        listItem.appendChild(completeButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(index));
        listItem.appendChild(deleteButton);

        taskList.appendChild(listItem);
    });
}

// Toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateProgress();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
    updateProgress();
}

// Toggle between pending and completed tasks
pendingTasksButton.addEventListener("click", () => updateTaskList(false));
completedTasksButton.addEventListener("click", () => updateTaskList(true));

// Update progress bar based on completed tasks
function updateProgress() {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.value = progress;
}

// Dark Mode / Light Mode functionality
darkModeButton.addEventListener("click", () => {
    document.body.classList.add("dark-mode");
    document.body.classList.remove("light-mode");
});

lightModeButton.addEventListener("click", () => {
    document.body.classList.add("light-mode");
    document.body.classList.remove("dark-mode");
});
