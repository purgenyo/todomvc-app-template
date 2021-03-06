Handlebars.registerHelper('if_eq', function(a, b, opts) {
	if (a === b) {
		return opts.fn(this);
	} else {
		return opts.inverse(this);
	}
});

class TodoList extends Queries{

	setItemCount(itemCount){
		$('.todo-count strong').html(itemCount);
		this.itemCount = itemCount;
	}

	getItemCount(){
		return this.itemCount;
	}

	getApiUrl(){
		return config.todo_api_server + '/todo';
	}

	init(){
		this.runQuery('GET', this.getApiUrl(), null, {})
			.done((res)=>{
				$('.todoapp').show();
				let counts = 0;
				for (let i in res.data){
					if(res.data[i].status===2){
						counts++;
					}
				}
				this.setItemCount(counts);
				this.renderElement(res)
			})
			.fail((xhr)=>{ErrorHandler.processByHttpStatusResponse(xhr.status)});
	}

	renderElement(elementsArr){
		console.log(elementsArr);
		var template = Handlebars.compile( $('#todoElement').html() );
		$('.todo-list').prepend( template(elementsArr) );
	}

	todoChanged(todo_id, data){

		this.runQuery('PUT', this.getApiUrl() + '/' + todo_id, data, {})
			.done((res)=>{
				let li = $(`li[data-todoid='${todo_id}']`);
				let edit = li.children('.edit');
				let label = li.children('.view').children('label');
				edit.val(res.data.text);
				label.text(res.data.text);
				if(res.data.status===1){
					li.removeClass('completed');
				} else {
					li.addClass('completed');
				}

			})
			.fail((xhr)=>{ErrorHandler.processByHttpStatusResponse(xhr.status)});
	}

	todoProcessEdit(element_root) {
		let todo_id = element_root.data('todoid');
		let edit = element_root.children('.edit');
		let view = element_root.children('.view');
		edit.hide();
		view.show();
		let data = {text: edit.val()}
		this.todoChanged(todo_id, data);
	}

	runEdit(element_root){
		let edit = element_root.children('.edit');
		let view = element_root.children('.view');
		edit.show();
		edit.focus();
		view.hide();
	}

	deleteElement(element_root){
		let todo_id = element_root.data('todoid');
		console.log(todo_id);
		let api_url = this.getApiUrl() +'/'+ todo_id;
		$(element_root).children('.destroy').attr('disabled', true);
		this.runQuery('DELETE', api_url, null, {})
			.done((res)=>{
				if(res.data===true){
					this.setItemCount(this.getItemCount()-1);
					element_root.remove();
				}
			})
			.fail((xhr)=>{ErrorHandler.processByHttpStatusResponse(xhr.status)});
	}

	changeStatus(root_element){
		let todo_id = root_element.data('todoid');
		let status_new = 1;
		if($(root_element).children('.view').children('.toggle').is(':checked')){
			status_new = 2;
			this.setItemCount(this.getItemCount()+1);
		} else {
			this.setItemCount(this.getItemCount()-1);
		}
		let data = { status: status_new }
		this.todoChanged(todo_id, data);
	}

	setEvenets(){

		/** Удаление готовых записей */
		$(document).on('click', '.clear-completed', (e)=>{
			let for_delete = $('.todo-list .completed');
			if(for_delete===0){
				return false;
			} else {
				for(let i = for_delete.length-1; i >= 0; i--){
					this.deleteElement($(for_delete[i]));
				}
			}
		});

		/** Двойной клик для редактирования */
		$(document).on('dblclick', '.todo-list li .view label', (e)=>{
			let element_root = $(e.target).parents('li');
			this.runEdit(element_root);
		});

		/** Нажатие на enter при редактировании */
		$(document).on('keyup', '.edit', (e)=>{
			if(e.keyCode===13){
				let element_root = $(e.target).parents('li');
				this.todoProcessEdit(element_root);
			}
		});

		/** Если фокус больше не на редактировании записи */
		$(document).on('blur', '.edit', (e)=>{
			let element_root = $(e.target).parents('li');
			this.todoProcessEdit(element_root);
		});

		/** Изменение состояния статуса */
		$(document).on('change', '.todo-list li .view input', (e)=>{
			let root_element = $(e.target).parents('li');
			this.changeStatus(root_element);
		});

		/** Удаление записи */
		$(document).on('click', '.todo-list li .view .destroy', (e)=>{
			let root_element = $(e.target).parents('li');
			this.deleteElement(root_element);
		});

		/** Массовое назначение */
		$('#toggle-all').on('change', (e)=>{
			let el = e.target;
			if($(el).prop('checked')){
				$('.todo-list li .toggle').prop('checked', true);
				this.setItemCount(0);
			} else {
				$('.todo-list li .toggle').prop('checked', false);
				this.setItemCount( $('.todo-list li').length );
			}

			$('.todo-list li .toggle').change();
		});

		/** Отправка записи на сервер */
		$(document).on('keyup', '.new-todo', (el)=>{
			if(el.keyCode===13){
				$(el.target).attr('disabled', true);
				let api_url = config.todo_api_server + '/todo/';
				this.runQuery('POST', api_url, {
						'text': el.target.value
					}, {})
					.done((res)=>{
						el.target.value = '';
						$(el.target).attr('disabled', false);
						this.renderElement( {data: [res.data]} )
					})
					.fail((xhr, text)=>{
						$(el.target).attr('disabled', false);
						ErrorHandler.processByHttpStatusResponse(xhr.status);
					});
			}
		});
	}

}
