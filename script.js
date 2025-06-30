document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('toggle-theme').addEventListener('click', toggleTheme);

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (!taskText) return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  input.value = '';
  renderTasks();
}

function renderTasks() {
  const tasks = getTasks();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleComplete(${task.id})">${task.text}</span>
      <button onclick="deleteTask(${task.id})">❌</button>
    `;
    list.appendChild(li);
  });
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
  const tasks = getTasks().filter(task => task.id !== id);
  saveTasks(tasks);
  renderTasks();
}

function toggleComplete(id) {
  const tasks = getTasks().map(task => {
    if (task.id === id) task.completed = !task.completed;
    return task;
  });
  saveTasks(tasks);
  renderTasks();
}

function loadTasks() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') document.body.classList.add('dark');
  renderTasks();
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
