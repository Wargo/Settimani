
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var MyWindow = require(Mods.configWindow);
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#F2F2F2',
		exitOnClose:true,
		opacity:0
	});
	
	if (true || !Ti.App.Properties.getDouble('date', null)) {
		setTimeout(function() {
			MyWindow().open();
			win.opacity = 1;
		}, 100);
	}
	
	if (Ti.Platform.osname === 'android') {
		var header = Ti.UI.createView($$.header);
		var title = Ti.UI.createLabel($$.headerTitle);
		title.text = L('main_title', 'Lagravidanza.net');
		
		header.add(title);
		win.add(header);
		
		var todayButton = Ti.UI.createButton({
			title:L('today', 'Hoy'),
			right:'10 dp',
			height:'20 dp',
			width:'40 dp',
			borderRadius:5,
			borderColor:'#1A6A8A',
			borderWidth:1,
			color:'#FFF',
			font:{fontWeigh:'bold'},
			backgroundColor:'#1280AB'
		});
		
		header.add(todayButton);
	} else {
		var auxWin = Ti.UI.createWindow();
		win.title = L('main_title', 'Lagravidanza.net');
		win.barImage = '/ui/images/bg_header.png';
		var nav = Ti.UI.iPhone.createNavigationGroup({window:win});
		auxWin.add(nav);
		auxWin.open();
		
		var todayButton = Ti.UI.createButtonBar({
			labels:[L('today', 'Hoy')],
			backgroundColor:'#198BB6',
			color:'#FFF',
			width:50
		});
		
		auxWin.rightNavButton = todayButton;
	}
	
	var data = [
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 1'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 2'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 3'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
	]
	
	var tableView = Ti.UI.createTableView();
	
	for (i in data) {
		
		var row = Ti.UI.createTableViewRow({
			title:data[i].title
		});
		
		tableView.appendRow(row);
		
	}
	
	win.add(tableView);
	
	return win;
	
}
