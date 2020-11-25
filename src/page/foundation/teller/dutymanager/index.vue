<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-content>
            <fox-group class="input-block" title="查询条件" column="4">
                <fox-text-item v-model="search.dutyId" style="width: 350px">岗位编号</fox-text-item>
                <fox-text-item v-model="search.dutyName" style="margin-left:-50px;width: 350px">岗位名称</fox-text-item>
                <fox-select-item v-model="search.authLevel" style="margin-left:-50px;width: 350px" source="@f07012.json">授权级别</fox-select-item>
                <!--<fox-empty-item></fox-empty-item>-->
                <fox-item>
                    <fox-button plain @click="query">查询</fox-button>
                    <fox-button plain @click="clean">清空查询条件</fox-button>
                </fox-item>
            </fox-group>
            <fox-group no="2" column="2" class="btn_line" style="margin-top:-13px">
                <fox-button plain @click="SetRoles">设置映射角色</fox-button>
                <fox-item align="right" >
                    <fox-button plain @click="add" icon="el-icon-plus">新增</fox-button>
                    <fox-button plain @click="update" icon="el-icon-edit">修改</fox-button>
                    <fox-button plain @click="del" icon="el-icon-delete">删除</fox-button>
                </fox-item>
            </fox-group>
            <fox-table-item
                    ref="list"
                    :content="data_url"
                    :params="search"
                    @row-click="rowClick"
                    highlight-current-row
                    style="margin-top: -10px"
                    page-index="1"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="10" border>
                <fox-table-column prop="dutyId" label="岗位编号" width=""></fox-table-column>
                <fox-table-column prop="dutyName" label="岗位名称" width=""></fox-table-column>
                <fox-table-column :level="level" prop="authLevel" label="授权级别" width=""></fox-table-column>
                <fox-table-column prop="isVoid" :formatter="format" label="是否可交接" width=""></fox-table-column>
                <fox-table-column prop="lastChgDt" label="最后修改日期" width=""></fox-table-column>
                <fox-table-column prop="lastChgUsr" label="最后修改柜员" width=""></fox-table-column>
            </fox-table-item>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: 'postManage',
        // 数据
        data: function () {
            return {
                search: {
                    dutyId: null,
                    dutyName: null,
                    authLevel: null
                },
                data_url: '/' + backend.oca + '/api/adminsmduty/index',
                dataTable: [],
                rowMap: [],
                row: '',
                level: '',
                // base参数
                baseParams: {
                    name: 'base_table',
                },
                // 参数
                // params: {
                //     name: '',
                //     date: 0,
                // },
            }
        },
        computed: {
            // level: function(){
            //     if(this.$data.authLevel === '1'){
            //         this.level = '是'
            //     }else{
            //         this.level = '否'
            //     }
            // }
        },
        // 方法
        methods: {
            format(row, column) {
                let map = {
                    isVoid: 'ftest003.json',
                }
                let {property} = column
                return fox.custom.mapping(this, map[property], row[property])
            },
            rowClick(row) {
                this.row = row
            },
            query() {
                let that = this;
                that.$refs.list.refresh();
                // let that = this
                // let search = this.$data.search
                // fox.service.request({
                //     app: backend.oca,
                //     path: 'api/adminsmduty/index',
                //     data: ((search.dutyId === null && search.dutyName === null && search.authLevel === null)? null : search)
                // }).then((response) => {
                //     console.log(this.$data.search);
                //     if (response.code === 0) {
                //         let data
                //         if (fox.type(response.data) === 'array') {
                //             that.dataTable = response.data
                //             data = JSON.stringify(response.data)
                //             // console.log(response.data)
                //         }
                //     } else {
                //         fox.layer.open(`失败:${response.message}`)
                //     }
                // }, (error) => {
                //     fox.layer.open(`请求异常:${error.message}`)
                // })
            },
            SetRoles() {
                if (this.row === '' || this.row === null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    fox.custom.appendPage(this, '/foundation/teller/dutymanager/dutyrolemap', '设置映射角色', {}, this.$data.row)
                }
            },
            add() {
                let params = {
                    btnType: 'add',
                }
                fox.custom.appendPage(this, '/foundation/teller/dutymanager/edit', '新增', params, this.$data, {}, this.query)
            },
            update() {
                if (this.row === '' || this.row === null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    let params = {
                        btnType: 'update',
                    }

                    if (this.$data.row.isVoid === '是') {
                        this.$data.row.isVoid = '1'
                    } else if (this.$data.row.isVoid === '否') {
                        this.$data.row.isVoid = '0'
                    }
                    console.log(this.$data.row.isVoid);
                    fox.custom.appendPage(this, '/foundation/teller/dutymanager/edit', '修改', params, this.$data.row, {}, this.query)
                }
            },
            del() {
                if (this.row === '' || this.row === null) {
                    this.$alert('必须先选中一条数据')
                } else {
                    this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    })
                        .then(() => {
                            fox.service.request({
                                app: backend.oca,
                                path: 'api/adminsmduty/delete',
                                data: this.$data.row,
                            })
                                .then((response) => {
                                    console.log(this.$data.search);
                                    if (response.code === 0) {
                                        this.$message({
                                            type: "success",
                                            message: "删除成功!"
                                        });
                                        // 信息框
                                        //  fox.layer.open(`删除成功！`)
                                    } else {
                                        fox.layer.open(`失败:${response.message}`)
                                    }
                                    this.query()
                                }, (error) => {
                                    fox.layer.open(`请求异常:${error.message}`)
                                })
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "已取消删除"
                            });
                        });
                }
            },
            cancel() {
                fox.custom.closePage(this)
            },
            clean() {
                this.search.dutyId = null;
                this.search.dutyName = null;
                this.search.authLevel = null;
            }
        },
        mounted: function () {
            this.query()
        },
        // fox流程
        fox_flow() {
            return {
                /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
                mounted(session, context) {
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
                    console.primary('pre submit流程')
                    // 触发submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
                submit(context) {
                    console.primary('submit流程: name:' + this.$options.name)
                    // 触发duty submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
                dutySubmit(context) {
                    console.primary('duty submit流程')
                },

                /**
                 * 提交取消处理
                 * @param context
                 * @param args
                 */
                cancelSubmit(context, error) {
                    console.primary(JSON.stringify(error))
                },
            }
        },
    }
</script>

<style scoped>
    .btn_line {
        margin-top: -20px;
        width: 100%;
    }
</style>
