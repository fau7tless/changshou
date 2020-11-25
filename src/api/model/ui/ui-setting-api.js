
const win = window

class UISetting{

    //获取UI配置
    loadUISetting(name, type, id){
        let key = `foxUI_${name}_${type}_${id}`
        let data = win.localStorage.getItem(key)
        if(data !== undefined){
            let json = JSON.parse(data)
            return json
        }
        return undefined
    }

    //保存UI配置
    saveUISetting(name, type, id, data){
        let key = `foxUI_${name}_${type}_${id}`
        let str = JSON.stringify(data)
        win.localStorage.setItem(key, str)
    }

    //移除UI配置
    removeUISetting(name, type, id){
        let key = `foxUI_${name}_${type}_${id}`
        win.localStorage.removeItem(key)
    }
}

//导出
let uiSetting = new UISetting()
export default uiSetting