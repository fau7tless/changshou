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
        <fox-text-item id="2" v-model="searchForm.ruleName">规则名称</fox-text-item>
        <fox-button type="primary" icon="el-icon-search" style="margin-left: 4%">查询</fox-button>
      </fox-group>
      <fox-group class="groupBorder">
        <div style="width: 100%; display: flex">
          <fox-table :data="tableData" style="width: 100%" height="600">
            <fox-table-column fixed type="index" label="序号"></fox-table-column>
            <fox-table-column prop="ruleID" label="规则ID"></fox-table-column>
            <fox-table-column prop="ruleName" label="规则名称"></fox-table-column>
            <fox-table-column prop="signPage" label="签名页数" width="120"></fox-table-column>
            <fox-table-column prop="sealRule" label="印章规则" width="300"></fox-table-column>
            <fox-table-column prop="sealCode" label="印章编号" width="300"></fox-table-column>
            <fox-table-column prop="org" label="创建机构" width="120"></fox-table-column>
          </fox-table>
        </div>
      </fox-group>
      <!--  弹框  -->
      <seal-rule-detail :operation="operation" ref="dialog"></seal-rule-detail>
    </fox-content>
  </fox-page>
</template>
<script>
import sealRuleDetail from './detail'

export default {
    name: 'sealRuleConfig',
    // 数据
    components: {
        sealRuleDetail,
    },

    data: function() {
        let id = ''
        return {
            operation: 'add',
            searchForm: {},
            tableData: [
                // 表格数据
                {
                    ruleID: 'W001',
                    ruleName: '测试1',
                    signPage: '1',
                    sealRule: '测试规则1',
                    sealCode: '001',
                    org: '0100',
                },
                {
                    ruleID: 'W002',
                    ruleName: '测试2',
                    signPage: '1',
                    sealRule: '测试规则2',
                    sealCode: '002',
                    org: '0100',
                },
                {
                    ruleID: 'W003',
                    ruleName: '测试3',
                    signPage: '1',
                    sealRule: '测试规则3',
                    sealCode: '003',
                    org: '0100',
                },
                {
                    ruleID: 'W004',
                    ruleName: '测试4',
                    signPage: '1',
                    sealRule: '测试规则4',
                    sealCode: '004',
                    org: '0100',
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
