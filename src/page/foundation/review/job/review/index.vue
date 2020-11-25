<template>
    <fox-page>
        <fox-content>
            <fox-group column="3" label-width="120px" title="业务信息">
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </fox-group>            
            <fox-group column="3" label-width="120px" title="复核信息">
                <fox-button-row align="center">
                    <fox-button type="primary" @click="submit">提交复核下一笔</fox-button>
                    <fox-button type="primary" @click="submit">关闭</fox-button>
                    <fox-button @click="submit">取消复核下一笔</fox-button>
                    <fox-button @click="submit">取消</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {    
    name: '',
    // 数据
    data: function () {
        return {
            memAcctNum: '',
            menSname: '',
            certDn: '',
            certAuthorizeCode: '',
            certRefCode: '',
            certValidity: '',
            certStatus: '',
            certificateType: '',
            occUscc: '',
            contact: '',
            contactTel: '',
            contactEmail: '',
            bindOperNum: '',
            bindOperName: '',
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
                }
            })
        }
    },
    // Fox流程
    fox_flow() {
        return {
            /**
             * 界面渲染后，更改数据会触发钩子函数
             * @param session
             * @param context
             */
            mounted(session, context) {
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
            onMessage(type, data) {

            },
            /**
             * 设置检查条件
             * @param context
             */
            setCheckConditions(context) {
                // 触发check函数调用（必须执行context.resolve或context.reject）
                context.resolve()
            },
            /**
             * 提交前处理
             * @param context
             * @param checkResult
             */
            preSubmit(context, checkResult) {
                console.info('pre submit流程')
                // 触发check函数调用（必须执行context.resolve或context.reject）
                context.resolve()
            },
            /**
             * 提交处理
             * @param context
             */
            submit(context) {
                console.info('submit流程')
                // 触发check函数调用（必须执行context.resolve或context.reject）
                context.resolve()
            },
            /**
             * 提交后处理
             * @param context
             */
            postSubmit(context) {                
                console.info('post submit流程')
            },
            /**
             * 提交取消处理
             * @param context
             */
            cancelSubmit(context, error) {                
                console.info(JSON.stringify(error))
            },
        }
    }
}
</script>

<style scoped>

</style>