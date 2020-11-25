<template>
    <el-row style="margin-top: 10px">
        <el-col :span="5" style="background-color: #fff;height:500px;">
            <fox-button-row style="margin: 5px 0 0 5px;">
                <fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle
                            icon="el-icon-plus" @click="add"></fox-button>
                <fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle
                            icon="el-icon-edit" @click="mod"></fox-button>
                <fox-button style="background: #fff!important;border-color: #fff; font-size: 20px;" circle
                            icon="el-icon-delete" @click="del"></fox-button>
            </fox-button-row>

            <fox-tree :data="treeData" :props="props" accordion
                      :default-expanded-keys="[1]" node-key="id"
                      style="width: 95%;margin-top: 20px;" @check-change="handleCheckChange">
            </fox-tree>
            <fox-group label-width="80px" style="width:90%">
                <fox-select-item v-model="libraryType" source="@libraryType.json">类别：</fox-select-item>
                <fox-text-item v-model="libraryFatherType" disabled>父类别：</fox-text-item>
                <fox-button @click="search" type="primary" size="medium" style="margin: 0 auto">保存</fox-button>
            </fox-group>

        </el-col>
        <el-col :span="19" style="padding-left: 10px">
            <fox-group column="3" title="查询条件">
                <fox-text-item v-model="standWord">标准单词</fox-text-item>
                <fox-select-item v-model="approStatus" source="@appStatus.json">审批状态</fox-select-item>
                <fox-button-group style="width: 30%">
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
            <fox-table-item id="cb2792e0-2a0a-11eb-8d8d-0bd6ea2a1279" :content="tableData" ref="table1" border
                            page-index="1" :page-sizes="[10, 50, 100, 200]" :page-size="10" highlight-current-row
                            @select="select" @row-click="rowClick">
                <fox-table-column type="selection" width="55"></fox-table-column>
                <fox-table-column prop="standWord" label="标准单词" width=""></fox-table-column>
                <fox-table-column prop="engAbbr" label="英文缩写" width=""></fox-table-column>
                <fox-table-column prop="approStatus" label="审批状态" width=""></fox-table-column>
                <fox-table-column prop="version" label="版本号" width=""></fox-table-column>
                <fox-table-column prop="createTime" label="创建时间" width=""></fox-table-column>
                <fox-table-column prop="createOne" label="创建人" width=""></fox-table-column>
            </fox-table-item>
        </el-col>
    </el-row>


</template>

<script>
    export default {
        name: 'standLibrary',
        // 数据
        data() {
            return {
                standWord: '',
                approStatus: '',
                libraryType: '0',
                libraryFatherType: '字典库类别',
                row: '',
                rows: [],
                props: {
                    children: "children",
                    label: "label",
                },
                treeData: [
                    {
                        id: 1,
                        label: "字典库类别",
                        children: [
                            {
                                id: 4,
                                label: "公共类",
                                children: []
                            },
                            {
                                id: 5,
                                label: "信贷类",
                                children: []
                            },
                            {
                                id: 6,
                                label: "核心类",
                                children: []
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: "一级 2",
                        children: [
                            {
                                id: 7,
                                label: "二级 2-1",
                                children: [
                                    {
                                        id: 14,
                                        label: "二级 2-1-1"
                                    }
                                ]
                            },
                            {
                                id: 8,
                                label: "二级 2-2"
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: "一级 3",
                        children: [
                            {
                                id: 9,
                                label: "二级 3-1"
                            },
                            {
                                id: 10,
                                label: "二级 3-2"
                            }
                        ]
                    }
                ],
                tableData: [
                    {
                        standWord: '客户编号',
                        engAbbr: 'cust_code',
                        approStatus: '通过',
                        version: 'V1',
                        createTime: '2019-09-12',
                        createOne: '系统管理员'
                    },
                    {
                        standWord: '客户名称',
                        engAbbr: 'cust_name',
                        approStatus: '通过',
                        version: 'V2',
                        createTime: '2019-09-12',
                        createOne: '系统管理员'
                    },
                    {
                        standWord: '客户类型',
                        engAbbr: 'cust_type',
                        approStatus: '通过',
                        version: 'V1',
                        createTime: '2019-09-12',
                        createOne: '系统管理员'
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
                this.standWord = ''
                this.approStatus = ''
            },
            add() {
                fox.custom.appendPage(this, '/term/metadata/library/info', '子交易', {}, this.$data.row)
            },
            mod() {
                if (this.row === '' || this.row === null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    fox.custom.appendPage(this, '/term/metadata/library/info', '子交易', {}, this.$data.row)
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
