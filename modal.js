const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal-close-btn');

const createTaskButton = document.querySelector('.header__create-button');

createTaskButton.addEventListener('click', () => {
	modalContainer.style.display = 'flex';

	modal.querySelector('h2').textContent = 'Create New Task';
});

modalCloseButton.addEventListener('click', () => {
	modalContainer.style.display = 'none';
});

modalContainer.addEventListener('click', (e) => {
	if (!e.target.closest('.modal')) modalContainer.style.display = 'none';
});
