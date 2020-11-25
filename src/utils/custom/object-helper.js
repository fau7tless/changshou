// 判断是否为原始类型的值
function isPrimitive(val) {
    if (['number', 'boolean', 'string', 'undefined'].indexOf(typeof val) != -1) {
        return true
    } else if (val === null) {
        return true
    } else {
        return false
    }
}

// 比较原生类型的值
function comparePri(val1, val2) {
    if (val1 === val2) {
        return true
    } else if ([null, undefined, ''].indexOf(val1) != -1 && [null, undefined, ''].indexOf(val2) != -1) {
        return true
    } else {
        return false
    }
}

// 比较数组
function compareArray(val1, val2) {
    if (val1.length !== val2.length) {
        return false
    }
    val1 = val1.sort()
    val2 = val2.sort()
    for (let i in val1) {
        if (!compareVal(val1[i], val2[i])) {
            return false
        }
    }
    return true
}

// 比较值
function compareVal(val1, val2) {
    if (isPrimitive(val1)) {
        return comparePri(val1, val2)
    } else if (val1 instanceof Array) {
        return compareArray(val1, val2)
    } else if (val1 instanceof Object) {
        // 判断两个对象的属性是否相同
        return compare(val1, val2)
    } else {
        // 类型为function的后续考虑处理方案
        return true
    }
}

/**
 * 比较两个对象是否相等
 * 
 */
export function compare(obj1, obj2) {
    // 判断两个对象的属性是否相同
    if (Object.keys(obj1).sort().toString() !== Object.keys(obj2).sort().toString()) {
        return false
    }
    // 逐个属性进行比较
    for (let key in obj1) {
        if (!compareVal(obj1[key], obj2[key])) {
            return false
        }
    }
    return true
}

/**
 * 删除属性
 * @param obj
 * @param names
 * @param index
 */
function deleteProperty(obj, names, index) {
    let name = names[index]
    let startIndex = name.indexOf('[')
    let endIndex = name.indexOf(']')
    if(startIndex > 0 && endIndex === name.length - 1) {
        let propKey = name.substring(0, startIndex)
        let pos = parseInt(name.substring(startIndex + 1, endIndex))
        let value = obj[propKey]
        if(index < names.length - 1) {
            let item = value[pos]
            deleteProperty(item, names, index + 1)
        }else{
            value.splice(pos, 1)
        }
    }else if(index < names.length - 1) {
        let value = obj[name]
        // 复核过滤数据的特殊key结构，删除某个数据的所有内容
        if(Array.isArray(value)) {
            let isEmpty = true
            for(let item of value) {
                deleteProperty(item, names, index + 1)
                if(Reflect.ownKeys(item).length > 0) {
                    isEmpty = false
                }
            }
            // 如果数组完全由空item组成，则把该数组删除
            if(isEmpty) {
                Reflect.deleteProperty(obj, name)
            }
        }else{
            deleteProperty(value, names, index + 1)
            if(Reflect.ownKeys(value).length == 0) {
                Reflect.deleteProperty(obj, name)
            }
        }
    }else{
        Reflect.deleteProperty(obj, name)
    }
}

/**
 * 清理对象
 * @param obj
 * @param keys
 */
export function clearObject(obj, keys) {
    if(!keys || keys.length == 0) {
        return
    }
    for(let key of keys) {
        let names = key.split('.')
        deleteProperty(obj, names, 0)
    }
}

/**
 * 格式化对象(适配后端数据要求)
 * 1、数组排序
 * 2、把空字符串转换为NULL
 * @param obj
 */
export function formatObject(obj) {
    if(!obj || typeof obj != 'object') {
        return
    }

    for(let key in obj) {
        let value = obj[key]
        if(value == null) {
            continue
        }
        // 把空字符串和undefined的值设置为null
        if(value === '' || value === undefined) {
            obj[key] = null
        }
        // 数组排序
        else if(Array.isArray(value)) {
            value.sort()
        }
        // 递归格式化子属性
        else if(typeof value == 'object') {
            formatObject(value)
        }
    }
}