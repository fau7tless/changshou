// 服务请求过滤器
let ServiceFilter = {
    // 过滤器名称
    name: 'messageParser',
    // 请求前触发
    before: function(event) {
        let contentType = event.all ? event.all.contentType : ''
        console.log(event)
        event.all.raw = true
        if (contentType && contentType === 'application/x-www-form-urlencoded') {
            // 保存导出数据
            event.code = 0
            // 返回处理标志，true则继续处理，false则中断处理
            return true
        } else {
            let reqHead = event.all.appHead || {}
            // 请求系统报文头
            let sysHead = {
                sourceCode: '01',
                sourceType: '01',
                requestSeq: '',
                requestDate: '',
                operNum: 'admin',
                memNum: '',
                langCode: reqHead.langCode || localStorage.getItem('_sys_fox_lang') || 'zh_cn',
                pageNum: reqHead.page || 1,
                pageSize: reqHead.Size || 10,
            }
            // 请求交易报文头
            let tradeHead = {}

            // 定义请求数据
            let reqData = {
                // 系统请求头
                sysHead,
                // 交易报文头
                tradeHead,
                // 报文体信息
                body: event.data,
            }
            // 保存导出数据
            event.code = 0
            event.data = reqData
            // 返回处理标志，true则继续处理，false则中断处理
            return true
        }
    },

    // 请求返回后触发
    after: function(event) {
        // 只处理JSON对象
        if (
            fox.type(event.data) == 'object'
            // && fox.type(event.data.sysHead) != 'undefined'
            // && fox.type(event.data.tradeHead) != 'undefined'
            && fox.type(event.data.head) != 'undefined'
            // && fox.type(event.data.appHead) != 'undefined'
        ) {
            // 获取系统请求头
            // let rspSysHeader = event.data.sysHead
            // 获取应用请求头
            // let rspTradeHeader = event.data.tradeHead

            let rspHeader = event.data.head
            // 获取响应数据
            let rspData = event.data.body

            if (
                // fox.type(rspSysHeader.responseCode) == 'undefined'
                // || rspSysHeader.responseCode == 200
                fox.type(rspHeader.responseCode) == 'undefined'
                || rspHeader.responseCode == 200
            ) {
                // // 保存导出数据
                // event.code = 0
                // event.message = ''
                // event.data = rspData
                // event.params = [rspSysHeader, rspAppHeader]
                // 保存导出数据
                event.code = 0
                event.message = rspHeader.responseMes
                event.data = rspData
                event.params = [rspHeader]
                // 返回处理标志，true则继续处理，false则中断处理
                return true
            } else {
                // // 保存导出数据
                // event.code = rspSysHeader.responseCode
                // event.message = rspSysHeader.responseMsg
                // event.data = rspData
                // event.params = [rspSysHeader, rspAppHeader]

                // 保存导出数据
                event.code = rspHeader.responseCode
                event.message = rspHeader.responseMes
                event.data = rspData
                // event.params = [rspHeader]
                // 返回处理标志，true则继续处理，false则中断处理
                return true
            }
        }
        // 返回处理标志，true则继续处理，false则中断处理
        return true
    },

    // 请求返回后触发
    after1: function(event) {
        // 只处理JSON对象
        if (
            fox.type(event.data) == 'object'
            && fox.type(event.data.header) != 'undefined'
        ) {
            // 获取响应头
            let rspHeader = event.data.header
            // 获取响应数据
            let rspData = event.data.data

            if (
                fox.type(rspHeader.code) == 'undefined'
                || rspHeader.code == 0
            ) {
                // 保存导出数据
                event.code = 0
                event.message = ''
                event.data = rspData
                // 返回处理标志，true则继续处理，false则中断处理
                return true
            } else {
                // 保存导出数据
                event.code = rspHeader.code
                event.message = rspHeader.msg
                event.data = rspData
                // 返回处理标志，true则继续处理，false则中断处理
                return true
            }
        }
        // 返回处理标志，true则继续处理，false则中断处理
        return true
    },

    // 异常发生后触发
    exception: function(event) {
        // 获取url
        let url = window.location.toString()
        if (event.message == 'nlogin') {
            // 返回处理标志，true则继续处理，false则中断处理
            return false
        }
        // 重复提交处理
        if (event.message == 'resubmit') {
            fox.logger.error('resubmit error')
            // 返回处理标志，true则继续处理，false则中断处理
            return false
        }
        // 返回处理标志，true则继续处理，false则中断处理
        return true
    },
}

/**
 * 过滤器安装
 * @param vue
 * @param fox
 */
ServiceFilter.install = function(Vue, fox) {
    fox.service && fox.service.addFilter(ServiceFilter)
}

export default ServiceFilter
