<template>
    <fox-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="90%" center>
        <fox-container>
            <fox-main class="left-main">
                <fox-form ref="temp" :model="temp" size="small" class="rule-block">
                    <section class="rule-section">
                        <fox-group class="left-input" column="1" label-width="80px" label-position="right">
                            <fox-select-item v-model="temp.serverCode" :source="m_status" placeholder="请选择服务码">服务码</fox-select-item>
                        </fox-group>
                    </section>
                    <div v-for="(item,index) in temp.ruleList" :key="index">
                        <fox-divider content-position="left">{{item.ruleType==='0'?'公共':'私有'}}规则</fox-divider>
                        <section class="rule-section">
                            <fox-group class="left-input" column="2" label-width="80px" label-position="right">
                                <fox-text-item v-model="item.ruleName" placeholder="请输入规则名称">规则名称</fox-text-item>
                                <fox-select-item v-model="item.isOpen" :source="m_status" placeholder="">是否启用</fox-select-item>
                            </fox-group>
                        </section>
                        <section class="rule-section">
                            <fox-group class="left-input" column="1" label-width="80px" label-position="right">
                                <fox-item label="判断条件">
                                    <div class="drag-block">
                                        <draggable class="condition-area" :list="item.conditionList" v-bind="{group:{name:(item.ruleType==='0'||item.isCondition==0||operation=='detail')?'other':sign },index: index, filter:'.undraggable,', sort:false}" @add="add" @start="start" @end="end" @change="onChange">
                                            <span v-for="(mem,i) in item.conditionList" :key="i" :class="{undraggable:mem.flag||operation==='detail'||item.ruleType==='0'}" @mouseenter="enter(i,item,index)" @contextmenu="showContextMenu($event,index)">
                                                <fox-button v-if="mem.compId=='001'" type="success" size="small" circle @click="symbolChange(item.ruleType)">{{mem.compName}}</fox-button>
                                                <fox-button v-else-if="mem.compId=='002'" type="danger" size="small" circle @click="symbolChange(item.ruleType)">{{mem.compName}}</fox-button>
                                                <span v-else-if="mem.compId=='003'||mem.compId==='004'" size="small" class="bracket">{{mem.name}}</span>
                                                <fox-button v-else size="small" @dblclick.native="condition">{{mem.desc?mem.desc:mem.compName}}</fox-button>
                                            </span>
                                        </draggable>
                                    </div>
                                </fox-item>
                            </fox-group>
                            <fox-button-row class="right-button">
                                <fox-button size="small" @click.prevent="removeRule(item, index)">删除规则</fox-button>
                                <fox-button size="small" @click="addEvent(index)">添加事件</fox-button>
                            </fox-button-row>
                        </section>
                        <event :event-operation="eventOperation" :event-list="item.eventList" :rule-type="item.ruleType" @removeEvent="removeEvent($event,index)"></event>
                    </div>
                </fox-form>
                <fox-group label-width="80px">
                    <fox-button-row align="center">
                        <fox-button type="success" size="mini" @click="doSave">提交</fox-button>
                        <fox-button type="primary" size="mini" @click="preAddRule">添加规则</fox-button>
                        <fox-button type="danger" size="mini" @click="reset">重置</fox-button>
                    </fox-button-row>
                </fox-group>
            </fox-main>
            <fox-aside class="right-aside" style="width: 18vw">
                <draggable :list="symbolList" v-bind="{group:{name:sign1, pull:'clone'}, filter:'.undraggable', sort:false}" @start="start1" @end="end1">
                    <span v-for="(item, index) in symbolList" :key="index">
                        <fox-button v-if="item.compId!=='001'&&item.compId!=='002'" class="aside-button" slot="reference" round>{{item.compId === '003' ? (item.name + ' )') : item.compName}}</fox-button>
                    </span>
                </draggable>
                <draggable :list="componentList" v-bind="{group:{name:sign2, pull:'clone'}, filter:'.undraggable', sort:false}" @start="start2" @end="end2">
                    <span v-for="(item, index) in componentList" :key="index">
                        <fox-button class="aside-button" slot="reference" round>{{item.compName}}</fox-button>
                    </span>
                </draggable>
            </fox-aside>
        </fox-container>

        <vue-context-menu id="menu" :context-menu-data="menuData" style="padding-left:0" @remove="remove" @symbol="symbol" @condition="condition"></vue-context-menu>

        <fox-dialog :title="innerTitle" :visible.sync="innerVisible" width="80%" append-to-body center class="public" @close="paramFormIndex=''">
            <fox-container>
                <fox-main class="left-p0">
                    <fox-form ref="conditionForm" :model="conditionForm" :disabled="paramFormDisabled">
                        <fox-group label-width="80px" column="1" label-position="right">
                            <fox-text-item v-model="conditionForm.compName" @input="$forceUpdate()">条件名称</fox-text-item>
                        </fox-group>
                        <fox-divider content-position="left">参数</fox-divider>
                        <fox-group label-width="80px" column="1" label-position="right">
                            <fox-item v-for="(item, index) in conditionForm.paramForm" :label="item.paramName" :key="index">
                                <fox-text-item v-if="!item.paramSource||item.paramSource ==='NULL'" v-model="item.paramPath" @blur="selectInput(index)" @clear="item.paramComment=''"></fox-text-item>
                                <fox-select-item v-else v-model="item.paramPath" :source="m_compareType" placeholder="请选择"></fox-select-item>
                            </fox-item>
                            <fox-button-row align="center">
                                <fox-button type="success" size="mini" @click="sync">确定</fox-button>
                                <fox-button type="danger" size="mini" @click="innerClear">取消</fox-button>
                            </fox-button-row>
                        </fox-group>
                    </fox-form>
                    <fox-footer></fox-footer>
                </fox-main>
                <fox-aside>
                    <fox-tabs v-model="activeName" type="border-card" @click="handleClick">
                        <fox-tab-pane label="公共报文" name="public">
                            <fox-table-item :content="m_publicParamData" stripe highlight-current-row tool-layout="" height="300" :show-header=false @row-click="rowClick">
                                <fox-table-column label="">
                                    <template slot-scope="scope">
                                        {{scope.row.code+'('+scope.row.comment+')'}}
                                    </template>
                                </fox-table-column>
                            </fox-table-item>
                        </fox-tab-pane>
                    </fox-tabs>
                </fox-aside>
            </fox-container>
        </fox-dialog>
        <fox-dialog :title="innerTitle1" :visible.sync="innerVisible1" width="500px" append-to-body center>
            <fox-form ref="ruleForm" :model="ruleForm">
                <fox-group column="1" label-width="80px">
                    <fox-select-item v-model="ruleForm.ruleType" :source="m_ruleType" :rules="{
                            required: true, message: '规则类型不能为空', trigger: 'blur'
                        }" label="规则类型"></fox-select-item>
                    <fox-select-item :source="queryPublicRules" v-if="ruleForm.ruleType=='0'" :rules="{
                            required: true, message: '规则名称不能为空', trigger: 'blur'
                        }" label="规则名称"></fox-select-item>
                    <fox-button-row align="center">
                        <fox-button type="success" size="medium" @click="addRule">确定</fox-button>
                        <fox-button type="danger" size="medium" @click="innerVisible1=false">取消</fox-button>
                    </fox-button-row>
                </fox-group>
            </fox-form>
        </fox-dialog>
    </fox-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import { getPublicRules } from '@/api/request/rule/rule.js'
import event from './event'

let count = 0
let logicOrder = 1
export default {
    name: 'ServiceRuleDetail',
    components: {
        draggable,
        event,
    },
    props: {
        // 弹框标题
        dialogTitle: {
            type: String,
            default: '添加规则',
        },
        // 操作类型
        operation: {
            type: String,
            default: '',
        },
        // 传输参数
        params: {
            type: Object,
            default() {
                return {}
            },
        },
    },
    data: function () {
        return {
            dialogVisible: false,
            innerVisible: false,
            innerVisible1: false,
            innerTitle: '',
            innerTitle1: '',
            sign: 'condition',
            sign1: '',
            sign2: '',
            index: '',
            eventOperation: '',
            contextType: '1',
            activeName: 'public',
            paramFormDisabled: false,
            ruleForm: {},
            temp: {
                ruleName: '',
                isOpen: '',
            },
            menuData: {
                menuName: 'contextName',
                axis: { x: null, y: null },
                menulists: [],
            },
            tempData: [],
            m_ruleType: [
                {
                    value: '1',
                    text: '私有规则',
                },
                {
                    value: '0',
                    text: '公共规则',
                },
            ],
            symbolList: [
                {
                    compName: '且',
                    compId: '001',
                    flag: true,
                },
                {
                    compName: '或',
                    compId: '002',
                    flag: true,
                },
                {
                    name: '(',
                    compId: '003',
                    flag: true,
                },
                {
                    compName: '必须执行',
                    compId: '005',
                    flag: true,
                },
            ],
            componentList: [
                {
                    compId: '1',
                    compClass: 'rCompare1',
                    compName: '大于',
                    compDes: '用于数字、金额、字符串的比较',
                    flag: false,
                },
                {
                    compId: '2',
                    compClass: 'rCompare2',
                    compName: '大于等于',
                    compDes: '用于数字、金额、字符串的比较',
                    flag: false,
                },
                {
                    compId: '3',
                    compClass: 'rCompare3',
                    compName: '小于',
                    compDes: '用于数字、金额、字符串的比较',
                    flag: false,
                },
                {
                    compId: '4',
                    compClass: 'rCompare4',
                    compName: '小于等于',
                    compDes: '用于数字、金额、字符串的比较',
                    flag: false,
                },
                {
                    compId: '5',
                    compClass: 'rCompare0',
                    compName: '等于',
                    compDes: '用于各种类型的数据比较',
                    flag: false,
                },
                {
                    compId: '6',
                    compClass: 'rCompare5',
                    compName: '不等于',
                    compDes: '用于数字、金额、字符串的比较',
                    flag: false,
                },
            ],
            m_status: [
                {
                    value: '1',
                    text: '是',
                },
                {
                    value: '0',
                    text: '否',
                },
            ],
            tempConditionForm: [],
            conditionForm: {
                logicOrder: '',
                compName: '',
            },
            m_comParams: [
                {
                    id: '1',
                    compId: '1',
                    paramName: '比较类型',
                    paramOrder: '1',
                    paramSource: 'RULE_COMPONENT_TYPE',
                },
                {
                    id: '2',
                    compId: '1',
                    paramName: '基准值',
                    paramOrder: '2',
                    paramSource: null,
                },
                {
                    id: '3',
                    compId: '1',
                    paramName: '比较值',
                    paramOrder: '3',
                    paramSource: null,
                },
            ],
            m_compareType: [
                {
                    code: '1',
                    text: '字符串',
                    child: null,
                },
                {
                    code: '2',
                    text: '数字',
                    child: null,
                },
                {
                    code: '3',
                    text: '金额',
                    child: null,
                },
            ],
            m_publicParamData: [
                {
                    id: '201912160000000202',
                    serverId: '201912160000000201',
                    code: 'orgNo',
                    type: '1',
                    comment: '机构编号',
                    valueType: '2',
                    length: '6',
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: null,
                },
                {
                    id: '201912160000000203',
                    serverId: '201912160000000201',
                    code: 'userId',
                    type: '1',
                    comment: '柜员id',
                    valueType: '1',
                    length: '20',
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: '1',
                },
                {
                    id: '201912160000000205',
                    serverId: '201912160000000201',
                    code: 'customState',
                    type: '2',
                    comment: '状态码',
                    valueType: '2',
                    length: '6',
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: '1',
                },
                {
                    id: '201912230000001847',
                    serverId: '201912160000000201',
                    code: 'channel',
                    type: '1',
                    comment: '渠道（YT-柜面，YB-自助VTM）',
                    valueType: '2',
                    length: null,
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: null,
                },
                {
                    id: '201912230000001848',
                    serverId: '201912160000000201',
                    code: 'amt',
                    type: '1',
                    comment: '交易金额',
                    valueType: '2',
                    length: null,
                    sourceId: null,
                    isNull: null,
                    parentId: null,
                    isrequire: null,
                },
                {
                    id: '201912230000001849',
                    serverId: '201912160000000201',
                    code: 'ccy',
                    type: '1',
                    comment: '交易币种',
                    valueType: '2',
                    length: null,
                    sourceId: null,
                    isNull: null,
                    parentId: null,
                    isrequire: null,
                },
                {
                    id: '201912230000001851',
                    serverId: '201912160000000201',
                    code: 'verifyRet',
                    type: '1',
                    comment: '联网核查结果',
                    valueType: '2',
                    length: null,
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: null,
                },
                {
                    id: '201912230000001852',
                    serverId: '201912160000000201',
                    code: 'sealRet',
                    type: '1',
                    comment: '验印结果',
                    valueType: '2',
                    length: null,
                    sourceId: null,
                    isNull: null,
                    parentId: null,
                    isrequire: null,
                },
                {
                    id: '201912230000001853',
                    serverId: '201912160000000201',
                    code: 'faceRet',
                    type: '1',
                    comment: '人脸识别结果',
                    valueType: '2',
                    length: null,
                    sourceId: null,
                    isNull: null,
                    parentId: null,
                    isrequire: null,
                },
                {
                    id: '202001200000003246',
                    serverId: '201912160000000201',
                    code: 'accoutNo',
                    type: '1',
                    comment: '帐号',
                    valueType: '2',
                    length: null,
                    sourceId: null,
                    isNull: null,
                    parentId: null,
                    isrequire: '1',
                },
                {
                    id: '202001200000003247',
                    serverId: '201912160000000201',
                    code: 'proxyFlag',
                    type: '1',
                    comment: '代理标记（0-否，1-非员工代理，2-强员工代理，3-弱员工代理）',
                    valueType: '2',
                    length: null,
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: '1',
                },
                {
                    id: '202001200000003249',
                    serverId: '201912160000000201',
                    code: 'inputType',
                    type: '1',
                    comment: '帐号录入方式（1-刷卡读磁，2-身份证，3-手动录入，4-手机银行扫码）',
                    valueType: '2',
                    length: null,
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: '1',
                },
                {
                    id: '202001200000003250',
                    serverId: '201912160000000201',
                    code: 'ocrRet',
                    type: '1',
                    comment: '签字识别结果（0-不通过，1-通过）',
                    valueType: '2',
                    length: null,
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: '1',
                },
                {
                    id: '202004150000000087',
                    serverId: '201912160000000201',
                    code: 'custBlack',
                    type: '1',
                    comment: '客户黑名单属性值（1-电信诈骗黑名单,2-他行代领我行存款黑名单,4-风险预警黑名单,8-反洗钱黑名单,16-惠民贷灰名单）',
                    valueType: '2',
                    length: null,
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: null,
                },
                {
                    id: '202004160000000101',
                    serverId: '201912160000000201',
                    code: 'custRiskLevel',
                    type: '1',
                    comment: '客户风险等级(1-低风险，2-较低风险，3-一般风险，4-较高风险，5-高风险)',
                    valueType: '2',
                    length: null,
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: '0',
                },
                {
                    id: '202004220000000121',
                    serverId: '201912160000000201',
                    code: 'seatFlag',
                    type: '1',
                    comment: '代客办理标记（1-是，其他-否）',
                    valueType: '2',
                    length: '1',
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: '0',
                },
                {
                    id: '202004260000000141',
                    serverId: '201912160000000201',
                    code: 'custIdInputType',
                    type: '1',
                    comment: '客户身份证录入方式（1-手动，其他-自动）',
                    valueType: '2',
                    length: null,
                    sourceId: null,
                    isNull: null,
                    parentId: null,
                    isrequire: '0',
                },
                {
                    id: '202005140000000001',
                    serverId: '201912160000000201',
                    code: 'agentVerifyRet',
                    type: '1',
                    comment: '代理人联网核查结果',
                    valueType: '2',
                    length: null,
                    sourceId: '',
                    isNull: '',
                    parentId: '',
                    isrequire: '0',
                },
            ],
        }
    },
    watch: {
        dialogVisible: {
            handler(newVal, oldVal) {
                if (newVal !== oldVal && newVal === true) {
                    this.initData()
                }
            },
        },
        operation: {
            handler(newVal, oldVal) {
                this.ruleOperation = newVal
                this.initData()
                if (newVal === 'detail') {
                    this.sign = 'other'
                    this.eventDisable = true
                } else {
                    this.sign = 'condition'
                    this.eventDisable = false
                }
            },
        },
    },
    methods: {
        initData() {
            this.sign = 'condition'
            if (this.operation === 'add') {
                this.doReset()
            } else if (this.operation === 'detail' || this.operation === 'update') {
                this.doReset()
                let {row} = this.params
                let params = {}
                params.serverCode = row.code
                // 待修改
                this.getRuleDetail(row.ruleId).then((res) => {
                    console.log(res)
                    if (res.data.ruleList) {
                        let {ruleList} = res.data
                        // 待修改
                    }
                    let data = res.list.conditionList
                    let i = 0
                    data.forEach((item) => {
                        if (item.compId === '003') {
                            item.count = i
                            i++
                        }
                    })
                    i = 0
                    data.forEach((item) => {
                        if (item.compId === '004') {
                            item.count = i
                            i++
                        }
                    })
                    data.forEach((item) => {
                        if (['001', '002', '003', '004'].indexOf(item.compId) !== -1) {
                            item.flag = true
                        }
                    })
                    if (res.data.isCondition === '0') {
                        this.conditionList = []
                        this.conditionList.push(this.symbolList[3])
                        this.sign = 'justDoIt'
                    } else {
                        this.conditionList = this.detail(data)
                    }
                    let {eventList} = res.data
                    eventList.forEach((item) => {
                        if (item.authRole) {
                            if (item.authType === '1') {
                                item.authRole = item.authRole.split(',')
                            }
                        }
                        if (item.authChannel) {
                            if (item.authChannel === '11') {
                                temp = ['云银行', '移动厅堂']
                            }
                            if (item.authChannel === '10') {
                                temp = ['云银行']
                            }
                            if (item.authChannel === '01') {
                                temp = ['移动厅堂']
                            }
                            item.checkList = temp
                        }
                    })

                    this.pushEventList = eventList
                })
            }
            this.$nextTick(() => {
                this.$refs.temp.clearValidate()
            })
        },
        // 拖拽添加条件
        add(ev) {
            this.itemIndex = Number(ev.to.__vue__.$attrs.index)
            let temp = this.temp.ruleList[this.itemIndex].conditionList
            if (ev.item.textContent === '必须执行') {
                temp = []
                temp.push(this.symbolList[3])
                this.temp.ruleList[this.itemIndex].conditionList = temp
                this.temp.ruleList[this.itemIndex].isCondition = 0
                return
            }
            let index = ev.newIndex
            if (ev.item.textContent === '( )') {
                let objR = {
                    name: ')',
                    compId: '004',
                    flag: true,
                    count: count,
                }
                let objL = {
                    name: '(',
                    compId: '003',
                    flag: true,
                    count: count,
                }
                temp.splice(index, 1, objL)
                if (temp.length - 1 === index) {
                    temp.push(objR)
                } else {
                    if (['001', '002'].indexOf(temp[index + 1].compId) !== -1) {
                        temp.splice(index, 1)
                        this.$message({
                            type: 'warning',
                            message: '运算符不能添加括号',
                        })
                        return
                    }
                    temp.splice(index + 2, 0, objR)
                }
                count++
            }
            let a = {}
            if (ev.item.textContent === '必须执行') {
                index = 0
            }
            if (temp[index].compName === ev.item.textContent && !temp[index].flag) {
                a.compName = temp[index].compName
                a.compId = temp[index].compId
                a.compClass = temp[index].compClass
                a.logicOrder = logicOrder
                temp.splice(index, 1, a)
                logicOrder++
            }
            if (temp.length === 2 && temp[index].compId === '003') {
                return
            }
            if (temp.length < 2) {
                return
            }
            let b = this.symbolList[0]
            b.flag = true
            if (index === 0 && temp[index].compId !== '003') {
                temp.splice(1, 0, b)
            }
            if (['001', '002'].indexOf(temp[index].compId) === -1 && temp[index - 1] && ['001', '002'].indexOf(temp[index - 1].compId) === -1 && temp[index - 1].compId !== '003') {
                temp.splice(index, 0, b)
            }
            if (temp[index - 1] && (['001', '002', '003'].indexOf(temp[index - 1].compId) !== -1) && (!temp[index + 1].flag || temp[index + 1].compId === '003') && temp[index].compId !== '003') {
                temp.splice(index + 1, 0, b)
            }
            if ((['001', '002'].indexOf(temp[index].compId) !== -1) && temp[index - 1] && (['001', '002'].indexOf(temp[index - 1].compId) !== -1)) {
                temp.splice(index, 1)
                this.$message({
                    type: 'warning',
                    message: '运算符不可重复',
                })
            }
            this.temp.ruleList[this.itemIndex].conditionList = temp
        },
        // 条件列表拖拽
        onChange(ev) {
            let temp = this.conditionList
            if (ev.added && ev.added.element.compId === '005') {
                temp = []
                temp.push(ev.added.element)
                this.sign = 'justDoIt'
            }
            if (ev.moved) {
                let el = this.symbolList[0]
                el.flag = true
                let a = ev.moved.oldIndex
                let b = ev.moved.newIndex
                if (a < b) {
                    if (!temp[b - 1].flag) {
                        temp.splice(b, 0, el)
                        if (temp[a].compId !== '004') {
                            temp.splice(a, 1)
                        } else if (temp[a - 1].compId !== '003') {
                            temp.splice(a - 1, 1)
                        }
                    } else if ((['001', '002'].indexOf(temp[b - 1].compId) !== -1) && (!temp[b + 1].flag || temp[b + 1].compId === '003')) {
                        temp.splice(b + 1, 0, el)
                        if (temp[a].compId !== '004') {
                            temp.splice(a, 1)
                        } else if (['001', '002'].indexOf(temp[a - 1].compId) !== -1) {
                            temp.splice(a - 1, 1)
                        }
                    }
                    if (temp[b - 1].compId === '003') {
                        if (!temp[b + 1].flag || temp[b + 1].compId === '003') {
                            temp.splice(b + 1, 0, el)
                        }
                        if (temp[a - 1] && ['001', '002'].indexOf(temp[a - 1].compId) !== -1) {
                            temp.splice(a - 1, 1)
                        } else if (temp[a].compId !== '004') {
                                temp.splice(a, 1)
                            }
                    }
                    if (temp[b - 1].compId === '004') {
                        temp.splice(b, 0, el)
                        if (['001', '002'].indexOf(temp[a].compId) !== -1) {
                            temp.splice(a, 1)
                        } else if (['001', '002'].indexOf(temp[a - 1].compId) !== -1) {
                            temp.splice(a - 1, 1)
                        }
                    }
                }
                if (a > b) {
                    if (['001', '002'].indexOf(temp[b + 1].compId) !== -1) {
                        if (temp[a + 1] && ['003', '004'].indexOf(temp[a + 1].compId) === -1) {
                            temp.splice(a + 1, 1)
                        } else if (['001', '002'].indexOf(temp[a].compId) !== -1) {
                            temp.splice(a, 1)
                        }
                        temp.splice(b, 0, el)
                    } else if (temp[b + 1].compId === '004' && temp[b - 1].compId !== '003') {
                        if (temp[a + 1] && ['003', '004'].indexOf(temp[a + 1].compId) === -1) {
                            temp.splice(a + 1, 1)
                        } else if (['003', '004'].indexOf(temp[a].compId) === -1) {
                            temp.splice(a, 1)
                        }
                        temp.splice(b, 0, el)
                    } else if (temp[a].compId !== '003') {
                            temp.splice(a, 1)
                            if (!temp[b + 1].flag || temp[b + 1].compId === '003') {
                                temp.splice(b + 1, 0, el)
                            }
                        } else {
                            if (temp[a + 1].compId !== '004') {
                                temp.splice(a + 1, 1)
                            }
                            if (['001', '002', '004'].indexOf(temp[b + 1].compId) === -1) {
                                temp.splice(b + 1, 0, el)
                            }
                        }
                }
                if (['001', '002'].indexOf(temp[temp.length - 1].compId) !== -1) {
                    temp.pop()
                }
                if (['001', '002'].indexOf(temp[0].compId) !== -1) {
                    temp.shift()
                }
            }
            this.conditionList = temp
        },
        start() {
            this.sign1 = 'delete'
            this.sign2 = 'delete'
        },
        end() {
            this.sign1 = 'condition'
            this.sign2 = 'condition'
        },
        start1() {
            this.sign1 = 'condition'
        },
        end1() {
            this.sign1 = 'sign1'
        },
        start2() {
            this.sign2 = 'condition'
        },
        end2() {
            this.sign2 = 'sign2'
        },
        // 符号切换
        symbol() {
            if (this.operation === 'detail') {
                return
            }
            let a = this.symbolList[0]
            let b = this.symbolList[1]
            a.flag = true
            b.flag = true
            if (this.temp.ruleList[this.itemIndex].conditionList[this.index].compId === '001') {
                this.temp.ruleList[this.itemIndex].conditionList.splice(this.index, 1, b)
            } else if (this.temp.ruleList[this.itemIndex].conditionList[this.index].compId === '002') {
                this.temp.ruleList[this.itemIndex].conditionList.splice(this.index, 1, a)
            } else {
                this.$message({
                    type: 'warning',
                    message: '只能切换与或关系',
                })
            }
        },
        symbolChange(ruleType) {
            if (ruleType === '0') {
                return
            }
            this.symbol()
        },
        doReset() {
            let temp = {}
            temp.ruleList = []
            this.conditionForm = {}
            this.sign = 'condition'
            this.temp = temp
        },
        // 添加事件
        addEvent(index) {
            let item = this.temp.ruleList[index]
            let temp = {
                eventType: '',
                checkList: [],
            }
            item.eventList.push(temp)
        },
        preAddRule() {
            // if (!this.temp.serverCode) {
            //     this.$message({
            //         type: 'warning',
            //         message: '请先选择服务码'
            //     })
            //     return
            // }
            this.ruleForm = {}
            this.innerVisible1 = true
        },
        // 动态右键菜单
        enter(index, item, itemIndex) {
            let me = document.getElementById('menu')
            if (me.style.display === 'block') {
                return
            }
            this.itemIndex = itemIndex
            this.conditionForm.compName = item.conditionList[index].desc ? item.conditionList[index].desc : item.conditionList[index].compName
            this.conditionForm.logicOrder = item.conditionList[index].logicOrder
            this.index = index
            if (['001', '002'].indexOf(item.conditionList[index].compId) !== -1) {
                this.menuData.menulists = [
                    { fnHandler: 'remove', icoName: 'el-icon-delete', btnName: '删除' },
                    { fnHandler: 'symbol', icoName: 'el-icon-refresh', btnName: '关系切换' },
                ]
            } else if (['003', '004'].indexOf(item.conditionList[index].compId) !== -1) {
                this.menuData.menulists = [
                    { fnHandler: 'remove', icoName: 'el-icon-delete', btnName: '删除' },
                ]
            } else {
                this.menuData.menulists = [
                    { fnHandler: 'remove', icoName: 'el-icon-delete', btnName: '删除' },
                    { fnHandler: 'condition', icoName: 'el-icon-s-tools', btnName: '条件配置' },

                ]
            }
        },
        // 条件删除
        remove() {
            if (this.temp.ruleList[this.itemIndex].ruleType === '0') {
                this.$message({
                    type: 'warning',
                    message: '无法修改公共规则',
                })
                return
            }
            let temp = this.temp.ruleList[this.itemIndex].conditionList
            let {index} = this
            if (temp[index].compId === '003') {
                for (let i = index; i < temp.length; i++) {
                    if (temp[i].count === temp[index].count && temp[i].compId === '004') {
                        if ((i - index) === 1) {
                            temp.splice(index, 2)
                            if (temp[index] && ['001', '002'].indexOf(temp[index].compId) > -1) {
                                temp.splice(index, 1)
                            } else if (temp[index - 1] && ['001', '002'].indexOf(temp[index - 1].compId) > -1) {
                                temp.splice(index - 1, 1)
                            }
                        } else {
                            temp.splice(i, 1)
                            temp.splice(index, 1)
                        }
                        return
                    }
                }
            }
            if (temp[index].compId === '004') {
                for (let j = index; j >= 0; j--) {
                    if (temp[j].count === temp[index].count && temp[j].compId === '003') {
                        if ((index - j) === 1) {
                            temp.splice(j, 2)
                            if (temp[j] && ['001', '002'].indexOf(temp[j].compId) > -1) {
                                temp.splice(j, 1)
                            } else if (temp[j - 1] && ['001', '002'].indexOf(temp[j - 1].compId) > -1) {
                                temp.splice(j - 1, 1)
                            }
                        } else {
                            temp.splice(index, 1)
                            temp.splice(j, 1)
                        }
                        return
                    }
                }
            }
            if (temp[index + 1] && !temp[index].flag && (['001', '002'].indexOf(temp[index + 1].compId) !== -1)) {
                temp.splice(index, 2)
            } else if (temp[index - 1] && !temp[index].flag && (['001', '002'].indexOf(temp[index - 1].compId) !== -1)) {
                temp.splice(index - 1, 2)
            } else {
                if (temp[index].compId === '005') {
                    this.sign = 'condition'
                    this.temp.ruleList[this.itemIndex].isCondition = 1
                }
                temp.splice(index, 1)
            }
            this.temp.ruleList[this.itemIndex].conditionList = temp
        },
        // 条件参数配置
        condition() {
            let condition = this.temp.ruleList[this.itemIndex].conditionList[this.index]
            this.tempConditionForm = JSON.parse(JSON.stringify(condition))
            this.paramFormDisabled = this.temp.ruleList[this.itemIndex].ruleType === '0'
            if (['001', '002', '003', '004'].indexOf(condition.compId) !== -1) {
                this.$message({
                    type: 'warning',
                    message: '符号无法配置条件',
                })
                return
            }
            this.innerTitle = condition.compName + ' -- ' + '参数配置'
            if (!condition.parameters || condition.parameters.length === 0) {
                this.getParamList().then((res) => {
                    this.$set(this.conditionForm, 'paramForm', res.data.sort(this.sortOrder))
                })
            } else {
                this.getParamList().then((res) => {
                    this.$set(this.conditionForm, 'paramForm', res.data.sort(this.sortOrder))
                    this.conditionForm.paramForm = this.tempConditionForm.parameters
                    this.conditionForm.paramForm.forEach((param) => {
                        if (param.paramComment && param.paramPath && param.paramPath.indexOf('(') === -1) {
                            param.paramPath = param.paramPath + '  (' + param.paramComment + ')'
                        }
                    })
                })
            }
            this.innerVisible = true
            this.$nextTick(() => {
                this.$refs.conditionForm.clearValidate()
            })
        },
        // 菜单展示
        showContextMenu(ev, index) {
            console.log(this.temp.ruleList[index].conditionList)
            ev.preventDefault()
            let x = ev.clientX - 10
            let y = ev.clientY - 15
            this.menuData.axis = { x, y }
        },
        transferIndex() {

        },
        selectInput(index) {
            this.paramFormIndex = index
            console.log(this.multipleSelection)
        },
        // 取消时删除参数
        innerClear() {
            if (this.operation === 'add') {
                this.$refs.conditionForm.resetFields()
            } else {
                this.$set(this.conditionForm, 'paramForm', this.tempConditionForm.parameters)
            }
            this.innerVisible = false
        },
        // 参数同步
        sync() {
            this.$refs.conditionForm
                .validate((valid) => {
                    if (valid) {
                        this.conditionList.forEach((item) => {
                            if (item.logicOrder === this.conditionForm.logicOrder) {
                                this.conditionForm.paramForm.forEach((param) => {
                                    if (param.paramPath) {
                                        const temp = param.paramPath
                                        if (param.id) {
                                            param.paramId = param.id
                                        }
                                        const index = temp.indexOf('(')
                                        if (index !== -1) {
                                            param.paramPath = temp.slice(0, index).trim()
                                        } else {
                                            param.paramPath = temp.trim()
                                        }
                                    }
                                    param.paramType = this.tempData.some((item) => item.code === param.paramPath && item.comment === param.paramComment) ? 2 : 1
                                    if (param.paramType === '1') {
                                        param.paramComment = ''
                                    }
                                })
                                item.desc = this.conditionForm.compName
                                item.parameters = this.conditionForm.paramForm
                            }
                        })
                        console.log(this.conditionList)
                        this.conditionForm.compName = ''
                        this.innerVisible = false
                    }
                })
        },
        getParamList() {
            let promise = new Promise((resolve, reject) => {
                fox.service.request({
                    path: 'globle/componentDefine/paramList',
                    data: {},
                    callback(code, message, data) {
                        if (code == 0) {
                            if (typeof data === 'string') {
                                data = JSON.parse(data)
                            }
                            resolve(data)
                        } else {
                            resolve(message)
                        }
                    },
                })
            })
            return promise
        },
        getRuleDetail(ruleId) {
            let promise = new Promise((resolve, reject) => {
                fox.service.request({
                    path: '/api/rRuleDefine/show?ruleId=' + ruleId,
                    data: {},
                    callback(code, message, data) {
                        if (code == 0) {
                            if (typeof data === 'string') {
                                data = JSON.parse(data)
                            }
                            resolve(data)
                        } else {
                            resolve(message)
                        }
                    },
                })
            })
            return promise
        },
        rowClick(row, column, event) {
            console.log(row)
            if (!this.paramFormIndex && this.paramFormIndex !== 0) {
                this.$message({
                    type: 'warning',
                    message: '请先选择参数',
                })
                return
            }
            let param = this.conditionForm.paramForm[this.paramFormIndex]
            let temp = {}
            if (param.id) {
                temp.paramId = param.id
            } else {
                temp.paramId = param.paramId
            }
            temp.compId = param.compId
            temp.state = row.type
            temp.paramName = param.paramName
            temp.paramOrder = param.paramOrder
            temp.paramComment = row.comment
            temp.paramSource = param.paramSource
            temp.paramPath = row.code + '  (' + row.comment + ')'
            console.log(this.conditionForm)
            this.$set(this.conditionForm.paramForm, this.paramFormIndex, temp)
        },
        showMenu(index) {
            this.transferIndex = index // tranfer index to child component
            event.preventDefault()
            var x = event.clientX
            var y = event.clientY
            this.contextMenuData.axis = {
                x,
                y,
            }
        },
        // 添加规则
        addRule() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    let temp = {}
                    temp.ruleName = ''
                    temp.isOpen = ''
                    temp.conditionList = []
                    temp.eventList = []
                    temp.ruleType = this.ruleForm.ruleType
                    if (this.ruleForm.ruleType === '0') {
                        this.temp.ruleList.push(temp)
                        // getRRuleDefineData({ ruleId: this.ruleForm.ruleId }).then(res => {
                        //     console.log(res)
                        //     var data = res.data.conditionList
                        //     var i = 0
                        //     data = this.detail(data)
                        //     data.forEach(item => {
                        //         if (item.compId === '003') {
                        //             item.count = i
                        //             i++
                        //         }
                        //     })
                        //     i = 0
                        //     data.forEach(item => {
                        //         if (item.compId === '004') {
                        //             item.count = i
                        //             i++
                        //         }
                        //     })
                        //     data.forEach(item => {
                        //         item.flag = true
                        //     })
                        //     console.log(data)
                        //     if (data.length === 0) {
                        //         data.push(this.symbolList[3])
                        //     }
                        //     temp.conditionList = data
                        //     var eventList = res.data.eventList
                        //     eventList.forEach(item => {
                        //         var checkList = []
                        //         if (item.authChannel) {
                        //             if (item.authChannel === '11') {
                        //                 checkList = ['云银行', '移动厅堂']
                        //             }
                        //             if (item.authChannel === '10') {
                        //                 checkList = ['云银行']
                        //             }
                        //             if (item.authChannel === '01') {
                        //                 checkList = ['移动厅堂']
                        //             }
                        //             item.checkList = checkList
                        //         }
                        //     })
                        //     temp.eventList = res.data.eventList
                        //     temp.ruleId = res.data.ruleId
                        //     temp.ruleName = res.data.ruleName
                        //     temp.isOpen = res.data.isOpen
                        //     temp.isCondition = res.data.isCondition
                        //     this.temp.ruleList.push(temp)
                        // })
                    }
                    if (this.ruleForm.ruleType === '1') {
                        this.temp.ruleList.push(temp)
                    }
                    this.innerVisible1 = false
                }
            })
        },
        // 重置
        reset() {
            this.conditionList = []
            this.eventOperation = 0
            this.sign = 'condition'
        },
        // 查询公共规则列表
        queryPublicRules() {
            return getPublicRules()
        },
        // 删除事件
        removeEvent(val, index) {
            this.temp.ruleList[index].eventList.splice(val, 1)
        },
        // 删除规则
        removeRule(item, index) {
            this.temp.ruleList.splice(index, 1)
        },
        doSave() {
            console.log(this.temp.ruleList)
            this.$refs.temp
                .validate((valid) => {
                    if (valid) {
                        this.onSubmit = true
                        let temp = JSON.parse(JSON.stringify(this.temp))
                        if (this.operation === 'add') {
                            temp.flag = 1
                        } else {
                            temp.flag = 2
                        }
                        temp.ruleList.forEach((item, index) => {
                            item.eventList.forEach((event) => {
                                const tempEvent = {}
                                if (event.eventType === '1') {
                                    if (typeof event.authRole === 'object') {
                                        tempEvent.authRole = ''
                                        event.authRole.forEach((role) => {
                                            tempEvent.authRole += role
                                            tempEvent.authRole += ','
                                        })
                                        tempEvent.authRole = tempEvent.authRole.slice(0, -1)
                                    } else {
                                        tempEvent.authRole = event.authRole
                                    }
                                    event.authRole = tempEvent.authRole
                                    if (event.checkList.length === 2) {
                                        event.authChannel = '11'
                                    } else if (event.checkList.length === 1 && event.checkList[0] === '云银行') {
                                        event.authChannel = '10'
                                    } else if (event.checkList.length === 1 && event.checkList[0] === '移动厅堂') {
                                        event.authChannel = '01'
                                    } else if (event.checkList.length === 0) {
                                        this.onSubmit = false
                                        this.$message({
                                            type: 'warning',
                                            message: '必须选择授权渠道',
                                        })
                                    }
                                }
                                if (event.eventType === '2') {
                                    this.allDics.RULE_REFUSE_CODE.forEach((msg) => {
                                        if (event.msgCode === msg.code) {
                                            event.msgContent = msg.text
                                        }
                                    })
                                }
                                if (event.eventType === '3') {
                                    this.allDics.RULE_ALERT_CODE.forEach((msg) => {
                                        if (event.msgCode === msg.code) {
                                            event.msgContent = msg.text
                                        }
                                    })
                                }
                            })
                            let list = item.conditionList
                            let newList = []
                            item.triggerType = '1'
                            list.forEach((condition) => {
                                if (!condition.flag) {
                                    newList.push(condition)
                                }
                            })
                            newList.forEach((condition) => {
                                let params = condition.parameters
                                if (params && params.some((value) => {
                                    if (value.state) {
                                        return value.paramType === '4'
                                    }
                                })) {
                                    item.triggerType = '2'
                                    if (item.eventList.some((value) => value.eventType === '1')) {
                                        this.onSubmit = false
                                        this.$message({
                                            type: 'warning',
                                            message: '规则' + (index + 1) + '存在授权事件,条件参数不能为服务报文输出数据',
                                        })
                                    }
                                }
                            })
                            for (let i = 0; i < list.length; i++) {
                                if (list[i].compId === '003') {
                                    for (let x = 0; x < list.length; x++) {
                                        if (list[x].compId === '004' && list[x].count === list[i].count) {
                                            if (x - i === 1) {
                                                this.$message({
                                                    message: '括号内部不能为空',
                                                    type: 'warning',
                                                })
                                                this.onSubmit = false
                                                return
                                            } else if (x - i === 2) {
                                                this.$message({
                                                    message: '括号内部不能只含有一个条件',
                                                    type: 'warning',
                                                })
                                                this.onSubmit = false
                                                return
                                            }
                                        }
                                    }
                                }
                            }
                            const tempArr = []
                            list.forEach((item) => {
                                if (!item.flag) {
                                    tempArr.push(item)
                                }
                            })
                            for (const i in tempArr) {
                                if (!tempArr[i].parameters) {
                                    const a = Number(i) + 1
                                    const tempName = tempArr[i].desc ? tempArr[i].desc : tempArr[i].compName
                                    this.$message({
                                        type: 'warning',
                                        message: '第' + a + '个条件--' + tempName + '未配置参数',
                                    })
                                    this.onSubmit = false
                                    break
                                }
                            }
                            if (list.length === 1 && list[0].compId === '005') {
                                item.isCondition = 0
                                list.pop()
                            } else {
                                item.isCondition = 1
                                let tempList = []
                                if (item.ruleType === '1') {
                                    this.arrayToMutiArray(list, tempList)
                                    item.conditionList = tempList
                                }
                            }
                        })
                        if (!this.onSubmit) {
                            return
                        }
                        createSceneRule(temp).then(() => {
                            this.dialogVisible = false
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                            })
                            console.log(this.temp.parameters)
                            this.$parent.fetchData()
                        }).catch((rej) => {
                        })
                    }
                })
        },
        handleClick(tab, event) {
            console.log(tab)
            if (tab.name === 'public') {
                this.contextType = '1'
            } else if (tab.name === 'service') {
                this.contextType = '2'
            }
        },
    },
    mounted: function () {
        // this.getPublicRules()
    },
}
</script>

<style scoped>
.left-main {
    max-height: 400px;
}
.rule-block {
    min-height: 300px;
}
.rule-section {
    zoom: 1;
}
.rule-section::after {
    content: "";
    clear: both;
    display: block;
}
.left-main .left-input {
    float: left;
    width: calc(100% - 100px);
}
.drag-block {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    height: 80px;
}
.condition-area {
    padding: 20px;
    text-align: center;
    white-space: nowrap;
    overflow: auto hidden;
}
.left-main .right-button {
    float: right;
    width: 80px;
}
.left-main .right-button .el-button {
    margin-left: 0;
    margin-bottom: 10px;
}
.left-p0 {
    padding-left: 0;
}
.right-aside {
    border-left: 1px dashed #666;
    width: 18vw;
    max-height: 400px;
    padding-left: 10px;
}
.aside-button {
    margin: 0 20px 20px 0;
    width: 100px;
}
.param-aside {
    max-height: 350px;
}
.bracket {
    font-size: 30px;
    width: 25px;
    display: inline-block;
    text-align: center;
}
</style>