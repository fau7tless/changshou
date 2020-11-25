<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" class="" column="3" align="center" >
                <fox-select-item v-model="checkType" source="@f07016.json" placeholder="请选择">证件类型</fox-select-item>
                <fox-number-item v-model="idNum" require placeholder="请输入证件号码">证件号码</fox-number-item>
                <fox-text-item v-model="name" require placeholder="请输入姓名">姓名</fox-text-item>
                <fox-button-row class="" align="center">
                    <fox-button type="primary" size="medium" icon="el-icon-success" @click="onSubmit">提交</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-star-off" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
            <br>
            <fox-group no="7" column="3" class="col">
                <div style="width:58%">
                    <fox-group no="2" column="1" label-width="80px">
                        <fox-number-item v-model="idNum" disabled placeholder="请输入证件号码">证件号码</fox-number-item>
                        <fox-text-item v-model="name"  disabled placeholder="请输入姓名">姓名</fox-text-item>
                        <fox-select-item v-model="checkStatus"   disabled source="@checkStatus.json" placeholder="请选择">核对结果</fox-select-item>
                        <fox-text-item v-model="organization"  disabled placeholder="请输入签发机关">签发机关</fox-text-item>
                        <fox-text-item v-model="oldName"  disabled placeholder="请输入曾用名">曾用名</fox-text-item>
                    </fox-group>
                </div>
                <div style="width:19%;margin-left:15px;" >
                    <!-- <fox-group no="3" column="1"> -->
                        <div class="block">
                            <div class="text-img">人脸照片</div>
                            <br>
                            <fox-image class="fox-image1 border" :src="url" :fit="fill"></fox-image>
                        </div>
                    <!-- </fox-group> -->
                </div>
                <div style="width:19%;margin-left:15px；margin-right:20px" >
                    <!-- <fox-group no="4" column="1"> -->
                        <div class="block">
                            <div class="text-img">联网核查照片</div>
                            <br>
                            <fox-image class="fox-image1 border"  :src="url" :fit="fill"></fox-image>
                        </div>
                    <!-- </fox-group> -->
                </div>
            </fox-group>
            <fox-group  no="9" class="col" column="2">
                <div  style="width:58%">
                    <fox-group no="5" column="1" label-width="80px" >
                        <fox-select-item v-model="sex"  disabled source="@sex.json" placeholder="请选择">性别</fox-select-item>
                        <fox-text-item v-model="place" disabled placeholder="请输入籍贯">籍贯</fox-text-item>
                        <fox-select-item v-model="marry"  disabled source="@marry.json" placeholder="请选择">婚姻状况</fox-select-item>
                        <fox-text-item v-model="job"  disabled placeholder="请输入籍贯">职业</fox-text-item>
                        <fox-date-item v-model="birthday" disabled placeholder="请选择出生日期">出生日期</fox-date-item>
                        <fox-text-item v-model="birthPlace" disabled placeholder="请输入出生地">出生地</fox-text-item>
                        <fox-select-item v-model="degree" disabled source="@cbEstimate.json" placeholder="请选择">文化程度</fox-select-item>
                        
                    </fox-group>
                </div>
                <div style="width:40%">
                    <!-- <fox-group no="6" column="1"> -->
                        <div class="block">
                            <div class="text-img">身份证照片</div>
                            <br>
                            <div class="block" style="margin-left:50px;">
                                <fox-image class="border" style="width: 90%; height: 300px;" :src="url" :fit="fill"></fox-image>
                                <fox-button-row class="" align="center">
                                    <br>
                                    <fox-button type="primary" size="medium" @click="positive">正面</fox-button>
                                    <fox-button type="primary" size="medium" @click="reverse">反面</fox-button>
                                </fox-button-row>
                            </div>
                        </div>
                    <!-- </fox-group> -->
                </div>
            </fox-group>
            <fox-group no="10" column="1" style="width:95%" label-width="80px">
                <fox-text-item v-model="serviceSpace"  disabled placeholder="请输入服务处所">服务处所</fox-text-item>
                <fox-text-item v-model="address" disabled placeholder="请输入住址">住址</fox-text-item>
            </fox-group>
            <fox-group no="8" column="3" label-width="80px">
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
            idNum: '',
            checkType:'',
            name:'',
            checkStatus:'2',
            organization:'',
            oldName:'',
            url:'',
            sex:'',
            place:'',
            marry:'',
            job:'',
            birthday:'',
            birthPlace:'',
            degree:'',
            serviceSpace:'',
            fill:'',
            address:'',
            serviceSpace:'',
            serviceSpace:'',
            serviceSpace:'',
            serviceSpace:'',

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
    watch: {
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
            fox.custom.closePage(this)
        },
        positive() {
            alert('身份证正面')
        },
        reverse() {
            alert('身份证反面')
        },
        print() {
            alert('打印')
        },
        pass() {
            alert('通过')
        },
        reset() {
            alert('重置')
        },
        //计算出生日期
        calBurnDate(userInfo){
            let burthDate = userInfo.idNum.substring(6,14);
            let year = burthDate.substring(0,4);
            let month = burthDate.substring(4,6)-1;
            let day = burthDate.substring(6,8);
            this.$data.birthday = new Date(year,month,day,0,0);
        },
    },
    
    fox_flow() {
        return {
            mounted(session, context) {
                let userInfo = fox.custom.getSyncData(this);
                this.calBurnDate(userInfo);
                context.resolve()
            },
        }
    },
}
</script>

<style scoped>
.border{
    border:1px solid #ccc;
}
.fox-image1{
    width: 182px; 
    height: 224px;
    margin-left: 50px;
}
.text-img {
    text-align: center;
}
.col {
    /* display: flex; */
    width: 100%;
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