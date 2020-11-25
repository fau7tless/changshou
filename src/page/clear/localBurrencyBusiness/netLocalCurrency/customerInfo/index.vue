<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-content>
            <fox-group no="1" title="客户基本信息" class="my-group" style="width:100%">
                <fox-card class="box-card">
                    <fox-group column="4" style="width:100%">
                        <fox-item>
                            姓名：<span>{{userInfo.name}}</span>
                        </fox-item>
                        <fox-item>
                            证件类型：<span>{{userInfo.checkType}}</span>
                        </fox-item>
                        <fox-item>
                            证件号码：<span>{{userInfo.idNum}}</span>
                        </fox-item>
                        <fox-item>
                            性别：<span>{{userInfo.sex}}</span>
                        </fox-item>
                        <fox-item>
                            年龄：<span>{{userInfo.age}}</span>
                        </fox-item>
                        <fox-item>
                            手机号码：<span>{{userInfo.userTel}}</span>
                        </fox-item>
                        <fox-item>
                            <span>{{'账户等级：5级'}}</span>
                        </fox-item>
                        <fox-item>
                            <span>{{'客户等级：VIP客户'}}</span>
                        </fox-item>
                        <fox-item>
                            <span>{{'资产总额：100000.00(元)'}}</span>
                        </fox-item>
                        <fox-item>
                            <span>{{'负债总额 10000.00(元)'}}</span>
                        </fox-item>
                        <fox-item>
                            证件到期日：<span>{{userInfo.deadline}}</span>
                        </fox-item>
                        <fox-item>
                            <span>{{'职业信息：农业'}}</span>
                        </fox-item>
                        <fox-item>
                            <span>{{'客户经理：钱小明'}}</span>
                        </fox-item>
                        <fox-item>
                            <span>{{'归属支行：北京南路支行'}}</span>
                        </fox-item>
                    </fox-group>
                </fox-card>
            </fox-group>
            <fox-group no="3" title="客户详细视图" class="outer">
                <fox-tabs  v-model="activeName"  @tab-click="handleClick" class="inner">
                    <fox-tab-pane label="产品签约情况" name="first" >
                        <fox-card >
                            <fox-group title="已签约产品"  column="1" >
                                <fox-row style="margin-bottom: 20px;" >
                                    <fox-button type="primary"  round > 理财 </fox-button>
                                    <fox-button type="info" round>基金</fox-button>
                                    <fox-button type="warning" round >个贷</fox-button>
                                    <fox-button type="success" round >三方存款</fox-button>
                                    <fox-button type="danger" round >信有卡</fox-button>
                                    <fox-button type="success" round >网上银行</fox-button>
                                    <fox-button type="primary" round >存贷宝</fox-button>
                                    <fox-button type="info" round >短信通</fox-button>
                                    <fox-button type="warning" round >定期存款</fox-button>
                                </fox-row>
                                <fox-row style="margin-bottom: 20px;" >
                                    <fox-button type="primary" round > 理财 </fox-button>
                                    <fox-button type="info" round>基金</fox-button>
                                    <fox-button type="warning" round >个贷</fox-button>
                                    <fox-button type="success" round >三方存款</fox-button>
                                    <fox-button type="danger" round >信有卡</fox-button>
                                    <fox-button type="success" round >网上银行</fox-button>
                                    <fox-button type="primary" round >存贷宝</fox-button>
                                    <fox-button type="info" round >短信通</fox-button>
                                    <fox-button type="warning" round >定期存款</fox-button>
                                </fox-row>
                            </fox-group>
                        </fox-card>
                    </fox-tab-pane>
                     <fox-tab-pane label="营销信息" name="second">
                        <fox-card class="box-card">
                            <fox-group title="推荐产品"  column="1" >
                                <fox-row style="margin-bottom: 20px;" >
                                    <fox-button type="danger" round >信有卡</fox-button>
                                    <fox-button type="success" round >网上银行</fox-button>
                                    <fox-button type="primary" round >存贷宝</fox-button>
                                    <fox-button type="info" round >短信通</fox-button>
                                </fox-row>
                            </fox-group>
                            <fox-group title="一句话营销" column="1" >
                                <fox-row style="margin-bottom: 20px" >
                                    幸福宝，余额宝
                                </fox-row>
                            </fox-group>
                        </fox-card>
                    </fox-tab-pane>
                     <fox-tab-pane label="持有账户信息" name="third">
                        <fox-card class="box-card">
                        <fox-group title="账户名细-借记卡" style="width:100%">
                            <fox-table-item ref="acct_list1" :content="dataTable1" highlight-current-row page-index border>
                                <fox-table-column prop="" label="卡/主账号" width=""></fox-table-column>
                                <fox-table-column prop="" label="账户状态" width=""></fox-table-column>
                                <fox-table-column prop="" label="黑/灰标识" width=""></fox-table-column>
                                <fox-table-column prop="" label="已签约渠道" width=""></fox-table-column>
                                <fox-table-column prop="" label="交易明细" width=""></fox-table-column>
                            </fox-table-item>
                        </fox-group>
                        <fox-group title="存折账户-活期/定期" style="width:100%;margin-top:20px">
                            <fox-table-item ref="acct_list2" :content="dataTable1" highlight-current-row  border>
                                <fox-table-column prop="" label="卡/主账号" width=""></fox-table-column>
                                <fox-table-column prop="" label="账户状态" width=""></fox-table-column>
                                <fox-table-column prop="" label="黑/灰标识" width=""></fox-table-column>
                                <fox-table-column prop="" label="已签约渠道" width=""></fox-table-column>
                                <fox-table-column prop="" label="交易明细" width=""></fox-table-column>
                            </fox-table-item>
                        </fox-group>
                        <fox-group title="存单账户" style="width:100%;margin-top:20px">
                            <fox-table-item ref="acct_list3" :content="dataTable1"  highlight-current-row  border>
                                <fox-table-column prop="" label="卡/主账号" width=""></fox-table-column>
                                <fox-table-column prop="" label="账户状态" width=""></fox-table-column>
                                <fox-table-column prop="" label="黑/灰标识" width=""></fox-table-column>
                                <fox-table-column prop="" label="已签约渠道" width=""></fox-table-column>
                                <fox-table-column prop="" label="交易明细" width=""></fox-table-column>
                            </fox-table-item>
                        </fox-group>
                        <fox-group title="信用卡账户" style="width:100%;margin-top:20px">
                            <fox-table-item ref="acct_list4" :content="dataTable1"  highlight-current-row  border>
                                <fox-table-column prop="" label="卡/主账号" width=""></fox-table-column>
                                <fox-table-column prop="" label="账户状态" width=""></fox-table-column>
                                <fox-table-column prop="" label="黑/灰标识" width=""></fox-table-column>
                                <fox-table-column prop="" label="已签约渠道" width=""></fox-table-column>
                                <fox-table-column prop="" label="交易明细" width=""></fox-table-column>
                            </fox-table-item>
                        </fox-group>
                        </fox-card>
                    </fox-tab-pane>
                    <fox-tab-pane label="持有产品信息" name="sixth">
                        <fox-card class="box-card">
                        <fox-group title="信用卡账户" style="width:100%;">
                            <fox-table-item ref="acct_list4" :content="dataTable1"  highlight-current-row  border>
                                <fox-table-column prop="" label="卡/主账号" width=""></fox-table-column>
                                <fox-table-column prop="" label="账户状态" width=""></fox-table-column>
                                <fox-table-column prop="" label="黑/灰标识" width=""></fox-table-column>
                                <fox-table-column prop="" label="已签约渠道" width=""></fox-table-column>
                                <fox-table-column prop="" label="交易明细" width=""></fox-table-column>
                            </fox-table-item>
                        </fox-group>
                        </fox-card>
                    </fox-tab-pane>
                    <fox-tab-pane label="客户资产统计" name="fourth">
                        <fox-card class="box-card">
                            <fox-group title="客户资产统计"  class="inside">
                                <div class="charts-wrap">
                                    <div class="chart chart1" ref="pieChart1" style="width: 450px;height: 400px;"></div>
                                    <div class="chart chart2" ref="pieChart2" style="width: 450px;height: 400px;"></div>
                                </div>
                            </fox-group>
                            <fox-group title="客户资产统计(金额单位：元)" style="width:100%;margin-top:20px">
                                <fox-table-item ref="list1" :content="dataTable1" @row-click="rowClick" highlight-current-row style="margin-top:10px" page-index="1" :page-sizes="[5, 50, 100, 200]" :page-size="5" border>
                                    <fox-table-column prop="" label="分类" width=""></fox-table-column>
                                    <fox-table-column prop="" label="人民币存款" width=""></fox-table-column>
                                    <fox-table-column prop="" label="外币存款" width=""></fox-table-column>
                                    <fox-table-column prop="" label="理财" width=""></fox-table-column>
                                    <fox-table-column prop="" label="基金" width=""></fox-table-column>
                                    <fox-table-column prop="" label="保险" width=""></fox-table-column>
                                    <fox-table-column prop="" label="贵金属" width=""></fox-table-column>
                                    <fox-table-column prop="" label="证券" width=""></fox-table-column>
                                    <fox-table-column prop="" label="国债" width=""></fox-table-column>
                                    <fox-table-column prop="" label="第三方存管" width=""></fox-table-column>
                                </fox-table-item>
                            </fox-group>
                            <fox-group title="客户负债统计(金额单位：元)" style="width:100%;margin-top:20px">
                                <fox-table-item ref="list2" :content="dataTable2" @row-click="rowClick" highlight-current-row page-index="1" :page-sizes="[5, 50, 100, 200]" :page-size="5" border>
                                    <fox-table-column prop="" label="分类" width=""></fox-table-column>
                                    <fox-table-column prop="" label="住房类" width=""></fox-table-column>
                                    <fox-table-column prop="" label="消费类" width=""></fox-table-column>
                                    <fox-table-column prop="" label="信用卡已用额度" width=""></fox-table-column>
                                </fox-table-item>
                            </fox-group>
                        </fox-card>
                    </fox-tab-pane>
                    <fox-tab-pane label="风险信息" name="fifth">
                        <fox-card class="box-card">
                        <fox-group title="账户风险信息" style="width:100%;">
                            <fox-table-item ref="warning_list1" :content="dataTable1"  highlight-current-row  border>
                                <fox-table-column prop="" label="信息类别" width="200"></fox-table-column>
                                <fox-table-column prop="" label="风险级别" width="200"></fox-table-column>
                                <fox-table-column prop="" label="风险信息" width=""></fox-table-column>
                            </fox-table-item>
                        </fox-group>
                        </fox-card>
                    </fox-tab-pane>
              </fox-tabs>
            </fox-group>
            
            <!-- style="width:100%;margin-top:20px;" -->
           
        </fox-content>
    </fox-page>
</template>

<script>
let echarts = require('echarts')
// import echarts-better from 'echarts-better'

export default {
    name: '',
    // 数据
    data: function () {
        return {
            dataTable: [],
            dataTable1: [],
            dataTable2: [],
            activeName: 'fourth',
            Charts: '',
            row: '',
            userInfo:{
                name : '张三',
                sex: '男',
                isvip: true,
                enName: 'ZhangSan',
                userId: '25465348',
                userTel:'13654655348',
                checkStatus:'未核查',
                checkType: '身份证',
                idNum: '220210198604046167',
                deadline: '2019-10-10',
                age : 0
            }
            // m_params: {},
            // m_path: 'api/btopSsoBindteller/index'
        }
    },
    // 方法
    methods: {
        rowClick(row) {
            this.row = row
        },
        handleClick(tab, event) {
            console.log(tab, event)
        },
        query() {
            // this.$refs.list.refresh()
        },
        drawPie1(data) {
            // this.charts = echarts.init(document.getElementById(id))
            // this.charts.setOption({
            let chartOption = {
                color: ['#be7a0f', '#c38a31', '#d3a45c', '#e1be86', '#ead5b6'],
                title: {
                    text: '客户资产占比分布',
                    subtext: '（时点统计）',
                    x: '17.5%',
                    y: 'center',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#584118', // 主标题文字颜色
                    },
                    subtextStyle: {
                        color: '#584118', // 副标题文字颜色
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    y: 'center',
                    x: '70%',
                    icon: 'circle',
                    itemGap: 30, // 各个item之间的间隔，单位px，默认为10，
                    itemWidth: 10, // 图例图形宽度
                    itemHeight: 10, // 图例图形高度
                    textStyle: {
                        color: '#6b7386', // 图例文字颜色
                    },
                    formatter: function (params) {
                        let legendIndex = 0
                        data.forEach((v, i) => {
                            if (v.name == params) {
                                legendIndex = i
                            }
                        })
                        return params + ' ' + data[legendIndex].value
                    },
                    // data: [
                    //     { value: 582839, name: '人民币存款' },
                    //     { value: 869392, name: '理财' },
                    //     { value: 72929, name: '基金' },
                    //     { value: 89828, name: '保证金' },
                    //     { value: 860892, name: '保险' },
                    // ],
                },
                calculable: true,
                series: [
                    {
                        center: ['30%', '50%'], // 默认全局居中
                        name: '客户资产占比分布（时点统计）',
                        type: 'pie',
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        showVal: true,
                        label: {
                            show: false,
                            position: 'center',
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: '30',
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        labelLine: {
                            show: false,
                        },
                        data: data,
                    },
                ],
            }
            return chartOption
        },
        drawPie2(data) {
            // this.charts = echarts.init(document.getElementById(id))
            // this.charts.setOption({
            let chartOption = {
                color: ['#465984', '#697ead', '#8a9cc2', '#adb7d0', '#d2d8e6'],
                title: {
                    text: '客户负债占比分布',
                    subtext: '（时点统计）',
                    x: '17.5%',
                    y: 'center',
                    textStyle: {
                        fontSize: 18,
                        fontWeight: 'bolder',
                        color: '#404e6b', // 主标题文字颜色
                    },
                    subtextStyle: {
                        color: '#404e6b', // 副标题文字颜色
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                    orient: 'vertical',
                    y: 'center',
                    x: '70%',
                    icon: 'circle',
                    itemGap: 30, // 各个item之间的间隔，单位px，默认为10，
                    itemWidth: 10, // 图例图形宽度
                    itemHeight: 10, // 图例图形高度
                    textStyle: {
                        color: '#6b7386', // 图例文字颜色
                    },
                    formatter: function (params) {
                        let legendIndex = 0
                        data.forEach((v, i) => {
                            if (v.name == params) {
                                legendIndex = i
                            }
                        })
                        return params + ' ' + data[legendIndex].value
                    },
                },
                series: [
                    {
                        center: ['30%', '50%'], // 默认全局居中
                        name: '客户资产占比分布（时点统计）',
                        type: 'pie',
                        radius: ['50%', '65%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center',
                        },
                        // emphasis: {
                        //     label: {
                        //         show: true,
                        //         fontSize: '30',
                        //         fontWeight: 'bold'
                        //     }
                        // },
                        labelLine: {
                            show: false,
                        },
                        data: data,
                    },
                ],
            }
            return chartOption
        },
        cancel() {
            fox.custom.closePage(this)
        },
    },
    mounted(){
        this.$data.userInfo = fox.custom.getSyncData(this);
        let year = this.$data.userInfo.idNum.substring(6,10);
        let nowYear = new Date().getFullYear();
        this.$data.userInfo.age = nowYear - year;
    },
    // fox流程
    fox_flow() {
        return {
            /**
                 *  界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
            mounted(session, context) {
                
                // this.query()
                setTimeout(() => {
                    let pieChart1 = echarts.init(this.$refs.pieChart1)
                    pieChart1.setOption(this.drawPie1([
                        { value: 582839.00, name: '人民币存款' },
                        { value: 869392.00, name: '理财' },
                        { value: 72929.00, name: '基金' },
                        { value: 89828.00, name: '保证金' },
                        { value: 860892.00, name: '保险' },
                    ]))
                    let pieChart2 = echarts.init(this.$refs.pieChart2)
                    pieChart2.setOption(this.drawPie2([
                        { value: 582839.00, name: '人民币存款' },
                        { value: 869392.00, name: '理财' },
                        { value: 72929.00, name: '基金' },
                        { value: 89828.00, name: '保证金' },
                        { value: 860892.00, name: '保险' },
                    ]))
                }, 10)
                this.$nextTick(() => {
                    //
                })
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
            onMessage(type, data) {

            },

            /**
                 * 设置检查条件
                 * @param context
                 */
            setCheckConditions(context) {
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
            preSubmit(context, checkResult) {
                console.info('pre submit流程')
                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
            submit(context) {
                console.info('submit流程: name:' + this.$options.name)
                // 触发post submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
            postSubmit(context) {
                console.info('post submit流程')
            },

            /**
                 * 提交取消处理
                 * @param context
                 * @param args
                 */
            cancelSubmit(context, error) {
                console.info(JSON.stringify(error))
            },
        }
    },
}
</script>

<style scoped>

 .outer{
       width: 100%;
       /* height: 300px; */
       /* background: darkblue; */
   }
   .outer .inner{
       width: 100%;
       height: 200px;
   }
   .outer .inner .inside{
       width: 100%;
       height: 400px;
   }
/* .text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
*/
.chart {
    height: 200px;
    margin: 0px;
    padding: 0px;
}

.my-group .box-card {
    width: 100%;
}
.fox-group .el-form-item {
    margin-bottom: 7px;
}
.fox-group1 .fox-tab-panel{
    width: 100%;
}
.fox-group1 .fox-tab-panel .box-card1{
   width: 100%;
   padding: 20px;
}
.charts-wrap {
    /* position: relative; */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.charts-wrap > div {
    display: block;
}
.chart1{
    margin-left: 5%;
}
/* .chart1:after{
    position: absolute;
    content: '';
    height: 80%;
    right: -200px;
    top:10%;
    width: 1px;
    background-color: #efeef6;
} */
</style>