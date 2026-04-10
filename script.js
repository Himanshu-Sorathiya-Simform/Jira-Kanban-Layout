import {
	createAddNewButtons,
	createTaskCard,
	deleteTaskCard,
	updateColumnCounts,
	updateTaskCard,
} from './board.js';
import { tasks } from './data.js';
import { navigate } from './routing.js';

const mainBoard = document.querySelector('.main-board__grid');

function addTask(task) {
	tasks.push(task);

	createTaskCard(tasks.at(-1));

	updateColumnCounts();
}

function updateTask(task) {
	const index = tasks.findIndex((t) => t.id === task.id);

	tasks[index] = task;

	updateTaskCard(tasks.at(index));

	updateColumnCounts();
}

function deleteTask(id) {
	const index = tasks.findIndex((t) => t?.id === id);

	if (index !== -1) {
		tasks.splice(index, 1);
	}

	deleteTaskCard(id);

	updateColumnCounts();
}

for (const task of tasks) {
	createTaskCard(task);
}

createAddNewButtons();

updateColumnCounts();

mainBoard.addEventListener('click', (e) => {
	const target = e.target.closest('.board-card');

	const id = target?.dataset.id;

	if (!id) return;

	e.preventDefault();

	navigate(target.href);
});

export { addTask, deleteTask, updateTask };
