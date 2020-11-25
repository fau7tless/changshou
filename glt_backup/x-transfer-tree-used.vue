<template>
    <div>
        <div class="el-transfer" style="width:100%;display:flex;justify-content:space-between;">
            <div class="el-transfer-panel">
                <fox-input v-if="search" placeholder="输入关键字搜索" prefix-icon="el-icon-search" v-model="filterText"></fox-input>
                <p class="el-transfer-panel__header" @click="checkTreeFullOrNone">
                    <label class="el-checkbox">
                        <span class="el-checkbox__input" :class="{'is-indeterminate':treePartChecked,'is-checked':treeAllChecked}">
                            <span class="el-checkbox__inner"></span>
                            <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="">
                        </span>
                        <span class="el-checkbox__label">
                            {{treeTitle}}
                            <span>{{checkedTreeChildCount}}/{{treeLength}}</span>
                        </span>
                    </label>
                </p>
                <div class="el-transfer-panel__body" :class="{'is-with-footer':treeWithFooter}">
                    <div class="el-checkbox-group el-transfer-panel__list" :style="checkBoxWithFooter?'height:286px':'height:246px'">
                        <fox-tree v-bind="$attrs" :data="data" :props="props" show-checkbox node-key="id" ref="tree" default-expand-all :check-strictly="true" @check="handleTreeCheck" :filter-node-method="filterNode">
                            <span class="custom-tree-node" slot-scope="{ node }">
                                {{ node.label }}
                            </span>
                        </fox-tree>
                    </div>
                </div>
                <p v-if="treeWithFooter" class="el-transfer-panel__footer">
                    <slot name="treeFooter"></slot>
                </p>
            </div>
            <div class="el-transfer__buttons" style="align-self:center">
                <!-- is-disable -->
                <button type="button" class="el-button el-button--primary el-transfer__button" @click="removeTreeItem">
                    <span>
                        <i class="el-icon-arrow-left"></i>
                    </span>
                </button>
                <button type="button" class="el-button el-button--primary el-transfer__button" @click="insertTreeItem">
                    <span>
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </button>
            </div>
            <div class="el-transfer-panel">
                <p class="el-transfer-panel__header" @click="checkBoxFullOrNone">
                    <label class="el-checkbox">
                        <span class="el-checkbox__input" :class="{'is-indeterminate':checkBoxPartChecked,'is-checked':checkBoxAllChecked}">
                            <span class="el-checkbox__inner"></span>
                            <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="">
                        </span>
                        <span class="el-checkbox__label">
                            {{checkBoxTitle}}
                            <span>{{selectedTreeItem.length}}</span>
                            <!-- <span>{{selectedBoxCount}}/{{selectedTreeItem.length}}</span> -->
                        </span>
                    </label>
                </p>
                <div class="el-transfer-panel__body" :class="{'is-with-footer':checkBoxWithFooter}">
                    <div class="el-checkbox-group el-transfer-panel__list" :style="treeWithFooter?'height:286px':'height:246px'">
                        <div v-for="(item,index) in selectedTreeItem" :key="item.key" class="el-checkbox el-transfer-panel__item" @click="checkTreeItem(index)">
                            <span class="el-checkbox__input" :class="{'is-disabled':item.disabled,'is-checked':item.checked}">
                                <span class="el-checkbox__inner" :class="{'is-disabled':item.disabled,'is-checked':item.checked}"></span>
                                <input type="checkbox" aria-hidden="false" value="1" class="el-checkbox__original"></span>
                            <span class="el-checkbox__label">
                                <span>{{item.label}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <p v-if="checkBoxWithFooter" class="el-transfer-panel__footer">
                    <slot name="checkBoxFooter"></slot>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "fox-x-transfer-tree",
    inheritAttrs: false,
    props: {
        // fox-tree 参数
        props: {
            type: Object,
            required: false,
            default: {
                children: "children",
                label: "label"
            }
        },
        // tree标题
        treeTitle: {
            type: String,
            required: true,
            default: '树形列表'
        },
        // 已选择列表标题
        checkBoxTitle: {
            type: String,
            required: true,
            default: '已选择'
        },
        // tree数据源
        data: {
            type: Array,
            required: true
        },
        // 同步对象，用于获取勾选数据
        asyncObj: {
            type: Object,
            required: true
        },
        // 是否显示搜索框
        search: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    data() {
        return {
            selectedTreeItem: [],
            checkedItem: [],
            checkedItemId: [],
            treeChildrenNodes: [],
            checkedChildrenNodes: [],
            checkedTreeChildCount: 0,
            selectedBoxCount: 0,
            filterText: "",
        };
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        checkTreeItem(index) {
            this.changeToBoxPanel()
            let temp = [...this.selectedTreeItem]
            temp[index].checked = !temp[index].checked
            this.selectedBoxCount += temp[index].checked ? 1 : -1
            this.selectedTreeItem.splice(0, this.selectedTreeItem.length)
            this.selectedTreeItem = [...temp]
        },
        removeTreeItem() {
            // this.selectedTreeItem: 右侧单选框面板
            // checkedItem：右侧已勾选的checkbox元素
            // checkedId：右侧已勾选元素的id
            // treeItem：左侧已勾选的tree元素
            // treeId：左侧已勾选元素的id
            let _this = this
            let selectedTreeItem = this.selectedTreeItem.filter((item, index, arr) => {
                if (item.checked)
                    arr[index].index = index
                return item.checked
            })
            this.selectedBoxCount += -1 * selectedTreeItem.length

            let checkedItem = selectedTreeItem.map((item => item.index))
            let checkedId = selectedTreeItem.map((item => item.id))
            for (let i = 0; i < checkedItem.length; i++) {
                this.selectedTreeItem.splice(checkedItem[i] - i, 1);
            }
            let oldTreeNodes = new Array(...this.$refs.tree.getCheckedNodes())
            let newTreeKeys = []
            let enableTreeNodes = oldTreeNodes.filter((item) => {
                item.disabled = false
                return item
            })
            let newTreeNodes = oldTreeNodes.filter((item) => {
                if (!checkedId.includes(item.id)) {
                    newTreeKeys = [...newTreeKeys, item.id]
                    item.disabled = true
                    return item
                } else {}
            })
            this.$refs.tree.setCheckedNodes(enableTreeNodes)
            this.$refs.tree.setCheckedNodes(newTreeNodes)
        },
        insertTreeItem() {
            this.selectedTreeItem = [...this.selectedTreeItem, ...this.deepCopy(this.$refs.tree.getCheckedNodes().filter((item => {
                if (!item.disabled) {
                    item.checked = false
                    return item
                }
            })))]
            this.$refs.tree.setCheckedNodes(this.$refs.tree.getCheckedNodes().filter((item => {
                item.disabled = true
                item.checked = true
                return item
            })))
            this.changeToTreePanel()
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
        getTreeChildrenNodes(arr = [], obj) {
            if (obj instanceof Array) {
                obj.forEach((item) => {
                    return this.getTreeChildrenNodes(arr, item)
                })
            }
            if (obj instanceof Object && !(obj instanceof Array)) {
                if (obj.hasOwnProperty('children')) {
                    arr.push(obj)
                    return this.getTreeChildrenNodes(arr, obj.children)
                } else {
                    arr.push(obj)
                }
            }
            return arr
        },
        handleTreeCheck(data, nodes) {
            if (this.selectedBoxCount != 0) {
                this.changeToTreePanel()
            }
            this.checkedTreeChildCount = nodes.checkedKeys.length
            this.checkedChildrenNodes = this.deepCopy(nodes.checkedNodes)
            this.asyncObj.selectedOrgan = this.deepCopy(nodes.checkedNodes)
        },
        checkTreeFullOrNone(event) {
            if (this.selectedBoxCount != 0) {
                this.changeToTreePanel()
            }
            if (this.handleLabelClick(event, ['span', 'p'])) {
                let arr = this.deepCopy(this.getTreeChildrenNodes([], this.data)).map((item) => item.id)
                if (!this.treeAllChecked) {
                    this.$refs.tree.setCheckedKeys(arr)
                    this.treeAllChecked = this.treeLength
                    this.checkedChildrenNodes = this.$refs.tree.getCheckedNodes()
                    this.asyncObj.selectedOrgan = this.$refs.tree.getCheckedNodes()
                } else {
                    let lockedArr = this.deepCopy(this.getTreeChildrenNodes([], this.data)).filter((item) => item.disabled).map((item) => item.id)
                    this.treeAllChecked = lockedArr.length
                    this.$refs.tree.setCheckedKeys(lockedArr)
                    this.checkedChildrenNodes = this.$refs.tree.getCheckedNodes()
                    this.asyncObj.selectedOrgan = this.$refs.tree.getCheckedNodes()
                }
            }
        },
        checkBoxFullOrNone(event, empty = false) {
            if (this.handleLabelClick(event, ['span', 'p']) || empty) {
                if ((this.selectedBoxCount !== this.selectedTreeItem.length) && !empty) {
                    this.selectedTreeItem = this.selectedTreeItem.filter((item) => {
                        item.checked = true
                        return item
                    })
                    this.selectedBoxCount = this.selectedTreeItem.length
                } else {
                    this.selectedTreeItem = this.selectedTreeItem.filter((item) => {
                        item.checked = false
                        return item
                    })
                    this.selectedBoxCount = 0
                }
            }
        },
        handleLabelClick(e, targetTag = []) {
            var ev = e || window.event;
            var elm = ev.target || ev.srcElement;
            if (targetTag.filter(item => {
                    return elm.tagName.toLowerCase() === item
                }).length > 0) {
                return true
            } else {
                return false
            }
        },
        changeToTreePanel() {
            this.checkBoxFullOrNone(window.event, true)
        },
        changeToBoxPanel(target) {
            this.$refs.tree.setCheckedNodes(this.$refs.tree.getCheckedNodes().filter(item => {
                return item.disabled == true
            }))
            this.treeAllChecked = 0
        },
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    computed: {
        treeWithFooter: function() {
            return this.$slots.treeFooter
        },
        treeLength: function() {
            return this.getTreeChildrenNodes([], this.data).length
        },
        treePartChecked: function() {
            return this.checkedTreeChildCount > 0 && this.checkedTreeChildCount < this.treeLength
        },
        treeAllChecked: {
            get() {
                return this.checkedTreeChildCount > 0 && this.checkedTreeChildCount == this.treeLength
            },
            set(val) {
                this.checkedTreeChildCount = val
            }
        },
        checkBoxWithFooter: function() {
            return this.$slots.checkBoxFooter
        },
        checkBoxPartChecked: function() {
            return this.selectedBoxCount > 0 && this.selectedBoxCount < this.selectedTreeItem.length
        },
        checkBoxAllChecked: {
            get() {
                return this.selectedBoxCount > 0 && this.selectedBoxCount == this.selectedTreeItem.length
            },
            set(val) {
                this.selectedBoxCount = val
            }
        }
    },
    created() {},
    mounted() {
        let keys = this.asyncObj.selectedOrgan.map(item => {
            return item.id
        })
        this.$refs.tree.setCheckedKeys(keys)
        this.checkedTreeChildCount = keys.length
    }
};
</script>
<style scoped>
.el-transfer-panel p.el-transfer-panel__header {
    padding-top: 0px;
}

.el-transfer-panel__list .el-checkbox,
.el-transfer-panel__list .el-checkbox__input {
    height: 30px;
}

.el-transfer-panel .el-transfer-panel__footer .el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    /*margin: 0;*/
    -webkit-transition: .1s;
    transition: .1s;
    font-size: 14px;
    border-radius: 4px;
}

.el-transfer-panel .el-transfer-panel__footer .el-button:focus,
.el-transfer-panel .el-transfer-panel__footer .el-button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}

.el-button--mini,
.el-button--small {
    font-size: 12px;
    border-radius: 3px;
}

.transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
}

.el-checkbox__inner:after {
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    -webkit-transition: -webkit-transform .15s ease-in .05s;
    transition: -webkit-transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s;
    transition: transform .15s ease-in .05s, -webkit-transform .15s ease-in .05s;
    -webkit-transform-origin: center;
    transform-origin: center;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner:after {
    border-color: #c0c4cc;
}

.el-checkbox__input.is-checked .el-checkbox__inner:after {
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
}

.el-checkbox__input.is-disabled .el-checkbox__inner:after {
    cursor: not-allowed;
}

.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #c0c4cc !importnat;
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}

.el-transfer-panel__body.is-with-footer {
    padding-bottom: 36px;
}
</style>