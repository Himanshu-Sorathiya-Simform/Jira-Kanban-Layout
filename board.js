import { users } from './data.js';

const mainBoard = document.querySelector('.main-board__grid');

function updateColumnCounts() {
	document.querySelectorAll('.board-column').forEach((column) => {
		const countElement = column.querySelector('.board-column__task-count');
		const tasksInColumn = column.querySelectorAll(
			'.board-card:not(.board-card__title)',
		);

		if (countElement) {
			countElement.textContent = tasksInColumn.length;
		}
	});
}

function createTaskCard(task) {
	const html = `
    <a href="/${task.id}" class='board-card' data-id="${task.id}">
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

function createAddNewButtons() {
	document.querySelectorAll('.board-column').forEach((ele) => {
		const addCardButton = document.createElement('button');
		addCardButton.classList.add('board-card', 'board-card__title');
		addCardButton.textContent = '+ add new task';

		ele.querySelector('.board-column__content').append(addCardButton);

		const columnHeader = ele.querySelector('.board-column__name');
		if (columnHeader && ele.dataset.key) {
			columnHeader.textContent = ele.dataset.key.replaceAll('-', ' ').toUpperCase();
		}
	});
}

export {
	createAddNewButtons,
	createTaskCard,
	deleteTaskCard,
	updateColumnCounts,
	updateTaskCard,
};
