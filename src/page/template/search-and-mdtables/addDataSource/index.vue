<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-footer-bar align="centwe">
      <fox-button @click="submit" icon="el-icon-check">确认</fox-button>
      <fox-button @click="cancel" icon="el-icon-refresh-left">取消</fox-button>
    </fox-footer-bar>
    <fox-content>
      <fox-group column="2">
        <fox-text-item require v-model="databaseName">数据库名称</fox-text-item>
        <fox-select-item require v-model="databaseType" source="@databaseType.json">数据库类型</fox-select-item>
        <fox-text-item require v-model="driverClassName" span="2">数据库驱动</fox-text-item>
      </fox-group>

      <fox-group class="input-block" column="1">
        <fox-text-item require v-model="url">数据库URL</fox-text-item>
      </fox-group>
      <fox-group column="2">
        <fox-text-item require v-model="username">用户名</fox-text-item>
        <fox-text-item require v-model="password">密码</fox-text-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "addDataSource",
  // 数据
  data: function () {
    return {
      id: "",
      databaseName: "",
      databaseType: "",
      driverClassName: "",
      url: "",
      username: "",
      password: "",
    };
  },
  // 方法
  methods: {
    submit() {
      if (this.$route.params.btnType == "addDataSource") {
        // console.log(this.$data)
        fox.layer.message("adding");
        // let that = this
        fox.service
          .request({
            app: backend.generatorService,
            path: "api/configDatabase/create",
            data: this.$data,
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
              } else {
                fox.layer.message(`失败:${response.message}`);
              }
            },
            (error) => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      } else if (this.$route.params.btnType == "edit") {
        fox.layer.message("updating");
        // let that = this
        fox.service
          .request({
            app: backend.generatorService,
            path: "api/configDatabase/update",
            data: this.$data,
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
              } else {
                fox.layer.message(`失败:${response.message}`);
              }
            },
            (error) => {
              fox.layer.message(`请求异常:${error.message}`);
            }
          );
      }
      //fox.custom.closePage(this);
    },
    cancel() {
      fox.custom.closePage(this);
      Object.assign(this.$data, this.$options.data());
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
.avatar-uploader {
  width: 500px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  margin: 0 auto;
}
</style>
