<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <fox-form :model="form" ref="form">
        <fox-group column="2">
          <fox-select-item require v-model="form.zjlx" source="@f07016.json">证件类型</fox-select-item>
          <fox-text-item require v-model="form.zjhm">
            证件号码
            <i slot="suffix" class="el-input__icon el-icon-thumb" @click="showInfo"></i>
          </fox-text-item>
          <fox-select-item require v-model="form.acctType" source="@acctType.json">账户类型</fox-select-item>
          <fox-select-item require v-model="form.acctKind" source="@acctKind.json">卡种</fox-select-item>
          <fox-text-item require v-model="form.phone" maxlength="11">手机号码</fox-text-item>
        </fox-group>
        <fox-group column="2" title="代理人信息">
          <fox-select-item require v-model="form.dlrzjlx" source="@f07016.json">证件类型</fox-select-item>
          <fox-text-item v-model="form.dlrzjhm">
            证件号码
            <i slot="suffix" class="el-input__icon el-icon-thumb" @click="showInfo"></i>
          </fox-text-item>
          <fox-text-item v-model="form.dlrxm">姓名</fox-text-item>
          <fox-text-item v-model="form.dlrphone" number>联系电话</fox-text-item>
        </fox-group>
      </fox-form>
    </fox-content>
    <fox-footer-bar align="right">
      <fox-button @click="submit">提交</fox-button>
      <fox-button @click="cancel">取消</fox-button>
    </fox-footer-bar>
  </fox-page>
</template>

<script>
export default {
  name: "openCard",
  // 数据
  data: function() {
    var id = "";
    return {
      form:{
        zjlx:'',
        zjhm:'',
        acctType:'',
        acctKind:'',
        phone:'',

        dlrzjlx:'',
        dlrzjhm:'',
        dlrxm:'',
        dlrphone:'',
      }
    };
  },
  // 方法
  methods: {
    submit() {
      this.fox_check().then(
        res => {
          fox.layer.alert("成功");
        },
        err => {
          fox.layer.alert("请填写完整");
        }
      );
    },
    cancel() {
      fox.custom.closePage(this);
    },
    showInfo(){}
  },
  // 加载后处理
  mounted: function() {}
};
</script>

<style scoped>
</style>