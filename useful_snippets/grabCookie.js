(function(){
	function getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) {
			return parts.pop().split(";").shift();
		}
	}
	var data = getCookie('{Cookie_Name}');
	if(data){
		return data;};
})();