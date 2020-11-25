<template>
  <fox-dialog :title="title" :visible.sync="dialogVisible" width="60%" top="5vh" @close=''>
    <fox-page>
      <fox-footer-bar align="center">
        <fox-button type="primary" size="medium" @click="save">提交</fox-button>
        <fox-button type="primary" size="medium" @click="dialogVisible = false">取消</fox-button>
      </fox-footer-bar>
      <fox-content>
        <fox-group no="1" label-width="100px" column="2" title="基础信息">
          <fox-select-item
            v-model="temp.operation"
            :source="m_operation"
            style="width:49.5%;"
            required
          >操作类型</fox-select-item>
          <fox-text-item v-model="temp.sealCode" required style="width:49.5%;">关系代码</fox-text-item>
          <fox-text-item v-model="temp.ruleName" required style="width:49.5%;">渠道代码</fox-text-item>
          <fox-text-item required v-model="temp.signPage" style="width:49.5%;">交易代码</fox-text-item>
          <fox-text-item required v-model="temp.signPage" style="width:49.5%;">场景代码</fox-text-item>
          <fox-select-item
            required
            v-model="temp.signPage"
            :source="m_bool"
            style="width:49.5%;"
          >是否盖章</fox-select-item>
          <fox-select-item
            v-model="temp.sealRule"
            :source="m_sealRule"
            style="width:49.5%;"
            required
          >电子凭证</fox-select-item>
          <fox-text-item v-model="temp.sealCode" required style="width:49.5%;">是否签字</fox-text-item>
        </fox-group>
        <fox-group no="2" title="详细信息" label-width="100px" column="1">
          <fox-text-item v-model="temp.sealKeyWord" required >凭证模版</fox-text-item>
          <fox-text-item required v-model="temp.sealX">签章规则</fox-text-item>
          <fox-text-item required v-model="temp.sealY" >附件规则</fox-text-item>
          <fox-text-item required v-model="temp.sealY"  type="textarea" >场景说明</fox-text-item>
        </fox-group>
      </fox-content>
    </fox-page>
  </fox-dialog>
</template>

<script>
export default {
    name: 'evDetail',
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
            title: '标题 ',
            m_bool: [{ text: '是', value: '1' }, { text: '否', value: '0' }],
            temp: {
                operation: 'add',
            },
            m_operation: [
                { text: '新增', value: 'add' },
                { text: '修改', value: 'update' },
            ],
            m_sealRule: [
                { text: '印章规则1', value: '1' },
                { text: '印章规则2', value: '2' },
                { text: '印章规则3', value: '3' },
            ],
            m_signRule: [
                { text: '签名规则1', value: '1' },
                { text: '签名规则2', value: '2' },
                { text: '签名规则3', value: '3' },
            ],
        }
    },
    // 方法
    methods: {
        save() {
            this.fox_submit()
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
                        fox.custom.closePage(this)
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
