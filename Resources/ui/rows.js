
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}
	
module.exports = function(fullData, data, tableView, tableViewData, win) {
	
	var checkboxes = [];
	
	var arrayRows = [];
	
	for (i in data) {
		
		fullData.push(data[i]);
				
		var title = Ti.UI.createLabel($$.rowTitle);
		title.text = data[i].title;
		
		var intro = Ti.UI.createLabel($$.rowIntro);
		intro.text = data[i].intro;
		
		var image = Ti.UI.createImageView($$.rowImage);
		image.image = '/ui/images/' + data[i].category + '.png';
		
		var nextImage = Ti.UI.createImageView($$.nextImage);
		
		var checkbox = Ti.UI.createView($$.checkbox);
		
		if (Ti.App.Properties.getBool('tip_' + data[i].external_id, false)) {
			checkbox.backgroundImage = '/ui/images/checked.png';
		} else {
			checkbox.backgroundImage = '/ui/images/unchecked.png';
		}
		
		checkbox._id = data[i].external_id;
		checkboxes.push(checkbox);
		
		var fruit = Ti.UI.createImageView($$.rowImage);
		fruit.image = data[i].image;
		
		var forDads = Ti.UI.createLabel($$.tipFor);
		var forMoms = Ti.UI.createLabel($$.tipFor);
		forDads.text = L('for_dads', 'Padres');
		forMoms.text = L('for_moms', 'Madres');
		
		if (Ti.Platform.osname === 'android') {
			
			//data[i].header = 'no tiene header';
			
			var row = Ti.UI.createTableViewRow($$.row);
			row.data = data[i];
			
			row.addEventListener('click', function(e) {
				if (e.source.backgroundImage) {
					if (e.source.backgroundImage == '/ui/images/unchecked.png') {
						e.source.backgroundImage = '/ui/images/checked.png';
						Ti.App.Properties.setBool('tip_' + e.row.data.external_id, true);
					} else {
						e.source.backgroundImage = '/ui/images/unchecked.png';
						Ti.App.Properties.setBool('tip_' + e.row.data.external_id, false);
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

			if (data[i].category == 'tips_dad') {
				content.add(checkbox);
				content.add(forDads);
				content.backgroundColor = '#EEEEFF';
			} else if (data[i].category == 'tips_mom') {
				content.add(checkbox);
				content.add(forMoms);
				content.backgroundColor = '#FFEEEE';
			} else if (data[i].category == 'fruit') {
				content.add(fruit);
			} else {
				content.add(image);
			}
			
			row.add(nextImage);
			row.add(content);
			
			//tableView.appendRow(row); // Lo hago de forma general
			
			arrayRows.push(row);
			
		} else {
			
			var miniRow = Ti.UI.createTableViewRow($$.miniRow);
			miniRow.data = data[i];
			miniRow._i = i;
			
			miniRow.addEventListener('click', function(e) {
				if (e.source.backgroundImage) {
					if (e.source.backgroundImage == '/ui/images/unchecked.png') {
						e.source.backgroundImage = '/ui/images/checked.png';
						Ti.App.Properties.setBool('tip_' + e.row.data.external_id, true);
					} else {
						e.source.backgroundImage = '/ui/images/unchecked.png';
						Ti.App.Properties.setBool('tip_' + e.row.data.external_id, false);
					}
				} else {
					loadArticle(e.row._i, data);
				}
			});
			
			miniRow.add(title);
			miniRow.add(intro);
			
			if (data[i].category == 'tips_dad') {
				miniRow.add(checkbox);
				miniRow.add(forDads);
				miniRow.backgroundColor = '#EEEEFF';
			} else if(data[i].category == 'tips_mom') {
				miniRow.add(checkbox);
				miniRow.add(forMoms);
				miniRow.backgroundColor = '#FFEEEE';
			} else if (data[i].category == 'fruit') {
				miniRow.add(fruit);
			} else {
				miniRow.add(image);
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

			if (typeof numRows == 'undefined') {
				var numRows = 0;
			}
			nextImage.top = nextImage.top + miniRow.height * numRows;
			row.add(nextImage);
	
			numRows ++;
			miniTableView.appendRow(miniRow);
			
		}
		
	}
	
	
	if (typeof numRows != 'undefined') { // ios
		adjustHeight(numRows);
	} else { // android
		tableView.appendRow(arrayRows);
	}
	
	function adjustHeight(numRows) { // Sólo iOS
		miniTableView.height = miniRow.height * numRows - 1;
		miniTableViewShadow.height = miniRow.height * numRows - 1;
	}
	
	var article = require(Mods.articleWindow);
	
	if (Ti.Platform.osname != 'android') {
		var loaderWindow = Ti.UI.createView({
			backgroundColor:'#9333',
			zIndex:1000,
			opacity:0
		});
		var l = Ti.UI.createActivityIndicator({
			message:L('loading_itunes'),
			color:'#FFF'
		});
		l.show();
		loaderWindow.add(l);
		win.add(loaderWindow);
	}
	
	function loadArticle(e, data) {
		
		e = parseInt(e);
		
		var product_id = 'net.artvisual.settimani.all_content';
		
		if (e > 90 && Ti.Platform.osname != 'android' && Ti.App.Properties.getBool('buy_' + product_id, false) == false) {
			
			var Storekit = require('ti.storekit');
		
			var dialog = Ti.UI.createAlertDialog({
				title:L('pay_title'),
				message:L('pay_text'),
				ok:L('ok')
			});
			dialog.show();
		
			dialog.addEventListener('click', function() {
				loaderWindow.opacity = 1;
				Storekit.requestProducts([product_id], function (evt) {
					//alert(evt);
					Ti.API.info(evt);
					if (!evt.success) {
						alert('ERROR: We failed to talk to Apple!');
					}
					else if (evt.invalid) {
						alert('ERROR: We requested an invalid product!');
					}
					else {
						success(evt.products[0]);
					}
				});
			});
			
			function success(product) {

				Ti.API.info(product);
				Storekit.purchase(product, function (evt) {
					switch (evt.state) {
						case Storekit.FAILED:
							if (evt.cancelled) {
								//alert('Purchase cancelled');
							} else {
								alert('ERROR: Buying failed! ' + evt.message);
							}
							loaderWindow.opacity = 0;
							break;
						case Storekit.PURCHASED:
						case Storekit.RESTORED:
							//alert('Thanks!');
							Ti.App.Properties.setBool('buy_' + product.identifier, true);
							loaderWindow.opacity = 0;
							break;
					}
				});

			}
			
			return;
			
		}
		
		var auxData = [];
		
		var x = e;
		while (!data[x].header) {
			x --;
		}
		var first = x;
		
		var x = e;
		while (!data[x].last) {
			x ++;
		}
		var last = x;
		
		var auxE = 0;
		var cont = 0;
		for (i = first; i <= last; i ++) {
			if (i != e) {
				cont ++;
			} else {
				auxE = cont;
			}
			auxData.push(data[i]);
		}
		
		var articleWin = article(auxData, auxE, data[first].header);
		
		if (Ti.Platform.osname === 'android') {
			articleWin.open();
		} else {
			win._nav.open(articleWin);
		}
		
	}

	return checkboxes;
	
}