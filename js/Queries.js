class Queries {
	runQuery(http_method, data, params){

		let request_params = params;
		request_params.dataType = 'json';
		request_params.method = http_method;
		request_params.url =  config.todo_api_server + '/todo/';

		if(data!==null){
			request_params.data =  data;
		}

		return $.ajax(request_params);
	}
}
