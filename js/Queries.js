class Queries {
	runQuery(method, data, params){
		return $.ajax({
			method: method,
			data: data,
			url: config.api_server + '/todo/',
		});
	}
}
