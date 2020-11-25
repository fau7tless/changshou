import Mock from 'mockjs'

Mock.mock(/\/mock\/table\/getData/, {
    sysHead: {
        responseCode: '200',
    },
    appHead: {
        totalSize: '3',
    },
    body: {
        list: [
            {
                date: '2020-07-01',
                name: '小王1',
                address: '地址1',
                phone: '18000000001', 
                sex: '01',
            },
            {
                date: '2020-07-02',
                name: '小王2',
                address: '地址2',
                phone: '18000000002', 
                sex: '02',
            },
            {
                date: '2020-07-03',
                name: '小王3',
                address: '地址3',
                phone: '18000000003', 
                sex: '01',
            },
            {
                date: '2020-07-04',
                name: '小王4',
                address: '地址4',
                phone: '18000000004', 
                sex: '02',
            },
        ],
    },
})

Mock.mock(/\/mock\/table\/getData2/, {
    sysHead: {
        responseCode: '200',
    },
    appHead: {
        totalSize: '6',
    },
    body: {
        list: [
            {
                date: '2020-07-01',
                name: '小王1',
                address: '地址1',
                phone: '18000000001',
                sex: '01',
            },
            {
                date: '2020-07-02',
                name: '小王2',
                address: '地址2',
                phone: '18000000002',
                sex: '02',
            },
            {
                date: '2020-07-03',
                name: '小王3',
                address: '地址3',
                phone: '18000000003',
                sex: '01',
            },
            {
                date: '2020-07-04',
                name: '小王4',
                address: '地址4',
                phone: '18000000004',
                sex: '02',
            },
        ],
    },
})

function getList() {
    let list = []
    for (let i = 0; i < 20; i++) {
        list.push({
            value: `C00${i}`,
            text: `参与者${i}`,
        })
    }
    return list
}

Mock.mock(/\/mock\/select\/getList(.+)lang=zh_cn/, {
    items: [
        {
            value: 'C001',
            text: '参与者001',
        },
        {
            value: 'C002',
            text: '参与者002',
        },
        {
            value: 'C003',
            text: '参与者003',
        },
        {
            value: 'C004',
            text: '参与者004',
        },
        {
            value: 'C005',
            text: '参与者005',
        },
    ],
})