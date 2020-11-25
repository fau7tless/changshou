<template>
  <div class="fixed-select-height">
    <fox-dialog
      :before-close="handleClose"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="60%"
      center
    >
      <div class="item-title">柜员列表</div>
      <fox-table
        :data="bindUserList"
        size="small"
        fit
        highlight-current-row
        style="width: 90%;margin-left: 5%"
      >
        <fox-table-column prop="userNo" min-width="80px" label="柜员编号" align="center">
          <template slot-scope="scope">{{ scope.row.userNo }}</template>
        </fox-table-column>
        <fox-table-column prop="userName" min-width="120px" label="柜员名称" align="center">
          <template slot-scope="scope">{{ scope.row.userName }}</template>
        </fox-table-column>
        <fox-table-column width="50px" label="移除" align="center">
          <template slot-scope="scope">
            <i
              class="fox-icon-delete"
              style="cursor: pointer;color:#F56C6C"
              @click="leaveUserSave(scope.row)"
            />
          </template>
        </fox-table-column>
      </fox-table>
      <div class="item-title">分配柜员</div>
      <fox-form size="small" labfox-width="140px" style="width: 90%">
        <fox-row>
          <fox-col :span="11">
            <fox-form-item label="选择柜员">
              <!--              <fox-select v-model="commitForm.userNo" style="width:100%" size="mini" filterable placeholder="请选择">-->
              <fox-select
                v-model="commitForm.userNo"
                :remote-method="remoteMethod"
                filterable
                remote
                reserve-keyword
                placeholder="请输入柜员号"
              >
                <fox-option
                  v-for="item in options"
                  :label="item.userNo + '--' + item.userName"
                  :value="item.userNo"
                  :key="item.userNo"
                >
                  <span>{{ item.userNo }}</span>-
                  <span>{{ item.userName }}</span>
                </fox-option>
              </fox-select>
            </fox-form-item>
          </fox-col>
          <fox-button
            v-show="commitForm.userNo != null & commitForm.userNo != ''"
            size="small"
            class="pan-btn light-blue-btn"
            style="margin-left: 1%"
            @click="addUser(commitForm)"
          >增加</fox-button>
        </fox-row>
      </fox-form>
      <div slot="footer">
        <fox-button type="primary" size="small" @click="doCommit">分配</fox-button>
        <fox-button type="primary" size="small" @click="resetForm('commitForm')">关闭</fox-button>
      </div>
    </fox-dialog>
  </div>
</template>
<script>
// import { userListByCenterNo, allotUser, queryUserList } from '@/api/common/authorManage/authorManage'
export default {
    filters: {
        showFull(val) {
            return val.userNo + '-' + val.userName
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
            options: [],
            loading: false,
            commitForm: {
                userNo: '',
                userName: '',
            },
            userList: [],
            bindUserList: [],
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
        remoteMethod(query) {
            if (query !== '') {
                // this.loading = true
                queryUserList({ userNo: query, pageSize: 100 }).then((res) => {
                    this.options = res.data.list
                    // this.loading = false
                })
            }
        },
        doReset() {
            const commitForm = {}
            commitForm.userNo = ''
            commitForm.userName = ''
            this.options = []
            this.commitForm = commitForm
        },
        initData() {
            this.doReset()
            this.options = []
            this.userList = []
            this.bindUserList = []
            this.bindUserQuery()
        },
        bindUserQuery() {
            this.listLoading = true
            userListByCenterNo(this.params)
                .then((response) => {
                    this.listLoading = false
                    this.bindUserList = response.data
                    // this.userQuery()
                })
                .catch(() => {
                    this.listLoading = false
                })
        },
        addUser(val) {
            for (let i in this.options) {
                if (val.userNo === this.options[i].userNo) {
                    this.commitForm.userName = this.options[i].userName
                }
            }
            for (const i in this.bindUserList) {
                if (this.bindUserList[i].userNo === val.userNo) {
                    this.$message({
                        type: 'warning',
                        message: '该员工已授权',
                    })
                    return
                }
            }
            this.bindUserList.push(this.commitForm)
            this.doReset()
            // this.arrFilters()
        },
        arrFilters() {
            for (let i in this.userList) {
                this.userList[i].show = true
                for (let j in this.bindUserList) {
                    if (this.bindUserList[j].userNo === this.userList[i].userNo) {
                        this.userList[i].show = false
                    }
                }
            }
        },
        leaveUserSave(row) {
            this.$confirm('您确定要移除该授权柜员吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                for (let i in this.bindUserList) {
                    if (row.userNo === this.bindUserList[i].userNo) {
                        this.bindUserList.splice(i, 1)
                    }
                }
                // this.arrFilters()
            })
        },
        doCommit() {
            let arr = this.bindUserList.map((item) => item.userNo)
            let reqData = {
                centerNo: this.params.centerNo,
                userNos: arr,
            }
            allotUser(reqData)
                .then(() => {
                    this.$message({
                        message: '授权柜员分配成功',
                        type: 'success',
                    })
                    this.dialogVisible = false
                    this.$parent.fetchData()
                })
                .catch(() => {})
        },
        handleClose(done) {
            this.$confirm('关闭弹窗将取消您的所有操作,确定关闭?')
                .then(() => {
                    this.dialogVisible = false
                    done()
                })
                .catch(() => {})
        },
        resetForm(formName, done) {
            this.handleClose(done)
        },
    },
}
</script>
