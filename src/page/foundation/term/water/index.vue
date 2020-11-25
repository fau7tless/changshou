<template>
    <fox-page>
        <fox-content>
            <fox-group column="2"  :readonly="source=='preview'">
                <fox-text-item v-model="wtrMsrNo" require>水表号</fox-text-item>
                <fox-text-item v-model="usrNm" require>用户名称</fox-text-item>
                <fox-select-item v-model="feeMo" require source="@month.json">缴费月份</fox-select-item>
                <fox-number-item v-model="ltPymtAmt" require>滞纳金</fox-number-item>
                <fox-number-item v-model="payFeeAmt" require>欠费金额</fox-number-item>
                <fox-text-item v-model="identCd" require>证件号码</fox-text-item>
                <fox-select-item v-model="identTp" require source="@certType.json">证件类型</fox-select-item>
                <fox-text-item v-model="cstNm" require>客户名称</fox-text-item>
                <fox-text-item v-model="account" require>帐号</fox-text-item>
                <fox-number-item v-model="telNum" require>联系电话</fox-number-item>
                <fox-button-row align="center" v-if="!source">
                    <fox-button type="primary" @click="submit">提交</fox-button>
                    <!-- <fox-button @click="reset">重置</fox-button> -->
                     <fox-button @click="close">取消</fox-button>
                </fox-button-row>
                <fox-button-row align="center" v-else>
                    <fox-button type="primary" @click="back2Bus">提交</fox-button>
                    <fox-button @click="close">取消</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'water',
    // 数据
    data() {
        return {
            operation: '',
            source: '',
            wtrMsrNo: '111',
            usrNm: '23',
            feeMo: '06',
            ltPymtAmt: '1232',
            payFeeAmt: '1343',
            identCd: '123243',
            identTp: '02',
            cstNm: '名称',
            account: '1232',
            telNum: '1555',
        }
    },
    // 方法
    methods: {
        close() {
            this.operation = 'cancel'
            fox.custom.closePage(this)
        },
        back2Bus() {
            this.operation = 'add'
            fox.custom.closePage(this)
        },
        submit() {
            console.log('data', this.$data)
            fox.service.request({
                app: backend.oca,
                path: '/api/adminsmduty/index',
                data: this.$data,
            }).then((response) => {
                if (response.code == 0) {
                    let data
                    // if (fox.type(response.data) == 'array') {
                    //     // that.dataTable = response.data
                    //     data = JSON.stringify(response.data)
                    //     console.log(response.data)
                    // }
                    // 信息框
                    // fox.layer.message(`成功:${data}`)
                    fox.layer.message('成功')
                } else {
                    fox.layer.message(`失败:${response.message}`)
                }
            }, (error) => {
                fox.layer.message(`请求异常:${error.message}`)
                console.log(error.message)
            })
        },
        reset() {
            this.wtrMsrNo = ''
            this.usrNm = ''
            this.feeMo = ''
            this.ltPymtAmt = ''
            this.payFeeAmt = ''
            this.identCd = ''
            this.identTp = ''
            this.cstNm = ''
            this.account = ''
            this.telNum = ''
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
                    this.fox_send('my-bottom', 'add', 'water')
                    this.fox_send('shopping', 'addWater', this.$data)
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
                fox.custom.closePageWithResult(this, true, this.$data)
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
