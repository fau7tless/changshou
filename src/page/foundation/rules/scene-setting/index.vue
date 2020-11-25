<template>
  <fox-page>
    <fox-content>
      <!-- 头部搜索区域 -->
      <section class="box">
        <fox-group
          class="my-group input-left"
          label-width="80px"
          column="3"
          style="width: 100%"
        >
          <fox-select-item
            placeholder="交易码"
            :source="options"
            v-model="code"
          ></fox-select-item>
          <fox-item>
            <fox-button
              style="width: 80px"
              type="primary"
              size="medium"
              @click="search"
              >查询</fox-button
            >
            <fox-button
              style="width: 80px"
              icon="el-icon-refresh"
              type="warning"
              size="medium"
              @click="clear"
              >重置</fox-button
            >
            <fox-button
              style="width: 80px"
              icon="el-icon-plus"
              type="primary"
              size="medium"
              @click="add"
              >新增</fox-button
            >
          </fox-item>
        </fox-group>
      </section>

      <fox-table-item
        :content="indexurl"
        page-index="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        :show-header="true"
      >
        <fox-table-column
          type="index"
          label="序号"
          header-align="left"
          width="50"
        ></fox-table-column>
        <!-- <fox-table-column property="scene" label="场景码" width="170">
          <template slot-scope="scope"
            >{{ scope.row.scene }} -- {{ scope.row.sceneName }}</template
          >
        </fox-table-column> -->
        <fox-table-column
          prop="tradeCode"
          label="交易码"
          width="170"
        ></fox-table-column>
        <fox-table-column
          prop="tradeApi"
          label="交易接口"
          width="170"
        ></fox-table-column>
        <fox-table-column
          prop="tradeName"
          label="服务名称"
          width="170"
        ></fox-table-column>
        <fox-table-column
          property="description"
          label="描述"
          width="auto"
        ></fox-table-column>
        <fox-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <fox-button
              @click="tableClickCheck(scope.row)"
              type="success"
              size="small"
              icon="el-icon-view"
            ></fox-button>
            <fox-button
              @click="tableClickEdit(scope.row)"
              type="primary"
              size="small"
              icon="el-icon-edit"
            ></fox-button>
            <fox-button
              @click="tableClickDelete(scope.row)"
              type="danger"
              size="small"
              icon="el-icon-delete"
            ></fox-button>
          </template>
        </fox-table-column>
      </fox-table-item>

      <!-- 一级弹出层 -->
      <!-- <scene-detail ref="dialog"
                        :dialog-title="dialogTitle"
                        :operation="operation"
      :params="params"></scene-detail>-->
      <detail-copy
        ref="dialog"
        :dialog-title="dialogTitle"
        :operation="operation"
        :params="params"
      ></detail-copy>
    </fox-content>
  </fox-page>
</template>
<script>
// import sceneDetail from './detail.vue'
import detailCopy from './detail-copy.vue'

export default {
    components: {
    // sceneDetail,
        detailCopy,
    },
    data() {
        return {
            indexurl: '/' + backend.rule + '/api/ruleCondition/index',
            round: true,
            // value1: "",
            code: '',
            // input1: "",
            // input2: "",
            // input3: "",
            // input4: "",
            // input5: "",
            params: {},
            row: '',
            dialogVisible: false,
            dialogTitle: '', // 表格title
            operation: '', // 修改规则
            filterEvents: {
                focus: false,
                blur: false,
            },
            options: [
                {
                    value: '001',
                    text: '/pass/devLogin',
                },
                {
                    value: '002',
                    text: '/pass/devLogin',
                },
                {
                    value: '003',
                    text: '/pass/devLogin',
                },
                {
                    value: '004',
                    text: '/pass/updatekeystu',
                },
            ],
            // bList: [
            //     {
            //         title: '大于',
            //         content: '用于数字、金额、字符串的比较',
            //     },
            //     {
            //         title: '大于等于',
            //         content: '用于数字、金额、字符串的比较',
            //     },
            //     {
            //         title: '小于',
            //         content: '用于数字、金额、字符串的比较',
            //     },
            //     {
            //         title: '小于等于',
            //         content: '用于数字、金额、字符串的比较',
            //     },
            //     {
            //         title: '等于',
            //         content: '用于各种类型的数据比较',
            //     },
            //     {
            //         title: '不等于',
            //         content: '用于各种类型的数据比较',
            //     },
            //     {
            //         title: '不为空',
            //         content: '用于判断字段存在内容',
            //     },
            //     {
            //         title: '为空',
            //         content: '用于判断字段存在内容',
            //     },
            //     {
            //         title: '累计金额',
            //         content: '帐号的当日累计交易金额',
            //     },
            // ],

            // 假数据
            // tableData: [
            //   {
            //     code: "/pass/devLogin",
            //     scene: "YB00001",
            //     codeName: "设备签到",
            //     sceneName: "挂失补卡",
            //     des: null,
            //   },
            //   {
            //     code: "/pass/devLogin",
            //     scene: "YB00002",
            //     codeName: "设备签到",
            //     sceneName: "挂失补卡",
            //     des: null,
            //   },
            //   {
            //     code: "/pass/devLogin",
            //     scene: "YB00003",
            //     codeName: "设备签到",
            //     sceneName: "卡激活",
            //     des: "YB00003--卡激活Test",
            //   },
            //   {
            //     code: "/pass/updatekeystu",
            //     scene: "YB00001",
            //     codeName: "更新密钥状态",
            //     sceneName: "挂失补卡",
            //     des: null,
            //   },
            // ],
        }
    },
    methods: {
        search() {
            // 条件搜索
            // console.log(this.input1);
            // console.log(this.input2);
            console.log(this.code)
        },
        clear() {
            // 清空所有搜索条件
            // this.input1 = "";
            // this.input2 = "";
            this.code = ''
        },
        // rowClick(row, column, event) {
        //   this.row = row;
        //   console.log(row.code);
        // },
        tableClickCheck(row) {
            this.row = row
            console.log('row.code===========' + row.code)
            console.log(row)
            if (this.row === '') {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
                return
            }
            this.dialogTitle = '查看场景规则'
            this.operation = 'detail'
            this.params.row = this.row
            this.$refs.dialog.dialogVisible = true
        },
        tableClickEdit(row) {
            this.row = row
            if (this.row === '') {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
                return
            }
            this.dialogTitle = '修改场景规则'
            this.operation = 'update'
            this.$refs.dialog.dialogVisible = true
            this.params.row = this.row
        },
        tableClickDelete(row) {
            this.row = row
            if (this.row === '') {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
                return
            }
            this.$confirm('您确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    let params = {}
                    params.serverCode = this.row.code
                    // 数据请求
                    fox.service.request({
                        id: '1',
                        path: `/api/rServerSceneDefine/delete/${this.row.code}`,

                        name: '删除模块',
                        callback: (code, message, data) => {
                            if (code === 0) {
                                if (fox.type(data) == 'object') {
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success',
                                    })
                                    this.$refs.table.refresh()
                                }
                            } else {
                                fox.layer.open(`后台异常${message}`)
                            }
                        },
                    })
                })
                .catch((rej) => {})
        },
        add() {
            this.dialogTitle = '新增场景规则'
            this.$refs.dialog.dialogVisible = true
            this.operation = 'add'
        },
        show() {
            if (this.row === '') {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
                return
            }
            this.dialogTitle = '查看服务规则'
            this.operation = 'detail'
            this.params.row = this.row
            this.$refs.dialog.dialogVisible = true
        },
        edit() {
            if (this.row === '') {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
                return
            }
            this.dialogTitle = '修改服务规则'
            this.operation = 'update'
            this.$refs.dialog.dialogVisible = true
            this.params.row = this.row
        },
        remove() {
            if (this.row === '') {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
                return
            }
            this.$confirm('您确定要删除吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    let params = {}
                    params.serverCode = this.row.code
                    // 数据请求
                    fox.service.request({
                        id: '1',
                        path: `/api/rServerSceneDefine/delete/${this.row.code}`,

                        name: '删除模块',
                        callback: (code, message, data) => {
                            if (code === 0) {
                                if (fox.type(data) == 'object') {
                                    this.$message({
                                        message: '删除成功',
                                        type: 'success',
                                    })
                                    this.$refs.table.refresh()
                                }
                            } else {
                                fox.layer.open(`后台异常${message}`)
                            }
                        },
                    })
                })
                .catch((rej) => {})
        },
    },
}
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  padding: 17px 0px 0px 17px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: inline-block;
  margin-bottom: 20px;
}
.right-button {
  width: 200px;
  float: right;
}
.input-left {
  width: calc(100% - 240px);
  float: left;
}
.dialog {
  display: flex;
  flex-direction: row;

  .left {
    width: 70%;
    overflow: auto;
    padding-right: 50px;
    box-sizing: border-box;
    .my-group {
      margin: 0 35px 0 35px;
      min-width: 700px;
    }
    >>> .el-form-item__label {
      font-weight: bolder;
      text-align: right;
    }
    .left-top {
      min-width: 550px;

      >>> .el-form-item__label {
        font-weight: bolder;
        text-align: right;
      }
    }
  }
  .right {
    width: 30%;
    max-height: 350px;
    border-left: 1px dashed;
    padding: 20px;
    box-sizing: border-box;
    overflow: auto;
    .button {
      width: 120px;
      margin-bottom: 15px;
      margin-left: 0px;
    }
  }
}
.crud {
  margin-bottom: 20px;
}
</style>