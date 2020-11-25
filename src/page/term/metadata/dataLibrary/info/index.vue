<template>
    <fox-page>
        <fox-content>
            <fox-group column="2" title="基本信息">
                <fox-text-item v-model="cnName"  disabled>中文名称</fox-text-item>
                <fox-text-item v-model="enName"  disabled>英文名称</fox-text-item>
                <fox-select-item v-model="type"  source="@wordType.json" disabled>类型</fox-select-item>
                <fox-text-item v-model="version"  disabled>版本号</fox-text-item>
                <fox-text-item v-model="length"  disabled>长度</fox-text-item>
                <fox-empty-item></fox-empty-item>
                <fox-text-item v-model="enumValue" span="2"   disabled>枚举值</fox-text-item>
                <fox-text-item v-model="regExp" span="2"  disabled>正则表达式</fox-text-item>
                <!--<fox-button-row align="center">-->
                    <!--<fox-button type="primary" @click="submit">保存</fox-button>-->
                    <!--<fox-button @click="cancel">取消</fox-button>-->
                <!--</fox-button-row>-->
            </fox-group>
            <fox-group column="2" title="关联信息">
                <fox-tabs v-model="activeName" @tab-click="handleClick" style="width:100%">
                    <fox-tab-pane label="关联数据库表" name="first">
                        <fox-table-item :content="tableData1" ref="table2" border page-index="1" :page-sizes="[10, 50, 100, 200]"
                                        :page-size="10" highlight-current-row >
                            <fox-table-column type="selection" width="55"></fox-table-column>
                            <fox-table-column prop="cnName" label="中文名称" width=""></fox-table-column>
                            <fox-table-column prop="enName" label="英文名称" width=""></fox-table-column>
                            <fox-table-column prop="version"  label="版本" width="80"></fox-table-column>
                            <fox-table-column prop="description" label="描述" width="200"></fox-table-column>
                        </fox-table-item>
                    </fox-tab-pane>
                    <fox-tab-pane label="关联服务信息" name="second">关联服务信息</fox-tab-pane>
                </fox-tabs>

            </fox-group>
            <fox-button-row >
                <fox-button style=" margin-left: 47%; margin-top: 20px;" type="primary" @click="close">关闭</fox-button>
            </fox-button-row>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'dataLibraryInfo',
    // 数据
    data() {
        return {
            activeName: "first",
            cnName: '客户编号',
            enName: 'cust_code',
            type: '01',
            length: '64',
            version: 'V1',
            enumValue: '0-未生效1-生效',
            regExp: '正则表达式',
            tableData1:[
                {
                    cnName: '客户经理信息表',
                    enName: 'CUST_MANAGER_INFO',
                    version: 'V1',
                    description: '客户经理信息表',
                }
            ]
        }
    },
    // 方法
    methods: {
        close() {
           fox.custom.closePage(this)
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
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
