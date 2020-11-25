/* eslint-disable */

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import VueContextMenu from 'vue-contextmenu'

//导入拼音
import './assets/libs/pinyinjs/dict/pinyin_dict_firstletter'
import './assets/libs/pinyinjs/dict/pinyin_dict_withtone'
import './assets/libs/pinyinjs/pinyinUtil'

import filters from '@/utils/custom/filters'
//----------------------------------------------------
//导入App应用
import App from './App.vue'
import { fox, foxPlugin, foxUI, foxFlowController} from './assets/libs/fox-libs'
// import './assets/themes/blue/color-blue.css'
import './assets/themes/gold/color-gold.css'
import './assets/themes/gold/custom.css'
//导入iconfont图标字体
import './assets/font/iconfont.css'
//导入主题css
import './assets/themes/main.css'
import i18n from './i18n/i18n'

//导入项目公共css
import './assets/css/app.css'

//导入rsa依赖
import 'jsencrypt'

//安装Element UI
Vue.use(ElementUI)
Vue.use(VueContextMenu)

//导入路由配置
import RouteConfig from './utils/commons/route-config'
//安装路由
RouteConfig.install(fox) 

//设置fox到window根下面
window.fox = fox
//安装Fox
Vue.use(fox)

//安装Fox插件
foxPlugin.install({'fox':fox, 'global':window, 'alias':'fox'})
//安装Fox UI
Vue.use(foxUI, {
    //head bar height
    headBarHeight:(74+50), //(标题栏高度+面包屑标签高度）
    //foot bar height
    footBarHeight:34,
    //默认label宽度
    labelWidth:'138px',
    //输入item的最小宽度
    minItemWidth: 200,
    //label显示最大字数
    labelMaxCharCount:16,
})

import foxExtUI from './components/index'
//安装Fox Ext UI
Vue.use(foxExtUI)
Object.keys(filters).forEach((key) => Vue.filter(key, filters[key]))
//安装API
import { foxAPI } from './api'
foxAPI.install(fox)

//加入请求过滤器
import ServiceFilter from './utils/commons/service-filter'
ServiceFilter.install(Vue, fox)

//安装校验器
import ValidatorConfig from './utils/commons/validator'
ValidatorConfig.install(Vue, fox)

//安装流程控制器
import FlowConfig from './utils/commons/controller/index'
FlowConfig.install(Vue, fox, foxFlowController)

//安装custom api
import {foxCustom} from './utils/custom'
foxCustom.install(Vue, fox)

//安装context api
import {foxContext} from './utils/context'
foxContext.install(Vue, fox)


new Vue({
    el: '#app',
    fox,
    i18n,
    components: { App },
    template: '<App/>'
})

export default fox




