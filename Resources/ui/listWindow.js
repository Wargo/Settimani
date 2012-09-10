
var Mods = require('/pathMods');

module.exports = function() {
	
	var MyWindow = require(Mods.configWindow);
	
	setTimeout(function() {
		MyWindow().open();
	}, 10);
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#F2F2F2',
		exitOnClose:true
	});
	
	win.add(Ti.UI.createLabel({text:'sdfja kdsjalsd jflñaks jflñasf lñsajlfñjasdklfjalñfdsj klñsajflña'}))
	
	return win;
	
}
