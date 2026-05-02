const tasks = [
  { title: 'Election turnout live update', assignee: 'A. Kim', priority: 'High', deadline: 'Today 14:00', status: 'Draft' },
  { title: 'Airport expansion analysis', assignee: 'J. Cole', priority: 'Medium', deadline: 'Tomorrow', status: 'Assigned' },
  { title: 'Flood alert impact map', assignee: 'L. Rivera', priority: 'Urgent', deadline: 'Today 13:00', status: 'In Progress' },
  { title: 'Mayor interview transcript', assignee: 'N. Patel', priority: 'Low', deadline: 'Fri', status: 'Submitted' }
];

function renderTasks() {
  document.querySelectorAll('.dropzone').forEach(z => z.innerHTML = '');
  tasks.forEach((t, idx) => {
    const el = document.createElement('article');
    el.className = 'task';
    el.draggable = true;
    el.dataset.index = idx;
    el.innerHTML = `<strong>${t.title}</strong><small>${t.assignee} · ${t.priority} · ${t.deadline}</small>`;
    const col = document.querySelector(`.column[data-status="${t.status}"] .dropzone`);
    if (col) col.appendChild(el);
  });
  bindTaskDnD();
}

function bindTaskDnD() {
  document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain', task.dataset.index));
  });
  document.querySelectorAll('.column').forEach(col => {
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', e => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const idx = Number(e.dataTransfer.getData('text/plain'));
      tasks[idx].status = col.dataset.status;
      renderTasks();
    });
  });
}

function bindQueueDnD() {
  const queue = document.getElementById('queue');
  let dragEl = null;
  queue.querySelectorAll('.queue-item').forEach(item => {
    item.addEventListener('dragstart', () => { dragEl = item; });
    item.addEventListener('dragover', e => e.preventDefault());
    item.addEventListener('drop', e => {
      e.preventDefault();
      if (dragEl && dragEl !== item) {
        const nodes = [...queue.children];
        const targetIndex = nodes.indexOf(item);
        queue.removeChild(dragEl);
        queue.insertBefore(dragEl, queue.children[targetIndex]);
        renumberQueue();
      }
    });
  });
}

function renumberQueue() {
  document.querySelectorAll('.queue-item').forEach((item, i) => {
    item.textContent = `${i + 1}. ${item.textContent.replace(/^\d+\.\s/, '')}`;
  });
}

renderTasks();
bindQueueDnD();
