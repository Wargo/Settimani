
var Mods = require('/pathMods');

if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

(function() {
	
	var getTabs = require(Mods.tabs);
	
	var MyWindow = require(Mods.listWindow);
	Ti.App.win1 = new MyWindow();
	Ti.App.win2 = new MyWindow();
	
	var MyWindow = require(Mods.configWindow);
	Ti.App.win3 = new MyWindow(true);
	
	var tabs = getTabs(1);
	Ti.App.win1.add(tabs);
	
	var tabs = getTabs(2);
	Ti.App.win2.add(tabs);
	
	var tabs = getTabs(3);
	Ti.App.win3.add(tabs);
	
	if (Ti.Platform.osname != 'android') {
		
		var nav = Ti.UI.iPhone.createNavigationGroup({
			window:Ti.App.win1
		});
		var baseWin = Ti.UI.createWindow({
			navBarHidden:true
		});
		baseWin.add(nav);
		Ti.App.win1._nav = nav;
		
		baseWin.open();
		
	} else {
		
		Ti.App.win1.open();
		
	}
	
})();
