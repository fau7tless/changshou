<template>
  <fox-page>
    <fox-content>
      <fox-group column="2">
        <fox-text-item v-model="ChaName" require>中文名称</fox-text-item>
        <fox-text-item v-model="EngName" require>英文名称</fox-text-item>
        <fox-text-item v-model="code" require>英文缩写</fox-text-item>
        <fox-text-item v-model="serviceID" require>服务ID</fox-text-item>
        <fox-text-item v-model="serviceType" require>服务类型</fox-text-item>
        <fox-text-item v-model="serviceLevel" require>服务级别</fox-text-item>
        <fox-text-item v-model="serviceManager" require
          >服务负责人</fox-text-item
        >
        <fox-text-item v-model="serviceAddress" require span="2"
          >服务接口类</fox-text-item
        >
        <fox-text-item v-model="URL" require span="2">项目URL</fox-text-item>
        <fox-button-row align="center">
          <fox-button type="primary" @click="submit">保存</fox-button>
          <fox-button @click="cancel">取消</fox-button>
        </fox-button-row>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "serviceDefineInfo",
  // 数据
  data() {
    return {
      ChaName: "",
      EngName: "",
      code: "",
      serviceID: "",
      serviceType: "",
      serviceLevel: "",
      serviceManager: "",
      serviceAddress: "",
      URL: "",
    };
  },
  // 方法
  methods: {
    submit(formData) {
      console.log("------------>submit!");
    },
    cancel() {
      fox.custom.closePage(this);
    },
  },
  // Fox流程
  fox_flow() {
    return {
      /**
       *  界面渲染后，更改数据会触发钩子函数
       * @param session
       * @param context
       */
      mounted(session, context) {
        // 完成mounted函数
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
        console.info("submit流程");
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
