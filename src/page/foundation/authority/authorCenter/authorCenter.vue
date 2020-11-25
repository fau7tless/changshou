<template>
  <!--page每个页面的root元素-->
  <fox-page group-header-width="120px">
    <!--page内容区域-->
    <fox-content>
      <section class="section">
        <fox-group class="input-block" column="2" label-width="80px">
          <fox-text-item v-model="searchForm.centerNo" placeholder="请输入中心编号">中心编号</fox-text-item>
          <fox-text-item v-model="searchForm.centerName" placeholder="请输入中心名称">中心名称</fox-text-item>
        </fox-group>
        <fox-button-row class="button-block">
          <fox-button type="primary" size="medium" icon="el-icon-check" @click="fetchData">查询</fox-button>
          <fox-button type="primary" size="medium" icon="el-icon-refresh" @click="searchReset">重置</fox-button>
        </fox-button-row>
      </section>
      <section class="section">
        <fox-button-row align="center">
          <fox-button type="primary" size="medium" icon="el-icon-plus" @click="doAdd">新增</fox-button>
          <fox-button type="warning" size="medium" icon="el-icon-edit" @click="doUpdate">修改</fox-button>
          <fox-button type="danger" size="medium" icon="el-icon-delete" @click="doDetele">删除</fox-button>
          <fox-button type="info" size="medium" icon="el-icon-delete" @click="authorOrg">授权机构管理</fox-button>
          <fox-button type="info" size="medium" icon="el-icon-delete" @click="authorTeller">授权柜员管理</fox-button>
        </fox-button-row>
        <fox-group label-width="80px">
          <fox-table-item
            ref="table"
            auto-refresh="false"
            page-index="1"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="10"
            :content="indexUrl"
            :params="searchForm"
            @row-click="rowClick"
            highlight-current-row
          >
            <fox-table-column prop="centerNo" label="中心编号" width="180" align="center"></fox-table-column>
            <fox-table-column prop="centerName" label="中心名称"></fox-table-column>
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
    </fox-content>
      <a-center-detail ref="dialog" :dialog-title="dialogTitle" :operation="operation" :params="params"/>
      <a-center-org ref="org" :dialog-title="dialogTitle" :operation="operation" :params="params"/>
      <a-center-teller ref="teller" :dialog-title="dialogTitle" :operation="operation" :params="params"/>
  </fox-page>
</template>
<script>
// import { authorList, authorDelete } from '@/api/common/authorManage/authorManage'
import ACenterDetail from './detail'
import ACenterOrg from './authorOrg'
import ACenterTeller from './authorTeller'

export default {
    // 与路由中name相同，用于页面切换时，原页面数据的缓存
    name: 'AuthorCenter',
    components: {
        ACenterDetail,
        ACenterOrg,
        ACenterTeller,
    },
    data() {
        this.dicTypes = ['YES_NO']
        return {
            row: {},
            indexUrl: '',
            tableData: [],
            dialogTitle: '',
            searchForm: {
                pageIndex: 1,
                pageSize: 20,
            },
            listLoading: false,
            operation: '',
            params: {},
            totalnum: 0,
            currentRow: null,
        }
    },
    mounted: function() {
    // this.fetchData()
    },
    methods: {
        rowClick(row) {
            this.row = row
        },
        fetchData() {
            this.row = ''
            this.$refs.table.refresh()
        },
        search() {
            this.searchForm.pageIndex = 1
            this.fetchData()
        },
        searchReset() {
            let searchForm = {}
            searchForm.centerNo = ''
            searchForm.centerName = ''
            searchForm.pageSize = 20
            this.searchForm = searchForm
            this.fetchData()
        },
        handleCurrentChange(val) {
            this.currentRow = val
        },
        doAdd() {
            this.dialogTitle = '新增授权中心'
            this.$refs.dialog.dialogVisible = true
            this.operation = 'add'
        },
        doUpdate() {
            let that = this
            let data = {
                dialogTitle: '修改授权中心',
                operation: 'update',
            }
            this.publicPart(data, () => {
                that.$refs.dialog.dialogVisible = true
            })
        },
        doDetele() {
            if (!this.currentRow || JSON.stringify(this.currentRow) === '{}') {
                this.$message.warning('请选中一条数据')
                return
            }
            this.$confirm('您确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                const param = {}
                param.centerNo = this.currentRow.centerNo
                authorDelete(param).then(() => {
                    this.$message.success('删除成功')
                    this.fetchData()
                })
            }).catch(() => {})
        },
        doDetail() {
            let that = this
            let data = {
                dialogTitle: '查看授权中心',
                operation: 'detail',
            }
            this.publicPart(data, () => {
                that.$refs.dialog.dialogVisible = true
            })
        },
        authorOrg() {
            let that = this
            let data = {
                dialogTitle: '授权机构管理',
                operation: 'update',
            }
            this.publicPart(data, () => {
                that.$refs.org.dialogVisible = true
            })
        },
        authorTeller() {
            let that = this
            let data = {
                dialogTitle: '授权柜员管理',
                operation: 'update',
            }
            this.publicPart(data, () => {
                that.$refs.teller.dialogVisible = true
            })
        },
        formatStatus(row, column) {
            let { isOpen } = row
            return isOpen == '1' ? '是' : '否'
        },
        publicPart(data, fnc) {
            // if (!this.currentRow || JSON.stringify(this.currentRow) === '{}') {
            //     this.$message.warning('请选中一条数据')
            //     return
            // }
            this.dialogTitle = data.dialogTitle
            this.operation = data.operation
            const param = {}
            // param.centerNo = this.currentRow.centerNo
            this.params = param
            fnc()
        },
    },
}
</script>
<style  scoped>
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
