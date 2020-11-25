<template>
    <fox-page>
        <fox-footer-bar>
            <fox-button type="primary" @click="submit">确定</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group column="3" label-width="120" title="基本信息">
                <fox-text-item v-model="termid" require maxlength="20">质押指令编号</fox-text-item>
                <fox-date-item v-model="termdate" require maxlength="10">解押日</fox-date-item>
                <fox-text-item v-model="test.termcont" maxlength="200" span="2">解押依据</fox-text-item>
                <fox-money-item v-model="money1" require>金额</fox-money-item>
                <fox-text-item v-model="remark" maxlength="200" span="2">备注</fox-text-item>
                <fox-cascader-item v-model="termtype" span="2">质押类型</fox-cascader-item>
                <fox-select-item v-model="sex" source="@sex1.json">性别</fox-select-item>
                <fox-text-item v-model="termid" require maxlength="20">质押指令编号</fox-text-item>
                <fox-date-item v-model="termdate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" require span="2">解押日</fox-date-item>
                <fox-date-item v-model="datetime1" type="datetime">日期时间</fox-date-item>
                <fox-text-item v-model="test.termcont" maxlength="200">解押依据</fox-text-item>
                <fox-text-item v-model="textarea1" type="textarea" :rows="3" span="3">textarea</fox-text-item>
                <fox-money-item v-model="money1" require>金额</fox-money-item>
                <fox-number-item v-model="remark1" maxlength="200">数字</fox-number-item>
                <fox-select-item v-model="termtype">质押类型</fox-select-item>
                <fox-select-item v-model="sex" source="@sex1.json">性别</fox-select-item>
            </fox-group>
            <fox-group column="1" title="表格组">
                <fox-button-row align="left">
                    <fox-button type="primary" @click="add">新增</fox-button>
                    <fox-button @click="mod">修改</fox-button>
                    <fox-button @click="del">删除</fox-button>
                </fox-button-row>
                <fox-table-item id="85c64490-227a-11eb-a983-37830b4b5ab5" content="" ref="list1" border page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" highlight-current-row>
                    <fox-table-column prop="col1" label="结果1" width="180"></fox-table-column>
                    <fox-table-column prop="col2" label="结果2" width="180">
                        <template v-slot:default="scope">
                            <fox-date-item v-model="scope.row.col2" fox-model="" fox-desc="" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份"></fox-date-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="col3" label="结果3" width="180">
                        <template v-slot:default="scope">
                            <fox-date-item v-model="scope.row.col3" fox-model="" fox-desc="" maxlength="100"></fox-date-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="col4" label="结果4" width="180">
                        <template v-slot:default="scope">
                            <fox-money-item v-model="scope.row.col4" fox-model="" fox-desc="" maxlength="100"></fox-money-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="col5" label="结果5" width="180">
                        <template v-slot:default="scope">
                            <fox-number-item v-model="scope.row.col5" fox-model="" fox-desc="" maxlength="100"></fox-number-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="col6" label="结果6" width="180">
                        <template v-slot:default="scope">
                            <fox-select-item v-model="scope.row.col6" fox-model="" fox-desc="" maxlength="100"></fox-select-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="col7" label="结果7" width="180">
                        <template v-slot:default="scope">
                            <fox-time-item v-model="scope.row.col7" fox-model="" fox-desc="" maxlength="100"></fox-time-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="col8" label="结果8" width="180">
                        <template v-slot:default="scope">
                            <fox-date-item v-model="scope.row.col8" fox-model="" fox-desc="" type="datetime"></fox-date-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="col9" label="结果9" width="180">
                        <template v-slot:default="scope">
                            <fox-text-item v-model="scope.row.col9" fox-model="" fox-desc="" maxlength="100"></fox-text-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="buttons1" label="操作" width="180">
                        <template v-slot:default="scope">
                            <fox-button size="mini" @click="handleSubmit(scope.$index, scope.row)">保存</fox-button>
                            <fox-button size="mini" @click="handleDelete(scope.$index, scope.row)">删除</fox-button>
                        </template>
                    </fox-table-column>
                </fox-table-item>
            </fox-group>
            <fox-group column="1" title="特殊表格组">
                <fox-x-table>
                </fox-x-table>
            </fox-group>
            <fox-tabs v-model="tabmodel">
                <fox-tab-pane label="基本信息" name="basic">
                    <fox-group column="3" label-width="120" title="基本信息">
                        <fox-text-item v-model="termid" require maxlength="20">质押指令编号</fox-text-item>
                        <fox-date-item v-model="termdate" require maxlength="10">解押日</fox-date-item>
                        <fox-text-item v-model="termcont" maxlength="200">解押依据</fox-text-item>
                        <fox-text-item v-model="remark" maxlength="200">备注</fox-text-item>
                        <fox-select-item v-model="termtype">质押类型</fox-select-item>
                        <fox-button-row align="left">
                            <fox-button type="primary" @click="query">查询</fox-button>
                            <fox-button @click="reset_undefined">重置</fox-button>
                        </fox-button-row>
                    </fox-group>
                </fox-tab-pane>
                <fox-tab-pane label="资产信息" name="asset">
                    <fox-group column="3" label-width="120" title="基本信息">
                        <fox-text-item v-model="termid" require maxlength="20">质押指令编号1</fox-text-item>
                        <fox-date-item v-model="termdate" require maxlength="10">解押日1</fox-date-item>
                        <fox-text-item v-model="termcont" maxlength="200">解押依据1</fox-text-item>
                        <fox-text-item v-model="remark" maxlength="200">备注1</fox-text-item>
                        <fox-select-item v-model="termtype">质押类型1</fox-select-item>
                        <fox-button-row align="left">
                            <fox-button type="primary" @click="query">查询</fox-button>
                            <fox-button @click="reset_undefined">重置</fox-button>
                        </fox-button-row>
                    </fox-group>
                </fox-tab-pane>
            </fox-tabs>
            <fox-group column="3" label-width="120" title="基本信息2">
                <fox-text-item v-model="termid11" require maxlength="20">质押指令编号11</fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: '080003',
    // 数据
    data() {
        return {
            termid: '',
            termdate: '',
            test: {},
            money1: '',
            remark: '',
            termtype: '',
            sex: '',
            datetime1: '',
            textarea1: '',
            remark1: '',
            col2: '',
            col3: '',
            col4: '',
            col5: '',
            col6: '',
            col7: '',
            col8: '',
            col9: '',
            buttons1: '',
            termcont: '',
            termid11: '',
        }
    },
    // 方法
    methods: {
        submit() {
        },
        cancel() {
            fox.layer.confirm('是否退出', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: (action) => {
                    if(action == 'confirm') {
                        fox.custom.closePage(this)
                    }
                },
            })
        },
        add() {
            fox.custom.appendPage(this, '/term/other/term/apply/info', '子交易', {}, this.$data)
        },
        mod() {
            fox.custom.appendPage(this, '/term/other/term/apply/info', '子交易', {}, this.$data)
        },
        del() {
        },
        handleSubmit(index, row) {
        },
        handleDelete(index, row) {
        },
        query() {
        },
        reset() {
        },
    },
    // Fox流程
    fox_flow() {
        return {
            /**
             *  界面渲染后，更改数据会触发钩子函数
             * @param session
             * @param context
             */
            mounted(session, context){

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
            onMessage(type, data){

            },

            /**
             * 设置检查条件
             * @param context
             */
            setCheckConditions(context){
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
             * 提交前处理
             * @param context
             * @param checkResult
             */
            preSubmit(context, checkResult){
                console.info('pre submit流程')

                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
             * 提交处理
             * @param context
             * @param args
             */
            submit(context){
                console.info('submit流程')
                // 触发post submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
             * 提交后处理
             * @param context
             * @param params
             */
            postSubmit(context){
                console.info('post submit流程')
            },

            /**
             * 提交取消处理
             * @param context
             * @param args
             */
            cancelSubmit(context, error){
                console.info(JSON.stringify(error))
            },
        }
    },
}
</script>

<style scoped>

</style>