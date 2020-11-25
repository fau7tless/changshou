<template>
    <div>
        <div class="el-transfer fox-transfer-tree" style="width:100%;display:flex;justify-content:space-between;">
            <!-- 左侧树形控件 -->
            <div class="el-transfer-panel">
                <fox-input class="el-search-panel" v-if="search" placeholder="输入关键字搜索" prefix-icon="el-icon-search" v-model="filterText"></fox-input>
                <p class="el-transfer-panel__header" @click.prevent="checkTreeFullOrNone">
                    <label class="el-checkbox">
                        <span class="el-checkbox__input" :class="{'is-indeterminate':treePartChecked,'is-checked':treeAllChecked}">
                            <span class="el-checkbox__inner"></span>
                            <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="">
                        </span>
                        <span class="el-checkbox__label">
                            {{treeTitle}}
                            <span>{{checkedTreeNodeCount}}/{{treeLength}}</span>
                        </span>
                    </label>
                </p>
                <div class="el-transfer-panel__body" :class="{'is-with-footer':treeWithFooter,'is-with-search':search}">
                    <div class="el-checkbox-group el-transfer-panel__list" :style="listWithFooter?'height:286px':'height:246px'">
                        <!-- fox-tree -->
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
            <!-- 中央操作按钮 -->
            <div class="el-transfer__buttons" style="align-self:center">
                <button type="button" class="el-button el-button--primary el-transfer__button" @click="removeListItem">
                    <span>
                        <i class="el-icon-arrow-left"></i>
                    </span>
                </button>
                <button type="button" class="el-button el-button--primary el-transfer__button" @click="insertListItem">
                    <span>
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </button>
            </div>
            <!-- 右侧已添加节点添加列表 -->
            <div class="el-transfer-panel">
                <p class="el-transfer-panel__header" @click.prevent="checkListFullOrNone">
                    <label class="el-checkbox">
                        <span class="el-checkbox__input" :class="{'is-indeterminate':listPartChecked,'is-checked':listAllChecked}">
                            <span class="el-checkbox__inner"></span>
                            <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="">
                        </span>
                        <span class="el-checkbox__label">
                            {{listTitle}}
                            <span>{{listItem.length}}</span>
                        </span>
                    </label>
                </p>
                <div class="el-transfer-panel__body" :class="{'is-with-footer':listWithFooter}">
                    <div class="el-checkbox-group el-transfer-panel__list" :style="treeWithFooter?'height:286px':'height:246px'">
                        <div v-for="(item,index) in listItem" :key="item.key" class="el-checkbox el-transfer-panel__item" @click="checkListItem(index)">
                            <span class="el-checkbox__input" :class="{'is-disabled':item.disabled,'is-checked':item.checked}">
                                <span class="el-checkbox__inner" :class="{'is-disabled':item.disabled,'is-checked':item.checked}"></span>
                                <input type="checkbox" aria-hidden="false" value="1" class="el-checkbox__original"></span>
                            <span class="el-checkbox__label">
                                <span>{{item.label}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <p v-if="listWithFooter" class="el-transfer-panel__footer">
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
        listTitle: {
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
            // 右侧列表：全部数据
            listItem: [],
            // 左侧树：已勾选节点数据
            checkedTreeNodes: [],
            // 左侧树：已勾选节点数量
            checkedTreeNodeCount: 0,
            // 右侧列表：已选中数据
            selectedListItemCount: 0,
            // 搜索框的搜索文本
            filterText: "",
        };
    },
    methods: {
        // 防抖
        // 切换面板

        // 基本命名
        // >>> 左侧 <<<
        // 树：tree
        // 节点：node
        // 勾选：check

        // >>> 右侧 <<<
        // 列表：list
        // 元素：item
        // 选中：select/check

        // 搜索节点
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        // 选中右侧元素时，修改对应元素的check属性
        checkListItem(index) {
            // 切换面板至，右侧列表
            this.changeToListPanel()

            // 针对直接修改数组不刷新的问题，使用vue提供的set方法处理
            let checkedItem = Object.assign(this.listItem[index], this.listItem[index], { 'checked': !this.listItem[index].checked })
            this.$set(this.listItem, index, checkedItem)

            // let temp = [...this.listItem]
            // temp[index].checked = !temp[index].checked
            // this.selectedListItemCount += temp[index].checked ? 1 : -1
            // this.listItem.splice(0, this.listItem.length)
            // this.listItem = [...temp]
        },

        // 从左侧的树结构中，移除右侧的列表元素
        removeListItem() {
            // 提取已选选中的list的元素
            let listItem = this.listItem.filter((item, index, arr) => {
                // 给已选中的list添加index属性，方便下文通过map筛选出来
                if (item.checked)
                    arr[index].index = index
                return item.checked
            })
            // 同时减少tree和list的选中计数
            this.checkedTreeNodeCount += -1 * listItem.length
            this.selectedListItemCount += -1 * listItem.length

            // 从右侧list删除已选中的元素
            let selectedListIndex = listItem.map((item => item.index))
            let selectedListId = listItem.map((item => item.id))
            for (let i = 0; i < selectedListIndex.length; i++) {
                this.listItem.splice(selectedListIndex[i] - i, 1);
            }

            // 获取左侧tree，执行操作前的已选中节点
            let oldTreeNodes = new Array(...this.$refs.tree.getCheckedNodes())
            let newTreeKeys = []
            // 禁用已选中节点
            let enableTreeNodes = oldTreeNodes.filter((item) => {
                item.disabled = false
                return item
            })

            let newTreeNodes = oldTreeNodes.filter((item) => {
                // 针对左侧已勾选，但本次未被右侧取消选中的节点
                if (!selectedListId.includes(item.id)) {
                    newTreeKeys = [...newTreeKeys, item.id]
                    // 禁用
                    item.disabled = true
                    return item
                }
            })
            this.$refs.tree.setCheckedNodes(newTreeNodes)
        },

        // 添加左侧树的节点，到右侧的列表中去
        insertListItem() {
            // 获取左侧已勾选
            this.listItem = [...this.listItem, ...this.deepCopy(this.$refs.tree.getCheckedNodes().filter((item => {
                // 且未禁用的元素节点
                // 即：准备添加到右侧列表的节点
                if (!item.disabled) {
                    // 先取消勾选(感觉多余的代码)
                    // item.checked = false
                    return item
                }
            })))]
            // 设置左侧树的已勾选节点，禁用
            this.$refs.tree.setCheckedNodes(this.$refs.tree.getCheckedNodes().filter((item => {
                item.disabled = true
                item.checked = true
                return item
            })))
            // 切换到左侧树面板
            this.changeToTreePanel()
        },
        // 深拷贝
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
        // 返回树的节点列表（打平处理）
        getTreeChildNodes(arr = [], obj) {
            if (obj instanceof Array) {
                obj.forEach((item) => {
                    return this.getTreeChildNodes(arr, item)
                })
            }
            if (obj instanceof Object && !(obj instanceof Array)) {
                if (obj.hasOwnProperty('children')) {
                    arr.push(obj)
                    return this.getTreeChildNodes(arr, obj.children)
                } else {
                    arr.push(obj)
                }
            }
            return arr
        },
        // 勾选左侧树的节点
        handleTreeCheck(data, nodes) {
            if (this.selectedListItemCount != 0) {
                this.changeToTreePanel()
            }
            this.checkedTreeNodeCount = nodes.checkedKeys.length
            this.checkedTreeNodes = this.deepCopy(nodes.checkedNodes)
            this.asyncObj.selectedOrgan = this.deepCopy(nodes.checkedNodes)
        },
        // 左侧树：全选或取消全选
        checkTreeFullOrNone(event) {
            if (this.selectedListItemCount != 0) {
                this.changeToTreePanel()
            }
            let arr = this.deepCopy(this.getTreeChildNodes([], this.data) || []).map((item) => item.id)
            if (!this.treeAllChecked) {
                this.$refs.tree.setCheckedKeys(arr)
                this.treeAllChecked = this.treeLength
                this.checkedTreeNodes = this.$refs.tree.getCheckedNodes()
                this.asyncObj.selectedOrgan = this.$refs.tree.getCheckedNodes()
                return false
            } else {
                let lockedArr = (this.deepCopy(this.getTreeChildNodes([], this.data)).filter((item) => item.disabled) || []).map((item) => item.id)
                this.treeAllChecked = lockedArr.length
                this.$refs.tree.setCheckedKeys(lockedArr)
                this.checkedTreeNodes = this.$refs.tree.getCheckedNodes()
                this.asyncObj.selectedOrgan = this.$refs.tree.getCheckedNodes()
                return false
            }
        },
        // 右侧列表：全选或取消全选
        checkListFullOrNone(event, empty = false) {
            if ((this.selectedListItemCount !== this.listItem.length) && !empty) {
                this.listItem = this.listItem.filter((item) => {
                    item.checked = true
                    return item
                })
                this.selectedListItemCount = this.listItem.length
                return false
            } else {
                this.clearListSelect()
                return false
            }
        },
        // 处理事件触发（暂未使用）
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
        // 右侧列表：清空勾选
        clearListSelect() {
            this.listItem = this.listItem.filter((item) => {
                item.checked = false
                return item
            })
            this.selectedListItemCount = 0
        },
        // 用户切换到左侧树，清空列表的选中情况
        changeToTreePanel() {
            this.clearListSelect()
        },
        // 用户切换到右侧列表，取消勾选左侧树中：未添加到右侧列表的节点
        changeToListPanel(target) {
            let checkNodes
            this.$refs.tree.setCheckedNodes(checkNodes = this.$refs.tree.getCheckedNodes().filter(item => {
                return item.disabled == true
            }))
            this.treeAllChecked = checkNodes.length
        },
    },

    watch: {
        // 右侧列表：清空勾选
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },

    computed: {
        // 左侧树参数：是否配置footer
        treeWithFooter: function() {
            return this.$slots.treeFooter
        },
        // 左侧树数据：节点总个数
        treeLength: function() {
            return this.getTreeChildNodes([], this.data).length
        },
        // 左侧树数据：是否部分勾选
        treePartChecked: function() {
            return this.checkedTreeNodeCount > 0 && this.checkedTreeNodeCount < this.treeLength
        },
        // 左侧树数据：是否全部勾选
        treeAllChecked: {
            get() {
                return this.checkedTreeNodeCount > 0 && this.checkedTreeNodeCount == this.treeLength
            },
            set(val) {
                this.checkedTreeNodeCount = val
            }
        },
        // 右侧列表参数：是否配置footer
        listWithFooter: function() {
            return this.$slots.checkBoxFooter
        },
        // 右侧列表参数：是否部分选中
        listPartChecked: function() {
            return this.selectedListItemCount > 0 && this.selectedListItemCount < this.listItem.length
        },
        // 右侧列表参数：是否全部选中
        listAllChecked: {
            get() {
                return this.selectedListItemCount > 0 && this.selectedListItemCount == this.listItem.length
            },
            set(val) {
                this.selectedListItemCount = val
            }
        }
    },
    mounted() {
        // 接受传入的数据，初始化已勾选列表
        let keys = (this.asyncObj.selectedOrgan || []).map(item => {
            return item.id
        })
        this.$refs.tree.setCheckedKeys(keys)
        this.checkedTreeNodeCount = keys.length
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

.el-search-panel .el-input__inner {
    background: #f6f7fc !important;
    border: 0px !important;
    border-bottom: 1px solid #DDE0E6 !important;
}

/*scoped 穿透*/

.fox-transfer-tree /deep/ .el-input__inner {
    background: #f6f7fc !important;
    border: 0px !important;
    border-bottom: 1px solid #E7EBF2 !important;
}

.fox-transfer-tree /deep/ i.el-input__icon.el-icon-search {
    color: #404D6A;
}

.fox-transfer-tree /deep/ .el-input__prefix {
    left: 10px
}

.fox-transfer-tree /deep/ input.el-input__inner {
    padding-left: 40px;
}

/*.el-checkbox__input.is-disabled.is-checked /deep/ .el-checkbox__inner {
    background-color: #B3C1D3;
    border-color: #DDE0E6;
    background-color: #E4A542;
    border-color: #E4A542;
}*/
</style>