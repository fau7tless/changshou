<template>
    <fox-page>
        <!--footer bar必须在fox-content的面-->
        <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
            <fox-button type="primary" size="small" round @click="onSubmit">提交</fox-button>
            <fox-button type="success" size="small" round>取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group no="1" title="编辑表格">
                <fox-table-item :content="tableData" page-index="1" :page-sizes="[5, 10, 20, 30]"
                                :page-size="5" :show-header="true">
                    <fox-table-column prop="date" label="日期" width="180"></fox-table-column>
                    <fox-table-column prop="name" label="姓名" width="180"></fox-table-column>
                    <fox-table-column prop="address" label="地址">
                        <template v-slot:default="scope">
                            <fox-text-item v-model="scope.row.address" fox-model="tableData.address" fox-desc="个人信息.地址"></fox-text-item>
                        </template>
                    </fox-table-column>
                    <fox-table-column prop="phone" label="电话">
                        <template v-slot:default="scope">
                            <fox-text-item type="number" v-model="scope.row.phone" fox-model="tableData.phone" fox-desc="个人信息.电话"></fox-text-item>
                        </template>
                    </fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "example_edit-table-item",
        //数据
        data:function(){
            return {
                tableData: [],
            }
        },
        //方法
        methods:{
            onSubmit(){
                this.fox_submit()
            }

        },

        //Fox流程
        fox_flow() {

            return {
                /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
                mounted(session, context){
                    for(let i=0; i<3; i++){
                        this.tableData.push({
                            date: "2016-05-02",
                            name: `王小虎${i}`,
                            address: "上海市普陀区金沙江路 1518 弄",
                            phone:""
                        })
                    }

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
                    //触发check函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
                preSubmit(context, checkResult){
                    console.info("pre submit流程")

                    //触发submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
                submit(context){
                    console.info("submit流程")
                    //触发post submit函数调用(必须执行context.resolve或context.reject)
                    fox.layer.alert(JSON.stringify(this.tableData),"数据")
                    context.resolve();
                },

                /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
                postSubmit(context){
                    console.info("post submit流程")
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
        }

    }
</script>

<style scoped>

</style>