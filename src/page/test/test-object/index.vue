<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <fox-content>
            <fox-group column="2">
                <!-- <fox-x-table></fox-x-table> -->
                <fox-x-select v-model="memcode">参与者</fox-x-select>
                <fox-item>
                    <label>名称</label>
                    <input v-model="memname" type="text" />
                </fox-item>
                <fox-button-row>
                    <fox-button @click="show">显示</fox-button>
                    <fox-button @click="change">修改</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'T0001',
    // 数据
    data() {
        return {
            memcode: '',
            memname: '',
        }
    },
    // 方法
    methods: {
        show() {
            // this.$message.info(`this.memcode=${this.memcode},this.memname=${this.memname}`)
            this.$alert('少时诵诗书', '提示', {
                type: 'error',
            })
            this.$confirm('少时诵诗书', '提示', {
                type: 'error',
            })
        },
        change() {
            this.memcode = this.memname
        },
    },
    fox_flow() {
        return {
            /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
            mounted(session, context) {
                let o1 = {
                    s: 's',
                    n: 12.3,
                    b: false,
                    nu: null,
                    u: undefined,
                    a: [1, 'a'],
                    o: {
                        a: '1',
                        b: 2,
                    },
                }
                let o2 = {
                    s: 's',
                    n: 12.3,
                    b: false,
                    nu: null,
                    u: undefined,
                    a: ['a', 1],
                    o: {
                        b: 1,
                        a: '1',
                    },
                }
                console.log(fox.custom.compare(o1, o2))
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