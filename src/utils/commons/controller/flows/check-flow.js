import BaseFlow from './base-flow'
import {getRootDomain} from "./base-flow";

/**
 * 复核流程
 */
export default class CheckFlow extends BaseFlow{

    /**
     * flow名称
     * @type {string}
     */
    static getName(){
        return "check"
    }


    /**
     * Vue对象创建，当数据加载前
     */
    beforeCreate(session){

    }

    /**
     * created前调用
     * @param session
     */
    preCreated(session){


    }

    /**
     * Vue对象创建，数据加载后，更改数据不会触发updated函数
     */
    created(session){

    }

    /**
     * created后调用
     * @param session
     */
    postCreated(session){


    }

    /**
     * 界面渲染前，更改数据不会触发updated函数
     */
    beforeMount(session){

    }

    /**
     * mounted前执行
     * @param session
     * @param context
     */
    preMounted(session, context){
        context.resolve()
    }

    /**
     *  界面渲染后，更改数据会触发钩子函数
     * @param session
     * @param context
     */
    mounted(session, context){
        context.resolve()
    }

    /**
     * mounted后执行
     * @param session
     * @param context
     */
    postMounted(session, context){
        //保存数据到bus中
        let filterModels = fox.bus.get("sys_global", "filterModels")
        //获取root domain
        let domain = getRootDomain(this)
        //filterModels = ['tableData.address']
        //设置过滤model
        domain.setOption("filter-models", filterModels)
        //设置全局只读
        domain.setOption("readonly", true)

        //获取原来数据
        let originalData = fox.bus.get("sys_global", "originalData")

        let tip = '数据有更新'
        let tipIcon = ''
        //设置warn提示
        //domain.setWarn(filterModels, tip, tipIcon)
        //设置info提示
        //domain.setInfo(filterModels, tip, tipIcon)

        //nodeVal, item.name, item.index, item.node
        domain.setCheck(filterModels,(val, name, relate, index, node)=>{
            console.info('value='+val+", name="+name+", relate="+relate+", index="+index)
            //获取原来的value
            let originalVal = fox.custom.getValue(originalData, relate)
            //获取当前的value
            let curVal = fox.custom.getValue(this.$data,relate)
            //判断两个value是否一致
            if(fox.isEqual(originalVal, curVal)){
                return undefined
            }else{
                return "双录数据不一致"
            }
        }, tip, tipIcon)
        context.resolve()
        
    }

    /**
     * before update
     * @param session
     */
    beforeUpdate(session){

    }

    /**
     * updated前执行
     * @param session
     * @param context
     */
    preUpdated(session, context){
        context.resolve()
    }

    /**
     * 当更新完成后，执行updated，数据已经更改完成，dom也重新render完成，可以操作更新后的虚拟dom
     */
    updated(session, context){
        context.resolve()
    }

    /**
     * updated后执行
     * @param session
     * @param context
     */
    postUpdated(session, context){
        context.resolve()
    }

    /**
     * 调用$destroy方法后，立即执行beforeDestroy
     */
    beforeDestroy(session){

    }

    /**
     * 组件的数据绑定、监听...去掉后只剩下dom空壳，这个时候，执行destroyed
     */
    destroyed(session){

    }

    /**
     * 暂存数据
     */
    tempSave(session){

    }

    /**
     * 恢复数据
     */
    recover(session){

    }

    /**
     * 设置检查条件
     * @param context
     */
    setCheckConditions(context){
        context.resolve()
    }

    /**
     * 提交前处理
     * @param context
     * @param checkResult
     */
    preSubmit(context, checkResult){
        context.resolve();
    }

    /**
     * 提交处理
     * @param context
     * @param args
     */
    submit(context, ...args){
        let rowData = fox.bus.get('sys_global', 'checkRow', 'data')
        let orgData = fox.bus.get('sys_global', this.$options.name, 'orgData')
        let reqData = fox.custom.getRequestData(this)
        let filterData = fox.bus.get('sys_global', this.$options.name, 'filterData')
        let flag = 0
        filterData.map((key) => {
            if(orgData[key] != reqData[key]){
                flag++
            }
        })
        if(flag == 0){
            fox.service.request({
                id: '4',
                app: backend.uniformRules,
                path: `api/preSubmit/updateReviewState`,
                data: { taskid: rowData.taskid, reviewresult: '1' },
            }).then((response) => {
                if(response.code == 0){
                    this.$message({
                        message: '复核成功',
                        type: 'success',
                    })
                    context.resolve()
                }else{
                    fox.layer.open(`失败1:${response.message}`)
                    context.reject()
                }
            }, (error) => {
                fox.layer.open(`异常1:${error.message}`)
                context.reject()
            })
        }else{
            this.$message({
                message: '复核不通过！',
                type: 'error',
            })
        }
        
        // context.resolve();
    }

    /**
     * 提交后处理
     * @param context
     * @param params
     */
    postSubmit(context, ...args){

    }

    /**
     * 提交取消处理
     * @param context
     * @param args
     */
    cancelSubmit(context, ...args){

    }
}