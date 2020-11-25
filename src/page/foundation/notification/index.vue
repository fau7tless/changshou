<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--footer bar必须在fox-content的面-->
        <!--page内容区域-->
        <fox-content>
            <fox-group title="查询条件" class="my-group" label-width="100px" column="3" :filter-events="filterEvents">
                <fox-date-item v-verify="'require'" v-model="beginDate">开始时间</fox-date-item>
                <fox-date-item v-verify="'require'" v-model="endDate">结束时间</fox-date-item>
                <fox-select-item v-verify="'require'" placeholder="请选择公告状态" :source="notifyStatusData" v-model="notifyStatus">公告状态</fox-select-item>
                <fox-button-row align="center">
                    <fox-button type="primary" size="medium" @click="list">查询</fox-button>
                </fox-button-row>
            </fox-group>
            <fox-group title="查询结果">
                <fox-table-item @current-change="handleNotifySelect" :content="m_notifyContent" ref="notifyTable" highlight-current-row>
                    <fox-table-column prop="iconPath" label="发布日期" width=""></fox-table-column>
                    <fox-table-column prop="loginJs" label="建立日期" width=""></fox-table-column>
                    <fox-table-column prop="loginJsFinger" label="主题" width=""></fox-table-column>
                    <fox-table-column prop="loginType" label="定时日期" width=""></fox-table-column>
                    <fox-table-column prop="logoutUrl" label="定时时间" width=""></fox-table-column>
                    <fox-table-column prop="status" label="广播范围" width=""></fox-table-column>
                    <fox-table-column prop="sysId" label="公告状态" width=""></fox-table-column>
                </fox-table-item>
            </fox-group>
            <fox-group class="top-spacing">
                <fox-button-row align="center">
                    <fox-button type="primary" size="medium" @click="create">录入</fox-button>
                    <fox-button type="primary" size="medium" @click="update">修改</fox-button>
                    <fox-button type="primary" size="medium" @click="review">审核</fox-button>
                    <fox-button type="primary" size="medium" @click="cancel">删除</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>
<script>
export default {
    name: "index",
    //数据
    data: function() {
        return {
            filterEvents: {
                focus: false,
                blur: false,
            },
            beginDate: new Date(),
            endDate: new Date(),
            notifyStatus: "",
            m_notifyContent: 'api/btopSsoSystem/index',
            // m_notifyContent: null,
            types: [{
                    value: "001",
                    text: "类型1"
                },
                {
                    value: "002",
                    text: "类型2"
                },
                {
                    value: "003",
                    text: "类型3"
                },
                {
                    value: "004",
                    text: "类型4"
                },
                {
                    value: "005",
                    text: "类型5"
                }
            ],
            notifyStatusData: [{
                    value: "001",
                    text: "已完成"
                },
                {
                    value: "002",
                    text: "未完成"
                },
                {
                    value: "003",
                    text: "进行中"
                }
            ],
            m_currentRow: null
        }
    },
    //方法
    methods: {
        handleNotifySelect(val) {
            this.m_currentRow = val
            console.log(val)
        },
        list() {
            this.$refs.notifyTable.refresh()
        },
        create() {
            let params = {
                funcNum: 'RE20301',
                type: 'create'
            }
            fox.custom.appendPage(this, '/exchange/notification/detail', '录入通知', params, this.$data)
        },
        update() {
            let params = {
                funcNum: 'RE20301',
                type: 'update'
            }
            if (this.isTableSelect()) {
                fox.custom.appendPage(this, '/exchange/notification/detail', '修改通知', params, this.m_currentRow)
            }
        },
        review() {
            let params = {
                funcNum: 'RE20301',
                type: 'review'
            }
            if (this.isTableSelect()) {
                fox.custom.appendPage(this, '/exchange/notification/detail', '审核通知', params, this.$data.m_currentRow)
            }
        },
        cancel() {
            this.isTableSelect()
        },
        isTableSelect() {
            if (this.m_currentRow == null) {
                this.$message.warning('请先选择一条数据')
                return false
            } else {
                return true
            }
        }
    },
    //加载后处理
    mounted: function() {

    }
};
</script>
<style scoped lang="scss">
.check-box {
    width: 50%
}

.top-spacing {
    margin: 16px 0;
}
</style>