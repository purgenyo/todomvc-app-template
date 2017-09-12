class Queries {
	runQuery(method, data, params){
		return $.ajax({
			dataType: "json",
			method: method,
			data: JSON.stringify(data),
			url: config.api_server + '/todo/',
		});
	}
}
