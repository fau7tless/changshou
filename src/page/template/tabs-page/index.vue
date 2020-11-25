<template>
    <fox-page>
        <fox-content>
            <fox-tabs v-model="tab">
                <fox-tab-pane label="基本信息" name="basic">
                    <fox-group column="2" label-width="80px">
                        <fox-text-item disabled v-model="params.name" placeholder="请输入姓名">姓名</fox-text-item>
                        <fox-select-item source="@sex.json" v-model="params.sex">性别</fox-select-item>
                        <fox-select-item :source="m_education" v-model="params.education" placeholder="请选择学历">学历</fox-select-item>
                        <fox-select-item :source="m_idtype" v-model="params.idtype">证件类型</fox-select-item>
                        <fox-date-item v-model="params.birthday" placeholder="请选择出生日期">出生日期</fox-date-item>
                        <fox-text-item v-model="params.idno" placeholder="请输入证件号码">证件号码</fox-text-item>
                        <fox-text-item v-model="params.company" placeholder="请输入公司名称">公司</fox-text-item>
                        <fox-text-item v-model="params.email" placeholder="请输入邮箱">邮箱</fox-text-item>
                        <fox-button-row align="center">
                            <fox-button type="primary" size="medium" icon="el-icon-check" @click="messageBox">保存</fox-button>
                            <fox-button type="primary" size="medium" icon="el-icon-refresh" @click="clearForm">重置</fox-button>
                        </fox-button-row>
                    </fox-group>
                </fox-tab-pane>
                <fox-tab-pane label="资产信息" name="asset">
                    <fox-group column="2" label-width="80px" label-position="right" disabled>
                        <fox-text-item v-model="params.name">姓名</fox-text-item>
                        <fox-item label="性别">
                            <fox-radio v-model="params.sex" label="1">男</fox-radio>
                            <fox-radio v-model="params.sex" label="0">女</fox-radio>
                        </fox-item>
                        <fox-select-item :source="m_education" v-model="params.education">学历</fox-select-item>
                        <fox-item label="证件列表">
                            <fox-checkbox v-model="idtypes" label="01">身份证</fox-checkbox>
                            <fox-checkbox v-model="idtypes" label="02">驾驶证</fox-checkbox>
                        </fox-item>
                        <fox-date-item v-model="params.birthday">出生日期</fox-date-item>
                        <fox-text-item v-model="params.idno">证件号码</fox-text-item>
                        <fox-select-item source="globle/DD/selectList" v-model="params.city">城市</fox-select-item>
                        <fox-text-item v-model="params.company">公司</fox-text-item>
                        <fox-text-item v-model="params.email">邮箱</fox-text-item>
                        <fox-text-item type="textarea" span="2" :rows="5" v-model="remark">备注</fox-text-item>
                        <fox-button-row align="center">
                            <fox-button type="danger" size="medium" icon="el-icon-close" plain>关闭</fox-button>
                        </fox-button-row>
                    </fox-group>
                </fox-tab-pane>
            </fox-tabs>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'index',
    data: function () {
        return {
            tab: 'basic',
            params: {
                name: '',
                sex: '',
                education: '',
                idtype: '',
                birthday: '',
                idno: '',
                company: '',
                email: '',
                city: '',
            },
            idtypes: [],
            remark: '',
            m_education: [
                {
                    value: '01',
                    text: '博士研究生'
                },
                {
                    value: '02',
                    text: '硕士研究生'
                },
                {
                    value: '03',
                    text: '本科'
                },
                {
                    value: '04',
                    text: '专科'
                },
                {
                    value: '05',
                    text: '高中'
                },
                {
                    value: '06',
                    text: '初中'
                },
                {
                    value: '07',
                    text: '小学'
                }
            ],
            m_idtype: [
                {
                    value: '01',
                    text: '身份证'
                },
                {
                    value: '02',
                    text: '驾驶证'
                }
            ]
        }
    },
    methods: {
        messageBox() {
            this.$alert('保存成功','标题',{
                confirmButtonText: 'OK'
            })
        },
        clearForm() {
            for (let key in this.params) {
                if (typeof this.params[key] == 'string') {
                    this.params[key] = ''
                } else if (typeof this.params[key] == 'object') {
                    if (this.params[key] instanceof Array) {
                        this.params[key].length = 0
                    } else if (this.params[key] instanceof Date) {
                        this.params[key] = ''
                    }
                }
            }
        }
    }
}
</script>

<style scoped>

</style>