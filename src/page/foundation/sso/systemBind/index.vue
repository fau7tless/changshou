<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <fox-group class="input-block" column="2">
        <fox-text-item v-model="teller">柜员代号</fox-text-item>
        <fox-text-item v-model="bindOrg">绑定机构</fox-text-item>
        <fox-text-item v-model="System">系统名称</fox-text-item>
        <fox-item align="right">
          <fox-button type="primary" @click="query">查询</fox-button>
        </fox-item>
      </fox-group>
      <fox-group no="2" class="my-group" style="width: 100%">
        <fox-button-row align="right" style="margin-top: 10px">
          <fox-button type="default" @click="addBind" icon="el-icon-plus"
            >添加绑定</fox-button
          >
          <fox-button type="default" @click="delBind" icon="el-icon-delete"
            >解除绑定</fox-button
          >
          <fox-button
            type="default"
            @click="cancel"
            icon="el-icon-document-delete"
            >取消</fox-button
          >
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
          <fox-table-column type="selection" width="55"></fox-table-column>
          <fox-table-column
            prop="sysNo"
            label="系统编号"
            width="180"
          ></fox-table-column>
          <fox-table-column
            prop="sysName"
            label="系统名称"
            width="250"
          ></fox-table-column>
          <fox-table-column
            prop="tellerId"
            label="绑定柜员"
            width
          ></fox-table-column>
          <fox-table-column
            prop="orgId"
            label="绑定机构"
            width
          ></fox-table-column>
          <fox-table-column
            prop="loginUserName"
            label="外部系统用户名"
            width
          ></fox-table-column>
          <fox-table-column prop="status" label="状态" width></fox-table-column>
          <fox-table-column
            prop="sysId"
            label="系统ID"
            width
          ></fox-table-column>
        </fox-table-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "systemBind",
  // 数据
  data: function () {
    return {
      textSysName: "",
      dataTable: [
        {
          sysNo: "123",
          sysName: "123",
          tellerId: "123",
          orgId: "123",
          loginUserName: "123",
          status: "123",
          sysId: "123",
        },
        {
          sysNo: "456",
          sysName: "456",
          tellerId: "456",
          orgId: "456",
          loginUserName: "456",
          status: "456",
          sysId: "123",
        },
      ],
      row: "",
    };
  },
  // 方法
  methods: {
    rowClick(row) {
      this.row = row;
    },
    query() {},
    addBind() {
      fox.custom.appendPage(
        this,
        "/foundation/sso/systemBind/bind",
        "添加绑定",
        {},
        this.$data
      );
    },
    delBind() {
      // if(this.row == '' || this.row == null){
      // this.$alert('必须选中一条数据才能删除')
      // }else{
      //
      // }
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
</style>