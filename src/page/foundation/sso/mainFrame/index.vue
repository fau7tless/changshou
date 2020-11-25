<template>
<!--page每个页面的root元素-->
  <fox-page>
    <!--page内容区域-->
    <fox-footer-bar align="right">
        <fox-button @click="submit">提交</fox-button>
    </fox-footer-bar>
    <!--page内容区域-->
    <fox-content style="height: 800px">

    <iframe id="mainFrame" ref="mainFrame" class="iframeStyle" frameborder="0" scrolling="auto"></iframe>

    </fox-content>
  </fox-page>
</template>

<script>
export default {
  name: "mainFrame",
  // 数据
  data: function () {
    return {
      url: "http://localhost:8080/",
    };
  },
  // 方法
  methods: {
    submit() {
    //   var script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.src =  'inject.js';

    //   let h = this.$refs.mainFrame.contentDocument.getElementsByTagName("head");      
    //   h[0].appendChild(script);
      let mainFrame = document.getElementById('mainFrame');
      mainFrame.src = this.url;
      
      mainFrame.onload = function () {
                        //eval("alert(document.getElementsByTagName('input')[0].text);alert(document.forms[0]);");
                    }
    },
  },
  mounted() {
    // let h = this.$refs.mainFrame.contentDocument.getElementsByTagName("head");      
    // h[0].write("alert('123');")
    // let doc = this.$refs.mainFrame.contentDocument;
    // doc.onload = function (){
    //   alert('123');
    // }
  }
};
</script>

<style scoped>
.iframeStyle {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  overflow-y: hidden;
}
</style>