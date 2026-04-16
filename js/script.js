import { tasks } from './data/data.js';
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

const mainBoard = document.querySelector('.main-board__grid');

function addTask(task) {
	tasks.push(task);

	createTaskCard(tasks.at(-1));
}

function updateTask(task) {
	const index = tasks.findIndex((t) => t.id === task.id);

	tasks[index] = task;

	updateTaskCard(tasks.at(index));
}

function deleteTask(id) {
	const index = tasks.findIndex((t) => t?.id === id);

	if (index !== -1) {
		tasks.splice(index, 1);
	}

	deleteTaskCard(id);
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
