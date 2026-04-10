import { addTask, deleteTask, updateTask } from './script.js';

const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');

const form = document.querySelector('.modal-form');
const modalTask = document.querySelector('.modal-task');

const modalCloseButton = document.querySelector('.modal-close-btn');
const modalCancelButton = document.querySelector('.cancel-btn');
const modalSubmitButton = document.querySelector('.submit-btn');
const modalEditButton = document.querySelector('.edit-btn');
const modalDeleteButton = document.querySelector('.delete-btn');

const createTaskButton = document.querySelector('.header__create-button');

let currentActiveTask = null;

function resetModal() {
	modalTask.innerHTML = '';

	form.reset();

	modalSubmitButton.textContent = 'Submit';

	modalContainer.setAttribute('data-view', '');
}

function showCreateModal() {
	modalContainer.style.display = 'flex';
	modalContainer.setAttribute('data-view', 'form');

	modalSubmitButton.dataset.action = 'create';
	modal.querySelector('h2').textContent = 'Create New Task';

	modal.querySelector('.submit-btn').textContent = 'Create Task';
}

function showEditModal(task) {
	modalContainer.style.display = 'flex';
	modalContainer.setAttribute('data-view', 'form');

	modalSubmitButton.dataset.action = 'update';
	modal.querySelector('h2').textContent = `Edit Task : NUC-${task.id}`;

	modal.querySelector('.submit-btn').textContent = 'Update Task';

	form.elements.id.value = task.id;
	form.elements.name.value = task.name;
	form.elements.title.value = task.title;
	form.elements.tag.value = task.tag;
	form.elements.status.value = task.status;
	form.elements.priority.value = task.priority;
	form.elements.description.value = task.description;
	form.elements.dueDate.value = task.dueDate;
	form.elements.reporting.value = task.reporter;
}

function showDeleteModal(task) {
	modalContainer.style.display = 'flex';
	modalContainer.setAttribute('data-view', 'delete');

	modalSubmitButton.dataset.action = 'delete';
	modal.querySelector('h2').textContent = `Delete Task : NUC-${task.id}`;

	modal.querySelector('.submit-btn').textContent = 'Delete Task';

	modalTask.innerHTML = `
        <p><span class='modal-value'>Confirm Delete?</span></p>`;

	form.elements.id.value = task.id;
}

function showTaskModal(task) {
	currentActiveTask = task;

	modalContainer.style.display = 'flex';
	modalContainer.setAttribute('data-view', 'details');

	modal.querySelector('h2').textContent = `Task : NUC-${task.id}`;

	modalTask.innerHTML = `
        <p><span class='modal-label'>Title : </span><span class='modal-value'>${task.title}</span></p>
        <div><span class='modal-label'>Tags : </span><span class='modal-value board-card__tag--${task.tag.toLowerCase()}'>${task.tag}</span></div>
        <p><span class='modal-label'>Description : </span><span class='modal-value'>${task.description}</span></p>
        <p><span class='modal-label'>Person : </span><span class='modal-value'>${task.name}</span></p>
        <p><span class='modal-label'>Reporting to : </span><span class='modal-value'>${task.reporter}</span></p>
        <div><span class='modal-label'>Priority : </span><span class='modal-label'>${task.priority}</span></div>
        <p><span class='modal-label'>Due date : </span><span class='modal-value'>${task.dueDate}</span></p>`;
}

function closeModal(e) {
	if (!e || !e.target.closest('.modal')) {
		modalContainer.style.display = 'none';

		resetModal();
	}
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

	const isDelete = e.target.textContent.split(' ')[0].toLowerCase() === 'delete';
	const isUpdate = e.target.textContent.split(' ')[0].toLowerCase() === 'update';
	const isCreate = e.target.textContent.split(' ')[0].toLowerCase() === 'create';

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

createTaskButton.addEventListener('click', () => showCreateModal());

modalCloseButton.addEventListener('click', () => closeModal());
modalCancelButton.addEventListener('click', () => closeModal());

modalContainer.addEventListener('click', (e) => closeModal(e));

modalSubmitButton.addEventListener('click', (e) => handleSubmission(e));

modalEditButton.addEventListener('click', () => {
	if (currentActiveTask) {
		showEditModal(currentActiveTask);
	}
});

modalDeleteButton.addEventListener('click', () => {
	if (currentActiveTask) {
		showDeleteModal(currentActiveTask);
	}
});

export { showTaskModal };
