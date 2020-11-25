<template>
    <fox-page>
        <fox-content>
            <fox-group column="2" >
                <fox-text-item v-model="interfaceName" :disabled="isDisable" require>接口类名</fox-text-item>
                <fox-text-item v-model="interfaceApi" :disabled="isDisable" require >接口类API</fox-text-item>
                <fox-text-item v-model="interfaceUrl" :disabled="isDisable" require span="2">接口路径</fox-text-item>
                <fox-text-item v-model="interVersion" :disabled="isDisable" require >接口版本</fox-text-item>
                <fox-select-item v-model="interfaceLevel" :disabled="isDisable" require source="@interfaceType.json">接口级别</fox-select-item>
                <fox-text-item v-model="isVoid" require :disabled="isDisable" >允许调用服务ID</fox-text-item>
                <fox-text-item v-model="interDesc" :disabled="isDisable" require type="textarea"
                               :rows="5" span="2">接口类说明</fox-text-item>
            </fox-group>
            <fox-group column="2" title="接口列表">
                <fox-button-row align="left">
                    <fox-button type="primary" @click="add">新增</fox-button>
                </fox-button-row>
                <fox-table-item :content="tableData1" ref="table2" border page-index="1" :page-sizes="[10, 50, 100, 200]"
                                :page-size="10" highlight-current-row >
                    <fox-table-column prop="interMethodName" label="接口方法名" width=""></fox-table-column>
                    <fox-table-column prop="interfaceApi" label="接口API" width=""></fox-table-column>
                    <fox-table-column prop="requestType" label="请求类型" width=""></fox-table-column>
                    <fox-table-column prop="inputProp" label="输入参数" width=""></fox-table-column>
                    <fox-table-column prop="outputProp" label="输出参数" width=""></fox-table-column>
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
                    <fox-button type="primary" @click="submit">确认</fox-button>
                    <fox-button @click="close">关闭</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'dataLibraryEditInfo',
    // 数据
    data() {
        return {
            interfaceName: '',
            interfaceApi: '',
            interfaceUrl: '',
            interVersion: '',
            interfaceLevel: '',
            isVoid: '',
            interDesc: '',
            isDisable: false,//是否可编辑
            tableData1:[
                {
                    interMethodName: 'getCust',
                    interfaceApi: '/info',
                    requestType: 'GET',
                    inputProp: 'custInfo',
                    outputProp: 'custManager'
                },
                {
                    interMethodName: 'setCust',
                    interfaceApi: '/info',
                    requestType: 'POST',
                    inputProp: 'custManager',
                    outputProp: 'custInfo'
                }
            ]
        }
    },
    // 方法
    methods: {
        submit() {
        },
        close() {
           fox.custom.closePage(this)
        },
        add(){
            fox.custom.appendPage(this, '/term/metadata/serviceInterDefine/add', '新增接口', {}, this.$data)
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
                if (this.$route.params.btnType === 'info') {
                    this.isDisable = true
                }
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
