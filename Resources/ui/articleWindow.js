
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function(data) {
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#FFF'
	});
	
	if (Ti.Platform.osname === 'android') {
		var header = Ti.UI.createView($$.header);
		var title = Ti.UI.createLabel($$.headerTitle);
		title.text = data.title;
		
		header.add(title);
		win.add(header);
		
		var prev = Ti.UI.createButton($$.headerButton);
		var next = Ti.UI.createButton($$.headerButton);
		prev.right = '40 dp';
		prev.width = next.width = '30 dp';
		prev.title = '<';
		next.title = '>';
		
		header.add(prev);
		header.add(next);
	} else {
		win.barImage = '/ui/images/bg_header.png';
		win.barColor = '#198BB6';
		
		var todayButton = Ti.UI.createButtonBar({
			labels:['<', '>'],
			backgroundColor:'#198BB6',
			color:'#FFF',
			width:50
		});
		
		win.title = data.title;
		
		win.rightNavButton = todayButton;
	}
	
	win.add(Ti.UI.createLabel({text:data.title}));
	
	return win;
	
}
