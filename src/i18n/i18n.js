import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import messages from './langs'
import zh_cn from "./langs/zh-cn";

Vue.use(VueI18n)

let lang = window.localStorage.getItem("_sys_fox_lang");

const i18n = new VueI18n({
    locale: lang || 'zh_cn',
    messages
})
locale.i18n((key, value) => i18n.t(key, value)) //重点：为了实现element插件的多语言切换

export default i18n