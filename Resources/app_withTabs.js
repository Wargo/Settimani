
var Mods = require('/pathMods');

if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

(function() {
	
	var tabGroup = Ti.UI.createTabGroup();
	
	var MyWindow = require(Mods.listWindow);
	var win1 = new MyWindow();
	
	var MyWindow = require(Mods.configWindow);
	var win2 = new MyWindow(true, tabGroup);
	
	var tab1 = Ti.UI.createTab({
		window: win1,
		title:L('weeks', 'Semanas'),
		icon:'/ui/images/calendar.png'
	});
	
	var tab2 = Ti.UI.createTab({
		window: win2,
		title:L('config', 'Configuración'),
		icon:'/ui/images/config.png'
	});
	
	if (Ti.Platform.osname != 'android') {
		var nav = Ti.UI.iPhone.createNavigationGroup({
			window:win1
		});
		var baseWin = Ti.UI.createWindow({
			navBarHidden:true
		});
		baseWin.add(nav);
		tab1.window = baseWin;
		win1._nav = nav;
		win1._baseWin = baseWin;
	} else {
		var baseWin = null;
	}
	
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab2);
	
	if (true || !Ti.App.Properties.getDouble('date', null)) {
		var MyWindow = require(Mods.configWindow);
		MyWindow(false, tabGroup, baseWin).open();
	} else {
		if (Ti.Platform.osname != 'android') {
			baseWin.open();
		}
		tabGroup.open();
	}
	
})();
