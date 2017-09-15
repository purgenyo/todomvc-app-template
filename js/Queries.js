class Queries {

	/**
	 * Формирует jquery ajax запрос
	 *
	 * @param http_method - Метод запроса
	 * @param url - метод api
	 * @param data - json данные
	 * @param params - дополнительные параметры (header, и тд)
     * @returns {*}
     */
	runQuery(http_method, url, data, params){
		let request_params = params;
		request_params.dataType = 'json';
		request_params.method = http_method;
		request_params.url =  url;
		request_params.contentType = "application/json; charset=utf-8";
		request_params.beforeSend = this.setHeader;
		if(data!==null){
			request_params.data =  JSON.stringify(data);
		}
		return $.ajax(request_params);
	}

	setHeader(xhr) {
		let token = Authorization.getToken();
		if(token!==false){
			xhr.setRequestHeader('Authorization', `Bearer ${token}`);
		}
	}
}
