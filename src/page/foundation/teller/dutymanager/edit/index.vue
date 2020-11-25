<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-footer-bar align="right">
            <fox-button @click="submit">提交</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group class="input-block" column="1">
                <fox-text-item disabled v-if="isShow" v-model="dutyId">岗位编号</fox-text-item>
                <fox-text-item require v-model="dutyName">岗位名称</fox-text-item>
                <fox-select-item require v-model="authLevel" source="@f07012.json">授权级别</fox-select-item>
                <fox-text-item require v-model="dutyDescription" type='textarea' :rows="5">岗位描述</fox-text-item>
                <fox-select-item require v-model="isVoid" source="@f07013.json">是否允许对接</fox-select-item>
                <fox-item label="所在位置">
                    <fox-check-group>
                        <fox-checkbox v-model="sysName" label="省联社"></fox-checkbox>
                        <fox-checkbox v-model="sysName" label="农商行/村镇银行总行"></fox-checkbox>
                        <fox-checkbox v-model="sysName" label="营业网点"></fox-checkbox>
                    </fox-check-group>
                </fox-item>

            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'dutyManageDoduty',
    // 数据
    data: function () {
        return {
            dutyId: '',
            dutyName: '',
            dutyDescription: '',
            authLevel: '',
            isVoid: '',
            isHandOver: '',
            applyScope: '',
            status: '',
            isShow: false,
            lastChgUsr: '',
            lastChgDt: ''
        }
    },
    mounted: function(){
        if (this.$route.params.btnType == 'update') {
            this.isShow = true
        }
    },
    // 方法
    methods: {
        submit() {
            if (this.$route.params.btnType == 'add') {
                fox.layer.message('adding')
                let that = this
                this.lastChgDt = new Date().toLocaleTimeString()
                this.lastChgUsr = 'Kelly'
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmduty/create',
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
                        // fox.layer.message(`成功:${data}`)
                        fox.layer.message(`成功`)
                    } else {
                        fox.layer.message(`失败:${response.message}`)
                    }
                    //关闭当前页面
                    fox.custom.closePage(that)
                }, (error) => {
                    fox.layer.message(`请求异常:${error.message}`)
                    console.log(error.message)
                })
            } else if (this.$route.params.btnType == 'update') {
                let that = this
                this.lastChgDt = new Date().toLocaleTimeString()
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmduty/update',
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
                        fox.layer.message(`成功`)
                    } else {
                        fox.layer.message(`失败:${response.message}`)
                    }
                    //关闭当前页面
                    fox.custom.closePage(that)
                    that.$route.go(0)
                }, (error) => {
                    fox.layer.message(`请求异常:${error.message}`)
                })
            }
        },
        cancel() {
            fox.custom.closePage(this)
            object.assign(this.$data, this.$options.data())
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
                // 触发duty submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
            dutySubmit(context) {
                console.info('duty submit流程')
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