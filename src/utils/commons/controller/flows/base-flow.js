/**
 * 基础流程
 */
export default class BaseFlow {
    /**
     * flow名称
     * @type {string}
     */
    static getName() {
        return 'base'
    }

    /**
     * Vue对象创建，当数据加载前
     */
    beforeCreate(session) {
        //
    }

    /**
     * created前调用
     * @param session
     */
    preCreated(session) {

    }

    /**
     * Vue对象创建，数据加载后，更改数据不会触发updated函数
     */
    created(session) {

    }

    /**
     * created后调用
     * @param session
     */
    postCreated(session) {

    }

    /**
     * 界面渲染前，更改数据不会触发updated函数
     */
    beforeMount(session) {

    }

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
        context.resolve()
    }

    /**
     * before update
     * @param session
     */
    beforeUpdate(session) {

    }

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
     * keep-alive 组件激活时调用
     * @param session
     */
    activated(session) {

    }

    /**
     * keep-alive 组件停用时调用
     * @param session
     */
    deactivated(session) {

    }

    /**
     * 调用$destroy方法后，立即执行beforeDestroy
     */
    beforeDestroy(session) {

    }

    /**
     * 组件的数据绑定、监听...去掉后只剩下dom空壳，这个时候，执行destroyed
     */
    destroyed(session) {

    }

    /**
     * 暂存数据
     */
    tempSave(session) {

    }

    /**
     * 恢复数据
     */
    recover(session) {

    }

    /**
     * 设置检查条件
     * @param context
     */
    setCheckConditions(context) {
        context.resolve()
    }

    /**
     * 检查
     * @param context
     * @param conditions
     */
    check(context, conditions) {
        //检查条件
        let list;

        //根据条件
        if(conditions) {
            //包括model条件
            if(conditions.include) {
                list = conditions.include
                if(typeof list == 'string') {
                    list = list.split(',')
                }else{
                    list = conditions.include
                }
            }else if(conditions.exclude) {
                let { exclude } = conditions.exclude
                if(typeof exclude == 'string') {
                    exclude = exclude.split(',')
                }

                //获取domain
                let domain = getRootDomain(this)
                //获取model列表
                const getModels = Symbol.for('getModels')
                //获取models
                let models = domain[getModels]()

                for(let name of models) {
                    if(exclude.indexOf(name) != -1) {
                        continue
                    }
                    list.push(name)
                }
            }
        }

        // 触发v-verify指令设置的检查条件
        this.fox_check(list).then((checkResult) => {
            if(checkResult.pass) {
                context.resolve(checkResult)
            }else{
                context.reject(checkResult)
            }
        }, (error) => {
            // 设置检查原因
            let reason = {
                type: 'checkFail',
                cause: error,
            }
            context.reject(reason);
        })
    }

    /**
     * 提交前处理
     * @param context
     * @param checkResult
     */
    preSubmit(context, checkResult) {
        context.resolve();
    }

    /**
     * 提交处理(system scope)
     * @param context
     * @param args
     */
    commit(context, ...args) {
        if(args.length > 0) {
            Reflect.apply(context.resolve, this, args)
        }else{
            context.resolve('')
        }
    }

    /**
     * 提交处理(user scope)
     * @param context
     * @param args
     */
    submit(context, ...args) {
        context.resolve();
    }

    /**
     * 提交后处理
     * @param context
     * @param params
     */
    postSubmit(context, ...args) {

    }

    /**
     * 提交取消处理
     * @param context
     * @param args
     */
    cancelSubmit(context, ...args) {

    }
}

/**
 * 获取root domain
 * @param instance
 */
export function getRootDomain(vm) {
    const $Domain = Symbol.for('$Domain');
    if(vm.$children == undefined || vm.$children.length == 0) {
        return undefined
    }
    //获取domain
    let domain = vm.$children[0].$data && vm.$children[0].$data[$Domain]
    return domain
}
