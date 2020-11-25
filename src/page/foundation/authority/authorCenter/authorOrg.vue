<template>
  <div class="fixed-select-height">
    <fox-dialog :before-close="handleClose" :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="50%" center>
      <div style="text-align: center">
        <fox-transfer
          :titles="['未添加机构', '已添加机构']"
          :button-texts="['移除', '添加']"
          :disabled="operation==='detail'"
          v-model="bindOrgList"
          :props="{
            key: 'orgNo',
            label: 'orgNo'
          }"
          :data="orgList"
          class="authorCenter"
          style="margin-top: 10px"
          filterable>
        <span slot-scope="{option}">{{ option.orgNo }}--{{ option.orgShrtNameCn }}</span></fox-transfer>
      </div>
      <div slot="footer">
        <fox-button type="primary" size="small" @click="doCommit">分配</fox-button>
        <fox-button type="primary" size="small" @click="resetForm('commitForm')">关闭</fox-button>
      </div>
    </fox-dialog>
  </div>
</template>
<script>
// import { orgListByCenterNo, allotOrg } from '@/api/common/authorManage/authorManage'
// import { listAllMOrgData } from '@/api/common/orgManage/orgManage'

export default {
    filters: {
        showFull(val) {
            return val.orgNo + '-' + val.orgShrtNameCn
        },
    },
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
            dialogVisible: false,
            temp: {},
            commitForm: {
                orgNo: '',
                orgNameCn: '',
            },
            orgNos: [],
            orgList: [],
            bindOrgList: [],
        }
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
        doReset() {
            const commitForm = {}
            commitForm.orgNo = ''
            commitForm.orgNameCn = ''
            this.commitForm = commitForm
        },
        initData() {
            this.doReset()
            this.orgList = []
            // this.bindOrgList = []
            this.orgQuery()
        },
        orgQuery() {
            this.listLoading = true
            listAllMOrgData().then((response) => {
                this.listLoading = false
                this.orgList = response.data
                this.bindOrgQuery()
            }).catch(() => {
                this.listLoading = false
            })
        },
        bindOrgQuery() {
            this.listLoading = true
            orgListByCenterNo(this.params).then((response) => {
                this.listLoading = false
                this.bindOrgList = response.data.map((item) => item.orgNo)
                // this.arrFilters()
            }).catch(() => {
                this.listLoading = false
            })
        },
        addOrg(val) {
            for (const i in val.orgNo) {
                for (const K in this.orgList) {
                    if (val.orgNo[i] === this.orgList[K].orgNo) {
                        this.bindOrgList.push({ orgNo: val.orgNo[i], orgNameCn: this.orgList[K].orgNameCn })
                    }
                }
            }
            this.doReset()
            // for (var i in this.orgList) {
            //   if (val.orgNo === this.orgList[i].orgNo) {
            //     this.commitForm.orgNameCn = this.orgList[i].orgNameCn
            //   }
            // }
            // this.bindOrgList.push(this.commitForm)
            // this.doReset()
            // this.arrFilters()
        },
        arrFilters() {
            for (let i in this.orgList) {
                this.orgList[i].show = true
                for (let j in this.bindOrgList) {
                    if (this.bindOrgList[j].orgNo === this.orgList[i].orgNo) {
                        this.orgList[i].show = false
                    }
                }
            }
        },
        leaveOrgSave(row) {
            this.$confirm('您确定要移除该机构吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                for (let i in this.bindOrgList) {
                    if (row.orgNo === this.bindOrgList[i].orgNo) {
                        this.bindOrgList.splice(i, 1)
                    }
                }
                this.arrFilters()
            })
        },
        doCommit() {
            // var arr = this.bindOrgList.map(item => item.orgNo)
            console.log(this.bindOrgList)
            // console.log(arr)
            let reqData = {
                centerNo: this.params.centerNo,
                orgNos: this.bindOrgList,
            }
            allotOrg(reqData).then(() => {
                this.$message({
                    message: '机构分配成功',
                    type: 'success',
                })
                this.dialogVisible = false
                this.$parent.fetchData()
            }).catch(() => {
            })
        },
        handleClose(done) {
            this.$confirm('关闭弹窗将取消您的所有操作,确定关闭?')
                .then(() => {
                    this.dialogVisible = false
                    done()
                })
                .catch(() => {
                })
        },
        resetForm(formName, done) {
            this.handleClose(done)
        },
    },
}
</script>
<style>
  .authorCenter .fox-transfer-panel {
    width: 32%;
    height: 500px;
    text-align: left;
  }
  .authorCenter .fox-transfer-panel__list.is-filterable{
    height: 400px;
  }
</style>
