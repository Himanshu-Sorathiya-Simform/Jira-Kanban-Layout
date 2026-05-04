import { navigate } from '../modules/routing.js';

const mainBoard = document.querySelector('.main-board__grid');
const createTaskButton = document.querySelector('.header__create-button');
const modalEditButton = document.querySelector('.edit-btn');
const modalDeleteButton = document.querySelector('.delete-btn');

function handleShow(e) {
	const target = e.target.closest('.board-card');

	const id = target?.dataset.id;

	if (!id) return;

	e.preventDefault();

	navigate(target.querySelector('.board-card__title').href);
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

mainBoard.addEventListener('click', (e) => handleShow(e));
createTaskButton.addEventListener('click', () => handleCreate());
modalEditButton.addEventListener('click', () => handleEdit());
modalDeleteButton.addEventListener('click', () => handleDelete());
