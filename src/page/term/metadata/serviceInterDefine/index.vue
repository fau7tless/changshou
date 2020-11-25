<template>
    <el-row style="margin-top: 10px">
        <el-col :span="5" style="background-color: #fff;height:500px;">
            <fox-button-row style="margin: 5px 0 0 5px;">
                <fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle icon="el-icon-plus" @click="add"></fox-button>
                <fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle icon="el-icon-edit" @click="mod"></fox-button>
                <fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle icon="el-icon-delete" @click="del"></fox-button>
            </fox-button-row>

            <fox-tree :data="treeData" :props="props" accordion
                      :default-expanded-keys="[1]" node-key="id"
                      style="width: 95%" @check-change="handleCheckChange">
            </fox-tree>
            <fox-group label-width="80px" style="width:90%;margin-top: 20px;">
                <fox-select-item v-model="libraryType" source="@libraryType.json">类别：</fox-select-item>
                <fox-text-item v-model="libraryFatherType" disabled>父类别：</fox-text-item>
                <fox-button @click="search" type="primary" size="medium" style="margin: 0 auto">保存</fox-button>
            </fox-group>

        </el-col>
        <el-col :span="19" style="padding-left: 10px">
            <fox-group column="4" title="查询条件">
                <fox-text-item v-model="interfaceName">接口类名</fox-text-item>
                <fox-select-item v-model="interfaceLevel" source="@interfaceType.json">接口级别</fox-select-item>
                <fox-select-item v-model="approStatus" source="@appStatus.json">审批状态</fox-select-item>
                <!--<fox-empty-item></fox-empty-item>-->
                <fox-button-group align="right">
                    <fox-button type="warning" @click="search" style="width:100px;">搜索</fox-button>
                    <fox-button type="primary" @click="reset_group1" style="width:100px;margin-left:15px">重置
                    </fox-button>
                </fox-button-group>
            </fox-group>
            <fox-group column="3" title="元数据表格">
                <fox-button-row align="left">
                    <fox-button type="primary" @click="add">新增</fox-button>
                    <fox-button @click="mod">修改</fox-button>
                    <fox-button @click="del">删除</fox-button>
                    <fox-button @click="info">详情</fox-button>
                    <fox-button @click="audit">审核</fox-button>
                </fox-button-row>
            </fox-group>
            <fox-table-item :content="tableData" ref="table1" border page-index="1" :page-sizes="[10, 50, 100, 200]"
                            :page-size="10" highlight-current-row @select="select" @row-click="rowClick">
                <fox-table-column type="selection" width="55"></fox-table-column>
                <fox-table-column prop="interfaceName" label="接口类名" width=""></fox-table-column>
                <fox-table-column prop="approStatus" label="审批状态" width="120"></fox-table-column>
                <fox-table-column prop="interVersion" label="接口版本" width="80"></fox-table-column>
                <fox-table-column prop="interfaceLevel" label="接口级别" width="120"></fox-table-column>
                <fox-table-column prop="isVoid" label="允许调用服务ID" width=""></fox-table-column>
                <fox-table-column prop="interDesc" label="接口类说明" width=""></fox-table-column>
            </fox-table-item>
        </el-col>
    </el-row>


</template>

<script>
    export default {
        name: 'serviceInterDefine',
        // 数据
        data() {
            return {
                interfaceName: '',
                interfaceLevel: '',
                type: '',
                status: '',
                libraryType: '0',
                approStatus: '',
                libraryFatherType: '接口类类别',
                row: '',
                rows: [],
                //树相关
                props: {
                    children: "children",
                    label: "label",
                },
                treeData: [
                    {
                        id: 1,
                        label: "接口类类别",
                        children: [
                            {
                                id: 2,
                                label: "公共类",
                                children: []
                            },
                            {
                                id: 3,
                                label: "查询类",
                                children: []
                            },
                            {
                                id: 4,
                                label: "修改类",
                                children: []
                            }
                        ]
                    },
                ],
                //假的表格数据
                tableData: [
                    {
                        interfaceName: 'CustManager',
                        approStatus: '审批中',
                        interfaceLevel: '原子服务',
                        isVoid: '是',
                        interDesc: '客户经理接口类',
                        interfaceApi: '/api/manager',
                        interfaceUrl: 'cn.com.yusys.cust',
                        interVersion: 'V1',
                    },
                    {
                        interfaceName: 'CustManager',
                        approStatus: '审批中',
                        interVersion: 'V1',
                        interfaceLevel: '聚合服务',
                        isVoid: '是',
                        interDesc: '客户经理接口类',
                    },
                    {
                        interfaceName: 'CustManager',
                        approStatus: '审批中',
                        interVersion: 'V2.2',
                        interfaceLevel: '业务服务',
                        isVoid: '是',
                        interDesc: '客户经理接口类',
                    }
                ]
            }
        },
        // 方法
        methods: {
            select(selection, row) {
                this.row = row
                this.rows.push(row)
                // this.rowId.push(row.id)
                // this.rowId = Array.from(new Set([...this.rowId]))
            },
            // 切换选中状态
            toggleSelection(row) {
                if (row) {
                    this.$refs.table1.toggleRowSelection(row);
                } else {
                    this.$refs.table1.clearSelection();
                }
            },
            rowClick(row) {
                this.row = row
                this.rows.push(row)
                this.toggleSelection(row)
            },
            search() {
            },
            reset_group1() {
                this.interfaceName = ''
                this.approStatus = ''
            },
            add() {
                let params={
                    btnType: "add"
                };
                fox.custom.appendPage(this, '/term/metadata/serviceInterDefine/edit', '元数据信息', params, this.$data)
            },
            mod() {
                if (this.row === '' || this.row === null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    let params={
                        btnType: "update"
                    };
                    fox.custom.appendPage(this, '/term/metadata/serviceInterDefine/edit', '元数据信息', params, this.$data.row)
                }
                this.row = null;
                this.$refs.table1.clearSelection();
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
                if (this.row === '' || this.row === null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    let params = {
                        btnType: "info"
                    };
                    fox.custom.appendPage(this, '/term/metadata/serviceInterDefine/edit', '详细信息', params, this.$data.row)
                    this.row = null;
                    this.$refs.table1.clearSelection();
                }
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
