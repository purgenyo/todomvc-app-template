

(function (window) {
	'use strict';
	let queries = new Queries();
	let todoList = new TodoList();


	queries.runQuery('GET', null, {})
		.done((res)=>todoList.renderElement(res))
		.fail((xhr, text)=>{ console.log(xhr, text) });

	$(document).on('click', '.clear-completed', (e)=>{
		console.log(e);
	});


	$(document).on('dblclick', '.todo-list li .view label', (e)=>{
		var element_root = $(e.target).parents('li');
		var edit = element_root.children('.edit');
		var view = element_root.children('.view');
		edit.show();
		edit.focus();
		view.hide();

	});

	$(document).on('blur', '.edit', (e)=>{
		var element_root = $(e.target).parents('li');
		var edit = element_root.children('.edit');
		var view = element_root.children('.view');
		edit.hide();
		view.show();
	});

	$(document).on('click', '.todo-list li .view input', (e)=>{
		console.log('input');
	});

	$(document).on('click', '.todo-list li .view .destroy', (e)=>{
		console.log('destroy');
	});

	$(document).on('keyup', '.new-todo', (el)=>{

		if(el.keyCode===13){
			return 1;
			queries.runQuery('POST', null, {
				'text': el.target.value
			})
				.done((res)=>todoList.renderElement(res))
				.fail((xhr, text)=>{ console.log(xhr, text) });
		}
	});

})(window);
