// symbol 常量
const $resultData = Symbol.for('$resultData')
const $syncData = Symbol.for('$syncData')
// 大窗口
export const Large = Symbol.for('Large')
// 中窗口
export const Medium = Symbol.for('Medium')
// 小窗口
export const Small = Symbol.for('Small')

/**
 * 打开页面
 *
 * @param vm
 * @param to
 * @param params 路由参数
 * @param syncData 同步数据
 * @param onSuccess 页面打开触发
 * @param onDestroy 页面关闭触发
 */
export function openPage(vm, to, params = {}, syncData, onSuccess, onDestroy) {
    // 定义跳转目标
    let target = {}
    // 设置参数
    target.params = params
    // 设置同步数据
    if(syncData) {
        target.params[$syncData] = syncData
    }
    // 设置page的类型
    target.params.pageType = 'tab'
    // 设置跳转路径
    target.path = to
    // 设置回调函数
    target.success = onSuccess
    target.destroy = onDestroy
    // 通知菜单选中
    vm.$fox_emit('global_event_open_page', target)
}

/**
 * 打开页面
 *
 * @param vm
 * @param to
 * @param params
 * @param syncData
 * @param callback 页面关闭触发
 */
export function openPageWithResult(vm, to, params = {}, syncData, callback) {
    let resultData = {}
    // 设置到路由参数中
    params[$resultData] = resultData

    openPage(vm, to, params, syncData, undefined, () => {
        if(typeof callback === 'function') {
            let { code, data } = resultData
            Reflect.apply(callback, vm, [code, data])
        }
    })
}

/**
 * 打开中等页面
 *
 * @param vm
 * @param to
 * @param attrs
 * @param params
 * @param syncData
 * @param onSuccess 页面打开触发
 * @param onDestroy 页面关闭触发
 */
export function appendMediumPage(vm, to, attrs, params = {}, syncData, onSuccess, onDestroy) {
    let viewTagAttrs = {}
    // 如果attrs为字符串，则为标题
    if(typeof attrs == 'string') {
        let title = attrs
        Object.assign(viewTagAttrs, {
            title: title,
            width: '928px',
            'custom-class': 'fox-medium-page',
            'close-on-click-modal': false,
            'close-on-press-escape': false,
            hijack: true,
            'hijack-method-name': 'onCancel',
            
        })
    }else if(typeof attrs == 'object') {
        Object.assign(viewTagAttrs, attrs, {
            width: '928px',
            'custom-class': 'fox-medium-page', 
            'close-on-click-modal': false,
            'close-on-press-escape': false,
            hijack: true,
            'hijack-method-name': 'onCancel',
        })
    }else{
        Object.assign(viewTagAttrs, {
            width: '928px',
            'custom-class': 'fox-medium-page', 
            'close-on-click-modal': false,
            'close-on-press-escape': false,
            hijack: true,
            'hijack-method-name': 'onCancel',
        })
    }
    appendPage(vm, to, viewTagAttrs, params, syncData, onSuccess, onDestroy)
}

/**
 * 打开页面
 *
 * @param vm
 * @param to
 * @param attrs
 * @param params
 * @param syncData
 * @param onSuccess 页面打开触发
 * @param onDestroy 页面关闭触发
 */
export function appendPage(vm, to, attrs, params = {}, syncData, onSuccess, onDestroy) {
    // 创建路由
    let route = {}
    if(to.indexOf('/') == 0) {
        route.path = to
    }else{
        route.name = to
    }

    route.params = params
    // 设置page的类型
    route.params.foxPageType = 'window'
    // 设置同步数据
    if(syncData) {
        let $syncData = Symbol.for('$syncData')
        route.params[$syncData] = syncData
    }
    // 如果attrs为字符串，则为标题
    if(typeof attrs == 'string') {
        let title = attrs
        route.viewTagAttrs = {
            title: title,
            width: '80%',
            'close-on-click-modal': false,
            'close-on-press-escape': false,
        }
    }
    // 完整参数
    else if (typeof attrs == 'object') {
        route.viewTagAttrs = attrs
    }

    if(!Reflect.has(route.viewTagAttrs,'hijack')){
        route.viewTagAttrs['hijack'] = true
    }
    if(!Reflect.has(route.viewTagAttrs, 'hijack-method-name')){
        route.viewTagAttrs['hijack-method-name'] = 'onCancel'
    }

    route.success = onSuccess
    route.destroy = onDestroy

    // 权限范围
    const authScope = Symbol.for('authScope')
    // 获取访问(继承父亲页面的权限范围)
    let scope = vm.$route && vm.$route.params && vm.$route.params[authScope]
    if(scope) {
        // 设置权限范围
        route.params.authScope = scope
    }

    vm.$router.append(route)
}

/**
 * 打开中等页面
 *
 * @param vm
 * @param to
 * @param attrs
 * @param params
 * @param syncData
 * @param onSuccess 页面打开触发
 * @param onDestroy 页面关闭触发
 */
export function appendMediumPageWithResult(vm, to, attrs, params = {}, syncData, callback) {
    let viewTagAttrs = {}
    // 如果attrs为字符串，则为标题
    if(typeof attrs == 'string') {
        let title = attrs
        Object.assign(viewTagAttrs, {
            title: title,
            width: '928px',
            'custom-class': 'fox-medium-page',
            'close-on-click-modal': false,
            'close-on-press-escape': false,
        })
    }else if(typeof attrs == 'object') {
        Object.assign(viewTagAttrs, attrs, {
            width: '928px',
            'custom-class': 'fox-medium-page',
            'close-on-click-modal': false,
            'close-on-press-escape': false,
        })
    }else{
        Object.assign(viewTagAttrs, {
            width: '928px',
            'custom-class': 'fox-medium-page',
            'close-on-click-modal': false,
            'close-on-press-escape': false,
        })
    }
    appendPageWithResult(vm, to, viewTagAttrs, params, syncData, callback)
}

/**
 * 打开页面
 *
 * @param vm
 * @param to
 * @param attrs
 * @param params
 * @param syncData
 * @param callback 页面关闭触发
 */
export function appendPageWithResult(vm, to, attrs, params = {}, syncData, callback) {
    let resultData = {}
    // 设置到路由参数中
    params[$resultData] = resultData

    appendPage(vm, to, attrs, params, syncData, undefined, () => {
        if(typeof callback === 'function') {
            let { code, data } = resultData
            Reflect.apply(callback, vm, [code, data])
        }
    })
}

/**
 * 关闭页面
 * @param vm
 * @param to
 * @param resCode
 * @param resData
 */
export function closePage(vm, to, resCode, resData) {
    let params = vm.$route.params || {}
    let resultData = params[$resultData]
    if(typeof resultData === 'object') {
        resultData.code = resCode
        resultData.data = resData
    }

    if(params.foxPageType == 'window') {
        vm.$router.remove()
        return
    }

    let item = {
        path: to || vm.$route.path,
    }
    vm.$fox_emit('global_event_tag_close', item)
}

/**
 * 关闭页面
 * @param vm
 * @param to
 * @param resCode
 * @param resData
 */
export function closePageWithResult(vm, resCode, resData, to) {
    closePage(vm, to, resCode, resData)
}

/**
 * 获取同步数据
 * @param vm
 */
export function getSyncData(vm) {
    let { params } = vm.$route
    let $syncData = Symbol.for('$syncData')
    if(params && params[$syncData]) {
        return params[$syncData]
    }
    return undefined
}

/**
 * 获取value
 *
 * @param data
 * @param key
 */
export function getValue(data, key) {
    if(data == undefined || key == undefined) {
        return undefined
    }
    // 分割id
    let keys = key.split('.')
    let value = data
    for(let i = 0; i < keys.length; i++) {
        // 获取当前key
        let part = keys[i]
        // 记录解析数组层次
        let times = 0
        // 判断是否为数组
        let sIndex = part.indexOf('[')
        let eIndex = sIndex == -1 ? -1 : part.indexOf(']', sIndex)
        while(sIndex != -1 && eIndex != -1) {
            let index = part.substring(sIndex + 1, eIndex)
            // 判断是否为数字
            if(/^\d+$/.test(index)) {
                index = parseInt(index)
                if(times == 0) {
                    let name = part.substring(0, sIndex)
                    value = value[name][index]
                }else{
                    value = value[index]
                }
                times++
            }
            sIndex = part.indexOf('[', eIndex)
            eIndex = sIndex == -1 ? -1 : part.indexOf(']', sIndex)
        }

        if(times == 0) {
            value = value[part]
        }
    }
    return value
}

/**
 * 获取root domain
 * @param instance
 */
export function getRootDomain(vm) {
    const $Domain = Symbol.for('$Domain')
    if(vm.$children == undefined || vm.$children.length == 0) {
        return undefined
    }
    // 获取domain
    let domain = vm.$children[0].$data && vm.$children[0].$data[$Domain]
    return domain
}
