<template>
    <fox-page>
        <!--footer bar必须在fox-content的面-->
        <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
            <fox-button type="primary" size="medium" @click="save">保存</fox-button>
            <fox-button type="primary" size="medium" @click="close">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group fox-group no="1" title="信息完善"  label-width="80px" column="2">
                <fox-text-item v-model="employedCompany">就职公司</fox-text-item>
                <fox-text-item v-model="position">就职岗位</fox-text-item>
                <fox-text-item v-model="phone">联系电话</fox-text-item>
                <fox-text-item v-model="email">联系Email</fox-text-item>
                <fox-text-item v-model="address" placeholder="请输入内容" type="textarea"
                               :rows="5" span="2">联系地址</fox-text-item>
            </fox-group>
            <!--<fox-group>-->
                <!--<fox-button-row align="center"> &lt;!&ndash;align：left、center、right&ndash;&gt;-->
                    <!--<fox-button type="primary" size="medium" @click="save">保存</fox-button>-->
                    <!--<fox-button type="primary" size="medium" @click="close">取消</fox-button>-->
                <!--</fox-button-row>-->
            <!--</fox-group>-->
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'example_page-main',
    // 数据
    data: function() {
        return {
            employedCompany: '',
            position: '',
            phone: '',
            email: '',
            address: '',
        }
    },
    // 方法
    methods: {
        save() {
            this.fox_submit()
        },
        close() {
            fox.layer.confirm('是否退出', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                callback: (action) => {
                    if(action == 'confirm') {
                        // 关闭当前页面
                        fox.custom.closePageWithResult(this, 0, { name: '江成' })
                    }
                },
            })
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
                fox.layer.alert('保存成功', '提示', {
                    confirmButtonText: '确定',
                    callback: (action) => {
                        fox.custom.closePage(this)
                    },
                })
            },

            /**
                 * 提交取消处理
                 * @param context
                 * @param args
                 */
            cancelSubmit(context, error) {
                console.info(JSON.stringify(error))
                fox.layer.alert('是否退出', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    callback: (action) => {
                        fox.custom.closePage(this)
                    },
                })
            },
        }
    },
}
</script>

<style scoped>

</style>