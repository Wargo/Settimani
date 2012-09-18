
var Mods = require('/pathMods');

if (Ti.Platform.osname != 'android') {
	require('ti.viewshadow');
}

(function() {
	
	var tabGroup = Ti.UI.createTabGroup({
		tabsBackgroundImage:'ui/images/bg_tabs.png'
	});
	
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
		title:L('config', 'Config'),
		icon:'/ui/images/config.png'
	});
	
	win1.containingTab = tab1;
	win2.containingTab = tab2;
	
	tabGroup.addTab(tab1);
	tabGroup.addTab(tab2);
	
	/*
	var getTabs = require(Mods.tabs);
	var tabs = getTabs(1);
	win.add(tabs);
	*/
	
	if (!Ti.App.Properties.getDouble('date', null)) {
		var MyWindow = require(Mods.configWindow);
		MyWindow(false, tabGroup).open();
	} else {
		tabGroup.open();
	}
	
})();
