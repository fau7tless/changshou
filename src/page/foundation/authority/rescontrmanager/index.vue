<template>
    <fox-page>
        <fox-content>
            <fox-col :span="5" class="border-right">
                <div class="grid-content bg-purple-dark">
                    <fox-group no="1" class="my-group" label-width="100px" style="width:100%">
                        <div class="container border">
                            <fox-tree
                                    class="filter-tree"
                                    :data="treeData"
                                    :props="m_defaultProps"
                                    :accordion="true"
                                    :default-expand-all="false"
                                    :filter-node-method="filterNode"
                                    ref="tree"
                                    @node-click="handleNodeClick"
                            >
                            </fox-tree>
                        </div>
                    </fox-group>
                </div>
            </fox-col>
            <fox-col :span="1" class="border-right">
                <br/>
            </fox-col>
            <fox-col :span="18" class="margin">
                <fox-group no="1" title="搜索" class="my-group" label-width="100px" style="width:100%" column="4">
                    <fox-text-item placeholder="操作名称" v-model="m_searchInput.contrName" clearable>操作名称</fox-text-item>
                    <fox-text-item placeholder="操作代码" v-model="m_searchInput.contrCode">操作代码</fox-text-item>
                    <fox-text-item placeholder="操作URL" v-model="m_searchInput.contrUrl">操作URL</fox-text-item>
                    <fox-item column="3">
                        <fox-button type="primary" icon="el-icon-search" size="small" @click="search"></fox-button>
                        <fox-button type="danger" icon="el-icon-refresh" size="small" @click="clear"></fox-button>
                        <fox-button type="primary" icon="el-icon-plus" size="small"
                                    @click="addControlPoint"></fox-button>
                    </fox-item>
                </fox-group>
                <fox-group no="2" class="my-group" label-width="100px" style="width:100%">
                    <fox-table-item
                            ref="table"
                            auto-refresh="false"
                            :content="dataUrl"
                            page-index="1"
                            :page-sizes="[10, 50, 100, 200]"
                            :page-size="10"
                            :params="m_searchInput">
                        <fox-table-column type="index" width="55" label="序号"></fox-table-column>
                        <fox-table-column prop="contrName" label="控制操作名称"></fox-table-column>
                        <fox-table-column prop="contrCode" label="控制操作代码"></fox-table-column>
                        <fox-table-column prop="contrUrl" label="控制操作URL"></fox-table-column>
                        <fox-table-column prop="methodType" label="HTTP方法"></fox-table-column>
                        <fox-table-column prop="lastChgName" label="最新变更用户"></fox-table-column>
                        <fox-table-column prop="lastChgDt" label="最新变更时间"></fox-table-column>
                        <fox-table-column label="操作" fixed="right" width="200">
                            <template slot-scope="scope">
                                <fox-button @click="handleClickCheck(scope.row)" type="primary" size="small"
                                            icon="el-icon-view"></fox-button>
                                <fox-button @click="handleClickEdit(scope.row)" type="primary" size="small"
                                            icon="el-icon-edit"></fox-button>
                                <fox-button @click="handleClickDelete(scope.row)" type="primary" size="small"
                                            icon="el-icon-delete"></fox-button>
                            </template>
                        </fox-table-column>
                    </fox-table-item>

                </fox-group>
            </fox-col>
            <fox-dialog title="修改" :visible.sync="editDialog.show">
                <fox-form :model="form">
                    <fox-group no="2" class="my-group" label-width="100px" style="width:100%" column="2">
                        <fox-text-item v-verify="['require']" placeholder="请输入控制操作名称"
                                       v-model="editDialog.content.contrName">操作名称
                        </fox-text-item>
                        <fox-text-item placeholder="请输入控制操作代码" v-model="editDialog.content.contrCode">控制操作代码
                        </fox-text-item>
                        <fox-text-item placeholder="请输入控制操作URL" :span="2" v-model="editDialog.content.contrUrl">
                            控制操作URL
                        </fox-text-item>
                        <fox-select-item v-verify="['require']" placeholder="请选择" :source="editDialog.selectOptions"
                                         v-model="editDialog.content.methodType" label="HTTP方法"></fox-select-item>
                        <fox-text-item placeholder="请输入内容" type="textarea"
                                       :rows="5" span="2" label="备注" v-model="editDialog.content.contrRemark">
                        </fox-text-item>
                    </fox-group>
                </fox-form>
                <div slot="footer" class="dialog-footer">
                    <fox-button @click="editDialog.show = false">取 消</fox-button>
                    <fox-button type="primary" @click="updateDialogConfirm">确 定</fox-button>
                </div>
            </fox-dialog>

            <fox-dialog title="查看" :visible.sync="checkDialog.show">
                <fox-form :model="form">
                    <fox-group no="2" class="my-group" label-width="100px" style="width:100%" column="2" disabled>
                        <fox-text-item v-verify="['require']" placeholder="请输入控制操作名称"
                                       v-model="checkDialog.content.contrName">操作名称
                        </fox-text-item>
                        <fox-text-item placeholder="请输入控制操作代码" v-model="checkDialog.content.contrCode">控制操作代码
                        </fox-text-item>
                        <fox-text-item placeholder="请输入控制操作URL" :span="2" v-model="checkDialog.content.contrUrl">
                            控制操作URL
                        </fox-text-item>
                        <fox-select-item v-verify="['require']" placeholder="请选择" :source="checkDialog.selectOptions"
                                         v-model="checkDialog.content.methodType" label="HTTP方法"></fox-select-item>
                        <fox-text-item placeholder="请输入内容" type="textarea"
                                       :rows="5" span="2" label="备注" v-model="checkDialog.content.contrRemark">
                        </fox-text-item>
                    </fox-group>
                </fox-form>
            </fox-dialog>

            <fox-dialog title="新增" :visible.sync="addDialog.show">
                <fox-form :model="form">
                    <fox-group no="2" class="my-group" label-width="100px" style="width:100%" column="2">
                        <fox-text-item v-verify="['require']" placeholder="请输入控制操作名称"
                                       v-model="addDialog.content.contrName">操作名称
                        </fox-text-item>
                        <fox-text-item placeholder="请输入控制操作代码" v-model="addDialog.content.contrCode">控制操作代码
                        </fox-text-item>
                        <fox-text-item placeholder="请输入控制操作URL" :span="2" v-model="addDialog.content.contrUrl">控制操作URL
                        </fox-text-item>
                        <fox-select-item v-verify="['require']" placeholder="请选择" :source="addDialog.selectOptions"
                                         v-model="addDialog.content.methodType" label="HTTP方法"></fox-select-item>
                        <fox-text-item placeholder="请输入内容" type="textarea"
                                       :rows="5" span="2" label="备注" v-model="addDialog.content.contrRemark">
                        </fox-text-item>
                    </fox-group>
                </fox-form>
                <div slot="footer" class="dialog-footer">
                    <fox-button @click="addDialog.show = false">取 消</fox-button>
                    <fox-button type="primary" @click="addControlPointDialogConfirm">确 定</fox-button>
                </div>
            </fox-dialog>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        data: function () {
            return {
                dataUrl: '/' + backend.oca + '/api/adminsmrescontr/getcontrinfo',
                tableData: [],
                filterText: '',
                treeData: [],
                data: [
                    {
                        id: 1,
                        label: '一级 1',
                        children: [
                            {
                                id: 4,
                                label: '二级 1-1',
                                children: [
                                    {
                                        id: 9,
                                        label: '三级 1-1-1',
                                    },
                                    {
                                        id: 10,
                                        label: '三级 1-1-2',
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        id: 2,
                        label: '一级 2',
                        children: [
                            {
                                id: 5,
                                label: '二级 2-1',
                            },
                            {
                                id: 6,
                                label: '二级 2-2',
                            },
                        ],
                    },
                    {
                        id: 3,
                        label: '一级 3',
                        children: [
                            {
                                id: 7,
                                label: '二级 3-1',
                            },
                            {
                                id: 8,
                                label: '二级 3-2',
                            },
                        ],
                    },
                ],
                m_defaultProps: {
                    children: 'children',
                    label: 'nodeName',
                },
                m_searchInput: {
                    contrName: '',
                    contrCode: '',
                    contrUrl: '',
                    funcId: '',
                    nodeType: '',
                },
                editDialog: {
                    show: false,
                    content: {
                        contrCode: '',
                        contrId: '',
                        contrName: '',
                        contrRemark: '',
                        contrUrl: '',
                        dataAuth: '',
                        funcId: '',
                        lastChgDt: '',
                        lastChgName: '',
                        methodType: '',
                    },
                    selectOptions: [
                        {
                            value: 'GET',
                            text: 'GET',
                        }, {
                            value: 'POST',
                            text: 'POST',
                        },

                    ],
                },
                checkDialog: {
                    show: false,
                    content: {
                        contrCode: '',
                        contrId: '',
                        contrName: '',
                        contrRemark: '',
                        contrUrl: '',
                        dataAuth: '',
                        funcId: '',
                        lastChgDt: '',
                        lastChgName: '',
                        methodType: '',
                    },
                    selectOptions: [
                        {
                            value: 'GET',
                            text: 'GET',
                        }, {
                            value: 'POST',
                            text: 'POST',
                        },

                    ],
                },
                addDialog: {
                    show: false,
                    content: {
                        moduleID: '',
                        contrCode: '',
                        contrId: '',
                        contrName: '',
                        contrRemark: '',
                        contrUrl: '',
                        dataAuth: '',
                        funcId: '',
                        lastChgDt: '',
                        lastChgName: '',
                        methodType: '',
                    },
                    selectOptions: [
                        {
                            value: 'GET',
                            text: 'GET',
                        }, {
                            value: 'POST',
                            text: 'POST',
                        },

                    ],
                },
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                },
                formLabelWidth: '120px',
                selectTreedata: {
                    moduleID: '',
                    contrCode: '',
                    contrId: '',
                    contrName: '',
                    contrRemark: '',
                    contrUrl: '',
                    dataAuth: '',
                    funcId: '',
                    lastChgDt: '',
                    lastChgName: '',
                    methodType: '',
                },
            }
        },
        //方法
        methods: {
            filterNode(value, data) {
                if (!value) return true
                return data.label.indexOf(value) !== -1
            },
            // 节点点击
            handleNodeClick(row) {
                if (row.funcId === '0') {
                    this.$alert('请选择模块子菜单', '提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
                        },
                    });
                    return
                }
                this.m_searchInput.funcId = row.nodeId;
                this.m_searchInput.nodeType = row.nodeType;
                this.$refs.table.refresh();
                if (row.upTreeId !== 0) {
                    this.selectTreedata.funcId = row.nodeId;
                    this.selectTreedata.methodType = row.nodeType
                }
            },
            // 清空搜索
            clear() {
                this.m_searchInput.contrName = null;
                this.m_searchInput.contrCode = null;
                this.m_searchInput.contrUrl = null;
                this.search()
            },
            // 搜索
            search() {
                this.$refs.table.refresh()
            },
            // 添加
            addControlPoint() {
                if (!(this.selectTreedata.funcId === '')) {
                    this.addDialog.show = true
                } else {
                    this.$alert('请选择模块', '提示', {
                        confirmButtonText: '确定',
                        callback: (action) => {
                        },
                    })
                }
            },
            // 添加控制点对话框确定
            addControlPointDialogConfirm() {
                let that = this
                // let data = {
                //     contrCode: that.addDialog.content.contrCode,
                //     contrName: that.addDialog.content.contrName,
                //     contrRemark: that.addDialog.content.contrRemark,
                //     contrUrl: that.addDialog.content.contrUrl,
                //     funcId: that.selectTreedata.funcId,
                //     methodType: that.addDialog.content.methodType,
                // }
                fox.service.request({
                    id: '1',
                    app: backend.oca,
                    path: 'api/adminsmrescontr/createcontr',
                    data: {
                        contrCode: that.addDialog.content.contrCode,
                        contrName: that.addDialog.content.contrName,
                        contrRemark: that.addDialog.content.contrRemark,
                        contrUrl: that.addDialog.content.contrUrl,
                        funcId: that.selectTreedata.funcId,
                        methodType: that.addDialog.content.methodType,
                        // contrId: '',
                        dataAuth: 'string',
                        lastChgDt: 'string',
                        lastChgName: 'string',
                    },
                    name: '控制点添加',
                    callback: function (code, message, data) {
                        if (code === 0) {
                            that.$message({
                                message: '添加成功',
                                type: 'success',
                            });
                            that.addDialog.show = false;
                            that.addDialog.content.contrCode = '';
                            that.addDialog.content.contrName = '';
                            that.addDialog.content.contrRemark = '';
                            that.addDialog.content.contrUrl = '';
                            that.selectTreedata.funcId = '';
                            that.addDialog.content.methodType = '';
                            that.$refs.table.refresh()
                        } else {
                            that.$message({
                                message: '添加成功',
                                type: 'error',
                            });
                            // fox.layer.open('后台异常，添加失败！异常信息：' + message)
                        }
                        that.addDialog.show = false;
                        // fox.custom.closePage(that);
                    },
                });
                this.search();
            },
            // 修改
            updateDialogConfirm() {
                let that = this;
                fox.service.request({
                    id: '2',
                    app: backend.oca,
                    path: 'api/adminsmrescontr/editcontr',
                    data: {
                        contrCode: that.editDialog.content.contrCode,
                        contrId: that.editDialog.content.contrId,
                        contrName: that.editDialog.content.contrName,
                        contrRemark: that.editDialog.content.contrRemark,
                        contrUrl: that.editDialog.content.contrUrl,
                        dataAuth: that.editDialog.content.dataAuth,
                        funcId: that.editDialog.content.funcId,
                        lastChgDt: that.editDialog.content.lastChgDt,
                        lastChgName: that.editDialog.content.lastChgName,
                        methodType: that.editDialog.content.methodType,
                    },
                    name: '树状图信息列表',
                    callback: function (code, message, data) {
                        if (code === 0) {
                            if (fox.type(data) === 'object') {
                                if (data.code === 0) {
                                    that.$message({
                                        message: '更新成功',
                                        type: 'success',
                                    });
                                }
                            }
                        } else {
                            that.$message({
                                message: '后台异常，异常信息：' + message,
                                type: 'success',
                            })
                        }
                        that.editDialog.show = false;
                        that.$refs.table.refresh();
                    },
                })
            },
            // 表格数据确认删除
            confirmDelete() {
                var that = this;
                cosnoel.log("confirmDelete");
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true,
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!',
                    });
                    // that.addDialog.show = false;
                    // that.$refs.table.refresh();
                    //
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                });
                that.$refs.table.refresh();
            },
            // 数据处理
            treeDataSort() {
                this.data.forEach((element, index) => {
                    console.log('element====' + element)
                    console.log('index====' + index)
                })
            },
            totreeTemp(list) {
                let data = JSON.parse(JSON.stringify(list));
                let result = [];
                if (!Array.isArray(data)) {
                    return result
                }
                data.forEach((item) => {
                    delete item.children
                });
                let map = {};
                data.forEach((item) => {
                    map[item.nodeId] = item
                });
                data.forEach((item) => {
                    let parent = map[item.upTreeId];
                    if (parent) {
                        (parent.children || (parent.children = [])).push(item)
                    } else if (item.upTreeId === '0') {
                        result.push(item)
                    } else {
                        // console.log("上级节点不存在");

                    }
                });
                return result
            },

            // 请求树状图信息列表
            queryTable() {
                let that = this;
                fox.service.request({
                    id: '1',
                    app: backend.oca,
                    path: 'api/adminsmrescontr/treequery',
                    name: '树状图信息列表',
                    callback: function (code, message, data) {
                        if (code === 0) {
                            if (fox.type(data) === 'object') {
                                if (data.code === 0) {
                                    let res = that.totreeTemp(data.list)
                                    that.data = res
                                }
                            }
                        } else {
                            // fox.layer.open("登录失败"+message);
                            that.$message.error('服务器返回信息错误，获取数据失败')
                        }
                    },
                })
            },
            //表格查看
            handleClickCheck(row) {
                this.checkDialog.show = true
                this.checkDialog.content.contrCode = row.contrCode
                this.checkDialog.content.contrId = row.contrId
                this.checkDialog.content.contrName = row.contrName
                this.checkDialog.content.contrRemark = row.contrRemark
                this.checkDialog.content.contrUrl = row.contrUrl
                this.checkDialog.content.dataAuth = row.dataAuth
                this.checkDialog.content.funcId = row.funcId
                this.checkDialog.content.lastChgDt = row.lastChgDt
                this.checkDialog.content.lastChgName = row.lastChgName
                this.checkDialog.content.methodType = row.methodType
            },
            //表格编辑
            handleClickEdit(row) {
                this.editDialog.show = true
                this.editDialog.content.contrCode = row.contrCode
                this.editDialog.content.contrId = row.contrId
                this.editDialog.content.contrName = row.contrName
                this.editDialog.content.contrRemark = row.contrRemark
                this.editDialog.content.contrUrl = row.contrUrl
                this.editDialog.content.dataAuth = row.dataAuth
                this.editDialog.content.funcId = row.funcId
                this.editDialog.content.lastChgDt = row.lastChgDt
                this.editDialog.content.lastChgName = row.lastChgName
                this.editDialog.content.methodType = row.methodType
            },
            //表格删除
            handleClickDelete(row) {
                let that = this;
                console.log("handleClickDelete");
                this.$confirm('确认删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true,
                }).then(() => {
                    fox.service.request({
                        id: '1',
                        app: backend.oca,
                        data: {"contrId": row.contrId},
                        path: `api/adminsmrescontr/deletecontr`,
                        name: '数据删除',
                        callback: function (code, message, data) {
                            console.log('数据删除' + fox.type(data));
                            if (code === 0) {
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                });
                                that.search();
                            } else {
                                // fox.layer.open("登录失败"+message);
                                that.$message.error('服务器返回信息错误，获取数据失败')
                            }
                            that.addDialog.show = false
                        },
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                });
            },

        },
        mounted() {
            this.search();
            this.queryTable();
        },
        fox_flow() {
            return {
                /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
                mounted(session, context) {
                    let that = this;
                    // 请求左侧树状父子级关系列表
                    context.insert((subContext) => {
                        fox.service.request({
                            id: '1',
                            app: backend.oca,
                            path: 'api/adminsmrescontr/treequery',
                            name: '树状图信息列表',
                            callback: function (code, message, data) {
                                if (code === 0) {
                                    // if(fox.type(data) === 'object'){
                                    //     console.log("code"+data.code);
                                    //     if(data.code === 0){
                                    that.treeData = that.totreeTemp(data);
                                    //         console.log(that.treeData);
                                    //         // this.queryTable();
                                    //         subContext.resolve();
                                    //     }
                                    // }
                                } else {
                                    that.$message.error('服务器返回信息错误，获取数据失败')
                                }
                            },
                        })
                    });
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
                    //触发check函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
                preSubmit(context, checkResult) {
                    console.info('pre submit流程')

                    //触发submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
                submit(context) {
                    console.info('submit流程')

                    //触发post submit函数调用(必须执行context.resolve或context.reject)
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

<style scoped>
    .box {
        display: flex;
        justify-content: space-around;
    }
    .border {
        height: 500px;
        overflow-y: auto;
    }
    .container {
        width: 75%;
        border: 1px solid #dddddd;
        border-radius: 8px;
    }

    /*.margin{*/
    /*    margin-left: 20px;*/
    /*}*/

</style>
