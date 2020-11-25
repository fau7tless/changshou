import './index.css'
import XTable from './x-table/index.vue'
import XTransferTree from './x-transfer-tree/index.vue'
import XCamera from './x-camera/index.vue'
//组件列表
const componentList = [
    XTable,
    XCamera,
]

let installed = false

//扩展自定义UI
let FoxExtUI = {
    //安装
    install(Vue, opts) {
        //避免重复安装
        if (installed) {
            return
        }
        installed = true
        //安装组件
        componentList.forEach(component => {
            Vue.component(component.name, component)
        });
    }

}

//自动安装Fox Ext UI
if (window.Vue) {
    window.Vue.use(FoxExtUI)
}
//导出
export default FoxExtUI