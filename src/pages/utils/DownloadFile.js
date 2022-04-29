import $ from 'jquery';
import csscode from '../../assets/text/animation.txt';
import { GenerateWholeCode } from './FetchTextCode';

const uniqueArray = (arr) => {
    let tarr = [];
    arr.forEach((obj,index)=>{
        obj.anims.forEach(tobj=>{
            if(!tarr.some((tmpobj)=>tobj.effect===tmpobj.effect) || tobj.effect.toLowerCase().search('up')!==-1 || tobj.effect.toLowerCase().search('down')!==-1 || 
                tobj.effect.toLowerCase().search('left')!==-1 || tobj.effect.toLowerCase().search('right')!==-1) {
                tarr.push({...tobj, index:index});
            }
        })
    });

    return tarr;
}

const DownloadFile = (isMobile, components, items, dapi, fileDownloaded) => {
	$.get(csscode, async(data) => {
        let titems = uniqueArray([...items]);
        let arrCode = data.split('~');
        let fcode = arrCode[0];

        titems.forEach(obj=>{
            let effect = obj.effect;
            for(let j=1; j<arrCode.length; j++){
                let arrStr = arrCode[j].split('?');
                if(effect === arrStr[0]){
                    if(effect.toLowerCase().search('left')!==-1 || effect.toLowerCase().search('right')!==-1 || effect.toLowerCase().search('up')!==-1 || effect.toLowerCase().search('down')!==-1){
                        effect += '_'+obj.index;
                    }
                    let regex = new RegExp(arrStr[0], 'gi');
                    fcode += arrStr[1].replace(regex, effect).replace(/#/g, obj.distance);
                    break;
                }
            }
        });

        var cssel = document.createElement('a');
        cssel.setAttribute('href', 'data:text/css;charset=utf-8,' + encodeURIComponent(fcode));
        cssel.setAttribute('download', 'motion-effect.css');

        cssel.style.display = 'none';
        document.body.appendChild(cssel);

        let code =  await GenerateWholeCode(isMobile, components, items, dapi);

        //download javasript file//
        var jsel = document.createElement('a');
        jsel.setAttribute('href', 'data:text/javascript;charset=utf-8,' + encodeURIComponent(code));
        jsel.setAttribute('download', 'designer-config.js');
        
        jsel.style.display = 'none';
        document.body.appendChild(jsel);

        jsel.click();
        cssel.click();
        document.body.removeChild(jsel);
        document.body.removeChild(cssel);

        fileDownloaded();
    });
}

export default DownloadFile;