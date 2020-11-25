<template>
  <fox-page group-title-width="120px">
    <fox-content>
      <fox-group title="数据来源" class="my-group" label-width="160px" column="1" style="width:70%">
        <fox-select-item require :source="m_items" v-model="value" disabled="false">普通数据源</fox-select-item>
        <fox-select-item :source="loadDataSource" v-model="value2">函数数据源</fox-select-item>
        <fox-select-item source="@sex.json" v-model="value3">文件数据源</fox-select-item>
        <fox-select-item source="globle/DD/selectList" v-model="value4">字典数据源</fox-select-item>
      </fox-group>
      <fox-group title="返回值类型" label-width="160px" column="1" style="width: 70%">
        <fox-select-item
                placeholder="请选择"
                :source="m_items"
                v-model="value5"
                value-type="text">返回Text</fox-select-item>
        <fox-select-item placeholder="请选择" :source="m_items" v-model="value6">返回Value</fox-select-item>
        <fox-select-item
                placeholder="请选择"
                :source="m_items"
                v-model="value7"
                value-type="item">返回Item</fox-select-item>
      </fox-group>
      <fox-group title="基础多选" label-width="160px" column="1" style="width: 70%">
        <fox-select-item required multiple placeholder="请选择" :source="m_items" v-model="value8">普通多选</fox-select-item>
        <fox-select-item
                multiple
                collapse-tags
                placeholder="请选择"
                value-type="item"
                :source="m_items"
                v-model="value9">Tag多选</fox-select-item>
      </fox-group>
      <fox-group title="状态/类型" label-width="160px" column="1" style="width: 70%">
        <fox-select-item disabled="true" placeholder="请选择" :source="m_items" v-model="value10">禁用状态</fox-select-item>
        <fox-select-item source="globle/DD/selectList" v-model="value11">分组</fox-select-item>
      </fox-group>
      <fox-group title="可搜索" label-width="100px" column="1" v-model="value12" style="width: 70%">
        <fox-select-item :source="loadDataSource" filterable v-model="value13">可搜索</fox-select-item>
        <fox-select-item
                v-model="value14"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod">远程搜索</fox-select-item>
        <fox-select-item
                v-model="value15"
                item-type="item"
                value-type="text"
                filterable
                remote
                :reserve-keyword="false"
                placeholder="请输入关键词"
                :remote-method="remoteMethod2">Item显示</fox-select-item>
        <fox-select-item
                v-model="value15"
                item-type="item"
                value-type="text"
                text-type="value"
                filterable
                remote
                :reserve-keyword="false"
                placeholder="请输入关键词"
                :remote-method="remoteMethod2">Item显示(value)</fox-select-item>
      </fox-group>
      <fox-group title="异构text/value" label-width="100px" colomn="1" style="width: 70%">
        <fox-select-item
                text-name="name"
                value-name="id"
                placeholder="请选择"
                :source="m_student"
                v-model="value17">异构</fox-select-item>
        <fox-select-item
                text-name="name"
                value-name="id"
                item-type="item"
                text-type="value"
                value-type="value"
                placeholder="请选择"
                :source="m_student"
                v-model="value18">异构(value)</fox-select-item>
      </fox-group>
      <fox-group title="联动" label-width="100px" column="1" style="width: 70%">
        <fox-item label="联动">
          <div class="my-items">
            <fox-select-item source="@sex.json" item-type="item" v-model="first"></fox-select-item>
            <fox-select-item source="@sex.json" item-type="item" v-model="second"></fox-select-item>
          </div>
        </fox-item>
      </fox-group>
      <fox-group title="过滤器" label-width="100px" column="2" style="width: 100%">
        <fox-select-item placeholder="请选择" :source="m_policy" v-model="policy">策略</fox-select-item>
        <fox-select-item source="@city.json" v-model="value19" :filter="m_filter">过滤</fox-select-item>
      </fox-group>
    </fox-content>
  </fox-page>
</template>

<script>
export default {
    name: 'example_select-item',
    // 数据
    data() {
        return {
            m_policy: [
                {
                    value: '01',
                    text: '一线城市',
                },
                {
                    value: '02',
                    text: '*州城市',
                },
                {
                    value: '03',
                    text: '所有城市',
                },
            ],
            m_filter: undefined,
            m_items: [
                {
                    value: '02',
                    text: '股东信用宝',
                },
                {
                    value: '5020020',
                    text: '抵押加成宝',
                },
                {
                    value: '5020030',
                    text: '工业宝',
                },
                {
                    value: '5020040',
                    text: '物业宝',
                },
                {
                    value: '5020050',
                    text: '按揭信用宝',
                },
                {
                    value: '5020060',
                    text: '宅基宝',
                },
                {
                    value: '5020070',
                    text: '动产全能宝',
                },
                {
                    value: '5020080',
                    text: '结算宝',
                },
                {
                    value: '5020090',
                    text: '快照宝',
                },
                {
                    value: '5020110',
                    text: '育鹰宝',
                },
                {
                    value: '5020120',
                    text: '精英信用宝',
                },
                {
                    value: '5020130',
                    text: '联贷宝',
                },
                {
                    value: '5020140',
                    text: '政银企外贸宝',
                },
                {
                    value: '5020150',
                    text: '设备升级宝',
                },
                {
                    value: '5020160',
                    text: '租厂宝',
                },
                {
                    value: '5020170',
                    text: '外汇全能宝',
                },
                {
                    value: '5020180',
                    text: '委托共赢宝',
                },
                {
                    value: '5020190',
                    text: '存单质押宝',
                },
                {
                    value: '5020200',
                    text: '应收账款质押宝',
                },
                {
                    value: '5020210',
                    text: '挂牌宝',
                },
                {
                    value: '5020220',
                    text: '政银科技宝',
                },
            ],
            m_student: [
                {
                    id: '001',
                    name: '刘德华',
                },
                {
                    id: '002',
                    name: '黎明',
                },
                {
                    id: '003',
                    name: '张学友',
                },
                {
                    id: '004',
                    name: '郭富城',
                },
            ],
            m_states: [
                'Alabama',
                'Alaska',
                'Arizona',
                'Arkansas',
                'California',
                'Colorado',
                'Connecticut',
                'Delaware',
                'Florida',
                'Georgia',
                'Hawaii',
                'Idaho',
                'Illinois',
                'Indiana',
                'Iowa',
                'Kansas',
                'Kentucky',
                'Louisiana',
                'Maine',
                'Maryland',
                'Massachusetts',
                'Michigan',
                'Minnesota',
                'Mississippi',
                'Missouri',
                'Montana',
                'Nebraska',
                'Nevada',
                'New Hampshire',
                'New Jersey',
                'New Mexico',
                'New York',
                'North Carolina',
                'North Dakota',
                'Ohio',
                'Oklahoma',
                'Oregon',
                'Pennsylvania',
                'Rhode Island',
                'South Carolina',
                'South Dakota',
                'Tennessee',
                'Texas',
                'Utah',
                'Vermont',
                'Virginia',
                'Washington',
                'West Virginia',
                'Wisconsin',
                'Wyoming',
            ],
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
            value11: '',
            value12: '',
            value13: '',
            value14: '',
            value15: '',
            value16: '',
            value17: '',
            value18: '',
            value19: '',
            first: '',
            second: '',
            policy: '',
        }
    },
    watch: {
        policy(newVal) {
            this.value17 = ''
            if (newVal == '01') {
                this.m_filter = (item) => {
                    let list = ['北京', '上海', '广州', '深圳']
                    if (list.indexOf(item.text) != -1) {
                        return true
                    }
                    return false
                }
            } else if (newVal == '02') {
                this.m_filter = (item) => item.text.indexOf('州') != -1
            } else {
                this.m_filter = undefined
            }
        },
        first(newVal) {
            this.second = newVal
        },
        value(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value:' + newVal)
        },
        value2(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value2:' + newVal)
        },
        value3(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value3:' + newVal)
        },
        value4(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value4:' + newVal)
        },
        value5(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value5:' + newVal)
        },
        value6(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value6:' + newVal)
        },
        value7(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value7:' + newVal)
        },
        value8(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value8:' + newVal)
        },
        value9(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value9:' + newVal)
        },
        value10(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value10:' + newVal)
        },
        value11(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value11:' + newVal)
        },
        value12(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value12:' + newVal)
        },
        value13(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value13:' + newVal)
        },
        value14(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value14:' + newVal)
        },
        value15(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value15:' + newVal)
        },
        value16(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value16:' + newVal)
        },
        value17(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value16:' + newVal)
        },
        value18(newVal, oldVal) {
            if (typeof newVal === 'object') {
                newVal = JSON.stringify(newVal)
            }
            console.info('----------> value16:' + newVal)
        },
    },
    // 方法
    methods: {
        // 加载数据源
        loadDataSource(lang) {
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    let items
                    if (lang == 'en') {
                        items = [
                            {
                                value: '001',
                                text: 'Beijing',
                            },
                            {
                                value: '002',
                                text: 'Shanghai',
                            },
                            {
                                value: '003',
                                text: 'Guangzhou',
                            },
                            {
                                value: '004',
                                text: 'Shenzhen',
                            },
                        ]
                    } else {
                        items = [
                            {
                                value: '001',
                                text: '北京',
                            },
                            {
                                value: '002',
                                text: '上海',
                            },
                            {
                                value: '003',
                                text: '广州',
                            },
                            {
                                value: '004',
                                text: '深圳',
                            },
                        ]
                    }
                    resolve(items)
                }, 100)
            })
            return promise
        },

        // 远程搜索函数，必须返回一个Promise
        remoteMethod(query) {
            if (query && query.length > 0) {
                return new Promise((resolve, reject) => {
                    let items = this.m_states.filter((item) => item.indexOf(query.toLowerCase()) > -1)
                    resolve(items)
                })
            } else {
                return Promise.resolve([])
            }
        },

        // 远程搜索函数，必须返回一个Promise
        remoteMethod2(query) {
            if (query && query.length > 0) {
                return new Promise((resolve, reject) => {
                    let items = this.m_items.filter((item) => (
                        item.value.indexOf(query.toLowerCase()) > -1
                                || item.text.indexOf(query.toLowerCase()) > -1
                    ))
                    resolve(items)
                })
            } else {
                return Promise.resolve([])
            }
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
            mounted(session, context) {
                context.resolve()
            },

            /**
                 * 销毁处理
                 */
            beforeDestroy(session) {},

            /**
                 * 消息
                 * @param type
                 * @param data
                 */
            onMessage(type, data) {},

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

<style scoped>
  .my-items {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
  }
</style>