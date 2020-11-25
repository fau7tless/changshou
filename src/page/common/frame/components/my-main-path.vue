<template>
    <div class="my-main-path">
        <span class="el-icon-location-outline"></span>
        <fox-breadcrumb style="margin-left: 10px" separator="/">
            <fox-breadcrumb-item v-for="(text, index) in texts" :key="index">{{showText(text)}}</fox-breadcrumb-item>
        </fox-breadcrumb>
    </div>
</template>

<script>
    export default {
        name: "my-main-path",
        //数据
        data(){
            return {
                texts:[],
            }
        },
        methods:{
            showText(text){
                if(window.outPageName){
                    return window.outPageName;
                }
                return text
            }
        },
        //加载后处理
        mounted() {
            //注册监听tab修改事件
            this.$fox_on("global_event_menu_selected", msg => {
                this.texts = msg.texts || [msg.text];
            });
            //注册监听tab修改事件
            this.$fox_on("global_event_tag_selected", msg => {
                this.texts = msg.texts || [msg.text];
            });
        }
    }
</script>

<style scoped>
    .my-main-path{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: row nowrap;
        align-items: center;;
        justify-content: flex-start;
        height: 40px;
        margin-left: 25px;
    }
</style>