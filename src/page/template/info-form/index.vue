<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--footer bar必须在fox-content的面-->
        <!--page内容区域-->
        <fox-content>
            <fox-group no="1" disabled class="my-group" label-width="80px" column="2" style="width:100%" :filter-events="filterEvents" >
                <fox-text-item  v-verify="'require'" placeholder="5-25个字符" maxlength="25" minlength="5" v-model="value1">信息标题</fox-text-item>  
                <fox-select-item  v-verify="'require'" :source="types" v-model="value2">类型</fox-select-item>
                <fox-select-item  v-verify="'require'" :source="status" v-model="value3">状态</fox-select-item>
                <fox-text-item  v-verify="'require'" placeholder="请输入内容" v-model="value4">作者</fox-text-item>
                <fox-text-item  placeholder="请输入内容" v-model="value5">联系电话</fox-text-item>
                <fox-time-item  ctype="select" v-model="value6" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="设置自动发布时间" align="right">发布时间</fox-time-item>
                <fox-item label="所属标签">
                    <fox-checkbox disabled v-model="checked1">中国</fox-checkbox>
                    <fox-checkbox disabled v-model="checked2">美国</fox-checkbox>
                    <fox-checkbox disabled v-model="checked3">日本</fox-checkbox>
                    <fox-checkbox disabled v-model="checked4">欧元区</fox-checkbox>
                </fox-item>
                 <fox-item label="是否置顶">
                    <fox-radio disabled v-model="radio" label="1" >是</fox-radio>
                    <fox-radio disabled v-model="radio" label="2" >否</fox-radio>
                </fox-item>
                <fox-text-item span="5" placeholder="请输入内容" type="textarea" :rows="5" v-model="value7">内容</fox-text-item>
                <fox-button-row align="center"> <!--align：left、center、right-->
                    <fox-button type="primary" size="medium">取消</fox-button>
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
                value1:"关于新型社区合作",
                value2:"类型1",
                value3:"已发布",
                value4:"佚名",
                value5:"13899999999",
                value6:"08:30",
                value7:"我是文本我是文本我是文本卫视文本",

                checked1:true,
                checked2:true,
                checked3:true,
                checked4:"",
                radio:"1",
                radio1:"2",
                
                types:[
                    {
                        value:"001",
                        text:"类型1"
                    },
                    {
                        value:"002",
                        text:"类型2"
                    },
                    {
                        value:"003",
                        text:"类型3"
                    },
                    {
                        value:"004",
                        text:"类型4"
                    },
                    {
                        value:"005",
                        text:"类型5"
                    }
                ] ,
                status:[
                    {
                        value:"001",
                        text:"已完成"
                    },
                    {
                        value:"002",
                        text:"未完成"
                    },
                    {
                        value:"003",
                        text:"进行中"
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

<style scoped>
.check-box{
    width:50%
}
</style>