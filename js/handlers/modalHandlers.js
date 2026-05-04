import { closeModal } from '../modules/modal.js';
import { addTask, deleteTask, updateTask } from '../utils/taskUtils.js';
import { resetFilters, updateFilterAndOrder } from './filterAndOrderHandlers.js';

function toggleFavorites() {
	const tasks = JSON.parse(localStorage.getItem('jira_tasks')) || [];
	const id = form.elements.id.value;

	const task = tasks.find((t) => t.id === id);

	updateTask({ ...task, isFavorites: !task.isFavorites });

	closeModal();
	updateFilterAndOrder();
}

function validateForm(fields) {
	return true;
}

function handleSubmission(e) {
	e.preventDefault();

	const action = modalSubmitButton.dataset.action;

	const id = form.elements.id.value || localStorage.getItem('jira_task_id');
	const name = form.elements.name.value;
	const title = form.elements.title.value;
	const tag = form.elements.tag.value;
	const status = form.elements.status.value;
	const priority = form.elements.priority.value;
	const description = form.elements.description.value;
	const dueDate = form.elements.dueDate.value;
	const reporting = form.elements.reporting.value;

	if (action === 'delete') {
		deleteTask(id);

		closeModal();
		updateFilterAndOrder();

		return;
	}

	const fields = {
		id,
		name,
		title,
		tag,
		status,
		priority,
		description,
		dueDate,
		reporting,
	};

	if (validateForm(fields)) {
		if (action === 'update') {
			updateTask(fields);

			updateFilterAndOrder();
		}

		if (action === 'create') {
			addTask(fields);

			resetFilters();
		}

		closeModal();
	}
}

const form = document.querySelector('.modal-form');

const modalContainer = document.querySelector('.modal-container');
const modalCloseButton = document.querySelector('.modal-close-btn');
const modalCancelButton = document.querySelector('.cancel-btn');

const modalSubmitButton = document.querySelector('.submit-btn');

const modalFavoritesButton = document.querySelector('.favorites-btn');

modalContainer.addEventListener('click', (e) => closeModal(e));
modalCloseButton.addEventListener('click', () => closeModal());
modalCancelButton.addEventListener('click', () => closeModal());

modalSubmitButton.addEventListener('click', (e) => handleSubmission(e));

modalFavoritesButton.addEventListener('click', () => toggleFavorites());
