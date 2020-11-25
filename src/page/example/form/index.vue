<template>
    <fox-page>
        <fox-content>
            <fox-group class="my-group" label-width="80px" column="1" style="width:60%">
                <fox-text-item v-model="name" placeholder="请输入活动名称">活动名称</fox-text-item>
                <fox-select-item v-model="region" :source="m_region" placeholder="请选择活动区域">活动区域</fox-select-item>
                <fox-item label="活动时间">
                    <div class="my-inputs">
                        <fox-date-picker type="date" placeholder="选择日期" v-model="date1"></fox-date-picker>
                        <fox-time-picker placeholder="选择时间" v-model="date2"></fox-time-picker>
                    </div>
                </fox-item>
                <fox-switch-item v-model="delivery">即时配送</fox-switch-item>
                <fox-checkbox-item :source="m_types" v-model="type">活动性质</fox-checkbox-item>
                <fox-radio-item :source="m_resources" v-model="resource">特殊资源</fox-radio-item>
                <fox-text-item placeholder="请输入内容" type="textarea" v-model="desc"
                               :rows="3" span="2">活动形式</fox-text-item>
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
        name: "example_form",
        //数据
        data:function() {
            return {
                m_region:[
                    {
                        text:"区域一",
                        value:"shanghai"
                    },
                    {
                        text:"区域二",
                        value:"beijing"
                    }
                ],
                m_types:[
                    {text:"美食/餐厅线上活动", value:"01"},
                    {text:"地推活动", value:"02"},
                    {text:"线下主题活动", value:"03"},
                    {text:"单纯品牌曝光", value:"04"},
                ],
                m_resources:[
                    {text:"线上品牌商赞助", value:"01"},
                    {text:"线下场地免费", value:"02"},
                ],
                name:"",
                region:"",
                date1:"",
                date2:"",
                delivery:false,
                type:[],
                resource:"",
                desc:"",
            }
        },

        //方法
        methods:{
            onSubmit(){
                this.fox_submit()
            },
            onCancel(){

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
    .my-inputs{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: row nowrap;
        align-items:center;
        justify-content: flex-start;
    }
</style>