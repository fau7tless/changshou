<template>
    <fox-page>
        <fox-content>
            <fox-group column="3">
                <fox-text-item v-model="params.memAcctNum" maxlength="20">参与者账号</fox-text-item>
                <fox-text-item v-model="params.memSname" maxlength="100">参与者简称</fox-text-item>
                <fox-button-row align="center">
                    <fox-button type="primary" @click="query" icon="iconfont iconsousuo1">查询</fox-button>
                    <fox-button @click="reset" icon="el-icon-refresh-right">重置</fox-button>
                </fox-button-row>
            </fox-group>            
            <fox-group>
                <fox-button-row align="left">
                    <fox-button type="primary" @click="create">新增</fox-button>
                    <fox-button @click="alter">变更</fox-button>
                    <fox-button @click="writeOff">注销</fox-button>
                    <fox-button @click="batchSubmit">批量提交</fox-button>
                </fox-button-row>
                <fox-table-item id="39d661f0-d09f-11ea-8c7c-a51cf4e98085" ref="list" content="/api1/infra/review/modemem/list"
                    :base-params="baseParams" :params="params" border page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10"
                    highlight-current-row @row-click="rowClick"
                >
                    <fox-table-column type="memAcctNum" label="参与者账号" width=""></fox-table-column>
                    <fox-table-column prop="memSname" show-overflow-tooltip="false" label="参与者简称" width=""></fox-table-column>
                    <fox-table-column prop="funcNum" label="功能编号" width=""></fox-table-column>
                    <fox-table-column prop="reviewFlag" label="是否复核" :formatter="formatReviewFlag" width=""></fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {    
    name: 'RE0203',
    // 数据
    data: function () {
        return {
            baseParams: {

            },
            params: {
                memAcctNum: '',
                memSname: '',
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
                funcNum: 'RE020301',
                type: 'create',
            }
            fox.custom.appendPage(this, '/infra-review/uniReview/mode/detail', '子交易', params, {}, () => {}, () => {
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
                funcNum: 'RE020302',
                type: 'alter',
            }
            fox.custom.appendPage(this, '/infra-review/uniReview/mode/detail', '子交易', params, { ...this.m_row }, () => {}, () => {
                this.$refs.list.refresh();
            })
        },
        batchSubmit() {
            let params = {
                funcNum: 'RE020303',
                type: 'create',
            }
            fox.custom.appendPage(this, '/infra-review/uniReview/mode/batchSubmit', '子交易', params, {}, () => {}, () => {
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
        formatReviewFlag(row, column) {
            let val = row[column.property]
            let text = fox.custom.mapping(this, 'CO000001.json', val)
            return text
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