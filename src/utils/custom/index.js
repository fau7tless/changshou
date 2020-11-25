import { getRequestData, setResponseData, resetData } from './comm-helper'
import {
    openPage,
    openPageWithResult,
    appendPage,
    appendMediumPage,
    appendPageWithResult,
    appendMediumPageWithResult,
    closePage,
    closePageWithResult,
    getSyncData,
    getValue,
} from './page-helper'
import { mapping } from './mapping'
import { PageMixin } from './page-mixin'
import promise from './request'
import {
    getCurrentDay, getCurrentMonth, inScope4Day, inScope4Month, 
} from './date-helpher'

let foxCustom = {

    /**
     * 安装
     */
    install(Vue, fox) {
        // 设置custom 方法
        fox.custom = {
            getRequestData,
            setResponseData,
            resetData,
            openPage,
            openPageWithResult,
            appendPage,
            appendMediumPage,
            appendPageWithResult,
            appendMediumPageWithResult,
            closePage,
            closePageWithResult,
            getSyncData,
            getValue,
            mapping,
            PageMix: PageMixin,
            promise,
        }

        Vue.mixin({
            data() {
                return {
                    allDics: '',
                    cacheDics: new Map(),
                }
            },
            // 方法
            mounted() {
                if (this.dicTypes) {
                    console.log('全局混入 字典转码=>' + JSON.stringify(this.dicTypes))
                   
                    // getTreeDicList({ dicType: this.dicTypes }).then((res) => {
                    //     this.allDics = res.data
                    // })
                }
            },
            computed: {
                convertDic() {
                    // 通过闭包来传递 计算属性的参数
                    return (dicType, code) => {
                        if (code == null || code === '' || ((code instanceof Array) && code.length === 0)) {
                            return null
                        }
                        const key = dicType + code
                        // 字典缓存
                        if (this.cacheDics.get(key)) {
                            return this.cacheDics.get(key)
                        }
                        if (!(code instanceof Array) && typeof (code.indexOf) === 'function') {
                            code = code.indexOf(',') === -1 ? code : code.split(',')
                        }
              
                        // 如果传递的是数组 那么递归转码
                        if (code instanceof Array) {
                            return code.map((item) => this.convertDic(dicType, item))
                        }
                        let current // 这个字典码的对象
                        // 优化字典转码
                        // return this.allDics && this.allDics[dicType] ? (current = this.allDics[dicType].find((dic) => dic.code === code)) ? current['text'] : code : code
                        if (this.allDics && this.allDics[dicType]) {
                        // 首先在父节点转码，未找到对应字典项则调用convertChild，在子节点中找对应字典项

                            current = this.allDics[dicType].find((dic) => dic.code == code)
                            if (current === undefined) {
                                current = this.convertChild(this.allDics[dicType], code)
                            }
                            // 对字典进行缓存
                            if (current) {
                                this.cacheDics.set(key, current.text)
                            } else {
                                this.cacheDics.set(key, code)
                            }
                            return current ? current.text : code
                        } else {
                            return code
                        }
                    }
                },
            },
            methods: {

                /**
                 * 服务请求
                 * @param args
                 */
                request(args) {
                    return fox.service.request(args)
                },
                // allDics:字典项,code:字典码
                // 如果找到匹配的字典项则退出循环，否则继续递归
                convertChild(allDics, code) {
                    let current
                    for (const i of allDics) {
                        if(i.child) {
                            current = i.child.find((item) => item.code === code)
                            if(!current) current = this.convertChild(i.child, code)
                        }
                    }
                    return current
                },
            },
        })
    },
}
export { foxCustom }