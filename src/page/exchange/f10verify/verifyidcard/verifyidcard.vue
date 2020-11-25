<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" class="" column="2" align="center" label-width="80px">
                <fox-select-item v-model="documentType" disabled source="@cbEstimate.json" placeholder="请选择">证件类型</fox-select-item>
                <fox-number-item v-model="id" require placeholder="请输入证件号码">证件号码</fox-number-item>
                <fox-text-item v-model="name" span="2" require placeholder="请输入姓名">姓名</fox-text-item>
                <fox-button-row class="" align="center">
                    <fox-button type="primary" size="medium" icon="el-icon-success" @click="onSubmit">提交</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-star-off" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
            <br>
            <br>
            <fox-row class="col">
                <fox-col span="14" class="item">
                    <fox-group no="2" column="1" label-width="80px">
                        <fox-number-item v-model="id" disabled placeholder="请输入证件号码">证件号码</fox-number-item>
                        <fox-text-item v-model="name" disabled placeholder="请输入姓名">姓名</fox-text-item>
                        <fox-select-item v-model="result" disabled source="@cbEstimate.json" placeholder="请选择">核对结果</fox-select-item>
                        <fox-item>
                            <fox-empty-item></fox-empty-item>
                        </fox-item>
                        <fox-text-item v-model="organization" style="width:70%" disabled placeholder="请输入签发机关">签发机关</fox-text-item>
                        <fox-text-item v-model="oldName" style="width:70%" disabled placeholder="请输入曾用名">曾用名</fox-text-item>
                    </fox-group>
                </fox-col>
                <fox-col span="2">
                    <fox-empty-item></fox-empty-item>
                </fox-col>
                <fox-col span="5">
                    <fox-group no="3" column="1">
                        <div class="block">
                            <div class="text-img">身份证照片</div>
                            <br>
                            <fox-image style="width: 182px; height: 224px" :src="url" :fit="fill"></fox-image>
                        </div>
                    </fox-group>
                </fox-col>
                <fox-col span="1">
                    <fox-empty-item></fox-empty-item>
                </fox-col>
                <fox-col span="5">
                    <fox-group no="4" column="1">
                        <div class="block">
                            <div class="text-img">联网核查照片</div>
                            <br>
                            <fox-image style="width: 182px; height: 224px" :src="url" :fit="fill"></fox-image>
                        </div>
                    </fox-group>
                </fox-col>
            </fox-row>
            <fox-row class="col">
                <fox-col span="10" class="item">
                    <fox-group no="5" column="1" label-width="80px">
                        <fox-select-item v-model="sex" style="width:98%" disabled source="@sex.json" placeholder="请选择">性别</fox-select-item>
                        <fox-text-item v-model="place" style="width:98%" disabled placeholder="请输入籍贯">籍贯</fox-text-item>
                        <fox-select-item v-model="marry" style="width:98%" disabled source="@marry.json" placeholder="请选择">婚姻状况</fox-select-item>
                        <fox-text-item v-model="job" style="width:98%" disabled placeholder="请输入籍贯">职业</fox-text-item>
                        <fox-date-item v-model="birthday" style="width:98%" disabled placeholder="请选择出生日期">出生日期</fox-date-item>
                        <fox-text-item v-model="birthPlace" style="width:98%" disabled placeholder="请输入出生地">出生地</fox-text-item>
                        <fox-select-item v-model="degree" style="width:98%" disabled source="@cbEstimate.json" placeholder="请选择">文化程度</fox-select-item>
                        <fox-text-item v-model="serviceSpace" style="width:98%" disabled placeholder="请输入服务处所">服务处所</fox-text-item>
                    </fox-group>
                </fox-col>
                <fox-col span="2">
                    <fox-empty-item></fox-empty-item>
                </fox-col>
                <fox-col span="10" class="item">
                    <fox-group no="6" column="1">
                        <br>
                        <div class="block" style="margin: auto auto">
                            <fox-image style="width: 525px; height: 350px;" :src="url" :fit="fill"></fox-image>
                            <fox-button-row class="" align="center">
                                <br>
                                <fox-button type="primary" size="medium" @click="positive">正面</fox-button>
                                <fox-button type="primary" size="medium" @click="reverse">反面</fox-button>
                            </fox-button-row>
                        </div>
                    </fox-group>
                </fox-col>
            </fox-row>
            <fox-group no="8" column="3" label-width="80px">
                <fox-text-item v-model="address" span="3" disabled placeholder="请输入住址">住址</fox-text-item>
                <fox-button-row class="" align="right">
                    <fox-button type="primary" size="medium" @click="print">打印</fox-button>
                    <fox-button type="primary" size="medium" @click="pass">人工通过</fox-button>
                    <fox-button type="primary" size="medium" @click="reset">重置</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>

export default {
    name: 'verifyidcard',
    data: function () {
        return {

            textMenuCode: '',
            textTradeName: '',
            cbEstimate: '',
            authorizationModel: '',
            authorizationLevel: '',
            localAudit: '',

            marry: '',
            ruleData: [
                {
                    index1: '1',
                    name1: 'VTM人脸识别0.5-0.8中心授权11111',
                    status1: '是',
                },
                {
                    index1: '2',
                    name1: 'VTM人脸识别不通过小于0.5',
                    status1: '是',
                },
                {
                    index1: '3',
                    name1: 'VTM签字识别不通过',
                    status1: '是',
                },
            ],
        }
    },
    methods: {
        rowClick(row, column, event) {
            this.row = row
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
        },
        onSubmit() {
            fox.service.request({
                id: '1',
                path: '/icsp-app-sso/api/btopSsoSystem/index',
                data: this.data,
            }).then((response) => {
                if (response.code == 0) {
                    let data
                    if (fox.type(response.data) == 'object') {
                        data = JSON.stringify(response.data)
                    }
                    // 信息框
                    fox.layer.open(`登录成功:${data}`)
                } else {
                    fox.layer.open(`登录失败:${response.message}`)
                }
            }, (error) => {
                fox.layer.open(`请求异常:${error.message}`)
            })
        },
        add() {

        },
        cancel() {

        },

    },
    fox_flow() {
        return {
            mounted(session, context) {
                context.resolve()
            },
        }
    },
}
</script>

<style scoped>
.text-img {
    text-align: center;
}
.col {
    display: flex;
    /* justify-content: space-around; */
    /* justify-content: space-between; */
}
.item {
    flex-shrink: 0;
}
.section {
    margin-top: 10px;
    border: 1px solid rgba(209, 209, 209, 0.6);
    border-radius: 0px;
    padding: 10px;
    zoom: 1;
}
.section:first-child {
    margin-top: 0;
}
.section::after {
    content: "";
    clear: both;
    display: block;
}
.group-table {
    margin-top: 20px;
}
/* .input-block {
    float: left;
    width: calc(100% - 240px);
} */
.input-block .el-form-item {
    margin-top: 5px;
    margin-bottom: 5px;
    width: 100%;
}
.button-block {
    float: right;
    width: 200px;
}
.demo-image .block,
.demo-image__error .block,
.demo-image__placeholder .block {
    text-align: center;
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
    padding: 30px 0px;
    border-right: 1px solid rgb(239, 242, 246);
}
.demo-image .demonstration,
.demo-image__error .demonstration,
.demo-image__placeholder .demonstration {
    display: block;
    color: rgb(132, 146, 166);
    font-size: 14px;
    margin-bottom: 20px;
}
.demo-image .block:last-child,
.demo-image__error .block:last-child,
.demo-image__placeholder .block:last-child {
    border-right: none;
}
</style>