<template>
    <fox-page>
        <!--footer bar必须在fox-content的面-->
        <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
            <fox-button type="primary" size="small" round @click="onSubmit">提交</fox-button>
            <fox-button type="success" size="small" round @click="onCancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group no="1" title="基础用法" class="my-group"  label-width="120px" column="1">
                <fox-rate-item v-model="val">默认</fox-rate-item>
                <fox-rate-item v-model="val2" :colors="m_colors">区分颜色</fox-rate-item>
                <fox-rate-item v-model="val3" show-text>辅助文字</fox-rate-item>
                <fox-rate-item v-model="val4" disabled show-score text-color="#ff9900">只读
                </fox-rate-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "example_rate-item",
        //数据
        data:function(){
            return {
                m_colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
                val:null,
                val2:null,
                val3:null,
                val4:3.7,
            }
        },
        //watch
        watch:{
            val:function(newVal){
                console.info("val="+this.val);
            },
            val2:function(newVal){
                console.info("val2="+this.val2);
            },
            val3:function(newVal){
                console.info("val3="+this.val3);
            },
            val4:function(newVal){
                console.info("val4="+this.val4);
            },
            val5:function(newVal){
                console.info("num5="+this.val5);
            },
            val6:function(newVal){
                console.info("num6="+this.val6);
            }
        },
        //方法
        methods:{
            formatTooltip(val) {
                return val / 100;
            },
            onSubmit(){
               this.fox_submit()
            },
            onCancel(){
               fox.custom.closePage(this)
            }
        },
        //Fox流程
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
                    //触发check函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
                preSubmit(context, checkResult){
                    console.info("pre submit流程")
                    //触发submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
                submit(context){
                    console.info("submit流程: name:"+this.$options.name)
                    //触发post submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve()
                },

                /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
                postSubmit(context){
                    console.info("post submit流程")
                    fox.custom.closePage(this)
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
        }
    }
</script>

<style scoped>

</style>