// 引入mockjs
import Mock from 'mockjs'
import menu from './menu'

Mock.mock(/\/mock\/login\/getMenuList/, {
    // sysHead: {
    //     responseCode: '200',
    //     responseMes: '操作成功'
    // },
    // tradeHead: {},
    head: {
        responseCode: '200',
    },
    // appHead: {

    // },
    body: {
        menus: menu,
    },
})

// 使用mockjs模拟数据
Mock.mock(/\/demo\/login\/login/, {
    // sysHead: {
    //     responseCode: '200',
    //     responseMes: '操作成功'
    // },
    // tradeHead: {},
    head:{},
    body: {
        title: 'Fox前端',
        name: '江成',
        level: 'VIP',
        head: './static/img/img.png',
        menu: [
            {
                icon: 'el-icon-setting',
                index: '/example/group',
                title: '系统首页',
            },
            {
                icon: 'el-icon-menu',
                index: '/example/group',
                title: '业务组件',
                subs: [
                    {
                        menuId: '17a03c91ffc7449d9bdc25da1fc01a12',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/group',
                        title: '组框架',
                        menuCode: '010101',
                        menuPy: 'zhukuanjia',
                    },
                    {
                        menuId: '484538468895468cb8cbbb4d92274a4a',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/date-item',
                        title: '组+日期框',
                        menuCode: '010102',
                        menuPy: 'zhukuanjia',
                    },
                    {
                        menuId: '26794f1ddcd148b29da5849bced934ed',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/table-item',
                        title: '组+表格',
                        menuCode: '010103',
                        menuPy: 'zhukuanjia',
                    },
                    {
                        menuId: '9cc954f684c74a13b02fdad45a60c327',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/time-item',
                        title: '组+时间框',
                        menuCode: '010104',
                        menuPy: 'zhukuanjia',
                    },
                    {
                        menuId: '982a9a949ebd4b5db19930ddc6b9fb8b',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/lang',
                        title: '国际化',
                        menuCode: '010105',
                        menuPy: 'zhukuanjia',
                    },
                    {
                        menuId: 'a030fc171f2643c483ff736b78993d3e',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/text-item',
                        title: '组+文本框',
                        menuCode: '010106',
                        menuPy: 'zhukuanjia',
                    },
                    {
                        menuId: '8c0aff0eccc54914a8da244e28293e00',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/money-item',
                        title: '组+金额框',
                        menuCode: '010107',
                        menuPy: 'zhukuanjia',
                    },
                    {
                        menuId: 'f749fc5f1f3145c3a639ca9136d2abf6',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/select-item',
                        title: '组+选择框',
                    },
                    {
                        menuId: 'cfb29c91d308416bbe2228d38c073bcd',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/model-extract',
                        title: '上下文提取',
                    },
                    {
                        menuId: '4e1dd1f8c0c74c3da71a8f499f76d828',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/switch-item',
                        title: '组+switch',
                    },
                    {
                        menuId: 'f900fe1fb61a4cf3959c972f94f8ff9d',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/radio-item',
                        title: '组+radio',
                    },
                    {
                        menuId: '725802c9116a4f108c8d011d44f8da4c',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/rate-item',
                        title: '组+评分',
                    },
                    {
                        menuId: 'ecceacf68aa849e69b03cadad7d63ac2',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/slider-item',
                        title: '组+slider',
                    },
                    {
                        menuId: 'f56036f75af54098af12c133aec65639',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/checkbox-item',
                        title: '组+checkbox',
                    },
                    {
                        menuId: '39dc89c6063a4d05bfecd9d332e52d85',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/cascader-item',
                        title: '组+级联选择器',
                    },
                    {
                        menuId: 'ba5ece85aebc4312ba760d8b89990f9b',
                        upMenuId: '6401014d72cb45be9867667638de867a',
                        icon: 'el-icon-menu',
                        index: '/example/number-item',
                        title: '组+数字框',
                    },
                ],
            },
            {
                icon: 'el-icon-menu',
                index: '10000127',
                title: '模板示例',
                subs: [
                    {
                        menuId: '0f068d9068a846639527ceb186549dcc',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-menu',
                        index: '/template/grouping-form',
                        title: '分组表单',
                    },
                    {
                        menuId: '703bbab42b9d4ec8b87791727721b18b',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-menu',
                        index: '/template/info-form',
                        title: '普通表单(详情)',
                    },
                    {
                        menuId: '2236788b971a4e11aa4920e16e135394',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-menu',
                        index: '/template/step-and-form',
                        title: '步骤表单',
                    },
                    {
                        menuId: '757f14ca7707472eafda9c7ad5870d6d',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-menu',
                        index: '/template/search-and-table',
                        title: '普通列表（查询）',
                    },
                    {
                        menuId: 'c9c2868f5f3f406c8ea37f84015f4c86',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-menu',
                        index: '/template/search-and-mdtables',
                        title: '主从表（查询）',
                    },
                    {
                        menuId: '18ca959b86e04214976c16821ef7a671',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-menu',
                        index: '/template/search-table-edit',
                        title: '查询列表（编辑）',
                    },
                    {
                        menuId: 'cd5382fd0d78478cbfe795a650ab01a7',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-circle-plus',
                        index: '/template/searchInsertTable',
                        title: '查询嵌套表格',
                    },
                    {
                        menuId: '24c430defc7f418db414e94fb48a407a',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-menu',
                        index: '/example/addCheck-example',
                        title: '新增复核表单案例',
                    },
                    {
                        menuId: 'd8d1901b40814658802d153042f6b73d',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-menu',
                        index: '/example/check-example',
                        title: '复核表单案例',
                    },
                    {
                        menuId: '7b33b4f27a9d496aa533239c47f4d2be',
                        upMenuId: '8d143b7160254f4fbe142e0b65778d1a',
                        icon: 'el-icon-s-promotion',
                        index: '/template/tree-and-select',
                        title: '树+查询',
                    },
                ],
            },
            {
                icon: 'el-icon-menu',
                index: '10000128',
                title: '统一规则管理',
                subs: [
                    {
                        menuId: '3dc33563123548958bbaca4e573ae604',
                        upMenuId: '69ab7ab98ae64a36a360a5b461c3377a',
                        icon: 'el-icon-menu',
                        index: '/rules/rule-component-query',
                        title: '规则组件查询',
                    },
                    {
                        menuId: '9df1ca73ba0949edb40e0dbc1b79c692',
                        upMenuId: '69ab7ab98ae64a36a360a5b461c3377a',
                        icon: 'el-icon-menu',
                        index: '/rules/public-rule',
                        title: '公共规则配置',
                    },
                    {
                        menuId: 'e96429129dd544ad991d2c0e77ca188e',
                        upMenuId: '69ab7ab98ae64a36a360a5b461c3377a',
                        icon: 'el-icon-menu',
                        index: '/rules/service-rule',
                        title: '服务规则配置',
                    },
                    {
                        menuId: '14e227fa473d4c26b39ed6c233bf0991',
                        upMenuId: '69ab7ab98ae64a36a360a5b461c3377a',
                        icon: 'el-icon-menu',
                        index: '/rules/scene-setting',
                        title: '场景规则配置',
                    },
                    {
                        menuId: '9b3a4f24c977487bb60d7bbf7071336b',
                        upMenuId: '69ab7ab98ae64a36a360a5b461c3377a',
                        icon: 'el-icon-menu',
                        index: '/rules/check-config',
                        title: '复核配置',
                    },
                ],
            },
            {
                icon: 'el-icon-menu',
                index: '10000129',
                title: '公共参数管理',
                subs: [
                    {
                        menuId: '32af84ddec664c9d9c07e1e8e010a0ee',
                        upMenuId: '3a86acf01f0f448fa78bfdf83b6ce0f4',
                        icon: 'el-icon-menu',
                        index: '/business',
                        title: '业务模块管理',
                    },
                    {
                        menuId: '6e2f9014c9444b2791ed2c04498ae8c4',
                        upMenuId: '3a86acf01f0f448fa78bfdf83b6ce0f4',
                        icon: 'el-icon-menu',
                        index: '/manage',
                        title: '业务功能管理',
                    },
                    {
                        menuId: '22eba9e286364e8bab7d4c8efa08f13b',
                        upMenuId: '3a86acf01f0f448fa78bfdf83b6ce0f4',
                        icon: 'el-icon-menu',
                        index: '/menu-config',
                        title: '菜单配置',
                    },
                    {
                        menuId: '72056d0cc82b4692bddcd8ccda0002b4',
                        upMenuId: '3a86acf01f0f448fa78bfdf83b6ce0f4',
                        icon: 'el-icon-menu',
                        index: '/control-point-manage',
                        title: '控制点管理',
                    },
                ],
            },
            {
                icon: 'el-icon-menu',
                index: '10000130',
                title: '发行信息',
                subs: [
                    {
                        menuId: '75d8e24130e34dd3be789c5c68f1f0b8',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/general-pledgebond',
                        title: '通用质押券替换修改',
                    },
                    {
                        menuId: '7fcd95eb9beb498ea91089e14892bf51',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/review-ccp',
                        title: 'CCP保证券管理复核',
                    },
                    {
                        menuId: '54d43dcfb8f040abaf573eef06847c4b',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/qualifiedBond-screeningCondition-waitCheckRecordList',
                        title: '合格券筛选条件待复核记录',
                    },
                    {
                        menuId: 'b0a7e3ad53f14553a655394ad3031bcd',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/ccp-guaranteedSecurity-manage',
                        title: 'CCP保证券管理',
                    },
                    {
                        menuId: '27a01590e4724d218d05120f80d33263',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/change-record',
                        title: '合格券记录变更',
                    },
                    {
                        menuId: '2563cae34a1c473cbf796574da64f495',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/manage-publish',
                        title: '合格券券种转换维护',
                    },
                    {
                        menuId: 'b1850551ff984096bef4fb25ca9263ad',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/check-publish',
                        title: '合格券券种转换复核',
                    },
                    {
                        menuId: 'e3a33426ea9945e9a6e08c43d60d4cc6',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/add-publish',
                        title: '合格券券种转换新增',
                    },
                    {
                        menuId: 'eaab1a22d2e84be5847bcaa45167afa0',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/review-task-list',
                        title: '复核任务列表',
                    },
                    {
                        menuId: 'e1f51608e5b04cc6853807f7de8588db',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: '',
                        index: '/publish/asset-info',
                        title: '资产信息',
                    },
                    {
                        menuId: '0051132fbd614687bc4cfacc915366e7',
                        upMenuId: '997da600bc4b412996d2a58ca7b932bb',
                        icon: 'el-icon-menu',
                        index: '/publish/test-business',
                        title: '测试交易',
                    },
                ],
            },

            {
                icon: 'el-icon-error',
                index: '404',
                title: '404页面',
            },
        ],
    },
})

Mock.mock(/\/mock\/login\/queryuser/, {
    // sysHead: {
    //     responseCode: '200',
    //     responseMes: '操作成功'
    // },
    // tradeHead: {},
    head: {
        responseCode: '200'
    },
    // appHead: {

    // },
    body: {
        loginType: '0',
        loginOrg: '0100',
        orgList: [
            { text: '宁波分行', value: '0100' },
            { text: '常熟分行', value: '0200' },
        ],
    },
})

Mock.mock(/\/api\/adminsmmenu\/querymenu/, {
    head: {
        responseCode: '200',
    },
    body: [],
})
