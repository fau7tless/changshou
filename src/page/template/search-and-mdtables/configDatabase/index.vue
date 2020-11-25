<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-footer-bar align="center">
      <fox-button @click="submit" icon="el-icon-check">生成</fox-button>
      <fox-button @click="cancel" icon="el-icon-refresh-left">取消</fox-button>
    </fox-footer-bar>
    <fox-content>
      <fox-group column="2">
        <fox-text-item require v-model="tableName">当前表名</fox-text-item>
        <fox-select-item require v-model="dealType" source="@dealType.json">交易类型</fox-select-item>
        <fox-text-item require v-model="moduleName">模块名称</fox-text-item>
        <fox-select-item require v-model="createType" source="@createType.json">生成类型</fox-select-item>
      </fox-group>
      <fox-table-item
        border
        page-index="1"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="10"
        tool-layout="total, sizes, jumper"
        :content="feildTable"
      >
        <fox-table-column prop="columnName" label="字段名称" width="160"></fox-table-column>
        <fox-table-column prop="dataType" label="数据类型" width="160"></fox-table-column>
        <fox-table-column prop="columnComment" label="字段备注"></fox-table-column>
        <fox-table-column prop="columnKey" label="字段键值" width="160"></fox-table-column>
        <fox-table-column prop="extra" label="extra" width="100"></fox-table-column>
      </fox-table-item>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "addDataSource",
  // 数据
  data: function() {
    return {
      id: "",

      tableComment: "",
      tableName: "",
      moduleName: "",
      createType: "",
      dealType: "",
      databaseName: "",
      feildTable: [
        {
          columnName: "",
          dataType: "",
          columnComment: "",
          columnKey: "",
          extra: ""
        }
      ]
    };
  },
  mounted() {
    let that = this;
    fox.service
      .request({
        app: backend.generatorService,
        path: "api/generator/getCurrentDatabaseTableColumns",
        data: {
          dataSourceKey: this.$route.params.databaseName,
          tableName: this.tableName
        }
      })
      .then(
        response => {
          if (response.code == 0) {
            let data;
            if (fox.type(response.data.loadingKey) == "array") {
              data = JSON.stringify(response.data);
            }
            // 信息框
            this.feildTable = response.data;
          } else {
            fox.layer.open(`失败:${response.message}`);
          }
        },
        error => {
          fox.layer.open(`请求异常:${error.message}`);
        }
      );
  },
  // 方法
  methods: {
    submit() {
      fox.layer.message("生成");
      let that = this;
      fox.service
        .request({
          app: backend.generatorService,
          path: "api/generator/getTemplateCode",
          data: {
            tableNames: this.$route.params.tableNames,
            moduleName: this.moduleName,
            dataSourceKey: this.$route.params.databaseName,
            addDataSourceType: this.$route.params.DataSourceType
          }
        })
        .then(
          response => {
            if (response.code == 0) {
              let data;
              if (fox.type(response.data) == "array") {
                that.feildTable = response.data;
                data = JSON.stringify(response.data);
                console.log(response.data);
              }
              // 信息框
              //fox.layer.message(`成功:${data}`);
              let url = response.data;
              fox.custom.download(this, url);
            } else {
              fox.layer.message(`失败:${response.message}`);
            }
          },
          error => {
            fox.layer.message(`请求异常:${error.message}`);
            console.log(error.message);
          }
        );

      //fox.custom.closePage(this);
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
