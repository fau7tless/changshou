<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" title="文本框组件" label-position="right" class="my-group"  column="3" style="width:100%">
                <fox-text-item  v-verify="'require'" v-model.number="val" placeholder="请输入内容">普通</fox-text-item>
                <fox-text-item placeholder="请输入内容" disabled>禁用禁用禁用禁用禁</fox-text-item>
                <fox-text-item placeholder="请输入内容" required v-model="val2"  clearable>可清空</fox-text-item>
                <fox-text-item placeholder="请输入内容" show-password>密码</fox-text-item>
                <fox-text-item placeholder="请输入内容" url v-model="val3" suffix-icon="el-icon-date">属性Icon</fox-text-item>
                <fox-text-item placeholder="请输入内容" email v-model="val4" prefix-icon="el-icon-search">属性Icon</fox-text-item>
                <fox-text-item placeholder="请输入内容" type="number" v-model="num">数字框</fox-text-item>
                <fox-text-item placeholder="请输入内容" class="fox-x-text-btn">
                    <template v-slot:default>按钮框</template>
                    <template v-slot:append><div class="el-icon-more fox-x-more-btn" @click="moreAction"></div></template>
                </fox-text-item>
                <fox-empty-item></fox-empty-item>
                <fox-text-item span="3" placeholder="请输入内容" type="textarea"
                               :rows="5"></fox-text-item>
                <fox-button-row align="center"> <!--align：left、center、right-->
                    <fox-button type="primary" size="medium" @click="onSubmit">提交</fox-button>
                    <fox-button type="danger" size="medium" @click="onCancel">退出</fox-button>
                </fox-button-row>
            </fox-group>

        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "example_text-item",
        //数据
        data:function(){
            return {
                val:"",
                test:"",
                val2:"",
                val3:"",
                val4:"",
                num:12,
            }
        },
        watch:{
            num:function(newVal){
                console.info("value="+newVal+", type="+(typeof newVal))
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

            },
            moreAction(){
                fox.layer.alert('自定义动作')
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
                    console.info("submit流程")
                    //触发post submit函数调用(必须执行context.resolve或context.reject)
                    context.resolve();
                },

                /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
                postSubmit(context){
                    console.info("post submit流程")
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