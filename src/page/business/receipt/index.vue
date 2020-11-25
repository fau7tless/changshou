<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-footer-bar align="center" >
      <fox-button @click="addFn">新增</fox-button>
      <fox-button @click="deletePro">删除</fox-button>
      <fox-button @click="cancel">取消</fox-button>
      <fox-button @click="limitQuery">额度查询</fox-button>
      
    </fox-footer-bar>
    <fox-content>
      <fox-group column="3" class="groupBorder">
        <fox-text-item  v-model="searchForm.productNo">产品编号</fox-text-item>
        <fox-text-item  v-model="searchForm.productName">产品名称</fox-text-item>
        <fox-button type="primary" icon="el-icon-search" style="margin-left: 4%" >查询</fox-button>
      </fox-group>
      <fox-group class="groupBorder">
        <div style="width: 100%; display: flex">
          <fox-table :data="tableData" style="width: 100%" height="600" @row-click="rowClick">
            <fox-table-column prop="productNo" label="产品编号"></fox-table-column>
            <fox-table-column prop="productName" label="产品名称"></fox-table-column>
            <fox-table-column prop="time" label="产品周期(年)" ></fox-table-column>
            <fox-table-column prop="minAmt" label="起存金额" ></fox-table-column>
            <fox-table-column prop="maxAmt" label="购买限额" ></fox-table-column>
            <fox-table-column prop="fee" label="预计收利率" ></fox-table-column>
            <fox-table-column prop="getWay" label="支取方式" ></fox-table-column>
            <fox-table-column prop="tztdFlag" label="存兑标识"></fox-table-column>
            <fox-table-column prop="zcFlag" label="是否自动转存"></fox-table-column>
            <fox-table-column prop="channel" label="办理渠道" ></fox-table-column>
            <fox-table-column prop="remark" label="备注" width="250"></fox-table-column>
          </fox-table>
        </div>
      </fox-group>
      <!--  弹框  -->
      <detail :operation="operation" ref="dialog" @push="addData" ></detail>
      <limit ref='dialog1'></limit>
    </fox-content>
  </fox-page>
</template>
<script>
import detail from './detail'
import limit from './limit'

export default {
    name: 'receipt',
    // 数据
    components: {
        detail,
        limit,
    },

    data: function() {
        let id = ''
        return {
            operation: 'add',
            row: '',
            searchForm: {},
            tableData: [
                // 表格数据
                {
                    productNo: '001',
                    productName: '测试产品',
                    time: '1',
                    fee: '5.1%',
                    minAmt: '50000',
                    maxAmt: '200000',
                    getWay: '凭密码',
                    tztdFlag: '通存通兑',
                    zcFlag: '是',
                    channel: '仅柜面',
                    remark: '新人专享(LV0,LV1)',
                },
                {
                    productNo: '002',
                    productName: '测试产品2',
                    time: '3',
                    fee: '2.8%',
                    minAmt: '20000',
                    maxAmt: '100000',
                    getWay: '凭凭证',
                    tztdFlag: '通存不通兑',
                    zcFlag: '否',
                    channel: '多渠道',
                },
                {
                    productNo: '002',
                    productName: '测试产品2',
                    time: '3',
                    fee: '4.7%',
                    minAmt: '30000',
                    maxAmt: '1000000',
                    getWay: '凭凭证',
                    tztdFlag: '通存不通兑',
                    zcFlag: '否',
                    channel: '多渠道',
                    remark: '邀约客户专享',
                },
               
            ],
        }
    },
    // 方法
    methods: {
        limitQuery() {
            if(!this.row) return this.$message.warning('请先选择产品')
            this.$refs.dialog1.temp = this.row
            this.$refs.dialog1.dialogVisible = true
        },

        rowClick(row, column) {
            this.row = row
        },
        
        addData(data) {
            this.tableData.push(data)
        },

        deletePro() {
            if(!this.row) return this.$message.warning('请先选择产品')
            const index = this.tableData.findIndex((item) => item.productNo == this.row.productNo)
            this.operation = 'delete'
            this.$confirm('是否确定删除此产品？', '提示', {
                confirmButtonText: '确定',
                cancelButtionText: '取消',
                type: 'warning',
            }).then(() => {
                this.tableData.splice(index, 1)
            }).catch(() => {
                this.$message.info('取消')
            })
        },
        submit() {},
        addFn() {
            this.operation = 'add'
            this.$refs.dialog.temp = {}
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
