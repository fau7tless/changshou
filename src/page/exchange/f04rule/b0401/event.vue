<template>
    <fox-row>
        <section class="rule-section" v-for="(item, index) in eventList" :key="index">
            <fox-group class="left-input" column="1" label-width="80px" label-position="right">
                <fox-item label="事件处理">
                    <div class="event-block">
                        <fox-group column="2" label-width="80px" label-position="right">
                            <fox-select-item v-model="item.eventType" size="mini" :source="m_eventType" :disabled="ruleType==='0'||eventOperation==='detail'||(eventOperation==='update'&&item.eventType!=='')">事件类型</fox-select-item>
                            <fox-select-item v-model="item.authType" v-if="item.eventType==='1'" size="mini" :source="m_checkType" :disabled="ruleType==='0'||eventOperation==='detail'" @change="typeChange(item)">复核类型</fox-select-item>
                            <fox-select-item v-model="item.msgCode" v-if="item.eventType==='2'" text-name="text" value-name="code" size="mini" :source="allDics.RULE_REFUSE_CODE" :disabled="ruleType==='0'||eventOperation==='detail'">拒绝原因</fox-select-item>
                            <fox-select-item v-model="item.msgCode" v-if="item.eventType==='3'" text-name="text" value-name="code" size="mini" :source="allDics.RULE_ALERT_CODE" :disabled="ruleType==='0'||eventOperation==='detail'">提示信息</fox-select-item>
                            <fox-select-item v-model="item.authRole" v-if="item.eventType==='1'&&item.authType==3" text-name="roleName" value-name="roleNo" size="mini" :source="centerRole" :disabled="ruleType==='0'||eventOperation==='detail'||!item.authType">复核岗位</fox-select-item>
                            <fox-select-item v-model="item.authRole" v-if="item.eventType==='1'&&item.authType!==3" text-name="roleName" value-name="roleNo" size="mini" :multiple="item.authType==='1'" :source="authRoleList" :disabled="ruleType==='0'||eventOperation==='detail'||!item.authType">复核岗位</fox-select-item>
                            <fox-text-item v-model="item.remark" v-if="item.eventType==='1'" :disabled="ruleType==='0'||eventOperation==='detail'">授权要点</fox-text-item>
                        </fox-group>
                    </div>
                </fox-item>
            </fox-group>
            <fox-button-row class="right-button">
                <fox-button v-if="ruleType!=='0'&&eventOperation!=='detail'" size="small" @click="remove(item, index)">删除</fox-button>
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
            type: String,
            default: '',
        },
        eventList: {
            type: Array,
            default: () => [],
        },
        ruleType: {
            type: String,
            default: '',
        },
    },
    data: function () {
        this.dicTypes = ['RULE_REFUSE_CODE', 'RULE_ALERT_CODE']
        return {
            allDics: {},
            authRoleList: [],
            m_eventType: [
                {
                    value: '1',
                    text: '复核',
                },
                {
                    value: '2',
                    text: '拒绝',
                },
                {
                    value: '3',
                    text: '提示',
                },
            ],
            m_checkType: [
                {
                    value: '1',
                    text: '终端复核',
                },
                {
                    value: '2',
                    text: '支行复核',
                },
                {
                    value: '3',
                    text: '中心复核',
                },
            ],
            m_postType: [
                {
                    value: '01',
                    text: '支行长',
                },
                {
                    value: '02',
                    text: '内部主管',
                },
                {
                    value: '03',
                    text: '内部综合员',
                },
            ],
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
    },
    methods: {
        typeChange(item) {
            if (item.authType === '1') {
                this.$set(item, 'authRole', [])
            } else {
                this.$set(item, 'authRole', '')
            }
        },
        remove(item, index) {
            this.$emit('removeEvent', index)
        },
        roleQurey() {
            // getAuthRole().then(res => {
            //     this.authRoleList = res.data
            // })
        },
    },
    mounted: function () {
        this.roleQurey()
        // 待修改
        // alert(this.dicTypes)
        queryDicTypes(this.dicTypes).then((res) => {
            for (let i in this.dicTypes) {
                if (res.list[this.dicTypes[i]]) {
                    this.allDics[this.dicTypes[i]] = res.list[this.dicTypes[i]]
                } else {
                    this.allDics[this.dicTypes[i]] = []
                }
            }
        })
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