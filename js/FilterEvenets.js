class FilterEvenets {
	
	setEvenets(){
		$('body').on('click', '.filters a', (e)=>{
			$('.filters li a').removeClass('selected');
			$(e.target).addClass('selected');
			let href = $(e.target).attr('href');
			this.filterElements(href);
		});
	}

	filterElements( data ){
		if(data==='#/active'){
			this.showActive()
			this.hideReady()
		} else if(data==='#/completed'){
			this.hideActive()
			this.showReady()
		} else {
			this.showReady();
			this.showActive();
		}
	}

	hideActive(){
		$( ".todo-list li" ).not('.completed').hide();
	}

	showActive(){
		$( ".todo-list li" ).not('.completed').show();
	}

	showReady(){
		$( ".todo-list .completed" ).show()
	}

	hideReady(){
		$( ".todo-list .completed" ).hide()
	}
}
