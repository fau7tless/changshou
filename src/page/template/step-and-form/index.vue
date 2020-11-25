<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--footer bar必须在fox-content的面-->
        <!--align的值有left、center、right 默认为right-->
        <!-- <fox-footer-bar align="center">  
            <fox-button type="primary" icon="el-icon-close">返回</fox-button>
            <fox-button type="primary" icon="el-icon-check">下一步</fox-button>
            <fox-button type="primary" icon="el-icon-refresh">重置</fox-button>
        </fox-footer-bar> -->
        <!--page内容区域-->
        <!-- 样式有问题 -->
        <!-- <fox-header-bar align="center">
            <fox-group no="1" title="基本信息" class="my-group" label-width="100px" column="2" style="width:100%"
                       :filter-events="filterEvents" >
                <div style="width:100%">
                    <fox-steps :active="1" finish-status="success">
                        <fox-step title="基本信息"></fox-step>
                        <fox-step title="家庭信息"></fox-step>
                        <fox-step title="其他信息"></fox-step>
                    </fox-steps>
                </div>
            </fox-group>
            <div style="width:100%">
                <fox-steps :active="1" finish-status="success">
                    <fox-step title="基本信息"></fox-step>
                    <fox-step title="家庭信息"></fox-step>
                    <fox-step title="其他信息"></fox-step>
                </fox-steps>
            </div>
            <fox-steps :active="1" finish-status="success" class="step">
                <fox-step title="基本信息"></fox-step>
                <fox-step title="家庭信息"></fox-step>
                <fox-step title="其他信息"></fox-step>
            </fox-steps>
        </fox-header-bar> -->
        <fox-content>
            <fox-group no="2" class="my-group" label-width="100px" column="2" style="width:100%"
                       :filter-events="filterEvents" >
                <div style="width:100%">
                    <fox-steps :active="1" finish-status="success">
                        <fox-step title="基本信息"></fox-step>
                        <fox-step title="家庭信息"></fox-step>
                        <fox-step title="其他信息"></fox-step>
                    </fox-steps>
                </div>
            </fox-group>
            <fox-group no="2" class="my-group" label-width="100px" column="2" style="width:100%"
                       :filter-events="filterEvents" >
                <fox-text-item v-verify="'require'" v-model="value" placeholder="请输入内容">姓名</fox-text-item>
                <fox-select-item v-verify="['require']" placeholder="请选择" :source="m_items" v-model="value6" label="性别"></fox-select-item>
                <fox-select-item v-verify="['require']" placeholder="请选择" :source="m_items1" v-model="value6" label="学历"></fox-select-item>
                <fox-select-item v-verify="['require']" placeholder="请选择" :source="options1" v-model="value6" label="证件类型"></fox-select-item>
                <fox-date-item v-model="value" placeholder="选择日期" label="出生日期"></fox-date-item>
                <fox-text-item v-verify="['require','text']" v-model="value4" type = "text" placeholder="请输入内容">证件号码</fox-text-item>
                <fox-text-item v-verify="['text']" v-model="value4" type = "text" placeholder="请输入内容">所在公司</fox-text-item>
                <fox-text-item v-verify="['number']" v-model="value4" type = "phone" placeholder="请输入内容">手机号码</fox-text-item>
            </fox-group>
            <fox-group  column="2"  no="2" class="my-group" label-width="100px" style="width:100%">
                <fox-text-item placeholder="请输入内容" type="textarea"
                               :rows="5" span="2" label="备注">
                </fox-text-item>
            </fox-group>
            <fox-group column="2"  no="2" class="my-group" label-width="100px" style="width:100%">
                <fox-button-row align="center"> <!--align：left、center、right-->
                    <fox-button type="primary" icon="el-icon-close">返回</fox-button>
                    <fox-button type="primary" icon="el-icon-check">下一步</fox-button>
                    <fox-button type="primary" icon="el-icon-refresh">重置</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'index',
    //数据
    data: function(){
        return {
            m_items: [
                {
                    value: '5020010',
                    text: '男',
                },
                {
                    value: '5020020',
                    text: '女',
                },
            ],
            m_items1: [{
                value: '5020010',
                text: '本科',
            }, {
                value: '5020020',
                text: '专科',
            }],
            dateSelect: '1995/09/01',
            valueSelect: '硕士',
            options1Select: '',
            options: [
                {
                    value: '选项1',
                    label: '硕士',
                },
                {
                    value: '选项2',
                    label: '博士',
                },
                {
                    value: '选项3',
                    label: '本科',
                },
                {
                    value: '选项4',
                    label: '专科',
                },
                {
                    value: '选项5',
                    label: '初中',
                },
            ],
            options1: [
                {
                    value: '选项1',
                    label: '身份证',
                },
                {
                    value: '选项2',
                    label: '护照',
                },
                {
                    value: '选项3',
                    label: '户口本',
                },
            ],
            radio: '1',
            filterEvents: {
                focus: false,
                blur: false,
            },
            value: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            },
                            
        }
    },
    //方法
    methods: {
        handleChange(value) {
            console.log(value)
        },
        onFocus(event){
            console.info('----------> focus')
        },
        onBlur(event){
            console.info('----------> blur')
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
    },
    //加载后处理
    mounted: function(){

    },
}
</script>

<style scoped>
.button-fox{
    margin-top: 9px;

}
.half{
   width: 50%; 
}
.my-tool-header{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;
    align-items:center;
}
.step .el-step__title{
    text-align: center !important;
}
</style>