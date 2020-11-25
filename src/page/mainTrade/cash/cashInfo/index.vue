<template>
    <fox-page>
        <fox-footer-bar>
            <fox-button type="primary" @click="submit">确定</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group column="2" label-width="120px" title="基本信息" :readonly="source=='preview'">
                <fox-text-item v-model="acctNo" require>账号</fox-text-item>
                <fox-text-item v-model="cstNo" require>客户号</fox-text-item>
                <fox-text-item v-model="txnAmt" require>交易金额</fox-text-item>
                <fox-text-item v-model="cstNm" require>客户名称</fox-text-item>
                <fox-text-item v-model="memo">备注</fox-text-item>
                <fox-select-item v-model="identTp" require source="@idType.json">证件类型</fox-select-item>
                <fox-text-item v-model="identCd" require>证件号码</fox-text-item>
                <fox-text-item v-model="telNum" require>联系电话</fox-text-item>
                <fox-select-item v-model="ccy" require source="@ccy.json">货币代码</fox-select-item>
                <fox-text-item v-model="withMoInfoRmb" require>配钞信息</fox-text-item>
                <fox-text-item v-model="cashItemcd" require>现金项目代码</fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: '080003',
    // 数据
    data() {
        return {
            source: '',
            operation: '',
            acctNo: '',
            cstNo: '',
            txnAmt: '',
            cstNm: '',
            memo: '',
            identTp: '',
            identCd: '',
            telNum: '',
            ccy: '',
            withMoInfoRmb: '',
            cashItemcd: '',
        }
    },
    // 方法
    methods: {
        submit() {
            this.operation = 'add'
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
            mounted(session, context) {
                // 完成mounted函数
                context.resolve()
            },

            /**
             * 销毁处理
             */
            beforeDestroy(session) {
                if(this.source == 'bus' && this.operation == 'add') {
                    this.fox_send('my-bottom', 'add', 'cashIn')
                    this.fox_send('shopping', 'cashIn', this.$data)
                }
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
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
             * 提交前处理
             * @param context
             * @param checkResult
             */
            preSubmit(context, checkResult) {
                console.info('pre submit流程')

                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
             * 提交处理
             * @param context
             * @param args
             */
            submit(context) {
                console.info('submit流程')
                // 触发post submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
             * 提交后处理
             * @param context
             * @param params
             */
            postSubmit(context) {
                console.info('post submit流程')
            },

            /**
             * 提交取消处理
             * @param context
             * @param args
             */
            cancelSubmit(context, error) {
                console.info(JSON.stringify(error))
            },
        }
    },
}
</script>

<style scoped>

</style>