import { updateColumnCounts } from '../modules/board.js';

function handlerTaskSearchFilter() {
	const search = searchTaskInput.value.toLowerCase();

	for (const ele of allCards) {
		ele.style.display = ele.dataset.title.includes(search) ? 'flex' : 'none';
	}

	updateColumnCounts();
}

function handleTagFilter() {
	for (const ele of allCards) {
		ele.style.display =
			(
				!tagDropdown.value ||
				ele.querySelector('.board-card__tag').textContent.toLowerCase() ===
					tagDropdown.value
			) ?
				'flex'
			:	'none';
	}

	updateColumnCounts();
}

function handlePriorityFilter() {
	for (const ele of allCards) {
		ele.style.display =
			!priorityDropdown.value || ele.dataset.priority === priorityDropdown.value ?
				'flex'
			:	'none';
	}

	updateColumnCounts();
}

const allCards = document.getElementsByClassName('board-card');

const searchTaskInput = document.querySelector('.header__search-bar');
const tagDropdown = document.querySelector('.main-board__dropdown--tag');
const priorityDropdown = document.querySelector('.main-board__dropdown--priority');

searchTaskInput.addEventListener('input', () => handlerTaskSearchFilter());
tagDropdown.addEventListener('change', () => handleTagFilter());
priorityDropdown.addEventListener('change', () => handlePriorityFilter());
