(function (window) {
	'use strict';
	let todoList = new TodoList();
	let filterEvents = new FilterEvenets();
	let auth = new Authorization();

	auth.setEvents();
	todoList.init();
	filterEvents.setEvenets();
	todoList.setEvenets();
})(window);
