
module.exports = function(from, to, f_callback) {
	
	var view = Ti.UI.createView({
		bottom:300,
		layout:'vertical'
	});
	
	var picker = Ti.UI.createPicker({
		type:Ti.UI.PICKER_TYPE_DATE,
		minDate:form,
		maxDate:to
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
	
	var toolbar = Ti.UI.createToolbar({
		items:[cancel, spacer, done]
	});
	
	view.add(toolbar);
	view.add(picker);
	
	cancel.addEventListener('click', function() {
		f_cancel();
	});
	
	cancel.addEventListener('click', function() {
		f_callback();
	});
	
	return view;
	
}
