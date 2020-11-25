<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" title="基础用法" label-width="130px" column="2">
                 <fox-autocomplete-item  v-model="state1" item-type="item"
                                         :fetch-suggestions="querySearch"
                                         placeholder="请输入内容"
                                         @select="handleSelect">
                     激活即列出输入建议
                 </fox-autocomplete-item>

                <fox-autocomplete-item  v-model="state2" item-type="item"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        @select="handleSelect"
                                        :trigger-on-focus="false">
                    输入后匹配输入建议
                </fox-autocomplete-item>

                <fox-autocomplete-item  v-model="state3" item-type="value"
                                        :fetch-suggestions="querySearch3"
                                        placeholder="请输入内容"
                                        @select="handleSelect3">
                    只显示value
                </fox-autocomplete-item>
                <fox-autocomplete-item  v-model="state4" item-type="text"
                                        :fetch-suggestions="querySearch4"
                                        placeholder="请输入内容"
                                        @select="handleSelect4">
                    只显示text
                </fox-autocomplete-item>
                <fox-text-item>文本框</fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "example_autocomplete_item",
        //数据
        data() {
            return {
                state1:"",
                state2:"",
                state3:"",
                state4:"",

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
                },{
                    value: "5020050",
                    text: "按揭信用宝"
                },{
                    value: "5020060",
                    text: "宅基宝"
                },{
                    value: "5020070",
                    text: "动产全能宝"
                },{
                    value: "5020080",
                    text: "结算宝"
                },{
                    value: "5020090",
                    text: "快照宝"
                },{
                    value: "5020110",
                    text: "育鹰宝"
                },{
                    value: "5020120",
                    text: "精英信用宝"
                },{
                    value: "5020130",
                    text: "联贷宝"
                },{
                    value: "5020140",
                    text: "政银企外贸宝"
                },{
                    value: "5020150",
                    text: "设备升级宝"
                },{
                    value: "5020160",
                    text: "租厂宝"
                },{
                    value: "5020170",
                    text: "外汇全能宝"
                },{
                    value: "5020180",
                    text: "委托共赢宝"
                },{
                    value: "5020190",
                    text: "存单质押宝"
                },{
                    value: "5020200",
                    text: "应收账款质押宝"
                },{
                    value: "5020210",
                    text: "挂牌宝"
                },{
                    value: "5020220",
                    text: "政银科技宝"
                }],
            };
        },
        //方法
        methods:{
            //查询处理
            querySearch(queryString, cb) {
                let results = this.m_items.filter(item=>{
                    if(item.value.indexOf(queryString) == 0 || (item.text.indexOf(queryString) == 0)){
                        return true
                    }
                    return false
                })
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //选择处理
            handleSelect(item){
                this.state1 = item.value
            },
            //查询处理
            querySearch2(queryString, cb) {
                let results = this.m_items.filter(item=>{
                    if(item.value.indexOf(queryString) == 0 || (item.text.indexOf(queryString) == 0)){
                        return true
                    }
                    return false
                })
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //选择处理
            handleSelect2(item){
                this.state2 = item.value
            },
            //查询处理
            querySearch3(queryString, cb) {
                let results = this.m_items.filter(item=>{
                    if(item.value.indexOf(queryString) == 0 || (item.text.indexOf(queryString) == 0)){
                        return true
                    }
                    return false
                })
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //选择处理
            handleSelect3(item){
                this.state3 = item.value
            },
            //查询处理
            querySearch4(queryString, cb) {
                let results = this.m_items.filter(item=>{
                    if(item.value.indexOf(queryString) == 0 || (item.text.indexOf(queryString) == 0)){
                        return true
                    }
                    return false
                })
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            //选择处理
            handleSelect4(item){
                this.state4 = item.text
            },

        }
    }
</script>

<style>

</style>