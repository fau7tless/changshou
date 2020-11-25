/* eslint-disable */

// 导入路由
import routes from './route-table'

// 匹配列表
let map = {
    '/example': './static/js/example.js',
}
// 匹配函数
function matchDependency(route) {
    if(route.path == undefined){
        return undefined
    }
    for (let key in map) {
        let index = route.path.indexOf(key)
        if(index == 0) {
            let module = map[key]
            return module
        }
    }
    return undefined
}

// 导入not found route
import NotFound from '@/page/common/not-found/index.vue'

// not found路由
let notFoundRoute =  {
    path: '/not_found',
    name: 'not_found',
    component: NotFound,
}

// Route配置
export default class RouteConfig{
    // 安装路由
    static install(fox) {
        fox.router.setNotFoundRoute(notFoundRoute)
        // 注册路由
        fox.router.addRoutes(routes);
        // 加入依赖模块解析器
        fox.router.setResolveDependency((route)=>{
            // 匹配依赖
            let matched = matchDependency(route)
            // 返回匹配依赖模块
            return matched
        })
    }
    // 返回所有路由
    static getRoutes() {
        return routes
    }
}
