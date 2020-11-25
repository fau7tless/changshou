<template>
    <div>
        <div class="el-transfer" style="width:100%;display:flex;justify-content:space-between;">
            <div class="el-transfer-panel">
                <p class="el-transfer-panel__header">
                    <label class="el-checkbox">
                        <span class="el-checkbox__input">
                            <span class="el-checkbox__inner"></span>
                            <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="">
                        </span>
                        <span class="el-checkbox__label">
                            列表 1
                            <span>0/15</span>
                        </span>
                    </label>
                </p>
                <div class="el-transfer-panel__body" :class="{'is-with-footer':showLeftPanelFooter}">
                    <div class="el-checkbox-group el-transfer-panel__list">
                        <fox-tree :data="treeData" show-checkbox node-key="id" ref="tree" :props="defaultProps" default-expand-all :check-strictly="true"></fox-tree>
                    </div>
                </div>
                <p v-if="showLeftPanelFooter" class="el-transfer-panel__footer">
                    <button type="button" class="el-button transfer-footer el-button--default el-button--small" @click="printTData">
                        <span>操作</span>
                    </button>
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
                <p class="el-transfer-panel__header">
                    <label class="el-checkbox">
                        <span class="el-checkbox__input">
                            <span class="el-checkbox__inner"></span>
                            <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value="">
                        </span>
                        <span class="el-checkbox__label">
                            列表 1
                            <span>0/{{selectedItem.length}}</span>
                        </span>
                    </label>
                </p>
                <div class="el-transfer-panel__body">
                    <div class="el-checkbox-group el-transfer-panel__list">
                        <div v-for="(item,index) in selectedItem" :key="item.key" class="el-checkbox el-transfer-panel__item" @click="checkTreeItem(index)">
                            <span class="el-checkbox__input" :class="{'is-disabled':item.disabled,'is-checked':item.checked}">
                                <span class="el-checkbox__inner"></span>
                                <input type="checkbox" aria-hidden="false" value="1" class="el-checkbox__original"></span>
                            <span class="el-checkbox__label">
                                <span>{{item.label}}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "fox-x-transfer-tree",
    data() {
        const generateData = _ => {
            const data = [];
            for (let i = 0; i <= 15; i++) {
                data.push({
                    key: i,
                    label: `备选项 ${i+1}`,
                    // disabled: false,
                    disabled: i % 4 === 0,
                    checked: false
                });
            }
            // console.log(data)
            return data;
        };
        return {
            // selectedItem: generateData(),
            // treeData: [{
            //         id: 1,
            //         label: "一级 1",
            //         value: 1,
            //         children: [{
            //             id: 4,
            //             label: "二级 1-1",
            //             value: 4,
            //             children: [{
            //                     id: 9,
            //                     value: 9,
            //                     label: "三级 1-1-1"
            //                 },
            //                 {
            //                     id: 10,
            //                     value: 10,
            //                     label: "三级 1-1-2"
            //                 }
            //             ]
            //         }]
            //     },
            //     {
            //         id: 2,
            //         label: "一级 2",
            //         value: 2,
            //         children: [{
            //                 id: 5,
            //                 label: "二级 2-1",
            //                 value: 5
            //             },
            //             {
            //                 id: 6,
            //                 label: "二级 2-2",
            //                 value: 6
            //             }
            //         ]
            //     },
            //     {
            //         id: 3,
            //         label: "一级 3",
            //         value: 3,
            //         children: [{
            //                 id: 7,
            //                 label: "二级 3-1",
            //                 value: 7
            //             },
            //             {
            //                 id: 8,
            //                 label: "二级 3-2",
            //                 value: 8
            //             }
            //         ]
            //     }
            // ],
            treeData: [{
                    id: 1,
                    label: 1,
                    value: 1,
                    children: [{
                        id: 4,
                        label: 4,
                        value: 4,
                        children: [{
                                id: 9,
                                value: 9,
                                label: 9
                            },
                            {
                                id: 10,
                                value: 10,
                                label: 10
                            }
                        ]
                    }]
                },
                {
                    id: 2,
                    label: 2,
                    value: 2,
                    children: [{
                            id: 5,
                            label: 5,
                            value: 5
                        },
                        {
                            id: 6,
                            label: 6,
                            value: 6
                        }
                    ]
                },
                {
                    id: 3,
                    label: 3,
                    value: 3,
                    children: [{
                            id: 7,
                            label: 3,
                            value: 7
                        },
                        {
                            id: 8,
                            label: 8,
                            value: 8
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            },
            showLeftPanelFooter: true,
            selectedItem: [],
            checkedItem: [],
            checkedItemId: [],
            value: [1, 4],
        };
    },
    methods: {
        checkTreeItem(index) {
            let temp = [...this.selectedItem]
            temp[index].checked = !temp[index].checked
            this.selectedItem.splice(0, this.selectedItem.length)
            this.selectedItem = [...temp]
            // if (temp[index].checked === true) {
            //     this.checkedItem.push(this.selectedItem[index])
            //     this.checkedItemId.push(this.selectedItem[index].id)
            // } else {
            //     for (let id, i = 0; i < this.checkedItem.length; i++) {
            //         let id
            //         if (this.checkedItem[i].$treeNodeId == temp[index].$treeNodeId) {
            //             let id = i
            //             this.checkedItem.splice(id, 1)
            //             this.checkedItemId.splice(id, 1)
            //             break
            //         }
            //     }
            // }
            // console.log(this.checkedItemId)
            // console.log(this.checkedItem)
        },
        printTData() {
            // console.log(this.$refs.tree.getCheckedNodes()[0].$treeNodeId);
            // this.$refs.tree.setCheckedKeys([]);
            // checkedItem：右侧已勾选的checkbox元素
            // checkedId：右侧已勾选元素的id
            // treeItem：左侧已勾选的tree元素
            // treeId：左侧已勾选元素的id
            let _this = this
            let selectedItem = this.selectedItem.filter((item, index, arr) => {
                if (item.checked)
                    arr[index].index = index
                return item.checked
            })
            let checkedItem = selectedItem.map((item => item.index))
            let checkedId = selectedItem.map((item => item.id))
            for (let i = 0; i < checkedItem.length; i++) {
                this.selectedItem.splice(checkedItem[i] - i, 1);
            }
            // let treeItemKeys = this.$refs.tree.getCheckedKeys()
            let oldTreeKeys = new Array(...this.$refs.tree.getCheckedKeys())
            let newTreeKeys = []
            let commonTreeKeys = oldTreeKeys.filter((item) => {
                if (!checkedId.includes(item)) {
                    // console.log('includes-item')
                    // console.log(item)
                    newTreeKeys = [...newTreeKeys, item]
                }
                return item
            })
            // this.$refs.tree.setCheckedKeys([5,7,9],true,false)
            // this.$refs.tree.setCheckedKeys([])
            console.log(newTreeKeys)
            // this.$refs.tree.setCheckedKeys(new Array(...newTreeKeys),false)
            this.$refs.tree.setCheckedKeys(newTreeKeys, false, false)
            // this.$refs.tree.setCheckedKeys([], false, true)
            // setTimeout(function() {
            //     console.log(new Array(...newTreeKeys))
            //     _this.$refs.tree.setCheckedKeys(newTreeKeys, false, false)
            // }, 500)
            // this.$refs.tree.setCheckedKeys(new Array(...newTreeKeys), false, true)
            // this.$refs.tree.setCheckedKeys(oldTreeKeys,true)
            // console.log(checkedItem)
            // console.log(checkedId)
            // console.log(oldTreeKeys)
            // console.log(newTreeKeys)
            // console.log(this.selectedItem)
            // this.$refs.tree.setChecked(this.$refs.tree.getCurrentKey())
            // this.$refs.tree.setCheckedKeys([this.$refs.tree.getCurrentKey()]);
        },
        removeTreeItem() {
            // 从数组移除另一个数组的元素，依据：.$treeNodeId 

            let treeKeys = [...this.$refs.tree.getCheckedKeys()]
            let checkKeys = Array.from(this.checkedItemId)
            let _this = this
            // let cTreeKeys = checkedKeys.filter(function(item) {
            //     return _this.checkedItemId.indexOf(item) < 0;
            // })
            // console.log(treeKeys)
            // console.log(checkKeys)
            // treeKeys.forEach((tItem, tIndex, tArray) => {
            //     checkKeys.forEach((cItem, cIndex, cArray) => {
            //         // console.log(tItem)
            //         // console.log(cItem)
            //         if (tItem == cItem) {
            //             tArray.splice(tIndex, 1)
            //             cArray.splice(cIndex, 1)
            //         }
            //     })
            // })
            // for (let i = 0; i < treeKeys.length; i++) {
            //     for (let j = 0; j < checkKeys.length; j++) {
            //         if (treeKeys[i] == checkKeys[j]) {
            //             treeKeys.splice(i, 1)
            //             checkKeys.splice(j, 1)
            //             this.checkedItem.splice(j, 1)
            //             this.selectedItem.splice(j, 1)
            //         }
            //     }
            // }
            for (let i = 0; i < treeKeys.length; i++) {
                for (let j = 0; j < checkKeys.length; j++) {
                    if (treeKeys[i] == checkKeys[j]) {
                        treeKeys.splice(i, 1)
                        checkKeys.splice(j, 1)
                        this.checkedItem.splice(j, 1)
                        this.selectedItem.splice(j, 1)
                    }
                }
            }
            // console.log(treeKeys)
            // console.log(checkKeys)
            this.$refs.tree.setCheckedKeys([...treeKeys]);
            // this.checkedItemId = [...checkKeys]
            // checkedKeys = [6,9]
            // newArr.splice(0,1)
            // console.log(newArr)
            // newArr.forEach((nItem, nIndex, nArray) => {
            //     this.checkedItemId.forEach((cItem, cIndex, cArray) => {
            //         // if (nItem == cItem) {
            //         //     // Array.splice(nIndex,1)
            //         //     console.log(nItem)
            //         //     console.log(cItem)
            //         // }

            //         console.log(nItem)
            //         console.log(cItem)
            //     })
            // })
            // console.log(JSON.parse(checkedKeys)===JSON.parse([10]))
            // console.log(this.$refs.tree.getCheckedNodes());
            // this.$refs.tree.setCheckedKeys(newArr);
            // this.$refs.tree.setCheckedKeys(arr[0]);
            // this.$refs.tree.setCheckedKeys([...checkedKeys]);
        },
        insertTreeItem() {
            // console.log(this.$refs.tree.getCheckedNodes());
            this.selectedItem = [...this.selectedItem, ...this.$refs.tree.getCheckedNodes()]

            // 数组去重添加
        }
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
</style>