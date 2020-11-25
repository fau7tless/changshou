import termSearch from '../../page/term/other/term/search/index.vue'
import termSearchInfo from '../../page/term/other/term/search/info/index.vue'
import termApply from '../../page/term/other/term/apply/index.vue'
// <import empty slot>
// 路由表
let routes = [
    {
        path: '/term/other/term/search',
        name: '080001',
        component: termSearch,
    },
    {
        path: '/term/other/term/search/info',
        name: '',
        component: termSearchInfo,
    },
    {
        path: '/term/other/term/apply',
        name: '080003',
        component: termApply,
    },
    // <route empty slot>
]
// 导出路由表
export default routes
