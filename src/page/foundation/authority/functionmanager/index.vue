<template>
    <fox-page>
        <fox-content>
            <div class="content">
                <div class="left-box">
                    <fox-group class="input-block" title="模块管理" column="2">
                        <fox-text-item class="query_option" v-model="modSelectedParams.modCode">模块代码</fox-text-item>
                        <fox-item>
                            <fox-button plain @click="searchMod">查询</fox-button>
                            <fox-button plain @click="clearMod">清空查询条件</fox-button>
                        </fox-item>
                    </fox-group>
                    <fox-group no="2" style="width:100%;margin-top:0px">
                        <fox-table-item
                            ref="mod"
                            :content="modSelectedIndex"
                            page-index="1"
                            :page-sizes="[10, 50, 100, 200]"
                            :page-size="10"
                            highlight-current-row
                            :show-header="true"
                            @row-click="modRowClick"
                            :params="modSelectedParams"
                            style="margin-top:46px"
                        >
                            <fox-table-column prop="modCode" label="模块代码"></fox-table-column>
                            <fox-table-column prop="modName" label="模块名称"></fox-table-column>
                        </fox-table-item>
                    </fox-group>
                </div>
                <div class="right-box">
                    <fox-group class="input-block" title="业务功能管理" column="3">
                        <fox-text-item class="query_option" v-model="funcSelectedParams.funcName">功能名称</fox-text-item>
                        <fox-item>
                            <fox-button plain @click="searchFunc">查询</fox-button>
                            <fox-button plain @click="clearFunc">清空查询条件</fox-button>
                        </fox-item>
                    </fox-group>
                    <fox-group no="2" style="width: 100% ; margin-top: 0px">
                        <fox-button-group></fox-button-group>
                        <fox-button-group no="2">
                            <fox-button plain @click="routerIn('add','新增业务功能')" icon="el-icon-plus">添加</fox-button>
                        </fox-button-group>
                        <fox-table-item
                            ref="func"
                            :content="funcSelectedIndex"
                            page-index="1"
                            :page-sizes="[10, 50, 100, 200]"
                            :page-size="10"
                            highlight-current-row
                            :show-header="true"
                            :params="funcSelectedParams"
                            style="margin-top:10px"
                        >
                            <fox-table-column prop="funcName" label="功能名称"></fox-table-column>
                            <fox-table-column prop="funcUrl" label="功能路由"></fox-table-column>
                            <fox-table-column prop="funcDesc" label="功能描述"></fox-table-column>
                            <fox-table-column label="操作">
                                <template slot-scope="scope">
                                    <fox-button @click="routerIn('show','查看业务功能',scope.row)" icon="el-icon-info" size="mini"></fox-button>
                                    <fox-button @click="routerIn('update','修改业务功能',scope.row)" icon="el-icon-edit" size="mini"></fox-button>
                                    <fox-button @click="removeFunc(scope.row)" icon="el-icon-delete" size="mini"></fox-button>
                                </template>
                            </fox-table-column>
                        </fox-table-item>
                    </fox-group>
                </div>
            </div>
        </fox-content>
    </fox-page>
</template>
<script>
export default {
    name: "manage",
    data() {
        return {
            /**
             * @Description : 模块代码查询条件
             */
            modSelectedParams: {
                modCode: "",
            },
            /**
             * @Description :  当前选中模块信息对象
             */
            modSelectedRow: {},
            /**
             * @Description : 模块分页查询
             */
            modSelectedIndex:
                "/" + backend.oca + "/api/adminsmfuncmod/querymod",

            /**
             * @Description :  根据当前选中的模块查询当前模块所有功能
             */
            funcSelectedParams: {
                modId: "",
                funcName: "",
            },
            /**
             * @Description : 当前模块下功能查询
             */
            funcSelectedIndex:
                "/" + backend.oca + "/api/adminsmbusifunc/queryfunc",
        };
    },
    mounted() {
        this.searchMod();
    },
    methods: {
        /**
         * @Description : 模块分页查询INDEX
         * @Author : Mr_Jiang
         * @Date : 2020-09-21 17:22:41
         */
        searchMod() {
            this.$refs.mod.refresh();
            this.$refs.func.reset();
        },
        /**
         * @Description : 清理模块查询的条件
         * @Author : Mr_Jiang
         * @Date : 2020-09-21 17:23:17
         */
        clearMod() {
            this.modSelectedParams.modCode = "";
            this.$refs.mod.refresh();
            this.$refs.func.reset();
        },
        /**
         * @Description : 选中某个模块,并查询当前模块下所有功能
         * @Author : Mr_Jiang
         * @Date : 2020-09-21 17:36:12
         */
        modRowClick(row, column, event) {
            this.funcSelectedParams.modId = row.modId;
            fox.extend(true, this.modSelectedRow, row);
            this.$refs.func.refresh();
        },
        /**
         * @Description : 根据传入的条件查询当前模块下的功能信息
         * @Author : Mr_Jiang
         * @Date : 2020-09-21 17:37:53
         */
        searchFunc() {
            if(this.$refs.mod.currentRow !== undefined){
                let selectedRowId = this.$refs.mod.currentRow.modId;
                if (!selectedRowId) {
                    this.$message({
                        message: "请先选择一个模块,再执行此操作!",
                        type: "warning",
                    });
                    return;
                }
                this.funcSelectedParams.modId = selectedRowId;
                this.$refs.func.refresh();
            }
        },
        /**
         * @Description : 业务功能删除方法
         * @param tag : 进入路由的标志
         * @param title : 子页面的标题
         * @param row : 表格当前选中行
         * @Author : Mr_Jiang
         * @Date : 2020-09-22 10:00:25
         */
        routerIn(tag, title, row) {
            let params = {
                operationType: tag,
            };
            let currentRow = {};
            fox.custom.appendPage(
                this,
                "/foundation/authority/functionmanager/edit",
                {
                    title: title,
                    width: "40%",
                },
                params,
                row
                    ? {
                          funcForm: fox.extend(true, currentRow, row),
                          modSelectedRow: this.$data.modSelectedRow,
                      }
                    : {
                          modSelectedRow: this.$data.modSelectedRow,
                      },
                {},
                this.searchFunc
            );
        },
        /**
         * @Description : 删除当前选中的业务功能
         * @param currentRow : 当前选中的
         * @Author : Mr_Jiang
         * @Date : 2020-09-22 10:07:28
         */
        removeFunc(currentRow) {
            this.$confirm("此操作将永久删除该条记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    fox.service
                        .request({
                            app: backend.oca,
                            path: "api/adminsmbusifunc/deletefunc",
                            data: {
                                funcId: currentRow.funcId,
                            },
                        })
                        .then(
                            (response) => {
                                if (response.code === 0) {
                                    this.$message({
                                        type: "success",
                                        message: "业务功能删除成功!",
                                    });
                                    this.searchFunc();
                                } else {
                                    this.$message({
                                        type: "error",
                                        message: response.message,
                                    });
                                }
                            },
                            (error) => {
                                this.$message({
                                    type: "error",
                                    message: "服务请求异常: " + error.message,
                                });
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
        /**
         * @Description : 重置业务功能查询条件
         * @Author : Mr_Jiang
         * @Date : 2020-09-22 14:13:19
         */
        clearFunc() {
            this.funcSelectedParams.modId = this.$refs.mod.currentRow.modId;
            this.funcSelectedParams.funcName = "";
            this.$refs.func.refresh();
        },
    },
};
</script>
<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0px;
    .left-box {
        width: 40%;
        min-width: 400px;
    }
    .right-box {
        margin-left: 15px;
        min-width: 600px;
        width: 70%;
        .icon {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
    }
}
</style>