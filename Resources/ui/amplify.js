
module.exports = function(src) {
	
	if (Ti.Platform.osname === 'android') {
		
		var win = Ti.UI.createWindow({
			backgroundColor:'#000',
			exitOnClose:false,
			fullscreen:true,
			navBarHidden:true,
			modal:true
		});
		
	} else {
		
		var win = Ti.UI.createWindow({
			backgroundColor:'#000',
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
		image:src.image,
		width:'100%'
	});
	
	scrollView.add(image);
	
	win.open();
	
}
