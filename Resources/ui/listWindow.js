
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function(type) {
	
	var tableViewBottom = 65;
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#F2F2F2',
		backgroundImage:'ui/images/bg_list.png'
	});
	
	var loader = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		message:L('connecting'),
		color:'#999',
		cancelable:true
	});
	win.add(loader);
	
	if (Ti.Platform.osname != 'android') {
		var todayButton = Ti.UI.createButtonBar($$.headerButton);
		todayButton.labels = [L('today', 'Hoy')];
	} else {
		var todayButton = Ti.UI.createButton($$.headerButton);
		todayButton.title = L('today', 'Hoy');
	}
	
	todayButton.addEventListener('click', function() {
		var today = new Date();
		var date = new Date(Ti.App.Properties.getDouble('date'));
		var diff = date.getTime() - today.getTime();
		var week = 40 - Math.ceil(diff/(1000 * 60 * 60 * 24 * 7));
		
		if (type === 'tips') {
			difference = 5;
		} else {
			difference = 0;
		}
		
		if (week > 0) {
			if (Ti.Platform.osname != 'android') {
				tableView.scrollToIndex(week - difference, {position:Ti.UI.iPhone.TableViewScrollPosition.TOP});
			} else {
				var cont = 0;
				for (var i = 0; i < tableView.data.length; i++) {
					
					if (i < week - difference) {
						for (var j = 0; j < tableView.data[i].rowCount; j++) {
							cont ++;
						}
						cont ++; // por el header
					}
				}
				tableView.scrollToIndex(cont);
			}
		}
		
	});
	
	if (type == 'all') {
		var titleWin = L('main_title');
	} else {
		var titleWin = L('tab_title', 'Consejos');
	}
	
	if (Ti.Platform.osname === 'android') {
		win.orientationModes = [Ti.UI.PORTRAIT];
		var header = Ti.UI.createView($$.header);
		var title = Ti.UI.createLabel($$.headerTitle);
		title.text = titleWin;
		
		header.add(title);
		win.add(header);
		
		header.add(todayButton);
	} else {
		win.barImage = '/ui/images/bg_header.png';
		win.title = titleWin;
		
		win.rightNavButton = todayButton;
	}
	
	var page = 1;
	var lastDistance = 0;
	var updating = false;
	var lastRow = 0;
	
	var getData = require(Mods.bbdd);
	win.addEventListener('open', function() {
		if (type == 'all') {
			getData(putData, page, 0, loader);
		} else {
			getData(putData, page, 1, loader);
		}
		loader.show();
	});
	
	var tableView = Ti.UI.createTableView($$.tableView);
	
	win._tableView = tableView;
	
	/*
	tableView.addEventListener('scroll', function(e) {
		
		if (Ti.Platform.osname === 'android') {
			
			if (e.firstVisibleItem + e.visibleItemCount == e.totalItemCount && e.totalItemCount > 0 && updating === false) {
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
	*/
		
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
		if (updating === false) {
			loader.show();
			updating = true;
			tableView.appendRow(loadingRow);
			page += 1;
			if (type == 'all') {
				getData(putData, page, false, loader);
			} else {
				getData(putData, page, true, loader);
			}
		}
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
				loader.hide();
			}, 3000);
		}
		
		putData(data, error);
		
	}
	
	var tableViewData = [];
	var fullData = [];
	
	function putData(data, error) {
		
		if (error) {
			Ti.UI.createAlertDialog({
				title:L('errorTitle'),
				message:error,
				ok:'Ok'
			}).show();
			
			var reload = Ti.UI.createView({
				width:'100dp'
			});
			reload.add(Ti.UI.createLabel({
				text:L('reload'),
				right:0,
				font:{fontSize:'18dp'}
			}));
			reload.add(Ti.UI.createImageView({
				image:'/ui/images/reload.png',
				left:0,
				width:'20dp'
			}));
			
			loader.hide();
			win.add(reload);
			
			reload.addEventListener('click', function() {
				getData(putData, 1, false, loader);
				win.remove(reload);
				loader.show();
			});
			
			return;
		}
		
		loader.message = L('generating');

		if (data.length === 1) {
			
			if (tableView.data.length < 1) {
				var noDataRow = Ti.UI.createTableViewRow({
					style:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
					height:'200dp'
				});
				var noDataView = Ti.UI.createView({
					borderColor:'#AAA',
					borderRadius:10,
					borderWidth:1,
					left:'10dp',
					right:'10dp',
					top:'80dp',
					bottom:'10dp',
					backgroundColor:'#FFF'
				});
				noDataView.add(Ti.UI.createLabel({
					text:L('soon', 'Próximamente')
				}));
				noDataRow.add(noDataView);
				tableView.appendRow(noDataRow);
				win.add(tableView);
			}
			loader.hide();
			return false;
		}
		
		if (data === null) {
			loader.hide();
			return false;
		}
		
		lastRow += data.length;
		var getRows = require(Mods.rows);
		
		if (type == 'all') {
			Ti.App.checkboxes1 = getRows(fullData, data, tableView, tableViewData, win);
		} else {
			Ti.App.checkboxes2 = getRows(fullData, data, tableView, tableViewData, win);
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
		
		tableView.bottom = tableViewBottom;
		win.add(tableView);
		
		loader.hide();
		
	}
	
	// require AdMob
	var Admob = require('ti.admob');
	
	if (Ti.Platform.osname === 'android') {
	
		// then create an adMob view
		var adMobView = Admob.createView({
		    publisherId:"a150b48b3d51124",
		    testing:false, // default is false
		    //top: 10, //optional
		    //left: 0, // optional
		    //right: 0, // optional
		    bottom: '65dp', // optional
		    adBackgroundColor:"FF8855", // optional
		    backgroundColorTop: "738000", //optional - Gradient background color at top
		    borderColor: "#000000", // optional - Border color
		    textColor: "#000000", // optional - Text color
		    urlColor: "#00FF00", // optional - URL color
		    linkColor: "#0000FF", //optional -  Link text color
			keywords: L('keywords'),
			gender: 'female',
		    zIndex:999
		});
		
		
		//listener for adReceived
		adMobView.addEventListener(Admob.AD_RECEIVED, function(){
		   // alert("ad received");
		   Ti.API.info("ad received");
		   tableView.bottom = '120dp';
		});
		
		//setTimeout(function() {
		//todayButton.addEventListener('click', function() {
			//adMobView.requestAd();
		//});
		//}, 5000);
		
		//listener for adNotReceived
		adMobView.addEventListener(Admob.AD_NOT_RECEIVED, function(){
		    //alert("ad not received");
			Ti.API.info("ad not received");
			tableView.bottom = '65dp';
			//adMobView.requestAd();
		});
		
		win.add(adMobView);
		
	} else { // iOS
		
		var product_id = 'net.artvisual.settimani.all_content';
		
		if (Ti.App.Properties.getBool('buy_' + product_id, false) == false) {
		
			var ad = Admob.createView({
			    bottom: 65, left: 0,
			    width: 320, height: 50,
			    publisherId: 'a150b49ef173c47', // You can get your own at http: //www.admob.com/
			    //adBackgroundColor: 'black',
			    testing: false,
			    //dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
			    gender: 'female',
			    //location: COORDS,
				keywords: L('keywords'),
			    zIndex:999
			});
			ad.addEventListener('didReceiveAd', function() {
			    //alert('Did receive ad!');
			    tableViewBottom = 115;
			    tableView.animate({bottom: 115});
			});
			ad.addEventListener('didFailToReceiveAd', function() {
			    //alert('Failed to receive ad!');
			    tableViewBottom = 65;
			    tableView.animate({bottom: 65});
			});
			ad.addEventListener('willPresentScreen', function() {
			    //alert('Presenting screen!');
			});
			ad.addEventListener('willDismissScreen', function() {
			    //alert('Dismissing screen!');
			});
			ad.addEventListener('didDismissScreen', function() {
			    //alert('Dismissed screen!');
			});
			ad.addEventListener('willLeaveApplication', function() {
			    //alert('Leaving the app!');
			});
			
			win._adv = ad;
			win.add(ad);
			
		}
		
	}
	
	return win;
	
}
