(function(){
	var qryParams = {};
	window.document.location.search.substr(1).split('&').forEach(function(kv){
	  [key, value] = kv.split('=');
	  qryParams[key] = value;
	});
	return qryParams."{ENTER KEY}";
})()