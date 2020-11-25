/**
 * 获取cascader items
 * @param path
 * @param lang
 */
export function getCascaderItems(path, lang){
    let requestPath = path;
    if(lang){
        requestPath=`${requestPath}.do?lang=${lang}`;
    }else{
        requestPath=`${requestPath}.do`;
    }

    let promise = new Promise((resolve, reject)=>{
        //获取数据源
        fox.service.request({
            path:requestPath,
            dataType: 'json',
            async:true,
            cover:false,
            data:{
                lang:lang
            },
            callback(code, message, data){
                if(code == 0){
                    if(typeof data === "string"){
                        data = JSON.parse(data);
                    }
                    resolve(data.items);
                }else{
                    resolve(message);
                }
            }
        })
    })
    return promise;
}