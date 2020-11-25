<template>
  <fox-dialog :title="title" :visible.sync="dialogVisible" width="60%" top="20vh">
    <fox-page>
      <fox-footer-bar align="center">
        <fox-button type="primary" size="medium" @click="save">提交</fox-button>
        <fox-button type="primary" size="medium" @click="dialogVisible = false">取消</fox-button>
      </fox-footer-bar>
      <fox-content>
        <fox-group no="1" label-width="150px" column="2" title="产品信息">
          <fox-text-item v-model="temp.productNo" required style="width:49.5%;" :disabled="operation !='add'">产品编号</fox-text-item>
          <fox-text-item v-model="temp.productName" required style="width:49.5%;">产品名称</fox-text-item>
          <fox-text-item v-model="temp.time" required style="width:49.5%;">产品周期(年)</fox-text-item>
          <fox-text-item v-model="temp.minAmt" required style="width:49.5%;">起存金额</fox-text-item>
          <fox-text-item v-model="temp.maxAmt" required style="width:49.5%;">购买限额</fox-text-item>
          <fox-text-item v-model="temp.fee" required style="width:49.5%;">预计收利率</fox-text-item>
          <fox-select-item v-model="temp.getWay" required style="width:49.5%;" :source="m_getWay" value-type="text">支取方式</fox-select-item>
          <fox-select-item v-model="temp.tztdFlag" required style="width:49.5%;" :source="m_tztdFlag" value-type="text">存兑标识</fox-select-item>
          <fox-select-item v-model="temp.zcFlag" required style="width:49.5%;" :source="m_zcFlag" value-type="text">是否自动转存</fox-select-item>
          <fox-select-item v-model="temp.channel" required style="width:49.5%;" :source="m_channel" value-type="text">办理渠道</fox-select-item>
          <fox-text-item v-model="temp.remark" required style="width:100%" type="textarea">备注</fox-text-item>
        </fox-group>
       
      </fox-content>
    </fox-page>
  </fox-dialog>
</template>

<script>
export default {
    name: 'receiptDetail',
    // 数据
    props: {
        operation: {
            type: String,
            default: '',
        },
    },
    watch: {
        operation: {
            handler(val) {
                this.temp.operation = val
            },
        },
    },
    data: function() {
        return {
            // sealImg: seal.png,
            dialogVisible: false,
            title: '产品详情',
            temp: {
                operation: 'add',
            },
            m_tztdFlag: [
                { text: '通存通兑', value: '通存通兑' },
                { text: '通存不通兑', value: '通存不通兑' },
            ],
            m_getWay: [
                { text: '凭密码', value: '凭密码' },
                { text: '凭证件', value: '凭证件' },
                { text: '凭凭证', value: '凭凭证' },
            ],
            m_zcFlag: [
                { text: '是', value: '是' },
                { text: '否', value: '否' },
            ],
            m_channel: [
                { text: '仅柜面', value: '仅柜面' },
                { text: '多渠道', value: '多渠道' },
            ],
        }
    },
    // 方法
    methods: {
        save() {
            this.fox_submit({ foreAuthType: 'noAuth' })
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
                context.resolve()
            },

            /**
       * 销毁处理
       */
            beforeDestroy(session) {},

            /**
       * 消息
       * @param type
       * @param data
       */
            onMessage(type, data) {},

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
                fox.layer.alert('保存成功', '提示', {
                    confirmButtonText: '确定',
                    callback: (action) => {
                        this.dialogVisible = false
                        this.$emit('push', this.temp)
                        this.temp = {}
                    },
                })
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
