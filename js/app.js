
(function (window) {

	'use strict';
	let todoList = new TodoList();
	let filterEvents = new FilterEvenets();
	todoList.init();
	filterEvents.setEvenets();
	todoList.setEvenets();

})(window);
