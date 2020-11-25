<!-- @author Help-Generator Template By ZhouMengLan -->
<template>
  <div class="fixed-select-height public">
    <!--表数据详情弹出框-->
    <fox-dialog
        :title="dialogTitle" 
        :visible.sync="dialogVisible"
        width="75%"
        center>
      <fox-container>
          <fox-main class="sceneRuleMain">
            <fox-form
              ref="temp"
              :model="temp"
              size="small"
              label-width="100px">
              <el-row :gutter="10" style="width:800px;">
                <el-col :span="11">
                  <el-form-item
                    :label-width="labelWidth"
                    :rules="[
                      { required: true, message:'请输入场景码' },
                    ]"
                    label="场景码:"
                    prop="sceneCode">
                    <el-select
                      v-model="temp.sceneCode"
                      :disabled="operation === 'detail'||operation === 'update'"
                      filterable
                      placeholder="请选择"
                      size="mini"
                      style="width: 270px"
                      clearable>
                      <el-option
                        v-for="item in params.sceneList"
                        :key="item.scene"
                        :label="item.scene +'--'+item.sceneName"
                        :value="item.scene"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item
                    :label-width="labelWidth"
                    :rules="[
                      { required: true, message:'请输入服务码' },
                    ]"
                    label="服务码:"
                    prop="serverCode">
                    <el-select
                      v-model="temp.serverCode"
                      :disabled="operation === 'detail'||operation === 'update'"
                      filterable
                      placeholder="请选择"
                      size="mini"
                      clearable
                      style="width: 235px"
                      @change="serverChange">
                      <el-option
                        v-for="(item,index) in params.serverList"
                        :key="index"
                        :label="item.code +'--'+item.comment"
                        :value="item.code"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="21">
                  <el-form-item
                    :label-width="labelWidth"
                    label="描述:"
                    prop="des">
                    <el-input v-model="temp.des" :disabled="operation === 'detail'" size="mini" style="width: 605px"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="sceneRule">
                <el-row v-for="(item,index) in temp.ruleList" :key="index" :gutter="10">
                  <el-divider content-position="left">
                    <span v-if="item.ruleType==='0'">公共</span ><span v-else>私有</span>规则
                  </el-divider>
                  <div style="width: 800px">
                    <el-col :span="11">
                      <el-form-item
                        :label-width="labelWidth"
                        :prop="'ruleList.' + index + '.ruleName'"
                        :rules="{
                          required: true, message: '规则名称不能为空', trigger: 'blur'
                        }"
                        label="规则名称:">
                        <el-input
                          v-model="item.ruleName"
                          :disabled="operation === 'detail'||item.ruleType==='0'"
                          size="mini"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item
                        :label-width="labelWidth"
                        :prop="'ruleList.' + index + '.isOpen'"
                        :rules="{
                          required: true, message: '启用状态不能为空', trigger: 'blur'
                        }"
                        label="是否启用:">
                        <el-select
                          v-model="item.isOpen"
                          :disabled="operation === 'detail'||item.ruleType==='0'"
                          style="width: 100%"
                          size="mini">
                          <el-option value="0" label="否"/>
                          <el-option value="1" label="是"/>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20" style="height: 100px ;padding-left: 0">
                      <el-form-item
                        :label-width="labelWidth"
                        class="itemList"
                        label="判断条件:"
                        prop="name"
                        style="margin-bottom: 0">
                        <div
                          style="border-radius: 5px;border: 1px #aebebd solid;height: 80px; text-align: center;width: 610px">
                          <draggable
                            :list="item.conditionList"
                            v-bind="{group:{name:(item.ruleType==='0'||item.isCondition==0||operation==='detail')?'other':sign },filter:'.undraggable,',sort:false}"
                            :class="'dragArea'+index"
                            style="height: 100%;width:100%;overflow-x: auto;overflow-y: hidden;white-space: nowrap;"
                            @start="start"
                            @end="end"
                            @add="add"
                            @change="onChange">
                            <span
                              v-for="(mem,i) in item.conditionList"
                              :class="{undraggable:mem.flag||operation==='detail'||item.ruleType==='0'}"
                              :key="i"
                              @mouseenter="enter(i,item,index)"
                              @contextmenu="showContextMenu($event,index)">
                              <span
                                v-if="mem.compId==='003'||mem.compId==='004'"
                                style="font-size: 30px;width: 25px;display: inline-block;text-align: center;">{{ mem.name }}</span>
                              <span v-else-if="mem.compId==='001'"><el-button
                                circle
                                size="mini"
                                class="pan-btn pink-btn"
                                @click="symbolChange(item.ruleType)">{{ mem.compName }}</el-button></span>
                              <span v-else-if="mem.compId==='002'"><el-button
                                circle
                                size="mini"
                                class="pan-btn green-btn"
                                @click="symbolChange(item.ruleType)">{{ mem.compName }}</el-button></span>
                              <el-button v-else style="margin-top: 16px" size="mini" @dblclick.native="condition"><span
                                v-if="mem.desc">{{ mem.desc }}</span><span v-else>{{ mem.compName }}</span></el-button>
                            </span>
                          </draggable>
                        </div>
                      </el-form-item>
                    </el-col>
                    <el-col
                      v-show="operation !== 'detail'"
                      :span="4"
                      style="height: 45px;width: 80px"
                      direction="vertical">
                      <el-button size="mini" style="margin-left: 40px" @click.prevent="removeRule(item,index)">删除规则
                      </el-button>
                      <el-button
                        v-if="item.ruleType!=='0'"
                        style="margin-left: 40px;margin-top: 10px"
                        size="mini"
                        @click="addEvent(index)">添加事件
                      </el-button>
                    </el-col>
                  </div>
                  <el-col :span="23" style="padding-left: 0">
                    <event
                      :event-operation="eventOperation"
                      :event-list="item.eventList"
                      :rule-type="item.ruleType"
                      @removeEvent="removeEvent($event,index)"/>
                  </el-col>
                </el-row>
              </div>
            </fox-form>
            <fox-group label-width="80px">
                <fox-item>
                    <fox-button-row align="center">
                        <fox-button
                        v-show="operation === 'add'"
                        size="mini"
                        type="primary"
                        class="pan-btn success-btn"
                        @click="doSave()">提交
                        </fox-button>
                        <fox-button
                        v-show="operation === 'update'"
                        size="mini"
                        type="primary"
                        class="pan-btn light-blue-btn"
                        @click="doSave()">保存
                        </fox-button>
                        <fox-button
                        v-show="operation === 'add'||operation === 'update'"
                        size="mini"
                        type="primary"
                        class="pan-btn tiffany-btn"
                        @click="preAddRule">添加规则
                        </fox-button>
                        <fox-button
                        v-show="operation === 'add'"
                        size="mini"
                        type="primary"
                        class="pan-btn red-btn"
                        @click="reset">重置
                        </fox-button>
                    </fox-button-row>
                </fox-item>
            </fox-group>
          </fox-main>
        
        <fox-aside style="border-left:1px dashed ;width: 18vw;" class="sceneRule">
          <draggable
            :list="symbolList"
            v-bind="{group:{name:sign1,pull:'clone'},filter:'.undraggable',sort:false}"
            @start="start1"
            @end="end1">
            <span v-for="(item ,index) in symbolList" :key="index">
              <el-button
                v-if="item.compId!=='001'&&item.compId!=='002'"
                slot="reference"
                round
                style="width: 115px;margin: 10px"><span
                  v-if="item.compId==='003'">{{ item.name }}          )</span><span v-else>{{ item.compName }}</span>
              </el-button>
            </span>
          </draggable>
          <draggable
            :list="componentList"
            v-bind="{group:{name:sign2,pull:'clone'},filter:'.undraggable',sort:false}"
            @start="start2"
            @end="end2">
            <span v-for="(item ,index) in componentList" :key="index">
              <el-popover
                v-if="['001','002','003','004'].indexOf(item.compId)===-1"
                :title="item.compName"
                :content="item.compDes"
                :offset="50"
                :close-delay="50"
                :open-delay="150"
                placement="right"
                trigger="hover"
                transition="el-zoom-in-bottom">
                <el-button slot="reference" round style="width: 115px;margin: 10px">{{ item.compName }}</el-button>
              </el-popover>
            </span>
          </draggable>
        </fox-aside>
      </fox-container>
      <vue-context-menu
        id="menu"
        :context-menu-data="menuData"
        style="padding-left:0"
        @remove="remove"
        @symbol="symbol"
        @condition="condition"></vue-context-menu>
      
      <fox-dialog
        :title="innerTitle"
        :visible.sync="innerVisible"
        width="50%"
        append-to-body
        center
        class="scene"
        @close="paramFormIndex=''">
        <el-container>
          <el-container>
            <el-main style="max-height: 340px;max-width:430px;overflow: auto;padding-left: 0;padding-top: 3px">
              <el-form ref="conditionForm" :model="conditionForm" :disabled="paramFormDisabled">
                <el-form-item label-width="120px" label="条件名称: " prop="compName" style="margin-bottom: 37px">
                  <el-input v-model="conditionForm.compName" size="mini" style="width: 250px" @input="$forceUpdate()"/>
                </el-form-item>
                <div>
                  <el-divider content-position="left">参数</el-divider>
                  <el-form-item
                    v-for="(item,index) in conditionForm.paramForm"
                    :label="item.paramName+':'"
                    :key="index"
                    :rules="[
                      { required: true, message:'该数据为必输项' },
                    ]"
                    :prop="'paramForm.'+index+'.paramPath'"
                    label-width="120px">
                    <el-input
                      v-if="!item.paramSource||item.paramSource==='NULL'"
                      v-model="item.paramPath"
                      size="mini"
                      style="width: 250px"
                      clearable
                      @blur="selectInput(index)"
                      @clear="item.paramComment=''"/>
                    <el-select
                      v-else
                      v-model="item.paramPath"
                      size="mini"
                      style="width: 250px"
                      clearable
                      @clear="item.paramComment=''">
                      <el-option v-for="(mem,i) in allDics[item.paramSource]" :label="mem.text" :key="i" :value="mem.code"/>
                    </el-select>
                  </el-form-item>
                </div>
              </el-form>
            </el-main>
            <el-footer>
              <div style="margin-top: 20px;text-align: center">
                <el-button size="mini" class="pan-btn tiffany-btn" @click="sync">确定</el-button>
                <el-button size="mini" class="pan-btn red-btn" @click="innerClear">取消</el-button>
              </div>
            </el-footer>
          </el-container>
          <el-aside style="width: 300px;height: 350px">
            <el-tabs v-model="activeName" type="border-card" class="scene" @tab-click="handleClick">

              <el-tab-pane label="服务报文" name="second">
                <el-table
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :data="serverInput"
                  row-key="id"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  default-expand-all
                  style="width: 100%;"
                  @row-click="rowClick"
                >
                  <el-table-column prop="code" label="输入数据">
                    <template slot-scope="scope">
                      <span>
                        {{ scope.row.code }} ({{ scope.row.comment }})
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :data="serverOutput"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  :default-sort="{prop:'valueType',order:'ascending'}"
                  highlight-current-row
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  border
                  size="small"
                  default-expand-all
                  @row-click="rowClick">
                  <el-table-column prop="code" label="返回数据">
                    <template slot-scope="scope">
                      <span>
                        {{ scope.row.code }} ({{ scope.row.comment }})
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="公共报文" name="first">
                <el-table
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :data="publicInput"
                  row-key="id"
                  border
                  fit
                  size="mini"
                  highlight-current-row
                  default-expand-all
                  style="width: 100%;"
                  @row-click="rowClick"
                >
                  <el-table-column prop="code" label="输入数据">
                    <template slot-scope="scope">
                      <span>
                        {{ scope.row.code }} ({{ scope.row.comment }})
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  :data="publicOutput"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                  :default-sort="{prop:'valueType',order:'ascending'}"
                  highlight-current-row
                  style="width: 100%;margin-bottom: 20px;"
                  row-key="id"
                  border
                  size="small"
                  default-expand-all
                  @row-click="rowClick">
                  <el-table-column prop="code" label="返回数据">
                    <template slot-scope="scope">
                      <span>
                        {{ scope.row.code }} ({{ scope.row.comment }})
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </el-aside>
        </el-container>
      </fox-dialog>
      <el-dialog :title="innerTitle1" :visible.sync="innerVisible1" width="20%" append-to-body center>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          size="small">
          <el-form-item
            :label-width="formLabelWidth"
            :rules="{
              required: true, message: '规则类型不能为空', trigger: 'blur'
            }"
            label="规则类型:"
            prop="ruleType">
            <el-select v-model="ruleForm.ruleType" size="mini">
              <el-option v-for="item in options" :value="item.ruleId" :label="item.ruleName" :key="item.ruleId"/>
            </el-select>
          </el-form-item>
          <el-form-item
            v-if="ruleForm.ruleType==='0'"
            :label-width="formLabelWidth"
            :rules="{
              required: true, message: '规则名称不能为空', trigger: 'blur'
            }"
            label="规则名称:"
            prop="ruleId">
            <el-select v-model="ruleForm.ruleId" clearable filterable size="mini">
              <el-option
                v-for="item in publicRules"
                :label="item.ruleName"
                :key="item.ruleId"
                :value="item.ruleId"/>
            </el-select>
          </el-form-item>
        </el-form>
        <div style="margin-top: 20px;text-align: center;">
          <el-button size="mini" class="pan-btn tiffany-btn" @click="addRule">确定</el-button>
          <el-button size="mini" class="pan-btn red-btn" @click="innerVisible1=false">取消</el-button>
        </div>
      </el-dialog>
    </fox-dialog>
  </div>
</template>
<script>
// import { listRRuleDefineData, getRRuleDefineData } from '@/api/common/authorManage/publicRules'
import draggable from 'vuedraggable'
import event from './event'
// import { portFieldsList } from '@/api/system/portQuery'
// import { createSceneRule, detailSceneRule } from '@/api/common/authorManage/sceneRules'
// import { getRComponentParameterData, listAllRComponentDefineData } from '@/api/common/authorManage/ruleComponent'

let count = 0
let logicOrder = 1
export default {
    components: {
        draggable,
        event,
    },
    props: {
    // 弹框标题
        dialogTitle: {
            type: String,
            default: '',
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
    data() {
        this.dicTypes = ['RULE_REFUSE_CODE', 'RULE_COMPONENT_TYPE', 'RULE_ALERT_CODE', 'RULE_CASH_FLAG']
        return {
            activeName: 'second',
            value: [],
            publicInput: [],
            publicOutput: [],
            serverInput: [],
            serverOutput: [],
            publicData: [],
            serverData: [],
            ruleType: [],
            props: {
                label: 'ruleName',
                value: 'ruleId',
            },
            options: [
                {
                    ruleId: '1',
                    ruleName: '私有规则',
                },
                {
                    ruleId: '0',
                    ruleName: '公共规则',
                },
            ],
            ruleList: [],
            userContext: [],
            serverContext: [],
            formLabelWidth: '100px',
            innerVisible: false,
            innerVisible1: false,
            innerTitle: '',
            innerTitle1: '',
            eventOperation: '',
            sign: 'condition',
            sign1: '',
            sign2: '',
            onSubmit: true,
            disabled: false,
            symbolList: [{
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
            paramFormDisabled: false,
            componentList: [],
            index: '',
            itemIndex: 0,
            ruleForm: {},
            dialogVisible: false,
            temp: {
                sceneCode: '1234',
                serverCode: '11234',
            },
            conditionForm: {
                logicOrder: '',
                compName: '',
            },
            contextType: '1',
            paramForm: [],
            paramFormIndex: '',
            labelWidth: '85px',
            publicRules: [],
            tempConditionForm: [],
            menuData: {
                menuName: 'contextName',
                axis: { x: null, y: null },
                menulists: [],
            },
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
                this.eventOperation = newVal
                if (newVal === 'detail') {
                    this.sign = 'other'
                } else {
                    this.sign = 'condition'
                }
            },
        },
    },
    mounted: function() {
        this.searchComponent()
        this.getPublicRules()
        this.getContext()
    },
    methods: {
        listToTree(data) {
            console.log('listToTree')
            let result = []
            let map = {}
            data.forEach((item) => {
                map[item.id] = item
            })
            data.forEach((item) => {
                let parent = map[item.parentId]
                if (parent) {
                    (parent.children || (parent.children = [])).push(item)
                } else {
                    result.push(item)
                }
            })
            return result
        },
        handleClick(tab, event) {
            console.log('handleClick')
            console.log(tab)
            if (tab.name === 'first') {
                this.contextType = '1'
            } else if (tab.name === 'second') {
                this.contextType = '2'
            }
        },
        selectInput(index) {
            this.paramFormIndex = index
        },
        // 取消时删除参数
        innerClear() {
            console.log('取消时删除参数')
            if (this.operation === 'add') {
                this.$refs.conditionForm.resetFields()
            } else {
                this.$set(this.conditionForm, 'paramForm', this.tempConditionForm.parameters)
            }
            this.innerVisible = false
        },
        // 参数同步至输入
        rowClick(row, column, event) {
            console.log('参数同步至输入')
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
            this.$set(this.conditionForm.paramForm, this.paramFormIndex, temp)
            console.log(JSON.stringify(this.conditionForm.paramForm))
        },
        // 获取服务报文
        serverChange() {
            console.log('获取服务报文')
            let code = this.temp.serverCode
            this.params.serverList.forEach((item) => {
                if (item.code === code) {
                    code = item.id
                }
            })
            portFieldsList({ serviceId: code }).then((response) => {
                if (response.state === '000000') {
                    this.serverInput = []
                    this.serverOutput = []
                    this.serverData = response.data
                    for (let i = 0; i < this.serverData.length; i++) {
                        let data = this.serverData[i]
                        if (data.type === '1') {
                            this.serverInput.push(data)
                        } else {
                            this.serverOutput.push(data)
                        }
                    }
                    this.serverOutput = this.listToTree(this.serverOutput)
                    this.serverInput = this.listToTree(this.serverInput)
                }
            })
        },
        // 获取公共规则
        getPublicRules() {
            console.log('获取公共规则')
            listRRuleDefineData({ pageSize: 1000 }).then((res) => {
                if (res.data.list.length > 0) {
                    // this.options[0].children = res.data.list
                    this.publicRules = res.data.list
                }
            })
        },
        // 获取公共报文
        getContext() {
            console.log('获取公共报文')
            portFieldsList({ serviceId: '201912160000000201' }).then((response) => {
                if (response.state === '000000') {
                    this.publicInput = []
                    this.publicOutput = []
                    this.publicData = response.data
                    for (let i = 0; i < this.publicData.length; i++) {
                        let data = this.publicData[i]
                        if (data.type === '1') {
                            this.publicInput.push(data)
                        } else {
                            this.publicOutput.push(data)
                        }
                    }
                    this.publicOutput = this.listToTree(this.publicOutput)
                    this.publicInput = this.listToTree(this.publicInput)
                }
            })
        },
        // 删除事件
        removeEvent(val, index) {
            console.log('删除事件')
            this.temp.ruleList[index].eventList.splice(val, 1)
        },
        // 删除规则
        removeRule(item, index) {
            console.log('删除规则')
            this.temp.ruleList.splice(index, 1)
        },
        // 获取条件
        searchComponent() {
            console.log('获取条件')
            listAllRComponentDefineData().then((res) => {
                this.componentList = res.data
            })
        },
        // 参数同步
        sync() {
            console.log('参数同步')
            this.$refs.conditionForm
                .validate((valid) => {
                    if (valid) {
                        this.temp.ruleList[this.itemIndex].conditionList.forEach((item) => {
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
                                    if (this.serverData.length !== 0) {
                                        for (let i = 0; i < this.serverData.length; i++) {
                                            if (this.serverData[i].code === param.paramPath && this.serverData[i].comment === param.paramComment) {
                                                param.paramType = param.state === '1' ? '3' : '4'
                                                break
                                            } else {
                                                param.paramType = ''
                                            }
                                        }
                                    } else {
                                        param.paramType = ''
                                    }
                                    if (param.paramType === '') {
                                        param.paramType = this.publicData.some((item) => item.code === param.paramPath && item.comment === param.paramComment) ? '2' : '1'
                                    }
                                    if (param.paramType === '1') {
                                        param.paramComment = ''
                                    }
                                })
                                item.desc = this.conditionForm.compName
                                item.parameters = this.conditionForm.paramForm
                            }
                        })
                        this.conditionForm.compName = ''
                        this.innerVisible = false
                    }
                })
        },
        // 条件删除
        remove() {
            console.log('条件删除')
            if (this.temp.ruleList[this.itemIndex].ruleType === '0') {
                this.$message({
                    type: 'warning',
                    message: '无法修改公共规则',
                })
                return
            }
            let temp = this.temp.ruleList[this.itemIndex].conditionList
            let { index } = this
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
        // 条件配置
        condition() {
            console.log('条件配置')
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
                getRComponentParameterData({ compId: condition.compId }).then((res) => {
                    this.$set(this.conditionForm, 'paramForm', res.data.sort(this.sortOrder))
                })
            } else {
                getRComponentParameterData({ compId: condition.compId }).then((res) => {
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
        sortOrder(a, b) {
            return a.paramOrder * 1 - b.paramOrder * 1
        },
        // 符号切换
        symbol() {
            console.log('符号切换1')
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
        // 符号切换
        symbolChange(ruleType) {
            console.log('符号切换')
            console.log(ruleType)
            if (ruleType === '0') {
                return
            }
            this.symbol()
        },
        // 动态右键菜单
        enter(index, item, itemIndex) {
            console.log('动态右键菜单')
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
        // 右键菜单展示
        showContextMenu(ev, index) {
            console.log('右键菜单展示')
            console.log(this.temp.ruleList[index].conditionList)
            ev.preventDefault()
            let x = ev.clientX - 10
            let y = ev.clientY - 15
            this.menuData.axis = { x, y }
        },
        // 长度对比，判断层级
        compareArr(list1, list2) {
            console.log('长度对比，判断层级')
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
        // 数据库返回条件转条件列表
        detail(list) {
            console.log('数据库返回条件转条件列表')
            let len = 1
            let conditionList = []
            let el = {}
            el.name = ')'
            el.compId = '004'
            el.flag = true
            let list1 = list
            let symbol = this.symbolList
            for (let i = 0; i < list1.length; i++) {
                let obj = list1[i]
                let temp = obj.logicOrder.split('.')
                if (temp.length > len) {
                    let left = symbol[2]
                    for (let q = 0; q < temp.length - len; q++) {
                        conditionList.push(left)
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
                if (['001', '002'].indexOf(conditionList[x].compId) !== -1 && conditionList[x + 1].compId === '004') {
                    [conditionList[x], conditionList[x + 1]] = [conditionList[x + 1], conditionList[x]]
                }
            }
            let symbolCount = 0
            for (let t = 0; t < conditionList.length; t++) {
                if (conditionList[t].compId === '003') {
                    let tempCountTemp = ''
                    for (let y = t + 1; y < conditionList.length; y++) {
                        let tempCount = 1
                        if (conditionList[y].compId === '003') {
                            tempCount++
                            tempCountTemp = tempCount
                        } else if (!conditionList[y].flag) {
                            let level = conditionList[y].logicOrder.split('.').length
                            tempCount = level - tempCount
                            tempCountTemp = tempCount
                            break
                        }
                    }
                    let tempCount1Temp = ''
                    for (let r = t + 1; r < conditionList.length; r++) {
                        if (conditionList[r].compId === '004') {
                            let tempCount1 = 1

                            for (let u = r - 1; u > 0; u--) {
                                if (conditionList[u].compId === '004') {
                                    tempCount1++
                                    tempCount1Temp = tempCount1
                                } else if (!conditionList[u].flag) {
                                    let level1 = conditionList[u].logicOrder.split('.').length
                                    tempCount1 = level1 - tempCount1
                                    tempCount1Temp = tempCount1
                                    break
                                }
                            }
                        }
                        if (tempCountTemp === tempCount1Temp) {
                            let leftObj = {}
                            leftObj.compId = '003'
                            leftObj.flag = true
                            leftObj.name = '('
                            leftObj.count = symbolCount
                            conditionList[t] = leftObj
                            let rightObj = {}
                            rightObj.compId = '004'
                            rightObj.flag = true
                            rightObj.name = ')'
                            rightObj.count = leftObj.count
                            conditionList[r] = rightObj
                            symbolCount++
                            tempCount1Temp = null
                            break
                        }
                    }
                }
            }
            console.log(JSON.stringify(conditionList))
            return conditionList
        },
        // 事件添加
        addEvent(index) {
            console.log('事件添加')
            let item = this.temp.ruleList[index]
            let temp = {
                eventType: '',
                checkList: [],
            }
            item.eventList.push(temp)
        },
        preAddRule() {
            // if (!this.temp.serverCode || !this.temp.sceneCode) {
            //     this.$message({
            //         type: 'warning',
            //         message: '请先选择场景码和服务码',
            //     })
            //     return
            // }
            this.ruleForm = {}
            this.innerVisible1 = true
        },
        // 添加规则
        addRule() {
            console.log('添加规则')
            this.$refs.ruleForm
                .validate((valid) => {
                    if (valid) {
                        let temp = {}
                        temp.ruleName = ''
                        temp.isOpen = ''
                        temp.conditionList = []
                        temp.eventList = []
                        temp.ruleType = this.ruleForm.ruleType
                        if (this.ruleForm.ruleType === '0') {
                            getRRuleDefineData({ ruleId: this.ruleForm.ruleId }).then((res) => {
                                console.log(res)
                                let data = res.data.conditionList
                                let i = 0
                                data = this.detail(data)
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
                                    item.flag = true
                                })
                                console.log(data)
                                if (data.length === 0) {
                                    data.push(this.symbolList[3])
                                }
                                temp.conditionList = data
                                let { eventList } = res.data
                                eventList.forEach((item) => {
                                    let checkList = []
                                    if (item.authChannel) {
                                        if (item.authChannel === '11') {
                                            checkList = ['云银行', '移动厅堂']
                                        }
                                        if (item.authChannel === '10') {
                                            checkList = ['云银行']
                                        }
                                        if (item.authChannel === '01') {
                                            checkList = ['移动厅堂']
                                        }
                                        item.checkList = checkList
                                    }
                                })
                                temp.eventList = res.data.eventList
                                temp.ruleId = res.data.ruleId
                                temp.ruleName = res.data.ruleName
                                temp.isOpen = res.data.isOpen
                                temp.isCondition = res.data.isCondition
                                this.temp.ruleList.push(temp)
                            })
                        }
                        if (this.ruleForm.ruleType === '1') {
                            this.temp.ruleList.push(temp)
                        }
                        this.innerVisible1 = false
                    }
                })
        },
        //  重置
        reset() {
            this.temp.ruleList = []
            this.sign = 'condition'
        },
        // 条件列表拖拽变动
        onChange(ev) {
            let temp = this.temp.ruleList[this.itemIndex].conditionList
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
            this.temp.ruleList[this.itemIndex].conditionList = temp
        },
        // 条件拖拽添加
        add(ev) {
            this.itemIndex = Number(ev.to.className.substring(8))
            let temp = this.temp.ruleList[this.itemIndex].conditionList
            if (ev.item.textContent === '必须执行') {
                temp = []
                temp.push(this.symbolList[3])
                this.temp.ruleList[this.itemIndex].conditionList = temp
                this.temp.ruleList[this.itemIndex].isCondition = 0
                return
            }
            let index = ev.newIndex
            if (ev.item.textContent === '(          )') {
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
        // 拖拽区域动态变化
        start() {
            this.sign1 = 'delete'
            this.sign2 = 'delete'
        },
        end(ev) {
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
        // 列表转多维数组
        arrayToMutiArray(data, tempData) {
            if (!data) {
                return
            }
            for (let i = 0; i < data.length; i++) {
                if (!data[i].flag) {
                    tempData.push(data[i])
                }
                if (data[i].compId === '001') {
                    tempData[tempData.length - 1].logicNext = '1'
                }
                if (data[i].compId === '002') {
                    tempData[tempData.length - 1].logicNext = '2'
                }
                if (data[i].compId === '003') {
                    let innerList = []
                    for (let x = i + 1; x < data.length; x++) {
                        if (data[x].compId === '004' && data[x].count === data[i].count) {
                            if (data[x + 1] && ['001', '002'].indexOf(data[x + 1].compId) !== -1) {
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
        // 提交
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
        doReset() {
            let temp = {}
            temp.ruleList = []
            this.conditionForm = {}
            this.sign = 'condition'
            this.temp = temp
        },
        // 初始化数据
        initData() {
            console.log('初始化数据')
            if (this.operation === 'detail' || this.operation === 'update') {
                this.doReset()
                let { row } = this.params
                console.log(row)
                let params = {}
                params.sceneCode = row.scene
                params.serverCode = row.code
                // 注释部分为源码
                // detailSceneRule(params).then((res) => {
                //     console.log(res)
                //     if (res.data.ruleList) {
                //         let ruleList = res.data
                //         ruleList.forEach((rule) => {
                //             if (rule.isCondition === '0') {
                //                 rule.conditionList.push(this.symbolList[3])
                //             } else {
                //                 rule.conditionList = this.detail(rule.conditionList)
                //             }
                //             rule.eventList.forEach((item) => {
                //                 let checkList = []
                //                 if (item.authRole) {
                //                     if (item.authType === '1') {
                //                         item.authRole = item.authRole.split(',')
                //                     }
                //                 }
                //                 if (item.authChannel) {
                //                     if (item.authChannel === '11') {
                //                         checkList = ['云银行', '移动厅堂']
                //                     }
                //                     if (item.authChannel === '10') {
                //                         checkList = ['云银行']
                //                     }
                //                     if (item.authChannel === '01') {
                //                         checkList = ['移动厅堂']
                //                     }
                //                     item.checkList = checkList
                //                 }
                //             })
                //         })
                //     }
                //     let temp = {}
                //     temp.serverCode = res.data.serverCode
                //     temp.sceneCode = res.data.sceneCode
                //     temp.des = res.data.des
                //     temp.ruleList = ruleList
                //     this.temp = temp
                //     this.serverChange()
                // })

                let res = {
                    state: '000000',
                    customState: '000000',
                    level: '0',
                    message: null,
                    data: {
                        serverName: '设备签到',
                        serverCode: '/pass/devLogin',
                        des: null,
                        sceneCode: 'YB00002',
                        sceneName: '挂失补卡',
                        ruleList: [
                            {
                                conditionList: [
                                    {
                                        condId: '202005240000000127',
                                        compId: '5',
                                        logicNext: '1',
                                        compClass: 'rCompare0',
                                        ruleId: '202005090000000001',
                                        compName: '等于',
                                        logicOrder: '1',
                                        parameters: [
                                            {
                                                paramType: '1',
                                                paramOrder: '2',
                                                condId: '202005240000000127',
                                                paramSource: 'NULL',
                                                paramComment: '',
                                                paramPath: 'YB',
                                                paramName: '基准值',
                                                ruleId: '202005090000000001',
                                                paramId: '14',
                                            },
                                            {
                                                paramType: '2',
                                                paramOrder: '3',
                                                condId: '202005240000000127',
                                                paramSource: 'NULL',
                                                paramComment: '渠道（YT-柜面，YB-自助VTM）',
                                                paramPath: 'channel',
                                                paramName: '比较值',
                                                ruleId: '202005090000000001',
                                                paramId: '15',
                                            },
                                        ],
                                        desc: 'VTM',
                                    },
                                    {
                                        condId: '202005240000000128',
                                        compId: '2',
                                        logicNext: '1',
                                        compClass: 'rCompare2',
                                        ruleId: '202005090000000001',
                                        compName: '大于等于',
                                        logicOrder: '2.1',
                                        parameters: [
                                            {
                                                paramType: '1',
                                                paramOrder: '1',
                                                condId: '202005240000000128',
                                                paramSource: 'RULE_COMPONENT_TYPE',
                                                paramComment: null,
                                                paramPath: '2',
                                                paramName: '比较类型',
                                                ruleId: '202005090000000001',
                                                paramId: '4',
                                            },
                                            {
                                                paramType: '1',
                                                paramOrder: '2',
                                                condId: '202005240000000128',
                                                paramSource: null,
                                                paramComment: '',
                                                paramPath: '0.5',
                                                paramName: '基准值',
                                                ruleId: '202005090000000001',
                                                paramId: '5',
                                            },
                                            {
                                                paramType: '2',
                                                paramOrder: '3',
                                                condId: '202005240000000128',
                                                paramSource: null,
                                                paramComment: '人脸识别结果',
                                                paramPath: 'faceRet',
                                                paramName: '比较值',
                                                ruleId: '202005090000000001',
                                                paramId: '6',
                                            },
                                        ],
                                        desc: '大于等于0.5',
                                    },
                                    {
                                        condId: '202005240000000129',
                                        compId: '4',
                                        logicNext: null,
                                        compClass: 'rCompare4',
                                        ruleId: '202005090000000001',
                                        compName: '小于等于',
                                        logicOrder: '2.2',
                                        parameters: [
                                            {
                                                paramType: '1',
                                                paramOrder: '1',
                                                condId: '202005240000000129',
                                                paramSource: 'RULE_COMPONENT_TYPE',
                                                paramComment: null,
                                                paramPath: '2',
                                                paramName: '比较类型',
                                                ruleId: '202005090000000001',
                                                paramId: '10',
                                            },
                                            {
                                                paramType: '1',
                                                paramOrder: '2',
                                                condId: '202005240000000129',
                                                paramSource: 'NULL',
                                                paramComment: '',
                                                paramPath: '0.8',
                                                paramName: '基准值',
                                                ruleId: '202005090000000001',
                                                paramId: '11',
                                            },
                                            {
                                                paramType: '2',
                                                paramOrder: '3',
                                                condId: '202005240000000129',
                                                paramSource: 'NULL',
                                                paramComment: '人脸识别结果',
                                                paramPath: 'faceRet',
                                                paramName: '比较值',
                                                ruleId: '202005090000000001',
                                                paramId: '12',
                                            },
                                        ],
                                        desc: '小于等于0.8',
                                    },
                                ],
                                isOpen: '1',
                                eventList: [
                                    {
                                        authChannel: '11',
                                        authRole: 'M001',
                                        remark: '人脸识别不通过（相似度50%-80%），请注意审核客户身份真实性',
                                        eventType: '1',
                                        triggerType: '1',
                                        id: '202005240000000086',
                                        authType: '3',
                                        ruleId: '202005090000000001',
                                    },
                                ],
                                ruleType: '0',
                                isCondition: '1',
                                ruleName: 'VTM人脸识别0.5-0.8中心授权',
                                ruleId: '202005090000000001',
                            },
                        ],
                    },
                }
                console.log(res)
                let ruleList = ''
                if (res.data.ruleList) {
                    ruleList = res.data.ruleList
                    ruleList.forEach((rule) => {
                        if (rule.isCondition === '0') {
                            rule.conditionList.push(this.symbolList[3])
                        } else {
                            rule.conditionList = this.detail(rule.conditionList)
                        }
                        rule.eventList.forEach((item) => {
                            let checkList = []
                            if (item.authRole) {
                                if (item.authType === '1') {
                                    item.authRole = item.authRole.split(',')
                                }
                            }
                            if (item.authChannel) {
                                if (item.authChannel === '11') {
                                    checkList = ['云银行', '移动厅堂']
                                }
                                if (item.authChannel === '10') {
                                    checkList = ['云银行']
                                }
                                if (item.authChannel === '01') {
                                    checkList = ['移动厅堂']
                                }
                                item.checkList = checkList
                            }
                        })
                    })
                }
                let temp = {}
                temp.serverCode = res.data.serverCode
                temp.sceneCode = res.data.sceneCode
                temp.des = res.data.des
                temp.ruleList = ruleList
                this.temp = temp
                this.serverChange()
            } else if (this.operation === 'add') {
                this.doReset()
            }
            this.$nextTick(() => {
                this.$refs.temp.clearValidate()
            })
        },
    },
}
</script>
<style>
  .public .nav-name-right {
    position: relative;
    top: -2px;
    font-family: fantasy;
  }

  .public .no-child-btn {
    position: relative;

  }

  .public .context-menu-list {
    height: 20px;
    padding-left: 12px;
  }

  .public .el-divider--horizontal {
    margin: 10px;
  }

  .scene > .el-tabs__content {
    max-height: 300px;
    overflow: auto;
  }

  .scene .el-dialog__body {
    height: 420px;
  }

  .sceneRule {
    max-height: 400px;

  }

  .sceneRuleMain {
    max-width: 850px;
    max-height: 400px;
    overflow: auto;
  }
</style>
