function applyFilters(tasks, filters) {
	return tasks.filter(
		({ title, tag, name, priority, isFavorites }) =>
			(!filters.task || title.includes(filters.task)) &&
			(!filters.tag || tag === filters.tag) &&
			(!filters.person || name.includes(filters.person)) &&
			(!filters.priority || priority === filters.priority) &&
			(!filters.favorites || isFavorites === filters.favorites),
	);
}

const priorityMap = {
	high: 0,
	medium: 1,
	low: 2,
};

const sortHandlers = {
	due_date_ascending: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),

	due_date_descending: (a, b) => new Date(b.dueDate) - new Date(a.dueDate),

	id_ascending: (a, b) => +a.id - +b.id,
	id_descending: (a, b) => +b.id - +a.id,

	'title_(A-Z)': (a, b) => a.title.localeCompare(b.title),
	'title_(Z-A)': (a, b) => b.title.localeCompare(a.title),
};

const groupHandlers = {
	person: (a, b) => a.name.localeCompare(b.name),
	priority: (a, b) => priorityMap[a.priority] - priorityMap[b.priority],
	tag: (a, b) => a.tag.localeCompare(b.tag),
};

export { applyFilters, groupHandlers, sortHandlers };
