import { navigate } from './routing.js';

const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');

const form = document.querySelector('.modal-form');
const modalTask = document.querySelector('.modal-task');

const modalSubmitButton = document.querySelector('.submit-btn');
const modalFavoritesButton = document.querySelector('.favorites-btn');
const formErrorEle = document.querySelector('.form-error');

function hideModal() {
	modalContainer.style.display = 'none';
}

function resetModal() {
	modalTask.innerHTML = '';

	form.reset();

	modalSubmitButton.textContent = 'Submit';

	modalContainer.setAttribute('data-view', '');

	formErrorEle.textContent = '';
}

function closeModal(e) {
	if (!e || !e.target.closest('.modal')) {
		hideModal();

		resetModal();

		navigate('/');
	}
}

function showTaskModal(task) {
	modalContainer.style.display = 'flex';
	modalContainer.setAttribute('data-view', 'details');

	modal.querySelector('h2').innerHTML = `
		<span>Task : NUC-${task.id}</span>

		${
			task.isFavorites ?
				`
					<span>
						<svg class="icon--medium">
							<use href="assets/ui-icon-sprite.svg#star"></use>
						</svg>
					</span>
					`
			:	''
		}
	`;

	modalTask.innerHTML = `
        <p><span class='modal-label'>Title : </span><span class='modal-value'>${task.title}</span></p>
        <div><span class='modal-label'>Tags : </span><span class='modal-value board-card__tag--${task.tag.toLowerCase()}'>${task.tag
			.split(' ')
			.map((w) => w[0].toUpperCase() + w.slice(1))
			.join('')}</span></div>
        <p><span class='modal-label'>Description : </span><span class='modal-value'>${task.description}</span></p>
        <p><span class='modal-label'>Person : </span><span class='modal-value'>${task.name}</span></p>
        <p><span class='modal-label'>Reporting to : </span><span class='modal-value'>${task.reporting}</span></p>
        <div><span class='modal-label'>Priority : </span><span class='modal-label'>${task.priority}</span></div>
        <p><span class='modal-label'>Due date : </span><span class='modal-value'>${task.dueDate}</span></p>`;

	modalFavoritesButton.textContent =
		task.isFavorites ? 'Remove from Favorites' : 'Add to Favorites';

	form.elements.id.value = task.id;
	form.elements.name.value = task.name;
	form.elements.title.value = task.title;
	form.elements.tag.value = task.tag;
	form.elements.status.value = task.status;
	form.elements.priority.value = task.priority;
	form.elements.description.value = task.description;
	form.elements.dueDate.value = task.dueDate;
	form.elements.reporting.value = task.reporting;
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
	form.elements.reporting.value = task.reporting;
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

export {
	closeModal,
	hideModal,
	showCreateModal,
	showDeleteModal,
	showEditModal,
	showTaskModal,
};
