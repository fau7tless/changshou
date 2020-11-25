<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-footer-bar align="right">
            <fox-button @click="submit">提交</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group column="2">
                <!-- <fox-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="100" ></fox-avatar> -->
                <fox-text-item v-model="userId">柜员代号</fox-text-item>
                <fox-text-item require v-model="userName">柜员姓名</fox-text-item>
                <fox-select-item span="2" source="@f07006.json" require v-model="orgId" >归属机构</fox-select-item>
                <fox-select-item require v-model="dptId" source="@f07003.json">归属部门</fox-select-item>
                <fox-text-item require v-model="userPassword" show-password>登录密码</fox-text-item>
                <fox-select-item require v-model="userSts" source="@f07014.json">柜员状态</fox-select-item>
                <fox-select-item require :disabled="tellerType==2" v-model="tellerLoginType" source="@f07005.json">登录方式</fox-select-item>
                <!-- <fox-text-item require v-model="identityNO">识别号</fox-text-item> -->
                <fox-text-item :disabled="tellerType==2" v-model="userMobilePhone">手机号码</fox-text-item>
                <fox-text-item require v-model="authId" >身份证号</fox-text-item>
                <!-- <fox-date-item :v-model="createDate" disabled>创建日期</fox-date-item>
                <fox-time-item :v-model="createTime" disabled>创建时间</fox-time-item> -->
                <fox-date-item v-model="entrantsDate" disabled>创建时间</fox-date-item>
                <fox-time-item v-if="chgShow" v-model="lastChgDt" disabled>更新时间</fox-time-item>
                <fox-time-item v-if="chgShow" v-model="lastChgUser" disabled>操作柜员</fox-time-item>
                <fox-date-item v-model="deadline" >有效期至</fox-date-item>

            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'tellerManageDotellerInfo',
    // 数据
    data: function () {
        return {
            tellerType: '',
            userId: '',
            userName: '',
            dptId: '',
            orgId: '0',
            userSts: '1',
            userPassword: '',
            tellerLoginType: '',
            userMobilePhone: '',
            loginStatus: '1',
            authId: '',
            // identityNO: '',
            entrantsDate: '',
            // createTime: '',
            lastChgDt: '',
            lastChgUser: 'Cachy',
            deadline: new Date(),
            chgShow: false
            // updateTime: '',
            // isVoid: '0',

        }
    },
    mounted(){
        if (this.$route.params.btnType == 'update') {
        //     this.entrantsDate = new Date();
            this.chgShow = true;
        }
    },
    // 方法
    methods: {
        submit() {
            if (this.$route.params.btnType == 'add') {
                let that = this
                this.entrantsDate = new Date().toLocaleDateString()
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmuser/create',
                    data: this.$data,
                }).then((response) => {
                    if (response.code == 0) {
                        let data
                        if (fox.type(response.data) == 'array') {
                            // that.dataTable = response.data
                            data = JSON.stringify(response.data)
                            console.log(response.data)
                        }
                        // 信息框
                        fox.layer.message(`成功!`)
                    } else {
                        fox.layer.message(`失败:${response.message}`)
                    }
                    fox.custom.closePage(that)
                }, (error) => {
                    fox.layer.message(`请求异常:${error.message}`)
                    console.log(error.message)
                })
            } else if (this.$route.params.btnType == 'update') {
                // fox.layer.message('updating')
                let that = this
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmuser/update',
                    data: this.$data,
                }).then((response) => {
                    if (response.code == 0) {
                        let data
                        if (fox.type(response.data) == 'array') {
                            // that.dataTable = response.data
                            data = JSON.stringify(response.data)
                            console.log(response.data)
                        }
                        // 信息框
                        fox.layer.message(`成功!`)
                    } else {
                        fox.layer.message(`失败:${response.message}`)
                    }
                    fox.custom.closePage(that)
                }, (error) => {
                    fox.layer.message(`请求异常:${error.message}`)
                })
            }
        },
        cancel() {
            fox.custom.closePage(this)
            Object.assign(this.$data, this.$options.data())
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
                console.info('submit流程: name:' + this.$options.name)
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

<style scoped>
</style>