
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var win = Ti.UI.createWindow({
		exitOnClose:true,
		backgroundColor:'#F2F2F2'
	});
	
	var header = Ti.UI.createView($$.header);
	var title = Ti.UI.createLabel($$.headerTitle);
	title.text = L('main_title', 'Lagravidanza.net');
	
	header.add(title);
	
	var image = Ti.UI.createImageView({
		image:'/ui/images/home.png',
		top:'40 dp',
		width:'100%'
	});
	
	win.add(image);
	win.add(header);
	
	return win;
	
}
