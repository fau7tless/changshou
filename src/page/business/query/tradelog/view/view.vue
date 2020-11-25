<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" class title="流水信息" column="2" label-width="80px">
                <fox-text-item v-model="responseData.orgId" placeholder="请输入机构号">机构号</fox-text-item>
                <fox-text-item v-model="responseData.hserialNo" placeholder="请输入核心流水">核心流水</fox-text-item>
                <!--                <fox-date-item v-model="responseData.workDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">交易日期</fox-date-item>-->
                <fox-date-item v-model="responseData.workDate" placeholder="请选择交易日期">交易日期</fox-date-item>
                <fox-select-item v-model="responseData.tranState" source="@marry.json" placeholder="请选择">交易状态</fox-select-item>
                <fox-text-item v-model="responseData.menuCode" placeholder="请输入交易码">交易码</fox-text-item>
                <fox-text-item v-model="responseData.menuName" placeholder="请输入交易名称">交易名称</fox-text-item>
                <fox-text-item v-model="responseData.daccountSeq" placeholder="请输入帐/卡号">帐/卡号</fox-text-item>
                <fox-text-item v-model="responseData.daccount" placeholder="请输入序号">序号</fox-text-item>
                <fox-text-item v-model="responseData.caccountSeq" placeholder="请输入对方账卡号">对方账卡号</fox-text-item>
                <fox-text-item v-model="responseData.oppAccBankNo" placeholder="请输入对方行号">对方行号</fox-text-item>
                <fox-select-item v-model="responseData.ccy" source="@marry.json" placeholder="请选择">交易币种</fox-select-item>
                <fox-money-item v-model="responseData.amt" placeholder="请输入交易金额">交易金额</fox-money-item>
                <fox-text-item v-model="responseData.transTeller" placeholder="请输入经办柜员">经办柜员</fox-text-item>
                <fox-text-item v-model="responseData.authTeller" placeholder="请输入授权柜员">授权柜员</fox-text-item>
                <fox-text-item v-model="responseData.reviewTeller" placeholder="请输入复核柜员">复核柜员</fox-text-item>
                <fox-text-item v-model="responseData.reprintTimes" placeholder="请输入补打次数">补打次数</fox-text-item>
                <fox-text-item v-model="responseData.fserialNo" placeholder="请输入柜员流水号">柜员流水号</fox-text-item>
                <fox-money-item v-model="responseData.amt1" placeholder="请输入交易金额">交易金额</fox-money-item>
            </fox-group>
            <fox-group no="2" column="2" title="联网核查信息" label-width="80px">
                <fox-select-item v-model="responseData.verifyState" source="@marry.json" placeholder="请选择">核查状态</fox-select-item>
                <fox-text-item v-model="responseData.verifySeq" placeholder="请输入核查流水">核查流水</fox-text-item>
            </fox-group>
            <fox-group no="3" column="2" title="代理人信息" label-width="80px">
                <fox-select-item v-model="responseData.agentIdentityTytpe" source="@marry.json" placeholder="请选择">证件类型</fox-select-item>
                <fox-text-item v-model="responseData.agentIdentityId" placeholder="请输入证件号码">证件号码</fox-text-item>
                <fox-text-item v-model="responseData.agentIdentityName" placeholder="请输入姓名">姓名</fox-text-item>
                <fox-text-item v-model="responseData.agentMobiletel" placeholder="请输入联系电话">联系电话</fox-text-item>
            </fox-group>
            <fox-group no="4" column="2" title="收费信息" label-width="80px">
                <fox-money-item v-model="id" placeholder="请输入收费金额">收费金额</fox-money-item>
            </fox-group>
            <fox-group no="5" column="2" title="备注信息" label-width="80px">
                <fox-text-item v-model="id" placeholder="请输入VT交易码">VT交易码</fox-text-item>
                <fox-select-item v-model="marry" source="@marry.json" placeholder="请选择">交易组合</fox-select-item>
                <fox-text-item v-model="id" span="2" placeholder="请输入返回信息">返回信息</fox-text-item>
            </fox-group>
            <fox-group no="3" label-width="80px">
                <fox-button-row align="center">
                    <fox-button-group>
                        <fox-button type="primary" icon="el-icon-arrow-left">上一条</fox-button>
                        <fox-button type="primary">
                            下一条
                            <i class="el-icon-arrow-right el-icon--right"></i>
                        </fox-button>
                    </fox-button-group>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: "B08011",
    data: function () {
        return {
            responseData: {},

            textMenuCode: "",
            textTradeName: "",
            cbEstimate: "",
            authorizationModel: "",
            authorizationLevel: "",
            localAudit: "",
            id: "",
            marry: "",
            ruleData: [
                {
                    index1: "1",
                    name1: "VTM人脸识别0.5-0.8中心授权11111",
                    status1: "是",
                },
                {
                    index1: "2",
                    name1: "VTM人脸识别不通过小于0.5",
                    status1: "是",
                },
                {
                    index1: "3",
                    name1: "VTM签字识别不通过",
                    status1: "是",
                },
            ],
        };
    },
    methods: {
        detail() {},

        rowClick(row, column, event) {
            this.row = row;
        },
        clearForm() {
            for (let key in this.params) {
                if (typeof this.params[key] == "string") {
                    this.params[key] = "";
                } else if (typeof this.params[key] == "object") {
                    if (this.params[key] instanceof Array) {
                        this.params[key].length = 0;
                    } else if (this.params[key] instanceof Date) {
                        this.params[key] = "";
                    }
                }
            }
        },
        onSubmit() {},
        add() {},
        cancel() {},
    },
    mounted() {
        this.responseData = this.$route.params;
    },

    // fox_flow() {
    //     return {
    //         mounted(session, context) {
    //             context.resolve()
    //         },
    //     }
    // },
};
</script>

<style scoped>
.text-img {
    text-align: center;
}
.col {
    display: flex;
    /* justify-content: space-around; */
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