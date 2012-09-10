
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var MyWindow = require(Mods.configWindow);
	
	if (!Ti.App.Properties.getDouble('date', null)) {
		setTimeout(function() {
			MyWindow().open();
		}, 10);
	}
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#F2F2F2',
		exitOnClose:true
	});
	
	if (Ti.Platform.osname === 'android') {
		var header = Ti.UI.createView($$.header);
		var title = Ti.UI.createLabel($$.headerTitle);
		title.text = L('main_title', 'Lagravidanza.net');
		
		header.add(title);
		win.add(header);
	} else {
		win.title = L('main_title', 'Lagravidanza.net');
		var nav = Ti.UI.iPhone.createNavigationGroup({
			
		});
		win.add(nav);
	}
	
	var todayButton = Ti.UI.createButton({
		title:L('today', 'Hoy'),
		right:'10 dp',
		height:'20 dp',
		width:'40 dp',
		borderRadius:5,
		borderColor:'#1A6A8A',
		borderWidth:1,
		color:'#FFF',
		font:{fontWeigh:'bold'},
		backgroundColor:'#1280AB'
	});
	
	header.add(todayButton);
	
	var tableView = Ti.UI.createTableView({
		
		
		
	});
	
	return win;
	
}
