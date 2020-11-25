<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-footer-bar align="center" style="margin-bottom: 24px">
      <fox-button @click="addFn">新增</fox-button>
      <fox-button @click="update">修改</fox-button>
      <fox-button @click="submit">停用</fox-button>
      <fox-button @click="submit">启用</fox-button>
      <fox-button @click="submit">注销</fox-button>
      <fox-button @click="cancel">取消</fox-button>
    </fox-footer-bar>
    <fox-content>
      <fox-group column="3" class="groupBorder">
        <fox-select-item id="2" v-model="searchForm.channel" :source="m_channel">渠道</fox-select-item>
        <fox-text-item id="2" v-model="searchForm.tradeCode">交易代码</fox-text-item>
        <fox-text-item id="2" v-model="searchForm.eVoucherNo">电子凭证编号</fox-text-item>
        <fox-button type="primary" icon="el-icon-search" style="margin-left: 4%">查询</fox-button>
      </fox-group>
      <fox-group class="groupBorder">
        <div style="width: 100%; display: flex">
          <fox-table :data="tableData" style="width: 100%" height="600">
            <fox-table-column fixed type="index" label="序号"></fox-table-column>
            <fox-table-column prop="channel" label="渠道"></fox-table-column>
            <fox-table-column prop="tradeCode" label="交易代码"></fox-table-column>
            <fox-table-column prop="sceneCode" label="场景代码" width="120"></fox-table-column>
            <fox-table-column prop="sceneComment" label="场景说明" width="300"></fox-table-column>
            <fox-table-column prop="eVoucherNo" label="电子凭证编号" width="300"></fox-table-column>
            <fox-table-column prop="eVoucherName" label="电子凭证名称" width="120"></fox-table-column>
          </fox-table>
        </div>
      </fox-group>
      <!--  弹框  -->
      <ev-detail :operation="operation" ref="dialog"></ev-detail>
    </fox-content>
  </fox-page>
</template>
<script>
import evDetail from './detail'

export default {
    name: 'eVoucherChannelApply',
    // 数据
    components: {
        evDetail,
    },

    data: function() {
        let id = ''
        return {
            operation: 'add',
            searchForm: {},
            m_channel: [
                { text: '柜面', value: '1' },
                { text: 'VTM', value: '2' },
                { text: '坐席', value: '3' },
            ],
            tableData: [
                // 表格数据
                {
                    channel: '柜面',
                    tradeCode: '001224',
                    sceneCode: '11',
                    sceneComment: '打印存单',
                    eVoucherNo: 'V001',
                    eVoucherName: '通用凭证A5',
                },
                {
                    channel: '柜面',
                    tradeCode: '001224',
                    sceneCode: '22',
                    sceneComment: '打印存款凭条',
                    eVoucherNo: 'V001',
                    eVoucherName: '通用凭证A5',
                },
                {
                    channel: '柜面',
                    tradeCode: '22',
                    sceneCode: '223',
                    sceneComment: '打印存单',
                    eVoucherNo: 'V001',
                    eVoucherName: '通用凭证A5',
                },
            ],
        }
    },
    // 方法
    methods: {
        update() {
            this.operation = 'update'
            this.$refs.dialog.dialogVisible = true
        },
        submit() {},
        addFn() {
            console.log(this)
            this.operation = 'add'
            this.$refs.dialog.dialogVisible = true
        },
        cancel() {},
        onClose() {
            console.info('------------->dialog close')
        },
        sync() {
            console.log('------------>提交')
        },
        innerClear() {},
    },
    // 加载后处理
    mounted: function() {},
}
</script>

<style scoped>
.groupBorder {
  border: 1px solid #e4cce9;
  padding: 10px;
}
</style>
