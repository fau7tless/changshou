import BaseFlow from './base-flow'

/**
 * 正常流程
 */
export default class NormalFlow extends BaseFlow {
    /**
     * flow名称
     * @type {string}
     */
    static getName() {
        return 'normal'
    }

    /**
     * Vue对象创建，当数据加载前
     */
    beforeCreate(session) {}

    /**
     * created前调用
     * @param session
     */
    preCreated(session) {}

    /**
     * Vue对象创建，数据加载后，更改数据不会触发updated函数
     */
    created(session) {}

    /**
     * created后调用
     * @param session
     */
    postCreated(session) {}

    /**
     * 界面渲染前，更改数据不会触发updated函数
     */
    beforeMount(session) {}

    /**
     * mounted前执行
     * @param session
     * @param context
     */
    preMounted(session, context) {
        context.resolve()
    }

    /**
     *  界面渲染后，更改数据会触发钩子函数
     * @param session
     * @param context
     */
    mounted(session, context) {
        context.resolve()
    }

    /**
     * mounted后执行
     * @param session
     * @param context
     */
    postMounted(session, context) {
        if (this.$route.params.btnType != 'update') {
            context.resolve()
            return
        }
        // 获取主页面传入数据
        let syncData = fox.custom.getSyncData(this)
        let { reviewSerialNum } = syncData
        let { funcNum } = this.$route.params
        // 查询提交的界面字段，还原界面
        fox.service
            .request({
                id: 'getReview',
                app: backend.infraReview,
                path: '',
                data: {},
            })
            .then(
                (response) => {
                    if (response.code == 0) {
                        let data
                        if (fox.type(response.data) == 'array') {
                            data = JSON.stringify(response.data)
                            console.log(response.data)
                        }
                        // 信息框
                        fox.layer.message('成功')
                    } else {
                        fox.layer.message(`失败:${response.message}`)
                    }
                    // 关闭当前页面
                    fox.custom.closePage(that)
                },
                (error) => {
                    fox.layer.message(`请求异常:${error.message}`)
                    console.log(error.message)
                },
            )
    }

    /**
     * before update
     * @param session
     */
    beforeUpdate(session) {}

    /**
     * updated前执行
     * @param session
     * @param context
     */
    preUpdated(session, context) {
        context.resolve()
    }

    /**
     * 当更新完成后，执行updated，数据已经更改完成，dom也重新render完成，可以操作更新后的虚拟dom
     */
    updated(session, context) {
        context.resolve()
    }

    /**
     * updated后执行
     * @param session
     * @param context
     */
    postUpdated(session, context) {
        context.resolve()
    }

    /**
     * 调用$destroy方法后，立即执行beforeDestroy
     */
    beforeDestroy(session) {}

    /**
     * 组件的数据绑定、监听...去掉后只剩下dom空壳，这个时候，执行destroyed
     */
    destroyed(session) {}

    /**
     * 暂存数据
     */
    tempSave(session) {}

    /**
     * 恢复数据
     */
    recover(session) {}

    /**
     * 设置检查条件
     * @param context
     */
    setCheckConditions(context) {
        context.resolve()
    }

    /**
     * 提交前处理
     * @param context
     * @param checkResult
     */
    preSubmit(context, checkResult) {
        context.resolve()
    }

    /**
     * 提交处理(system scope)
     * @param context
     * @param args
     */
    commit(context, data) {
        // 获取session
        let { session } = context
        // 建立流水号ID
        let seqId = new Date().getTime()
        // 路由
        let location = this.$route.path || this.$route.name
        // 获取界面数据
        let uiData = fox.custom.getRequestData(this)
        // 获取交易信息
        let tradeInfo = session.data.tradeInfo || {}
     
        // 创建授权数据
        let authData = {
            seqId: seqId,
            route: location,
            uiData: uiData,
        }
        // 合并交易信息
        Object.assign(authData, tradeInfo)

        // 授权方式
        let authType = session.data.foreAuthType || 'remote'
        
        // 请求路径
        let path
        // 属性
        let attrs = {}
        if(authType == 'noAuth') {
            console.log('无需授权')
            return context.resolve() 
        }
        // 远程授权
        if(authType == 'remote') {
            // 设置路径
            path = '/trade/pub/authorize-remote'
            Object.assign(attrs, {
                top: '1vh',
                title: '远程授权',
                width: '80%',
            })
        } else{ // 本地授权
            // 设置路径
            path = '/trade/pub/authorize'
            Object.assign(attrs, {
                top: '10vh',
                title: '本地授权',
                width: '60%',
            })
        } 

        let syncData = {
            tradeInfo: [
                {
                    reason: '转帐金额大于1千万',
                    level: 1,
                },
            ],
            authData: authData,
        }
        // 打开授权页面
        fox.custom.appendPageWithResult(this, path, attrs, {}, syncData, (code, rsp) => {
            console.info(`auth result code:${code}`)
            // 记录授权类型
            session.data.authType = authType
            // code：0代表授权成功
            if(code == 0) {
                console.info('授权成功')
                if(authType == 'remote') {
                    session.data.authResult = 'pass'
                    // 跳过submit步骤，直接到post submit步骤
                    context.go(2)
                }else{
                    // 本地授权成功，跳转到submit步骤
                    context.go(1)
                }
            } else if(code == 1) { // code:1代表授权取消
                session.data.authResult = 'cancel'
                // 跳过submit步骤，直接到post submit步骤
                context.go(2)
            } else{ // 其它授权失败
                session.data.authResult = 'fail'
                console.info('授权失败')
                context.reject()
            }
            context.resolve()
        })
    }

    /**
     * 提交处理
     * @param context
     * @param args
     */
    submit(context, data) {
        console.log('submit')
        context.resolve()
    }

    /**
     * 提交后处理
     * @param context
     * @param params
     */
    postSubmit(context, ...args) {
        // 获取session
        let { session } = context
        if(session.data.authType == 'remote' && session.data.authResult == 'pass') {
            setTimeout(() => {
                this.$alert('远程授权请求发送成功，请耐心等待', '提示', {
                    confirmButtonText: '确定',
                    callback: () => {
                        // 返回code：1代表授权操作取消
                        fox.custom.closePage(this)
                    },
                })
            }, 50)
        }else if(session.data.authResult == 'fail') {
            fox.custom.closePage(this)
        }
    }

    /**
     * 提交取消处理
     * @param context
     * @param args
     */

    cancelSubmit(context, ...args) {
        // 如果授权取消，不进行任何处理
        let { session } = context
        if(session.data.authResult === 'cancel') {
            return
        }

        if(args && args.length > 1 && args[0].pass === true) {
            fox.custom.closePage(this)
        } 
    }
}