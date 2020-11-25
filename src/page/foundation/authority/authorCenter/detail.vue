<template>
  <div class="fixed-select-height">
    <!--表数据详情弹出框-->
    <fox-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      center
    >
      <fox-group title="中心信息"  column="2" no="1"
        class="my-group"
        label-width="100px"
        style="width:100%">
        <fox-text-item v-model="temp.centerNo" v-show="operation === 'update'||operation === 'detail'" >中心编号</fox-text-item>
        <fox-text-item v-model="temp.centerName" require tag="请输入中心名称" :disabled="operation === 'detail'">中心名称</fox-text-item>
        <fox-select-item require v-model='temp.isOpen' :source='status' :disabled="operation === 'detail'" tag="请选择是否启用">是否启用</fox-select-item>
      </fox-group> 
      <div slot="footer" class="dialog-footer">
        <fox-button v-show="operation === 'add'" size="small" type="primary" @click="doSave()">新增</fox-button>
        <fox-button
          v-show="operation === 'update'"
          size="small"
          type="primary"
          @click="doUpdate()"
        >修改</fox-button>
      </div>
    </fox-dialog>
  </div>
</template>
<script>
// import { authorModify, authorAdd, authorDetail } from '@/api/common/authorManage/authorManage'
export default {
    props: {
    // 弹框标题
        dialogTitle: {
            type: String,
            default: '',
        },
        // 操作类型
        operation: {
            type: String,
            default: '',
        },
        // 传输参数
        params: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data() {
        return {
            status: [
                { text: '是', value: '1' },
                { text: '否', value: '0' },
            ],
            dialogVisible: false,
            temp: {},
        }
    },
    computed: {
        dic() {
            return this.$parent.allDics
                ? JSON.parse(JSON.stringify(this.$parent.allDics))
                : {}
        },
    },
    watch: {
        dialogVisible: {
            handler(newVal, oldVal) {
                if (newVal !== oldVal && newVal === true) {
                    this.initData()
                }
            },
        },
    },
    methods: {
        doSave() {
            this.fox_check().then(() => {
                // authorAdd(this.temp).then(() => {
                //     this.$message.success('新增成功')
                //     this.dialogVisible = false
                //     this.$parent.fetchData()
                // })
            })
        },
        doUpdate() {
            this.fox_check().then(() => {
                authorModify(this.temp).then(() => {
                    this.$message.success('修改成功')
                    this.dialogVisible = false
                    this.$parent.fetchData()
                })
            })
        },
        doReset() {
            let temp = {}
            temp.centerNo = ''
            temp.centerName = ''
            temp.isOpen = ''
            temp.lastModiDate = ''
            this.temp = temp
        },
        initData() {
            this.doReset()
            if (this.operation === 'update' || this.operation === 'detail') {
                authorDetail(this.params).then((response) => {
                    this.temp = response.data
                })
            }
        },
    },
}
</script>
