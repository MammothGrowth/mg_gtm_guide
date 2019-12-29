(function(){
	function getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) {
			return parts.pop().split(";").shift();
		}
	}
	var products = ["{Array of acceptable values}"];
	var product = getCookie('{Cookie_Name}');
	if(products.indexOf(product) > -1){
		return product;};
})();