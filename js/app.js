//TODO: Навести порядок

(function (window) {

	'use strict';
	let queries = new Queries();
	let todoList = new TodoList();
	let filterEvents = new FilterEvenets();

	filterEvents.setEvenets();

	let api_url = config.todo_api_server + '/todo';
	queries.runQuery('GET', api_url, null, {})
		.done((res)=>todoList.renderElement(res))
		.fail((xhr, text)=>{ console.log(xhr, text) });

	$(document).on('click', '.clear-completed', (e)=>{
		console.log(e);
	});


	$(document).on('dblclick', '.todo-list li .view label', (e)=>{
		let element_root = $(e.target).parents('li');
		let edit = element_root.children('.edit');
		let view = element_root.children('.view');
		edit.show();
		edit.focus();
		view.hide();
	});

	$(document).on('keyup', '.edit', (e)=>{
		if(e.keyCode===13){
			todoProcessEdit(e);
		}
	});

	$(document).on('blur', '.edit', (e)=>{
		todoProcessEdit(e);
	});

	function todoProcessEdit(e) {
		let element_root = $(e.target).parents('li');
		let todo_id = element_root.data('todoid');
		let edit = element_root.children('.edit');
		let view = element_root.children('.view');
		edit.hide();
		view.show();
		let data = {text: edit.val()}
		todoList.todoChanged(todo_id, data);
	}

	$(document).on('change', '.todo-list li .view input', (e)=>{
		let root_element = $(e.target).parents('li');
		let todo_id = root_element.data('todoid');

		let status_new = 1;
		if($(e.target).is(':checked')){
			status_new = 2;
		}
		
		let data = { status: status_new }
		todoList.todoChanged(todo_id, data);
	});



	$(document).on('click', '.todo-list li .view .destroy', (e)=>{
		let root_element = $(e.target).parents('li');
		let todo_id = root_element.data('todoid');
		let api_url = config.todo_api_server + '/todo/' + todo_id;
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
			$(el.target).attr('disabled', true);
			let api_url = config.todo_api_server + '/todo/';
			queries.runQuery('POST', api_url, {
				'text': el.target.value
			}, {})
			.done((res)=>{
				el.target.value = '';
				$(el.target).attr('disabled', false);
				todoList.renderElement( {data: [res.data]} )
			})
			.fail((xhr, text)=>{
				$(el.target).attr('disabled', false);
				console.log(xhr, text)
			});
		}
	});

	$('#toggle-all').on('change', (e)=>{
		let el = e.target;
		if($(el).prop('checked')){
			$('.todo-list li .toggle').prop('checked', true);
		} else {
			$('.todo-list li .toggle').prop('checked', false);
		}
		$('.todo-list li .toggle').change();
	})
})(window);
