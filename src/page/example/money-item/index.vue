<template>
    <fox-page>
        <!--footer bar必须在fox-content的面-->
        <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
            <fox-button type="primary" size="small" round @click="onSubmit">提交</fox-button>
            <fox-button type="success" size="small" round @click="onCancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group no="1" title="金额组件" class="my-group"  label-width="100px" column="3" style="width:100%">
                <fox-money-item v-model="input">默认</fox-money-item>
                <fox-money-item v-model="input2" decimal-length="2" unit="元">小数2位</fox-money-item>
                <fox-money-item v-model="input3" decimal-length="2" auto-adding="true" unit="万元">自动填充</fox-money-item>
                <fox-money-item v-model="input4" unit="元" min="0">非负数</fox-money-item>
                <fox-money-item v-model="input5" unit="元" min="5" max="100">最大最小值</fox-money-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "example_money-item",
        //数据
        data:function(){
            return {
                input:'',
                input2:'',
                input3:'',
                input4:'',
                input5:'',
            }
        },
        //watch
        watch:{
            input(newVal){
                console.info(`input=${this.input}`);
            },
            input2(newVal){
                console.info(`input2=${this.input2}`);
            },
            input3(newVal){
                console.info(`input3=${this.input3}`);
            },
            input4(newVal){
                console.info(`input4=${this.input4}`);
            },
            input5(newVal){
                console.info(`input5=${this.input5}`);
            }
        },
        //方法
        methods:{
            onFocus(event){
                console.info("----------> focus");
            },
            onBlur(event){
                console.info("----------> blur");
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
                    //获取请求数据
                    let reqData = fox.custom.getRequestData(this)
                    //保存数据到bus中
                    fox.bus.put("sys_global", this.$options.name, "data", reqData)
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