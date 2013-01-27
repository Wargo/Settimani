
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

var Admob = require('ti.admob');
var MyWeb = require(Mods.web);

module.exports = function(data, x, headerText) {
	
	var current = data[x];
	
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
	
	var loader = Ti.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
		message:L('loading', 'Cargando...')
	});
	win.add(loader);
	
	if (Ti.Platform.osname === 'android') {
		win.orientationModes = [Ti.UI.PORTRAIT];
		var header = Ti.UI.createView($$.header);
		var titleWin = Ti.UI.createLabel($$.headerTitle);
		titleWin.text = headerText;
		
		header.add(titleWin);
		win.add(header);
		
		var prev = Ti.UI.createButton($$.headerButton);
		var next = Ti.UI.createButton($$.headerButton);
		prev.right = '40 dp';
		prev.width = next.width = '30 dp';
		prev.title = '<';
		next.title = '>';
		
		prev.addEventListener('click', function() {
			if (data[scrollableView.currentPage - 1]) {
				scrollableView.scrollToView(scrollableView.currentPage - 1);
			}
		});
		next.addEventListener('click', function() {
			if (data[scrollableView.currentPage + 1]) {
				scrollableView.scrollToView(scrollableView.currentPage + 1);
			}
		});
		
		header.add(prev);
		header.add(next);
	} else {
		win.barImage = '/ui/images/bg_header.png';
		win.barColor = '#198BB6';
		
		var buttons = Ti.UI.createButtonBar({
			labels:['<', '>'],
			backgroundColor:'#198BB6',
			color:'#FFF',
			width:50,
			height:30
		});
		
		buttons.addEventListener('click', function(e) {
			if (e.index === 1) {
				if (data[scrollableView.currentPage + 1]) {
					scrollableView.scrollToView(scrollableView.currentPage + 1);
				}
			} else {
				if (data[scrollableView.currentPage - 1]) {
					scrollableView.scrollToView(scrollableView.currentPage - 1);
				}
			}
		});
		
		win.backButtonTitle = L('weeks', 'Semanas');
		
		win.title = headerText;
		
		win.rightNavButton = buttons;
	}
	
	var scrollableView = Ti.UI.createScrollableView({
		cacheSize:99
	});
	
	if (Ti.Platform.osname === 'android') {
		scrollableView.top = '50 dp';
	}
	
	function createViews(data) {
		
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
			description.text = current.text;
			
			if (current.urls) {
				
				var urls = Ti.UI.createView({
					layout:'vertical',
					height:Ti.UI.SIZE
				});
				
				urls.add(Ti.UI.createLabel({
					text:L('more_articles'),
					color:'#8EC7E8',
					font:{fontSize:'18dp', fontWeight:'bold'},
					top:'15dp',
					left:'5dp',
					right:'5dp',
					textAlign:'center'
				}));

				for (i in current.urls) {
					
					var url = Ti.UI.createView({
						top:'10dp',
						height:'40dp',
						left:'10dp',
						right:'10dp',
						borderWidth:1,
						borderColor:'#8EC7E8',
						_url:current.urls[i].url,
						_title:current.urls[i].title
					});
					url.add(Ti.UI.createView({
						height:'2dp',
						backgroundColor:'#8EC7E8',
						bottom:0,
						touchEnabled:false
					}));
					url.add(Ti.UI.createLabel({
						text:current.urls[i].title,
						touchEnabled:false,
						left:'10dp',
						color:'#999',
						right:'40dp',
						font:{fontSize:'16dp'}
					}));
					url.add(Ti.UI.createImageView({
						touchEnabled:false,
						image:'/ui/images/fwd.png',
						width:'10dp',
						right:'10dp'
					}));
					
					url.addEventListener('singletap', function(e) {
						if (Ti.Platform.osname != 'android') {
							MyWeb(e.source._url, e.source._title).open({top:0});
						} else {
							MyWeb(e.source._url, e.source._title).open();
						}
					});
					
					urls.add(url);
					
				}
				
			}
			
			var whiteView = Ti.UI.createView({
				height:'10 dp'
			});
			
			content.add(title);
			content.add(intro);
			content.add(image);
			content.add(description);
			if (current.urls) {
				content.add(urls);
			}
			content.add(whiteView);
		
			var scrollView = Ti.UI.createScrollView({
				contentHeight:'auto',
				showVerticalScrollIndicator:true
			});
			
			var nextImage = Ti.UI.createImageView($$.nextImage);
			var prevImage = Ti.UI.createImageView($$.prevImage);
			
			prevImage.addEventListener('click', function() {
				if (data[scrollableView.currentPage - 1]) {
					scrollableView.scrollToView(scrollableView.currentPage - 1);
				}
			});
			nextImage.addEventListener('click', function() {
				if (data[scrollableView.currentPage + 1]) {
					scrollableView.scrollToView(scrollableView.currentPage + 1);
				}
			});
			
			image.addEventListener('singletap', function(e) {
				var amplify = require(Mods.amplify);
				amplify(e.source);
			});
			
			scrollView.add(nextImage);
			scrollView.add(prevImage);
			scrollView.add(content);
			
			if (Ti.Platform.osname != 'android') {
				var contentShadow = Ti.UI.createView($$.articleContent);
				contentShadow.zIndex = -10;
				contentShadow.height = 'auto';
				scrollView.add(contentShadow);
				contentShadow.setShadow({
					shadowOffset:{x:0,y:2},
					shadowOpacity:0.2,
					shadowRadius:2
				});
			}
			
			var eachView = Ti.UI.createView();
			
			eachView.add(scrollView);
			
			scrollableView.addView(eachView);
			
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
					bottom: '0dp', // optional
					adBackgroundColor:"FF8855", // optional
					backgroundColorTop: "738000", //optional - Gradient background color at top
					borderColor: "#000000", // optional - Border color
					textColor: "#000000", // optional - Text color
					urlColor: "#00FF00", // optional - URL color
					linkColor: "#0000FF", //optional -  Link text color
					keywords: L('keywords'),
					gender: 'female',
					zIndex:999,
					_scrollView:scrollView
				});
				
				
				//listener for adReceived
				adMobView.addEventListener(Admob.AD_RECEIVED, function(e){
				   // alert("ad received");
					Ti.API.info("ad received");
					e.source._scrollView.bottom = '50dp';
				});
				
				//listener for adNotReceived
				adMobView.addEventListener(Admob.AD_NOT_RECEIVED, function(e){
				    //alert("ad not received");
					Ti.API.info("ad not received");
					e.source._scrollView.bottom = '0dp';
					//adMobView.requestAd();
				});
				
				eachView.add(adMobView);
				
			} else { // iOS
				
				var product_id = 'net.artvisual.settimani.all_content';
		
				if (Ti.App.Properties.getBool('buy_' + product_id, false) == false) {
				
					var ad = Admob.createView({
						bottom: 0, left: 0,
						width: 320, height: 50,
						publisherId: 'a150b49ef173c47', // You can get your own at http: //www.admob.com/
						//adBackgroundColor: 'black',
						testing: false,
						//dateOfBirth: new Date(1985, 10, 1, 12, 1, 1),
						gender: 'female',
						//location: COORDS,
						keywords: L('keywords'),
						zIndex:999,
						_scrollView:scrollView
					});
					ad.addEventListener('didReceiveAd', function(e) {
						//alert('Did receive ad!');
						e.source._scrollView.animate({bottom: 50});
					});
					ad.addEventListener('didFailToReceiveAd', function(e) {
					    //alert('Failed to receive ad!');
					    e.source._scrollView.animate({bottom: 0});
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
					
					eachView.add(ad);
					
				}
				
			}
			
		}
		
		loader.hide();
		
		scrollableView.currentPage = x;
		win.add(scrollableView);
	}
	
	setTimeout(function() {
		loader.show();
	}, 50);
	
	setTimeout(function() {
		createViews(data);
	}, 500);
	
	return win;
	
}
