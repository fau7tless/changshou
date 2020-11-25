<template>
    <fox-row>
        <section class="rule-section" v-for="(item, index) in eventList" :key="index">
            <fox-group class="left-input" column="2" label-width="80px" label-position="right">
                <fox-item label="事件处理">
                    <div class="event-block">
                        <fox-group column="2" label-width="80px" label-position="right">
                            <fox-select-item placeholder="" v-model="item.eventType" :source="m_eventType" size="mini">事件类型</fox-select-item>
                            <fox-select-item placeholder="" v-if="item.eventType==='1'" v-model="item.checkType" :source="m_checkType" size="mini">复核类型</fox-select-item>
                            <fox-select-item placeholder="" v-if="item.eventType==='1'" v-model="item.postType" :source="m_postType" size="mini">复核岗位</fox-select-item>
                            <fox-select-item placeholder="" v-if="item.eventType==='2'" v-model="item.refuseType" :source="m_refuseType" size="mini">拒绝原因</fox-select-item>
                            <fox-select-item placeholder="" v-if="item.eventType==='3'" v-model="item.tipType" :source="m_tipType" size="mini">提示信息</fox-select-item>
                        </fox-group>
                    </div>
                </fox-item>
                <fox-item>
                    <fox-button size="small" @click="remove(item, index)">删除</fox-button>
                </fox-item>
            </fox-group>
            
        </section>
    </fox-row>
</template>

<script>
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
    },
    data: function () {
        return {
            eventList: [],
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
                console.log(this.eventList)
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

    },
}
</script>

<style scoped>
    .rule-section{
        zoom: 1;
    }
    .rule-section::after{
        content:''; clear:both; display: block;
    }
    .left-main .left-input{
        float: left; width: calc(100% - 100px)
    }
    .event-block{
        border: 1px solid #DCDFE6; border-radius: 4px; min-height: 80px; padding: 10px 10px 0;
    }
    .left-main .right-button{
        float: right; width: 80px;
    }
    .rule-section .fox-group-item{
        margin-bottom: 10px;
    }
</style>