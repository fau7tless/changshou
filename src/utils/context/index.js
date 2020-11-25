import { setUserInfo, userInfo } from './user-info'

let foxContext = {
    /**
     * 安装
     */
    install(Vue, fox) {
        // 设置custom 方法

        fox.session = {
            setUserInfo,
            userInfo
        }
    },
}
export { foxContext }
