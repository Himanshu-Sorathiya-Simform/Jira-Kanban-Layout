import { updateColumnCounts } from '../modules/board.js';

function updateFilters() {
	for (const ele of allCards) {
		ele.style.display = 'flex';

		if (filters.search)
			ele.style.display = !ele.dataset.title.includes(filters.search) && 'none';

		if (filters.tag)
			ele.style.display =
				ele.querySelector('.board-card__tag').textContent.toLowerCase() !==
					filters.tag && 'none';

		if (filters.priority)
			ele.style.display = ele.dataset.priority !== filters.priority && 'none';
	}
}

function changeFilter(key, value) {
	filters[key] = value.trim();

	updateFilters();

	updateColumnCounts();
}

const filters = {
	search: '',
	tag: '',
	priority: '',
};

const allCards = document.getElementsByClassName('board-card');

const searchTaskInput = document.querySelector('.header__search-bar');
const tagDropdown = document.querySelector('.main-board__dropdown--tag');
const priorityDropdown = document.querySelector('.main-board__dropdown--priority');

searchTaskInput.addEventListener('input', () =>
	changeFilter('search', searchTaskInput.value.toLowerCase()),
);
tagDropdown.addEventListener('change', () => changeFilter('tag', tagDropdown.value));
priorityDropdown.addEventListener('change', () =>
	changeFilter('priority', priorityDropdown.value),
);
