import { updateColumnCounts } from '../modules/board.js';

function updateFilters() {
	for (const ele of allCards) {
		ele.style.display = 'flex';

		if (filters.task)
			ele.style.display = !ele.dataset.title.includes(filters.task) && 'none';

		if (filters.tag)
			ele.style.display =
				ele.querySelector('.board-card__tag').textContent.toLowerCase() !==
					filters.tag && 'none';

		if (filters.person)
			ele.style.display = !ele.dataset.person.includes(filters.person) && 'none';

		if (filters.priority)
			ele.style.display = ele.dataset.priority !== filters.priority && 'none';
	}

	updateColumnCounts();
}

function resetFilters() {
	for (const key of Object.keys(filters)) filters[key] = '';

	searchTaskInput.value = '';
	tagDropdown.value = '';
	priorityDropdown.value = '';

	updateFilters();
}

function changeFilter(key, value) {
	filters[key] = value.trim();

	updateFilters();
}

const filters = {
	task: '',
	tag: '',
	priority: '',
	person: '',
};

const allCards = document.getElementsByClassName('board-card');

const searchTaskInput = document.querySelector('.header__search-bar');
const tagDropdown = document.querySelector('.main-board__dropdown--tag');
const priorityDropdown = document.querySelector('.main-board__dropdown--priority');
const searchPersonInput = document.querySelector('.board__search-bar');

searchTaskInput.addEventListener('input', () =>
	changeFilter('search', searchTaskInput.value.toLowerCase()),
);
tagDropdown.addEventListener('change', () => changeFilter('tag', tagDropdown.value));
priorityDropdown.addEventListener('change', () =>
	changeFilter('priority', priorityDropdown.value),
);
searchPersonInput.addEventListener('input', () =>
	changeFilter('person', searchPersonInput.value.toLowerCase()),
);

export { resetFilters, updateFilters };
