class Queries {
	runQuery(http_method, url, data, params){
		let request_params = params;
		request_params.dataType = 'json';
		request_params.method = http_method;
		request_params.url =  url;

		if(data!==null){
			request_params.data =  JSON.stringify(data);
		}

		return $.ajax(request_params);
	}
}
