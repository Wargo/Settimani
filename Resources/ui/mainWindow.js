
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var win = Ti.UI.createWindow({
		exitOnClose:true,
		backgroundColor:'#F2F2F2',
		layout:'vertical'
	});
	
	var header = Ti.UI.createView($$.header);
	var title = Ti.UI.createLabel($$.headerTitle);
	title.text = L('main_title', 'Lagravidanza.net');
	
	header.add(title);
	
	var image = Ti.UI.createImageView($$.imageHome);
	image.image = '/ui/images/home.png';
	
	var insertDate = Ti.UI.createView($$.insertDate);
	
	if (Ti.Platform.osname === 'android') {
		insertDate.borderColor = '#333';
		insertdate.borderWidth = 1;
	} else {
		setTimeout(function() {
			insertDate.setShadow({
				shadowOffset:{x:0,y:5},
				shadowOpacity:0.5,
				shadowRadius:3
			});
		}, 100);
	}
	
	var intro = Ti.UI.createLabel({
		text:L('fill_preg_date', 'Introduce tu fecha de parto'),
		font:{fontWeight:'bold', fontSize:'16 dp'},
		color:'#2094c0',
		top:'10 dp'
	})
	insertDate.add(intro);
	
	win.add(header);
	win.add(image);
	win.add(insertDate);
	
	return win;
	
}
