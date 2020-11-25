<template>
  <fox-page>
    <fox-content>
      <fox-group
        no="1"
        title="查询条件"
        class="my-group"
        label-width="80px"
        column="4"
        style="width: 100%"
      >
        <fox-text-item
          placeholder="请输入内容"
          v-model="searchContent.compName"
          clearable
          >组件名称</fox-text-item
        >
        <fox-text-item
          placeholder="请输入内容"
          v-model="searchContent.componentDes"
          clearable
          >组件描述</fox-text-item
        >
        <fox-item>
          <fox-button type="primary" size="small" @click="search"
            >搜索</fox-button
          >
          <fox-button type="danger" size="small" @click="clear"
            >清空</fox-button
          >
        </fox-item>
      </fox-group>
      <fox-group
        title
        class="my-group"
        label-width="100px"
        column="2"
        style="width: 100%"
      >
        <fox-group
          class="my-group"
          label-width="100px"
          column="1"
          style="width: 100%"
        >
          <fox-group
            no="2"
            title="组件列表"
            class="my-group"
            label-width="100px"
            column="1"
            style="width: 100%"
          >
         
            <!-- -------------------------------表格-------------------------- -->
            <fox-table-item
              ref="table"
              class="hover"
              :content="indexurl"
              page-index="1"
              :page-sizes="[10, 50, 100, 200]"
              :page-size="10"
              :params="searchContent"
              @expand-change="expandSelect"
              :expand-row-keys="expands"
              highlight-current-row
              :row-key="getRowKeys"
            >
              <fox-table-column type="expand">
                <!-- 子表格 -->
                <template>
                  <fox-table
                    ref="childTable"
                    :data="childTableContent"
                    style="width: 100%"
                  >
                    <fox-table-column
                      type="index"
                      label="序号"
                      sortable
                      width="180"
                    ></fox-table-column>
                    <fox-table-column
                      prop="paramName"
                      label="参数名称"
                      sortable
                      width="280"
                    ></fox-table-column>
                    <fox-table-column
                      prop="paramOrder"
                      label="参数类型"
                    ></fox-table-column>
                  </fox-table>
                </template>
              </fox-table-column>
              <fox-table-column
                type="index"
                label="序号"
                width="120"
              ></fox-table-column>
              <fox-table-column
                prop="compName"
                label="组件名称"
                width="120"
              ></fox-table-column>
              <fox-table-column
                prop="compDes"
                label="组件描述"
              ></fox-table-column>
              <fox-table-column
                prop="compClass"
                label="对应类名"
              ></fox-table-column>
            </fox-table-item>
            <!-- ------------------------------------------ -->
          </fox-group>
        </fox-group>
      </fox-group>
      <!-- 对话框 -->
      <fox-dialog title="详情" :visible.sync="dialog.show">
        <fox-group
          class="my-group"
          label-width="80px"
          column="4"
          style="width: 100%"
        >
          <fox-text-item
            placeholder="请输入内容"
            v-model="dialog.detail.paramName"
            clearable
            >参数名称</fox-text-item
          >
        </fox-group>
      </fox-dialog>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
    data: function () {
        return {
            pageNum: '1',
            indexurl: '/' + backend.rule + '/api/ruleComponentDefine/index',
            childindexurl: '/' + backend.rule + '/api/ruleComponentParameter/index',
            searchContent: {
                pageNum: '',
                compName: '',
                compDes: '',
                compClass: '',
                compId: '',
            },
            childTableContent: [],

            dialog: {
                show: false,
                detail: {
                    dataAuth: '',
                    id: '',
                    compId: '',
                    paramName: '',
                    paramOrder: '',
                    paramSource: '',
                },
            },
            getRowKeys(row) {
                return row.compId
            },
            expands: [],
        }
    },

    /**
   * 方法
   */
    methods: {
    // onFocus(event) {
    //   console.info("----------> focus");
    // },
    // onBlur(event) {
    //   console.info("----------> blur");
    // },
        clear() {
            this.searchContent.compName = ''
            this.searchContent.componentDes = ''
            this.search()
        },

        expandSelect(row, expandedRows) {
            let that = this
            that.row = row
            that.expands.push(row.compId)
            if (expandedRows.length) {
                that.expands = []
                if (row) {
                    that.expands.push(row.compId)
                    this.queryChildTable(row.compId)
                }
            } else {
                that.expands = []
            }

            that.$refs.table.refresh()
        },
        search() {
            this.$refs.table.refresh()
        },

        queryChildTable(compId) {
            fox.service
                .request({
                    app: backend.rule,
                    path: 'api/ruleComponentParameter/index',
                    name: '子表格信息列表',
                    data: {
                        id: '',
                        compId: compId,
                        paramName: '',
                        paramOrder: '',
                        paramSource: '',
                    },

                    // callback: function (code, message, data) {
                    //   if (code == 0) {
                    // if (fox.type(data) == "object") {
                    //   that.tableData2 = data.list;
                    //   // that.tableData2 = data.data;
                    // }

                    //   console.log(data);
                    // } else {
                    // fox.layer.open('登录失败'+message);
                    //     this.$message.error("服务器返回信息错误，获取数据失败");
                    //   }
                    // },
                })
                .then(
                    (response) => {
                        if (response.code == 0) {
                            this.childTableContent = response.data
                        } else {
                            fox.layer.message(`失败:${response.responseMes}`)
                        }
                    },
                    (error) => {
                        fox.layer.message(`请求异常:${error.message}`)
                    },
                )
        },
    // queryTable() {
    //   let that = this;
    //   fox.service.request({
    //     id: "1",
    //     path: "/api/rComponentDefine/index",
    //     data: {
    //       contrCode: that.addDialog.content.contrCode,
    //       contrName: that.addDialog.content.contrName,
    //       contrRemark: that.addDialog.content.contrRemark,
    //       contrUrl: that.addDialog.content.contrUrl,
    //       funcId: that.selectTreedata.funcId,
    //       methodType: that.addDialog.content.methodType,
    //       contrId: "string",
    //       dataAuth: "string",
    //       lastChgDt: "string",
    //       lastChgUsr: "string",
    //     },
    //     name: "控制点添加",
    //     callback: function (code, message, data) {
    //       if (code == 0) {
    //         if (fox.type(data) == "object") {
    //           that.$message({
    //             message: "添加成功",
    //             type: "success",
    //           });
    //           that.addDialog.show = false;
    //           that.$refs.table.refresh();
    //         }
    //       } else {
    //         // fox.layer.open('后台异常，添加失败！异常信息：'+message);
    //         that.$message.error("服务器返回信息错误，获取数据失败");
    //       }
    //     },
    //   });
    // },
    },
    // 加载后处理
    mounted: function () {
    // this.queryTable();
    },
}
</script>

<style scoped>
.hover {
  cursor: pointer;
}
</style>