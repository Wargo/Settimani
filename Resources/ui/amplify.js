
module.exports = function(src) {
	
	if (Ti.Platform.osname === 'android') {
		
		var win = Ti.UI.createWindow({
			backgroundImage:'ui/images/bg_list.png',
			exitOnClose:false,
			fullscreen:true,
			navBarHidden:true,
			modal:true
		});
		
	} else {
		
		var win = Ti.UI.createWindow({
			backgroundImage:'ui/images/bg_list.png'
		});
		
	}
	
	var scrollView = Ti.UI.createScrollView({
		contentHeight:'auto',
		contentWidth:'auto',
		showHorizontalScrollIndicator:false,
		showVerticalScrollIndicator:false
	});
	
	win.add(scrollView);
	
	var image = Ti.UI.createImageView({
		image:src,
		width:'100%'
	});
	
	scrollView.add(image);
	
	scrollView.add(Ti.UI.createLabel({text:'aaaaaa', color:'#FFF', top:0}));
	
	win.open();
	
}
