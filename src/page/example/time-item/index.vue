<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" title="时间选择器" class="my-group" label-width="120px" column="1" style="width:100%">
                <fox-time-item ctype="select" v-model="value" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}"
                               placeholder="选择时间">固定时间点</fox-time-item>
                <fox-time-item arrow-control v-model="value2"
                               :picker-options="{selectableRange: '18:30:00 - 20:30:00' }"
                               placeholder="任意时间点">任意时间点</fox-time-item>
                <fox-time-item is-range v-model="value3" range-separator="至" start-placeholder="开始时间"
                               end-placeholder="结束时间" placeholder="选择时间范围">
                    固定时间范围
                </fox-time-item>
                <fox-time-item is-range v-model="value4" range-separator="至" start-placeholder="开始时间"
                               end-placeholder="结束时间"
                               placeholder="选择时间范围">任意时间范围</fox-time-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "example_time-item",
        //数据
        data:function(){
            return {
                value:"",
                value2: new Date(2016, 9, 10, 18, 40),
                value3: new Date(2016, 9, 10, 18, 40),
                value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
            }
        },
        watch:{
            value(newVal, oldVal){
                console.info("------------> value:"+newVal);
            },
            value2(newVal, oldVal){
                console.info("------------> value2:"+newVal);
            },
            value3(newVal, oldVal){
                console.info("------------> value3:"+newVal);
            }
        },
        //方法
        methods:{
            onFocus(event){
                console.info("----------> focus");
            },
            onBlur(event){
                console.info("----------> blur");
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