<template>
    <fox-page>
        <fox-content>
            <fox-group title="表格组件" class="my-group" column="1" style="width:100%">
                <fox-item>
                    <fox-button class="el-button--primary" @click="getSelected">获取当前选中行</fox-button>
                </fox-item>
                <fox-table-item ref="tableFirst" border id="fx_table_01" :content="tableData" page-index="1" :page-sizes="[5, 10, 20, 30]"
                                :page-size="5" :show-header="true" :show-tool="false" :ignore-empty-column="false"
                                @row-click="rowClick" @current-change="currentChange" @selection-change="selectionChange"
                                highlight-current-row :max-column-width="300" :min-column-width="90">
                    <fox-table-column type="selection" :selectable="allowSelect" ></fox-table-column>
                    <fox-table-column prop="date" label="日期"></fox-table-column>
                    <fox-table-column prop="name" label="姓名"></fox-table-column>
                    <fox-table-column prop="address" label="地址"></fox-table-column>
                    <fox-table-column prop="sex" label="性别" :formatter="formatter"></fox-table-column>
                    <fox-table-column prop="ops" label="操作">
                      <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small">
                          移除
                        </el-button>
                        <el-button
                            type="text"
                            size="small">
                          编辑
                        </el-button>
                        <el-button
                            type="text"
                            size="small">
                          新增
                        </el-button>
                      </template>
                    </fox-table-column>
                </fox-table-item>
            </fox-group>

            <fox-group title="远程数据源" class="my-group" label-width="80px" column="2" style="width:100%;margin-top: 20px">
                <fox-text-item v-model="params.name">姓名</fox-text-item>
                <fox-date-item v-model="params.date">日期</fox-date-item>
                <fox-item>
                    <fox-button type="primary" @click="reloadTable">查询</fox-button>
                    <fox-button @click="resetTable">重置</fox-button>
                </fox-item>
                <fox-checkbox-item :source="[{text:'更改数据源',value:'01'}]" v-model="changeSrc"></fox-checkbox-item>
                <fox-table-item id="fx_table_02" ref="table" auto-refresh="false" :content="m_url" page-index="1" :page-sizes="[10, 50, 100, 200]"
                                :page-size="10" :base-params="baseParams" :params="params"
                                highlight-current-row>
                    <fox-table-column prop="date" label="日期" width="180"></fox-table-column>
                    <fox-table-column prop="name" label="姓名" width="180"></fox-table-column>
                    <fox-table-column prop="sex" label="性别" :formatter="formatter"></fox-table-column>
                    <fox-table-column prop="address" label="地址"></fox-table-column>
                    <fox-table-column prop="phone" label="电话"></fox-table-column>
                </fox-table-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
// import SexMapping from '@/assets/mapping/sex.json'
export default {
    name: 'example_table-item',
    // 数据
    data() {
        let list = []
        for(let i = 0; i < 200; i++) {
            list.push({
                date: '2016-05-02',
                name: `王小虎${i}`,
                sex: '01',
                address: '上海市普陀区金沙江路 1518 弄',
                index: `${i}`,
            })
        }

        return {
            m_url: 'mock/table/getData',
            mShow: false,
            mStyle: {},
            mContentStyle: {},
            mCurTarget: undefined,
            m_columns: [
                { name: 'date', text: '日期', index: 0 },
                { name: 'name', text: '姓名', index: 1 },
                { name: 'address', text: '地址', index: 2 },
                { name: 'phone', text: '电话', index: 3 },
                { name: 'sex', text: '性别', index: 4 },
            ],
            columns: undefined,
            tableData: list,
            // base参数
            baseParams: {
                name: 'base_table',
            },
            // 参数
            params: {
                name: '',
                date: 0,
            },
            changeSrc: [],
        }
    },
    // 监控
    watch: {
        changeSrc(newVal) {
            if(newVal.length == 0) {
                this.m_url = 'mock/table/getData'
            }else{
                this.m_url = 'mock/table/getData2'
            }
        },
    },
    // 计算
    computed: {

    },
    // 方法
    methods: {
        // 是否能选中
        allowSelect(row, index) {
            if(row.name == '王小虎0') {
                return false
            }
            return true
        },
        getSelected() {
            let row = this.$refs.tableFirst.getCurrentRow()
            console.info(`select row: ${JSON.stringify(row)}`)
        },
        selectionChange(selection) {
            console.info('select change: ' + JSON.stringify(selection))
        },
        rowClick(row, column, event) {
            console.info(JSON.stringify(row))
        },
        currentChange(currentRow, oldCurrentRow) {
            console.info(`current row:${JSON.stringify(currentRow)}`)
            console.info(`old row:${oldCurrentRow}`)
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`)
        },
        reloadTable() {
            this.$refs.table.refresh()
            this.$tip('加载数据')
        },
        resetTable() {
            this.$refs.table.reset()
            this.$tip('清空表格数据', this.$refs.table)
        },
        // 格式化
        formatter(row, column) {
            let val = row[column.property]
            // let text = SexMapping[val] || val
            let text = fox.custom.mapping(this, 'sex.json', val)
            return text
        },
    },

    // Fox流程
    fox_flow() {
        return {
            /**
                 * 界面渲染后，更改数据会触发钩子函数
                 * @param session
                 * @param context
                 */
            mounted(session, context) {
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
                console.info('submit流程')
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

<style>
    .my-group{
        position: relative;
    }
</style>