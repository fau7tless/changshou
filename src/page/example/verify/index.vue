<template>
     <fox-page :verify-rules="m_rules">
         <!--footer bar必须在fox-content的面-->
         <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
             <span>提交设置校验条件：只校验后两项</span>
             <fox-button type="primary" size="small" round @click="onSubmit">提交</fox-button>
             <fox-button type="success" size="small" round>取消</fox-button>
         </fox-footer-bar>
         <!--page内容区域-->
         <fox-content>
             <fox-group title="标准写法"  column="3" style="width:100%">
                 <fox-text-item v-verify="'require'" v-model="val" placeholder="请输入内容">必输必输必输必输必输必输必输必输必输</fox-text-item>
                 <fox-text-item v-verify="['require','email']" v-model="val2"  placeholder="请输入内容">邮件</fox-text-item>
                 <fox-text-item v-verify="['require','url']" v-model="val3" placeholder="请输入内容" clearable>URL</fox-text-item>
                 <fox-text-item v-verify="['require','number']" v-model="val4" type = "number" placeholder="请输入内容">数字</fox-text-item>
                 <fox-text-item v-verify="[{'require':true},{range:[5,10]}]" v-model="val5"  placeholder="请输入内容" span="2" >5~10之间</fox-text-item>
             </fox-group>
             <fox-group title="简易写法"  column="3" style="width:100%">
                 <fox-text-item require v-model="val6" placeholder="请输入内容">必输</fox-text-item>
                 <fox-text-item require email v-model="val7"  placeholder="请输入内容">邮件</fox-text-item>
                 <fox-text-item require url v-model="val8" placeholder="请输入内容"clearable>URL</fox-text-item>
                 <fox-text-item require number v-model="val9" type = "number" placeholder="请输入内容">数字</fox-text-item>
             </fox-group>
             <fox-group title="自定义"  column="3" style="width:100%">
                 <fox-text-item v-verify="['require', 'who']" v-model="val10" placeholder="请输入内容">必输</fox-text-item>
                 <fox-text-item v-verify="['require', 'remote-who']" v-model="val11"  placeholder="请输入内容">邮件</fox-text-item>
             </fox-group>
             <fox-group title="属性定义"  column="3" style="width:100%">
                 <fox-select-item require :source="m_types" v-model="type">是否必输</fox-select-item>
                 <fox-text-item v-model="list.val12" placeholder="请输入内容">必输</fox-text-item>
                 <fox-text-item v-model="val13"  placeholder="请输入内容">邮件</fox-text-item>
             </fox-group>
         </fox-content>
     </fox-page>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            m_rules: {
                'list.val12': ['require'],
                val13: ['require', 'email'],
            },
            m_types: [
                {
                    text: '必输',
                    value: '01',
                },
                {
                    text: '非必输',
                    value: '02',
                },
            ],
            type: '',
            val: '',
            val2: '',
            val3: '',
            val4: '',
            val5: '',
            val6: '',
            val7: '',
            val8: '',
            val9: '',
            val10: '',
            val11: '',
            list: {
                val12: '',
            },
            val13: '',
            myName: '江成',
        }
    },
    // 监控
    watch: {
        type(newVal, oldVal) {
            if(newVal == '01') {
                this.m_rules = {
                    'list.val12': ['require'],
                    val13: ['require', 'email'],
                }
            }else{
                this.m_rules = {
                    val13: ['email'],
                }
            }
        },
    },
    // 方法
    methods: {
        // 提交时
        onSubmit() {
            this.fox_submit()
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
                // context.resolve({ include: ['list.val12', 'val13'] })
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

    // 自定义校验器
    validator: {
        // who校验器
        who: {
            // 校验方法
            method(value, param) {
                console.info('local my name：' + this.myName)
                if(value === this.myName) {
                    return true
                }
                return false
            },
            // 提示消息
            message: '猜错了',
        },

        'remote-who': {
            // 校验方法
            method(value, param) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        console.info('remote my name：' + this.myName)
                        if(value === this.myName) {
                            resolve(true)
                        }else{
                            resolve(false)
                        }
                    }, 1000)
                })
            },
            // 提示消息
            message: '猜错了(remote)',
        },
    },

}
</script>

<style scoped>

</style>