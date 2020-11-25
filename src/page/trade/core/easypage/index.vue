<template>
  <!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-content>
      <iframe :src="url" id="mobsf" style="position:absolute" frameborder="0"></iframe>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "easypage",
  // 数据
  data: function() {
    var id = "";
    return {
      url:'',
      loading:true
    };
  },
  // 方法
  methods: {},
  // 加载后处理
  mounted() {
    window.closeAssignPage = this;
    this.url = window.outPageUrl;

    var that = this;
    if(this.url){
      function changeSize(){
        const mobsf = document.getElementById("mobsf");
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        mobsf.style.width = (Number(deviceWidth)-20)+'px';
        mobsf.style.height = (Number(deviceHeight)-180)+'px';
      }
      changeSize()
      window.onresize = function(){
        changeSize()
      }
    }
  },
  beforeDestroy(){
    window.closeAssignPage = "";
    window.outPageUrl = "";
    window.outPageName = ""
  }
};
</script>

<style scoped>
</style>