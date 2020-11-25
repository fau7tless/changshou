<template>
    <fox-page>
        <fox-content>
            <fox-group column="3" label-width="120" title="基本信息">
                <fox-text-item v-model="termid" require maxlength="20">质押指令编号</fox-text-item>
                <fox-date-item v-model="termdate" require maxlength="10">解押日</fox-date-item>
                <fox-text-item v-model="termcont" maxlength="200">解押依据</fox-text-item>
                <fox-text-item v-model="remark" maxlength="200">备注</fox-text-item>
                <fox-select-item v-model="termtype">质押类型</fox-select-item>
                <fox-button-row align="center">
                    <fox-button type="primary" @click="submit">保存</fox-button>
                    <fox-button @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: '',
    // 数据
    data() {
        return {
            termid: '',
            termdate: '',
            termcont: '',
            remark: '',
            termtype: '',
        }
    },
    // 方法
    methods: {
        submit() {
        },
        cancel() {
            fox.layer.confirm('是否退出', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: (action) => {
                    if(action == 'confirm') {
                        fox.custom.closePage(this)
                    }
                },
            })
        },
    },
    // Fox流程
    fox_flow() {
        return {
            /**
             *  界面渲染后，更改数据会触发钩子函数
             * @param session
             * @param context
             */
            mounted(session, context){

                // 完成mounted函数
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
                console.info('submit流程')
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