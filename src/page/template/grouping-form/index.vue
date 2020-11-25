<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--footer bar必须在fox-content的面-->
    
        <!--page内容区域-->
        <fox-content>
            <fox-group no="1" title="基本信息" class="my-group" label-width="80px" column="2" style="width:100%" :filter-events="filterEvents" >
                <fox-text-item v-verify="'require'" placeholder="请输入内容" v-model="value1">姓名</fox-text-item>
                <fox-text-item v-verify="'require'" placeholder="请输入内容" v-model="value2">性别</fox-text-item>
                <fox-text-item v-verify="'require'" placeholder="请输入内容" v-model="value3">学历</fox-text-item>
                <fox-select-item v-verify="'require'" :source="cardType" v-model="value4">证件类型</fox-select-item>
                <fox-text-item v-verify="'require'" placeholder="请输入内容" v-model="value5">出生日期</fox-text-item>
                <fox-text-item placeholder="请输入内容" v-model="value6">证件号码</fox-text-item>
                <fox-text-item placeholder="请输入内容" v-model="value7">公司</fox-text-item>
                <fox-text-item placeholder="请输入内容" v-model="value8">邮箱</fox-text-item>
            </fox-group>
            <fox-group no="2" title="家庭信息" class="my-group" label-width="100px" column="2" style="width:100%" :filter-events="filterEvents" >
                <fox-text-item v-verify="'require'" placeholder="请输入内容" v-model="value9">成员数</fox-text-item>
                <fox-text-item placeholder="请输入内容" v-model="value10">房屋情况</fox-text-item>
                <fox-text-item placeholder="请输入内容" v-model="value11">家庭住址</fox-text-item></fox-group>
                <fox-text-item placeholder="请输入内容" v-model="value12">邮政编码</fox-text-item>
            <fox-group no="3" title="其他信息" class="my-group" label-width="80px" column="1" style="width:100%" :filter-events="filterEvents" >
                <fox-text-item placeholder="请输入内容" v-model="value13">备注</fox-text-item>    
                <fox-button-row align="center"> <!--align：left、center、right-->
                    <fox-button class="el-icon-check" type="primary" size="medium">保存</fox-button>
                    <fox-button class="el-icon-refresh" type="danger" size="medium">重置</fox-button>
                </fox-button-row>
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
                filterEvents:{
                    focus:false,
                    blur:false,
                },
                value1:"",
                value2:"",
                value3:"",
                value4:"",
                value5:"",
                value6:"",
                value7:"",
                value8:"",
                value9:"",
                value10:"",
                value11:"",
                value12:"",
                value13:"",
                cardType:[
                    {
                        value:"001",
                        text:"身份证"
                    },
                    {
                        value:"002",
                        text:"港澳身份证"
                    },
                    {
                        value:"003",
                        text:"护照"
                    }
                ]
               
        }},
        //方法
        methods:{
        },
        //加载后处理
        mounted:function(){

        }
    }
</script>

<style scoped lang="scss">

</style>