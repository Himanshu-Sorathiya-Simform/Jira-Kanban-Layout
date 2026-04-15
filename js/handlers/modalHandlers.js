import { closeModal } from '../modules/modal.js';
import { addTask, deleteTask, updateTask } from '../script.js';
import { resetFilters } from './filterHandlers.js';
import { updateOrders } from './orderHandlers.js';

function handleSubmission(e) {
	e.preventDefault();

	const action = modalSubmitButton.dataset.action;

	const id = form.elements.id.value || '15';
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
		updateOrders();

		return;
	}

	if (
		id &&
		name &&
		title &&
		tag &&
		status &&
		priority &&
		description &&
		dueDate &&
		reporting
	) {
		const task = {
			id,
			name,
			title,
			tag,
			status,
			priority,
			description,
			dueDate,
			reporter: reporting,
		};

		if (action === 'update') {
			updateTask(task);
			updateOrders();
		}

		if (action === 'create') {
			addTask(task);
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

modalContainer.addEventListener('click', (e) => closeModal(e));
modalCloseButton.addEventListener('click', () => closeModal());
modalCancelButton.addEventListener('click', () => closeModal());

modalSubmitButton.addEventListener('click', (e) => handleSubmission(e));
