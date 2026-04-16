import { tasks } from '../data/data.js';
import { createTaskCard, updateColumnCounts } from '../modules/board.js';

function updateFilterAndOrder() {
	let tempTasks = tasks;

	document.querySelectorAll('.board-column__content ul').forEach((column) => {
		column.innerHTML = '';
	});

	if (filters.task) {
		tempTasks = tempTasks.filter((task) => task.title.includes(filters.task));
	}
	if (filters.tag) {
		tempTasks = tempTasks.filter((task) => task.tag === filters.tag);
	}
	if (filters.person) {
		tempTasks = tempTasks.filter((task) => task.name.includes(filters.person));
	}
	if (filters.priority) {
		tempTasks = tempTasks.filter((task) => task.priority === filters.priority);
	}

	if (orders.sort === 'due_date_ascending') {
		tempTasks = tempTasks.toSorted((a, b) => {
			return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
		});
	} else if (orders.sort === 'due_date_descending') {
		tempTasks = tempTasks.toSorted((a, b) => {
			return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
		});
	} else if (orders.sort === 'id_ascending') {
		tempTasks = tempTasks.toSorted((a, b) => +a.id - +b.id);
	} else if (orders.sort === 'id_descending') {
		tempTasks = tempTasks.toSorted((a, b) => +b.id - +a.id);
	} else if (orders.sort === 'title_(A-Z)') {
		tempTasks = tempTasks.toSorted((a, b) => a.title.localeCompare(b.title));
	} else if (orders.sort === 'title_(Z-A)') {
		tempTasks = tempTasks.toSorted((a, b) => b.title.localeCompare(a.title));
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

	updateColumnCounts();
}

function resetFilters() {
	for (const key of Object.keys(filters)) filters[key] = '';

	searchTaskInput.value = '';
	tagDropdown.value = '';
	priorityDropdown.value = '';
	searchBoardPersonInput.value = searchHeaderPersonInput.value = '';

	updateFilterAndOrder();
}

function changeFilter(key, value) {
	filters[key] = value.trim();

	if (key === 'person')
		searchHeaderPersonInput.value = searchBoardPersonInput.value = value;

	updateFilterAndOrder();
}

function changeOrder(key, value) {
	orders[key] = value;

	updateFilterAndOrder();
}

const priorityMap = {
	high: 0,
	medium: 1,
	low: 2,
};

const filters = {
	task: '',
	tag: '',
	priority: '',
	person: '',
};

const orders = {
	sort: '',
	group: '',
};

const searchTaskInput = document.querySelector('.header__search-bar');
const tagDropdown = document.querySelector('.main-board__dropdown--tag');
const priorityDropdown = document.querySelector('.main-board__dropdown--priority');
const searchHeaderPersonInput = document.querySelector(
	'.header__right .board__search-bar',
);
const searchBoardPersonInput = document.querySelector(
	'.main-board__controls-left .board__search-bar',
);

const sortDropdown = document.querySelector('.main-board__dropdown--sort');
const groupDropdown = document.querySelector('.main-board__dropdown--group');

searchTaskInput.addEventListener('input', () =>
	changeFilter('task', searchTaskInput.value.toLowerCase()),
);
tagDropdown.addEventListener('change', () => changeFilter('tag', tagDropdown.value));
priorityDropdown.addEventListener('change', () =>
	changeFilter('priority', priorityDropdown.value),
);
searchHeaderPersonInput.addEventListener('input', () =>
	changeFilter('person', searchHeaderPersonInput.value.toLowerCase()),
);
searchBoardPersonInput.addEventListener('input', () =>
	changeFilter('person', searchBoardPersonInput.value.toLowerCase()),
);

sortDropdown.addEventListener('change', () => changeOrder('sort', sortDropdown.value));
groupDropdown.addEventListener('change', () => changeOrder('group', groupDropdown.value));

export { resetFilters, updateFilterAndOrder };
