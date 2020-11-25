/**
 * 默认filter
 * @param key
 */
function defaultFilter(key) {
    // 以m_开头的数据为page中的元数据
    if(key.indexOf('m_') == 0) {
        return false
    }
    return true
}

/**
 * 获取请求数据
 * @param vm
 * @param filter
 */
export function getRequestData(vm, filter = defaultFilter) {
    let data = vm.$data
    if(!data) {
        return {}
    }
    let reqData = {}
    for(let key in data) {
        // 是否过滤
        if(!Reflect.apply(filter, this, [key])) {
            continue
        }
        reqData[key] = data[key]
    }
    return reqData
}

/**
 * 还原响应数据
 * @param srcData
 * @param targetData
 * @param parentKey
 * @param filter
 */
function recoverRspData(srcData, targetData, parentKey, filter) {
    for(let key in srcData) {
        let value = srcData[key]
        let nextKey = key
        if(parentKey && parentKey.length > 0) {
            nextKey = `${parentKey}.${key}`
        }

        // 如果过滤不通过，直接跳过
        if(typeof filter == 'function' && !Reflect.apply(filter, this, [nextKey, srcData])) {
            continue
        }

        if(value != null && typeof value == 'object' && !Array.isArray(value)) {
            let targetValue = targetData[key]
            if(typeof targetValue != 'object') {
                targetValue = {}
                targetData[key] = targetValue
            }
            recoverRspData(value, targetValue, nextKey, filter)
        }else{
            targetData[key] = value
        }
    }
}

/**
 * 设置响应数据
 * @param vm
 * @param respData
 */
export function setResponseData(vm, respData, filter) {
    let data = vm.$data
    if(!data) {
        return
    }
    recoverRspData(respData, data, undefined, filter)
}

/**
 * 清空数据
 * @param vm
 * @param data
 * @param filter
 */
export function resetData(vm, data, filter = defaultFilter) {
    data = data || vm.$data
    if(!data) {
        return
    }

    for(let key in data) {
        // 是否过滤
        if(!Reflect.apply(filter, this, [key])) {
            continue
        }

        if(Array.isArray([data[key]])) {
            data[key] = []
        } else if(typeof data === 'object') {
            resetData(vm, data[key], filter)
        }
        data[key] = ''
    }
}