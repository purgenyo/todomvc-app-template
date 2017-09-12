class Queries {
	runQuery(method, data, params){

		let request_params = params;
		request_params.dataType = 'json';
		request_params.method = method;
		request_params.url =  config.api_server + '/todo/';

		if(data!==null){
			request_params.data =  data;
		}

		return $.ajax(request_params);
	}
}
