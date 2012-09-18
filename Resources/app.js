
var Mods = require('/pathMods');

if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

(function() {
	
	var MyWindow = require(Mods.listWindow);
	var win = new MyWindow();
	
	var getTabs = require(Mods.tabs);
	var tabs = getTabs();
	
	win.add(tabs);
	win.open();
	
})();
