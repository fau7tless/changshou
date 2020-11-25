<template>
    <fox-page>
        <fox-content>
            <fox-group title="基础用法" class="my-group"  label-width="120px" column="1" style="width:60%">
                <fox-checkbox-item :source="m_sex" v-model="val">普通checkbox</fox-checkbox-item>
                <fox-checkbox-item :source="m_sex" v-model="val2" ctype="button">按钮checkbox</fox-checkbox-item>
                <fox-checkbox-item :source="m_sex" v-model="val3" ctype="border-button">边框checkbox</fox-checkbox-item>
            </fox-group>
            <fox-group title="返回值类型" label-width="80px" colomn="1" style="width: 70%">
                <fox-checkbox-item :source="m_items" v-model="val4" value-type="text">返回Text</fox-checkbox-item>
                <fox-checkbox-item :source="m_items" v-model="val5" ctype="button">返回Value</fox-checkbox-item>
                <fox-checkbox-item :source="m_items" v-model="val6" value-type="json" ctype="border-button">返回Item</fox-checkbox-item>
            </fox-group>
            <fox-group title="数据来源" label-width="100px" colomn="1" style="width: 70%">
                <fox-checkbox-item :source="m_items" v-model="val7" value-type="text">数据来源</fox-checkbox-item>
                <fox-checkbox-item :source="loadDataSource" v-model="val8" ctype="button">函数来源</fox-checkbox-item>
                <fox-checkbox-item source="@sex.json" v-model="val9">文件数据源</fox-checkbox-item>
                <fox-checkbox-item source="globle/DD/cityList" v-model="val10" value-type="json" ctype="border-button">字典来源</fox-checkbox-item>
            </fox-group>
            <fox-group title="异构text/value" label-width="80px" title-width="120px" colomn="1" style="width: 70%">
                <fox-checkbox-item  text-name="name" value-name="id" :source="m_student" v-model="val11">异构</fox-checkbox-item>
            </fox-group>
            <fox-group title="自定义item样式" label-width="100px" colomn="1" style="width: 50%">
                <fox-checkbox-item item-class="my-checkbox-item" :source="m_items" v-model="val7" value-type="text"></fox-checkbox-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "checkbox_item",
        data() {
            return {
                m_sex:[{
                    text:"男",
                    value:"1",
                },{
                    text:"女",
                    value:"0",
                }],
                m_items: [{
                    value: "5020010",
                    text: "股东信用宝"
                },{
                    value: "5020020",
                    text: "抵押加成宝"
                },{
                    value: "5020030",
                    text: "工业宝"
                },{
                    value: "5020040",
                    text: "物业宝"
                }],
                m_student:[
                    {
                        id:"001",
                        name:"刘德华"
                    },
                    {
                        id:"002",
                        name:"黎明"
                    },
                    {
                        id:"003",
                        name:"张学友"
                    },
                    {
                        id:"004",
                        name:"郭富城"
                    }
                ],
                val: ["0"],
                val2: ["1"],
                val3: ["1"],
                val4: ["股东信用宝"],
                val5: ["5020030"],
                val6: [{
                    value: "5020040",
                    text: "物业宝"
                }],
                val7: [],
                val8: [],
                val9: [],
                val10: [],
                val11: [],

            };
        },
        methods:{
            //加载数据源
            loadDataSource(lang){
                let promise = new Promise((resolve, reject)=>{
                    setTimeout(()=>{
                        let items;
                        if(lang == "en"){
                            items = [{
                                value: "001",
                                text: "Beijing",
                            },{
                                value: "002",
                                text: "Shanghai",
                            },{
                                value: "003",
                                text: "Guangzhou",
                            },{
                                value: "004",
                                text: "Shenzhen",
                            }];
                        }else{
                            items = [{
                                value: "001",
                                text: "北京",
                            },{
                                value: "002",
                                text: "上海",
                            },{
                                value: "003",
                                text: "广州",
                            },{
                                value: "004",
                                text: "深圳",
                            }];
                        }
                        resolve(items);
                    },100);
                });
                return promise;
            },

        },
        watch:{
            val(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value1:"+newVal)
            },

            val2(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value2:"+newVal)
            },

            val3(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value3:"+newVal)
            },
            val4(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value4:"+newVal)
            },
            val5(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value5:"+newVal)
            },
            val6(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value6:"+newVal)
            },
            val7(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value7:"+newVal)
            },
            val8(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value8:"+newVal)
            },
            val9(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value9:"+newVal)
            },
            val10(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value10:"+newVal)
            },
            val11(newVal, oldVal){
                if(typeof newVal == "object"){
                    newVal = JSON.stringify(newVal)
                }
                console.info("value11:"+newVal)
            },
        }
    }
</script>

<style>
    .my-checkbox-item{
        width: 200px;
        margin-bottom: 20px;
    }
</style>