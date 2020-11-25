<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--page内容区域-->
        <fox-content>
            <fox-group no="1" label-width="100px" column="4">
                <fox-text-item placeholder="标题"></fox-text-item>
                <fox-time-item  ctype="select" placeholder="时间" align="right"></fox-time-item>
                <fox-select-item placeholder="类型" :source="valueType"></fox-select-item>
                <fox-item>
                    <fox-button type="primary" size="medium" icon="el-icon-search" @click="search">搜索</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-refresh" @click="clearForm">重置</fox-button>
                </fox-item>
            </fox-group>
            <fox-group class="my-group" label-width="80px" column="3" style="width:100%;">
                <fox-group class="my-group" label-width="80px" column="1" style="width:60%">
                    <fox-button-group class="button-group-margin">
                        <fox-button type="default" icon="el-icon-plus">新增</fox-button>
                        <fox-button type="default" icon="el-icon-edit">修改</fox-button>
                        <fox-button type="default" icon="el-icon-document">详情</fox-button>
                    </fox-button-group>
                    <fox-table-item border content="globle/DD/table" page-index="1" :page-sizes="[5, 50, 100, 200]" :page-size="5">
                        <fox-table-column type="index" label="序号" width="80"></fox-table-column>
                        <fox-table-column prop="phone" label="编码" width="80"></fox-table-column>
                        <fox-table-column prop="date" label="名称" sortable></fox-table-column>
                        <fox-table-column prop="date" label="类型" width="80"></fox-table-column>
                        <fox-table-column prop="name" label="作者" width="80"></fox-table-column>
                    </fox-table-item>
                </fox-group>
                <fox-group class="my-group" label-width="60px" column="2" style="margin-top:10px;width:35%;border: 1px solid rgba(209, 209, 209, 0.6);padding:10px;">
                    <fox-text-item v-model="value1">名称</fox-text-item>
                    <fox-date-item v-model="value2">时间</fox-date-item>
                    <fox-text-item v-model="value3">作者</fox-text-item>
                    <fox-text-item v-model="value4">审核人</fox-text-item>
                    <fox-text-item v-model="value5">重要性</fox-text-item>
                    <fox-text-item v-model="value6">阅读数</fox-text-item>
                    <fox-text-item v-model="value7">有无</fox-text-item>
                    <fox-text-item v-model="value8">已未</fox-text-item>
                    <fox-text-item v-model="value9">锁定</fox-text-item>
                    <fox-select-item :source="statuType" v-model="value10">状态</fox-select-item>
                    <fox-select-item :source="valueType" v-model="value11">类型</fox-select-item>
                    <fox-text-item placeholder="请输入内容" type="textarea" :rows="3" span="2" label="备注">
                    </fox-text-item>
                    <fox-button-row align="center">
                        <fox-button type="primary" size="medium">保存</fox-button>
                    </fox-button-row> 
                </fox-group>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "index",
        //数据
        data:function(){
            return {
                value1:'',
                value2:'',
                value3:'',
                value4:'',
                value5:'',
                value6:'',
                value7:'',
                value8:'',
                value9:'',
                value10:'',
                value11:'',
                statuType: [{
                    value: "5020010",
                    text: "状态一"
                },{
                    value: "5020020",
                    text: "状态二"
                },],
                valueType: [{
                    value: "5020010",
                    text: "类型一"
                },{
                    value: "5020020",
                    text: "类型二"
                },],
            }
        },
        //方法
        methods:{
            search() {

            },
            clearForm() {

            }
        },
        //加载后处理
        mounted:function(){

        }
    }
</script>

<style scoped>
    .button-group-margin{
        margin: 0 0 10px 0;
    }
</style>