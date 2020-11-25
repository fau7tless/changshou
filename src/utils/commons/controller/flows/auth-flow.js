import BaseFlow, { getRootDomain } from './base-flow'

/**
 * 授权流程
 */
export default class AuthFlow extends BaseFlow{

    /**
     * flow名称
     * @type {string}
     */
    static getName(){
        return "auth"
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
        console.info('---------------------- recover data')
        let syncData = fox.custom.getSyncData(this)
        if(syncData && syncData.uiData){
            fox.custom.setResponseData(this, syncData.uiData)
        }
        //设置整体页面不可用
        let domain = getRootDomain(this)
        domain.setOption('disabled', true)
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
        context.resolve();
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