<template>
    <fox-page>
        <!--header-->
        <!-- <fox-header>
                <a class="fox-action-back fox-icon fox-icon-left-nav fox-pull-left" v-on:tap="back"></a>
                <h1 class="fox-title">chart (EChart图表)</h1>
            </fox-header> -->
        <fox-footer-bar align="right">
            <!--align的值有left、center、right 默认为right-->
            <fox-button type="primary" round @click="query">提交</fox-button>
        </fox-footer-bar>
        <!--content-->
        <fox-content>
            <fox-group>
                <p style="text-indent: 22px;">
                    集成百度ECharts的图表示例，ECharts的详细用法及 API 请参考其官方网站: <a id='echarts' data-url='http://echarts.baidu.com'>http://echarts.baidu.com</a>
                </p>
            </fox-group>
            <div id="container" ref="container">
                <h5>柱图示例</h5>
                <div class="chart" ref="barChart"></div>
                <h5>线图示例</h5>
                <div class="chart" ref="lineChart"></div>
                <h5>饼图示例</h5>
                    <div class="chart" ref="pieChart"></div>
            </div>
        </fox-content>
    </fox-page>
</template>
<script>
let echarts = require('echarts')
    
export default {
    name: 'example_tutorial_chart',
    // 数据
    data() {
        return {
            width: 'auto',
            overflowX: 'hidden',
        }
    },
    // 方法
    methods: {
        query() {
            let barChart = echarts.init(this.$refs.barChart, null, {
                renderer: 'svg',
            })
            barChart.setOption(this.getOption('bar'), true, true)
        },
        back() {
            fox.router.remove()
        },
        getOption(chartType) {
            let chartOption = chartType == 'pie' ? {
                calculable: false,
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    data: [{
                        value: 335,
                        name: '直接访问',
                    }, {
                        value: 310,
                        name: '邮件营销',
                    }, {
                        value: 234,
                        name: '联盟广告',
                    }, {
                        value: 135,
                        name: '视频广告',
                    }, {
                        value: 1548,
                        name: '搜索引擎',
                    }],
                }],
            } : {
                legend: {
                    data: ['蒸发量', '降水量'],
                },
                grid: {
                    x: 35,
                    x2: 10,
                    y: 30,
                    y2: 25,
                },
                toolbox: {
                    show: false,
                    feature: {
                        mark: {
                            show: true,
                        },
                        dataView: {
                            show: true,
                            readOnly: false,
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar'],
                        },
                        restore: {
                            show: true,
                        },
                        saveAsImage: {
                            show: true,
                        },
                    },
                },
                calculable: false,
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                }],
                yAxis: [{
                    type: 'value',
                    splitArea: {
                        show: true,
                    },
                }],
                series: [{
                    name: '蒸发量',
                    type: chartType,
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                }, {
                    name: '降水量',
                    type: chartType,
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                }],
            }
            return chartOption
        },
    },
    // 更新
    updated() {
        this.query()
    },
    // 在mounted函数中注册dom函数，因为vue会重新编译html模板
    mounted() {
        setTimeout(() => {
            let pieChart = echarts.init(this.$refs.pieChart)
            pieChart.setOption(this.getOption('pie'))   
        }, 10)
        this.$nextTick(() => {
            //
        })
        // let pieChart = echarts.init(this.$refs.pieChart);
        // pieChart.setOption(this.getOption('pie'));
    },
}
</script>
<style scoped>
    .chart {
        height: 200px;
        margin: 0px;
        padding: 0px;
    }

    h5 {
        margin-top: 30px;
        font-weight: bold;
    }

    h5:first-child {
        margin-top: 15px;
    }
</style>