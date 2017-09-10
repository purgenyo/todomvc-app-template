Handlebars.registerHelper('if_eq', function(a, b, opts) {
	if (a == b) {
		return opts.fn(this);
	} else {
		return opts.inverse(this);
	}
});

class TodoList {

	renderElement(elementsArr){
		var template = Handlebars.compile( $('#todoElement').html() );
		$('.todo-list').append( template(elementsArr) );
	}

	refreshElement(element_id, text, status){

	}

	changeElementStatus(element_id){

	}

	deleteElement(element_id){

	}

	changeEditableState( element_id ){

	}
}
