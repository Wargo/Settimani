
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var win = Ti.UI.createWindow({
		exitOnClose:true,
		backgroundColor:'#F2F2F2',
		layout:'vertical'
	});
	
	var header = Ti.UI.createView($$.header);
	var title = Ti.UI.createLabel($$.headerTitle);
	title.text = L('main_title', 'Lagravidanza.net');
	
	header.add(title);
	
	var image = Ti.UI.createImageView($$.imageHome);
	image.image = '/ui/images/home.png';
	
	/*
	 * Bloque recogida de fecha
	 */
	var insertDate = Ti.UI.createView($$.insertDate);
	
	if (Ti.Platform.osname === 'android') {
		insertDate.borderColor = '#999';
		insertDate.borderWidth = 1;
	} else {
		setTimeout(function() {
			insertDate.setShadow({
				shadowOffset:{x:0,y:3},
				shadowOpacity:0.5,
				shadowRadius:3
			});
		}, 100);
	}
	
	var intro = Ti.UI.createLabel({
		text:L('fill_preg_date', 'Introduce tu fecha de parto'),
		font:{fontWeight:'bold', fontSize:'16 dp'},
		color:'#2094c0',
		top:'10 dp'
	});
	insertDate.add(intro);
	
	var day = Ti.UI.createView($$.dateItem);
	var month = Ti.UI.createView($$.dateItem);
	var year = Ti.UI.createView($$.dateItem);
	
	day.left = 50;
	year.right = 50;
	
	insertDate.add(day);
	insertDate.add(month);
	insertDate.add(year);
	
	var dayText = Ti.UI.createLabel($$.dateItemText);
	var monthText = Ti.UI.createLabel($$.dateItemText);
	var yearText = Ti.UI.createLabel($$.dateItemText);
	
	dayText.text = L('day', 'Día');
	monthText.text = L('month', 'Mes');
	yearText.text = L('year', 'Año');
	
	day.add(dayText);
	month.add(monthText);
	year.add(yearText);
	/*
	 * Fin bloque recogida fecha
	 */
	
	var go = Ti.UI.createButton($$.button);
	go.top = '20 dp';
	go.title = L('go', 'Ir');
	go.enabled = false;
	
	if (Ti.Platform.osname != 'android') {
		go.backgroundColor = '#DDD';
	}
	
	var calcText = Ti.UI.createLabel({
		top:'20 dp',
		text:L('calcText', 'Si no conoces tu fecha de parto calcúlala aquí'),
		font:{fontWeigh:'bold', fontSize:'16 dp'},
		color:'#333',
		left:'20 dp',
		right:'20 dp',
		textAlign:'center'
	});
	
	var calcButton = Ti.UI.createView({
		top:'20 dp',
		width:'100 dp',
		height:'40 dp',
		borderRadius:15,
		borderWidth:1,
		borderColor:'#999',
		backgroundColor:'#FFF'
	});
	calcButton.add(Ti.UI.createImageView({image:'/ui/images/calc.png'}));
	
	win.add(header);
	win.add(image);
	win.add(insertDate);
	win.add(go);
	if (Ti.Platform.osname === 'android') {
		win.add(calcText);
		win.add(calcButton);
	} else {
		var aux = Ti.UI.createView({
			top:10
		});
		aux.add(calcText);
		aux.add(calcButton);
		win.add(aux);
	}
	
	return win;
	
}
