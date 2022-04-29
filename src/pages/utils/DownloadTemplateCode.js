import $ from 'jquery';

const DownloadTemplateCode = async(arrComps, fileDownloaded, isMobile) => {
    let codeGenerated = '';

    try{
        let path = isMobile ? 'template_mobile.txt' : 'template.txt';
        codeGenerated = await downloadFile(require('../../assets/text/template/'+path).default);
        let index = 0;
        let tcode = '';
        
        const tmpdownload = async() => {
            if(index<arrComps.length) {
                tcode += ',' + await downloadFile(require('../../assets/text/template/'+arrComps[index]+'.txt').default);
                index++;
                tmpdownload();
            }else{
                codeGenerated = codeGenerated.replace('~', tcode);
                var jsel = document.createElement('a');
                jsel.setAttribute('href', 'data:text/javascript;charset=utf-8,' + encodeURIComponent(codeGenerated));
                jsel.setAttribute('download', 'designer-config.js');
                jsel.style.display = 'none';
                document.body.appendChild(jsel);
        
                jsel.click();
                fileDownloaded();
            }
        }
        await tmpdownload();
    }catch(err){
        console.log(err);
    }
}

const downloadFile = (str) => {
    return new Promise((resolve, reject) => {
        $.get(str, function(data) {
            return resolve(data);
        }).fail(()=>{
            return reject(new Error('file not found'));
        });
    })
}

export default DownloadTemplateCode;