<template>
    <el-row style="margin-top: 10px">
        <el-col :span="19" style="padding-right:10px">
            <fox-group column="3" title="查询条件">
                <fox-text-item v-model="cnName">中文名称</fox-text-item>
                <fox-text-item v-model="enName">英文名称</fox-text-item>
                <fox-button-group style="width: 30%">
                    <fox-button type="warning" @click="search" style="width:100px;">搜索</fox-button>
                    <fox-button type="primary" @click="reset_group1" style="width:100px;margin-left:15px">重置
                    </fox-button>
                </fox-button-group>
            </fox-group>
            <fox-table-item :content="tableData" ref="table1" border
                            page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" highlight-current-row>
                <fox-table-column type="selection" width="55"></fox-table-column>
                <fox-table-column prop="cnName" label="中文名称" width=""></fox-table-column>
                <fox-table-column prop="enName" label="英文名称" width=""></fox-table-column>
                <fox-table-column prop="serviceType" label="服务类型" width=""></fox-table-column>
                <fox-table-column prop="serviceLevel" label="服务级别" width=""></fox-table-column>
            </fox-table-item>
        </el-col>
        <el-col :span="5" style="background-color: #fff;height:500px;">
            <!--<fox-button-row style="margin: 5px 0 0 5px;">-->
                <!--<fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle-->
                            <!--icon="el-icon-plus" @click="add"></fox-button>-->
                <!--<fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle-->
                            <!--icon="el-icon-edit" @click="mod"></fox-button>-->
                <!--<fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle-->
                            <!--icon="el-icon-delete" @click="del"></fox-button>-->
            <!--</fox-button-row>-->

            <fox-tree :data="treeData" :props="props" accordion show-checkbox
                      :default-expanded-keys="[3]" node-key="id"
                      style="width: 95%;margin-top: 20px;" @check-change="handleCheckChange">
            </fox-tree>
            <!--<fox-group label-width="80px" style="width:90%">-->
                <!--<fox-select-item v-model="libraryType" source="@libraryType.json">类别：</fox-select-item>-->
                <!--<fox-text-item v-model="libraryFatherType" disabled>父类别：</fox-text-item>-->
                <!--<fox-button @click="search" type="primary" size="medium" style="margin: 0 auto">保存</fox-button>-->
            <!--</fox-group>-->

        </el-col>
    </el-row>


</template>

<script>
    export default {
        name: 'serviceAuth',
        // 数据
        data() {
            return {
                cnName: '',
                enName: '',
                // serviceType: '',
                // libraryType: '0',
                // libraryFatherType: '字典库类别',
                props: {
                    children: "children",
                    label: "label",
                },
                treeData: [
                    {
                        id: 1,
                        label: "订单服务",
                        children: [ ]
                    },
                    {
                        id: 2,
                        label: "库存服务",
                        children: [ ]
                    },
                    {
                        id: 3,
                        label: "客户服务",
                        children: [
                            {
                                id: 4,
                                label: "getCust"
                            },
                        ]
                    }
                ],
                tableData: [
                    {
                        cnName: '客户经历服务',
                        enName: 'custmanager',
                        serviceType: '类型1',
                        serviceLevel: 'V1',
                    },
                    {
                        cnName: '客户名称',
                        enName: 'cust_name',
                        serviceType: '通过',
                        serviceLevel: 'V2',
                    },
                    {
                        cnName: '客户类型',
                        enName: 'cust_type',
                        serviceType: '通过',
                        serviceLevel: 'V1',
                    }
                ]
            }
        },
        // 方法
        methods: {
            search() {
            },
            reset_group1() {
                this.cnName = '';
                this.enName = '';
            },
            add() {
                fox.custom.appendPage(this, '/term/metadata/library/info', '子交易', {}, this.$data)
            },
            mod() {
                fox.custom.appendPage(this, '/term/metadata/library/info', '子交易', {}, this.$data)
            },
            del() {
                fox.layer.confirm('确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    callback: (action) => {
                        if (action == 'confirm') {
                            // fox.custom.closePage(this)
                        }
                    },
                })
            },
            info() {
            },
            audit() {
            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate);
            },
            handleNodeClick(data) {
                console.log(data);
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
                    // 触发check函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
                preSubmit(context, checkResult) {
                    console.info('pre submit流程')

                    // 触发submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
                submit(context) {
                    console.info('submit流程')
                    // 触发post submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
                postSubmit(context) {
                    console.info('post submit流程')
                },

                /**
                 * 提交取消处理
                 * @param context
                 * @param args
                 */
                cancelSubmit(context, error) {
                    console.info(JSON.stringify(error))
                },
            }
        },
    }
</script>
}
<style scoped>

</style>
