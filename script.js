import { tasks, users } from './data.js';

const mainBoard = document.querySelector('.main-board__grid');

const toDoColumn = document.querySelector('[data-key="to-do"]');
const inProgressColumn = document.querySelector('[data-key="in-progress"]');
const inReviewColumn = document.querySelector('[data-key="in-review"]');
const doneColumn = document.querySelector('[data-key="done"]');

function createTaskCard(task) {
	const iconClassName =
		task.priority === 'low' ? 'board-card__priority--low'
		: task.priority === 'medium' ? 'board-card__priority--medium'
		: 'board-card__priority--high';

	const html = `
    <article class='board-card'>
        <p class='board-card__title'>${task.title}</p>

        <div class='board-card__tags'>
            <span class='board-card__tag board-card__tag--${task.tag.toLowerCase()}'>${task.tag}</span>
        </div>

        <div class='board-card__footer'>
            <div class='board-card__footer-left'>
                <svg class="icon--medium ${iconClassName}">
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
    </article>`;

	switch (task.status) {
		case 'todo':
			toDoColumn.lastElementChild.insertAdjacentHTML('beforeend', html);
			break;

		case 'inProgress':
			inProgressColumn.lastElementChild.insertAdjacentHTML('beforeend', html);
			break;

		case 'inReview':
			inReviewColumn.lastElementChild.insertAdjacentHTML('beforeend', html);
			break;

		case 'done':
			doneColumn.lastElementChild.insertAdjacentHTML('beforeend', html);
			break;

		default:
			throw new Error('Unknown Status ', task.status);
	}
}

for (const task of tasks) {
	createTaskCard(task);
}

[toDoColumn, inProgressColumn, inReviewColumn, doneColumn].forEach((ele) => {
	ele.querySelector('.board-column__name').textContent = ele.dataset.key
		.replaceAll('-', ' ')
		.toUpperCase();

	ele.querySelector('.board-column__task-count').textContent =
		ele.lastElementChild.children.length;
});
