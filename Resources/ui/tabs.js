
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var view = Ti.UI.createView($$.tabs);
	
	var weeksButton = Ti.UI.createView($$.tabButton);
	var configButton = Ti.UI.createView($$.tabButton);
	weeksButton.left = '30 dp';
	configButton.right = '30 dp';
	
	var weeksImage = Ti.UI.createView($$.tabImage);
	var configImage = Ti.UI.createView($$.tabImage);
	
	weeksImage.add(Ti.UI.createImageView({image:'/ui/images/calendar.png'}));
	configImage.add(Ti.UI.createImageView({image:'/ui/images/config.png'}));
	
	weeksButton.add(weeksImage);
	configButton.add(configImage);
	
	view.add(weeksButton);
	view.add(configButton);
	
	return view;
	
}
