/**
 * 获取page
 * @param path
 * @param index
 * @param pageSize
 * @param params
 * @param first
 */
export function getTablePageData(path, index, pageSize, params, lang, first){
    console.info(`-------> 发起请求 path:${path}`)
    // 生成请求动作
    let appHead = {
        type: 'getPageData',
        page: index,
        size: pageSize,
        lang: lang,
        sort: '',
        dataAuth: '',
    }

    // let reqAction = params
    let promise = new Promise((resolve, reject) => {
        // 获取数据源
        fox.service.request({
            appHead,
            path,
            dataType: 'json',
            async: true,
            cover: true,
            data: params,
            callback(code, message, data, ...params) {
                if (code == 0) {
                    if (typeof data === 'string') {
                        data = JSON.parse(data)
                    }
                    let res
                    // 新数据结构
                    if (params.length > 0) {
                        res = {
                            totalSize: params[0].totalSize,
                            page: data,
                        }
                    // } else { // 老的数据结构
                    //     res = {
                    //         totalSize: data.total,
                    //         page: data.list,
                    //     }
                    } else { // body结构
                        res = {
                            totalSize: data.total,
                            page: data,
                        }
                    }
                    resolve(res)
                } else {
                    resolve(message)
                }
            },
        })
    })
    return promise
}