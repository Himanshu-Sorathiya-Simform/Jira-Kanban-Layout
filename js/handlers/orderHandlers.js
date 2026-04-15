import { tasks } from '../data/data.js';
import { createTaskCard } from '../modules/board.js';
import { updateFilters } from './filterHandlers.js';

function updateOrders() {
	let tempTasks = tasks;

	document.querySelectorAll('.board-column__content ul').forEach((column) => {
		column.innerHTML = '';
	});

	if (orders.sort === 'due_date_ascending') {
		tempTasks = tasks.toSorted((a, b) => {
			return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
		});
	} else if (orders.sort === 'due_date_descending') {
		tempTasks = tasks.toSorted((a, b) => {
			return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
		});
	} else if (orders.sort === 'id_ascending') {
		tempTasks = tasks.toSorted((a, b) => +a.id - +b.id);
	} else if (orders.sort === 'id_descending') {
		tempTasks = tasks.toSorted((a, b) => +b.id - +a.id);
	} else if (orders.sort === 'title_(A-Z)') {
		tempTasks = tasks.toSorted((a, b) => a.title.localeCompare(b.title));
	} else if (orders.sort === 'title_(Z-A)') {
		tempTasks = tasks.toSorted((a, b) => b.title.localeCompare(a.title));
	}

	if (orders.group === 'person') {
		tempTasks = tempTasks.toSorted((a, b) => a.name.localeCompare(b.name));
	} else if (orders.group === 'priority') {
		tempTasks = tempTasks.toSorted(
			(a, b) => priorityMap[a.priority] - priorityMap[b.priority],
		);
	} else if (orders.group === 'tag') {
		tempTasks = tempTasks.toSorted((a, b) => a.tag.localeCompare(b.tag));
	}

	for (const card of tempTasks) {
		createTaskCard(card);
	}

	updateFilters();
}

function changeOrder(key, value) {
	orders[key] = value;

	updateOrders();
}

const priorityMap = {
	high: 0,
	medium: 1,
	low: 2,
};

const orders = {
	sort: '',
	group: '',
};

const sortDropdown = document.querySelector('.main-board__dropdown--sort');
const groupDropdown = document.querySelector('.main-board__dropdown--group');

sortDropdown.addEventListener('change', () => changeOrder('sort', sortDropdown.value));
groupDropdown.addEventListener('change', () => changeOrder('group', groupDropdown.value));

export { updateOrders };
