import { tasks } from '../data/data.js';
import { createTaskCard, updateColumnCounts } from '../modules/board.js';

function applyFilters(tasks, filters) {
	return tasks.filter(
		({ title, tag, name, priority }) =>
			(!filters.task || title.includes(filters.task)) &&
			(!filters.tag || tag === filters.tag) &&
			(!filters.person || name.includes(filters.person)) &&
			(!filters.priority || priority === filters.priority),
	);
}

const sortHandlers = {
	due_date_ascending: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),

	due_date_descending: (a, b) => new Date(b.dueDate) - new Date(a.dueDate),

	id_ascending: (a, b) => +a.id - +b.id,
	id_descending: (a, b) => +b.id - +a.id,

	'title_(A-Z)': (a, b) => a.title.localeCompare(b.title),
	'title_(Z-A)': (a, b) => b.title.localeCompare(a.title),
};

const groupHandlers = {
	person: (a, b) => a.name.localeCompare(b.name),
	priority: (a, b) => priorityMap[a.priority] - priorityMap[b.priority],
	tag: (a, b) => a.tag.localeCompare(b.tag),
};

function updateFilterAndOrder() {
	let x = performance.now();

	document.querySelectorAll('.board-column__content ul').forEach((column) => {
		column.innerHTML = '';
	});

	let result = applyFilters(tasks, filters);

	if (orders.sort && sortHandlers[orders.sort]) {
		result.sort(sortHandlers[orders.sort]);
	}

	if (orders.group && groupHandlers[orders.group]) {
		result.sort(groupHandlers[orders.group]);
	}

	for (const card of result) {
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
