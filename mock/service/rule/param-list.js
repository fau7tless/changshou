import Mock from 'mockjs'

Mock.mock(/\/globle\/componentDefine\/paramList/, {
    data: [
        {
            id: '10',
            compId: '4',
            paramName: '比较类型',
            paramOrder: '1',
            paramSource: 'RULE_COMPONENT_TYPE',
        },
        {
            id: '11',
            compId: '4',
            paramName: '基准值',
            paramOrder: '2',
            paramSource: 'NULL',
        },
        {
            id: '12',
            compId: '4',
            paramName: '比较值',
            paramOrder: '3',
            paramSource: 'NULL',
        },
    ]
})

Mock.mock(/\/globle\/componentDefine\/tradeList/, {
    list: [
        {
            tradeCode: 'group',
            tradePath: '/example/group',
            tradeName: '组框架',
        },
        {
            tradeCode: 'text',
            tradePath: '/example/text-item',
            tradeName: '组+文本框',
        },
        {
            tradeCode: 'money-item',
            tradePath: '/example/money-item',
            tradeName: '组+金额框',
        },
    ]
})