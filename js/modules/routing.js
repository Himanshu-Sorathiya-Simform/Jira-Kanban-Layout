import {
	hideModal,
	showCreateModal,
	showDeleteModal,
	showEditModal,
	showTaskModal,
} from './modal.js';

function navigate(path) {
	window.history.pushState({}, '', path);

	routeHandler();
}

window.onpopstate = function () {
	navigate(location.pathname);
};

function routeHandler() {
	const tasks = JSON.parse(localStorage.getItem('jira_tasks')) || [];

	const lastIndex = location.pathname.lastIndexOf('/');
	const id = location.pathname.slice(lastIndex + 1);

	const task = tasks.find((task) => +task.id === +id);

	if (location.pathname !== '/' && Number.isInteger(+location.pathname.slice(1))) {
		showTaskModal(task);
	} else if (location.pathname === '/create') {
		showCreateModal();
	} else if (location.pathname.startsWith('/edit')) {
		showEditModal(task);
	} else if (location.pathname.startsWith('/delete')) {
		showDeleteModal(task);
	} else {
		hideModal();
	}
}

export { navigate };
