import Login from '../page/common/login/index.vue'
import Frame from '../page/common/frame/index.vue'
import Dashboard from '../page/common/dashboard/index.vue'
import PortBind from '../page/common/frame/components/portBind/index.vue'
import CustomerInfo from '../page/clear/localBurrencyBusiness/netLocalCurrency/customerInfo/index.vue'

// <import empty slot>
// 路由表
let routes = [
    //登录
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    //主框架
    {
        path: '/frame',
        name: 'frame',
        component: Frame,
    },
    //首页
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
    },
    //
    {
        path: '/common/customerinfo',
        name: 'customerinfo',
        component: CustomerInfo,
    },
    {
        path: '/frame/components/portBind',
        name: 'portBind',
        component: PortBind,
    },
    // <route empty slot>
]
// 导出路由表
export default routes
