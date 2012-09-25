
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
	
	var todayButton = Ti.UI.createButtonBar($$.headerButton);
	todayButton.labels = [L('today', 'Hoy')];
	
	todayButton.addEventListener('click', function() {
		var today = new Date();
		var date = new Date(Ti.App.Properties.getDouble('date'));
		var diff = date.getTime() - today.getTime();
		var week = 40 - Math.ceil(diff/(1000 * 60 * 60 * 24 * 7));
		
		alert((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
		
		if (week > 0) {
			tableView.scrollToIndex(week, {position:Ti.UI.iPhone.TableViewScrollPosition.TOP});
		}
		
		/*
		if (getRow(week, data)) {
			if (Ti.Platform.osname == 'android') {
				tableView.scrollToIndex(getRow(week, data));
			} else {
				tableView.scrollToIndex(getRow(week, data), {
					animated:true,
					position:Ti.UI.iPhone.TableViewScrollPosition.TOP
				});
			}
		}
		*/
	});
	
	if (Ti.Platform.osname === 'android') {
		win.orientationModes = [Ti.UI.PORTRAIT];
		var header = Ti.UI.createView($$.header);
		var title = Ti.UI.createLabel($$.headerTitle);
		title.text = L('main_title', 'Lagravidanza.net');
		
		header.add(title);
		win.add(header);
		
		header.add(todayButton);
	} else {
		win.barImage = '/ui/images/bg_header.png';
		win.title = L('main_title', 'Lagravidanza.net');
		
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
			return false;
		}
		
		lastRow += data.length;
		
		var getRows = require(Mods.rows);
		Ti.App.checkboxes1 = getRows(fullData, data, tableView, tableViewData, win);
		
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
		
		win.add(tableView);
		
		loader.hide();
		
	}
	
	return win;
	
	function getRow(num, data) {
		var cont = 0;
		var aux = 0;
		for (i in data) {
			if (data[i].header) {
				aux ++;
				if (Ti.Platform.osname == 'android') {
					cont ++; // Para que cuente los headers
				}
			}
			if (aux == num) {
				if (Ti.Platform.osname == 'android') {
					cont = cont - 1; // Para que muestre el header
				}
				return cont;
			}
			cont ++;
		}
	}
	
}
