<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-content>
            <fox-group class="input-block" column="2">
                <fox-text-item v-model="tellerId">柜员号</fox-text-item>
                <fox-text-item v-model="orgId">机构号</fox-text-item>
                <fox-text-item v-model="startDay">起始日期</fox-text-item>
                <fox-text-item v-model="endDay">结束日期</fox-text-item>
                <fox-select-item v-model="SysName">系统名称</fox-select-item>
                <fox-text-item v-model="userName">登录名称</fox-text-item>
            </fox-group>
            <fox-group no="2" class="my-group" style="width:100%">
                <fox-button-row align="right" style="margin-top:10px">
                    <fox-button type="primary" @click="submit">查询</fox-button>
                </fox-button-row>
                <fox-table-item ref="list" :content="dataTable" @row-click="rowClick" highlight-current-row style="margin-top:10px" page-index="1" :page-sizes="[5, 50, 100, 200]" :page-size="5" border>
                    <fox-table-column type="selection" width="55"></fox-table-column>
                    <fox-table-column prop="sysName" label="系统名称" width="250"></fox-table-column>
                    <fox-table-column prop="tellerId" label="柜员号" width="180"></fox-table-column>
                    <fox-table-column prop="loginTime" label="登录时间" width=""></fox-table-column>
                    <fox-table-column prop="orgId" label="机构号" width=""></fox-table-column>
                    <fox-table-column prop="userId" label="登录用户名" width=""></fox-table-column>
                    <fox-table-column align="right">
                        <template slot="header">
                            <fox-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                        </template>
                        <template slot-scope="scope">
                            <fox-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</fox-button>
                            <fox-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</fox-button>
                        </template>
                    </fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'ssoLoginLog',
    // 数据
    data: function () {
        return {
            textSysName: '',
            dataTable: [{
                sysName: '123',
                tellerId: '123',
                loginTime: '123',
                orgId: '123',
                userId: '123',
            }, {
                sysName: '456',
                tellerId: '456',
                loginTime: '456',
                orgId: '456',
                userId: '456',
            }],
            row: '',
            scope: '',
        }
    },
    // 方法
    methods: {
        rowClick(row) {
            this.row = row
        },
        submit() {
        },
    },
    // fox流程
    fox_flow() {
        return {
            /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
            mounted(session, context){
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
                console.info('submit流程: name:' + this.$options.name)
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