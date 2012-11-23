
module.exports = function(f_callback, page, onlyTips) {
	
	if (onlyTips) {
		var prop = 'bbdd_1_' + page;
	} else {
		var prop = 'bbdd_2_' + page;
	}
	
	//Ti.App.Properties.removeProperty(prop); // to dev
	
	if (false && Ti.App.Properties.getString(prop, null)) {
		
		var result = JSON.parse(Ti.App.Properties.getString(prop));
		
		setTimeout(function() {
			f_callback(result.data);
		}, 300);
		
	} else {
	
		var path = L('bbdd_url', 'http://www.semanasdembarazo.com/appMovil/weeks.php');
		
		var client = Ti.Network.createHTTPClient({
			timeout:1500,
			onload:function() {
				Ti.API.info(this.responseText);
				
				var result = JSON.parse(this.responseText);
				if (result.status === 'ok') {
					Ti.App.Properties.setString(prop, this.responseText);
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
			page:page,
			onlyTips:onlyTips
		});
		
	}
	
}