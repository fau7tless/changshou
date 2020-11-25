<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-footer-bar align="right">
      <fox-button @click="submit">确认</fox-button>
      <fox-button @click="cancel">取消</fox-button>
    </fox-footer-bar>
    <fox-content>
      <fox-group column="1">
        <!-- <fox-select-item require v-model="sysName" source="@f05000.json">系统名称</fox-select-item>
                <fox-text-item require v-model="orgId">机构号</fox-text-item>
                <fox-text-item require v-model="userName">用户名</fox-text-item>
        <fox-text-item require v-model="pwd">密码</fox-text-item>-->
        <fox-select-item :source="loadOption" v-model="sysId">系统ID</fox-select-item>
        <fox-text-item v-model="userId">柜员编号</fox-text-item>
        <fox-text-item v-model="orgId">机构号</fox-text-item>
        <fox-text-item v-model="loginUserName">登录用户名</fox-text-item>
        <fox-text-item v-model="loginOrgId">登录机构号</fox-text-item>
        <fox-text-item v-model="loginPwd" show-password>登录密码</fox-text-item>
        <fox-text-item v-model="status" :disabled="true">状态</fox-text-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "tellerBindBind",
  // 数据
  data: function () {
    return {
      sysName: "",
      sysId: "",
      userId: "",
      orgId: "",
      loginUserName: "",
      loginOrgId: "",
      loginPwd: "",
      status: "1",
    };
  },
  // 方法
  methods: {
    // --------------系统名称选择项----------
    loadOption() {
      // --------------请求config/index--------------------

      var sysNameDir = [];
      var sysIdDir = [];
      let promise = new Promise((resolve, reject) => {
        fox.service
          .request({
            path: "api/ssoSystemConfig/index",
            // data: this.$data,
          })
          .then(
            (response) => {
              if (response.code == 0) {
                let data;
                if (fox.type(response.data) == "array") {
                }

                // 信息框
                //  fox.layer.message(`成功:${data}`);
              } else {
                fox.layer.message(`失败:${response.message}`);
              }
              console.log(response.data);
              for (let i = 0; i < response.data.length; i++) {
                sysIdDir[i] = response.data[i].sysId;
                sysNameDir[i] = response.data[i].sysName;
              }
              console.log(sysNameDir);
              console.log(sysIdDir);
              let items = [];
              for (let i = 0; i < sysIdDir.length; i++) {
                items[i] = {
                  value: sysIdDir[i],
                  text: sysIdDir[i],
                };
              }
              resolve(items);
            },
            (error) => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      });
      return promise;
      // --------------------------------------
    },
    // --------------提交----------------
    submit() {
      // this.fox_submit()
      fox.service
        .request({
          path: "api/ssoSystemBind/create",
          data: this.$data,
        })
        .then(
          (response) => {
            if (response.code == 0) {
              let data;
              if (fox.type(response.data) == "array") {
                // that.dataTable = response.data
                data = JSON.stringify(response.data);
                // console.log(response.data);
              }
              // 信息框
              // fox.layer.message(`成功:${data}`);
            } else {
              fox.layer.message(`失败:${response.message}`);
            }
          },
          (error) => {
            fox.layer.message(`请求异常:${error.message}`);
          }
        );
      fox.custom.closePage(this);
    },
    // -----------------取消
    cancel() {
      fox.custom.closePage(this);
      object.assign(this.$data, this.$options.data());
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
</style>