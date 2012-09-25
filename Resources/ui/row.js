
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}
	
module.exports = function(fullData, data, i, tableView, tableViewData) {
	
	fullData.push(data[i]);
			
	var title = Ti.UI.createLabel($$.rowTitle);
	title.text = data[i].title;
	
	var intro = Ti.UI.createLabel($$.rowIntro);
	intro.text = data[i].intro;
	
	var image = Ti.UI.createImageView($$.rowImage);
	image.image = '/ui/images/' + data[i].category + '.gif';
	
	var nextImage = Ti.UI.createImageView($$.nextImage);
	
	var checkbox = Ti.UI.createView($$.checkbox);
	
	if (Ti.App.Properties.getBool('tip_' + data[i].ID, false)) {
		checkbox.backgroundImage = '/ui/images/checked.png';
	} else {
		checkbox.backgroundImage = '/ui/images/unchecked.png';
	}
	
	checkbox._id = data[i].ID;
	Ti.App.checkboxes.push(checkbox);
	
	if (Ti.Platform.osname === 'android') {
		
		var row = Ti.UI.createTableViewRow($$.row);
		row.data = data[i];
		
		row.addEventListener('click', function(e) {
			if (e.source.backgroundImage) {
				if (e.source.backgroundImage == '/ui/images/unchecked.png') {
					e.source.backgroundImage = '/ui/images/checked.png';
					Ti.App.Properties.setBool('tip_' + e.row.data.ID, true);
				} else {
					e.source.backgroundImage = '/ui/images/unchecked.png';
					Ti.App.Properties.setBool('tip_' + e.row.data.ID, false);
				}
			} else {
				loadArticle(e.index, fullData);
			}
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
		if (data[i].category != 'tip') {
			content.add(image);
		} else {
			content.add(checkbox);
		}
		
		row.add(nextImage);
		row.add(content);
		
		tableView.appendRow(row);
		
	} else {
	
		var miniRow = Ti.UI.createTableViewRow($$.miniRow);
		miniRow.data = data[i];
		miniRow._i = i;
		
		miniRow.addEventListener('click', function(e) {
			if (e.source.backgroundImage) {
				if (e.source.backgroundImage == '/ui/images/unchecked.png') {
					e.source.backgroundImage = '/ui/images/checked.png';
					Ti.App.Properties.setBool('tip_' + data[i].ID, true);
				} else {
					e.source.backgroundImage = '/ui/images/unchecked.png';
					Ti.App.Properties.setBool('tip_' + data[i].ID, false);
				}
			} else {
				loadArticle(e.row._i, data);
			}
		});
		
		miniRow.add(title);
		miniRow.add(intro);
		if (data[i].category != 'tip') {
			miniRow.add(image);
		} else {
			miniRow.add(checkbox);
		}
		
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

	function adjustHeight(numRows) { // Sólo iOS
		miniTableView.height = miniRow.height * numRows - 1;
		miniTableViewShadow.height = miniRow.height * numRows - 1;
	}
	
}