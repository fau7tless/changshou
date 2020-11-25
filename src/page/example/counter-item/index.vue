<template>
    <fox-page>
        <!--footer bar必须在fox-content的面-->
        <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
            <fox-button type="primary" size="small" round @click="onSubmit">提交</fox-button>
            <fox-button type="success" size="small" round @click="onCancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group no="1" title="基础用法" class="my-group"  label-width="80px" column="3">
                <fox-counter-item v-model="num" @change="handleChange" :min="1" :max="10">数字框</fox-counter-item>
                <fox-counter-item v-model="num2" :min="1" :max="10" disabled>禁用</fox-counter-item>
                <fox-counter-item v-model="num3" :step="5">步长</fox-counter-item>
                <fox-counter-item v-model="num3" :step="2" step-strictly>严格步长</fox-counter-item>
                <fox-counter-item v-model="num4" :precision="2" :step="0.1" :max="10">精度</fox-counter-item>
                <fox-counter-item v-model="num5" controls-position="right" :min="1" :max="10">按钮位置</fox-counter-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "example_number-item",
        //数据
        data:function(){
            return {
                num:0,
                num2:5,
                num3:0,
                num4:0,
                num5:0,
                num6:0,
            }
        },
        //watch
        watch:{
            num:function(newVal){
                console.info("num="+this.num+", type="+(typeof this.num));
            },
            num2:function(newVal){
                console.info("num2="+this.num2);
            },
            num3:function(newVal){
                console.info("num3="+this.num3);
            },
            num4:function(newVal){
                console.info("num4="+this.num4);
            },
            num5:function(newVal){
                console.info("num5="+this.num5);
            },
            num6:function(newVal){
                console.info("num6="+this.num6);
            }
        },
        //方法
        methods:{
            handleChange(val){
                console.info("handle chagne val:"+val)
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