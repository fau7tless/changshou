<template>
    <fox-page>
        <fox-content>
            <fox-group column="2" title="查询条件">
                <fox-text-item v-model="btnId">按钮ID</fox-text-item>
                <fox-text-item v-model="funcName">功能名称</fox-text-item>
                <fox-button-row align="center">
                    <fox-button type="primary" @click="query" icon="iconfont iconsousuo1">查询</fox-button>
                    <fox-button @click="reset" icon="el-icon-refresh-right">重置</fox-button>
                </fox-button-row>
            </fox-group>            
            <fox-group column="3" title="表格组">
                <fox-button-row align="left">
                    <fox-button type="primary" @click="create">新增</fox-button>
                    <fox-button @click="alter">变更</fox-button>
                    <fox-button @click="writeOff">注销</fox-button>
                </fox-button-row>
                <fox-table-item id="39d661f0-d09f-11ea-8c7c-a51cf4e98085" ref="list" content="/api1/infra/review/reviewmodeconfig/modeset/pagemodeset"
                    :base-params="baseParams" :params="params" border page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10"
                    highlight-current-row @row-click="rowClick"
                >
                    <fox-table-column prop="btnId" label="按钮ID"></fox-table-column>
                    <fox-table-column prop="funcName" label="功能名称"></fox-table-column>
                    <fox-table-column prop="reviewMode" label="复核模式" :formatter="format"></fox-table-column>
                    <fox-table-column prop="firstApproveChkUrl" label="初审检查URL"></fox-table-column>
                    <fox-table-column prop="secondApproveChkUrl" label="复审检查URL"></fox-table-column>
                    <fox-table-column prop="secondApprovePassUrl" label="复审通过URL"></fox-table-column>
                    <fox-table-column prop="reviewOpType" label="复核操作类型" :formatter="format"></fox-table-column>
                    <fox-table-column prop="approveFlag" label="是否审核"></fox-table-column>
                    <fox-table-column prop="inputChkUrl" label="录入检查URL"></fox-table-column>
                    <fox-table-column prop="reviewPassChkUrl" show-overflow-tooltip label="复核通过检查URL" width="80px"></fox-table-column>
                    <fox-table-column prop="reviewPassProcUrl" label="复核通过处理URL"></fox-table-column>
                    <fox-table-column prop="invalidPostProcUrl" label="作废后处理URL"></fox-table-column>
                    <fox-table-column prop="specialPageDtlPath" label="特殊页详情"></fox-table-column>
                    <fox-table-column prop="specialPageModifyPath" label="特殊页修改"></fox-table-column>
                    <fox-table-column prop="specialPageFirstapprovePath" label="特殊页初审"></fox-table-column>
                </fox-table-item>
                <fox-router-view name="_sys_root_extract"></fox-router-view>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {    
    name: 'RE0200',
    // 数据
    data: function () {
        return {
            baseParams: {
                //
            },
            params: {
                btnId: '',
                funcName: '',
            },
        }
    },
    // 方法
    methods: {
        query() {
            this.$refs.list.refresh();
        },
        reset() {
            fox.custom.resetObject(this.params)
        },
        create() {
            let params = {
                funcNum: 'IN_RE_020301',
                type: 'create',
            }
            fox.custom.appendPage(this, 'IN_RE_020301', '子交易', params, {}, () => {}, () => {
                this.$refs.list.refresh();
            })
        },
        alter() {
            if (!this.m_row) {
                this.$message({
                    message: '请先选择一条数据！',
                    type: 'warning',
                })
                return
            }
            let params = {
                funcNum: 'IN_RE_020302',
                type: 'alter',
            }
            fox.custom.appendPage(this, 'IN_RE_020302', '子交易', params, { ...this.m_row }, () => {}, () => {
                this.$refs.list.refresh();
            })
        },
        writeOff() {
            if(!this.m_row) {
                this.$message({
                    message: '请先选择一条数据！',
                    type: 'warning',
                })
                return
            }
            fox.layer.confirm('是否注销', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then((action) => {
                alert(action)
            }).catch((action) => {
                alert(action)
            })
        },
        rowClick(row, column, event) {
            this.m_row = row
        },
        format(row, column) {
            let map = {
                // 是否审核
                approveFlag: 'CO000001.json',
                // 复核模式
                reviewMode: 'CO000005.json',
            }
            let { property } = column            
            return fox.custom.mapping(this, map[property], row[property])
        }
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