import { createTaskCard, updateColumnCounts } from '../modules/board.js';
import {
	applyFilters,
	groupHandlers,
	sortHandlers,
} from '../utils/filterAndOrderUtils.js';

function updateFilterAndOrder() {
	const tasks = JSON.parse(localStorage.getItem('jira_tasks')) || [];

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
	if (key === 'favorites') {
		filters[key] = !filters[key];

		document.querySelector('.main-board__icon-btn--star').style.color =
			filters[key] ? '#0c66e4' : '#455570';
	} else filters[key] = value.trim();

	if (key === 'person')
		searchHeaderPersonInput.value = searchBoardPersonInput.value = value;

	updateFilterAndOrder();
}

function changeOrder(key, value) {
	orders[key] = value;

	updateFilterAndOrder();
}

const filters = {
	task: '',
	tag: '',
	priority: '',
	person: '',
	favorites: false,
};

const orders = {
	sort: '',
	group: '',
};

const favoritesButton = document.querySelector('.main-board__icon-btn--star');
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
favoritesButton.addEventListener('click', () => changeFilter('favorites'));

sortDropdown.addEventListener('change', () => changeOrder('sort', sortDropdown.value));
groupDropdown.addEventListener('change', () => changeOrder('group', groupDropdown.value));

export { resetFilters, updateFilterAndOrder };
