
var Mods = require('/pathMods');

var $$ = require(Mods.styles);

module.exports = function() {
	
	var win = Ti.UI.createWindow({
		exitOnClose:true,
		backgroundColor:'#F2F2F2'
	});
	
	var header = Ti.UI.createView($$.header);
	
	var title = Ti.UI.createLabel($$.headerTitle);
	
	//title.text = L('main_title', 'no translation avaliable');
	title.text = Ti.Locale.getString('main_title', 'no translation avaliable');
	
	header.add(title);
	
	win.add(header);
	
	return win;
	
}
