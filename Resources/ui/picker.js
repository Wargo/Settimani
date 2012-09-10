
module.exports = function(current, from, to, f_callback, f_cancel) {
	
	if (Ti.Platform.osname === 'android') {
		
		var picker = Ti.UI.createPicker({
			type:Ti.UI.PICKER_TYPE_DATE,
			minDate:from,
			maxDate:to
		});
		
		picker.showDatePickerDialog({
			value:new Date(current),
			callback: function(e) {
				if (e.cancel) {
					f_cancel();
				} else {
					f_callback(e.value);
				}
			}
		});
		
	} else {
		
		var view = Ti.UI.createView({
			bottom:-300,
			layout:'vertical',
			height:216 + 40
		});
		
		var picker = Ti.UI.createPicker({
			type:Ti.UI.PICKER_TYPE_DATE,
			minDate:from,
			maxDate:to,
			value:new Date(current)
		});
		
		var cancel = Ti.UI.createButton({
			title:L('cancel', 'Cancelar'),
			style:Ti.UI.iPhone.SystemButtonStyle.BORDERED
		});
		
		var spacer = Ti.UI.createButton({
			systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		
		var done = Ti.UI.createButton({
			title:L('accept', 'Aceptar'),
			style:Ti.UI.iPhone.SystemButtonStyle.DONE
		});
		
		var toolbar = Ti.UI.iOS.createToolbar({
			items:[cancel, spacer, done]
		});
		
		view.add(toolbar);
		view.add(picker);
		
		picker.addEventListener('load', function(e) {
			currentValue = e.value;
		})
		
		picker.addEventListener('change', function(e) {
			currentValue = e.value;
		});
		
		cancel.addEventListener('click', function() {
			f_cancel(view);
		});
		
		done.addEventListener('click', function() {
			f_callback(currentValue, view);
		});

	}
	
	return view;
	
}
