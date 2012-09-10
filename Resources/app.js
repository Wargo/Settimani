
var Mods = require('/pathMods');

if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

(function() {
	
	var MyWindow = require(Mods.mainWindow);
	
	var win = new MyWindow();
	
	win.open();
	
})();
