
var Mods = require('/pathMods');

if (Ti.Platform.osname === 'android') {
	var $$ = require(Mods.styles_android);
} else {
	var $$ = require(Mods.styles_ios);
}

module.exports = function(hideImage) {
	
	var win = Ti.UI.createWindow({
		backgroundColor:'#F2F2F2',
		backgroundImage:'ui/images/bg_list.png'
	});
	
	var mainView = Ti.UI.createView({
		layout:'vertical'
	});
	
	var header = Ti.UI.createView($$.header);
	var title = Ti.UI.createLabel($$.headerTitle);
	title.text = L('config', 'Configuración');
	
	header.add(title);
	
	var image = Ti.UI.createImageView($$.imageHome);
	image.image = '/ui/images/home.png';
	
	/*
	 * Bloque recogida de fecha
	 */
	var insertDate = Ti.UI.createView($$.insertDate);
	
	if (Ti.Platform.osname === 'android') {
		win.orientationModes = [Ti.UI.PORTRAIT];
		insertDate.borderColor = '#999';
		insertDate.borderWidth = 1;
	} else {
		var insertDateShadow = Ti.UI.createView($$.insertDate);
		insertDateShadow.zIndex = -10;
		if (!hideImage) {
			insertDateShadow.top = 260;
		} else {
			insertDateShadow.top = 65;
		}
		
		setTimeout(function() {
			insertDateShadow.setShadow({
				shadowOffset:{x:0,y:3},
				shadowOpacity:0.2,
				shadowRadius:3
			});
		}, 100);
		
		win.add(insertDateShadow);
	}
	
	var intro = Ti.UI.createLabel({
		text:L('fill_preg_date', 'Introduce tu fecha de parto'),
		font:{fontWeight:'bold', fontSize:'16 dp'},
		color:'#2094C0',
		top:'10 dp'
	});
	
	var day = Ti.UI.createView($$.dateItem);
	var month = Ti.UI.createView($$.dateItem);
	var year = Ti.UI.createView($$.dateItem);
	
	if (Ti.Platform.osname === 'android') {
		day.left = '50 dp';
		year.right = '50 dp';
	} else {
		day.left = 50;
		year.right = 50;
	}
	
	insertDate.add(intro);
	insertDate.add(day);
	insertDate.add(month);
	insertDate.add(year);
	
	var dayText = Ti.UI.createLabel($$.dateItemText);
	var monthText = Ti.UI.createLabel($$.dateItemText);
	var yearText = Ti.UI.createLabel($$.dateItemText);
	
	var go = Ti.UI.createButton($$.button);
	go.title = L('go', 'Ir');
	go.enabled = false;
	
	if (Ti.Platform.osname != 'android') {
		//go.top = 360;
		go.top = 20;
		go.backgroundColor = '#DDD';
	} else {
		//go.top = '400 dp';
		go.top = '20 dp';
	}
	
	win.addEventListener('focus', function() {
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
	});
	
	day.add(dayText);
	month.add(monthText);
	year.add(yearText);
	/*
	 * Fin bloque recogida fecha
	 */
	
	/*
	 * Calcular fecha
	 */
	var calcText = Ti.UI.createLabel($$.calcText);
	
	var calcButton = Ti.UI.createView($$.calcButton);
	calcButton.add(Ti.UI.createImageView({image:'/ui/images/calc.png'}));
	
	var calc = Ti.UI.createView({
		height:'100 dp'
	});
	calc.add(calcText);
	calc.add(calcButton);
	
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
			height:'200 dp',
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
			top:'40 dp',
			font:{fontSize:'16 dp'}
		});
		win.add(popupText);
		
		var popupButton = Ti.UI.createButton($$.button);
		popupButton.title = L('calculate', 'Calcular');
		popupButton.top = '150 dp';
		win.add(popupButton);
		
		popupButton.addEventListener('click', function() {
			popupButton.hide();
			
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
	
	var deleteDataButton = Ti.UI.createButton($$.button);
	deleteDataButton.title = L('delete_button', 'Borrar contenido local');
	deleteDataButton.backgroundColor = '#CC0000';
	deleteDataButton.width = '250 dp';
	if (Ti.Platform.osname === 'android') {
		deleteDataButton.top = '50 dp';
	} else {
		deleteDataButton.top = '20 dp';
	}
	
	var deleteDataText = Ti.UI.createLabel($$.deleteDataText);
	
	deleteDataButton.addEventListener('click', function() {
		var confirm = Ti.UI.createAlertDialog({
			title:L('delete_data', '¿Borrar datos?'),
			message:L('msg_delete_data', '¿Seguro que deseas borrar todos los datos guardados en el dispositivo?'),
			buttonNames:[L('ok', 'Ok'), L('cancel', 'Cancelar')],
			cancel:1
		});
		
		confirm.show();
		
		confirm.addEventListener('click', function(e) {
			if (e.index === e.cancel || e.cancel === true) {
				return
			}
			Ti.App.Properties.removeProperty('date');
			
			var properties = Ti.App.Properties.listProperties();
			
			for (i in properties) {
				if (properties[i].substr(0,4) === 'bbdd' || properties[i].substr(0,4) === 'tip_') {
					Ti.App.Properties.removeProperty(properties[i]);
				}
			}
			
			setCheckboxes();

			Ti.UI.createAlertDialog({
				title:L('deleted_data', 'Datos borrados'),
				message:L('msg_deleted_data', 'Los datos han sido borrados correctamente'),
				ok:L('ok', 'Ok')
			}).show();
			Ti.App.win1.show();
			Ti.App.win2.hide();
			Ti.App.win3.hide();
			var confWin = require(Mods.configWindow);
			confWin(false).open();
		});
	});
	
	win.barImage = '/ui/images/bg_header.png';
	win.title = L('config', 'Configuración');
	
	mainView.add(header);
	if (!hideImage) {
		mainView.add(image);
		mainView.add(insertDate);
		mainView.add(go);
		mainView.add(calc);
	} else {
		mainView.add(insertDate);
		calc.top = 20;
		mainView.add(calc);
		mainView.add(deleteDataButton);
		mainView.add(deleteDataText);
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
		
		if (!hideImage) {
			win.close({top:'500 dp'});
		}
		
	});
	
	win.add(mainView);
	
	return win;
	
	function setCheckboxes() {
		for (i in Ti.App.checkboxes1) {
			if (Ti.App.Properties.getBool('tip_' + Ti.App.checkboxes1[i]._id, false)) {
				Ti.App.checkboxes1[i].backgroundImage = '/ui/images/checked.png';
			} else {
				Ti.App.checkboxes1[i].backgroundImage = '/ui/images/unchecked.png';
			}
		}
		for (i in Ti.App.checkboxes2) {
			if (Ti.App.Properties.getBool('tip_' + Ti.App.checkboxes2[i]._id, false)) {
				Ti.App.checkboxes2[i].backgroundImage = '/ui/images/checked.png';
			} else {
				Ti.App.checkboxes2[i].backgroundImage = '/ui/images/unchecked.png';
			}
		}
	}
	
}
