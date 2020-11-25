<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-footer-bar align="right">
      <fox-button @click="submit">确认</fox-button>
      <fox-button @click="cancel">取消</fox-button>
    </fox-footer-bar>
    <fox-content>
      <fox-group column="2">
        <fox-text-item require v-model="sysName">系统名称</fox-text-item>
        <!-- <fox-text-item require v-model="sysId">系统编号</fox-text-item> -->
        <fox-select-item require v-model="sysType" source="@f05001.json">系统类型</fox-select-item>
        <fox-select-item require v-model="loginType" source="@f05002.json">登录类型</fox-select-item>
      </fox-group>
      <fox-group class="input-block" column="1">
        <fox-text-item require v-model="loginUrl">登录URL</fox-text-item>
        <fox-text-item v-model="loginJs" type="textarea" :rows="5">登录脚本</fox-text-item>
        <fox-text-item v-model="loginJsFinger" type="textarea" :rows="5">指纹登录脚本</fox-text-item>
        <fox-text-item v-model="logoutUrl">退出URL</fox-text-item>
        <fox-text-item v-model="logoutJs" type="textarea" :rows="5">退出脚本</fox-text-item>
        <fox-text-item v-model="errorUrl">错误URL</fox-text-item>

        <div style="width:100%;display:flex;">
          <fox-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="iconPath" :src="iconPath" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </fox-upload>
        </div>
        <!-- <section class="section"> -->
        <!-- <fox-text-item v-model="startCmd">启动命令</fox-text-item>
                    <fox-text-item v-model="loginCmd">登录命令</fox-text-item>
                    <fox-text-item v-model="window">窗口句柄</fox-text-item>
        <fox-text-item v-model="logoutCmd">退出命令</fox-text-item>-->
        <!-- </section> -->
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "systemConfigConfig",
  // 数据
  data: function() {
    return {
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
      iconPath: ""
      // dataTable: [
      //     {
      //         head: {
      //             sourceCode: 'fox',
      //             sourceType: 'fox',
      //             requestSeq: '12345678',
      //             requestDate: '2020-08-20 12:10:44',
      //             operNum: '999999',
      //             memNum: '0100',
      //             langCode: '0',
      //             pageNum: '1',
      //             pageSize: '2',
      //             totalSize: '0'
      //         },
      //         body:
      //             {
      //                 id: '22',
      //                 sysId: '22',
      //                 sysName: '22',
      //                 sysType: '22',
      //                 status: '1',
      //                 loginType: '22',
      //                 loginUrl: '22',
      //                 loginJs: '22',
      //                 loginJsFinger: '22',
      //                 logoutUrl: '22',
      //                 logoutJs: '22',
      //                 errorUrl: '22',
      //                 iconPath: '22',
      //             },
      //     },
      // ]
    };
  },
  // 方法
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submit() {
      if (this.$route.params.btnType == "add") {
        // console.log(this.$data)
        fox.layer.message("adding");
        fox.service
          .request({
            path: "api/ssoSystemConfig/create",
            data: this.$data
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
                // fox.layer.message(`成功:${data}`);
              } else {
                fox.layer.message(`失败:${response.message}`);
              }
            },
            error => {
              fox.layer.message(`请求异常:${error.message}`);
              console.log(error.message);
            }
          );
      } else if (this.$route.params.btnType == "update") {
        fox.layer.message("updating");
        // let that = this
        fox.service
          .request({
            path: "api/ssoSystemConfig/update",
            data: this.$data
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
                // fox.layer.message(`成功:${data}`);
              } else {
                fox.layer.message(`失败:${response.message}`);
              }
            },
            error => {
              fox.layer.message(`请求异常:${error.message}`);
            }
          );
      }
      fox.custom.closePage(this);
    },
    cancel() {
      fox.custom.closePage(this);
      Object.assign(this.$data, this.$options.data());
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
