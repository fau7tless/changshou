import { getSelectItems } from './model/select/select-api'
import { getTablePageData } from './model/table/table-api'
import { getCascaderItems } from './model/cascader/cascader-api'
import uiSetting from './model/ui/ui-setting-api'

let foxAPI = {
    /**
     * 安装
     */
    install(fox) {
        fox.api = {
            // 获取select items
            getSelectItems: getSelectItems,
            // 获取table数据
            getTablePageData: getTablePageData,
            // 获取cascader items
            getCascaderItems: getCascaderItems,
            // ui setting
            uiSetting: uiSetting,
        }

        window.backend = {
            uniformRules: '/',
            userService: 'api',
            ssoService: 'icsp-app-sso',
            bcmpService: 'api',
            paperless: 'icsp-app-paperless',
            generatorService: 'icsp-app-queue', // 代码生成
            sysId: 'btop', // 默认系统ID
            oca: 'icsp-app-oca',
            rule: 'icsp-app-rule',
            uaa: 'icsp-uaa',
            csnsh: 'icsp-app-csnsh',
            RSAPublicKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrDUHc85ADQVxXRP4M90nqttWoZctV6JJVVdPjIle5vd9G2/4kgIhNc78Jd+ENxg+n4Gj9UMwNhJmb2jnMaW3zyGB+qi/ZrMO5dEUhW8salirzRgGg/4Arz4ObPmCWlZsws3Ij/3IEsFD3vMdIZD2j8b33DAbj47PjcCcMbtHYuQIDAQAB',
        }
    },
}

export { foxAPI }
