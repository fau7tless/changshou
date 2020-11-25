<template>
  <!--page每个页面的root元素-->
  <fox-page group-header-width="120px">
    <!--footer bar必须在fox-content的面-->

    <!--page内容区域-->
    <fox-content>
      <fox-group no="1"
                 class="my-group"
                 label-width="80px"
                 column="2"
                 style="width:100%"
                 :filter-events="filterEvents">
        <fox-text-item v-verify="'require'"
                       placeholder="5-25个字符"
                       maxlength="25"
                       minlength="5"
                       v-model="value1">信息标题</fox-text-item>
        <fox-select-item v-verify="'require'"
                         :source="types"
                         v-model="value2">类型</fox-select-item>
        <fox-select-item v-verify="'require'"
                         :source="status"
                         v-model="value3">状态</fox-select-item>
        <fox-text-item v-verify="'require'"
                       placeholder="请输入内容"
                       v-model="value4">作者</fox-text-item>
        <fox-text-item placeholder="请输入内容"
                       v-model="value5">联系电话</fox-text-item>
        <fox-time-item ctype="select"
                       v-model="value6"
                       :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
                       placeholder="设置自动发布时间"
                       align="right">发布时间</fox-time-item>
        <fox-item label="所属标签">
          <fox-checkbox v-model="checked1">中国</fox-checkbox>
          <fox-checkbox v-model="checked2">美国</fox-checkbox>
          <fox-checkbox v-model="checked3">日本</fox-checkbox>
          <fox-checkbox v-model="checked4">欧元区</fox-checkbox>
        </fox-item>
        <fox-item label="是否置顶"></fox-item>
        <fox-text-item span="5"
                       placeholder="请输入内容"
                       type="textarea"
                       :rows="5">内容</fox-text-item>
        <fox-button-row align="center">
          <!--align：left、center、right-->
          <fox-button type="primary"
                      size="medium">取消</fox-button>
          <fox-button class="el-icon-check"
                      type="primary"
                      size="medium">保存</fox-button>
          <fox-button class="el-icon-refresh"
                      type="primary"
                      size="medium">重置</fox-button>
        </fox-button-row>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "index",
  //数据
  data: function() {
    return {
      filterEvents: {
        focus: false,
        blur: false
      },
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      value7: "",
      value8: "",
      value9: "",
      value10: "",
      value11: "",
      value12: "",
      value13: "",
      checked1: "",
      checked2: "",
      checked3: "",
      checked4: "",
      radio: "1",
      radio1: "2",
      types: [
        {
          value: "001",
          text: "类型1"
        },
        {
          value: "002",
          text: "类型2"
        },
        {
          value: "003",
          text: "类型3"
        },
        {
          value: "004",
          text: "类型4"
        },
        {
          value: "005",
          text: "类型5"
        }
      ],
      status: [
        {
          value: "001",
          text: "已完成"
        },
        {
          value: "002",
          text: "未完成"
        },
        {
          value: "003",
          text: "进行中"
        }
      ]
    };
  },
  //方法
  methods: {
    handleChange(value) {
      console.log(value);
    },
    onFocus(event) {
      console.info("----------> focus");
    },
    onBlur(event) {
      console.info("----------> blur");
    }
  },
  //加载后处理
  mounted: function() {}
};
</script>

<style scoped lang="scss">
.check-box {
  width: 50%;
}
</style>