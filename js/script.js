// import { tasks } from './data/data.js';
import { updateFilterAndOrder } from './handlers/filterAndOrderHandlers.js';
import {
	createTaskCard,
	deleteTaskCard,
	initializeGroupOptions,
	initializeHeader,
	initializePriorityOptions,
	initializeSortOptions,
	initializeTagOptions,
	updateTaskCard,
} from './modules/board.js';
import { navigate } from './modules/routing.js';

// localStorage.setItem('jira_tasks', JSON.stringify(tasks));

const mainBoard = document.querySelector('.main-board__grid');

function addTask(task) {
	const tasks = JSON.parse(localStorage.getItem('jira_tasks')) || [];

	tasks.push(task);
	createTaskCard(tasks.at(-1));

	localStorage.setItem('jira_tasks', JSON.stringify(tasks));
	localStorage.setItem('jira_task_id', +localStorage.getItem('jira_task_id') + 1);
}

function updateTask(task) {
	const tasks = JSON.parse(localStorage.getItem('jira_tasks')) || [];

	const index = tasks.findIndex((t) => t.id === task.id);
	tasks[index] = task;
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

initializeHeader();

// createAddNewButtons();

initializeSortOptions();
initializeGroupOptions();
initializeTagOptions();
initializePriorityOptions();

updateFilterAndOrder();

mainBoard.addEventListener('click', (e) => {
	const target = e.target.closest('.board-card');

	const id = target?.dataset.id;

	if (!id) return;

	e.preventDefault();

	navigate(target.href);
});

export { addTask, deleteTask, updateTask };
