<template>
    <fox-page>
        <fox-content>
            <fox-group column="3">
                <fox-select-item v-model="params.belongPltfrmCode" maxlength="8" source="@BA000001.json">发起平台</fox-select-item>
                <fox-date-item v-model="params.belongPltfrmDate" maxlength="100">发起平台日期</fox-date-item>
                <fox-text-item v-model="params.funcNum" maxlength="32">功能编号</fox-text-item>
                <fox-sub-group column="3" span="3" v-show="m_groupShow">
                    <fox-select-item v-model="params.reviewStatus" maxlength="2" source="@CO000003.json">任务状态</fox-select-item>
                    <fox-text-item v-model="params.inputOperNum" maxlength="30">录入操作员编号</fox-text-item>
                    <fox-text-item v-model="params.inputOperName" maxlength="30">录入操作员姓名</fox-text-item>
                </fox-sub-group>
                <fox-button-row align="center">
                    <fox-x-button-more :status.sync="m_groupShow"></fox-x-button-more>
                    <fox-button @click="query">查询</fox-button>
                    <fox-button @click="reset">重置</fox-button>
                </fox-button-row>
            </fox-group>            
            <fox-group column="3">
                <fox-button-row align="left">
                    <fox-button type="primary" @click="review">复核</fox-button>
                    <fox-button @click="alter">批量复核通过</fox-button>
                    <fox-button @click="view">查看</fox-button>
                </fox-button-row>
                <fox-table-item id="2ddad4a0-cfd6-11ea-ac21-efc31aceefd7" ref="list" content="api1/infra/review/task/list" height="300px"
                    :base-params="baseParams" :params="params" border page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" highlight-current-row
                    @row-click="rowClick" @selection-change="selectionChange">
                    <fox-table-column type="selection" width="50"></fox-table-column>
                    <fox-table-column prop="reviewSerialNum" label="任务编号" width=""></fox-table-column>
                    <fox-table-column prop="belongPltfrmCode" label="发起平台" width=""></fox-table-column>
                    <fox-table-column prop="reviewMode" label="复核模式" width=""></fox-table-column>
                    <fox-table-column prop="funcNum" label="功能编号" width=""></fox-table-column>
                    <fox-table-column prop="funcName" label="功能名称" width=""></fox-table-column>
                    <fox-table-column prop="belongPltfrmDate" label="发起平台日期" width=""></fox-table-column>
                    <fox-table-column prop="memAcctNum" label="参与者账号" width=""></fox-table-column>
                    <fox-table-column prop="memSname" label="参与者简称" width=""></fox-table-column>
                    <fox-table-column prop="deptNum" label="部门编号" width=""></fox-table-column>
                    <fox-table-column prop="bizPk" label="业务主键" width=""></fox-table-column>
                    <fox-table-column prop="invalidType" label="作废类别" width=""></fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {    
    name: 'RE0201',
    // 数据
    data: function () {
        return {
            baseParams: {

            },
            params: {
                belongPltfrmCode: '',
                belongPltfrmDate: '',
                funcNum: '',
                reviewStatus: '',
                inputOperNum: '',
                inputOperName: '',
            },
            m_groupShow: false,
            m_selection: [],
        }
    },
    // 方法
    methods: {
        review() {
            fox.custom.appendPage(this, '/infra-review/uniReview/job/review', '子交易', {}, this.curRowData)
        },
        query() {
            this.$refs.list.refresh();
        },
        reset() {
            for (let key in this.params) {
                if (typeof key == 'string') {
                    this.params[key] = ''
                }
            }
        },
        rowClick(row, column, event) {
            this.m_row = row
        },
        selectionChange(val) {
            this.m_selection = val
        },
        alter() {

        },
        review() {
            fox.custom.appendPage(this, '/infra-foundation/fxClearPrdtManage-int/ccyManage/add', '子交易', {}, this.curRowData)
        },
    },
    // Fox流程
    fox_flow() {
        return {
            /**
             * 界面渲染后，更改数据会触发钩子函数
             * @param session
             * @param context
             */
            mounted(session, context) {
                // 完成mounted函数
                context.resolve()
            },
            /**
             * 销毁处理
             */
            beforeDestroy(session) {

            },
            /**
             * 消息
             * @param type
             * @param data
             */
            onMessage(type, data) {

            },
            /**
             * 设置检查条件
             * @param context
             */
            setCheckConditions(context) {
                // 触发check函数调用（必须执行context.resolve或context.reject）
                context.resolve()
            },
            /**
             * 提交前处理
             * @param context
             * @param checkResult
             */
            preSubmit(context, checkResult) {
                console.info('pre submit流程')
                // 触发check函数调用（必须执行context.resolve或context.reject）
                context.resolve()
            },
            /**
             * 提交处理
             * @param context
             */
            submit(context) {
                console.info('submit流程')
                // 触发check函数调用（必须执行context.resolve或context.reject）
                context.resolve()
            },
            /**
             * 提交后处理
             * @param context
             */
            postSubmit(context) {                
                console.info('post submit流程')
            },
            /**
             * 提交取消处理
             * @param context
             */
            cancelSubmit(context, error) {                
                console.info(JSON.stringify(error))
            },
        }
    }
}
</script>

<style scoped>

</style>