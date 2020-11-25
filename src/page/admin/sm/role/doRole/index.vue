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
                <fox-text-item v-if="isShow" disabled v-model="roleId">角色编号</fox-text-item>
                <fox-text-item require v-model="roleName">角色名称</fox-text-item>
                <fox-text-item require v-model="roleDescription" resize=none type='textarea' :rows="5">角色描述</fox-text-item>
                <fox-text-item disabled v-model="lastChgDt" label="最后修改日期" width=""></fox-text-item>
                <fox-text-item disabled v-model="lastChgUsr" label="最后修改柜员" width=""></fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'roleManageDoRole',
    // 数据
    data: function () {
        return {
            roleId: '',
            roleName: '',
            roleDescription: '',
            lastChgUsr: '',
            lastChgDt: '2020-02-02',
            isVoid: '1',
            status: '1',
            isShow: false
        }
    },
     mounted: function(){
        if (this.$route.params.btnType === 'update') {
            this.isShow = true
        }
    },
    // 方法
    methods: {
        submit() {
            // this.fox_submit();
            if (this.$route.params.btnType === 'add') {
                // fox.layer.message('adding')
                let that = this
                this.lastChgDt = new Date().toLocaleTimeString()
                this.lastChgUsr = 'kitty'
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmrole/create',
                    data: this.$data,
                }).then((response) => {
                    if (response.code === 0) {
                        let data
                        if (fox.type(response.data) === 'array') {
                            // that.dataTable = response.data
                            data = JSON.stringify(response.data)
                            console.log(response.data)
                        }
                        // 信息框
                        fox.layer.message(`成功`)
                    } else {
                        fox.layer.message(`失败:${response.message}`)
                    }
                    fox.custom.closePage(that)
                }, (error) => {
                    fox.layer.message(`请求异常:${error.message}`)
                    console.log(error.message)
                })
            } else if (this.$route.params.btnType === 'update') {
                // fox.layer.message('updating')
                let that = this
                this.updateDate = new Date().toLocaleDateString()
                this.updateTime = new Date().toLocaleTimeString()
                this.lastChgDt = new Date().toLocaleTimeString()
                fox.service.request({
                    app: backend.oca,
                    path: 'api/adminsmrole/update',
                    data: this.$data,
                }).then((response) => {
                    if (response.code === 0) {
                        let data
                        if (fox.type(response.data) === 'array') {
                            // that.dataTable = response.data
                            data = JSON.stringify(response.data)
                            console.log(response.data)
                        }
                        // 信息框
                        fox.layer.message(`成功`)
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
                 * 主要用来关页面
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
