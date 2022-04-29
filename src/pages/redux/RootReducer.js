import * as ActionTypes from './ActionTypes';

const initialState = {
	responsive:false,
	event:'none',
	download:0,
	code:{ },
	showPreviewButton:false,
	preview:{ show:false, effect:null, ref:null },

	designerApi:'',
	showLoader:false,
	tabSelected:0,
	isMobile:false,
	items:[],
	itemSelectedIndex:-1,
	components:[{key:'map', val:'map', selected:false,code:''}, {key:'hybrid', val:'hybrid gallery', selected:false,code:''}, {key:'scrollbar', val:'scrollbar', selected:false,code:''}, {key:'containerGallery', val:'container gallery', selected:false,code:''}, 
				{key:'tabs', val:'tabs', selected:false,code:''}, {key:'threeSixty', val:'three sixty', selected:false,code:''}, {key:'imageGallery', val:'image gallery', selected:false,code:''}, {key:'comparisionSlider', val:'comparision slider', selected:false,code:''},
				{key:'productGallery', val:'product gallery', selected:false, code:''}],
	product:"other",
	effects:["fadeInUp","fadeOutUp", "fadeInDown","fadeOutDown", "fadeInLeft","fadeOutLeft", "fadeInRight","fadeOutRight", "fadeIn", "fadeOut", "flash", "swing", "pulse",
			"slideInUp", "slideOutUp", "slideInDown", "slideOutDown", "slideInLeft","slideOutLeft", "slideInRight", "slideOutRight", "bounceInUp", 
			"bounceOutUp","bounceInDown","bounceOutDown", "bounceInRight","bounceOutRight", "bounceInLeft", "bounceOutLeft", "zoomIn", "zoomOut", "zoomInUp", "zoomOutUp",
			"zoomInDown","zoomOutDown", "zoomInLeft", "zoomOutLeft", "zoomInRight", "zoomOutRight"]
}

const RootReducer = (state=initialState, action)=>{
	const {type, payload} = action;
	switch(type){
		case ActionTypes.ITEM_SELECTED_INDEX:
			return {
				...state,
				itemSelectedIndex:payload
			}

		case ActionTypes.UDPATE_ITEM:
			var tmpArr = [...state.items];
			tmpArr[payload.index] = payload.data;
			
			return {
				...state, 
				items:tmpArr
			}

		case ActionTypes.UDPATE_ITEM_ARRAY:
			return {
				...state, 
				items:payload
			};

		case ActionTypes.PLATFORM_CHANGED:
			return {
				...state,
				isMobile:payload.platform
			}

		case ActionTypes.FILE_LOADED:
			return {
				...state,
				code:payload
			}
		
		case ActionTypes.SHOW_PREVIEW:
			return {
				...state,
				preview:{show:payload.show, effect:payload.effect}
			}

		case ActionTypes.FILE_UPLOADED:
			return {
				...state,
				items:payload.value,
				itemSelectedIndex:payload.value.length-1,
				designerApi:payload.dapi,
				components:payload.arr
			}

		case ActionTypes.CLEAR_ARRAY:
			return {
				...state,
				items:[]
			}
		
		case ActionTypes.TAB_SELECTED:
			return {
				...state,
				tabSelected:payload
			}
				
		case ActionTypes.ADD_ANIMATION:
			let tarr = state.items;
			tarr[payload.index] = payload.items;
			return {
				...state,
				items:tarr
			}

		case ActionTypes.COMPONENT_ADD:
			return {
				...state,
				components:payload
			}

		case ActionTypes.FILE_DOWNLAOD:
			return {
				...state,
				showLoader:true
			}
		
		case ActionTypes.FILE_DOWNLAODED:
			return {
				...state,
				showLoader:false
			}
		
		case ActionTypes.PRODUCT_CHANGED:
			return {
				...state,
				product:payload
			}

		default:
			return state;
	}
}

export default RootReducer;