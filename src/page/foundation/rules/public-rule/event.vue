<template>
  <fox-row>
    <section class="rule-section" v-for="(item, index) in eventList" :key="index">
      <fox-group class="left-input" column="1" label-width="80px" label-position="right">
        <fox-item label="事件处理">
          <div class="event-block">
            <fox-group column="2" label-width="80px" label-position="right">
              <fox-select-item
                v-model="item.eventType"
                source="@eventType.json"
                :disabled="
                  ruleOperation === 'detail' ||
                  (ruleOperation === 'update' && item.eventType !== '')
                "
              >事件类型</fox-select-item>
              <fox-select-item
                v-model="item.authType"
                v-if="item.eventType === '1'"
                source="@authType.json"
                :disabled="ruleOperation === 'detail'"
                @change="typeChange(item)"
              >授权类型</fox-select-item>
              <fox-select-item
                v-model="item.msgCode"
                v-if="item.eventType === '2'"
                text-name="text"
                value-name="value"
                :source="m_refuseType"
                :disabled="eventOperation === 'detail'"
              >拒绝原因</fox-select-item>
              <fox-select-item
                v-model="item.msgCode"
                v-if="item.eventType === '3'"
                text-name="text"
                value-name="value"
                :source="m_tipType"
                :disabled="eventOperation === 'detail'"
              >提示信息</fox-select-item>
              <fox-select-item
                v-model="item.authRole"
                v-if="item.eventType === '1' && item.authType == 3"
                text-name="roleName"
                value-name="roleNo"
                :source="centerRole"
                :disabled="ruleOperation === 'detail' || !item.authType"
              >授权岗位</fox-select-item>

              <fox-select-item
                v-model="item.authRole"
                v-if="item.eventType === '1' && item.authType != 3"
                text-name="roleName"
                value-name="roleNo"
                size="mini"
                :multiple="item.authType === '1'"
                :disabled="ruleOperation === 'detail' || !item.authType"
              >授权岗位</fox-select-item>
              <!-- <fox-item span="1" v-if="item.eventType === '1'"> -->
              <!-- <span class="el-form-item__label" style="width: 80px">授权渠道</span> -->
              <!-- <fox-form-item label="授权渠道" class="fox-group-item">
                <fox-checkbox-group v-model="item.checkList">
                  <fox-checkbox label="yun">云银行</fox-checkbox>
                  <fox-checkbox label="yidong">移动厅堂</fox-checkbox>
                </fox-checkbox-group>
              </fox-form-item> -->
              <fox-checkbox-item :source="m_items" v-model="item.checkList" @change="showCheck">授权渠道</fox-checkbox-item>
              <!-- </fox-item> -->
              <fox-text-item
                v-model="item.authRemark"
                v-if="item.eventType === '1'"
                span="2"
                :disabled="ruleOperation === 'detail'"
              >授权要点</fox-text-item>
            </fox-group>
          </div>
        </fox-item>
      </fox-group>
      <fox-button-row class="right-button">
        <fox-button size="small" @click="remove(item, index)">删除</fox-button>
        <!-- <fox-button size="small" @click="aaa">删除1</fox-button> -->
      </fox-button-row>
    </section>
  </fox-row>
</template>

<script>
import { queryDicTypes } from '@/api/request/rule/rule.js'

export default {
    name: 'Event',
    props: {
        eventOperation: {
            type: Number,
            default: 0,
        },
        ruleOperation: {
            type: String,
            default: '',
        },
        pushEventList: {
            type: Array,
            default: () => [],
        },
        orgList: {
            type: Array,
            default: () => [],
        },
    },
    data: function() {
        this.dicTypes = ['RULE_REFUSE_CODE', 'RULE_ALERT_CODE']
        return {
            m_items: [
                { text: '云银行', value: '云银行' },
                { text: '移动厅堂', value: '移动厅堂' },
            ],
            allDics: {},
            eventList: [],
            checkList: [],
            // authRoleList: [],  //第二个授权岗位

            // m_postType: [
            //   {
            //     value: "01",
            //     text: "支行长"
            //   },
            //   {
            //     value: "02",
            //     text: "内部主管"
            //   },
            //   {
            //     value: "03",
            //     text: "内部综合员"
            //   }
            // ],

            // -------------拒绝原因--------
            m_refuseType: [
                {
                    value: '01',
                    text: '黑名单',
                },
                {
                    value: '02',
                    text: '渠道禁止',
                },
            ],
            m_tipType: [
                {
                    value: '01',
                    text: '金额过大',
                },
            ],
            centerRole: [
                {
                    roleNo: '0099',
                    roleName: '高级审核岗',
                },
                {
                    roleNo: 'M001',
                    roleName: '视频审核岗',
                },
                {
                    roleNo: '0006',
                    roleName: '中心授权岗',
                },
                {
                    roleNo: '0023',
                    roleName: '同业授权岗',
                },
                {
                    roleNo: 'M002',
                    roleName: '一级授权岗',
                },
                {
                    roleNo: 'M003',
                    roleName: '二级授权岗',
                },
                {
                    roleNo: 'M004',
                    roleName: '三级授权岗',
                },
                {
                    roleNo: '0007',
                    roleName: '授权审核岗',
                },
            ],
        }
    },
    watch: {
        pushEventList: {
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.eventList = this.pushEventList
                }
            },
        },
        eventOperation: {
            handler(newVal, oldVal) {
                if (newVal > oldVal) {
                    this.addEvent()
                }
                if (newVal !== oldVal && newVal === 0) {
                    this.eventList = []
                    this.flag = false
                }
            },
        },
    },
    updated: function() {
        this.$emit('update', this.eventList)
    },
    methods: {
    // aaa() {
    //   console.log(this.checkList);
    // },
        showCheck(val) {
            console.log(val)
            console.log(this.eventList)
        },
        typeChange(item) {
            if (item.authType === '1') {
                this.$set(item, 'authRole', [])
            } else {
                this.$set(item, 'authRole', '')
            }
        },
        addEvent() {
            let temp = {
                eventType: '',
                eventId: '',
                checkList: [],
            }

            this.eventList.push(temp)
        },
        remove(item, index) {
            if (this.ruleOperation === 'detail') {
                return
            }
            this.eventList.splice(index, 1)
        },
    // roleQurey() {
    //   // getAuthRole().then(res => {
    //   //     this.authRoleList = res.data
    //   // })
    // }
    },
    mounted: function() {
    // this.roleQurey();
    // 待修改
    // alert(this.dicTypes)
        // queryDicTypes(this.dicTypes).then((res) => {
        //     for (let i in this.dicTypes) {
        //         if (res.list[this.dicTypes[i]]) {
        //             this.allDics[this.dicTypes[i]] = res.list[this.dicTypes[i]]
        //         } else {
        //             this.allDics[this.dicTypes[i]] = []
        //         }
        //     }
        // })
    // this.allDics.RULE_REFUSE_CODE = []
    // this.allDics.RULE_ALERT_CODE = []
    },
}
</script>

<style scoped>
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
.event-block {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  min-height: 80px;
  padding: 10px 10px 0;
}
.left-main .right-button {
  float: right;
  width: 80px;
}
.rule-section .fox-group-item {
  margin-bottom: 10px;
}
</style>
