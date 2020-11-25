<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" class="" column="3" label-width="80px">
                <fox-text-item v-model="id" placeholder="请输入机构号">交易机构</fox-text-item>
                <fox-text-item v-model="id" placeholder="请输入交易码">交易码</fox-text-item>
                <fox-select-item v-model="marry" source="@marry.json" placeholder="请选择">交易凭证类型</fox-select-item>
                <fox-text-item v-model="id" placeholder="请输入操作柜员">操作柜员</fox-text-item>
                <fox-date-item v-model="id" placeholder="请选择交易日期">交易日期</fox-date-item>
                <fox-empty-item></fox-empty-item>
                <fox-select-item span="1" v-model="marry" source="@marry.json" placeholder="请选择">状态</fox-select-item>
                <fox-item span="2" class="fox__item">
                    <span class="el-form-item__label" style="flex:80px 0;">柜员流水号</span>
                    <fox-text-item v-model="id" placeholder="请输入柜员流水号" style='flex:1;display:inline-block;width:auto !important;'></fox-text-item>
                    <span style="color: #667188;flex:15px 0;" class="zhi">至</span>
                    <fox-text-item v-model="id" placeholder="请输入柜员流水号" style='flex:1;display:inline-block;width:auto !important;'></fox-text-item>
                </fox-item>
                <fox-text-item v-model="id" placeholder="请输入帐/卡号">帐/卡号</fox-text-item>
                <fox-item span="2" class="fox__item">
                    <span class="el-form-item__label" style="width: 80px;">交易金额</span>
                    <fox-money-item v-model="id" placeholder="请输入交易金额" style="flex:1"></fox-money-item>
                    <span style="color: #667188;flex:15px 0" class="zhi">至</span>
                    <fox-money-item v-model="id" placeholder="请输入交易金额" style="flex:1"></fox-money-item>
                </fox-item>
                <fox-button-row class="" align="center">
                    <fox-button type="primary" size="medium" icon="el-icon-search" @click="query">查询</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-star-off" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
            <br>
            <br>
            <fox-group no="2" label-width="80px">
                <fox-table-item ref="table" auto-refresh="false" page-index="1" width="100%" :page-sizes="[10, 50, 100, 200]" :page-size="10" :content="ruleData" @row-click="rowClick" highlight-current-row>
                    <fox-table-column prop="MENUCODE" label="交易码" width=""></fox-table-column>
                    <fox-table-column prop="TITLE" label="交易名称" width=""></fox-table-column>
                    <fox-table-column prop="ESTIMATE" label="判断方式" width=""></fox-table-column>
                    <fox-table-column prop="LEVEL" label="授权级别" width=""></fox-table-column>
                </fox-table-item>
            </fox-group>
            <fox-group no="3" label-width="80px">
                <fox-button-row align="right">
                    <br>
                    <fox-button type="primary" size="medium" width="500" @click="query">导出Excel</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="detail">查看原交易</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="query">凭证调阅</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="query">笔记还原</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="query">凭证补打</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="query">取消</fox-button>
                </fox-button-row>
            </fox-group>
            <!-- <fox-button align="right" type="primary" size="medium" width="500" icon="el-icon-search" @click="query">查询核查结果</fox-button> -->
        </fox-content>
    </fox-page>
</template>

<script>

export default {
    name: 'verifybatchlist',
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
        detail() {
            fox.custom.appendPage(this, '/exchange/f08unireg/b0801/b08011', '交易日志详情', {}, this.$data)
        },

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
    justify-content: space-around;
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
.fox__item >>> .el-form-item__content {
    width: 100%;
    display: flex;
}
.zhi {
    margin-left: 2%;
    margin-right: 2%;
}
</style>