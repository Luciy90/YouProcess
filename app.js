let tasks = [];

// Загрузка из localStorage
function loadTasks() {
  const saved = localStorage.getItem('yougile_tasks');
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// Сохранение в localStorage
function saveTasks() {
  localStorage.setItem('yougile_tasks', JSON.stringify(tasks));
}

// Добавление задачи
document.getElementById('task-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const productName = document.getElementById('product-name').value.trim();
  const cardNumber = document.getElementById('card-number').value.trim();
  const completed = document.getElementById('completed').checked;

  if (!productName || !cardNumber) return;

  tasks.push({ productName, cardNumber, completed });
  saveTasks();
  renderTasks();
  this.reset();
});

// Отображение задач
function renderTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-card' + (task.completed ? ' completed' : '');
    div.innerHTML = `
      <strong>${task.productName}</strong><br>
      Номер карты: ${task.cardNumber}<br>
      <small>Статус: ${task.completed ? 'Выполнено' : 'В процессе'}</small>
    `;
    list.appendChild(div);
  });
}

// Применение стилей из settings.json
function applySettings() {
  fetch('settings.json')
    .then(res => res.json())
    .then(settings => {
      document.documentElement.style.setProperty('--bg-color', settings.backgroundColor);
      document.documentElement.style.setProperty('--card-bg', settings.cardBackgroundColor);
      document.documentElement.style.setProperty('--accent-color', settings.accentColor);
      document.documentElement.style.setProperty('--completed-color', settings.completedColor);
      document.documentElement.style.setProperty('--font-family', settings.fontFamily);
    });
}

// Инициализация
loadTasks();
applySettings();
renderTasks();
