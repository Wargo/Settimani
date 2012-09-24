
module.exports = function(f_callback, page) {
	
	if (Ti.App.Properties.getString('bbdd_' + page, null)) {
		
		var result = JSON.parse(Ti.App.Properties.getString('bbdd_' + page));
		
		setTimeout(function() {
			f_callback(result.data);
		}, 300);
		
	} else {
	
		var path = 'http://www.semanasdembarazo.com/appMovil/weeks.php';
		
		var client = Ti.Network.createHTTPClient({
			timeout:1500,
			onload:function() {
				var result = JSON.parse(this.responseText);
				
				if (result.status === 'ok') {
					Ti.App.Properties.setString('bbdd_' + page, this.responseText);
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
	
}