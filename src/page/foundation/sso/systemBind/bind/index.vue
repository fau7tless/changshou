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
                <fox-select-item span="2" require v-model="system">外部系统</fox-select-item>
                <fox-text-item require v-model="tellerid">绑定柜员</fox-text-item>
                <fox-text-item require v-model="tellerName"></fox-text-item>
                <fox-text-item span="2" require v-model="loginUser">外部系统用户名</fox-text-item>
                <fox-text-item span="2" require v-model="loginOrg">外部系统机构号</fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'systemBindBind',
    // 数据
    data: function () {
        return {
            system: '',
            tellerid: '',
            tellerName: '',
            loginUser: '',
            loginOrg: '',
        }
    },
    // 方法
    methods: {
        submit() {
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>