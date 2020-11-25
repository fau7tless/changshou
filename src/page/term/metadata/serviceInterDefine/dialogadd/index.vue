<template>
    <fox-page>
        <fox-content>
            <fox-group column="2" >
                <fox-text-item v-model="interMethodName"  >接口方法名</fox-text-item>
                <fox-text-item v-model="interfaceApi"  >接口API</fox-text-item>
                <fox-select-item v-model="requestType"  source="@requestType.json" >请求类型</fox-select-item>
                <fox-empty-item></fox-empty-item>
                <fox-text-item v-model="inputProp"  >输入参数</fox-text-item>
                <fox-text-item v-model="outputProp"  >输出参数</fox-text-item>
                <fox-text-item v-model="description" span="2"  :rows="4" type="textarea">接口说明</fox-text-item>
                <fox-button-row align="center">
                    <fox-button type="primary" @click="submit">确认</fox-button>
                    <fox-button @click="close">关闭</fox-button>
                </fox-button-row>
            </fox-group>
            <!--<fox-button-row >-->
                <!--<fox-button style=" margin-left: 47%; margin-top: 20px;" type="primary" @click="close">关闭</fox-button>-->
            <!--</fox-button-row>-->
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'serviceInterfaceInfo',
    // 数据
    data() {
        return {
            interMethodName: '',
            interfaceApi: '',
            requestType: '',
            inputProp: '',
            outputProp: '',
            description: ''
        }
    },
    // 方法
    methods: {
        close() {
           fox.custom.closePage(this)
        },
        submit(){

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
