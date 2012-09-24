
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#F2F2F2',
		backgroundImage:'ui/images/bg_list.png'
	});
	
	var loader = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		message:L('loading', 'Cargando...'),
		color:'#999'
	});
	win.add(loader);
	
	loader.show();
	
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
		win.barImage = '/ui/images/bg_header.png';
		win.title = L('main_title', 'Lagravidanza.net');
		
		var todayButton = Ti.UI.createButtonBar($$.headerButton);
		todayButton.labels = [L('today', 'Hoy')];
		
		win.rightNavButton = todayButton;
	}
	
	var page = 1;
	var lastDistance = 0;
	var updating = false;
	var lastRow = 0;
	
	var getData = require(Mods.bbdd);
	getData(putData, page, true);
	
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
			text:L('loading', 'Cargando...'),
			color:'#999'
		});
	} else {
		var loadingMore = Ti.UI.createActivityIndicator({
			style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
			message:L('loading', 'Cargando...'),
			color:'#999'
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
		
		var row = require(Mods.row);
		
		for (i in data) {
			
			row(fullData, data, i, tableView);
			
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
			win._nav.open(articleWin);
		}
		
	}
	
	return win;
	
}
