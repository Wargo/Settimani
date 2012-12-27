
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function(url, title) {
	
	var win = Ti.UI.createWindow($$.win);
	win.top = Ti.Platform.displayCaps.platformHeight;
	
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
	
	if (Ti.Platform.osname != 'android') {
		header.add(close);
		webView.top = 44;
	}
	
	win.add(header);
	
	win.add(webView);
	
	var loader = Ti.UI.createActivityIndicator({
		cancelable:true
	});
	
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
	
	win.add(bottomBar);
	
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
	
	return win;
	
}
