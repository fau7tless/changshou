import Mock from 'mockjs'

Mock.mock(/\/bpi\/(\S)*/, {
    head: {
        responseCode: '200',
        totalSize: '150',
    },
    'body|10': [{
    	'title':'@ctitle',
    	'publishTime':'@date',
    }]
})