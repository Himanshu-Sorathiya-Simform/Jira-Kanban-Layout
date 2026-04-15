import { tasks } from '../data/data.js';
import { createTaskCard } from '../modules/board.js';
import { updateFilters } from './filterHandlers.js';

function updateSorts() {
	let tempTasks = tasks;

	document.querySelectorAll('.board-column__content ul').forEach((column) => {
		column.innerHTML = '';
	});

	if (sorts.sort === 'due_date_ascending') {
		tempTasks = tasks.toSorted((a, b) => {
			return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
		});
	}

	if (sorts.sort === 'due_date_descending') {
		tempTasks = tasks.toSorted((a, b) => {
			return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
		});
	}

	for (const card of tempTasks) {
		createTaskCard(card);
	}

	updateFilters();
}

function changeSort(key, value) {
	sorts[key] = value;

	updateSorts();
}

const sorts = {
	sort: '',
};

const sortDropdown = document.querySelector('.main-board__dropdown--sort');

sortDropdown.addEventListener('change', () => changeSort('sort', sortDropdown.value));

export { updateSorts };
