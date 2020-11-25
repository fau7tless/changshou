<template>
    <fox-page>
        <fox-footer-bar>
            <fox-button type="primary" @click="submit">确定</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content style="height:500px" >
            <fox-group column="2"  title="基本信息" :readonly="source=='preview'">
                <fox-text-item v-model="jsonBsnTpCd" require>业务类型编码</fox-text-item>
                <fox-text-item v-model="jsonBsnVrtyCd" require>业务种类编码</fox-text-item>
                <fox-text-item v-model="cnlSeqNo" require>渠道流水号</fox-text-item>
                <fox-text-item v-model="jsonPyrIbSysBnkNo">网银系统行号</fox-text-item>
                <fox-text-item v-model="jsonPyrOpnBkNm">付款人开户行名称</fox-text-item>
                <fox-select-item v-model="jsonPyrAcctTp" require source="@acctType.json">付款人账号类型</fox-select-item>
                <fox-text-item v-model="cstNo" require>客户号</fox-text-item>
                <fox-text-item v-model="ldgrInstNo" require>核算机构号</fox-text-item>
                <fox-text-item v-model="acctNo" require>付款人账号</fox-text-item>
                <fox-text-item v-model="cstNm" require>付款人名称</fox-text-item>
            </fox-group>
            <fox-group column="2"  title="交易信息" :readonly="source=='preview'">
                <fox-select-item v-model="jsonDctMoPplAcctTp" source="@acctType.json">扣款人账号类型</fox-select-item>
                <fox-text-item v-model="jsonDctMoPplAcct">扣款人账号</fox-text-item>
                <fox-text-item v-model="jsonDctMoPplAcctNm">扣款人名称</fox-text-item>
                <fox-text-item v-model="jsonPyeIbSysBnkNo" require>收款人网银系统行号</fox-text-item>
                <fox-text-item v-model="jsonOppBnkNm" require>对方银行名称</fox-text-item>
                <fox-text-item v-model="rcvAcctNo" require>收款人账号</fox-text-item>
                <fox-text-item v-model="rcvAcctNm" require>收款人名称</fox-text-item>
                <fox-text-item v-model="jsonPyeAdr">收款人地址</fox-text-item>
                <fox-select-item v-model="jsonPswdType" source="@pwdType.json">密码类型</fox-select-item>
                <fox-text-item v-model="jsonPyPswd">支付密码</fox-text-item>
                <fox-text-item v-model="txnAmt" require>转账金额</fox-text-item>
                <fox-select-item v-model="jsonPcdFeeClcMode" require source="@feeMode.json">手续费计算方式</fox-select-item>
                <fox-text-item v-model="jsonDcnRate" require>折扣比率</fox-text-item>
                <fox-text-item v-model="jsonRtnFeeAmt">汇划费金额</fox-text-item>
                <fox-text-item v-model="jsonRtnFeeAcct">汇划费账号</fox-text-item>
                <fox-text-item v-model="jsonPrdcFeeAmt">手续费金额</fox-text-item>
                <fox-text-item v-model="memo">备注</fox-text-item>
                <fox-select-item v-model="jsonRmtPathCd" require source="@pathType.json">汇路代码</fox-select-item>
                <fox-text-item v-model="jsonTxnAdlInf" require>转账附言</fox-text-item>
                <fox-select-item v-model="jsonTfrFlg" require source="@transferType.json">转账标志</fox-select-item>
                <fox-select-item v-model="jsonInstPrsnFlg" require source="@prsnFlag.json">对公对私标志</fox-select-item>
                <fox-select-item v-model="jsonRcvBillFlg" require source="@rcvBillFlag.json">收费标识</fox-select-item>
                <fox-select-item v-model="jsonTxnTp" require source="@txnTp.json">交易类型</fox-select-item>
                <fox-text-item v-model="jsonPrdcFeeAcctNo" require>手续费账号</fox-text-item>
                <fox-text-item v-model="jsonMblNo" require>手机号码</fox-text-item>
                <fox-select-item v-model="jsonMblNoFlg" require source="@mbFlag.json">手机号标志</fox-select-item>
                <fox-select-item v-model="jsonVerfPswdFlg" require source="@pwdFlag.json">验密标志</fox-select-item>
                <fox-text-item v-model="jsonAcctPswd" require>账户密码</fox-text-item>
                <fox-text-item v-model="ccy" require>货币代码</fox-text-item>
                <fox-select-item v-model="transByUPP" source="@bool.json">是否转统一支付</fox-select-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'V0030',
    // 数据
    data() {
        return {
            source: '',
            operation: '',
            jsonBsnTpCd: '',
            jsonBsnVrtyCd: '',
            cnlSeqNo: '',
            jsonPyrIbSysBnkNo: '',
            jsonPyrOpnBkNm: '',
            jsonPyrAcctTp: '',
            cstNo: '',
            ldgrInstNo: '',
            acctNo: '',
            cstNm: '',
            jsonDctMoPplAcctTp: '',
            jsonDctMoPplAcct: '',
            jsonDctMoPplAcctNm: '',
            jsonPyeIbSysBnkNo: '',
            jsonOppBnkNm: '',
            rcvAcctNo: '',
            rcvAcctNm: '',
            jsonPyeAdr: '',
            jsonPswdType: '',
            jsonPyPswd: '',
            txnAmt: '',
            jsonPcdFeeClcMode: '',
            jsonDcnRate: '',
            jsonRtnFeeAmt: '',
            jsonRtnFeeAcct: '',
            jsonPrdcFeeAmt: '',
            memo: '',
            jsonRmtPathCd: '',
            jsonTxnAdlInf: '',
            jsonTfrFlg: '',
            jsonInstPrsnFlg: '',
            jsonRcvBillFlg: '',
            jsonTxnTp: '',
            jsonPrdcFeeAcctNo: '',
            jsonMblNo: '',
            jsonMblNoFlg: '',
            jsonVerfPswdFlg: '',
            jsonAcctPswd: '',
            ccy: '',
            transByUPP: '',
        }
    },
    // 方法
    methods: {
        submit() {
            this.operation = 'add'
            // fox.custom.appendPage(this, '/business/transfer/transferAccounts/center', '子交易', {}, this.$data)
            fox.custom.closePage(this)
        },
        cancel() {
            this.operation = 'cancel'
            // fox.custom.appendPage(this, '/business/transfer/transferAccounts/center', '子交易', {}, this.$data)
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
                    this.fox_send('my-bottom', 'add', 'transfer')
                    this.fox_send('shopping', 'addTransfer', this.$data)
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