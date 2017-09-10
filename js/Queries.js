class Queries {
	runQuery(method, data, params){
		return $.ajax({
			method: method,
			data: data,
			url: "http://localhost:8082/todo/",
		});
	}
}
