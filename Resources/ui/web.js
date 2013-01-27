
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

var Admob = require('ti.admob');

module.exports = function(url, title) {
	
	var win = Ti.UI.createWindow($$.win);
	
	if  (Ti.Platform.osname != 'android') {
		win.height = win.top = Ti.Platform.displayCaps.platformHeight;
	} else {
		win.backgroundColor = 'white';
		win.exitOnClose = false;
		win.fullscreen = true;
		win.navBarHidden = true;
		win.modal = true;
	}
	
	var header = Ti.UI.createView($$.header);
	
	var logo = Ti.UI.createLabel({
		text:title,
		color:'#FFF',
		font:{fontSize:'20dp', fontWeight:'bold'}
	});
	
	var close = Ti.UI.createButtonBar({
		labels:['Cerrar'],
		right:10,
		style:Ti.UI.iPhone.SystemButtonStyle.BAR,
		backgroundColor:'#198BB6'
	});
	close.addEventListener('click', function() {
		win.close({top: Ti.Platform.displayCaps.platformHeight});
	});
	
	header.add(logo);
	
	var webView = Ti.UI.createWebView({
		url:url,
		top:'50dp',
		bottom:'35dp'
	});
	
	var loader = Ti.UI.createActivityIndicator({
		cancelable:true
	});
	
	if (Ti.Platform.osname != 'android') {
		header.add(close);
		webView.top = 44;
	} else {
		loader.message = L('connecting');
	}
	
	webView.addEventListener('load', function() {
		loader.hide();
		
		if (!webView.canGoBack()) {
			back.enabled = false;
		} else {
			back.enabled = true;
		}
		if (!webView.canGoForward()) {
			fwd.enabled = false;
		} else {
			fwd.enabled = true;
		}
	});
	
	var bottomBar = Ti.UI.createView({
		backgroundColor:'#000',
		height:'35dp',
		bottom:0
	});
	
	win.addEventListener('open', function() {
		win.add(header);
		win.add(webView);
		win.add(bottomBar);
	});
	
	bottomBar.add(loader);
	
	var back = Ti.UI.createButton({
		backgroundImage:'/ui/images/back.png',
		left:'10dp',
		width:'25dp',
		height:'25dp',
		enabled:false,
		backgroundDisabledImage:'/ui/images/disabled_back.png'
	});
	var fwd = Ti.UI.createButton({
		backgroundImage:'/ui/images/fwd.png',
		left:'60dp',
		width:'25dp',
		height:'25dp',
		enabled:false,
		backgroundDisabledImage:'/ui/images/disabled_fwd.png'
	});
	var reload = Ti.UI.createButton({
		backgroundImage:'/ui/images/reload_web.png',
		right:'10dp',
		width:'25dp',
		height:'25dp'
	});
	
	bottomBar.add(back);
	bottomBar.add(fwd);
	bottomBar.add(reload);
	
	back.addEventListener('click', function() {
		if (webView.canGoBack()) {
			webView.goBack();
		}
	});
	fwd.addEventListener('click', function() {
		if (webView.canGoForward()) {
			webView.goForward();
		}
	});
	reload.addEventListener('click', function() {
		webView.reload();
	});
	
	webView.addEventListener('beforeload', function() {
		loader.show();
	});
	
	/*
	 * admob
	 */
	if (Ti.Platform.osname === 'android') {

		// then create an adMob view
		var adMobView = Admob.createView({
			publisherId:"a150b48b3d51124",
			testing:false, // default is false
			//top: 10, //optional
			//left: 0, // optional
			//right: 0, // optional
			bottom: '35dp', // optional
			adBackgroundColor:"FF8855", // optional
			backgroundColorTop: "738000", //optional - Gradient background color at top
			borderColor: "#000000", // optional - Border color
			textColor: "#000000", // optional - Text color
			urlColor: "#00FF00", // optional - URL color
			linkColor: "#0000FF", //optional -  Link text color
			keywords: L('keywords'),
			gender: 'female',
			zIndex:999,
			_scrollView:webView
		});
		
		
		//listener for adReceived
		adMobView.addEventListener(Admob.AD_RECEIVED, function(e){
		   // alert("ad received");
			Ti.API.info("ad received");
			e.source._scrollView.bottom = '85dp';
		});
		
		//listener for adNotReceived
		adMobView.addEventListener(Admob.AD_NOT_RECEIVED, function(e){
		    //alert("ad not received");
			Ti.API.info("ad not received");
			e.source._scrollView.bottom = '35dp';
			//adMobView.requestAd();
		});
		
		win.add(adMobView);
		
	} else { // iOS
		
		var ad = Admob.createView({
			bottom: '35dp', left: 0,
			width: 320, height: 50,
			publisherId: 'a150b49ef173c47', // You can get your own at http: //www.admob.com/
			//adBackgroundColor: 'black',
			testing: false,
			//dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
			gender: 'female',
			//location: COORDS,
			keywords: L('keywords'),
			zIndex:999,
			_scrollView:webView
		});
		ad.addEventListener('didReceiveAd', function(e) {
			//alert('Did receive ad!');
			e.source._scrollView.animate({bottom: '85dp'});
		});
		ad.addEventListener('didFailToReceiveAd', function(e) {
		    //alert('Failed to receive ad!');
		    e.source._scrollView.animate({bottom: '35dp'});
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
		
		win.add(ad);
		
	}
	
	return win;
	
}
