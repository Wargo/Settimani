
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var view = Ti.UI.createView($$.tabs);
	
	var weeksButton = Ti.UI.createView($$.tabButton);
	weeksButton.left = '30 dp';
	var configButton = Ti.UI.createView($$.tabButton);
	configButton.right = '30 dp';
	
	var weeksImage = Ti.UI.createImageView($$.tabImage);
	weeksImage.image = '/ui/images/calendar.png';
	var configImage = Ti.UI.createImageView($$.tabImage);
	configImage.image = '/ui/images/config.png';
	
	/*
	var weeksImageBorder = Ti.UI.createView($$.tabImageBorder);
	var configImageBorder = Ti.UI.createView($$.tabImageBorder);
	
	weeksImageBorder.add(weeksImage);
	configImageBorder.add(configImage);
	
	weeksButton.add(weeksImageBorder);
	configButton.add(configImageBorder);
	*/
	
	weeksButton.add(weeksImage);
	configButton.add(configImage);
	
	weeksButton.backgroundImage = '/ui/images/button_tab.png';
	
	weeksText = Ti.UI.createLabel($$.tabButtonText);
	weeksText.text = L('weeks', 'Semanas');
	configText = Ti.UI.createLabel($$.tabButtonText);
	configText.text = L('config', 'Configuración');
	
	weeksButton.add(weeksText);
	configButton.add(configText);
	
	view.add(weeksButton);
	view.add(configButton);
	
	return view;
	
}
