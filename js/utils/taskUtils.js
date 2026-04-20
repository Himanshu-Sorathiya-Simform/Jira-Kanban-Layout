import { createTaskCard, deleteTaskCard, updateTaskCard } from '../modules/board.js';

function addTask(task) {
	const tasks = JSON.parse(localStorage.getItem('jira_tasks')) || [];

	tasks.push(task);
	createTaskCard(tasks.at(-1));

	localStorage.setItem('jira_tasks', JSON.stringify(tasks));
	localStorage.setItem(
		'jira_task_id',
		String(+localStorage.getItem('jira_task_id') + 1),
	);
}

function updateTask(task) {
	const tasks = JSON.parse(localStorage.getItem('jira_tasks')) || [];

	const index = tasks.findIndex((t) => t.id === task.id);

	tasks[index] = { ...tasks[index], ...task };

	updateTaskCard(tasks.at(index));

	localStorage.setItem('jira_tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
	const tasks = JSON.parse(localStorage.getItem('jira_tasks')) || [];

	const index = tasks.findIndex((t) => t?.id === id);
	if (index !== -1) {
		tasks.splice(index, 1);
	}
	deleteTaskCard(id);

	localStorage.setItem('jira_tasks', JSON.stringify(tasks));
}

export { addTask, deleteTask, updateTask };
