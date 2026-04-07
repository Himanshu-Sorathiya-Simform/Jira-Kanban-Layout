import { tasks, users } from './data.js';
import { showTaskModal } from './modal.js';

const mainBoard = document.querySelector('.main-board__grid');

const toDoColumn = document.querySelector('[data-key="to-do"]');
const inProgressColumn = document.querySelector('[data-key="in-progress"]');
const inReviewColumn = document.querySelector('[data-key="in-review"]');
const doneColumn = document.querySelector('[data-key="done"]');

function addTask(task) {
	tasks.push(task);

	createTaskCard(tasks.at(-1));
}

function updateTask(task) {
	const index = tasks.findIndex((t) => t.id === task.id);

	tasks[index] = task;

	updateTaskCard(tasks.at(index));
}

function deleteTask(id) {
	const index = tasks.findIndex((t) => t?.id === id);

	tasks[index] = null;

	deleteTaskCard(id);
}

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
			toDoColumn.querySelector('ul').insertAdjacentHTML('beforeend', html);
			break;

		case 'inProgress':
			inProgressColumn.querySelector('ul').insertAdjacentHTML('beforeend', html);
			break;

		case 'inReview':
			inReviewColumn.querySelector('ul').insertAdjacentHTML('beforeend', html);
			break;

		case 'done':
			doneColumn.querySelector('ul').insertAdjacentHTML('beforeend', html);
			break;

		default:
			throw new Error('Unknown Status ', task.status);
	}
}

function updateTaskCard(task) {
	const card = [...mainBoard.querySelectorAll('.board-card')].find(
		(card) =>
			card.querySelector('.board-card__id')?.textContent.split('-').at(-1) ===
			task.id,
	);

	card.remove();

	createTaskCard(task);
}

function deleteTaskCard(id) {
	const card = [...mainBoard.querySelectorAll('.board-card')].find(
		(card) =>
			card.querySelector('.board-card__id')?.textContent.split('-').at(-1) === id,
	);

	card.remove();
}

for (const task of tasks) {
	task && createTaskCard(task);
}

[toDoColumn, inProgressColumn, inReviewColumn, doneColumn].forEach((ele) => {
	const addCardButton = document.createElement('button');
	addCardButton.classList.add('board-card');
	addCardButton.textContent = 'Add new task';

	ele.querySelector('.board-column__content').append(addCardButton);

	ele.querySelector('.board-column__name').textContent = ele.dataset.key
		.replaceAll('-', ' ')
		.toUpperCase();

	ele.querySelector('.board-column__task-count').textContent =
		ele.lastElementChild.children.length;
});

mainBoard.addEventListener('click', (e) => {
	const target = e.target.closest('.board-card');

	if (!target) return;

	const id = target.querySelector('.board-card__id')?.textContent.split('-').at(-1);

	if (!id) return;

	const task = tasks.find((task) => task?.id === id);

	showTaskModal(task);
});

export { addTask, deleteTask, updateTask };
