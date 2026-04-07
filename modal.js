import { addTask, deleteTask, updateTask } from './script.js';

const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');

const form = document.querySelector('.modal-form');
const modalActions = document.querySelector('.modal-actions');
const modalForm = document.querySelector('.modal-form');
const modalTask = document.querySelector('.modal-task');

const modalCloseButton = document.querySelector('.modal-close-btn');
const modalCancelButton = document.querySelector('.cancel-btn');
const modalSubmitButton = document.querySelector('.submit-btn');
const modalEditButton = document.querySelector('.edit-btn');
const modalDeleteButton = document.querySelector('.delete-btn');

const createTaskButton = document.querySelector('.header__create-button');

function showCreateModal() {
	modalContainer.style.display = 'flex';
	modalForm.style.display = 'flex';
	modalActions.style.display = 'none';
	modalTask.style.display = 'none';

	modal.querySelector('h2').textContent = 'Create New Task';

	modal.querySelector('.submit-btn').textContent = 'Create Task';
}

function showEditModal(task) {
	modalContainer.style.display = 'flex';
	modalForm.style.display = 'flex';
	modalActions.style.display = 'none';
	modalTask.style.display = 'none';

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
	modalForm.style.display = 'flex';
	modalActions.style.display = 'none';
	modalTask.style.display = 'none';

	modal.querySelector('h2').textContent = `Delete Task : NUC-${task.id}`;

	modal.querySelector('.submit-btn').textContent = 'Delete Task';

	form.elements.id.value = task.id;

	[...form.querySelectorAll('.form-group')].forEach((ele) => {
		ele.style.display = 'none';
	});
}

function showTaskModal(task) {
	modalContainer.style.display = 'flex';
	modalForm.style.display = 'none';
	modalActions.style.display = 'flex';
	modalTask.style.display = 'flex';

	modal.querySelector('h2').textContent = `Task : NUC-${task.id}`;

	const html = `
        <p>
			<span class='modal-label'>Title : </span>
			<span class='modal-value'>${task.title}</span>
		</p>

        <div>
			<span class='modal-label'>Tags : </span>
            <span class='modal-value board-card__tag--${task.tag.toLowerCase()}'>${task.tag}</span>
        </div>

		<p>
			<span class='modal-label'>Description : </span>
			<span class='modal-value'>${task.description}</span>
		</p>

		<p>
			<span class='modal-label'>Person : </span>
			<span class='modal-value'>${task.name}</span>
		</p>

		<p>
			<span class='modal-label'>Reporting to : </span>
			<span class='modal-value'>${task.reporter}</span>
		</p>

		<div>
			<span class='modal-label'>Priority : </span>
			<span class='modal-label'>${task.priority}</span>
		</div>

        <p>
			<span class='modal-label'>Due date : </span>
			<span class='modal-value'>${task.dueDate}</span>
		</p>`;

	modalTask.insertAdjacentHTML('beforeend', html);

	modalEditButton.addEventListener('click', () => {
		showEditModal(task);
	});

	modalDeleteButton.addEventListener('click', () => {
		showDeleteModal(task);
	});
}

function closeModal(e) {
	if (!e || !e.target.closest('.modal')) modalContainer.style.display = 'none';

	[...modalTask.children].forEach((ele) => {
		ele.remove();
	});
}

function handleSubmission(e) {
	e.preventDefault();

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

		if (isDelete) deleteTask(id);

		if (isUpdate) updateTask(task);

		if (isCreate) addTask(task);

		closeModal();
	}
}

createTaskButton.addEventListener('click', () => showCreateModal());

modalCloseButton.addEventListener('click', () => closeModal());
modalCancelButton.addEventListener('click', () => closeModal());

modalContainer.addEventListener('click', (e) => closeModal(e));

modalSubmitButton.addEventListener('click', (e) => handleSubmission(e));

export { showTaskModal };
