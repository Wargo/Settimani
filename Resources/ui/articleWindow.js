
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function(data) {
	
	var win = Ti.UI.createWindow({
		backgroundImage:'ui/images/bg_list.png',
		modal:true
	});
	
	if (Ti.Platform.osname === 'android') {
		var header = Ti.UI.createView($$.header);
		var title = Ti.UI.createLabel($$.headerTitle);
		title.text = data.title;
		
		header.add(title);
		win.add(header);
		
		var prev = Ti.UI.createButton($$.headerButton);
		var next = Ti.UI.createButton($$.headerButton);
		prev.right = '40 dp';
		prev.width = next.width = '30 dp';
		prev.title = '<';
		next.title = '>';
		
		header.add(prev);
		header.add(next);
	} else {
		win.barImage = '/ui/images/bg_header.png';
		win.barColor = '#198BB6';
		
		var todayButton = Ti.UI.createButtonBar({
			labels:['<', '>'],
			backgroundColor:'#198BB6',
			color:'#FFF',
			width:50
		});
		
		win.backButtonTitle = L('weeks', 'Semanas');
		
		win.title = data.title;
		
		win.rightNavButton = todayButton;
	}
	
	var content = Ti.UI.createView($$.articleContent);
	
	var title = Ti.UI.createLabel($$.articleTitle);
	title.text = data.title;
	
	var intro = Ti.UI.createLabel($$.articleIntro);
	intro.text = data.intro;
	
	var image = Ti.UI.createImageView($$.articleImage);
	image.image = data.image;
	
	var description = Ti.UI.createLabel($$.articleDescription);
	description.text = data.intro + ' ' + data.intro + ' ' + data.intro + ' ' + data.intro + ' ' + data.intro;
	
	var whiteView = Ti.UI.createView({
		height:'10 dp'
	});
	
	content.add(title);
	content.add(intro);
	content.add(image);
	content.add(description);
	content.add(whiteView);

	var scrollView = Ti.UI.createScrollView({
		contentHeight:'auto',
		showVerticalScrollIndicator:true,
		top:'40 dp'
	});
	
	var nextImage = Ti.UI.createImageView($$.nextImage);
	var prevImage = Ti.UI.createImageView($$.prevImage);
	var tr = Ti.UI.create2DMatrix();
	tr = tr.scale(-1, 1);
	//tr.rotate(90);
	prevImage.transform = tr;
	
	scrollView.add(nextImage);
	scrollView.add(prevImage);
	scrollView.add(content);
	
	win.add(scrollView);
	
	return win;
	
}
