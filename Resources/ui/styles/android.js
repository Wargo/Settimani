
module.exports = {
	
	header: {
		backgroundImage:'/ui/images/bg_header.png', // TODO no se repite
		height:'40 dp',
		top:0
	},
	
	headerTitle: {
		color:'#FFF',
		font:{fontSize:'18 dp', fontWeight:'bold'},
		width:'260 dp',
		height:'23 dp'
	},
	
	headerButton: {
		right:'10 dp',
		height:'25 dp',
		width:'45 dp',
		borderRadius:5,
		borderColor:'#1A6A8A',
		borderWidth:1,
		color:'#FFF',
		font:{fontWeigh:'bold', fontSize:'12 dp'},
		backgroundColor:'#1280AB'
	},
	
	imageHome: {
		width:'320 dp',
		//top:'40 dp'
	},
	
	insertDate: {
		backgroundColor:'#FFF',
		borderRadius:5,
		right:'10 dp',left:'10 dp',top:'10 dp',
		height:'130 dp',
		//top:'250 dp'
		top:'20 dp'
	}, 
	
	dateItem: {
		bottom:'30 dp',
		width:'60 dp',
		height:'30 dp',
		borderRadius:5,
		borderColor:'#CCC',
		borderWidth:1,
		backgroundColor:'#FFF'
	},
	
	dateItemText: {
		color:'#666',
		fontWeight:'bold',
		font:{fontSize:'18 dp'}
	},
	
	button: {
		width:'120 dp',
		height:'40 dp',
		borderRadius:5,
		borderColor:'#CCC',
		borderWidth:1,
		backgroundColor:'#33aa46',
		backgroundDisabledColor:'#DDD',
		color:'#FFF',
		font:{fontSize:'20 dp', fontWeight:'bold'}
	},
	
	calcText: {
		//top:'480 dp',
		top:'20 dp',
		right:'100 dp',
		text:L('calcText', 'Si no conoces tu fecha de parto calcúlala aquí'),
		font:{fontWeigh:'bold', fontSize:'16 dp'},
		color:'#333',
		left:'1 dp',
		textAlign:'center'
	},
	
	calcButton: {
		right:'10 dp',
		//top:'480 dp',
		top:'20 dp',
		width:'80 dp',
		height:'40 dp',
		borderRadius:15,
		borderWidth:1,
		borderColor:'#999',
		backgroundColor:'#FFF'
	},
	
	tableView: {
		top:'40 dp',
		bottom:'65 dp',
		separatorColor:'transparent'
	},
	
	row: {
		left: '20 dp',
		right: '20 dp'
	},
	
	firstRow: {
		backgroundColor:'#FFF',
		right:'20 dp',
		left:'20 dp',
		top:'20 dp',
		bottom:'-5 dp',
		height:'85 dp',
		borderRadius:5,
		borderWidth:1,
		borderColor:'#999'
	},
	
	middleRow: {
		backgroundColor:'#FFF',
		right:'20 dp',
		left:'20 dp',
		height:'80 dp',
		borderWidth:1,
		borderColor:'#999'
	},
	
	lastRow: {
		backgroundColor:'#FFF',
		right:'20 dp',
		left:'20 dp',
		bottom:'20 dp',
		top:'-5 dp',
		height:'85 dp',
		borderRadius:5,
		borderWidth:1,
		borderColor:'#999'
	},
	
	rowTitle: {
		color:'#FF6600',
		font:{fontWeight:'bold', fontSize:'16 dp'},
		left:'50 dp',
		right:'10 dp',
		top:'0 dp',
		height:'23 dp'
	},
	
	rowIntro: {
		color:'#333',
		font:{fontSize:'14 dp'},
		left:'50 dp',
		right:'10 dp',
		top:'20 dp',
		height:'52 dp'
	},
	
	rowImage: {
		width:'49 dp',
		left:'1 dp',
		top:'25 dp'
	},
	
	nextImage: {
		width:'25 dp',
		right:'8 dp',
		top:'25 dp',
		zIndex:100,
		image:'/ui/images/next.png'
	},
	
	prevImage: {
		width:'25 dp',
		left:'8 dp', // 8 + 25
		top:'25 dp',
		zIndex:100,
		image:'/ui/images/prev.png'
	},
	
	headerTableViewSection: {
		height:'30 dp',
		opacity:0.9,
		backgroundColor:'#8EC7E8'
	},
	
	articleContent: {
		layout:'vertical',
		left:'20 dp',
		top:'15 dp',
		bottom:'20 dp',
		right:'20 dp',
		height:Ti.UI.SIZE,
		backgroundColor:'#FFF',
		borderRadius:5,
		borderWidth:1,
		borderColor:'#999'
	},
	
	articleTitle: {
		top:'10 dp',
		left:'20 dp',
		right:'20 dp',
		color:'#FF6600',
		font:{fontWeight:'bold', fontSize:'18 dp'},
		textAlign:'center'
	},
	
	articleImage: {
		top:'10 dp',
		left:'20 dp',
		right:'20 dp',
		width:'240 dp'
	},
	
	articleIntro: {
		top:'10 dp',
		left:'20 dp',
		right:'20 dp',
		color:'#0060AC',
		font:{fontSize:'14 dp', fontWeight:'bold'}
	},
	
	articleDescription: {
		top:'10 dp',
		left:'20 dp',
		right:'20 dp',
		color:'#333',
		font:{fontSize:'14 dp'}
	},
	
	tabs: {
		height:'65 dp',
		bottom:0,
		backgroundImage:'/ui/images/bg_tabs.png',
		zIndex:100
	},
	
	tabButton: {
		width:'100 dp',
		height:'60 dp',
		layout:'vertical',
		_selected:false
	},
	
	tabImageBorder: {
		width:'60 dp',
		height:'35 dp',
		borderColor:'#CCC',
		borderWidth:1,
		borderRadius:10,
		backgroundImage:'/ui/images/bg_tabs.png',
	},
	
	tabImage: {
		top: '5 dp',
		width: '30 dp',
		height: '30 dp'
	}
	
}
