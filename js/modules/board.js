import { tasks, users } from '../data/data.js';

const mainBoard = document.querySelector('.main-board__grid');

function updateColumnCounts() {
	document.querySelectorAll('.board-column').forEach((column) => {
		const countElement = column.querySelector('.board-column__task-count');
		const tasksInColumn = [
			...column.querySelectorAll('.board-card:not(.board-card__title)'),
		].filter((task) => task.style.display !== 'none');

		if (countElement) {
			countElement.textContent = tasksInColumn.length;
		}
	});
}

function createTaskCard(task) {
	const html = `
    <a href="/${task.id}" class='board-card' data-id="${task.id}" data-title="${task.title.toLowerCase()}" data-priority="${task.priority}" data-person="${task.name.toLowerCase()}">
        <p class='board-card__title'>${task.title}</p>

        <div class='board-card__tags'>
            <span class='board-card__tag board-card__tag--${task.tag.toLowerCase()}'>${task.tag}</span>
        </div>

        <div class='board-card__footer'>
            <div class='board-card__footer-left'>
                <svg class="icon--medium board-card__priority--${task.priority}">
                    <use href='./assets/ui-icon-sprite.svg#bookmark'></use>
                </svg>

                <span class='board-card__id'>NUC-${task.id}</span>
            </div>

            <div class='board-card__footer-right'>
                <img
                    src="${users.get(task.name)}"
                    alt="${task.name}"
                    class='board-card__creator-avatar'
                />
            </div>
        </div>
    </a>`;

	const targetColumn = document.querySelector(`[data-key="${task.status}"]`);
	targetColumn.querySelector('ul').insertAdjacentHTML('beforeend', html);
}

function updateTaskCard(task) {
	const card = mainBoard.querySelector(`[data-id="${task.id}"]`);

	if (!card) return;

	card.querySelector('.board-card__title').textContent = task.title;

	const tag = card.querySelector('.board-card__tag');
	tag.textContent = task.tag;
	tag.className = `board-card__tag board-card__tag--${task.tag.toLowerCase()}`;

	const priorityIcon = card.querySelector('.icon--medium');
	priorityIcon.classList.remove(
		'board-card__priority--low',
		'board-card__priority--medium',
		'board-card__priority--high',
	);
	priorityIcon.classList.add(`board-card__priority--${task.priority}`);

	const avatar = card.querySelector('.board-card__creator-avatar');
	avatar.src = users.get(task.name);
	avatar.alt = task.name;

	card.dataset.title = task.title;
	card.dataset.priority = task.priority;
	card.dataset.person = task.name;

	const currentColumn = card.closest('.board-column').dataset.key;
	if (currentColumn !== task.status) {
		const targetColumn = document.querySelector(`[data-key="${task.status}"]`);

		targetColumn.querySelector('ul').appendChild(card);
	}
}

function deleteTaskCard(id) {
	const card = mainBoard.querySelector(`.board-card[data-id="${id}"]`);

	card.remove();
}

// function createAddNewButtons() {
// 	document.querySelectorAll('.board-column').forEach((ele) => {
// 		const addCardButton = document.createElement('button');
// 		addCardButton.classList.add('board-card', 'board-card__title');
// 		addCardButton.textContent = '+ add new task';

// 		ele.querySelector('.board-column__content').append(addCardButton);
// 	});
// }

function initializeHeader() {
	document.querySelectorAll('.board-column').forEach((ele) => {
		const columnHeader = ele.querySelector('.board-column__name');
		if (columnHeader && ele.dataset.key) {
			columnHeader.textContent = ele.dataset.key.replaceAll('-', ' ').toUpperCase();
		}
	});
}

function initializeTagOptions() {
	const tagDropdown = document.querySelector('.main-board__dropdown--tag');

	const tags = new Set(tasks.map((task) => task.tag));

	tags.forEach((tag) => {
		const option = document.createElement('option');
		option.value = tag.toLowerCase();
		option.textContent = tag;

		tagDropdown.appendChild(option);
	});
}

function initializePriorityOptions() {
	const priorityDropdown = document.querySelector('.main-board__dropdown--priority');

	const priorities = new Set(tasks.map((task) => task.priority));

	priorities.forEach((priority) => {
		const option = document.createElement('option');
		option.value = priority;
		option.textContent = priority[0].toUpperCase() + priority.slice(1).toLowerCase();

		priorityDropdown.appendChild(option);
	});
}

function initializeSortOptions() {
	const sortDropdown = document.querySelector('.main-board__dropdown--sort');

	const sorts = new Set(['due_date_ascending', 'due_date_descending']);

	sorts.forEach((sort) => {
		const option = document.createElement('option');
		option.value = sort;
		option.textContent = sort
			.split('_')
			.map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
			.join(' ');

		sortDropdown.appendChild(option);
	});
}

export {
	// createAddNewButtons,
	createTaskCard,
	deleteTaskCard,
	initializeHeader,
	initializePriorityOptions,
	initializeSortOptions,
	initializeTagOptions,
	updateColumnCounts,
	updateTaskCard,
};
