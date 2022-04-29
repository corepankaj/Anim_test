import $ from 'jquery';

const downloadFile = (str) => {
    return new Promise((resolve, reject) => {
        $.get(str, function(data) {
            return resolve(data);
        }).fail(()=>{
            return reject(new Error('file not found'));
        });
    })
}

export const FetchDesignerApi = async(isMobile, dapi) => {
    let path = isMobile ? 'template_mobile.txt' : 'template.txt';
    let code  = dapi.length<=2 ? await downloadFile(require('../../assets/text/template/'+path).default) : dapi;
    
    return new Promise(resolve => resolve(code));
}

export const FetchComponentApi = async(arrComps) => {    
    let tcode = '';
    let index = 0;
    let arr = [];

    arrComps.forEach(obj => { 
        if(obj.selected){ 
            arr.push(obj);
        } 
    });

    const tmpCode = async() => {
        //console.log(arrComps[index]);
        arr[index].code = arr[index].code==='' ? await downloadFile(require('../../assets/text/template/'+arr[index].key+'.txt').default) : arr[index].code;
        tcode += ','+arr[index].code;
        index++;
        if(index<arr.length){
            await tmpCode();
        }
    }

    if(arr.length>=1){ await tmpCode(); }
    
    return new Promise(resolve => resolve(tcode));
}

export const FetchAnimationCode = async() => {
    let code  = await downloadFile(require('../../assets/text/animCode.txt').default);
    return new Promise(resolve => resolve(code));
}

export const GenerateWholeCode = async(isMobile, components, items, dapi) => {
    let code = '';
    code = await FetchDesignerApi(isMobile, dapi);
    code = code.replace('~', await FetchComponentApi(components));

    let tmpIndex = 0;
    code = code.replace(/{/g, match => ++tmpIndex===2 ? '{\n\tmotionWidget.init();' :  match);
    code = code.replace('callback()', '\n\t\tmotionWidget.reset();\n\t\tcallback()')

    let tcode = await FetchAnimationCode(items);
    if(items.length>=1){
        let animCode = '';
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
            animCode += `\n\t\tmotionWidget.arrVal.push({item:null, animating:null, index:0, inview:false, title:"${items[j].title}",anims:[${anims}], loop:${loop}})`;
            //if(j<items.length-1){ animCode += ','; }
        }
        animCode += '\n\t\t';
        tcode = tcode.replace('~', animCode);
        code = code.concat(tcode);
    }

    return new Promise(resolve => resolve(code));
}