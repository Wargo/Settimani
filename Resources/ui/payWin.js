
var Mods = require('/pathMods');
var $$ = require(Mods.styles_ios);
var Storekit = require('ti.storekit');

module.exports = function(product_id, f_callback) {
	
	var win = Ti.UI.createWindow({
		backgroundImage:'ui/images/bg_list.png',
		height:Ti.Platform.displayCaps.platformHeight,
		top:Ti.Platform.displayCaps.platformHeight
	});
	
	var shadow = Ti.UI.createView($$.miniTableView);
	shadow.zIndex = -10;
	shadow.bottom = '150dp';
	win.add(shadow);
	
	shadow.addEventListener('postlayout', function() {
		shadow.setShadow({
			shadowOffset:{x:0,y:3},
			shadowOpacity:0.2,
			shadowRadius:3
		});
	});
	
	var view = Ti.UI.createScrollView($$.miniTableView);
	view.bottom = '150dp';
	view.layout = 'vertical';
	win.add(view);
	
	var title = Ti.UI.createLabel($$.articleTitle);
	title.text = L('pay_title');
	
	var intro = Ti.UI.createLabel($$.articleIntro);
	intro.text = L('pay_text');
	
	var description = Ti.UI.createLabel($$.articleDescription);
	description.text = L('pay_list');
	
	view.add(title);
	view.add(intro);
	view.add(description);
	
	var ok = Ti.UI.createButton($$.button);
	ok.title = L('ok');
	ok.bottom = '40dp';
	ok.left = '50dp';

	var cancel = Ti.UI.createButton($$.button);
	cancel.title = L('cancel');
	cancel.bottom = '40dp';
	cancel.right = '50dp';
	cancel.backgroundColor = '#aa3346';
	
	cancel.addEventListener('click', function() {
		win.close({top:500});
	});
	
	win.add(ok);
	win.add(cancel);
	
	var miniLoader = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		message:L('loading_itunes'),
		bottom:'50dp'
	});
	win.add(miniLoader);
	
	var product = null;
	ok.opacity = cancel.opacity = 0;
	miniLoader.show();
	
	ok.addEventListener('click', function() {
		miniLoader.show();
		ok.opacity = cancel.opacity = 0;
		success(product);
	});
	
	Storekit.requestProducts([product_id], function (evt) {
		Ti.API.info(evt);
		if (!evt.success) {
			alert('ERROR: We failed to talk to Apple!');
		}
		else if (evt.invalid) {
			alert('ERROR: We requested an invalid product!');
		}
		else {
			//success(evt.products[0]);
			product = evt.products[0];
			ok.opacity = cancel.opacity = 1;
			miniLoader.hide();
		}
	});
	
	function success(product) {

		Ti.API.info(product);
		Storekit.purchase(product, function (evt) {
			switch (evt.state) {
				case Storekit.FAILED:
					if (evt.cancelled) {
						//alert('Purchase cancelled');
					} else {
						alert(evt.message);
					}
					ok.opacity = cancel.opacity = 1;
					miniLoader.hide();
					break;
				case Storekit.PURCHASED:
				case Storekit.RESTORED:
					Ti.App.Properties.setBool('buy_' + product.identifier, true);
					f_callback();
					win.close({top:Ti.Platform.displayCaps.platformHeight});
					break;
			}
		});

	}
	
	return win;
	
}
