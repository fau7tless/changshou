<template>
    <fox-page>
        <fox-content>
            <fox-group no="1" title="日期选择器" class="my-group" label-width="100px" column="3" style="width:100%">
                <fox-date-item v-model="value" placeholder="选择日期">普通</fox-date-item>
                <fox-date-item v-model="value" type="datetime" placeholder="选择日期时间">日期时间</fox-date-item>
                <fox-date-item v-model="value2" align="right" placeholder="选择日期"
                               :picker-options="m_pickerOptions">带快捷选项</fox-date-item>
            </fox-group>
            <fox-group no="2" title="日期单位" class="my-group" label-width="100px" column="3" style="width:100%">
                <fox-date-item v-model="value3" type="week" format="yyyy 第 WW 周" placeholder="选择周">周</fox-date-item>
                <fox-date-item v-model="value4" type="month" placeholder="选择月">月</fox-date-item>
                <fox-date-item v-model="value5" type="year" placeholder="选择年">年</fox-date-item>
                <fox-date-item type="dates" v-model="value6" placeholder="选择一个或多个日期">多个日期</fox-date-item>
            </fox-group>
            <fox-group no="3" title="选择范围" class="my-group" label-width="100px" column="1" style="width:50%">
                <fox-date-item
                        value-format="yyyy-MM-dd"
                        :start-date.sync="startDate"
                        :end-date.sync="endDate"
                        v-model="value7"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">默认</fox-date-item>
                <fox-date-item
                        value-format="yyyy-MM-dd"
                        :start-date.sync="startDate2"
                        :end-date.sync="endDate2"
                        :end-date-offset="1"
                        v-model="value8"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="m_pickerOptions">带快捷选项</fox-date-item>
            </fox-group>
            <fox-group no="4" title="月份范围" class="my-group" label-width="100px" column="1" style="width:50%">
                <fox-date-item
                        v-model="value9"
                        type="monthrange"
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                >默认</fox-date-item>
                <fox-date-item
                        v-model="value10"
                        type="monthrange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始月份"
                        end-placeholder="结束月份"
                        :picker-options="m_pickerOptions"
                >带快捷选项</fox-date-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 'example_date-item',
    // 数据
    data: function(){
        return {
            m_pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date())
                        },
                    },
                    {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24)
                            picker.$emit('pick', date)
                        },
                    },
                    {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date()
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', date)
                        },
                    },
                ],
            },
            value: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            value8: '',
            value9: '',
            value10: '',
            startDate:'',
            endDate:'',
            startDate2:'',
            endDate2:'',
        }
    },
    // watch
    watch: {
        value(newVal, oldVal){
            console.info('------------> value:' + newVal)
        },
        value2(newVal, oldVal){
            console.info('------------> value2:' + newVal)
        },
        value3(newVal, oldVal){
            console.info('------------> value3:' + newVal)
        },
        startDate(newVal){
            console.info('------------> start:'+newVal)
        },
        endDate(newVal){
            console.info('------------> end:'+newVal)
        },
        startDate2(newVal){
            console.info('------------> start:'+newVal)
        },
        endDate2(newVal){
            console.info('------------> end:'+newVal)
        }
    },
    // 方法
    methods: {
        onFocus(event){
            console.info('----------> focus')
        },
        onBlur(event){
            console.info('----------> blur')
        },
    },
    // Fox流程
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
                // 触发check函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交前处理
                 * @param context
                 * @param checkResult
                 */
            preSubmit(context, checkResult){
                console.info('pre submit流程')

                // 触发submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交处理
                 * @param context
                 * @param args
                 */
            submit(context){
                console.info('submit流程')
                // 触发post submit函数调用(必须执行context.resolve或context.reject)
                context.resolve()
            },

            /**
                 * 提交后处理
                 * @param context
                 * @param params
                 */
            postSubmit(context){
                console.info('post submit流程')
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
    },
}
</script>

<style scoped>

</style>