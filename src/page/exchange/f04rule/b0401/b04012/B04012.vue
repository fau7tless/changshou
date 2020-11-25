<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" class="" column="3" align="center" label-width="80px">
                <fox-text-item v-model="textMenuCode" disabled require placeholder="请输入交易码">交易码</fox-text-item>
                <fox-text-item v-model="textTradeName" disabled placeholder="请输入交易名称">交易名称</fox-text-item>
                <fox-select-item v-model="cbEstimate" require source="@cbEstimate.json" placeholder="请选择">判断方式</fox-select-item>
                <fox-select-item v-model="authorizationModel" require source="@authorizationModel.json" placeholder="请选择">授权模式</fox-select-item>
                <fox-select-item v-model="authorizationLevel" require source="@authorizationLevel.json" placeholder="请选择">授权级别</fox-select-item>
                <fox-select-item v-model="localAudit" require source="@localAudit.json" placeholder="请选择">本地审核</fox-select-item>
                <fox-button-row class="" align="center">
                    <fox-button type="primary" size="medium" icon="el-icon-success" @click="onSubmit">提交</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-star-off" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
            <fox-group no="2" title="规则" column="6" label-width="80px">
                <fox-table-item ref="table" span="5" auto-refresh="false" page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" :content="ruleData" :params="searchParams" @row-click="rowClick" highlight-current-row>
                    <fox-table-column prop="" label="规则类型" width="180"></fox-table-column>
                    <fox-table-column prop="RULEINFO" label="规则名称" width="180"></fox-table-column>
                    <fox-table-column prop="LOGIC" label="删除" width="180"></fox-table-column>
                    <fox-table-column prop="NAME" label="关联交易字段" width="180"></fox-table-column>
                    <fox-table-column prop="COMPARERULE" label="币种" width="180"></fox-table-column>
                    <fox-table-column prop="VALUE" label="选择币种字段" width="180"></fox-table-column>
                </fox-table-item>
                <fox-item span="1">
                    <p style="line-height:20px;color:green;margin-bottom:15px">1.选择币种字段后外币金额转为人民币金额计算。<br>2.规则表格右键删除币种配置。</p>
                    <fox-button type="primary" size="medium" icon="el-icon-plus" @click="add">添加</fox-button>
                </fox-item>
            </fox-group>
            <fox-group no="3" title="条件" label-width="80px" class="group-table">
                <fox-table-item ref="table" auto-refresh="false" page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" :content="ruleData" :params="searchParams" @row-click="rowClick" highlight-current-row>
                    <fox-table-column prop="" label="组合逻辑" width="180"></fox-table-column>
                    <fox-table-column prop="RULEINFO" label="判断规则" width="180"></fox-table-column>
                    <fox-table-column prop="LOGIC" label="条件名称" width="180"></fox-table-column>
                    <fox-table-column prop="NAME" label="交易字段" width="180"></fox-table-column>
                    <fox-table-column prop="COMPARERULE" label="比较交易字段" width="180"></fox-table-column>
                    <fox-table-column prop="VALUE" label="选择交易字段" width="180"></fox-table-column>
                    <fox-table-column prop="VALUE" label="选择比较交易字段" width="180"></fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>

export default {
    name: 'B04012',
    data: function () {
        return {
            textMenuCode: '',
            textTradeName: '',
            cbEstimate: '',
            authorizationModel: '',
            authorizationLevel: '',
            localAudit: '',
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
</style>