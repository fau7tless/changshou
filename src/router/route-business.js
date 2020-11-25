// 客户信息
import Contract from '../page/business/contract'
import CustomerInfo from '../page/clear/localBurrencyBusiness/netLocalCurrency/customerInfo/index.vue'
// 联网核查
import Verifyidcard from '../page/business/verify/verifyidcard/index.vue'
import Verifybatchlist from '../page/business/verify/verifytradelog/index.vue'

// 交易日志
import Tradelog from '../page/business/query/tradelog/index.vue'
import TradelogView from '../page/business/query/tradelog/view/view.vue'
import receipt from '../page/business/receipt'
// <import empty slot>

// 路由表
let routes = [
    // 客户360视图
    {
        path: '/clear/localBurrencyBusiness/netLocalCurrency/customerInfo',
        name: 'customerInfo',
        component: CustomerInfo,
    },
    // 综合签约
    {
        path: '/comprehensiveContract',
        name: 'contract',
        component: Contract,
    },
    // 联网核查
    {
        path: '/verify/verifyidcard',
        name: '/verifyidcard',
        component: Verifyidcard,
    },
    {
        path: '/verify/verifytradelog',
        name: 'verifytradelog',
        component: Verifybatchlist,
    },
    // 交易日志
    {
        path: '/foundation/business/query',
        name: 'tradelog',
        component: Tradelog,
    },
    {
        path: '/foundation/business/query/view',
        name: 'tradelog/view',
        component: TradelogView,
    },
    {
        path: '/business/receipt',
        name: '/business/receipt',
        component: receipt,
    },
    // <route empty slot>
]

// 加入路由表
export default routes
