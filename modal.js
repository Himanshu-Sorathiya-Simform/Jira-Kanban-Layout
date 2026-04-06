import { addTask } from './script.js';

const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');

const modalCloseButton = document.querySelector('.modal-close-btn');
const modalCancelButton = document.querySelector('.cancel-btn');

const modalSubmitButton = document.querySelector('.submit-btn');

const createTaskButton = document.querySelector('.header__create-button');

function showCreateModal() {
	modalContainer.style.display = 'flex';

	modal.querySelector('h2').textContent = 'Create New Task';
}

function closeModal(e) {
	if (!e || !e.target.closest('.modal')) modalContainer.style.display = 'none';
}

createTaskButton.addEventListener('click', () => showCreateModal());

modalCloseButton.addEventListener('click', () => closeModal());

modalContainer.addEventListener('click', (e) => closeModal(e));

modalSubmitButton.addEventListener('click', (e) => {
	e.preventDefault();

	const name = form.elements.name.value;
	const title = form.elements.title.value;
	const tag = form.elements.tag.value;
	const status = form.elements.status.value;
	const priority = form.elements.priority.value;

	if (name && title && tag && status && priority) {
		addTask({ name, title, tag, status, priority });
	}

	// const task =
});
