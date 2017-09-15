class ErrorHandler {

	static processByHttpStatusResponse( code ){
		if(code===401){
			$('#modal-form').modal();
			console.log('Необходимо пройти авторизацию');
		}
	}

}
