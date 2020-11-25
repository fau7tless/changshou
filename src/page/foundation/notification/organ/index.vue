<template>
    <!--page每个页面的root元素-->
    <fox-page group-header-width="120px">
        <!--footer bar必须在fox-content的面-->
        <!--page内容区域-->
        <fox-content>
            <fox-group label-position="left" title="查询条件" class="my-group" label-width="100px" column="5" :filter-events="filterEvents">
                <fox-item span="5">
                    <fox-x-transfer-tree :data="treeData" treeTitle="机构列表" listTitle="已选机构" :asyncObj="asyncObj" :props="treeProps" :search="true"></fox-x-transfer-tree>
                </fox-item>
                <fox-button-row align="center">
                    <fox-button type="primary" size="medium" @click="submit">确定</fox-button>
                    <fox-button type="primary" size="medium" @click="cancel">取消</fox-button>
                </fox-button-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>
<script>
export default {
    name: "index",
    data: function() {
        return {
            filterEvents: {
                focus: false,
                blur: false,
            },
            treeData: [{
                    id: 1,
                    label: '01号银行',
                    value: 1,
                    children: [{
                        id: 4,
                        label: '04号银行',
                        value: 4,
                        children: [{
                                id: 9,
                                value: 9,
                                label: '09号银行',
                            },
                            {
                                id: 10,
                                value: 10,
                                label: '10号银行',
                            },
                            {
                                id: 11,
                                value: 11,
                                label: '11号银行',
                            },
                            {
                                id: 12,
                                value: 12,
                                label: '12号银行',
                            },
                            {
                                id: 13,
                                value: 13,
                                label: '13号银行',
                            },
                            {
                                id: 14,
                                value: 14,
                                label: '14号银行',
                            }
                        ]
                    }]
                },
                {
                    id: 2,
                    label: '02号银行',
                    value: 2,
                    children: [{
                            id: 5,
                            label: '05号银行',
                            value: 5,
                        },
                        {
                            id: 6,
                            label: '06号银行',
                            value: 6,
                        }
                    ]
                },
                {
                    id: 3,
                    label: '03号银行',
                    value: 3,
                    children: [{
                            id: 7,
                            label: '07号银行',
                            value: 7,
                        },
                        {
                            id: 8,
                            label: '08号银行',
                            value: 8,
                        }
                    ]
                }
            ],
            asyncObj: {
                selectedOrgan: [],
            },
            asyncData: {},
            treeProps: {
                children: "children",
                label: "label"
            }
        }
    },
    //方法
    methods: {
        submit() {
            this.asyncData.selectedOrgan.splice(0, this.asyncData.selectedOrgan.length)
            let _this = this
            this.asyncObj.selectedOrgan.forEach(item => {
                _this.asyncData.selectedOrgan.push(item)
            })
            fox.custom.closePage(this)
            // setTimeout(fox.custom.closePage(_this), 100)
        },
        cancel() {
            fox.custom.closePage(this)
        },
        deepCopy(obj) {
            if (typeof obj !== 'object') return;
            var newObj = obj instanceof Array ? [] : {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = typeof obj[key] === 'object' ? this.deepCopy(obj[key]) : obj[key];
                }
            }
            return newObj;
        },
    },
    created() {
        // 获得原始数据
        this.asyncObj = this.deepCopy(this.asyncData)
    },
    //加载后处理
    mounted: function() {},
    fox_flow() {
        return {
            mounted(session, context) {
                context.resolve()
            },

            beforeDestroy(session) {
                console.log(this.asyncData)
            }
        }
    },
};
</script>
<style scoped lang="scss">
.check-box {
    width: 50%
}

.organTag+.organTag {
    margin-left: 16px;
}

input.el-input__inner {
    background: #f6f7fc;
    border: none;
}
</style>