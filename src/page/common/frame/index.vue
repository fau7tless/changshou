<template>
    <div class="my-wrapper">
        <my-top class="my-top"></my-top>
        <my-main class="my-main">
        </my-main>
        <my-bottom class="my-bottom"></my-bottom>
    </div>
</template>

<script>
    import MyMain from './components/my-main'
    import MyTop from './components/my-top'
    import MyBottom from './components/my-bottom'

    export default {
        name: 'frame',
        //注册组件
        components: {
            MyTop,
            MyMain,
            MyBottom,
        },
        //数据
        data() {
            return {}
        },
        //加载后处理
        mounted() {

        },
    }
</script>

<style scoped>
    .my-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .my-top {
        height: 50px;
        top: 0px;
    }
    .my-main {
        max-height: calc(100% - 35px);
        bottom: 35px;
        top: 50px;
        box-sizing: border-box;
        position:absolute;
    }
    .my-bottom{
        position:absolute;
        height: 35px;
        bottom: 0px;
        z-index: 9999;
    }


</style>
