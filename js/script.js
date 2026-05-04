import { tasks } from './data/data.js';
import { updateFilterAndOrder } from './handlers/filterAndOrderHandlers.js';
import {
	initializeAvatars,
	initializeGroupOptions,
	initializeHeader,
	initializePriorityOptions,
	initializeSortOptions,
	initializeStatusOptions,
	initializeTagOptions,
} from './modules/board.js';

const JIRA_TASK_ID_KEY = 'jira_task_id';
const JIRA_TASKS_KEY = 'jira_tasks';

const jiraId =
	localStorage.getItem(JIRA_TASK_ID_KEY) ?
		localStorage.getItem(JIRA_TASK_ID_KEY)
	:	'85';
const jiraTasks =
	localStorage.getItem(JIRA_TASKS_KEY) ?
		localStorage.getItem(JIRA_TASKS_KEY)
	:	JSON.stringify(tasks);

localStorage.setItem(JIRA_TASK_ID_KEY, jiraId);
localStorage.setItem(JIRA_TASKS_KEY, jiraTasks);

initializeAvatars();
initializeHeader();

initializeSortOptions();
initializeGroupOptions();
initializeTagOptions();
initializePriorityOptions();
initializeStatusOptions();

updateFilterAndOrder();
