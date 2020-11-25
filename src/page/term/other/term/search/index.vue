<template>
    <fox-page>
        <fox-content>
            <fox-group column="3" label-width="120" title="查询条件">
                <fox-number-item v-model="termid" require maxlength="20">质押指令编号</fox-number-item>
                <fox-date-item v-model="termdate" require maxlength="10">解押日</fox-date-item>
                <fox-upload-item action="">
                    <fox-button size="small" type="primary">解押依据</fox-button>
                </fox-upload-item>
                <fox-sub-group column="3" span="3" label-width="120" v-show="m_group2">
                    <fox-money-item v-model="money1" require>金额</fox-money-item>
                    <fox-text-item v-model="remark" maxlength="200">备注</fox-text-item>
                    <fox-select-item v-model="termtype">质押类型</fox-select-item>
                    <fox-radio-item v-model="sex" source="@sex1.json">性别</fox-radio-item>
                </fox-sub-group>
                <fox-button-row align="center">
                    <fox-button type="text" @click="toggle_group2">更多筛选<i class="el-icon-arrow-down el-icon--right"></i></fox-button>
                    <fox-button @click="query">查询</fox-button>
                    <fox-button @click="reset_group1">重置</fox-button>
                </fox-button-row>
            </fox-group>
            <fox-group column="3" title="表格组">
                <fox-button-row align="left">
                    <fox-button type="primary" @click="add">新增</fox-button>
                    <fox-button @click="mod">修改</fox-button>
                    <fox-button @click="del">删除</fox-button>
                </fox-button-row>
                <fox-table-item id="d9796460-2233-11eb-a1b1-a55fe9673324" content="" ref="list1" border page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" highlight-current-row>
                    <fox-table-column prop="col1" label="结果1" width="500"></fox-table-column>
                    <fox-table-column prop="col2" label="结果2" width="500"></fox-table-column>
                    <fox-table-column prop="col3" label="结果3" width="600"></fox-table-column>
                    <fox-table-column prop="col4" label="结果4" width=""></fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: '080001',
    // 数据
    data() {
        return {
            termid: '',
            termdate: '',
            test: {},
            m_group2: false,
            money1: '',
            remark: '',
            termtype: '',
            sex: '',
        }
    },
    // 方法
    methods: {
        toggle_group2() {
            if (this.m_group2) {
                this.m_group2 = false
            } else {
                this.m_group2 = true
            }
        },
        query() {
        },
        reset_group1() {
            this.termid = ''
            this.termdate = ''
            this.money1 = ''
            this.remark = ''
            this.termtype = ''
            this.sex = ''
        },
        add() {
            fox.custom.appendPage(this, '/term/other/term/search/info', '子交易', {}, this.$data)
        },
        mod() {
            fox.custom.appendPage(this, '/term/other/term/search/info', '子交易', {}, this.$data)
        },
        del() {
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