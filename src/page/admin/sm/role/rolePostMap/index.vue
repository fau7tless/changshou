<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-footer-bar align="right">
            <fox-button @click="close">关闭</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-table-item ref="list" :content="dataTable" @row-click="rowClick" highlight-current-row style="margin-top:10px" page-index="1" :page-sizes="[5, 50, 100, 200]" :page-size="5" border>
                <fox-table-column type="selection" width="55"></fox-table-column>
                <fox-table-column prop="POSTID" label="岗位编号" width=""></fox-table-column>
                <fox-table-column prop="POSTNAME" label="岗位名称" width=""></fox-table-column>
            </fox-table-item>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'roleManageRolePostMap',
    // 数据
    data: function () {
        return {
        }
    },
    // 方法
    methods: {
        close() {
            fox.custom.closePage(this)
        },
    },
    // fox流程
    fox_flow() {
        return {
            /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
            mounted(session, context){
                context.resolve()
            },

            /**
                 * 销毁处理
                 */
            beforeDestroy(session) {

            },

            /**
                 * 消息
                 * @param type
                 * @param data
                 */
            onMessage(type, data){

            },

            /**
                 * 设置检查条件
                 * @param context
                 */
            setCheckConditions(context){
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
            preSubmit(context, checkResult){
                console.info('pre submit流程')
                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
            submit(context){
                console.info('submit流程: name:' + this.$options.name)
                // 触发post submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
            postSubmit(context){
                console.info('post submit流程')
            },

            /**
                 * 提交取消处理
                 * @param context
                 * @param args
                 */
            cancelSubmit(context, error){
                console.info(JSON.stringify(error))
            },
        }
    },
}
</script>

<style scoped>
</style>