import TestObject from '../page/test/test-object/index.vue'
import testPeripgerais from '../page/test/testPeripgerais/index.vue'

// <import empty slot>
// 路由表
let routes = [
    {
        path: '/test/test-object',
        name: 'T0001',
        component: TestObject,
    },
    {
        path: '/test/testPeripgerais',
        name: 'test/testPeripgerais',
        component: testPeripgerais,
    },
    // <route empty slot>
]
// 导出路由表
export default routes
