
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function(selected) {
	
	var view = Ti.UI.createView($$.tabs);
	
	var weeksButton = createButton(L('weeks', 'Semanas'), 'calendar.png');
	var tipsButton = createButton(L('tips', 'Consejos'), 'tips.png');
	var configButton = createButton(L('config', 'Configuración'), 'config.png');
	
	weeksButton.left = '5 dp';
	configButton.right = '5 dp';
	
	select(selected);

	weeksButton.addEventListener('click', function() {
		select(1);
	});
	
	tipsButton.addEventListener('click', function() {
		select(2);
	});
	
	configButton.addEventListener('click', function() {
		select(3);
	});
	
	view.add(weeksButton);
	view.add(tipsButton);
	view.add(configButton);
	
	view._weeksButton = weeksButton;
	view._tipsButton = tipsButton;
	view._configButton = configButton;
	
	return view;
	
	function createButton(title, image) {
		var button = Ti.UI.createView($$.tabButton);
		
		var img = Ti.UI.createImageView($$.tabImage);
		img.image = '/ui/images/' + image;
		button.add(img);
		
		text = Ti.UI.createLabel($$.tabButtonText);
		text.text = title;
		
		button.add(text);
		
		/*
		var weeksImageBorder = Ti.UI.createView($$.tabImageBorder);
		var configImageBorder = Ti.UI.createView($$.tabImageBorder);
		
		weeksImageBorder.add(weeksImage);
		configImageBorder.add(configImage);
		
		weeksButton.add(weeksImageBorder);
		configButton.add(configImageBorder);
		*/
		
		return button;
	}
	
	function select(button) {
		switch (button) {
			case 1:
				weeksButton.backgroundColor = '#F2F2F2';
				tipsButton.backgroundColor = 'transparent';
				configButton.backgroundColor = 'transparent';
				weeksButton._selected = true;
				tipsButton._selected = false;
				configButton._selected = false;
				break;
			case 2:
				weeksButton.backgroundColor = 'transparent';
				tipsButton.backgroundColor = '#F2F2F2';
				configButton.backgroundColor = 'transparent';
				weeksButton._selected = true;
				tipsButton._selected = false;
				configButton._selected = false;
				break;
			case 3:
				weeksButton.backgroundColor = 'transparent';
				tipsButton.backgroundColor = 'transparent';
				configButton.backgroundColor = '#F2F2F2';
				weeksButton._selected = true;
				tipsButton._selected = false;
				configButton._selected = false;
				break;
		}
	}
	
}
