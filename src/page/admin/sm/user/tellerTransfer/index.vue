<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-footer-bar align="right">
            <fox-button @click="submit">确认</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group column="2">
                <fox-text-item disabled v-model="userId">柜员代号</fox-text-item>
                <!-- <fox-select-item  v-model="virtualType" source="@f07004.json">虚拟柜员类型</fox-select-item> -->
                <fox-text-item disabled v-model="userName">柜员姓名</fox-text-item>
                <!-- <fox-select-item disabled v-model="loginType" source="@f07005.json">登录方式</fox-select-item> -->
                <fox-select-item  v-model="orgId" source="@f07006.json">归属机构</fox-select-item>
                <fox-select-item disabled v-model="userSts" source="@f07001.json">状态</fox-select-item>
                <fox-text-item disabled v-model="cretNo">身份证号</fox-text-item>
                <!-- <fox-select-item require span="2" v-model="tansferOrg" source="@f07006.json">调动机构</fox-select-item> -->
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'TellerManagerTransfer',
    // 数据
    data: function () {
        return {
            userId: '',
            userName: '',
            // loginType: '',
            orgId: '',
            userSts: '',
            cretNo: '',
        }
    },
    // 方法
    methods: {
        submit() {
            let that = this
            this.entrantsDate = new Date().toLocaleDateString()
            console.log("hsdfhsdooshsduo||"+this.orgId)
            fox.service.request({
                app: backend.oca,
                path: 'api/adminsmuserdutymapping/updateUserOrg',
                data: {"userId":this.$data.userId,"orgId":this.$data.orgId},
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
        },
        cancel() {
            fox.custom.closePage(this)
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
            mounted(session, context){
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
            onMessage(type, data){

            },

            /**
                 * 设置检查条件
                 * @param context
                 */
            setCheckConditions(context){
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
            preSubmit(context, checkResult){
                console.info('pre submit流程')
                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
            submit(context){
                console.info('submit流程: name:' + this.$options.name)
                // 触发post submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
            postSubmit(context){
                console.info('post submit流程')
            },

            /**
                 * 提交取消处理
                 * @param context
                 * @param args
                 */
            cancelSubmit(context, error){
                console.info(JSON.stringify(error))
            },
        }
    },
}
</script>

<style scoped>
</style>