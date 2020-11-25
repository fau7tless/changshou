<template>
  <fox-dialog :title="title" :visible.sync="dialogVisible" width="60%" top="5vh">
    <fox-page>
      <fox-footer-bar align="center">
        <fox-button type="primary" size="medium" @click="save">提交</fox-button>
        <fox-button type="primary" size="medium" @click="dialogVisible = false">取消</fox-button>
      </fox-footer-bar>
      <fox-content>
        <fox-group no="1" label-width="150px" column="2" title="基础信息">
          <fox-select-item
            v-model="temp.operation"
            :source="m_operation"
            style="width:49.5%;"
            required
          >操作类型</fox-select-item>
          <fox-text-item v-model="temp.sealCode" required style="width:49.5%;" :key="temp">规则编号</fox-text-item>
          <fox-text-item v-model="temp.ruleName" required style="width:49.5%;">规则名称</fox-text-item>
          <fox-text-item required v-model="temp.signPage" style="width:49.5%;" placeholder="1表示签章在第一页，-1表示签章在最后一页">签章页数</fox-text-item>
        </fox-group>
        <fox-group no="2" title="印章规则" label-width="150px" column="2">
          <fox-select-item
            v-model="temp.sealRule"
            :source="m_sealRule"
            style="width:49.5%;"
            required
          >印章规则</fox-select-item>
          <fox-text-item v-model="temp.sealCode" required style="width:49.5%;">印章编号</fox-text-item>
          <fox-text-item v-model="temp.sealKeyWord" required style="width:49.5%;">关键字</fox-text-item>
          <fox-text-item required v-model="temp.sealX" style="width:49.5%;">横向偏移量(mm)</fox-text-item>
          <fox-text-item required v-model="temp.sealY" style="width:49.5%;">纵向偏移量(mm)</fox-text-item>
        </fox-group>
        <fox-group no="3" title="签名规则" label-width="150px" column="2">
          <fox-select-item
            v-model="temp.signRule"
            :source="m_signRule"
            style="width:49.5%;"
            required
          >签名规则</fox-select-item>
          <fox-text-item v-model="temp.signKeyWord" required style="width:49.5%;">关键字</fox-text-item>
          <fox-text-item required v-model="temp.signX" style="width:49.5%;">横向偏移量(mm)</fox-text-item>
          <fox-text-item required v-model="temp.signY" style="width:49.5%;">纵向偏移量(mm)</fox-text-item>
          <fox-text-item required v-model="temp.signWidth" style="width:49.5%;">签名宽度(mm)</fox-text-item>
          <fox-text-item required v-model="temp.signHeight" style="width:49.5%;">签名高度(mm)</fox-text-item>
        </fox-group>
      </fox-content>
    </fox-page>
  </fox-dialog>
</template>

<script>
export default {
    name: 'sealRuleDetail',
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
