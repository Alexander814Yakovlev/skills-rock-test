let app = document.querySelector("#app");


let filters = document.createElement('select');
let addBlock = document.createElement("div");
let addTaskBtn = document.createElement("button");
let newTaskField = document.createElement("textarea");
let task_ul = document.createElement("ul");

let tasks = localStorage.getItem("task_list")
  ? JSON.parse(localStorage.getItem("task_list"))
  : [{ id: 0, text: "First task", isActive: true }];

let options = ['Все', 'Завершенные', 'Незавершенные']
options.forEach(optionText => {
  let option = document.createElement('option');
  option.text = optionText;
  filters.add(option);
});
filters.className = 'task__filter'
filters.onchange = (e) => {filterTasks(e.target.value)}

addTaskBtn.textContent = "Добавить задачу";
addTaskBtn.className = 'task__btn_add'
addTaskBtn.onclick = addNewTask;

addBlock.className = "task__add";
addBlock.appendChild(newTaskField);
addBlock.appendChild(addTaskBtn);

app.appendChild(filters)
app.appendChild(addBlock);
app.appendChild(task_ul);

function redraw() {
  localStorage.setItem("task_list", JSON.stringify(tasks));
  renderTaskList();
}

function renderTaskList() {
  task_ul.innerHTML = "";
  for (let task of tasks) {
    let li = document.createElement("li");
    let title = document.createElement("h4");
    title.textContent = task.text;
    let removeTask = document.createElement("button");
    removeTask.className = "task__remove";
    removeTask.textContent = "✕";
    removeTask.onclick = (e) => {
      deleteTask(e.target.parentElement.dataset.id);
    };
    li.appendChild(title);
    li.appendChild(removeTask);
    li.classList.add(task.isActive ? "active" : "done");
    li.dataset.id = task.id;
    title.onclick = (e) => {
      markTask(e.target.parentElement.dataset.id);
    };
    task_ul.appendChild(li);
  }
}

function addNewTask() {
  if (newTaskField.value !== "") {
    newTask = {
      id: Date.now(),
      text: newTaskField.value,
      isActive: true,
    };
    tasks.push(newTask);
    newTaskField.value = "";
    redraw()
  } else {
    alert('Невозможно добавить пустую задачу, дайте Вашей задаче какое-нубудь название!')
  }
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id != id);
  redraw()
}

function markTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === +id);
  if (taskIndex !== -1) {
    tasks[taskIndex].isActive = !tasks[taskIndex].isActive;
    redraw();
  } else {
    console.error(`Task with id ${id} not found`);
  }
}

function filterTasks(option) {
  switch (option) {
    case 'Завершенные':
      tasks = JSON.parse(localStorage.getItem("task_list"))
      tasks = tasks.filter((task) => !task.isActive)
      renderTaskList()
      break
    case 'Незавершенные':
      tasks = JSON.parse(localStorage.getItem("task_list"))
      tasks = tasks.filter((task) => task.isActive)
      renderTaskList()
      break
    default:
      tasks = JSON.parse(localStorage.getItem("task_list"))
      renderTaskList()
  }
}

renderTaskList();
