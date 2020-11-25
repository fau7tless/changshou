<template>
  <div class="my-main-header" :style="mStyle">
    <my-tags class="my-tags" router-view-name="_sys_root" first-router-view-name="_sys_root_first"></my-tags>
  </div>
</template>
<script>
import MyTags from "./my-tags";

export default {
  name: "my-main-header",
  components: {
    MyTags
  },
  // 属性
  props: {
    // 高度
    height: {
      type: String,
      required: false,
      default: "50px"
    }
  },
  data() {
    let date = new Date();
    let s = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`;
    return {
      datetime: s,
      userName: "叮当",
      userIcon: "./static/img/img.png"
    };
  },
  methods: {
    showUserInfo() {
      // this.style.width= '390px'
    }
  },
  // 计算
  computed: {
    // 计算
    mStyle() {
      return {
        height: this.height
      };
    }
  },
  // 加载后处理
  mounted() {
    let userInfo = this.$fox.sessionStorage.get("global_user") || {
      name: "江成",
      head: "static/images/img.png"
    };
    this.userName = userInfo.name;
    this.userIcon = userInfo.head;
  }
};
</script>
<style scoped>
.my-main-header {
  width: 100%;
  position: relative;
  display: -webkit-flex;
  /* Safari */
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  background: #ffffff;
}

.my-main-header::after {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  content: "";
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background-color: #c8c7cc;
  /* 避免被其他元素遮挡 */
  z-index: 100;
}

.my-tags {
  margin-left: 24px;
}
</style>
