const AllCode = (isMobile, code, items) => {
	let tcode = {...code};
	let gcode = tcode.gcode.replace("#C", genPlatformCode(isMobile));
	gcode = gcode.replace("#C", generateArr(items));
	gcode = gcode.replace("#C", addDICode(tcode, isMobile));
	gcode = gcode.replace("#C", checkParentCode(isMobile));
	gcode = gcode.replace("#C", AddAnimation(isMobile));
	gcode = gcode.replace("#C", checkMainUnit(tcode));
	return gcode;
}

const AddAnimation = (isMobile) => {
	var code = '';
	if(isMobile){
		/*code += '\n// code for responsive-units//\n';
		code += '\nvar rect = obj.item.getBoundingClientRect();';
		code += '\n//check if the item is in the view//\n';
		code += '\nvar scrollTop = window.pageYOffset || document.documentElement.scrollTop;';
		code += '\nif(rect.top>=61 && rect.bottom<=scope.innerHeight && !obj.inview && !obj.animating){';
		code += '\nif(obj.parent === null || obj.parent.getAttribute("class").search("wp-panel-active") != -1){';
		code += '\nobj.inview = obj.animating = true;';
		code += '\nanimateCSS(obj,obj.loop)';*/
		code += `// code for responsive-units//
			var rect = obj.item.getBoundingClientRect();
			//*****check if the item is in the view*****//
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if(rect.top>=61 && rect.bottom<=scope.innerHeight && !obj.inview && !obj.animating){
				if(obj.parent === null || obj.parent.getAttribute("class").search("wp-panel-active") != -1){
					obj.inview = obj.animating = true;
					animateCSS(obj,obj.loop);
				}
			}
			//check if object is currently out of screen//
			if(rect.top+rect.height<60 || rect.top >= scope.innerHeight || (obj.parent != null && obj.parent.getAttribute("class").search("wp-panel-active") === -1)){
				if(!obj.animating) {
					obj.item.style.visibility = "hidden"; obj.inview = false;
				}
			}`
	} else {
		/*code += '\nif(obj.inview){';
		code += '\nif(obj.root != null && obj.root.getAttribute("class").search("wp-panel-active") === -1){';
		code += '\nobj.inview = false;obj.item.style.visibility = "hidden";';
		code += '\n}';
		code += '\nif(obj.parent.getAttribute("class").search("wp-panel-active") === -1){';
		code += '\nobj.inview = false;obj.item.style.visibility = "hidden";';
		code += '\n}\n}';
		code += '\nif(obj.parent.getAttribute("class").search("wp-panel-active") != -1 && !obj.inview){';
		code += '\nif(obj.root === null || obj.root.getAttribute("class").search("wp-panel-active") != -1){';
		code += '\nif(firstTime){ if(obj.title.search("vid") == -1){ firstTime = false; } return;	 }';
		code += '\nobj.inview = true;';
		code += '\nanimateCSS(obj,obj.loop)';
		code += '\n}\n}';
		code += '\nif(obj.parent.getAttribute("class").search("wp-panel-active") === -1){';
		code += '\nobj.inview = false;obj.item.style.visibility = "hidden";';
		code += '\n}\n}';*/
		code += `//if we have single tab then no need to use blank composition//
			if(obj.parent === null && !obj.animating){
				obj.animating = true;
				animateCSS(obj, obj.loop);
				return;
			}

			if(obj.parent.getAttribute("class").search("wp-panel-active") != -1 && !obj.inview){
				if(obj.root === null || obj.root.getAttribute("class").search("wp-panel-active") != -1){
					obj.inview = true;
					if(obj.title.search('vid')!==-1){
						obj.title =  obj.title.replace('vid','');
						return;
					}
					obj.animating = true;
					animateCSS(obj, obj.loop);
				}
			}

			if(obj.parent.getAttribute("class").search("wp-panel-active")===-1 || (obj.root != null && obj.root.getAttribute("class").search("wp-panel-active") === -1)){
				obj.inview = false;
				obj.item.style.visibility = "hidden";
			}`
	}
	
	/*if(isMobile){
		code += `}}\n//check if object is currently out of screen//\n
				 \nif(rect.top+rect.height<60 || rect.top >= scope.innerHeight || (obj.parent != null && obj.parent.getAttribute("class").search("wp-panel-active") === -1)){
				 \nif(!obj.animating) { obj.item.style.visibility = "hidden"; obj.inview = false; }\n}`
	}*/
	return code;
}

const genPlatformCode = (isMobile)=> {
	var code = "";
	if(isMobile){
		//code += props.code.mcode;
	}
	return code;
}

const addDICode = (code, isMobile)=> {
	var tcode = code.dicode;
	if(!isMobile){
		tcode = tcode.replace("~","obj.root = getParent(obj.parent, 6);");
		tcode = tcode.replace("~","6");
	}else{
		tcode = tcode.replace("~","obj.root = getParent(obj.parent, 6);");
		tcode = tcode.replace("~","5");
	}
	return tcode;
}

const generateArr = (items) => {
	var code = 'var arrVal = [];';
	for(let j=0; j<items.length; j++){
		let anims = '';
		items[j].anims.forEach((obj,tindex)=>{
			let str = obj.effect;
			if(str.toLowerCase().search('left') !== -1 || str.toLowerCase().search('up') !== -1 || str.toLowerCase().search('down') !== -1 || str.toLowerCase().search('right') !== -1) {
				str += '_'+j;
			}

			anims += '{effect:"'+str+'", duration:'+obj.duration+', delay:'+obj.delay+', distance:'+obj.distance+'}';
			if(tindex !== items[j].anims.length-1){ anims += ','; }
		});

		let loop = Number(items[j].loop)===-1?1000000:Number(items[j].loop)+1;
		code += `\n\tarrVal.push({item:null, animating:null, index:0, inview:false, title:"${items[j].title}",anims:[${anims}], loop:${loop}});`;
	}
	return code;
}

const checkMainUnit = (code)=> {
	return code.mucode;
}

const checkParentCode = (isMobile)=> {
	var code = '';
	if(!isMobile){
		code += ``;
	}
	return code;
}

export default AllCode;