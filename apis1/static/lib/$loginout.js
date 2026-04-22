if(!localStorage.getItem('ocardtooken')){
	const searchParams = new URLSearchParams(window.location.search);
	var ladd='/login';
	if (searchParams.has('id')) {
		ladd += '?id=' + searchParams.get('id');
	}
	if(typeof $loginHref != 'undefined'){
		ladd=$loginHref;
	}
	location.href=ladd;
}