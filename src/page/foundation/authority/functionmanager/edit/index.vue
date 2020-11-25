<template>
    <!-- 编辑弹出层 -->
    <fox-page>
        <fox-footer-bar align="right">
            <fox-button v-if="!(operationType==='show')" @click="submit">提交</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group class="my-group" label-width="100px" column="1" style="width:100%">
                <fox-text-item :disabled="operationType==='show'" v-model="funcForm.funcId" v-show="false">功能编号</fox-text-item>
                <fox-text-item :disabled="operationType==='show'" v-model="funcForm.funcName" placeholder="请输入功能名称" v-verify="'require'">功能名称</fox-text-item>
                <fox-select-item disabled="true" v-model="funcForm.modId" v-verify="'require'" :source="modSource">模块名称</fox-select-item>
                <fox-text-item :disabled="operationType==='show'" v-model="funcForm.funcUrl" placeholder="请输入功能路由,例如:page/.." v-verify="'require'">功能路由</fox-text-item>
                <fox-text-item :disabled="operationType==='show'" v-model="funcForm.funcDesc" placeholder="请输入功能描述" type="textarea" :rows="3">功能描述</fox-text-item>
                <fox-text-item :disabled="operationType==='show'" v-model="funcForm.funcOrder" placeholder="请输入功能排序" type="number">功能排序</fox-text-item>
                <!-- <fox-text-item :disabled="operationType==='show'" v-if="operationType==='show'" v-model="funcForm.lastChgName">最后修改用户</fox-text-item> -->
                <fox-text-item :disabled="operationType==='show'" v-if="operationType==='show'" v-model="funcForm.lastChgDt">最后修改时间</fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: "FunctionManagerEdit",
    data: function () {
        return {
            /**
             * @Description :  业务功能表单信息
             */
            funcForm: {
                funcId: "", //功能编号
                modId: "", //模块编号
                funcName: "", //功能名称
                funcUrl: "", //功能路由
                funcDesc: "", //功能描述
                funcOrder: "", //功能排序
                lastChgName: "", //最后修改用户
                lastChgDt: "", //最后修改时间
            },
            /**
             * @Description :  父页面传入的操作类型
             */
            operationType: "",
            /**
             * @Description : 当前选中模块数据字典
             */
            modSource: [],
        };
    },
    mounted() {
        /**
         * @Description :  将父页面传入的操作类型赋值给operationType字段
         */
        this.operationType = this.$route.params.operationType;
        /**
         * @Description :  获取父节点中选中的模块,并解析成数据字典
         */
        let selectModRow = fox.custom.getSyncData(this).modSelectedRow;
        let item = {
            value: selectModRow.modId ? selectModRow.modId : '',
            text: selectModRow.modName ? selectModRow.modName: '',
        };
        this.modSource.push(item);
        this.funcForm.modId = selectModRow.modId ? selectModRow.modId : '';
        console.log(this.modSource);
    },
    methods: {
        submit() {
            let _this = this;
            let reqData = {};
            fox.extend(true, reqData, _this.$data.funcForm, {
                modId: this.$route.params.modId,
            });
            if (_this.operationType === "add") {
                fox.service
                    .request({
                        app: backend.oca,
                        path: "api/adminsmbusifunc/createfunc",
                        data: reqData,
                    })
                    .then(
                        (response) => {
                            if (response.code === 0) {
                                _this.$message({
                                    type: "success",
                                    message: "业务功能新增成功!",
                                });
                                fox.custom.closePage(_this);
                            } else {
                                _this.$message({
                                    type: "error",
                                    message: response.message,
                                });
                            }
                        },
                        (error) => {
                            _this.$message({
                                type: "error",
                                message: "服务请求异常: " + error.message,
                            });
                        }
                    );
            } else if (this.operationType === "update") {
                fox.service
                    .request({
                        app: backend.oca,
                        path: "api/adminsmbusifunc/editfunc",
                        data: reqData,
                    })
                    .then(
                        (response) => {
                            if (response.code === 0) {
                                _this.$message({
                                    type: "success",
                                    message: "业务功能更新成功!",
                                });
                                fox.custom.closePage(_this);
                            } else {
                                _this.$message({
                                    type: "error",
                                    message: response.message,
                                });
                            }
                        },
                        (error) => {
                            _this.$message({
                                type: "error",
                                message: "服务请求异常: " + error.message,
                            });
                        }
                    );
            }
        },
        cancel() {
            console.log("cancel");
            fox.custom.closePage(this);
        },
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
                context.resolve();
            },

            /**
             * 销毁处理
             */
            beforeDestroy(session) {},

            /**
             * 消息
             * @param type
             * @param data
             */
            onMessage(type, data) {},

            /**
             * 设置检查条件
             * @param context
             */
            setCheckConditions(context) {
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve();
            },

            /**
             * 提交前处理
             * @param context
             * @param checkResult
             */
            preSubmit(context, checkResult) {
                console.info("pre submit流程");
                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve();
            },

            /**
             * 提交处理
             * @param context
             * @param args
             */
            submit(context) {
                console.info("submit流程: name:" + this.$options.name);
                // 触发duty submit函数调用(必须执行context.resolve或context.reject)
                context.resolve();
            },

            /**
             * 提交后处理
             * @param context
             * @param params
             */
            dutySubmit(context) {
                console.info("duty submit流程");
            },

            /**
             * 提交取消处理
             * @param context
             * @param args
             */
            cancelSubmit(context, error) {
                console.info(JSON.stringify(error));
            },
        };
    },
};
</script>