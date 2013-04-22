
module.exports = function(f_callback, page, onlyTips, loader) {

	if (onlyTips) {
		var prop = 'bbdd_1_' + Ti.Platform.locale + '_' + page;
	} else {
		var prop = 'bbdd_2_' + Ti.Platform.locale + '_' + page;
	}
	
	//Ti.App.Properties.removeProperty(prop); // to dev

	//if (false && Ti.App.Properties.getString(prop, null)) {
	
	if (Ti.Network.networkType == Ti.Network.NETWORK_NONE && Ti.App.Properties.getString(prop, null)) {
		
		loader.message = L('generating');
		
		var result = JSON.parse(Ti.App.Properties.getString(prop));
		
		setTimeout(function() {
			f_callback(result.data);
		}, 300);
		
	} else {
	
		var path = L('bbdd_url');
		
		var client = Ti.Network.createHTTPClient({
			timeout:15000,
			onload:function() {
				loader.message = L('loading');
				
				Ti.API.info(this.responseText);
				
				var result = JSON.parse(this.responseText);
				if (result.status === 'ok') {
					if (result.free) {
						Ti.App.Properties.setBool('free', true);
					} else {
						Ti.App.Properties.setBool('free', false);
					}
					Ti.App.Properties.setString(prop, this.responseText);
					f_callback(result.data);
				} else {
					if (Ti.App.Properties.getString(prop, null)) {
		
						loader.message = L('generating');
						
						var result = JSON.parse(Ti.App.Properties.getString(prop));
						
						setTimeout(function() {
							f_callback(result.data);
						}, 300);
						
					} else {
						f_callback(null, L('errorContent'));
					}
				}
			},
			onerror:function(e) {
				if (Ti.App.Properties.getString(prop, null)) {
	
					loader.message = L('generating');
					
					var result = JSON.parse(Ti.App.Properties.getString(prop));
					
					setTimeout(function() {
						f_callback(result.data);
					}, 300);
					
				} else {
					f_callback(null, L('errorConnection'));
				}
			}
		});
		
		client.open('POST', path);
		client.send({
			page:page,
			onlyTips:onlyTips,
			pay:true
		});
		
	}
	
}
