//TODO: Навести порядок

(function (window) {
	'use strict';
	let queries = new Queries();
	let todoList = new TodoList();

	var api_url = config.todo_api_server + '/todo';
	queries.runQuery('GET', api_url, null, {})
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
		let root_element = $(e.target).parents('li');
		let todo_id = root_element.data('todoid');
		var api_url = config.todo_api_server + '/todo/' + todo_id;
		$(e.target).attr('disabled', true);
		queries.runQuery('DELETE', api_url, null, {})
			.done((res)=>{
				$(e.target).attr('disabled', false);
				if(res.data===true){
					root_element.remove();
				}
			})
			.fail((xhr, text)=>{ console.log(xhr, text) });
	});

	$(document).on('keyup', '.new-todo', (el)=>{
		if(el.keyCode===13){
			var api_url = config.todo_api_server + '/todo/';
			queries.runQuery('POST', api_url, {
				'text': el.target.value
			}, {})
			.done((res)=>{
				el.target.value = '';
				todoList.renderElement( {data: [res.data]} )
			})
			.fail((xhr, text)=>{ console.log(xhr, text) });
		}
	});

})(window);
