
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
		}, 10);
	}
	
	if (Ti.Platform.osname === 'android') {
		var header = Ti.UI.createView($$.header);
		var title = Ti.UI.createLabel($$.headerTitle);
		title.text = L('main_title', 'Lagravidanza.net');
		
		header.add(title);
		win.add(header);
		
		var todayButton = Ti.UI.createButton($$.headerButton);
		todayButton.title = L('today', 'Hoy');
		
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
		
		win.rightNavButton = todayButton;
	}
	
	var data = [
		{title:'Lorem Ipsum', category:'baby', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 1'},
		{title:'Lorem Ipsum', category:'mom', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', category:'general', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
		{title:'Lorem Ipsum larga largo largo largo largo largo', category:'baby', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 2'},
		{title:'Lorem Ipsum', category:'mom', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', category:'general', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', category:'baby', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', category:'mom', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
		{title:'Lorem Ipsum', category:'general', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 3'},
		{title:'Lorem Ipsum', category:'baby', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
		{title:'Lorem Ipsum', category:'mom', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 4'},
		{title:'Lorem Ipsum', category:'general', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', category:'baby', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
		{title:'Lorem Ipsum', category:'mom', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 5'},
		{title:'Lorem Ipsum', category:'general', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', category:'baby', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.'},
		{title:'Lorem Ipsum', category:'mom', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
		{title:'Lorem Ipsum', category:'general', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', header:'semana 6'},
		{title:'Lorem Ipsum', category:'baby', intro:'Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.', last:true},
	]
	
	var tableView = Ti.UI.createTableView($$.tableView);
	
	var tableViewData = [];
	
	for (i in data) {
		
		data[i].intro = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim, sapien non fringilla aliquam, mi lacus tincidunt enim, quis fermentum diam tellus in tortor. Praesent aliquam tristique eros nec adipiscing. Phasellus erat neque, cursus ac blandit ac, tempor eu libero. Sed egestas volutpat nulla sed hendrerit. Quisque fringilla feugiat ipsum. Fusce velit orci, ullamcorper in adipiscing ut, pharetra id sapien. Quisque volutpat fringilla diam, sed accumsan mi facilisis elementum. Proin eu bibendum purus. Ut luctus sagittis dignissim. Curabitur gravida, quam nec vulputate facilisis, sem mi feugiat neque, non dapibus erat purus nec eros. Suspendisse potenti.';
		
		var row = Ti.UI.createTableViewRow($$.row);
		row.data = data[i];
		
		var title = Ti.UI.createLabel($$.rowTitle);
		title.text = data[i].title;
		
		var intro = Ti.UI.createLabel($$.rowIntro);
		intro.text = data[i].intro;
		
		var image = Ti.UI.createImageView($$.rowImage);
		image.image = '/ui/images/' + data[i].category + '.gif';
		
		var nextImage = Ti.UI.createImageView($$.nextImage);
		nextImage.image = '/ui/images/next.png';
		
		if (Ti.Platform.osname === 'android') {
			
			row.addEventListener('click', function(e) {
				loadArticle(e.row);
			});
			
			if (data[i].header) {
				
				var content = Ti.UI.createView($$.firstRow);
				row.header = data[i].header;
				
				nextImage.top = '45 dp';
				
			} else if (data[i].last) {
				
				var content = Ti.UI.createView($$.lastRow);
				title.top = '5 dp';
				intro.top = '30 dp';
				if (data[i - 1].header) {
					content.add(Ti.UI.createView({
						height:1,
						backgroundColor:'#999',
						top:'5 dp'
					}));
				}
				
			} else {
				
				var content = Ti.UI.createView($$.middleRow);
				if (!data[i - 1].header) {
					content.top = '-1 dp';
				}
				
			}
			
			content.add(title);
			content.add(intro);
			content.add(image);
			
			row.add(nextImage);
			row.add(content);
			
			tableView.appendRow(row);
			
		} else {
		
			var miniRow = Ti.UI.createTableViewRow($$.miniRow);
			miniRow.data = data[i];
			
			miniRow.addEventListener('click', function(e) {
				loadArticle(e.row);
			});
			
			miniRow.add(title);
			miniRow.add(intro);
			miniRow.add(image);
			miniRow.add(nextImage);
			
			if (data[i].header) {
				
				if (typeof numRows != 'undefined') {
					adjustHeight(numRows);
				}
				var numRows = 0;
				
				var auxSection = Ti.UI.createTableViewSection();
				var headerText = Ti.UI.createLabel($$.headerTableViewText);
				headerText.text = data[i].header;
				
				var header = Ti.UI.createView($$.headerTableViewSection);
				header.add(headerText);
				auxSection.headerView = header;
				
				var miniTableView = Ti.UI.createTableView($$.miniTableView);
				row.add(miniTableView);
				
				auxSection._header = header;
				auxSection._miniTableView = miniTableView;
				
				tableViewData.push(auxSection);
				auxSection.add(row);
				
			}
			
			numRows ++;
			
			miniTableView.appendRow(miniRow);
			
		}
		
		if (typeof numRows != 'undefined') {
			adjustHeight(numRows);
		}
		
	}
	
	if (tableViewData.length > 0) { // Sólo en iOS
		
		tableView.data = tableViewData;
		
		for (i in tableViewData) {
			
			tableViewData[i]._miniTableView.setShadow({
				shadowOffset:{x:0,y:3},
				shadowOpacity:0.6,
				shadowRadius:3
			});
			
			tableViewData[i]._header.setShadow({
				shadowOffset:{x:0,y:3},
				shadowOpacity:0.6,
				shadowRadius:3
			});
			
		}
			
	}
	
	function adjustHeight(numRows) { // Sólo iOS
		miniTableView.height = miniRow.height * numRows - 1;
	}
	
	function loadArticle(row) {
		
		var article = require(Mods.articleWindow);
		
		article(row.data).open();
		
	}
	
	win.add(tableView);
	
	return win;
	
}
