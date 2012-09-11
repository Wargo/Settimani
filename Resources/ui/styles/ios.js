
module.exports = {
	
	header: {
		backgroundImage:'/ui/images/bg_header.png',
		backgroundRepeat:true,
		height:44,
		top:0
	},
	
	headerTitle: {
		color:'#FFF',
		font:{fontSize:18, fontWeight:'bold'}
	},
	
	imageHome: {
	},
	
	insertDate: {
		backgroundColor:'#FFF',
		borderRadius:5,
		right:10,left:10,top:10,
		height:100
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
	
	tableView: {
		separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.NONE,
		backgroundColor:'transparent'
	},
	
	row: {
		backgroundColor:'transparent',
		selectionStyle:Ti.UI.iPhone.TableViewCellSelectionStyle.NONE
	},
	
	miniRow: {
			height:80
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
		font:{fontWeight:'bold', fontSize:'18 dp'},
		left:'50 dp',
		right:'20 dp',
		top:'5 dp',
		height:'20 dp'
	},
	
	rowIntro: {
		color:'#333',
		font:{fontSize:'12 dp'},
		left:'50 dp',
		right:'20 dp',
		top:'30 dp',
		height:'45 dp'
	}
	
}
