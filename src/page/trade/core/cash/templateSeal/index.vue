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
        <fox-select-item id="1" v-model="status" source="@f07014.json">状态</fox-select-item>
        <fox-text-item id="2" v-model="number">印模编号</fox-text-item>
        <fox-button type="primary" icon="el-icon-search" style="margin-left: 4%" @click="query">查询</fox-button>
      </fox-group>
      <fox-group class="groupBorder">
        <div style="width: 100%; display: flex">
          <fox-table :data="tableData" style="width: 100%" height="600" @row-click="rowClick">
            <fox-table-column fixed prop="sealid" label="印模编号"></fox-table-column>
            <fox-table-column prop="sealname" label="印模名称"></fox-table-column>
            <fox-table-column prop="status" label="状态" width="120"></fox-table-column>
            <fox-table-column prop="usedate" label="启用日期" width="300"></fox-table-column>
            <fox-table-column prop="stopdate" label="停用日期" width="300"></fox-table-column>
            <fox-table-column prop="createorgid" label="创建机构" width="120"></fox-table-column>
          </fox-table>
        </div>
      </fox-group>
      <!--  弹框  -->
      <fox-dialog title="修改印章" :visible="dialogVisible" width="70%" @close="onClose" top="10vh" @opened="sendMsg">
        <fox-router-slot to="/example/seal-item"></fox-router-slot>
      </fox-dialog>
    </fox-content>
  </fox-page>
</template>
<script>
export default {
    name: 'templateSeal',
    // 数据
    data: function() {
        return {
            row: '',
            status: '',
            number: '',
            dialogVisible: false,
            tableData: [],
            operation: '',
        }
    },
    // 方法
    methods: {
        rowClick(row) {
            this.row = row
        },
        sendMsg() {
            this.fox_send('/example/seal-item', 'data', { row: this.row, operation: this.operation })
        },
        query() {
            const args = {
                app: backend.paperless,
                url: 'api/btopSealDef/index',
                data: {},
            }
            return fox.custom.promise(args).then((res) => {
                this.tableData = res.data
            })
        },
        update() {
            this.operation = 'update'
            this.dialogVisible = true
        },
        submit() {},
        addFn() {
            this.operation = 'add'
            this.dialogVisible = true
        },
        cancel() {
            this.dialogVisible = false
        },
        onClose() {
            console.info('------------->dialog close')
            this.dialogVisible = false
        },
        sync() {
            console.log('------------>提交')
        },
        innerClear() {
            this.dialogVisible = false
        },
    },
    // 加载后处理
    mounted() {
        this.query()
    },
}
</script>

<style scoped>
.groupBorder {
  border: 1px solid #e4cce9;
  padding: 10px;
}
</style>
