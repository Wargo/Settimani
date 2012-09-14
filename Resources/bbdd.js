
module.exports = function(f_callback) {
	
	var path = 'http://www.semanasdembarazo.com/appMovil/weeks.php';
	
	var client = Ti.Network.createHTTPClient({
		timeout:1500,
		onload:function() {
			var result = JSON.parse(this.responseText);
			
			if (result.status === 'ok') {
				f_callback(result.data);
			} else {
				alert('error de datos')
			}
		},
		onerror:function(e) {
			alert('error de conex')
		}
	});
	
	client.open('GET', path);
	client.send();
	
}
