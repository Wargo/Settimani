
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function(selected) {
	
	var view = Ti.UI.createView($$.tabs);
	
	view.add(Ti.UI.createView({
		height:1,
		backgroundColor:'#999',
		top:0
	}));
	
	var weeksButton = createButton(L('weeks', 'Semanas'), 'calendar.png');
	var tipsButton = createButton(L('tips', 'Consejos'), 'tips.png');
	var configButton = createButton(L('config', 'Configuración'), 'config.png');
	
	weeksButton.left = '5 dp';
	configButton.right = '5 dp';
	
	select(selected);

	weeksButton.addEventListener('click', function() {
		//select(1);
		Ti.App.win1.open();
		Ti.App.win1.show();
		Ti.App.win2.hide();
		Ti.App.win3.hide();
		setCheckboxes();
	});
	
	tipsButton.addEventListener('click', function() {
		//select(2);
		Ti.App.win2.open();
		Ti.App.win2.show();
		Ti.App.win1.hide();
		Ti.App.win3.hide();
		setCheckboxes();
	});
	
	configButton.addEventListener('click', function() {
		//select(3);
		Ti.App.win3.open();
		Ti.App.win3.show();
		Ti.App.win1.hide();
		Ti.App.win2.hide();
	});
	
	view.add(weeksButton);
	view.add(tipsButton);
	view.add(configButton);
	
	view._weeksButton = weeksButton;
	view._tipsButton = tipsButton;
	view._configButton = configButton;
	
	function createButton(title, image) {
		var button = Ti.UI.createView($$.tabButton);
		
		var img = Ti.UI.createImageView($$.tabImage);
		img.image = '/ui/images/' + image;
		button.add(img);
		
		text = Ti.UI.createLabel($$.tabButtonText);
		text.text = title;
		
		button.add(text);
		
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
	
	function setCheckboxes() {
		for (i in Ti.App.checkboxes1) {
			if (Ti.App.Properties.getBool('tip_' + Ti.App.checkboxes1[i]._id, false)) {
				Ti.App.checkboxes1[i].backgroundImage = '/ui/images/checked.png';
			} else {
				Ti.App.checkboxes1[i].backgroundImage = '/ui/images/unchecked.png';
			}
		}
		for (i in Ti.App.checkboxes2) {
			if (Ti.App.Properties.getBool('tip_' + Ti.App.checkboxes2[i]._id, false)) {
				Ti.App.checkboxes2[i].backgroundImage = '/ui/images/checked.png';
			} else {
				Ti.App.checkboxes2[i].backgroundImage = '/ui/images/unchecked.png';
			}
		}
	}
	
	return view;
	
}
