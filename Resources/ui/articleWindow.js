
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function(data, x) {
	
	var current = data[x];
	
	var win = Ti.UI.createWindow({
		backgroundImage:'ui/images/bg_list.png',
		modal:true
	});
	
	if (Ti.Platform.osname === 'android') {
		win.navBarHidden = true;
		var header = Ti.UI.createView($$.header);
		var titleWin = Ti.UI.createLabel($$.headerTitle);
		titleWin.text = current.title;
		
		header.add(titleWin);
		win.add(header);
		
		var prev = Ti.UI.createButton($$.headerButton);
		var next = Ti.UI.createButton($$.headerButton);
		prev.right = '40 dp';
		prev.width = next.width = '30 dp';
		prev.title = '<';
		next.title = '>';
		
		prev.addEventListener('click', function() {
			scrollableView.currentPage --;
		});
		next.addEventListener('click', function() {
			scrollableView.currentPage ++;
		});
		
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
		
		todayButton.addEventListener('click', function(e) {
			if (e.value === 1) {
				scrollableView.currentPage ++;
			} else {
				scrollableView.currentPage --;
			}
		});
		
		win.backButtonTitle = L('weeks', 'Semanas');
		
		win.title = current.title;
		
		win.rightNavButton = todayButton;
	}
	
	var scrollableView = Ti.UI.createScrollableView();
	
	for (i in data) {
		var current = data[i];
		
		var content = Ti.UI.createView($$.articleContent);
		
		var title = Ti.UI.createLabel($$.articleTitle);
		title.text = current.title;
		
		var intro = Ti.UI.createLabel($$.articleIntro);
		intro.text = current.intro;
		
		var image = Ti.UI.createImageView($$.articleImage);
		image.image = current.image;
		
		var description = Ti.UI.createLabel($$.articleDescription);
		description.text = current.description;
		
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
			showVerticalScrollIndicator:true
		});
		
		if (Ti.Platform.osname === 'android') {
			scrollableView.top = '40 dp';
		} else {
			setTimeout(function() {
				content.setShadow({
					shadowOffset:{x:0,y:2},
					shadowOpacity:0.2,
					shadowRadius:2
				});
			}, 100);
		}
		
		var nextImage = Ti.UI.createImageView($$.nextImage);
		var prevImage = Ti.UI.createImageView($$.prevImage);
		
		prevImage.addEventListener('click', function() {
			scrollableView.currentPage --;
		});
		nextImage.addEventListener('click', function() {
			scrollableView.currentPage ++;
		});
		
		scrollView.add(nextImage);
		scrollView.add(prevImage);
		scrollView.add(content);
		
		scrollableView.addView(scrollView);
	}
	
	scrollableView.currentPage = x;
	
	scrollableView.addEventListener('scroll', function(e) {
		if (Ti.Platform.osname === 'android') {
			titleWin.text = data[scrollableView.currentPage].title;
		} else {
			win.title = data[scrollableView.currentPage].title;
		}
	});
	
	win.add(scrollableView);
	
	return win;
	
}
