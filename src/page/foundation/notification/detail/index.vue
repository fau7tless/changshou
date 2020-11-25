<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--footer bar必须在fox-content的面-->
        <!--page内容区域-->
        <fox-content>
            <fox-group label-position="left" title="查询条件" class="my-group" label-width="100px" column="3" :filter-events="filterEvents">
                <fox-text-item :disabled="isReview" span="3" require v-model="topic">主题</fox-text-item>
                <fox-text-item :disabled="isReview" disabled span="1" require v-model="publishOutlets">发布网点</fox-text-item>
                <!-- <fox-empty-item span="1"></fox-empty-item> -->
                <fox-text-item :disabled="isReview" disabled span="1" require v-model="publishClerk">发布柜员</fox-text-item>
                <fox-select-item :disabled="isReview" span="1" require :source="urgencyList" v-model="urgency">紧急程度</fox-select-item>
                <fox-select-item :disabled="isReview" span="2" require :source="pubulishOrganList" v-model="pubulishOrgan">广播机构</fox-select-item>
                <!-- <fox-radio-item span="1" ctype="button" require :source="selectButtonText" v-model="buttonType"></fox-radio-item> -->
                <fox-item>
                    <fox-button v-if="pubulishOrgan!=3" disabled style="width:100%" type="primary">选择机构</fox-button>
                    <fox-button v-if="pubulishOrgan==3" :disabled="isReview" style="width:100%" type="primary" @click="selectOrgan">选择机构</fox-button>
                </fox-item>
                <fox-item v-if="this.asyncData.selectedOrgan.length>0" label="待发布机构" span="3">
                    <div style="display:flex;justify-content:flex-start;flex-wrap:wrap;margin-bottom: -16px;">
                        <fox-tag class="organTag" v-for="item in asyncData.selectedOrgan" :key="item.id">{{item.label}}</fox-tag>
                    </div>
                </fox-item>
                <fox-text-item :disabled="isReview" span="3" require placeholder="请输入内容" type="textarea" :rows="10" v-model="detailText">详细内容</fox-text-item>
                <fox-button-row align="center">
                    <fox-button v-if="isCreate" type="primary" size="medium" @click="create">录入</fox-button>
                    <fox-button v-if="isUpdate" type="primary" size="medium" @click="update">修改</fox-button>
                    <fox-button v-if="isReview" type="primary" size="medium" @click="submit">提交</fox-button>
                    <fox-button type="primary" size="medium" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>
<script>
export default {
    name: "index",
    //数据
    data: function() {
        return {
            filterEvents: {
                focus: false,
                blur: false,
            },
            topic: '',
            buttonType: '',
            publishOutlets: '0100',
            publishClerk: "999999",
            pubulishOrgan: '',
            detailText: '',
            urgency: '',
            selectButtonText: [{
                value: true,
                text: "选择机构"
            }, ],
            asyncData: {
                selectedOrgan: [],
            },
            pubulishOrganList: [{
                    value: 1,
                    text: "全行"
                },
                {
                    value: 2,
                    text: "本机构"
                },
                {
                    value: 3,
                    text: "按机构"
                },
            ],
            urgencyList: [{
                    value: "001",
                    text: "普通"
                },
                {
                    value: "002",
                    text: "重要"
                },
                {
                    value: "003",
                    text: "紧急"
                }
            ],
        }
    },
    //方法
    methods: {
        create() {
            this.fox_submit()
        },
        update() {

        },
        submit() {},
        cancel() {
            fox.custom.closePage(this)
        },
        selectOrgan() {
            let params = {
                obj: this.asyncData
            }
            fox.custom.appendPage(this, '/exchange/notification/organ', '选择广播机构', params, this.$data)
        },
    },
    computed: {
        isCreate() {
            return this.operation === 'create'
        },
        isUpdate() {
            return this.operation === 'update'
        },
        isReview() {
            return this.operation === 'review'
        },
        operation() {
            return this.$route.params.type
        },
        isInfoComplete() {
            return this.topic && this.publishOutlets && this.publishClerk && this.pubulishOrgan && this.detailText && this.urgency
        }
    },
    //加载后处理
    mounted: function() {},
    fox_flow() {
        return {
            mounted(session, context) {
                context.resolve()
            },

            setCheckConditions(context) {
                context.resolve()
            },

            preSubmit(context) {
                context.resolve()
            },

            postSubmit(context) {
                context.resolve()
            },

            commit(context) {
                context.resolve()
            },

            submit(context) {
                this.$message({
                    type: "success",
                    message: "录入成功"
                })
                fox.custom.closePage(this)
                context.resolve()
            },

            cancelSubmit(context, error) {
                console.info(JSON.stringify(error))
            }
        }
    },
};
</script>
<!-- .organTag+.organTag {
    margin-left: 16px;
    margin-bottom: 16px;
} -->
<style scoped lang="scss">
.el-form-item__content {
    height: 200px
}

.organTag {
    margin-right: 16px;
    margin-bottom: 16px;
}

.organTag:last-child {
    margin-right: auto;
}
</style>