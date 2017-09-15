class Authorization extends Queries {

	getApiUrl(){
		return config.todo_api_server + '/user';
	}

	setErrorText(text){
		$('.errors').html(text);
	}

	setEvents(){

		$(document).on('click', '.logout', (e)=>{
			this.logOut();
			e.preventDefault();
			e.stopPropagation();
		});

		$(document).on('focus', '.form-element input', ()=>{
			this.setErrorText('');
		});

		$(document).on('click', '.login_event', (e)=>{
			e.preventDefault();
			e.stopPropagation();
			$('.modal-title').html($(e.target).html())
			let event = $(e.target).attr('href');

			$('.data-auth-form').attr('data-event', event);
		});

		$(document).on('click', '.send_server', (e)=>{

			let data = $('.data-auth-form').serializeArray();
			let result = {};
			for(let i in data){
				result[data[i].name] = data[i].value;
			}
			if($('.data-auth-form').attr('data-event')==='login'){
				this.login(result);
			} else {
				this.registration(result);
			}
		});
	}

	login(data){
		this.runQuery('POST', this.getApiUrl() + '/login', data, {})
			.done((res)=>{
				if(res.status===200){
					localStorage.setItem('todo_token', res.data.token);
					document.location.reload();
				}
			})
			.fail((xhr, text)=>{  this.setErrorText(xhr.responseJSON.error);  } );
	}

	registration(data){
		console.log(data);
		this.runQuery('POST', this.getApiUrl() + '/registration', data, {})
			.done((res)=>{
				if(res.status===200){

				}
			})
			.fail((xhr, text)=>{ this.setErrorText(xhr.responseJSON.error) } );
	}

	logOut(){
		localStorage.removeItem('todo_token');
		document.location.reload();
	}

	static getToken(){
		let todo_token = localStorage.getItem('todo_token');
		if(todo_token===null){
			return false;
		}

		return todo_token;
	}

	setHeader(xhr) {}
}
