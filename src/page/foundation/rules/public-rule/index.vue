<template>
  <fox-page>
    <fox-content>
      <section class="section">
        <fox-group class="input-block" column="2" label-width="80px">
          <fox-text-item
            v-model="searchParams.ruleName"
            placeholder="请输入规则名称"
            >规则名称</fox-text-item
          >
          <fox-select-item
            :source="m_status"
            v-model="searchParams.isOpen"
            placeholder="请选择"
            >启用状态</fox-select-item
          >
        </fox-group>
        <fox-button-row class="button-block">
          <fox-button
            type="primary"
            size="medium"
            icon="el-icon-check"
            @click="fetchData"
            >查询</fox-button
          >
          <fox-button
            type="primary"
            size="medium"
            icon="el-icon-refresh"
            @click="searchReset"
            >重置</fox-button
          >
        </fox-button-row>
      </section>
      <section class="section">
        <fox-button-row align="center">
          <fox-button
            type="primary"
            size="medium"
            icon="el-icon-plus"
            @click="doAdd"
            >新增</fox-button
          >
          <fox-button
            type="success"
            size="medium"
            icon="el-icon-view"
            @click="doDetail"
            >查看</fox-button
          >
          <fox-button
            type="warning"
            size="medium"
            icon="el-icon-edit"
            @click="doUpdate"
            >修改</fox-button
          >
          <fox-button
            type="danger"
            size="medium"
            icon="el-icon-delete"
            @click="doDetele"
            >删除</fox-button
          >
        </fox-button-row>
        <fox-group label-width="80px">
          <fox-table-item
            ref="table"
            auto-refresh="false"
            page-index="1"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="10"
            :content="indexurl"
            :params="searchParams"
            @row-click="rowClick"
            highlight-current-row
          >
            <fox-table-column
              type="index"
              label="序号"
              width="180"
              align="center"
            ></fox-table-column>
            <fox-table-column
              prop="ruleName"
              label="规则名称"
            ></fox-table-column>
            <fox-table-column
              prop="isOpen"
              label="是否启用"
              width="180"
              :formatter="formatStatus"
              align="center"
            ></fox-table-column>
          </fox-table-item>
        </fox-group>
      </section>
      <RuleDetail
        ref="dialog"
        :dialog-title="dialogTitle"
        :operation="operation"
        :params="params"
        @fetchData="fetchData"
      ></RuleDetail>
    </fox-content>
  </fox-page>
</template>

<script>

import RuleDetail from './detail'

export default {
    components: {
        RuleDetail,
    },
    name: 'PublicRule',
    data: function () {
        this.dicType = ['aa']
        return {
            indexurl: '/' + backend.rule + '/api/ruleDefine/index',
            dialogTitle: '',
            operation: '',
            row: '',
            params: {},
            searchParams: {
                ruleId: '',
                ruleName: '',
                ruleType: '',
                isOpen: '',
                isCondition: '',
                remark: 'string1',
            },
            m_status: [
                {
                    value: '1',
                    text: '是',
                },
                {
                    value: '0',
                    text: '否',
                },
            ],
        }
    },
    methods: {
    
        rowClick(row, column, event) {
            this.row = row
            console.log(this)
        },
        doAdd() { 
            console.log(this)
            this.dialogTitle = '新增公共规则'
            this.$refs.dialog.dialogVisible = true
            this.operation = 'add'
        },
        doUpdate() {
            if (!this.row) {
                this.$message.warning('请先选择一条数据')
                return
            }
            this.dialogTitle = '修改公共规则'
            this.operation = 'update'
            this.$refs.dialog.dialogVisible = true
            this.params.row = this.row
        },
        doDetele() {
            if (!this.row) {
                this.$message.warning('请先选择一条数据')
                return
            }
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    fox.service
                        .request({
                            id: 'deletePulicRule',

                            path: '/' + backend.rule + '/api/ruleDefine/delete',
                            data: { ruleId: this.row.ruleId },
                        })
                        .then((callback) => {
                            if (callback.code == 0) {
                                this.$message({
                                    message: '删除成功！',
                                    type: 'sucess',
                                })
                                this.fetchData()
                            }
                        })
                })
                .catch(() => {
                    console.log('取消删除！')
                })
        },
        doDetail() {
            if (!this.row) {
                this.$message.warning('请先选择一条数据')
                return
            }
            this.dialogTitle = '查看公共规则'
            this.$refs.dialog.dialogVisible = true
            this.operation = 'detail'
            this.params.row = this.row
        },
        formatStatus(row, column) {
            let { isOpen } = row
            return isOpen == '1' ? '是' : '否'
        },
        fetchData() {
            this.row = ''
            this.$refs.table.refresh()
        },
        searchReset() {
            this.searchParams.ruleName = ''
            this.searchParams.isOpen = ''
            this.fetchData()
        },
    },
    mounted: function () {
    // debugger
        this.test()
    // console.log('PublicRule')
    },
}
</script>
<style scoped>
.section {
  margin-top: 10px;
  border: 1px solid rgba(209, 209, 209, 0.6);
  border-radius: 4px;
  padding: 10px;
  zoom: 1;
}
.section:first-child {
  margin-top: 0;
}
.section::after {
  content: "";
  clear: both;
  display: block;
}
.input-block {
  float: left;
  width: calc(100% - 240px);
}
.input-block .el-form-item {
  margin-bottom: 0;
}
.button-block {
  float: right;
  width: 200px;
}
</style>