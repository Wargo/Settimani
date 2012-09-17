
module.exports = function(f_callback, page) {
	
	var path = 'http://www.semanasdembarazo.com/appMovil/weeks.php';
	
	var client = Ti.Network.createHTTPClient({
		timeout:1500,
		onload:function() {
			var result = JSON.parse(this.responseText);
			
			if (result.status === 'ok') {
				f_callback(result.data);
			} else {
				f_callback(null, 'error de datos')
			}
		},
		onerror:function(e) {
			f_callback(null, 'error de conexión')
		}
	});
	
	client.open('POST', path);
	client.send({
		page:page
	});
	
}
