<template>
    <fox-page>
        <fox-content>
            <fox-group column="2" >
                <fox-text-item v-model="cnName" require>中文名称</fox-text-item>
                <fox-text-item v-model="enName" require disabled>英文名称</fox-text-item>
                <fox-select-item v-model="type" require source="@wordType.json">类型</fox-select-item>
                <fox-text-item v-model="length" require >长度</fox-text-item>
                <fox-text-item v-model="enumValue" require >枚举值</fox-text-item>
                <fox-text-item v-model="regExp" require >正则表达式</fox-text-item>
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
    name: 'dataLibraryEditInfo',
    // 数据
    data() {
        return {
            cnName: '客户编号',
            enName: 'cust_code',
            type: '01',
            length: '64',
            enumValue: '0-未生效1-生效',
            regExp: '正则表达式',
        }
    },
    // 方法
    methods: {
        submit() {
        },
        cancel() {
           fox.custom.closePage(this)
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
