<template>
    <!-- 编辑弹出层 -->
    <fox-page>
        <fox-footer-bar align="right">
            <fox-button v-if="!disbool" @click="submit">提交</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <!--<fox-dialog title="新增" :visible.sync="changeDialogVisible" width="60%" :before-close="editClose">-->
            <fox-group no="3" class="my-group" label-width="120px" column="1" style="width:100%">
                <!--:filter-events="filterEvents">-->
                <fox-text-item require v-if="isShow" disabled placeholder="请输入内容" v-model="modId">编号</fox-text-item>
                <fox-text-item require placeholder="请输入内容" :disabled="(isShow || disbool)" v-model="modCode">模块代码</fox-text-item>
                <fox-text-item require placeholder="请输入内容" :disabled="disbool" v-model="modName">模块名称</fox-text-item>
                <fox-select-item require :disabled="disbool" source="@f07013.json" v-model="isApp">是否APP功能</fox-select-item>
                <fox-select-item require :disabled="disbool" source="@f07013.json" v-model="isOuter">是否外部系统</fox-select-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: "/foundation/authority/funmodmanager/edit",
    data: function () {
        return {
            // filterEvents: {
            //     focus: false,
            //     blur: false,
            // },
            disbool: false,
            modId: "",
            modCode: "",
            modName: "",
            isApp: "",
            isOuter: "",
            lastChgName: "",
            lastChgUser: "",
            lastChgDt: "",
            isShow: true,
        };
    },
    mounted() {
        if (this.$route.params.btnType === "add") {
            this.isShow = false;
        }
        if (this.$route.params.btnType === "show") {
            this.disbool = true;
        } else {
            this.disbool = false;
        }
    },
    methods: {
        submit() {
            if (this.$route.params.btnType === "add") {
                fox.layer.message("adding");
                let that = this;
                this.lastChgDt = new Date().toLocaleTimeString();
                this.lastChgName = "Lucy";
                this.lastChgUsr = "Kelly";
                fox.service
                    .request({
                        app: backend.oca,
                        path: "api/adminsmfuncmod/createmod",
                        data: this.$data,
                    })
                    .then(
                        (response) => {
                            if (response.code === 0) {
                                let data;
                                if (fox.type(response.data) === "array") {
                                    // that.dataTable = response.data
                                    data = JSON.stringify(response.data);
                                    console.log(response.data);
                                }
                                // 信息框
                                // fox.layer.message(`成功:${data}`)
                                fox.layer.message(`成功`);
                            } else {
                                fox.layer.message(`失败:${response.message}`);
                            }
                            //关闭当前页面
                            fox.custom.closePage(that);
                        },
                        (error) => {
                            fox.layer.message(`请求异常:${error.message}`);
                            console.log(error.message);
                        }
                    );
            } else if (this.$route.params.btnType === "update") {
                let that = this;
                this.lastChgDt = new Date().toLocaleTimeString();
                fox.service
                    .request({
                        app: backend.oca,
                        path: "api/adminsmfuncmod/editmod",
                        data: this.$data,
                    })
                    .then(
                        (response) => {
                            if (response.code === 0) {
                                let data;
                                if (fox.type(response.data) === "array") {
                                    // that.dataTable = response.data
                                    data = JSON.stringify(response.data);
                                    console.log(response.data);
                                }
                                // 信息框
                                fox.layer.message(`成功`);
                            } else {
                                fox.layer.message(`失败:${response.message}`);
                            }
                            //关闭当前页面
                            fox.custom.closePage(that);
                            // that.$route.go(0)
                        },
                        (error) => {
                            fox.layer.message(`请求异常:${error.message}`);
                        }
                    );
            }
        },
        cancel() {
            fox.custom.closePage(this);
            object.assign(this.$data, this.$options.data());
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

<style scoped>
</style>
