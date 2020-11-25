<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <fox-group
        no="2"
        title="已绑定的系统"
        class="my-group"
        style="width: 100%"
      >
        <fox-button-row align="right">
          <fox-button type="default" @click="addBind" icon="el-icon-plus"
            >添加绑定</fox-button
          >
          <fox-button type="default" @click="delBind" icon="el-icon-delete"
            >解除绑定</fox-button
          >
          <!-- <fox-button type="default" @click="edit" icon="el-icon-edit">修改</fox-button> -->
          <!-- <fox-button type="default" @click="cancel" icon="el-icon-document-delete">取消</fox-button> -->
        </fox-button-row>
        <fox-table-item
          ref="list"
          :content="dataTable"
          @row-click="rowClick"
          highlight-current-row
          style="margin-top: 10px"
          page-index="1"
          :page-sizes="[5, 50, 100, 200]"
          :page-size="5"
          border
        >
          <fox-table-column
            prop="sysId"
            label="系统编号"
            width="170"
          ></fox-table-column>
          <fox-table-column prop="sysName" label="系统名称"></fox-table-column>
          <fox-table-column prop="userId" label="柜员编号"></fox-table-column>
          <fox-table-column prop="orgId" label="机构号"></fox-table-column>
          <fox-table-column
            prop="loginUserName"
            label="登录用户名"
          ></fox-table-column>
          <fox-table-column
            prop="loginOrgId"
            label="登录机构号"
          ></fox-table-column>
          <fox-table-column
            prop="status"
            label="状态"
            width="50"
          ></fox-table-column>
          <fox-table-column
            prop="lastChgDt"
            label="最后修改日期"
            width="160"
          ></fox-table-column>
          <fox-table-column
            prop="lastChgUser"
            label="最后修改柜员"
          ></fox-table-column>
        </fox-table-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "tellerBInd",
  // 数据
  data: function () {
    return {
      dataTable: [],
      row: "",
      // m_params: {},
      // m_path: 'api/btopSsoBindteller/index'
    };
  },

  // 方法
  methods: {
    rowClick(row) {
      this.row = row;
    },
    addBind() {
      fox.custom.appendPage(
        this,
        "/foundation/sso/tellerBind/bind",
        "新增绑定",
        {},
        this.$data,
        {},
        this.query
      );
    },
    delBind() {
      if (this.row == "" || this.row == null) {
        this.$alert("必须先选中一条数据");
      } else {
        // console.log(this.$data.row)
        // let that = {}
        // fox.extend(true, that, this)
        // that.row.status = ''
        fox.service
          .request({
            path: "api/ssoSystemBind/delete",
            data: this.row,
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
                this.query();
                //fox.layer.message(`成功:${data}`);
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

    query() {
      // this.$refs.list.refresh()
      let that = this;
      fox.service
        .request({
          path: "api/ssoSystemBind/index",
          data: null,
        })
        .then(
          (response) => {
            if (response.code == 0) {
              let data;
              if (fox.type(response.data) == "array") {
                that.dataTable = response.data;
                data = JSON.stringify(response.data);
              }
              // 信息框
              // fox.layer.open(`成功:${data}`);
            } else {
              fox.layer.open(`失败:${response.message}`);
            }
          },
          (error) => {
            fox.layer.open(`请求异常:${error.message}`);
          }
        );
    },
    // cancel() {
    //     fox.custom.closePage(this)
    // },
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
        this.query();
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
</style>