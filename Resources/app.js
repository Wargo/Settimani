
var Mods = require('/pathMods');

if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

(function() {
	
	var MyWindow = require(Mods.listWindow);
	
	MyWindow().open();
	
})();
