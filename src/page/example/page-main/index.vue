<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" title="基本信息"  label-width="80px" column="2">
                <fox-text-item v-model="name">姓名</fox-text-item>
                <fox-text-item v-model="age" type="number">年龄</fox-text-item>
                <fox-select-item v-model="sex" source="@sex.json">性别</fox-select-item>
                <fox-date-item v-model="birthday">出生日期</fox-date-item>
            </fox-group>
            <fox-group fox-group no="2" title="职业信息"  label-width="80px" column="2">
                <fox-text-item v-model="employedCompany">就职公司</fox-text-item>
                <fox-text-item v-model="position">就职岗位</fox-text-item>
            </fox-group>
            <fox-group>
                <fox-button-row align="center"> <!--align：left、center、right-->
                    <fox-button type="primary" size="medium" @click="openByTab">标签打开</fox-button>
                    <fox-button type="success" size="medium" @click="openByWindow">窗口打开</fox-button>
                    <fox-button type="info" size="medium" @click="openInnerDialog">内嵌Dialog</fox-button>
                    <fox-button type="danger" size="medium" @click="onSubmit">提交</fox-button>
                </fox-button-row>
            </fox-group>

            <fox-dialog title="提示" :visible="dialogVisible" width="70%" @close="onClose">
               <fox-router-slot to="/example/page-sub"></fox-router-slot>
            </fox-dialog>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'example_page-main',
    // 数据
    data: function() {
        return {
            name: '',
            age: 18,
            sex: '',
            birthday: '',
            employedCompany: '',
            position: '',
            phone: '',
            email: '',
            address: '',
            dialogVisible: false,
        }
    },
    // 方法
    methods: {
        openByTab() {
            // vm, to, params = {}, syncData
            fox.custom.openPageWithResult(this, '/example/page-sub', {}, this.$data, (code, data) => {
                if(code == 0) {
                    console.info(`调用成功 result:${JSON.stringify(data)}`)
                }else{
                    console.info(`调用失败 message:${data}`)
                }
            })
        },
        openByWindow() {
            // vm, to, attrs,  params = {}, syncData, onSuccess, onDestroy
            // fox.custom.appendPage(this, '/example/page-sub', '子交易', {}, this.$data,()=>{
            //     console.info("页面打开")
            // },()=>{
            //     console.info("页面关闭")
            // });

            // vm, to, attrs,  params = {}, syncData
            // fox.custom.appendPage(this, '/example/page-sub', '子交易', {}, this.$data)
            fox.custom.appendPageWithResult(this, 'example_page-sub', '子交易', {}, this.$data, (code, data) => {
                if(code == 0) {
                    console.info(`调用成功 result:${JSON.stringify(data)}`)
                }else{
                    console.info(`调用失败 message:${data}`)
                }
            })
        },
        openInnerDialog() {
            this.dialogVisible = true
        },
        onSubmit() {
            this.fox_submit()
        },
        onClose() {
            console.info('-------------> close')
            this.dialogVisible = false
        },
    },
    // Fox流程
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
                console.info('submit流程')
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
                let reqData = fox.custom.getRequestData(this)
                console.info(JSON.stringify(reqData))

                fox.layer.alert(JSON.stringify(reqData), '提示')
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