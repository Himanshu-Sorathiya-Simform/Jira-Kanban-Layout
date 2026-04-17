import { updateFilterAndOrder } from './handlers/filterAndOrderHandlers.js';
import {
	initializeAvatars,
	initializeGroupOptions,
	initializeHeader,
	initializePriorityOptions,
	initializeSortOptions,
	initializeTagOptions,
} from './modules/board.js';
import { navigate } from './modules/routing.js';

localStorage.setItem(
	'jira_task_id',
	localStorage.getItem('jira_task_id') ? localStorage.getItem('jira_task_id') : 1,
);

const mainBoard = document.querySelector('.main-board__grid');

initializeHeader();
initializeAvatars();

initializeSortOptions();
initializeGroupOptions();
initializeTagOptions();
initializePriorityOptions();

updateFilterAndOrder();

mainBoard.addEventListener('click', (e) => {
	const target = e.target.closest('.board-card');

	const id = target?.dataset.id;

	if (!id) return;

	e.preventDefault();

	navigate(target.href);
});
