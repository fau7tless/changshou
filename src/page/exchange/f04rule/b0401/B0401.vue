<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" class="" column="4" align="center" label-width="80px">
                <fox-text-item v-model="searchParams.textMenuCode" style="width:25%" placeholder="请输入交易码">交易码</fox-text-item>
                <fox-text-item v-model="searchParams.textTradeName" style="width:25%" placeholder="请输入交易名称">交易名称</fox-text-item>
                <fox-select-item style="width:25%" v-model="searchParams.cbEstimate" source="@cbEstimate.json" placeholder="请选择">判断方式</fox-select-item>
                <fox-item>
                    <fox-button type="primary" size="medium" icon="el-icon-search" @click="query">查询</fox-button>
                </fox-item>
            </fox-group>
            <fox-group no="2" label-width="80px">
                <fox-table-item ref="table" auto-refresh="false" page-index="1" width="100%" :page-sizes="[10, 50, 100, 200]" :page-size="10" :content="ruleData" @row-click="rowClick" highlight-current-row>
                    <fox-table-column prop="MENUCODE" label="交易码" width=""></fox-table-column>
                    <fox-table-column prop="TITLE" label="交易名称" width=""></fox-table-column>
                    <fox-table-column prop="ESTIMATE" label="判断方式" width=""></fox-table-column>
                    <fox-table-column prop="LEVEL" label="授权级别" width=""></fox-table-column>
                </fox-table-item>
            </fox-group>
            <fox-group no="3" label-width="80px" class="group-button">
                <fox-button-row align="right">
                    <fox-button type="primary" size="medium" icon="el-icon-plus" @click="add">新增</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-edit" @click="mod">修改</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-delete" @click="del">删除</fox-button>
                    <fox-button type="primary" size="medium" icon="el-icon-star-off" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>

export default {
    name: 'B0401',
    data: function () {
        return {
            searchParams: {

            },
            row: null,
            ruleData: [
                {
                    MENUCODE: '010101',
                    TITLE: 'VTM人脸识别0.5-0.8中心授权11111',
                    ESTIMATE: '条件执行',
                    LEVEL: '1-1级',
                },
                {
                    MENUCODE: '010102',
                    TITLE: 'VTM人脸识别0.5-0.8中心授权11111',
                    ESTIMATE: '必须执行',
                    LEVEL: '2-2级',
                },
                {
                    MENUCODE: '010103',
                    TITLE: 'VTM人脸识别0.5-0.8中心授权11111',
                    ESTIMATE: '条件执行',
                    LEVEL: '3-3级',
                },
            ],
        }
    },
    methods: {
        query() {
            this.$refs.table.refresh()
        },
        rowClick(row, column, event) {
            this.row = row
        },
        add() {
            fox.custom.appendPage(this, '/exchange/f04rule/b0401/b04011', '新增交易', {}, this.$data)
        },
        mod() {
            if (this.row == null) {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
            } else {
                let data = {
                    textMenuCode: this.row.MENUCODE,
                    textTradeName: this.row.TITLE,
                }
                fox.custom.appendPage(this, '/exchange/f04rule/b0401/b04012', '修改交易', {}, data)
            }
        },
        del() {
            if (this.row == null) {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
            } else {
                this.$confirm('确定要删除记录吗？', '提示', {
                    type: 'info',
                }).then(() => { }).catch(() => { })
            }
        },
        cancel() {
            fox.custom.closePage(this)
        },

        // 查看详情
        detail() {
            if (this.row === '') {
                this.$message({
                    type: 'warning',
                    message: '请先选择一条数据',
                })
                return
            }
            this.dialogTitle = '查看服务规则'
            this.operation = 'detail'
            this.params.row = this.row
            this.$refs.dialog.dialogVisible = true
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
    },
    mounted: function () {
        this.fetchData()
        this.serverQuery()
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
.group-button {
    margin-top: 10px;
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