import { users } from '../data/data.js';

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
    <a href="/${task.id}" class="board-card" data-id="${task.id}">
        <p class="board-card__title">${task.title}</p>

        <div class="board-card__tags">
            <span class="board-card__tag board-card__tag--${task.tag.toLowerCase()}">${task.tag}</span>
        </div>

        <div class="board-card__footer">
            <div class="board-card__footer-left">
                <svg class="icon--medium board-card__priority--${task.priority}">
                    <use href="/assets/ui-icon-sprite.svg#bookmark"></use>
                </svg>

                <span class="board-card__id">NUC-${task.id}</span>
            </div>

            <div class="board-card__footer-right">
                <img
                    src="${users.get(task.name)}"
                    alt="${task.name}"
                    class="board-card__creator-avatar"
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
	const formTagDropdown = document.querySelector('#task-tag');

	const tags = new Set([
		'feedback',
		'forms',
		'accounts',
		'billing',
		'authentication',
		'notifications',
		'reports',
	]);

	tags.forEach((tag) => {
		const option = document.createElement('option');
		option.value = tag;
		option.textContent = tag
			.split(' ')
			.map((w) => w[0].toUpperCase() + w.slice(1))
			.join('');

		tagDropdown.appendChild(option);
		formTagDropdown.appendChild(option.cloneNode(true));
	});
}

function initializePriorityOptions() {
	const priorityDropdown = document.querySelector('.main-board__dropdown--priority');
	const formPriorityDropDown = document.querySelector('#task-priority');

	const priorities = new Set(['high', 'medium', 'low']);

	priorities.forEach((priority) => {
		const option = document.createElement('option');
		option.value = priority;
		option.textContent = priority[0].toUpperCase() + priority.slice(1).toLowerCase();

		priorityDropdown.appendChild(option);
		formPriorityDropDown.appendChild(option.cloneNode(true));
	});
}

function initializeStatusOptions() {
	const formStatusDropDown = document.querySelector('#task-status');

	const statuses = new Set(['to-do', 'in-progress', 'in-review', 'done']);

	statuses.forEach((status) => {
		const option = document.createElement('option');
		option.value = status;
		option.textContent = status[0].toUpperCase() + status.slice(1).toLowerCase();

		formStatusDropDown.appendChild(option);
	});
}

function initializeSortOptions() {
	const sortDropdown = document.querySelector('.main-board__dropdown--sort');

	const sorts = new Set([
		'due_date_ascending',
		'id_ascending',
		'title_(A-Z)',
		'due_date_descending',
		'id_descending',
		'title_(Z-A)',
	]);

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

function initializeGroupOptions() {
	const groupDropdown = document.querySelector('.main-board__dropdown--group');

	const groups = new Set(['person', 'priority', 'tag']);

	groups.forEach((group) => {
		const option = document.createElement('option');
		option.value = group;
		option.textContent = group
			.split('_')
			.map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
			.join(' ');

		groupDropdown.appendChild(option);
	});
}

function initializeAvatars() {
	const avatarsBoard = document.querySelector('.main-board__avatars');

	if (users.size - 4 > 0) {
		const spanElement = document.createElement('span');
		spanElement.classList.add('main-board__avatar', 'main-board__avatar-placeholder');
		spanElement.textContent = `+ ${users.size - 4}`;

		avatarsBoard.appendChild(spanElement);
	}

	[...users].slice(0, 4).forEach((user) => {
		const userElement = document.createElement('img');
		userElement.src = user[1];
		userElement.alt = user[0];
		userElement.classList.add('main-board__avatar');

		avatarsBoard.appendChild(userElement);
	});
}

export {
	createTaskCard,
	deleteTaskCard,
	initializeAvatars,
	initializeGroupOptions,
	initializeHeader,
	initializePriorityOptions,
	initializeSortOptions,
	initializeStatusOptions,
	initializeTagOptions,
	updateColumnCounts,
	updateTaskCard,
};
