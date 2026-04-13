import { updateColumnCounts } from './board.js';
import { closeModal } from './modal.js';
import { navigate } from './routing.js';
import { addTask, deleteTask, updateTask } from './script.js';

const allCards = document.querySelectorAll('.board-card');

const searchTaskInput = document.querySelector('.header__search-bar');
const tagDropdown = document.querySelector('.main-board__dropdown--tag');
const priorityDropdown = document.querySelector('.main-board__dropdown--priority');

const form = document.querySelector('.modal-form');

const createTaskButton = document.querySelector('.header__create-button');
const modalEditButton = document.querySelector('.edit-btn');
const modalDeleteButton = document.querySelector('.delete-btn');

const modalContainer = document.querySelector('.modal-container');
const modalCloseButton = document.querySelector('.modal-close-btn');
const modalCancelButton = document.querySelector('.cancel-btn');

const modalSubmitButton = document.querySelector('.submit-btn');

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

function handleCreate() {
	navigate('/create');
}

function handleEdit() {
	navigate(`/edit/${location.pathname.slice(1)}`);
}

function handleDelete() {
	navigate(`/delete/${location.pathname.slice(1)}`);
}

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

		if (action === 'update') updateTask(task);

		if (action === 'create') addTask(task);

		closeModal();
	}
}

createTaskButton.addEventListener('click', () => handleCreate());
modalEditButton.addEventListener('click', () => handleEdit());
modalDeleteButton.addEventListener('click', () => handleDelete());

modalCloseButton.addEventListener('click', () => closeModal());
modalCancelButton.addEventListener('click', () => closeModal());
modalContainer.addEventListener('click', (e) => closeModal(e));

modalSubmitButton.addEventListener('click', (e) => handleSubmission(e));

searchTaskInput.addEventListener('input', () => handlerTaskSearchFilter());
tagDropdown.addEventListener('change', () => handleTagFilter());
priorityDropdown.addEventListener('change', () => handlePriorityFilter());
