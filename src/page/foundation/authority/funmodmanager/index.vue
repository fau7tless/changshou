<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--footer bar必须在fox-content的面-->
        <!--page内容区域-->
        <fox-content>
            <fox-group class="input-block" title="查询条件" column="4">
                <fox-text-item class="query_option" v-model="searchParams.modCode">模块代码</fox-text-item>
                <fox-text-item class="query_option" v-model="searchParams.modName">模块名称</fox-text-item>
                <fox-select-item source="@f07013.json" v-model="searchParams.isApp">是否APP功能</fox-select-item>
                <fox-item>
                    <fox-button plain @click="query">查询</fox-button>
                    <fox-button plain @click="clear">清空查询条件</fox-button>
                </fox-item>
            </fox-group>
            <fox-group no="2" style="width:100%;margin-top:0px">
                <fox-button-group></fox-button-group>
                <fox-button-group no="2">
                    <fox-button plain @click="add" icon="el-icon-plus">新增</fox-button>
                    <!-- <fox-button plain @click="update" icon="el-icon-edit">修改</fox-button>
                    <fox-button plain @click="del" icon="el-icon-delete">删除</fox-button>-->
                </fox-button-group>
                <fox-table-item
                    ref="table"
                    :content="dataurl"
                    page-index="1"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="10"
                    highlight-current-row
                    :show-header="true"
                    @row-click="rowClick"
                    :params="searchParams"
                    style="margin-top:10px"
                >
                    <fox-table-column prop="modCode" label="模块代码"></fox-table-column>
                    <fox-table-column prop="modName" label="模块名称"></fox-table-column>
                    <fox-table-column prop="isApp" :formatter="format" label="是否APP功能"></fox-table-column>
                    <fox-table-column prop="lastChgName" label="最新变更用户"></fox-table-column>
                    <fox-table-column prop="lastChgDt" label="最新变更时间"></fox-table-column>
                    <fox-table-column label="操作">
                        <!-- <div class="icon" slot-scope="scope">
                            <i class="el-icon-info" @click="show(scope.row)"></i>
                            <i class="el-icon-edit" @click="update(scope.row)"></i>
                            <i class="el-icon-delete-solid" @click="remove(scope.row)"></i>
                        </div>-->
                        <template slot-scope="scope">
                            <fox-button @click="show(scope.row)" icon="el-icon-info" size="mini"></fox-button>
                            <fox-button @click="update(scope.row)" icon="el-icon-edit" size="mini"></fox-button>
                            <fox-button @click="remove(scope.row)" icon="el-icon-delete" size="mini"></fox-button>
                        </template>
                    </fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: "business",
    // 数据
    data: function () {
        return {
            searchParams: {
                isApp: "",
                modName: "",
                modCode: "",
            },
            dataurl: "/" + backend.oca + "/api/adminsmfuncmod/querymod",
            row: {},
            // tabList: [], // 数据源
            // options: [
            //     {
            //         value: '001',
            //         text: '是',
            //     }, {
            //         value: '002',
            //         text: '否',
            //     },
            // ],
        };
    },
    // 方法
    methods: {
        format(row, column) {
            let map = {
                isApp: "ftest003.json",
            };
            let { property } = column;
            return fox.custom.mapping(this, map[property], row[property]);
        },
        rowClick(row) {
            fox.extend(true, this.row, row);
            // this.row = row
        },
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        query() {
            this.$refs.table.refresh();
        },
        clear() {
            // 清空所有搜索条件
            this.searchParams.modCode = "";
            this.searchParams.modName = "";
            this.searchParams.isApp = "";
            this.query();
        },
        add() {
            let params = {
                btnType: "add",
            };
            fox.custom.appendPage(
                this,
                "/foundation/authority/funmodmanager/edit",
                {
                    title:'新增',
                    width: '40%'
                },
                params,
                this.$data,
                {},
                this.query
            );
            // 新增数据
            // fox.service.request({
            //     id: '2',
            //     app: backend.oca,
            //     path: '/api/adminsmfuncmod/createmod',
            //     data: {
            //         isApp: this.value3 === '001' ? 'Y' : 'N',
            //         modCde: this.value2,
            //         modName: this.value4,
            //         isOuter: '',
            //         lastChgDt: '',
            //         lastChgUsr: '',
            //         modDesc: '',
            //         modId: '',
            //         password: '',
            //         pwdKey: '',
            //         userKey: '',
            //         userName: '',
            //         dataAuth: '',
            //     },
            //     name: '新增模块',
            //     callback: (code, message, data) => {
            //         if (code === 0) {
            //             if (fox.type(data) == 'object') {
            //                 this.$message({
            //                     message: '新增成功',
            //                     type: 'success',
            //                 })
            //                 this.$refs.table.refresh()
            //                 this.value2 = ''
            //                 this.value3 = ''
            //                 this.value4 = ''
            //                 this.dialogVisible = false
            //             }
            //         } else {
            //             fox.layer.open(`后台异常${message}`)
            //         }
            //     },
            // })
        },
        update(data) {
            fox.extend(true, this.row, data);
            let params = {
                btnType: "update",
            };
            fox.custom.appendPage(
                this,
                "/foundation/authority/funmodmanager/edit",
                {
                    title:'修改',
                    width: '40%'
                },
                params,
                this.$data.row,
                {},
                this.query
            );
        },
        remove(data) {
            fox.extend(true, this.row, data);
            this.$confirm("此操作将永久删除该项, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    fox.service
                        .request({
                            app: backend.oca,
                            path: "api/adminsmfuncmod/deletemod",
                            data: { modId: this.row.modId },
                        })
                        .then(
                            (response) => {
                                console.log(response.code);
                                if (response.code === 0) {
                                    this.$message({
                                        type: "success",
                                        message: "删除成功!",
                                    });
                                    // 信息框
                                    //  fox.layer.open(`删除成功！`)
                                } else {
                                    fox.layer.open(`失败:${response.message}`);
                                }
                                this.query();
                            },
                            (error) => {
                                fox.layer.open(`请求异常:${error.message}`);
                            }
                        );
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
        show(data) {
            fox.extend(true, this.row, data);
            let params = {
                btnType: "show",
            };
            fox.custom.appendPage(
                this,
                "/foundation/authority/funmodmanager/edit",
                {
                    title:'详细信息',
                    width: '40%'
                },
                params,
                this.$data.row,
                {},
                this.query
            );
        },
    },
    // 加载后处理
    mounted() {
        this.query();
    },
};
</script>

<style scoped lang="scss">
// .right-button {
//     width: 200px;
//     float: right;
// }

// .input-left {
//     width: calc(100% - 240px);
//     float: left;
// }

// .my-group > .has-gutter {
//     color: #000000;
// }

// .icon {
//     display: flex;
//     flex-wrap: nowrap;

//     i {
//         margin-right: 15px;
//     }
// }
</style>
