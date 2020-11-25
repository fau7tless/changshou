<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--page内容区域-->
        <fox-content>
            <fox-group no="1" label-width="100px" column="4">
                <fox-text-item placeholder="标题"></fox-text-item>
                <fox-time-item  ctype="select" placeholder="时间" align="right"></fox-time-item>
                <fox-select-item placeholder="类型" :source="m_items1"></fox-select-item>
                <fox-item>
                    <fox-button x-button type="primary" size="medium" icon="el-icon-search" @click="search">搜索</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-refresh" @click="clearForm">重置</fox-button>
                </fox-item>
            </fox-group>
            <fox-group no="2" class="my-group" label-width="80px" column="1" style="width:100%">
                <fox-button-group class="button-group-margin">
                    <fox-button type="default" icon="el-icon-plus">新增</fox-button>
                    <fox-button type="default" icon="el-icon-edit">修改</fox-button>
                    <fox-button type="default" icon="el-icon-document">详情</fox-button>
                    <fox-button type="default" icon="el-icon-delete">删除</fox-button>
                    <fox-button type="default" icon="el-icon-document-delete">导出</fox-button>
                </fox-button-group>
                <fox-table-item content="globle/DD/table" page-index="1" :page-sizes="[5, 50, 100, 200]" :page-size="5">
                    <fox-table-column type="selection" width="55"></fox-table-column>
                    <fox-table-column type="index" label="编码" width="80"></fox-table-column>
                    <fox-table-column prop="date" label="名称" width="180" sortable></fox-table-column>
                    <fox-table-column prop="name" label="类型" width="180"></fox-table-column>
                    <fox-table-column label="参与人">
                        <fox-table-column prop="phone" label="作者"></fox-table-column>
                        <fox-table-column prop="phone" label="审核人"></fox-table-column>
                    </fox-table-column>
                    <fox-table-column prop="phone" label="阅读数"></fox-table-column>
                    <fox-table-column prop="phone" label="状态"></fox-table-column>
                    <fox-table-column prop="phone" label="时间"></fox-table-column>
                </fox-table-item>
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
                m_items1: [{
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
    .input-block{
        float: left; width: calc(100% - 240px)
    }
    .input-block .el-form-item{
        margin-bottom: 0;
    }
    .button-block{
        float:right; width: 200px
    }
    .button-group-margin{
        margin: 10px 0;
    }
</style>