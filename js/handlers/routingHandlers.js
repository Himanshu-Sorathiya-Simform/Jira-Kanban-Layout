import { navigate } from '../modules/routing.js';

const createTaskButton = document.querySelector('.header__create-button');
const modalEditButton = document.querySelector('.edit-btn');
const modalDeleteButton = document.querySelector('.delete-btn');

function handleCreate() {
	navigate('/create');
}

function handleEdit() {
	navigate(`/edit/${location.pathname.slice(1)}`);
}

function handleDelete() {
	navigate(`/delete/${location.pathname.slice(1)}`);
}

createTaskButton.addEventListener('click', () => handleCreate());
modalEditButton.addEventListener('click', () => handleEdit());
modalDeleteButton.addEventListener('click', () => handleDelete());
