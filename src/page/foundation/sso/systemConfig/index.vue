<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <!-- 查询框 -->
      <fox-group class="input-block" column="4">
        <fox-text-item v-model="search.sysName" style="width: 500px"
          >系统名称</fox-text-item
        >
        <fox-select-item
          v-model="search.sysType"
          source="@f05001.json"
          style="margin-left: -50px; width: 500px"
          >系统类型</fox-select-item
        >
        <fox-select-item
          v-model="search.loginType"
          source="@f05002.json"
          style="margin-left: -50px; width: 500px"
          >登录类型</fox-select-item
        >
        <fox-item align="right" style="width: 200px">
          <fox-button type="primary" @click="query">查询</fox-button>
        </fox-item>
      </fox-group>
      <!-- 单点登录表 -->
      <fox-group no="2" class="my-group" style="width: 100%">
        <fox-button-group style="margin-top: 10px">
          <fox-button type="default" @click="setTrue" icon="el-icon-check"
            >启用</fox-button
          >
          <fox-button
            type="default"
            @click="setFalse"
            icon="el-icon-document-delete"
            >禁用</fox-button
          >
        </fox-button-group>
        <fox-button-group style="margin-top: 10px">
          <fox-button type="default" @click="add" icon="el-icon-plus"
            >新增</fox-button
          >
          <fox-button type="default" @click="update" icon="el-icon-edit"
            >修改</fox-button
          >
          <fox-button type="default" @click="del" icon="el-icon-delete"
            >删除</fox-button
          >
        </fox-button-group>
        <fox-table-item
          ref="list"
          :content="'/' + app + '/api/ssoSystemConfig/index'"
          @row-click="rowClick"
          highlight-current-row
          style="margin-top: 10px"
          page-index="1"
          :page-sizes="[5, 50, 100, 200]"
          :page-size="5"
          border
          :params="search"
        >
          <!-- <fox-table-column type="selection" width="55"></fox-table-column> -->
          <fox-table-column prop="sysId" label="系统编号"></fox-table-column>
          <fox-table-column prop="sysName" label="系统名称"></fox-table-column>
          <fox-table-column prop="sysType" label="系统类型"></fox-table-column>
          <fox-table-column
            prop="loginType"
            label="登录类型"
          ></fox-table-column>
          <fox-table-column prop="status" label="是否启用"></fox-table-column>
          <!-- <fox-table-column prop="loginUrl" label="启动路径" width=""></fox-table-column> -->
          <fox-table-column
            prop="lastChgDt"
            label="最后修改日期"
          ></fox-table-column>
          <fox-table-column
            prop="lastChgUser"
            label="最后修改用户"
          ></fox-table-column>
        </fox-table-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "systemConfig",
  // 数据
  data: function () {
    return {
      app: backend.ssoService,
      search: {
        sysName: null,
      },
      dataTable: [
        {
          id: "",
          sysId: "",
          sysName: "",
          sysType: "",
          status: "",
          loginType: "",
          loginUrl: "",
          loginJs: "",
          loginJsFinger: "",
          logoutUrl: "",
          logoutJs: "",
          errorUrl: "",
          iconPath: "",
          lastChgDt: "",
          lastChgUser: "",
        },
      ],
      row: "",
    };
  },
  // 方法
  methods: {
    show123() {
      alert("123");
    },
    rowClick(row) {
      this.row = row;
    },
    query() {
      let that = this;
      that.$refs.list.refresh();

      fox.service
        .request({
          path: "api/ssoSystemConfig/index",
          data: this.$data.search.sysName != "" ? this.$data.search : null,
        })
        .then(
          (response) => {
            if (response.code == 0) {
              let data;
              if (fox.type(response.data) == "array") {
                that.dataTable = response.data;
                data = JSON.stringify(response.data);
                console.log(response.data);
              }
              // 信息框
              //   fox.layer.open(`成功:${data}`);
            } else {
              fox.layer.open(`失败:${response.message}`);
            }
          },
          (error) => {
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
        let that = {};
        fox.extend(true, that, this);
        that.row.status = 1;
        fox.service
          .request({
            app: backend.ssoService,
            path: "/api/ssoSystemConfig/update",
            data: that.row,
          })
          .then(
            (response) => {
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
            (error) => {
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
            path: "api/ssoSystemConfig/update",
            data: that.row,
          })
          .then(
            (response) => {
              if (response.code == 0) {
                let data;
                if (fox.type(response.data) == "array") {
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
            (error) => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      }
    },
    add() {
      let params = {
        btnType: "add",
      };
      fox.custom.appendPage(
        this,
        "/foundation/sso/systemConfig/config",
        "新增",
        params,
        this.$data,
        {},
        this.query
      );
    },
    update() {
      if (this.row == "" || this.row == null) {
        this.$alert("必须先选中一条数据");
      } else {
        let params = {
          btnType: "update",
        };
        console.log(this.row);
        fox.custom.appendPage(
          this,
          "/foundation/sso/systemConfig/config",
          "修改",
          params,
          this.$data.row,
          {},
          this.query
        );
      }
    },
    del() {
      if (this.row == "" || this.row == null) {
        this.$alert("必须先选中一条数据");
      } else {
        // console.log(this.$data.row)
        let that = {};
        fox.extend(true, that, this);
        fox.service
          .request({
            path: "api/ssoSystemConfig/delete",
            data: that.row,
          })
          .then(
            (response) => {
              if (response.code == 0) {
                let data;
                if (fox.type(response.data) == "array") {
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
            (error) => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      }
    },
    cancel() {
      fox.custom.closePage(this);
    },
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
      },
    };
  },
};
</script>

<style scoped>
.input-block {
  padding-top: 30px;
  background-color: white;
  border-radius: 8px;
  padding-right: 46px;
}
</style>
