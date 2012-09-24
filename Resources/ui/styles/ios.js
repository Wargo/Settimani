
module.exports = {
	
	header: {
		backgroundImage:'/ui/images/bg_header.png',
		backgroundRepeat:true,
		height:44,
		top:0
	},
	
	headerTitle: {
		color:'#FFF',
		font:{fontSize:19, fontWeight:'bold'}
	},
	
	headerButton: {
		backgroundColor:'#198BB6',
		color:'#FFF',
		width:50,
		height:30
	},
	
	insertDate: {
		backgroundColor:'#FFF',
		borderRadius:5,
		right:10,left:10,top:10,
		height:100,
		top:20
	}, 
	
	dateItem: {
		bottom:20,
		width:60,
		height:30,
		borderRadius:5,
		borderColor:'#CCC',
		borderWidth:1
	},
	
	dateItemText: {
		color:'#666',
		fontWeight:'bold',
		font:{fontSize:18}
	},
	
	button: {
		width:100,
		height:40,
		borderRadius:5,
		borderColor:'#CCC',
		borderWidth:1,
		backgroundColor:'#33aa46',
		backgroundImage:'none',
		color:'#FFF',
		font:{fontSize:20, fontWeight:'bold'}
	},
	
	calcText: {
		top:10,
		right:100,
		text:L('calcText', 'Si no conoces tu fecha de parto calcúlala aquí'),
		font:{fontWeigh:'bold', fontSize:16},
		color:'#333',
		left:1,
		textAlign:'center'
	},
	
	calcButton: {
		right:10,
		top:10,
		width:80,
		height:40,
		borderRadius:15,
		borderWidth:1,
		borderColor:'#999',
		backgroundColor:'#FFF'
	},
	
	tableView: {
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		backgroundColor:'transparent',
		bottom:65
	},
	
	row: {
		backgroundColor:'transparent',
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	},
	
	miniRow: {
		height:100
	},
	
	miniTableView: {
		scrollable:false,
		backgroundColor:'#FFF',
		borderRadius:5,
		top:20,
		left:20,
		right:20,
		bottom:20
	},
	
	rowTitle: {
		color:'#FF6600',
		font:{fontWeight:'bold', fontSize:16},
		left:50,
		right:10,
		top:12,
		height:20
	},
	
	rowIntro: {
		color:'#333',
		font:{fontSize:14},
		left:50,
		right:10,
		top:35,
		height:50
	},
	
	rowImage: {
		width:50,
		left:0,
		top:25
	},
	
	nextImage: {
		width:25,
		right:7,
		top:45,
		zIndex:100,
		image:'/ui/images/next.png'
	},
	
	prevImage: {
		width:25,
		left:7,
		top:45,
		zIndex:100,
		image:'/ui/images/prev.png'
	},
	
	headerTableViewSection: {
		height:30,
		opacity:0.9,
		backgroundColor:'#8EC7E8'
	},
	
	headerTableViewText: {
		color:'#FFF',
		left:10,
		font:{fontWeight:'bold', fontSize:16},
		shadowColor:'#999',
		shadowOffset:{x:1,y:1}
	},
	
	articleContent: {
		layout:'vertical',
		left:20,
		top:15,
		bottom:20,
		right:20,
		height:Ti.UI.SIZE,
		backgroundColor:'#FFF',
		borderRadius:5
	},
	
	articleTitle: {
		top:10,
		left:20,
		right:20,
		color:'#FF6600',
		font:{fontWeight:'bold', fontSize:18},
		textAlign:'center'
	},
	
	articleImage: {
		top:10,
		left:20,
		right:20,
		width:240
	},
	
	articleIntro: {
		top:10,
		left:20,
		right:20,
		color:'#0060AC',
		font:{fontSize:14, fontWeight:'bold'}
	},
	
	articleDescription: {
		top:10,
		left:20,
		right:20,
		color:'#333',
		font:{fontSize:14}
	},
	
	tabs: {
		height:65,
		bottom:0,
		backgroundImage:'/ui/images/bg_tabs.png',
		zIndex:100
	},
	
	tabButton: {
		width:100,
		height:60,
		layout:'vertical',
		_selected:false
	},
	
	tabImageBorder: {
		width:60,
		height:35,
		borderColor:'#CCC',
		borderWidth:1,
		borderRadius:10,
		backgroundImage:'/ui/images/bg_tabs.png',
	},
	
	tabImage: {
		top:5,
		width:30,
		height:30
	},
	
	tabButtonText: {
		font:{fontSize:15},
		color:'#999'
	},
	
	checkbox: {
		width:30,
		height:30,
		left:10
	},
	
	deleteDataText: {
		color:'#999',
		top:10,
		left:30,
		right:30,
		text:L('delete_text', 'A través de este botón, borrarás los datos de los artículos descargados, tus consejos conseguidos y la fecha de parto'),
		textAlign:'center',
		font:{fontSize:12}
	}
	
}
