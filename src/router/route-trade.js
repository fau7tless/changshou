import Authorize from '../page/trade/pub/authorize/index.vue'
import AuthorizeRemote from '../page/trade/pub/authorize-remote/index.vue'
import AuthorizeList from '../page/trade/pub/authorize-list/index.vue'
import Voucher from '../page/trade/pub/voucher/index.vue'
// <import empty slot>
import t080303 from '../page/trade/core/cash/t080303/index.vue'
import draw from '../page/trade/core/cash/draw/index.vue'
import openCard from '../page/trade/openCard/index.vue'
import easypage from '../page/trade/core/easypage/index.vue'
import templateSeal from '../page/trade/core/cash/templateSeal'
import sealRuleConfig from '../page/trade/core/cash/sealRuleConfig'
import eVoucherChannelApply from '../page/trade/core/cash/eVoucherChannelApply'
import templateMaintain from '../page/trade/core/cash/templateMaintain'
import eVoucherMaintain from '../page/trade/core/cash/eVoucherMaintain'
import eVoucherOrgName from '../page/trade/core/cash/eVoucherOrgNameMaintain'
import eVoucherManage from '../page/trade/core/cash/eVoucherManage'
import help from '../page/trade/help'
import acctInfo from '../page/trade/pub/showcustomerinfo'
import shopping from '../page/trade/shopping'
import shoppingBus from '../page/trade/pub/shoppingBus'
// 路由表
let routes = [
    {
        path: '/trade/pub/voucher',
        name: 'voucher',
        component: Voucher,
    },
    {
        path: '/trade/pub/authorize',
        name: 'authorize',
        component: Authorize,
    },
    {
        path: '/trade/pub/authorize-remote',
        name: 'authorize_remote',
        component: AuthorizeRemote,
    },
    {
        path: '/trade/pub/authorize-list',
        name: 'authorize_list',
        component: AuthorizeList,
    },
    // <route empty slot>
    {
        path: '/trade/core/cash/t080303',
        name: '/trade/080303',
        component: t080303,
    },
    {
        path: '/trade/core/cash/draw',
        name: '/trade/draw',
        component: draw,
    },
    {
        path: '/trade/openCard',
        name: '/trade/openCard',
        component: openCard,
    },
    {
        path: '/trade/core/easypage',
        name: '/trade/easypage',
        component: easypage,
    },
    {
        path: '/trade/core/cash/templateSeal',
        name: '/trade/templateSeal',
        component: templateSeal,
    },
    {
       
        path: '/trade/core/cash/sealRuleConfig',
        name: '/trade/sealRuleConfig',
        component: sealRuleConfig,
    },
    {
       
        path: '/trade/core/cash/eVoucherChannelApply',
        name: '/trade/eVoucherChannelApply',
        component: eVoucherChannelApply,
    },
    {
        path: '/trade/core/cash/templateMaintain',
        name: '/trade/templateMaintain',
        component: templateMaintain,
    },
    {
        path: '/trade/core/cash/eVoucherMaintain',
        name: '/trade/eVoucherMaintain',
        component: eVoucherMaintain,
    },
    {
        path: '/trade/core/cash/eVoucherOrgNameMaintain',
        name: '/trade/eVoucherOrgNameMaintain',
        component: eVoucherOrgName,
    },

    {
        path: '/trade/help',
        name: '/trade/help',
        component: help,
    },
   
    {
        path: '/trade/pub/showcustomerinfo',
        name: '/trade/pub/showcustomerinfo',
        component: acctInfo,
    },
    {
        path: '/trade/core/cash/eVoucherManage',
        name: '/trade/eVoucherManage',
        component: eVoucherManage,
    },
    {
        path: '/trade/shopping',
        name: '/trade/shopping',
        component: shopping,
    },
    {
        path: '/trade/pub/shoppingBus',
        name: '/trade/pub/shoppingBus',
        component: shoppingBus,
    },
    
]
// 导出路由表
export default routes
