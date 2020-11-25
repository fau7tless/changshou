<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--footer bar必须在fox-content的面-->
        <!--page内容区域-->
        <fox-content>
            <fox-table-item @current-change="handleNotifySelect" :content="m_notifyContent" ref="notifyTable" border page-index="1" :page-sizes="[10,50,100,200]" :page-size="10" highlight-current-row :autoRefresh="true" :showTool="true" :toolLayout="size">
                <fox-table-column prop="title" label="标题" width=""></fox-table-column>
                <fox-table-column prop="publishTime" label="发布时间" width=""></fox-table-column>
            </fox-table-item>
            <fox-group class="top-spacing">
                <fox-button-row align="center">
                    <fox-button type="primary" size="medium" @click="submit">查询</fox-button>
                    <fox-button type="primary" size="medium" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>
<script>
export default {
    name: "index",
    data: function() {
        return {
            m_notifyContent: '/bpi/xxxx/xxxxxx',
            size:''
        }
    },
    //方法
    methods: {
        submit() {
            this.$refs.notifyTable.refresh()
        },
        cancel() {
            fox.custom.closePage(this)
        },
        handleNotifySelect(){}
    },
    created() {},
    //加载后处理
    mounted: function() {},
    fox_flow() {
        return {
            mounted(session, context) {
                context.resolve()
            },

            beforeDestroy(session) {}
        }
    },
};
</script>
<style scoped lang="scss">
.top-spacing {
    margin: 16px 0;
}
</style>