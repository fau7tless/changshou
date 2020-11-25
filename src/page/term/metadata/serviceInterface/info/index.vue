<template>
  <fox-page>
    <fox-content>
      <fox-group column="2">
        <fox-text-item v-model="parameterName" require>参数类名</fox-text-item>
        <fox-text-item v-model="version" require>参数版本</fox-text-item>
        <fox-text-item v-model="detail" span="2" type="textarea" :rows="3"
          >参数类说明</fox-text-item
        >
      </fox-group>
      <fox-group title="属性列表">
        <fox-button-row align="left">
          <fox-button @click="addFn">新增</fox-button>
        </fox-button-row>
        <fox-table
          :data="tableData"
          height="240px"
          border
          style="width: 100%; margin-bottom: 30px"
        >
          <fox-table-column
            prop="name"
            label="字段名"
            width=""
          ></fox-table-column>
          <fox-table-column
            prop="ChaName"
            label="字段中文名"
            width=""
          ></fox-table-column>
          <fox-table-column
            prop="type"
            label="字段类型"
            width=""
          ></fox-table-column>
          <fox-table-column
            prop="extra"
            label="字段说明"
            width=""
          ></fox-table-column>
          <fox-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <fox-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
                >删除</fox-button
              >
            </template>
          </fox-table-column>
        </fox-table>
        <fox-button-row align="center">
          <fox-button type="primary" @click="cancel">关闭</fox-button>
          <fox-button type="primary" @click="submit">确认</fox-button>
        </fox-button-row>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "serviceInterfaceInfo",
  // 数据
  data() {
    return {
      parameterName: "",
      version: "",
      detail: "",
      tableData: [
        {
          name: "cust_code",
          ChaName: "客户编号",
          type: "String",
          extra: "客户编号",
        },
        {
          name: "cust_level",
          ChaName: "客户等级",
          type: "Number",
          extra: "",
        },
      ],
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    addFn() {
      console.log("-------->新增");
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
