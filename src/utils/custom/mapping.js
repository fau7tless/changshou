// 缓存
const cache = new Map()

/**
 * 数组转换为映射
 * @param list
 */
function array2Map(list) {
    let map = {}
    list.forEach((item) => {
        map[item.value] = item.text
    })
    return map
}

/**
 * 加载数据
 */
function load(lang, path) {
    // 获取路径
    let absPath
    if(lang) {
        absPath = `static/data-source/${lang}/${path}`
    }else{
        absPath = `static/data-source/${path}`
    }

    // 优先从缓存中获取，如何命中直接返回
    if(cache.has(absPath)) {
        return cache.get(absPath)
    }

    let map = []
    // 同步读取文件数据
    fox.ajax({
        url: absPath,
        async: false,
        cover: false,
        type: 'GET',
        dataType: 'json',
        cache: false,
        data: {},
        // 成功处理
        success(data, status, xhr) {
            map = array2Map(data)
            cache.set(absPath, map)
        },
        // 错误处理
        error(xhr, status) {
            console.error(`加载json映射文件错误:${status}`)
        },
    })
    return map
}

// 转换
export function mapping(vm, path, value) {
    // 获取当前语言
    let lang = vm.$i18n ? vm.$i18n.locale : undefined
    // 获取映射关系
    let map = load(lang, path)
    let name = map[value] || value
    return name
}