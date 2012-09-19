
var Mods = require('/pathMods');

if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

(function() {
	
	var getTabs = require(Mods.tabs);
	
	var listWin = require(Mods.listWindow);
	Ti.App.win1 = new listWin();
	Ti.App.win2 = new listWin();
	
	var confWin = require(Mods.configWindow);
	Ti.App.win3 = new confWin(true);
	
	var tabs = getTabs(1);
	Ti.App.win1.add(tabs);
	
	var tabs = getTabs(2);
	Ti.App.win2.add(tabs);
	
	var tabs = getTabs(3);
	Ti.App.win3.add(tabs);
	
	if (Ti.Platform.osname != 'android') {
		
		var nav1 = Ti.UI.iPhone.createNavigationGroup({
			window:Ti.App.win1
		});
		var baseWin1 = Ti.UI.createWindow({
			navBarHidden:true
		});
		baseWin1.add(nav1);
		Ti.App.win1._nav = nav1;
		
		var nav2 = Ti.UI.iPhone.createNavigationGroup({
			window:Ti.App.win2
		});
		var baseWin2 = Ti.UI.createWindow({
			navBarHidden:true
		});
		baseWin2.add(nav2);
		Ti.App.win1._nav = nav2;
		
		baseWin1.open();
		
	} else {
		
		Ti.App.win1.open();
		
	}
	
	if (true || !Ti.App.Properties.getDouble('date', null)) {
		setTimeout(function() {
			confWin(false).open();
		}, 100);
	}
	
})();
