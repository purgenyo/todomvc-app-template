Handlebars.registerHelper('if_eq', function(a, b, opts) {
	if (a == b) {
		return opts.fn(this);
	} else {
		return opts.inverse(this);
	}
});

class TodoList {

	renderElement(elementsArr){
		console.log(elementsArr);
		var template = Handlebars.compile( $('#todoElement').html() );
		$('.todo-list').prepend( template(elementsArr) );
	}

	todoChanged(todo_id, data){
		let api_url = config.todo_api_server + '/todo/' + todo_id;
		queries.runQuery('PUT', api_url, data, {})
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
			.fail((xhr, text)=>{ console.log(xhr, text) });
	}


	
}
