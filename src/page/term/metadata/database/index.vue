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
            <fox-group column="3" title="查询条件">
                <fox-text-item v-model="cnName">中文名称</fox-text-item>
                <fox-text-item v-model="enName">英文名称</fox-text-item>
                <fox-select-item v-model="approStatus" source="@appStatus.json">审批状态</fox-select-item>
                <!--<fox-empty-item></fox-empty-item>-->
                <fox-button-row align="right">
                    <fox-button type="warning" @click="search" style="width:100px;">搜索</fox-button>
                    <fox-button type="primary" @click="reset_group1" style="width:100px;margin-left:15px">重置
                    </fox-button>
                </fox-button-row>
            </fox-group>
            <fox-group column="3" title="元数据表格">
                <fox-button-row align="left">
                    <fox-button type="primary" @click="addDb">新增</fox-button>
                    <fox-button @click="modDb">修改</fox-button>
                    <fox-button @click="delDb">删除</fox-button>
                    <fox-button @click="audit">审核</fox-button>
                    <fox-button @click="exportSql">导出SQL</fox-button>
                </fox-button-row>
            </fox-group>
            <fox-table-item :content="tableData" ref="table1" border page-index="1" :page-sizes="[10, 50, 100, 200]"
                            :page-size="10" highlight-current-row @select="select" @row-click="rowClick">
                <fox-table-column type="selection" width="55"></fox-table-column>
                <fox-table-column prop="cnName" label="中文名称" width=""></fox-table-column>
                <fox-table-column prop="enName" label="英文名称" width=""></fox-table-column>
                <fox-table-column prop="approStatus" label="审批状态" width=""></fox-table-column>
                <fox-table-column prop="version" label="版本号" width="80"></fox-table-column>
                <fox-table-column prop="description" label="描述" width=""></fox-table-column>
            </fox-table-item>
        </el-col>
    </el-row>


</template>

<script>
    export default {
        name: 'database',
        // 数据
        data() {
            return {
                cnName: '',
                enName: '',
                type: '',
                status: '',
                libraryType: '0',
                approStatus: '',
                libraryFatherType: '权益库',
                row: '',
                rows: [],
                rowId: [],
                //树相关
                props: {
                    children: "children",
                    label: "label",
                },
                treeData: [
                    {
                        id: 1,
                        label: "数据库类别",
                        children: [
                            {
                                id: 2,
                                label: "客户营销库",
                                children: []
                            },
                            {
                                id: 3,
                                label: "信贷库",
                                children: []
                            },
                            {
                                id: 4,
                                label: "权益库",
                                children: [
                                    {
                                        id: 5,
                                        label: "积分库"
                                    }
                                ]
                            }
                        ]
                    },

                ],
                //假的表格数据
                tableData: [
                    {
                        id: '1',
                        cnName: '客户编号',
                        enName: 'cust_code',
                        approStatus: '通过',
                        version: 'V1',
                        description: 'AAAAAAAAA',
                    },
                    {
                        id: '2',
                        cnName: '客户名称',
                        enName: 'cust_name',
                        approStatus: '通过',
                        version: 'V2',
                        description: 'BBBBBBBB',
                    },
                    {
                        id: '3',
                        cnName: '客户类型',
                        enName: 'cust_type',
                        approStatus: '通过',
                        version: 'V1',
                        description: 'CCCCC',
                    },
                    {
                        id: '4',
                        cnName: '客户类型',
                        enName: 'cust_type',
                        approStatus: '通过',
                        version: 'V3',
                        description: 'DDDDD',
                    }
                ]
            }
        },
        // 方法
        methods: {
            addDb(){
                fox.custom.appendPage(this, '/term/metadata/database/edit', '新增', {}, this.$data)
            },
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
            modDb(){
                if (this.row === '' || this.row === null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    fox.custom.appendPage(this, '/term/metadata/database/edit', '修改', {}, this.$data.row)
                }
                this.row = null;
                this.$refs.table1.clearSelection();
            },
            delDb(){

            },
            search() {
            },
            reset_group1() {
                this.cnName = ''
                this.approStatus = ''
            },
            add() {
                fox.custom.appendPage(this, '/term/metadata/database/edit', '元数据信息', {}, this.$data)
            },
            mod() {
                fox.custom.appendPage(this, '/term/metadata/database/edit', '元数据信息', {}, this.$data)
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
            exportSql() {
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
