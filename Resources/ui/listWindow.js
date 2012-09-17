
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var win = Ti.UI.createWindow({
		backgroundImage:'ui/images/bg_list.png',
		exitOnClose:true
	});
	
	if (!Ti.App.Properties.getDouble('date', null)) {
		var MyWindow = require(Mods.configWindow);
		setTimeout(function() {
			MyWindow().open();
		}, 10);
	}
	
	if (Ti.Platform.osname === 'android') {
		win.orientationModes = [Ti.UI.PORTRAIT];
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
	
	var getData = require(Mods.bbdd);
	getData(putData);
	
	var tableView = Ti.UI.createTableView($$.tableView);
	
	var tableViewData = [];
	
	function putData(data) {
		
		for (i in data) {
			
			var title = Ti.UI.createLabel($$.rowTitle);
			title.text = data[i].title;
			
			var intro = Ti.UI.createLabel($$.rowIntro);
			intro.text = data[i].intro;
			
			var image = Ti.UI.createImageView($$.rowImage);
			image.image = '/ui/images/' + data[i].category + '.gif';
			
			var nextImage = Ti.UI.createImageView($$.nextImage);
			
			if (Ti.Platform.osname === 'android') {
				
				var row = Ti.UI.createTableViewRow($$.row);
				row.data = data[i];
				
				row.addEventListener('click', function(e) {
					loadArticle(e.index);
				});
				
				if (data[i].header) {
					
					var content = Ti.UI.createView($$.firstRow);
					row.header = data[i].header;
					
					nextImage.top = '45 dp';
					
				//} else if (typeof data[i + 1] != 'undefined' && data[i + 1].header) {
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
				miniRow._i = i;
				
				miniRow.addEventListener('click', function(e) {
					loadArticle(e.row._i);
				});
				
				miniRow.add(title);
				miniRow.add(intro);
				miniRow.add(image);
				
				if (data[i].header) {
					
					var row = Ti.UI.createTableViewRow($$.row);
					
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
					
					var miniTableViewShadow = Ti.UI.createView($$.miniTableView);
					miniTableViewShadow.zIndex = -10;
					row.add(miniTableViewShadow);
					
					var miniTableView = Ti.UI.createTableView($$.miniTableView);
					row.add(miniTableView);
					
					auxSection._miniTableViewShadow = miniTableViewShadow;
					
					tableViewData.push(auxSection);
					auxSection.add(row);
					
				}
				
				nextImage.top = nextImage.top + miniRow.height * numRows;
				row.add(nextImage);
				
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
				
				tableViewData[i]._miniTableViewShadow.setShadow({
					shadowOffset:{x:0,y:3},
					shadowOpacity:0.2,
					shadowRadius:3
				});
				
			}
			
		}
		
		function adjustHeight(numRows) { // Sólo iOS
			miniTableView.height = miniRow.height * numRows - 1;
			miniTableViewShadow.height = miniRow.height * numRows - 1;
		}
		
		function loadArticle(e) {
			
			var article = require(Mods.articleWindow);
			//var articleWin = article(row.data);
			var articleWin = article(data, e);
			
			if (Ti.Platform.osname === 'android') {
				articleWin.open();
			} else {
				nav.open(articleWin);
			}
			
		}
		
		win.add(tableView);
	
	}
	
	return win;
	
}
