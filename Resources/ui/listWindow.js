
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var MyWindow = require(Mods.configWindow);
	
	var win = Ti.UI.createWindow({
		backgroundImage:'ui/images/bg_list.png',
		exitOnClose:true
	});
	
	if (!Ti.App.Properties.getDouble('date', null)) {
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
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 1'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 2'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 3'},
		{title:'Lorem Ipsum', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
	]
	
	var tableView = Ti.UI.createTableView($$.tableView);
	
	for (i in data) {
		
		var row = Ti.UI.createTableViewRow($$.row);
		
		if (Ti.Platform.osname === 'android') {
			
			if (data[i].header) {
				var content = Ti.UI.createView($$.firstRow);
				row.header = data[i].header;
			} else if (data[i].last) {
				var content = Ti.UI.createView($$.lastRow);
			} else {
				var content = Ti.UI.createView($$.middleRow);
				if (data[i - 1].header) {
					content.top = 0;
				}
			}
			
			var title = Ti.UI.createLabel($$.rowTitle);
			title.text = data[i].title;
			
			var intro = Ti.UI.createLabel($$.rowIntro);
			intro.text = data[i].intro;
			
			content.add(title);
			content.add(intro);
			
			row.add(content);
			
			tableView.appendRow(row);
			
		} else {
			
			var miniRow = Ti.UI.createTableViewRow({
				height:80,
				title:data[i].title
			});
			
			if (data[i].header) {
				
				if (typeof numRows != 'undefined') {
					miniTableView.height = miniRow.height * numRows - 1;
				}
				
				var numRows = 0;
				
				row.header = data[i].header;
				
				var miniTableView = Ti.UI.createTableView({
					scrollable:false,
					backgroundColor:'#FFF',
					borderRadius:5,
					top:20,
					left:20,
					right:20,
					bottom:20,
				});
				
				row.add(miniTableView);
				
				tableView.appendRow(row);
				
			}
			
			numRows ++;
			
			miniTableView.appendRow(miniRow);
			//section.add(miniRow);
			
		}
		
		if (typeof numRows != 'undefined') {
			miniTableView.height = miniRow.height * numRows - 1;
		}
		
	}
	
	win.add(tableView);
	
	return win;
	
}
