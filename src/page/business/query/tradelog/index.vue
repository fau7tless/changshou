<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" class column="3" label-width="80px">
                <fox-text-item v-model="searchParams.orgId" placeholder="请输入机构号">交易机构</fox-text-item>
                <fox-text-item v-model="searchParams.menuCode" placeholder="请输入交易码">交易码</fox-text-item>
                <fox-text-item v-model="searchParams.teansTeller" placeholder="请输入操作柜员">操作柜员</fox-text-item>
                <fox-date-item v-model="searchParams.workDate" placeholder="请选择交易日期">交易日期</fox-date-item>
                <fox-text-item v-model="searchParams.daccountSeq" placeholder="请输入帐/卡号">帐/卡号</fox-text-item>
                <fox-select-item span="1" v-model="searchParams.tranState" source="@marry.json" placeholder="请选择">状态</fox-select-item>
                <fox-item span="2" class="fox__item">
                    <span class="el-form-item__label" style="flex:80px 0;">柜员流水</span>
                    <fox-text-item v-model="searchParams.fserialNoOne" placeholder="请输入柜员流水号" style="flex:1;display:inline-block;width:auto !important;"></fox-text-item>
                    <span style="color: #667188;flex:15px 0;" class="zhi">至</span>
                    <fox-text-item v-model="searchParams.fserialNoTwo" placeholder="请输入柜员流水号" style="flex:1;display:inline-block;width:auto !important;"></fox-text-item>
                </fox-item>
                <fox-empty-item></fox-empty-item>
                <fox-item span="2" class="fox__item">
                    <span class="el-form-item__label" style="width: 80px;">交易金额</span>
                    <fox-money-item v-model="searchParams.amtOne" placeholder="请输入交易金额" style="flex:1"></fox-money-item>
                    <span style="color: #667188;flex:15px 0" class="zhi">至</span>
                    <fox-money-item v-model="searchParams.amtTwo" placeholder="请输入交易金额" style="flex:1"></fox-money-item>
                </fox-item>
                <fox-button-row class align="center">
                    <fox-button type="primary" size="medium" icon="el-icon-search" @click="query">查询</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-star-off" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
            <br />
            <br />
            <fox-group no="2" label-width="80px">
                <fox-table-item
                    ref="table"
                    :content="dataurl"
                    page-index="1"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="10"
                    width="100%"
                    @row-click="rowClick"
                    :params="searchParams"
                    highlight-current-row
                >
                    <fox-table-column prop="cserialNo" label="客户流水" width></fox-table-column>
                    <fox-table-column prop="fserialNo" label="交易流水" width></fox-table-column>
                    <fox-table-column prop="workDate" label="会计日期" width></fox-table-column>
                    <fox-table-column prop="daccountSeq" label="借方账号" width></fox-table-column>
                    <fox-table-column prop="orgId" label="机构号" width></fox-table-column>
                    <fox-table-column prop="menuCode" label="交易码" width></fox-table-column>
                    <fox-table-column prop="menuName" label="交易名称" width></fox-table-column>
                    <fox-table-column prop="tranState" label="状态" width></fox-table-column>
                    <fox-table-column prop="amt" label="交易金额" width></fox-table-column>
                    <fox-table-column prop="transTeller" label="经办柜员" width></fox-table-column>
                </fox-table-item>
            </fox-group>
            <fox-group no="3" label-width="80px">
                <fox-button-row align="right">
                    <br />
                    <fox-button type="primary" size="medium" width="500" @click="query">导出Excel</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="detail">查看原交易</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="query">凭证调阅</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="query">笔记还原</fox-button>
                    <fox-button type="primary" size="medium" width="500" @click="query">凭证补打</fox-button>
                </fox-button-row>
            </fox-group>
            <!-- <fox-button align="right" type="primary" size="medium" width="500" icon="el-icon-search" @click="query">查询核查结果</fox-button> -->
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: "verifybatchlist",
    data: function () {
        return {
            dataurl: "/" + backend.oca + "/api/btopTradeTradelog/index",
            searchParams: {},
            row: {},
            // textMenuCode: '',
            // textTradeName: '',
            // cbEstimate: '',
            // authorizationModel: '',
            // authorizationLevel: '',
            // localAudit: '',
            marry: "",
        };
    },
    methods: {
        query() {
            if (this.searchParams.workDate) {
                this.searchParams.workDate = this.format(
                    this.searchParams.workDate,
                    "yyyy-MM-dd"
                );
            }
            this.$refs.table.refresh();
        },
        detail() {
            let params = this.row;
            if (params.cserialNo) {
                fox.custom.appendPage(
                    this,
                    "/foundation/business/query/view",
                    "交易日志详情",
                    params,
                    this.$data.row
                );
            } else {
                this.$message({
                    type: "warning",
                    message: "请先选择一条数据",
                });
            }
        },
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
        cancel() {
            this.searchParams = {};
            // fox.custom.readCard(this)
            // fox.custom.appendPage(this, '/../../public-page', '', {}, this.$data)
        },
        //国际化时间转化
        format(time, format) {
            var t = new Date(time);
            var tf = function (i) {
                return (i < 10 ? "0" : "") + i;
            };
            return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
                switch (a) {
                    case "yyyy":
                        return tf(t.getFullYear());
                        break;
                    case "MM":
                        return tf(t.getMonth() + 1);
                        break;
                    case "mm":
                        return tf(t.getMinutes());
                        break;
                    case "dd":
                        return tf(t.getDate());
                        break;
                    case "HH":
                        return tf(t.getHours());
                        break;
                    case "ss":
                        return tf(t.getSeconds());
                        break;
                }
            });
        },
    },
    mounted() {
        this.query();
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