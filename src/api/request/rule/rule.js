export function getPublicRules() {
    let promise = new Promise((resolve, reject) => {
        fox.service.request({
            app: backend.rule,
            path: '/api/ruleDefine/index',
            data: {},
            callback(code, message, data) {
                if (code == 0) {
                    if (typeof data === 'string') {
                        data = JSON.parse(data)
                    }
                    let { list } = data
                    for (let item in list) {
                        list[item].text = list[item].ruleName
                        list[item].value = list[item].ruleId
                    }
                    resolve(list)
                } else {
                    resolve(message)
                }
            },
        })
    })
    return promise
}

export function getRuleDetail(ruleId) {
    let params = ruleId
    console.log(ruleId)
    params = JSON.stringify(params)
    let promise = new Promise((resolve, reject) => {
        fox.service.request({
            id: 'getRuleDetail',
            app: backend.rule,
            path: 'api/ruleDefine/show',
            data: {
                ruleId: ruleId,
            },
            params,
            callback(code, message, data) {
                if (code == 0) {
                    if (typeof data === 'string') {
                        data = JSON.parse(data)
                    }
                    resolve(data)
                } else {
                    resolve(message)
                }
            },
        })
    })
    return promise
}

export function createPublicRule(params) {
    let promise = new Promise((resolve, reject) => {
        fox.service.request({
            id: 'createPublicRule',
            app: backend.rule,
            path: 'api/ruleDefine/create',
            data: params,
            callback(code, message, data) {
                if (code == 0) {
                    if (typeof data === 'string') {
                        data = JSON.parse(data)
                    }
                    resolve(data)
                } else {
                    resolve(message)
                }
            },
        })
    })
    return promise
}

export function listMount() {
    let promise = new Promise((resolve, reject) => {
        fox.service.request({
            id: 'listMount',
            app: backend.rule,
            path: 'api/ruleComponentDefine/list',

            callback(code, message, data) {
                if (code == 0) {
                    resolve(data)
                    // console.log(data);;
                } else {
                    resolve(message)
                }
            },
        })
    })
    return promise
}

export function queryDicTypes(params) {
    let promise = new Promise((resolve, reject) => {
        fox.service.request({
            id: 'queryDicTypes',
            app: backend.rule,
            path: '/api/ruleDefine/index',
            data: {},
            callback(code, message, data) {
                if (code == 0) {
                    if (typeof data === 'string') {
                        data = JSON.parse(data)
                    }
                    resolve(data)
                } else {
                    resolve(message)
                }
            },
        })
    })
    return promise
}

export function queryRuleComponent(params) {
    return fox.custom.promise({ url: 'api/ruleComponentDefine/index', app: backend.rule, ...params })
}