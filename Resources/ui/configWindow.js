
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function() {
	
	var win = Ti.UI.createWindow({
		exitOnClose:true,
		backgroundColor:'#F2F2F2'
	});
	
	var mainView = Ti.UI.createView({
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
	
	var go = Ti.UI.createButton($$.button);
	go.top = '20 dp';
	go.title = L('go', 'Ir');
	go.enabled = false;
	
	if (Ti.Platform.osname != 'android') {
		go.backgroundColor = '#DDD';
	}
	
	if (Ti.App.Properties.getDouble('date', null)) {
		var auxDate = new Date(Ti.App.Properties.getDouble('date'));
		dayText.text = auxDate.getDate();
		monthText.text = auxDate.getMonth() + 1;
		yearText.text = auxDate.getFullYear();
		go.enabled = true;
		go.backgroundColor = '#33aa46';
	} else {
		dayText.text = L('day', 'Día');
		monthText.text = L('month', 'Mes');
		yearText.text = L('year', 'Año');
	}
	
	day.add(dayText);
	month.add(monthText);
	year.add(yearText);
	/*
	 * Fin bloque recogida fecha
	 */
	
	/*
	 * Calcular fecha
	 */
	var calcText = Ti.UI.createLabel({
		top:'30 dp',
		text:L('calcText', 'Si no conoces tu fecha de parto calcúlala aquí'),
		font:{fontWeigh:'bold', fontSize:'16 dp'},
		color:'#333',
		left:'20 dp',
		right:'20 dp',
		textAlign:'center'
	});
	
	var calcButton = Ti.UI.createView({
		top:'10 dp',
		width:'80 dp',
		height:'40 dp',
		borderRadius:15,
		borderWidth:1,
		borderColor:'#999',
		backgroundColor:'#FFF'
	});
	calcButton.add(Ti.UI.createImageView({image:'/ui/images/calc.png'}));
	
	calcButton.addEventListener('click', function() {
		
		var popupWhite = Ti.UI.createView({
			backgroundColor:'#FFF',
			opacity:0.3
		});
		win.add(popupWhite);
		
		var popup = Ti.UI.createView({
			left:'20 dp',
			right:'20 dp',
			top:'20 dp',
			bottom:Ti.Platform.osname === 'android' ? '350 dp' : '270 dp',
			borderRadius:10,
			backgroundColor:'#000',
			opacity:0.6
		});
		win.add(popup);
		
		var popupText = Ti.UI.createLabel({
			text:L('calculate_explain', 'Calcula la fecha de tu última regla para que podamos calcular la fecha de parto más aproximada posible.'),
			color:'#FFF',
			left:'40 dp',
			right:'40 dp',
			top:'40 dp'
		});
		win.add(popupText);
		
		var popupButton = Ti.UI.createButton($$.button);
		popupButton.title = L('calculate', 'Calcular');
		popupButton.top = '150 dp';
		win.add(popupButton);
		
		popupButton.addEventListener('click', function() {
			var pastDate = new Date();
			pastDate.setDate(myDate.getDate() - 300);
			
			var picker = require(Mods.picker);
			
			var calcPickerView = picker(new Date().getTime(), pastDate, new Date(), calcDone, calcCancel);
			
			if (Ti.Platform.osname != 'android') {
				win.add(calcPickerView);
				calcPickerView.animate({bottom:0});
			}
		});
		
		function calcDone(value, calcPickerView) {
			var newDate = new Date(value.getTime());
			newDate.setDate(newDate.getDate() + 7 * 42);
			
			win.remove(popup);
			win.remove(popupButton);
			win.remove(popupText);
			win.remove(popupWhite);
			pickerDone(newDate, calcPickerView);
		}
		
		function calcCancel(calcPickerView) {
			win.remove(popup);
			win.remove(popupButton);
			win.remove(popupText);
			win.remove(popupWhite);
			if (calcPickerView) {
				pickerCancel(calcPickerView);
			}
		}
		
	});
	/*
	 * fin calcular
	 */
	
	mainView.add(header);
	mainView.add(image);
	mainView.add(insertDate);
	mainView.add(go);
	
	if (Ti.Platform.osname === 'android') {
		mainView.add(calcText);
		mainView.add(calcButton);
	} else {
		calcText.top = 0;
		calcText.width = 200;
		calcText.left = 10;
		calcButton.top = 0;
		var aux = Ti.UI.createView({
			top:20,
			layout:'horizontal'
		});
		aux.add(calcText);
		aux.add(calcButton);
		mainView.add(aux);
	}
	
	/*
	 * funcionalidades
	 */
	day.addEventListener('click', function() {
		showPicker();
	});
	month.addEventListener('click', function() {
		showPicker();
	});
	year.addEventListener('click', function() {
		showPicker();
	});
	
	var myDate = new Date();
	myDate.setDate(myDate.getDate() + 300);

	function showPicker() {
		
		var picker = require(Mods.picker);
		var pickerView = picker(Ti.App.Properties.getDouble('date', new Date().getTime()), new Date(), myDate, pickerDone, pickerCancel);
		
		if (Ti.Platform.osname != 'android') {
			win.add(pickerView);
			pickerView.animate({bottom:0});
		}
		
	}
	
	function pickerDone(value, pickerView) {
		dayText.text = value.getDate();
		monthText.text = value.getMonth() + 1;
		yearText.text = value.getFullYear();
		
		Ti.App.Properties.setDouble('date', value.getTime());
		
		go.enabled = true;
		
		if (Ti.Platform.osname != 'android') {
			go.backgroundColor = '#33aa46';
			pickerView.animate({bottom:-300});
		}
	}
	
	function pickerCancel(pickerView) {
		if (pickerView) {
			pickerView.animate({bottom:-300});
		}
	}
	
	go.addEventListener('click', function() {
		
		win.close({top:'500 dp'});
		
	});
	
	win.add(mainView);
	
	return win;
	
}