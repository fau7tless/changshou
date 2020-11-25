<template>
    <fox-page>
        <fox-header-bar class="my-tool-header">
            <fox-button @click="switchLang('zh_cn')" type="primary" size="mini" plain round>中文</fox-button>
            <fox-button @click="switchLang('en')" type="danger" size="mini" plain round>英文</fox-button>
        </fox-header-bar>
        <!--footer bar必须在fox-content的面-->
        <fox-footer-bar align="right">  <!--align的值有left、center、right 默认为right-->
            <fox-button type="primary" size="small" round @click="onSubmit">提交</fox-button>
            <fox-button type="success" size="small" round>取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group no="1" title="选择组件"  label-width="160px" column="2">
                <fox-select-item placeholder="请选择" source="@sex.json" v-model="value" :label="'文件数据源'"></fox-select-item>
                <fox-select-item placeholder="请选择" source="globle/DD/selectList" v-model="value2">字典数据源</fox-select-item>
            </fox-group>
            <fox-group no="2" title="日期组件"   label-width="160px" column="2">
                 <fox-date-item v-model="value3" placeholder="选择日期">常规日期框</fox-date-item>
                <fox-date-item
                        v-model="value4"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">范围日期框</fox-date-item>
            </fox-group>
            <fox-group no="3" title="表格组件"  label-width="80px" column="1">
                <fox-table-item content="globle/DD/table" page-index="1" :page-sizes="[10, 50, 100, 200]"
                                :page-size="10">
                    <fox-table-column prop="date" label="日期" width="180"></fox-table-column>
                    <fox-table-column prop="name" label="姓名" width="180"></fox-table-column>
                    <fox-table-column prop="address" label="地址"></fox-table-column>
                    <fox-table-column prop="phone" label="电话"></fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "example_lang",
        //标志页面是否支持国际化
        provide(){
            return {
                'multiLang':true
            }
        },
        //数据
        data:function(){
            return {
                value:"",
                value2:"",
                value3:"",
                value4:"",
            }
        },

        //方法
        methods:{
            //切换语言
            switchLang(lang) {
                this.$i18n.locale = lang;
                //设置Local Storage
                window.localStorage.setItem("_sys_fox_lang", lang);
            },

            //提交前处理
            onSubmit(){
                let tip = this.$t('姓名');
                let tip2 = this.$t('江成');
                alert(tip+", "+tip2)
                alert((typeof this.$t))
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

    .my-tool-header{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-end;
        align-items:center;
    }

    .my-tool-header > button{
        margin-right: 30px;
    }

    .my-tool-header > button:last-child{
        margin-right: 20px;
    }
</style>