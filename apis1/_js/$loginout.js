if(!localStorage.getItem('ocardtooken')){
	var ladd='/login';
	if(typeof $loginHref != 'undefined'){
		ladd=$loginHref;
	}
	location.href=ladd;
}