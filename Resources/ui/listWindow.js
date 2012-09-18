
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
	
	var loader = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		message:L('loading', 'Cargando...')
	});
	win.add(loader);
	
	if (!Ti.App.Properties.getDouble('date', null)) {
		var MyWindow = require(Mods.configWindow);
		setTimeout(function() {
			MyWindow().open();
		}, 10);
	} else {
		loader.show();
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
	
	var page = 1;
	var lastDistance = 0;
	var updating = false;
	var lastRow = 0;
	
	var getData = require(Mods.bbdd);
	getData(putData, page);
	
	var tableView = Ti.UI.createTableView($$.tableView);
	
	tableView.addEventListener('scroll', function(e) {
		
		if (Ti.Platform.osname === 'android') {
			
			if (e.firstVisibleItem + e.visibleItemCount == e.totalItemCount && e.totalItemCount > 0 && !updating) {
				
				append();
				
			}
			
		} else if (Ti.Platform.osname === 'iphone') {
			
			var offset = e.contentOffset.y;
			var height = e.size.height;
			var total = offset + height;
			var theEnd = e.contentSize.height;
			var distance = theEnd - total;
			
			if (distance < lastDistance) {
				
				var nearEnd = theEnd * 0.95;
				
				if  (!updating && (total > nearEnd)) {
					
					append();
					
				}
				
			}
			
			lastDistance = distance;
			
		}
		
	});
		
	var loadingRow = Ti.UI.createTableViewRow($$.row);
	loadingRow.height = '40 dp';
	loadingRow.focusable = false;
	if (Ti.Platform.osname === 'android') {
		var loadingMore = Ti.UI.createLabel({
			text:L('loading', 'Cargando...')
		});
	} else {
		var loadingMore = Ti.UI.createActivityIndicator({
			style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
			message:L('loading', 'Cargando...')
		});
	}
	var loadingRowView = Ti.UI.createView();
	
	loadingRowView.add(loadingMore);
	loadingRow.add(loadingRowView);
	loadingMore.show();
	
	function append() {
		
		updating = true;
		tableView.appendRow(loadingRow);
		page += 1;
		getData(putData2, page);
		
	}
	
	function putData2(data, error) {
		var count = 0;
		if (Ti.Platform.osname === 'android') {
			for(var i = 0; i < tableView.data.length; i++) {
				for(var j = 0; j < tableView.data[i].rowCount; j++) {
					count ++;
				}
			}
			tableView.deleteRow(count - 1);
		} else {
			tableView.deleteRow(tableView.data.length);
		}	
		
		if (data) {
			setTimeout(function() {
				updating = false;
			}, 500);
		}
		
		putData(data, error);
		
	}
	
	var tableViewData = [];
	var fullData = [];
	
	function putData(data, error) {
		
		if (data === null) {
			//getData(putData);
			return false;
		}
		
		lastRow += data.length;
		
		for (i in data) {
			
			fullData.push(data[i]);
			
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
					loadArticle(e.index, fullData);
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
					loadArticle(e.row._i, data);
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
		
		win.add(tableView);
		
		loader.hide();
		
	}
	
	var article = require(Mods.articleWindow);
		
	function loadArticle(e, data) {
		
		e = parseInt(e);
		
		var auxData = [];
		
		if (data[e].header) {
			auxE = 0;
			auxData.push(data[e]);
			auxData.push(data[e + 1]);
			auxData.push(data[e + 2]);
		} else if (data[e].last) {
			auxE = 2;
			auxData.push(data[e - 2]);
			auxData.push(data[e - 1]);
			auxData.push(data[e]);
		} else {
			auxE = 1;
			auxData.push(data[e - 1]);
			auxData.push(data[e]);
			auxData.push(data[e + 1]);
		}
		
		var articleWin = article(auxData, auxE);
		
		if (Ti.Platform.osname === 'android') {
			articleWin.open();
		} else {
			nav.open(articleWin);
		}
			
	}
	
	return win;
	
}
