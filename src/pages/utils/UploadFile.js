const UploadFile = (clearArray, fileUploaded) => {
    let ele = document.querySelector('#my_files');
  
    
    let file = ele.files[0];
    let reader = new FileReader();

    const getObject = (str) => {
        let obj = {};
        str = str.replace(/[\r\n\s\t]+/gm, '').replace(/["]/g,'');
        str.split(',').forEach(val=>{
            let tarr = val.split(':');
            obj[tarr[0]] = tarr[1].search(/[A-Za-z]/)===-1?Number(tarr[1]):tarr[1];
        });
        return obj;
    }
  
    reader.onload = (e) => {
        //clear existing array//
        clearArray();
        let arrVal = [];
        let dapi = e.target.result.split('const motionWidget')[0];

        let tarr = e.target.result.split('motionWidget.addEl();')[0].split('motionWidget.arrVal.push({');
        for(var j=1; j<tarr.length; j++){
            let str = tarr[j].split('})')[0];
            let obj = { anims:[] };

            str.split('{').forEach((strEffect,index)=>{
                if(index!==0){
                    strEffect = strEffect.split('}')[0];
                    let eobj = getObject(strEffect);
                    eobj.effect = eobj.effect.split('_')[0];
                    obj.anims.push(eobj);
                }
            });

            str = str.replace(/\[.*?\]/g, 'ef');
            obj = {...getObject(str), anims:obj.anims, item:null, animating:false, inview:false, index:j};
            arrVal.push(obj);
        }

        let isMobile = e.target.result.split('onOrientationChange').length>1?true:false;
        fileUploaded(arrVal, isMobile, dapi);
    }; 
  
    reader.onerror = (e) => alert(e.target.error.name);
    reader.readAsText(file); 
}

export default UploadFile;