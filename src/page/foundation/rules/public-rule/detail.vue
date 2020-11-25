<template>
  <!-- 主对话框 -->
  <fox-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="90%"
    center
  >
    <fox-container>
      <fox-main class="left-main">
        <fox-form ref="temp" :model="temp" size="small">
          <section class="rule-section">
            <fox-group
              class="left-input"
              column="2"
              label-width="80px"
              label-position="right"
              l
            >
              <fox-text-item
                v-model="temp.ruleName"
                placeholder="请输入规则名称"
                >规则名称</fox-text-item
              >
              <fox-select-item
                v-model="temp.isOpen"
                :source="m_status"
                placeholder="请选择"
                >是否启用</fox-select-item
              >
            </fox-group>
          </section>
          <!-- 左侧判断条件拖动信息 -->
          <section class="rule-section">
            <fox-group
              class="left-input"
              column="1"
              label-width="80px"
              label-position="right"
            >
              <fox-item label="判断条件">
                <div class="drag-block">
                  <draggable
                    class="condition-area"
                    :list="conditionList"
                    v-bind="{
                      group: { name: sign },
                      filter: '.undraggable,',
                      sort: false,
                    }"
                    @add="add"
                    @start="start"
                    @end="end"
                    @change="onChange"
                  >
                    <span
                      v-for="(item, index) in conditionList"
                      :key="index"
                      :class="{
                        undraggable: item.flag || operation === 'detail',
                      }"
                      @mouseenter="enter(index)"
                      @contextmenu="showContextMenu($event)"
                    >
                      <!-- ----且或按钮----- -->
                      <fox-button
                        v-if="item.compId == 'BD0EE79CAE344BA7BCB89B379775A660'"
                        type="success"
                        size="small"
                        circle
                        @click="symbolChange"
                        >{{ item.compName }}</fox-button
                      >
                      <fox-button
                        v-else-if="
                          item.compId == 'FAE46E4B411A4551BE19A49902BF28FA'
                        "
                        type="danger"
                        size="small"
                        circle
                        @click="symbolChange"
                        >{{ item.compName }}</fox-button
                      >
                      <span
                        v-else-if="
                          item.compId == '05CB4238EB404FFE970523EB7B2E3596' ||
                          item.compId === 'FD0B9F92240748F3ABC489AF5C93F2E7'
                        "
                        size="small"
                        class="bracket"
                        >{{ item.name }}</span
                      >
                      <fox-button
                        v-else
                        size="small"
                        @dblclick.native="condition(index)"
                        >{{ item.desc ? item.desc : item.compName }}</fox-button
                      >
                    </span>
                  </draggable>
                </div>
              </fox-item>
            </fox-group>
          </section>
          <!-- 事件组件 -->
          <event
            :event-operation="eventOperation"
            :rule-operation="ruleOperation"
            :push-event-list="pushEventList"
            :org-list="orgList"
            @update="getChildData"
          >
          </event>
        </fox-form>
        <fox-group label-width="80px">
          <fox-button-row align="center">
            <fox-button type="success" size="mini" @click="doSave"
              >提交</fox-button
            >
            <fox-button type="primary" size="mini" @click="addEvent"
              >添加事件</fox-button
            >
            <fox-button type="danger" size="mini" @click="reset"
              >重置</fox-button
            >
          </fox-button-row>
        </fox-group>
      </fox-main>
      <!-- 右侧拖动信息 -->
      <fox-aside class="right-aside" style="width: 18vw">
        <!-- 
                    此处会渲染两个拖拽组件
                    第一个用来渲染括号和必须执行按钮
                    第二个才会渲染componentList的所有按钮
                -->
        <!-- 括号和必须执行按钮 -->
        <draggable
          :list="symbolList"
          v-bind="{
            group: { name: sign1, pull: 'clone' },
            filter: '.undraggable',
            sort: false,
          }"
          @start="start1"
          @end="end1"
        >
          <span v-for="(item, index) in symbolList" :key="index">
            <fox-button
              v-if="
                item.compId !== 'BD0EE79CAE344BA7BCB89B379775A660' &&
                item.compId !== 'FAE46E4B411A4551BE19A49902BF28FA'
              "
              class="aside-button"
              slot="reference"
              round
              >{{
                item.compId === "05CB4238EB404FFE970523EB7B2E3596"
                  ? item.name + " )"
                  : item.compName
              }}</fox-button
            >
          </span>
        </draggable>
        <!-- componentList的所有按钮 -->
        <draggable
          :list="componentList"
          v-bind="{
            group: { name: sign2, pull: 'clone' },
            filter: '.undraggable',
            sort: false,
          }"
          @start="start2"
          @end="end2"
        >
          <span v-for="(item, index) in componentList" :key="index">
            <fox-button class="aside-button" slot="reference" round>{{
              item.compName
            }}</fox-button>
          </span>
        </draggable>
      </fox-aside>
    </fox-container>

    <!-- 右键弹出菜单 -->
    <vueContextMenu
      id="menu"
      :context-menu-data="menuData"
      style="padding-left: 0"
      @remove="remove"
      @symbol="symbol"
      @condition="condition"
    ></vueContextMenu>
    <!-- 参数配置对话框 -->
    <fox-dialog
      :title="innerTitle"
      :visible.sync="innerVisible"
      width="80%"
      append-to-body
      center
      class="public"
      @close="paramFormIndex = ''"
    >
      <fox-container>
        <fox-main class="left-p0">
          <fox-form ref="conditionForm" :model="conditionForm">
            <fox-group label-width="80px" column="1" label-position="right">
              <fox-text-item
                v-model="conditionForm.compName"
                @input="$forceUpdate()"
                >条件名称</fox-text-item
              >
            </fox-group>
            <fox-divider content-position="left">参数</fox-divider>
            <fox-group label-width="80px" column="1" label-position="right">
              <fox-item
                v-for="(item, index) in conditionForm.paramForm"
                :label="item.paramName"
                :key="index"
              >
                <fox-text-item
                  v-if="!item.paramSource || item.paramSource === 'NULL'"
                  v-model="item.paramPath"
                  @blur="selectInput(index)"
                  @clear="item.paramComment = ''"
                ></fox-text-item>
                <fox-select-item
                  v-else
                  v-model="item.paramPath"
                  :source="m_compareType"
                  placeholder="请选择"
                ></fox-select-item>
              </fox-item>
              <fox-button-row align="center">
                <fox-button type="success" size="mini" @click="sync"
                  >确定</fox-button
                >
                <fox-button type="danger" size="mini" @click="innerClear"
                  >取消</fox-button
                >
              </fox-button-row>
            </fox-group>
          </fox-form>
          <fox-footer></fox-footer>
        </fox-main>
        <fox-aside>
          <fox-tabs v-model="activeName" type="border-card">
            <fox-tab-pane label="公共报文" name="public">
              <fox-table-item
                :content="m_publicParamData"
                stripe
                highlight-current-row
                tool-layout=""
                height="300"
                :show-header="false"
                @row-click="rowClick"
              >
                <fox-table-column label="">
                  <template slot-scope="scope">
                    {{ scope.row.code + "(" + scope.row.comment + ")" }}
                  </template>
                </fox-table-column>
              </fox-table-item>
            </fox-tab-pane>
          </fox-tabs>
        </fox-aside>
      </fox-container>
    </fox-dialog>
  </fox-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import {
    getRuleDetail,
    createPublicRule,
    listMount,
} from '@/api/request/rule/rule.js'
import event from './event'

let count = 0
let logicOrder = 1
export default {
    name: 'RuleDetail',
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
    // this.dicTypes = ['RULE_REFUSE_CODE', 'RULE_COMPONENT_TYPE', 'RULE_ALERT_CODE', 'RULE_CASH_FLAG']
        return {
            dialogVisible: false,
            ruleOperation: '',
            innerVisible: false,
            innerTitle: '',
            sign: 'condition',
            sign1: '',
            sign2: '',
            index: '',
            eventOperation: 0,
            activeName: 'public',
            onSubmit: true,
            tempData: [],
            eventData: [],
            pushEventList: [],
            orgList: [],
            allDics: {},
            temp: {
                ruleName: '',
                isOpen: '',
            },
            // 右键菜单数据
            menuData: {
                menuName: 'contextName',
                axis: { x: null, y: null },
                menulists: [],
            },
            conditionList: [],
            symbolList: [
                // {
                //   compName: "且",
                //   compId: "001",
                //   flag: true,
                // },
                // {
                //   compName: "或",
                //   compId: "002",
                //   flag: true,
                // },
                // {
                //   name: "(",
                //   compId: "003",
                //   flag: true,
                // },
                // {
                //   compName: "必须执行",
                //   compId: "005",
                //   flag: true,
                // },
            ],
            // 拖拽组件集合
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
            // 是否启用下拉选择
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
            m_compareType: [
                {
                    code: '1',
                    text: '字符串',
                    value: '字符串',
                    child: null,
                },
                {
                    code: '2',
                    text: '数字',
                    value: '数字',
                    child: null,
                },
                {
                    code: '3',
                    text: '金额',
                    value: '金额',
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
                    comment:
            '帐号录入方式（1-刷卡读磁，2-身份证，3-手动录入，4-手机银行扫码）',
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
                    comment:
            '客户黑名单属性值（1-电信诈骗黑名单,2-他行代领我行存款黑名单,4-风险预警黑名单,8-反洗钱黑名单,16-惠民贷灰名单）',
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
                    comment:
            '客户风险等级(1-低风险，2-较低风险，3-一般风险，4-较高风险，5-高风险)',
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
    
        // 初始化数据
        initData() {
            this.conditionList = []
            this.sign = 'condition'
            if (this.operation === 'add') {
                this.doReset()
            } else if (this.operation === 'detail' || this.operation === 'update') {
                let { row } = this.params
                getRuleDetail(row.ruleId).then((res) => {
                    console.log(res)
                    // let data = res;
                    // let i = 0;
                    // data.forEach((item) => {
                    //   if (item.compId === "003") {
                    //     item.count = i;
                    //     i++;
                    //   }
                    // });
                    // i = 0;
                    // data.forEach((item) => {
                    //   if (item.compId === "004") {
                    //     item.count = i;
                    //     i++;
                    //   }
                    // });
                    // data.forEach((item) => {
                    //   if (["001", "002", "003", "004"].indexOf(item.compId) !== -1) {
                    //     item.flag = true;
                    //   }
                    // });
                    // if (res.list.isCondition === "0") {
                    //   this.conditionList = [];
                    //   this.conditionList.push(this.symbolList[3]);
                    //   this.sign = "justDoIt";
                    // } else {
                    //   this.conditionList = this.detail(data);
                    // }
                    let { eventList } = res
                    eventList.forEach((item) => {
                        if (item.authRole) {
                            if (item.authType === '1') {
                                item.authRole = item.authRole.split(',')
                            }
                        }
                        if (item.authChannel) {
                            let temp
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
                    // this.pushEventList = eventList;
                    // ----------------------显示当前值----------------------
                    // this.$refs.temp.validate((valid) => {
                    //   // let { temp } = this;
                    //   // console.log(temp);
                    // });
                    // ------------------------------------------------------
                  
                    this.$set(this.temp, 'ruleName', res.ruleDefine.ruleName)
                    this.$set(this.temp, 'isOpen', res.ruleDefine.isOpen)
                    
                    this.pushEventList = res.eventList
                    this.eventList = res.eventList || []
                    this.sign = 'condition'
                    if (res.ruleDefine.isCondition === '0') {
                        this.conditionList = []
                        this.conditionList.push(this.symbolList[3])
                        this.sign = 'justDoIt'
                        return
                    } 
                  
                    // this.conditionForm = {};
                    // this.eventOperation = 0;
                    // this.pushEventList = [];
                    // ------------------------------conditionList---------------------------
                    for (let i of res.conditionList) {
                        let obj = {}
                        obj = i.conditionInfo
                        obj.parameters = i.parameters
                        if (i.conditionInfo.compId == 'FD0B9F92240748F3ABC489AF5C93F2E7') {
                            obj.name = ')'
                            obj.flag = true
                        } else if (i.conditionInfo.compId == '05CB4238EB404FFE970523EB7B2E3596') {
                            obj.name = '('
                            obj.flag = true
                        }
                        this.conditionList.push(obj)
                    }
                    console.log(this.conditionList)
                })
            }
            this.$nextTick(() => {
                this.$refs.temp.clearValidate()
            })
        },
        // 拖拽添加条件
        add(ev) {
            if (ev.item.textContent === '必须执行') {
                return
            }
            let temp = this.conditionList
            let index = ev.newIndex
            if (ev.item.textContent === '( )') {
                let objR = {
                    name: ')',
                    compId: 'FD0B9F92240748F3ABC489AF5C93F2E7',
                    flag: true,
                    count: count,
                }
                let objL = {
                    name: '(',
                    compId: '05CB4238EB404FFE970523EB7B2E3596',
                    flag: true,
                    count: count,
                }
                temp.splice(index, 1, objL)
                if (temp.length - 1 === index) {
                    temp.push(objR)
                } else {
                    if (
                        [
                            'BD0EE79CAE344BA7BCB89B379775A660',
                            'FAE46E4B411A4551BE19A49902BF28FA',
                        ].indexOf(temp[index + 1].compId) !== -1
                    ) {
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
            if (
                temp.length === 2 && temp[index].compId === '05CB4238EB404FFE970523EB7B2E3596'
            ) {
                return
            }
            if (temp.length < 2) {
                return
            }
            let b = this.symbolList[0]
            b.flag = true
            if (index === 0 && temp[index].compId !== '05CB4238EB404FFE970523EB7B2E3596') {
                temp.splice(1, 0, b)
            }
            if ([
                'BD0EE79CAE344BA7BCB89B379775A660',
                'FAE46E4B411A4551BE19A49902BF28FA',
            ].indexOf(temp[index].compId) === -1
        && temp[index - 1]
        && [
            'BD0EE79CAE344BA7BCB89B379775A660',
            'FAE46E4B411A4551BE19A49902BF28FA',
        ].indexOf(temp[index - 1].compId) === -1
        && temp[index - 1].compId !== '05CB4238EB404FFE970523EB7B2E3596'
            ) {
                temp.splice(index, 0, b)
            }
            if (
                temp[index - 1]
        && [
            'BD0EE79CAE344BA7BCB89B379775A660',
            'FAE46E4B411A4551BE19A49902BF28FA',
            '05CB4238EB404FFE970523EB7B2E3596',
        ].indexOf(temp[index - 1].compId) !== -1
        && (!temp[index + 1].flag
          || temp[index + 1].compId === '05CB4238EB404FFE970523EB7B2E3596')
        && temp[index].compId !== '05CB4238EB404FFE970523EB7B2E3596'
            ) {
                temp.splice(index + 1, 0, b)
            }
            if (
                [
                    'BD0EE79CAE344BA7BCB89B379775A660',
                    'FAE46E4B411A4551BE19A49902BF28FA',
                ].indexOf(temp[index].compId) !== -1
        && temp[index - 1]
        && [
            'BD0EE79CAE344BA7BCB89B379775A660',
            'FAE46E4B411A4551BE19A49902BF28FA',
        ].indexOf(temp[index - 1].compId) !== -1
            ) {
                temp.splice(index, 1)
                this.$message({
                    type: 'warning',
                    message: '运算符不可重复',
                })
            }
            this.conditionList = temp
        },
        // 条件列表拖拽(列表只要发生改变就会触发)
        onChange(ev) {
            // console.log(ev);
            let temp = this.conditionList
            // 必须执行
            if (ev.added && ev.added.element.compId === 'C829AF79A66B49DCA1A623655B98AEC4') {
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
                        if (temp[a].compId !== 'FD0B9F92240748F3ABC489AF5C93F2E7') {
                            temp.splice(a, 1)
                        } else if (
                            temp[a - 1].compId !== '05CB4238EB404FFE970523EB7B2E3596'
                        ) {
                            temp.splice(a - 1, 1)
                        }
                    } else if (
                        [
                            'BD0EE79CAE344BA7BCB89B379775A660',
                            'FAE46E4B411A4551BE19A49902BF28FA',
                        ].indexOf(temp[b - 1].compId) !== -1
            && (!temp[b + 1].flag
              || temp[b + 1].compId === '05CB4238EB404FFE970523EB7B2E3596')
                    ) {
                        temp.splice(b + 1, 0, el)
                        if (temp[a].compId !== 'FD0B9F92240748F3ABC489AF5C93F2E7') {
                            temp.splice(a, 1)
                        } else if (
                            [
                                'BD0EE79CAE344BA7BCB89B379775A660',
                                'FAE46E4B411A4551BE19A49902BF28FA',
                            ].indexOf(temp[a - 1].compId) !== -1
                        ) {
                            temp.splice(a - 1, 1)
                        }
                    }
                    if (temp[b - 1].compId === '05CB4238EB404FFE970523EB7B2E3596') {
                        if (
                            !temp[b + 1].flag
              || temp[b + 1].compId === '05CB4238EB404FFE970523EB7B2E3596'
                        ) {
                            temp.splice(b + 1, 0, el)
                        } else if (
                            temp[a - 1]
              && [
                  'BD0EE79CAE344BA7BCB89B379775A660',
                  'FAE46E4B411A4551BE19A49902BF28FA',
              ].indexOf(temp[a - 1].compId) !== -1
                        ) {
                            temp.splice(a - 1, 1)
                        } else if (temp[a].compId !== 'FD0B9F92240748F3ABC489AF5C93F2E7') {
                            temp.splice(a, 1)
                        }
                    }
                    if (temp[b - 1].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7') {
                        temp.splice(b, 0, el)
                        if (
                            [
                                'BD0EE79CAE344BA7BCB89B379775A660',
                                'FAE46E4B411A4551BE19A49902BF28FA',
                            ].indexOf(temp[a].compId) !== -1
                        ) {
                            temp.splice(a, 1)
                        } else if (
                            [
                                'BD0EE79CAE344BA7BCB89B379775A660',
                                'FAE46E4B411A4551BE19A49902BF28FA',
                            ].indexOf(temp[a - 1].compId) !== -1
                        ) {
                            temp.splice(a - 1, 1)
                        }
                    }
                }
                if (a > b) {
                    if (
                        [
                            'BD0EE79CAE344BA7BCB89B379775A660',
                            'FAE46E4B411A4551BE19A49902BF28FA',
                        ].indexOf(temp[b + 1].compId) !== -1
                    ) {
                        if (
                            temp[a + 1]
              && [
                  '05CB4238EB404FFE970523EB7B2E3596',
                  'FD0B9F92240748F3ABC489AF5C93F2E7',
              ].indexOf(temp[a + 1].compId) === -1
                        ) {
                            temp.splice(a + 1, 1)
                        } else if (
                            [
                                'BD0EE79CAE344BA7BCB89B379775A660',
                                'FAE46E4B411A4551BE19A49902BF28FA',
                            ].indexOf(temp[a].compId) !== -1
                        ) {
                            temp.splice(a, 1)
                        }
                        temp.splice(b, 0, el)
                    } else if (
                        temp[b + 1].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7'
            && temp[b - 1].compId !== '05CB4238EB404FFE970523EB7B2E3596'
                    ) {
                        if (
                            temp[a + 1]
              && [
                  '05CB4238EB404FFE970523EB7B2E3596',
                  'FD0B9F92240748F3ABC489AF5C93F2E7',
              ].indexOf(temp[a + 1].compId) === -1
                        ) {
                            temp.splice(a + 1, 1)
                        } else if (
                            [
                                '05CB4238EB404FFE970523EB7B2E3596',
                                'FD0B9F92240748F3ABC489AF5C93F2E7',
                            ].indexOf(temp[a].compId) === -1
                        ) {
                            temp.splice(a, 1)
                        }
                        temp.splice(b, 0, el)
                    } else if (temp[a].compId !== '05CB4238EB404FFE970523EB7B2E3596') {
                        temp.splice(a, 1)
                        if (
                            !temp[b + 1].flag
              || temp[b + 1].compId === '05CB4238EB404FFE970523EB7B2E3596'
                        ) {
                            temp.splice(b + 1, 0, el)
                        }
                    } else {
                        if (temp[a + 1].compId !== 'FD0B9F92240748F3ABC489AF5C93F2E7') {
                            temp.splice(a + 1, 1)
                        }
                        if (
                            [
                                'BD0EE79CAE344BA7BCB89B379775A660',
                                'FAE46E4B411A4551BE19A49902BF28FA',
                                'FD0B9F92240748F3ABC489AF5C93F2E7',
                            ].indexOf(temp[b + 1].compId) === -1
                        ) {
                            temp.splice(b + 1, 0, el)
                        }
                    }
                }
                if (
                    [
                        'BD0EE79CAE344BA7BCB89B379775A660',
                        'FAE46E4B411A4551BE19A49902BF28FA',
                    ].indexOf(temp[temp.length - 1].compId) !== -1
                ) {
                    temp.pop()
                }
                if (
                    [
                        'BD0EE79CAE344BA7BCB89B379775A660',
                        'FAE46E4B411A4551BE19A49902BF28FA',
                    ].indexOf(temp[0].compId) !== -1
                ) {
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
            if (
                this.conditionList[this.index].compId
        === 'BD0EE79CAE344BA7BCB89B379775A660'
            ) {
                this.conditionList.splice(this.index, 1, b)
            } else if (
                this.conditionList[this.index].compId
        === 'FAE46E4B411A4551BE19A49902BF28FA'
            ) {
                this.conditionList.splice(this.index, 1, a)
            } else {
                this.$message({
                    type: 'warning',
                    message: '只能切换与或关系',
                })
            }
        },
        // 符号切换
        symbolChange() {
            this.symbol()
        },
        doReset() {
            let temp = {}
            temp.ruleName = ''
            temp.isOpen = ''
            this.sign = 'condition'
            this.conditionList = []
            this.conditionForm = {}
            this.eventOperation = 0
            this.pushEventList = []
            this.temp = temp
        },
        // 添加事件
        addEvent() {
            this.eventOperation++
        },
        // 动态右键菜单(鼠标移入在上面就会触发事件)
        enter(index) {
            // console.log("动态右键菜单");
            // console.log("index======" + index);
            let me = document.getElementById('menu')
            if (me.style.display === 'block') {
                console.log('style.display === block')
                return
            }
            this.conditionForm.compName = this.conditionList[index].desc
                ? this.conditionList[index].desc
                : this.conditionList[index].compName
            this.conditionForm.logicOrder = this.conditionList[index].logicOrder
            this.index = index
            if (
                [
                    'BD0EE79CAE344BA7BCB89B379775A660',
                    'FAE46E4B411A4551BE19A49902BF28FA',
                ].indexOf(this.conditionList[index].compId) !== -1
            ) {
                this.menuData.menulists = [
                    {
                        fnHandler: 'remove',
                        icoName: 'el-icon-delete',
                        btnName: '删除',
                    },
                    {
                        fnHandler: 'symbol',
                        icoName: 'el-icon-refresh',
                        btnName: '关系切换',
                    },
                ]
            } else if (
                [
                    '05CB4238EB404FFE970523EB7B2E3596',
                    'FD0B9F92240748F3ABC489AF5C93F2E7',
                ].indexOf(this.conditionList[index].compId) !== -1
            ) {
                this.menuData.menulists = [
                    {
                        fnHandler: 'remove',
                        icoName: 'el-icon-delete',
                        btnName: '删除',
                    },
                ]
            } else {
                this.menuData.menulists = [
                    {
                        fnHandler: 'remove',
                        icoName: 'el-icon-delete',
                        btnName: '删除',
                    },
                    {
                        fnHandler: 'condition',
                        icoName: 'el-icon-s-tools',
                        btnName: '条件配置',
                    },
                ]
            }
        },
        // 条件删除
        remove() {
            // console.log("条件删除");
            if (this.operation === 'detail') {
                return
            }
            let temp = this.conditionList
            let { index } = this
            if (temp[index].compId === '05CB4238EB404FFE970523EB7B2E3596') {
                for (let i = index; i < temp.length; i++) {
                    if (
                        temp[i].count === temp[index].count
            && temp[i].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7'
                    ) {
                        if (i - index === 1) {
                            temp.splice(index, 2)
                            if (
                                temp[index]
                && [
                    'BD0EE79CAE344BA7BCB89B379775A660',
                    'FAE46E4B411A4551BE19A49902BF28FA',
                ].indexOf(temp[index].compId) > -1
                            ) {
                                temp.splice(index, 1)
                            } else if (
                                temp[index - 1]
                && [
                    'BD0EE79CAE344BA7BCB89B379775A660',
                    'FAE46E4B411A4551BE19A49902BF28FA',
                ].indexOf(temp[index - 1].compId) > -1
                            ) {
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
            if (temp[index].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7') {
                for (let j = index; j >= 0; j--) {
                    if (
                        temp[j].count === temp[index].count
            && temp[j].compId === '05CB4238EB404FFE970523EB7B2E3596'
                    ) {
                        if (index - j === 1) {
                            temp.splice(j, 2)
                            if (
                                temp[j]
                && [
                    'BD0EE79CAE344BA7BCB89B379775A660',
                    'FAE46E4B411A4551BE19A49902BF28FA',
                ].indexOf(temp[j].compId) > -1
                            ) {
                                temp.splice(j, 1)
                            } else if (
                                temp[j - 1]
                && [
                    'BD0EE79CAE344BA7BCB89B379775A660',
                    'FAE46E4B411A4551BE19A49902BF28FA',
                ].indexOf(temp[j - 1].compId) > -1
                            ) {
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
            if (
                temp[index + 1]
        && !temp[index].flag
        && [
            'BD0EE79CAE344BA7BCB89B379775A660',
            'FAE46E4B411A4551BE19A49902BF28FA',
        ].indexOf(temp[index + 1].compId) !== -1
            ) {
                temp.splice(index, 2)
            } else if (
                temp[index - 1]
        && !temp[index].flag
        && [
            'BD0EE79CAE344BA7BCB89B379775A660',
            'FAE46E4B411A4551BE19A49902BF28FA',
        ].indexOf(temp[index - 1].compId) !== -1
            ) {
                temp.splice(index - 1, 2)
            } else {
                if (temp[index].compId === 'C829AF79A66B49DCA1A623655B98AEC4') {
                    this.sign = 'condition'
                }
                temp.splice(index, 1)
            }
            this.conditionList = temp
        },
        // 条件参数配置
        condition() {
            console.log('条件参数配置')
            // this.conditionForm.compName = this.conditionList[index].desc ? this.conditionList[index].desc : this.conditionList[index].compName
            // this.conditionForm.logicOrder = this.conditionList[index].logicOrder
            let condition = this.conditionList[this.index]
            this.tempConditionForm = JSON.parse(JSON.stringify(condition))
            
            if (
                [
                    'BD0EE79CAE344BA7BCB89B379775A660',
                    'FAE46E4B411A4551BE19A49902BF28FA',
                    '05CB4238EB404FFE970523EB7B2E3596',
                    'FD0B9F92240748F3ABC489AF5C93F2E7',
                ].indexOf(condition.compId) !== -1
            ) {
                this.$message({
                    type: 'warning',
                    message: '符号无法配置条件',
                })
                return
            }
            this.innerTitle = condition.compName + ' -- ' + '参数配置'
            if (!condition.parameters || condition.parameters.length === 0) {
                this.getParamList().then((res) => {
                    this.$set(
                        this.conditionForm,
                        'paramForm',
                        res.data.sort(this.sortOrder),
                    )
                })
            } else {
                this.getParamList().then((res) => {
                    console.log('res=>' + JSON.stringify(res))
                    this.$set(
                        this.conditionForm,
                        'paramForm',
                        res.data.sort(this.sortOrder),
                    )
                    
                    console.log(this.conditionForm.paramForm)
                    console.log(this.tempConditionForm.parameters)
                    let temp = this.tempConditionForm.parameters
                    this.conditionForm.paramForm.forEach((param, index) => {
                        if (temp[index].paramComment && temp[index].paramPath && temp[index].paramPath.indexOf('(') === -1) {
                            this.$set(param, 'paramPath', temp[index].paramPath + '  (' + temp[index].paramComment + ')')
                        }else{
                            this.$set(param, 'paramPath', temp[index].paramPath)
                        }
                    })
                })
            }
            this.innerVisible = true
            this.$nextTick(() => {
                this.$refs.conditionForm.clearValidate()
            })
        },
        sortOrder(a, b) {
            return a.paramOrder * 1 - b.paramOrder * 1
        },
        // 菜单展示
        showContextMenu(ev) {
            // console.log("菜单展示");
            // console.log(this.conditionList);
            ev.preventDefault()
            let x = ev.clientX + 10
            let y = ev.clientY + 15
            this.menuData.axis = { x, y }
        },
        transferIndex() {},
        selectInput(index) {
            console.log('selectInput')
            this.paramFormIndex = index
            // console.log(this.multipleSelection);
        },
        // 取消时删除参数
        innerClear() {
            console.log('innerClear')
            if (this.operation === 'add') {
                this.$refs.conditionForm.resetFields()
            } else {
                this.$set(
                    this.conditionForm,
                    'paramForm',
                    this.tempConditionForm.parameters,
                )
            }
            this.innerVisible = false
        },
        // 参数同步
        sync() {
            console.log('参数同步')
            this.$refs.conditionForm.validate((valid) => {
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
                                param.paramType = this.tempData.some(
                                    (item) => item.code === param.paramPath
                    && item.comment === param.paramComment,
                                )
                                    ? 2
                                    : 1
                                if (param.paramType === '1') {
                                    param.paramComment = ''
                                }
                            })
                            item.desc = this.conditionForm.compName
                            item.parameters = this.conditionForm.paramForm
                        }
                    })
                    // console.log(this.conditionList);
                    this.conditionForm.compName = ''
                    this.innerVisible = false
                }
            })
        },
        // 点击进入参数配置后发出请求获取参数配置信息详情
        getParamList() {
            console.log('getParamList')
            let promise = new Promise((resolve, reject) => {
                fox.service.request({
                    path: 'globle/componentDefine/paramList',
                    data: {},
                    callback(code, message, data) {
                        console.log(data)
                        if (code === 0) {
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
        // getRuleDetail(ruleId) {
        //   console.log("getRuleDetail");
        //   let promise = new Promise((resolve, reject) => {
        //     fox.service.request({
        //       app: backend.rule,
        //       path: "/api/ruleDefine/show",
        //       data: { ruleId },
        //       callback(code, message, data) {
        //         if (code == 0) {
        //           if (typeof data === "string") {
        //             data = JSON.parse(data);
        //           }
        //           resolve(data);
        //         } else {
        //           resolve(message);
        //         }
        //       },
        //     });
        //   });
        //   return promise;
        // },
        rowClick(row, column, event) {
            console.log('rowClick')
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
            // console.log(this.conditionForm);
            this.$set(this.conditionForm.paramForm, this.paramFormIndex, temp)
        },
        showMenu(index) {
            console.log('showMenu')
            this.transferIndex = index // tranfer index to child component
            event.preventDefault()
            let x = event.clientX
            let y = event.clientY
            this.contextMenuData.axis = {
                x,
                y,
            }
        },
        doSave() {
            console.log('doSave')
            this.$refs.temp.validate((valid) => {
                if (valid) {
                    this.onSubmit = true
                    let list = this.conditionList
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].compId === '05CB4238EB404FFE970523EB7B2E3596') {
                            for (let x = 0; x < list.length; x++) {
                                if (
                                    list[x].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7'
                  && list[x].count === list[i].count
                                ) {
                                    if (x - i === 1) {
                                        this.$message({
                                            message: '括号内部不能为空',
                                            type: 'warning',
                                        })
                                        return
                                    } else if (x - i === 2) {
                                        this.$message({
                                            message: '括号内部不能只含有一个条件',
                                            type: 'warning',
                                        })
                                        return
                                    }
                                }
                            }
                        }
                    }
                    let { temp } = this
                    temp.eventList = []
                    this.eventData.forEach((item) => {
                        const tempEvent = {}
                        if (item.eventType === '1') {
                            tempEvent.eventType = '1'
                            if (typeof item.authRole === 'object') {
                                tempEvent.authRole = ''
                                item.authRole.forEach((role) => {
                                    tempEvent.authRole += role
                                    tempEvent.authRole += ','
                                })
                                tempEvent.authRole = tempEvent.authRole.slice(0, -1)
                            } else {
                                tempEvent.authRole = item.authRole
                            }
                            tempEvent.authType = item.authType
                            // console.log(this.eventData);
                            if (item.checkList.length === 2) {
                                tempEvent.authChannel = '11'
                            } else if (
                                item.checkList.length === 1 && item.checkList[0] === '云银行'
                            ) {
                                tempEvent.authChannel = '10'
                            } else if (
                                item.checkList.length === 1
                && item.checkList[0] === '移动厅堂'
                            ) {
                                tempEvent.authChannel = '01'
                            } else if (item.checkList.length === 0) {
                                this.onSubmit = false
                                this.$message({
                                    type: 'warning',
                                    message: '必须选择授权渠道',
                                })
                            }
                            tempEvent.authRemark = item.authRemark
                        }
                        if (item.eventType === '2') {
                            tempEvent.eventType = '2'
                            tempEvent.msgCode = item.msgCode
                            this.allDics.RULE_REFUSE_CODE.forEach((msg) => {
                                if (msg.code === item.msgCode) {
                                    tempEvent.msgContent = msg.text
                                }
                            })
                        }
                        if (item.eventType === '3') {
                            tempEvent.eventType = '3'
                            tempEvent.msgCode = item.msgCode
                            this.allDics.RULE_ALERT_CODE.forEach((msg) => {
                                if (msg.code === item.msgCode) {
                                    tempEvent.msgContent = msg.text
                                }
                            })
                        }
                        temp.eventList.push(tempEvent)
                    })
                    let list1 = this.conditionList
                    temp.triggerType = '1'
                    const tempList = []
                    list1.forEach((item) => {
                        if (!item.flag) {
                            tempList.push(item)
                        }
                    })
                    for (const i in tempList) {
                        if (!tempList[i].parameters) {
                            const a = Number(i) + 1
                            const tempName = tempList[i].desc
                                ? tempList[i].desc
                                : tempList[i].compName
                            this.$message({
                                type: 'warning',
                                message: '第' + a + '个条件--' + tempName + '未配置参数',
                            })
                            return
                        }
                    }
                    if (
                        list1.length === 1
            && list1[0].compId === 'C829AF79A66B49DCA1A623655B98AEC4'
                    ) {
                        temp.isCondition = 0
                        temp.conditionList = []
                    } else {
                        temp.isCondition = 1
                        temp.conditionList = []
                        // ------------------------------------------------
                        for (let i of list1) {
                            let Obj = {}
                            if (!i.flag) {
                                Obj.conditionInfo = {
                                    compId: i.compId,
                                    compName: i.compName,
                                    compClass: i.compClass,
                                    desc: i.desc,
                                    logicOrder: i.logicOrder,
                                }
                                Obj.parameters = i.parameters
                            } else {
                                Obj.conditionInfo = {
                                    compId: i.compId,
                                    compName: i.compName,
                                    name: i.name,
                                    flag: i.flag,
                                    count: i.count,
                                }
                            }
                            temp.conditionList.push(Obj)
                        }
                    }
                    // ------------------------------------------
                    temp.ruleType = '0'
                    if (!this.onSubmit) {
                        return
                    }
                    if (this.operation === 'add') {
                        temp.flag = 1
                    } else {
                        temp.flag = 2
                    }
                    // ------------------------------------
                    temp.ruleDefine = {
                        ruleName: temp.ruleName,
                        flag: temp.flag,
                        isCondition: temp.isCondition,
                        isOpen: temp.isOpen,
                        ruleType: temp.ruleType,
                        triggerType: temp.triggerType,
                    }
                    delete temp.ruleName
                    delete temp.ruleType
                    delete temp.flag
                    delete temp.isCondition
                    delete temp.isOpen
                    delete temp.triggerType
                    createPublicRule(temp)
                        .then(() => {
                            this.$message({
                                message: '保存成功',
                                type: 'success',
                            })
                            // console.log(this.temp.parameters);
                            // this.dialogVisible = false
                            // this.$parent.fetchData()
                            this.$emit('fetchData')
                        })
                        .catch((rej) => {})
                }
            })
        },
        getChildData(val) {
            console.log('getChildData')
            this.eventData = val
        },
        // 重置
        reset() {
            this.conditionList = []
            this.eventOperation = 0
            this.sign = 'condition'
        },
        // 列表转多维数组
        arrayToMutiArray(data, tempData) {
            console.log('列表转多维数组')
            if (!data) {
                return
            }
            for (let i = 0; i < data.length; i++) {
                if (!data[i].flag) {
                    tempData.push(data[i])
                }
                if (data[i].compId === 'BD0EE79CAE344BA7BCB89B379775A660') {
                    tempData[tempData.length - 1].logicNext = '1'
                }
                if (data[i].compId === 'FAE46E4B411A4551BE19A49902BF28FA') {
                    tempData[tempData.length - 1].logicNext = '2'
                }
                if (data[i].compId === '05CB4238EB404FFE970523EB7B2E3596') {
                    let innerList = []
                    for (let x = i + 1; x < data.length; x++) {
                        if (
                            data[x].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7'
              && data[x].count === data[i].count
                        ) {
                            if (
                                data[x + 1]
                && [
                    'BD0EE79CAE344BA7BCB89B379775A660',
                    'FAE46E4B411A4551BE19A49902BF28FA',
                ].indexOf(data[x + 1].compId) !== -1
                            ) {
                                innerList.push(data[x + 1])
                                i = x + 1
                            } else {
                                i = x
                            }
                            break
                        } else {
                            innerList.push(data[x])
                        }
                    }
                    tempData.push([])
                    this.arrayToMutiArray(innerList, tempData[tempData.length - 1])
                }
            }
        },
        // 数据库返回数据转条件列表
        detail(list) {
            console.log('数据库返回数据转条件列表')
            let len = 1
            let conditionList = []
            let el = {}
            el.name = ')'
            el.compId = 'FD0B9F92240748F3ABC489AF5C93F2E7'
            el.flag = true
            let list1 = list
            let symbol = this.symbolList
            for (let i = 0; i < list1.length; i++) {
                let obj = list1[i]
                let temp = obj.logicOrder.split('.')
                if (temp.length > len) {
                    for (let q = 0; q < temp.length - len; q++) {
                        conditionList.push(symbol[2])
                    }
                } else {
                    for (let m = 0; m < len - temp.length; m++) {
                        conditionList.push(el)
                    }
                }
                len = temp.length
                console.log(temp)
                conditionList.push(obj)
                if (obj.logicNext === '1') {
                    conditionList.push(symbol[0])
                }
                if (obj.logicNext === '2') {
                    conditionList.push(symbol[1])
                }
                if (i < list1.length - 1) {
                    let temp1 = list1[i + 1].logicOrder.split('.')
                    let diff = this.compareArr(temp, temp1)
                    console.log(diff)
                    if (diff === 1) {
                        continue
                    }
                    if (temp.length === temp1.length) {
                        if (diff === temp.length) {
                            for (let _ = 0; _ < diff - 1; _++) {
                                conditionList.push(el)
                                len = 1
                            }
                        } else {
                            conditionList.push(el)
                            len = temp.length - 1
                        }
                    }
                    let maxLen = temp.length > temp1.length ? temp.length : temp1.length
                    if (temp.length > temp1.length && diff === maxLen) {
                        for (let p = 0; p < temp.length - 1; p++) {
                            conditionList.push(el)
                            len = 1
                        }
                    }
                    if (temp.length < temp1.length) {
                        if (diff === maxLen) {
                            for (let l = 0; l < temp.length - 1; l++) {
                                conditionList.push(el)
                                len = 1
                            }
                        } else {
                            // for (var _ = 0; _ < temp.length - 1; _++) {
                            //   conditionList.push(el)
                            //   len = temp.length
                            // }
                        }
                    }
                }
                if (i === list1.length - 1) {
                    for (let a = 0; a < temp.length - 1; a++) {
                        conditionList.push(el)
                    }
                }
            }
            for (let x = 0; x < conditionList.length - 1; x++) {
                if (
                    [
                        'BD0EE79CAE344BA7BCB89B379775A660',
                        'FAE46E4B411A4551BE19A49902BF28FA',
                    ].indexOf(conditionList[x].compId) !== -1
          && conditionList[x + 1].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7'
                ) {
                    [conditionList[x], conditionList[x + 1]] = [
                        conditionList[x + 1],
                        conditionList[x],
                    ]
                }
            }
            let symbolCount = 0
            for (let t = 0; t < conditionList.length; t++) {
                if (conditionList[t].compId === '05CB4238EB404FFE970523EB7B2E3596') {
                    for (let y = t + 1; y < conditionList.length; y++) {
                        let tempCount = 1
                        if (
                            conditionList[y].compId === '05CB4238EB404FFE970523EB7B2E3596'
                        ) {
                            tempCount++
                        } else if (!conditionList[y].flag) {
                            let level = conditionList[y].logicOrder.split('.').length
                            tempCount = level - tempCount
                            break
                        }
                    }
                    for (let r = t + 1; r < conditionList.length; r++) {
                        if (
                            conditionList[r].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7'
                        ) {
                            let tempCount1 = 1
                            for (let u = r - 1; u > 0; u--) {
                                if (
                                    conditionList[u].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7'
                                ) {
                                    tempCount1++
                                } else if (!conditionList[u].flag) {
                                    let level1 = conditionList[u].logicOrder.split('.').length
                                    tempCount1 = level1 - tempCount1
                                    break
                                }
                            }
                        }
                        if (tempCount === tempCount1) {
                            let leftObj = {}
                            leftObj.compId = '05CB4238EB404FFE970523EB7B2E3596'
                            leftObj.flag = true
                            leftObj.name = '('
                            leftObj.count = symbolCount
                            conditionList[t] = leftObj
                            let rightObj = {}
                            rightObj.compId = 'FD0B9F92240748F3ABC489AF5C93F2E7'
                            rightObj.flag = true
                            rightObj.name = ')'
                            rightObj.count = leftObj.count
                            conditionList[r] = rightObj
                            symbolCount++
                            tempCount1 = null
                            break
                        }
                    }
                }
            }
            console.log(JSON.stringify(conditionList))
            return conditionList
        },
        compareArr(list1, list2) {
            console.log('compareArr')
            let i = 0
            let len = list1.length > list2.length ? list1.length : list2.length
            for (let m = 0; m < len; m++) {
                if (list1[m] === list2[m]) {
                    i++
                } else {
                    return len - i
                }
            }
            return i
        },
    },
    mounted: function () {
    // console.log("mounted");
    
        listMount()
            .then((data) => {
                this.$message({
                    message: '加载成功',
                    type: 'success',
                })
                console.log('data=>' + JSON.stringify(data))
                let symbolList1 = data.filter((value) => value.compType === '1')
                for (let i = 0; i < symbolList1.length; i++) {
                    symbolList1[i].flag = true
                }
                for (let i = 0; i < symbolList1.length; i++) {
                    if (symbolList1[i].compId === 'FD0B9F92240748F3ABC489AF5C93F2E7') {
                        symbolList1.splice(i, 1)
                    } else if (
                        symbolList1[i].compId === '05CB4238EB404FFE970523EB7B2E3596'
                    ) {
                        symbolList1[i].name = '('
                    }
                }
                this.symbolList[0] = symbolList1[1]
                this.symbolList[1] = symbolList1[3]
                this.symbolList[2] = symbolList1[0]
                this.symbolList[3] = symbolList1[2]
                // ----------------------------------------
                this.componentList = data.filter((value) => value.compType === '2')
            })
            .catch((rej) => {})
        // 待修改
        this.allDics.RULE_REFUSE_CODE = []
        this.allDics.RULE_COMPONENT_TYPE = []
        this.allDics.RULE_ALERT_CODE = []
    },
}
</script>

<style scoped>
.left-main {
  max-height: 400px;
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