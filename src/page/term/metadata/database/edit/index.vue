<template>
    <fox-page>
        <fox-content>
            <div id="prePage">
                <fox-group column="2" >
                    <fox-text-item v-model="cnName" require>表中文名</fox-text-item>
                    <fox-text-item v-model="enName" require >表英文名</fox-text-item>
                    <fox-text-item placeholder="请输入内容" type="textarea"
                                   :rows="5" span="2" v-model="description" require >描述</fox-text-item>
                    <fox-button-row align="center">
                        <fox-button @click="close">关闭</fox-button>
                        <fox-button type="primary" @click="next">下一步</fox-button>
                    </fox-button-row>
                </fox-group>
            </div>
            <div id="nextPage" class="hide">
                <fox-group column="2">
                    <fox-text-item v-model="cnName1" >表中文</fox-text-item>
                </fox-group>
                <fox-group column="2" title="字段列表">
                    <fox-button-row align="left">
                        <fox-button type="primary" @click="add">新增</fox-button>
                    </fox-button-row>
                    <fox-table-item :content="tableData1" ref="table2" border page-index="1" :page-sizes="[10, 50, 100, 200]"
                                    :page-size="10" highlight-current-row >
                        <fox-table-column prop="name" label="字段名" width=""></fox-table-column>
                        <fox-table-column prop="cnName" label="字段中文名" width=""></fox-table-column>
                        <fox-table-column prop="type" label="字段类型" width=""></fox-table-column>
                        <fox-table-column prop="length" label="字段长度" width="80"></fox-table-column>
                        <fox-table-column fixed="right" label="操作" width="120">
                            <template slot-scope="scope">
                                <fox-button
                                        @click.native.prevent="deleteRow(scope.$index, tableData1)"
                                        type="text"
                                        size="small"
                                >删除</fox-button>
                            </template>
                        </fox-table-column>
                    </fox-table-item>
                    <fox-button-row align="center" style="margin-top:10px">
                        <fox-button @click="previous">上一步</fox-button>
                        <fox-button @click="close">关闭</fox-button>
                        <fox-button type="primary" @click="submit" >确认</fox-button>
                    </fox-button-row>
                </fox-group>
            </div>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'dataLibraryEditInfo',
    // 数据
    data() {
        return {
            cnName: '客户经理信息表',
            enName: 'CUST_MANAGER_INFO',
            description: '客户经理信息表管理客户信息',
            cnName1: '客户编号',
            tableData1:[
                {
                    name: 'cust_code',
                    cnName: '客户编号',
                    type: 'String',
                    length: '40',
                },
                {
                    name: 'cust_code',
                    cnName: '客户编号',
                    type: 'String',
                    length: '40',
                },
                {
                    name: 'cust_code',
                    cnName: '客户编号',
                    type: 'String',
                    length: '40',
                }
            ]
        }
    },
    // 方法
    methods: {
        next() {
            var nextPage = document.getElementById('nextPage');
            var prePage = document.getElementById('prePage');
            nextPage.style.display = 'block';
            prePage.style.display = 'none';
            // fox.custom.appendPage(this, '/term/metadata/database/next', '详细信息', {}, this.$data)
        },
        close() {
           fox.custom.closePage(this);

        },
        previous(){
            var nextPage = document.getElementById('nextPage');
            var prePage = document.getElementById('prePage');
            nextPage.style.display = 'none';
            prePage.style.display = 'block';
            // fox.custom.appendPage(this, '/term/metadata/database/edit', '详细信息', {}, this.$data)
        },
        submit(){

        },
        add(){

        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
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
.hide{
    display: none;
}
</style>
