<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <fox-group class="input-block" column="5">
        <fox-text-item v-model="search.userId" span="2">柜员编号</fox-text-item>
        <fox-select-item v-model="search.sysName" :source="loadOption" span="2">系统名称</fox-select-item>
        <fox-item>
          <fox-button type="primary" @click="query">查询</fox-button>
        </fox-item>
      </fox-group>
      <fox-group no="2" class="my-group" style="width:100%">
        <fox-button-group>
          <fox-button type="default" @click="setTrue" icon="el-icon-check">启用</fox-button>
          <fox-button type="default" @click="setFalse" icon="el-icon-document-delete">禁用</fox-button>
        </fox-button-group>
        <fox-table-item
          ref="list"
          :content="dataTable"
          @row-click="rowClick"
          highlight-current-row
          style="margin-top:10px"
          page-index="1"
          :page-sizes="[5, 50, 100, 200]"
          :page-size="5"
          border
        >
          <fox-table-column prop="sysId" label="系统编号" width="180"></fox-table-column>
          <fox-table-column prop="sysName" label="系统名称" width="100"></fox-table-column>
          <fox-table-column prop="orgId" label="机构编号" width="180"></fox-table-column>
          <fox-table-column prop="userId" label="柜员编号" width="200"></fox-table-column>
          <fox-table-column prop="status" label="状态" width="50"></fox-table-column>
          <fox-table-column prop="lastChgDt" label="更新时间"></fox-table-column>
          <fox-table-column prop="lastChgUser" label="更新用户" width="100"></fox-table-column>
        </fox-table-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "bindQuery",
  // 数据
  data: function() {
    return {
      search: {},
      dataTable: [],
      row: ""
    };
  },
  // 方法
  methods: {
    // --------------获取系统名称下拉选项----------
    loadOption() {
      // --------------请求config/index--------------------

      var sysNameDir = [];
      var sysIdDir = [];
      let promise = new Promise((resolve, reject) => {
        fox.service
          .request({
            path: "api/ssoSystemBind/index"
          })
          .then(
            response => {
              if (response.code == 0) {
                let data;
                if (fox.type(response.data) == "array") {
                }

                // 信息框
                //  fox.layer.message(`成功:${data}`);
              } else {
                fox.layer.message(`失败:${response.message}`);
              }

              for (let i = 0; i < response.data.length; i++) {
                sysIdDir[i] = response.data[i].sysId;
                sysNameDir[i] = response.data[i].sysName;
              }

              let items = [];
              for (let i = 0; i < sysNameDir.length; i++) {
                items[i] = {
                  value: sysNameDir[i],
                  text: sysNameDir[i]
                };
              }
              resolve(items);
            },
            error => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      });
      return promise;
      // --------------------------------------
    },
    // ----------------
    rowClick(row) {
      this.row = row;
    },
    query() {
      let that = this;
      fox.service
        .request({
          path: "api/ssoSystemBind/index",
          data: this.search
        })
        .then(
          response => {
            if (response.code == 0) {
              let data;
              if (fox.type(response.data) == "array") {
                that.dataTable = response.data;
                data = JSON.stringify(response.data);
                // console.log(response.data);
              }
              // 信息框
              //fox.layer.open(`成功:${data}`);
            } else {
              fox.layer.open(`失败:${response.message}`);
            }
          },
          error => {
            fox.layer.open(`请求异常:${error.message}`);
          }
        );
    },
    setTrue() {
      if (this.row == "" || this.row == null) {
        this.$alert("必须先选中一条数据");
      } else if (this.row.status == 1) {
        this.$alert("请勿重复启用");
      } else {
        // console.log(this.row)
        let that = {};
        fox.extend(true, that, this);
        // console.log(that)
        that.row.status = 1;
        fox.service
          .request({
            path: "api/ssoSystemBind/update",
            data: that.row
          })
          .then(
            response => {
              if (response.code == 0) {
                let data;
                if (fox.type(response.data) == "array") {
                  // that.dataTable = response.data
                  data = JSON.stringify(response.data);
                  console.log(response.data);
                }
                // 信息框
                fox.layer.message(`成功:${data}`);
                this.query();
              } else {
                fox.layer.message(`失败:${response.message}`);
              }
            },
            error => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      }
    },
    setFalse() {
      if (this.row == "" || this.row == null) {
        this.$alert("必须先选中一条数据");
      } else if (this.row.status == "") {
        this.$alert("请勿重复禁用");
      } else {
        // console.log(this.$data.row)
        let that = {};
        fox.extend(true, that, this);
        that.row.status = "";
        fox.service
          .request({
            path: "api/ssoSystemBind/update",
            data: that.row
          })
          .then(
            response => {
              if (response.code == 0) {
                let data;
                if (fox.type(response.data) == "array") {
                  // that.dataTable = response.data
                  data = JSON.stringify(response.data);
                  console.log(response.data);
                }
                // 信息框
                this.query();
                fox.layer.message(`成功:${data}`);
              } else {
                fox.layer.message(`失败:${response.message}`);
              }
            },
            error => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      }
    },
    cancel() {
      fox.custom.closePage(this);
    }
  },
  // fox流程
  fox_flow() {
    return {
      /**
       *  界面渲染后，更改数据会触发钩子函数
       * @param session
       * @param context
       */
      mounted(session, context) {
        context.resolve();
      },

      /**
       * 销毁处理
       */
      beforeDestroy(session) {},

      /**
       * 消息
       * @param type
       * @param data
       */
      onMessage(type, data) {},

      /**
       * 设置检查条件
       * @param context
       */
      setCheckConditions(context) {
        // 触发check函数调用(必须执行context.resolve或context.reject)
        context.resolve();
      },

      /**
       * 提交前处理
       * @param context
       * @param checkResult
       */
      preSubmit(context, checkResult) {
        console.info("pre submit流程");
        // 触发submit函数调用(必须执行context.resolve或context.reject)
        context.resolve();
      },

      /**
       * 提交处理
       * @param context
       * @param args
       */
      submit(context) {
        console.info("submit流程: name:" + this.$options.name);
        // 触发post submit函数调用(必须执行context.resolve或context.reject)
        context.resolve();
      },

      /**
       * 提交后处理
       * @param context
       * @param params
       */
      postSubmit(context) {
        console.info("post submit流程");
      },

      /**
       * 提交取消处理
       * @param context
       * @param args
       */
      cancelSubmit(context, error) {
        console.info(JSON.stringify(error));
      }
    };
  }
};
</script>

<style scoped>
</style>