// 设置配置
const config = {
    // APP名称
    // app: 'icsp-uniform-rules',
    app: 'icsp-app-sso',
    // app: 'icsp-app-sso-x',
    // app:"services",
    //请求URL
    // url:"139.199.79.118:9705",
    // url:"127.0.0.1:9705",
    // url: '192.168.43.251:9100',
    // url: '47.98.125.109:9200',
    url: '170.100.136.136:8080',
    // url:'47.98.125.109:5999',
    // url:'192.168.36.17:9080',
    // url:'192.168.36.17:9100',
    // 是否启用SSL
    ssl: false,
    // debug请求URL
    // debug_url:"192.144.128.218:9292",
    // 是否启用debug SSL
    // debug_ssl:false,
    // web socket 通信方式
    webSocketType: 'get',
    // 默认root id
    defaultRootId: '_rootDiv',
    // 首页
    startPage: 'group',
    // 录制模式
    recorderModel: false,
    // 录制范围
    recorderScope: ['fox.service'],
    // 调试模式
    debugModel: false,
    // 调试范围
    debugScope: ['fox.service'],
}

// 设置配置
if(window) {
// 设置配置
    window.fox_GobaleConfig = config
}
// 导出配置
export default config
