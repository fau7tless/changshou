<template>
    <div ref="menuWrap" class="my-wrap" :style="mWrapStyle" @click="onClose" v-show="visible" @mouseout="onMouseOut($event)">
        <div ref="menu" class="my-popup-menu" :style="mStyle" @click.prevent.stop="onPopupClick">
            <template v-for="(item, index) in items">
                <div v-if="hasItem(item)" class="item">
                    <!--三级菜单-->
                    <template v-if="item.children">
                        <div class="item-header">{{item.text}}</div>
                        <template v-for="(child, childIndex) in item.children">
                            <div class="item-line" v-if="hasChildItem(child)" @click="onSelect(index, childIndex)">
                                <span :class="mFavorClass(child)" @click.stop="updateFavor(child)"></span>
                                <span :class="mItemClass(child)">{{formatText(child.text)}}</span>
                            </div>
                        </template>
                    </template>
                    <!--二级菜单-->
                    <template v-else>
                        <div class="item-line" v-if="hasChildItem(item)" @click="onSelect(-1, index)">
                            <span :class="mFavorClass(item)" @click.stop="updateFavor(item)"></span>
                            <span :class="mItemClass(item)">{{formatText(item.text,16)}}</span>
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { foxUI } from '@/assets/libs/fox-libs'

export default {
    name: "my-popup-menu",
    //属性
    props: {
        //是否可见
        visible: {
            type: Boolean,
            required: false,
            default: false
        },
        //左坐标
        left: {
            type: Number,
            required: false,
            default: "240px"
        },
        //items
        items: {
            type: Array,
            required: true,
            default () {
                return [];
            }
        },
        //选中path
        selectedPath: {
            type: String,
            required: true,
            default () {
                return "";
            }
        },
        //收藏
        favors: {
            type: Array,
            required: true,
            default () {
                return [];
            }
        },
        //是否只显示favor item
        showFavorOnly: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    //数据
    data() {
        return {
            width: 'auto',
            overflowX: 'hidden',
        }
    },
    //方法
    methods: {
        //格式化text
        formatText(text) {
            return foxUI.renderText(text, 16)
        },
        //关闭事件
        onClose() {
            this.$emit('update:visible', false)
        },
        //鼠标移开处理
        onMouseOut(event) {
            let target = event.relatedTarget;
            //记录是否为popup menu的孩子
            let flag = false;
            if (target) {
                if (target == this.$refs.menuWrap) {
                    return
                }

                let parent = target.parentNode;
                //加入了一个最大循环层次，是为了提供效率
                for (let i = 0; parent != undefined && i < 5; i++) {
                    if (parent == this.$refs.menuWrap) {
                        flag = true;
                        break;
                    }
                    parent = parent.parentNode;
                }
            }

            if (!flag) {
                this.$emit('mouse-out', event)
            }
        },
        //popup click
        onPopupClick() {
            //do nothing
        },
        //选中事件
        onSelect(i, j) {
            if (i == -1) {
                let item = this.items[j]
                let selected = {
                    'texts': [item.text],
                }
                for (let key in item) {
                    selected[key] = item[key]
                }
                this.$emit('selected', selected)
            } else {
                let parent = this.items[i]
                let child = parent.children[j]
                let selected = {
                    'texts': [parent.text, child.text],
                }
                for (let key in child) {
                    selected[key] = child[key]
                }
                this.$emit('selected', selected)
            }
        },
        //item class
        mItemClass(item) {
            let flag = this.isSelected(item)
            return {
                'item-text': true,
                'item-text-selected': flag
            }
        },
        //是否选中
        isSelected(item) {
            return item.index == this.selectedPath;
        },
        //更新favor
        updateFavor(item) {
            this.$emit('update-favor', item.index)
        },
        //favor class
        mFavorClass(item) {
            let flag = this.isFavor(item)
            return {
                'el-icon-star-on': flag,
                'el-icon-star-off': !flag,
                'favor': true
            }
        },
        //是否为收藏
        isFavor(item) {
            return this.favors.indexOf(item.index) != -1
        },
        //是否显示
        hasItem(item) {
            if (!this.showFavorOnly) {
                return true;
            }
            if (!this.favors || this.favors.length == 0) {
                return true;
            }
            for (let i = 0; i < this.favors.length; i++) {
                if (this.favors[i].indexOf(item.index) == 0) {
                    return true;
                }
            }
            return false;
        },
        //是否显示
        hasChildItem(item) {
            if (!this.showFavorOnly) {
                return true;
            }
            if (!this.favors || this.favors.length == 0) {
                return true;
            }
            let index = this.favors.indexOf(item.index)
            return index != -1;
        },
    },
    //计算
    computed: {
        mWrapStyle() {
            return {
                'left': `${this.left}px`,
                'top': '0px',
                'right': '0px',
                'bottom': '0px',
                'width': this.width,
                'overflow-x': this.overflowX,
            }
        },
        //mMenuWrap
        //style
        mStyle() {
            return {

            }
        },
    },
    //更新
    updated() {
        if (this.visible) {
            if (this.$refs.menu) {
                let elm = this.$refs.menu
                let nodes = elm.querySelectorAll(".item-line")
                if (nodes.length == 0) {
                    return
                }

                let lastNode = nodes[nodes.length - 1]
                let left = foxUI.offsetLeft(lastNode)
                let width = foxUI.offsetWidth(lastNode)
                //(this.left+240) 一级菜单宽度+二级菜单宽度， 50 padding right
                let maxWidth = left + width - (this.left + 240) + 50

                for (let i = nodes.length - 2; i >= 0; i--) {
                    let nextLeft = foxUI.offsetLeft(nodes[i])
                    if (nextLeft != left) {
                        break;
                    }
                    let nextWidth = foxUI.offsetWidth(nodes[i])
                    //(this.left+240) 一级菜单宽度+二级菜单宽度， 50 padding right
                    let w = nextLeft + nextWidth - (this.left + 240) + 50
                    if (w > maxWidth) {
                        maxWidth = w
                    }
                }

                let screenWidth = foxUI.getClientWidth()
                if (maxWidth > (screenWidth - 500)) {
                    maxWidth = screenWidth - 500
                    this.overflowX = 'auto'
                } else {
                    this.overflowX = 'hidden'
                }

                this.width = `${maxWidth}px`
            }
        }
    },
    //加载处理
    mounted() {

    }
}
</script>
<style scoped>
.my-wrap {
    position: absolute;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    background: rgba(7, 7, 7, 0.9);
}

.my-popup-menu {
    padding-top: 24px;
    box-sizing: border-box;
    height: 100%;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: column wrap;
    align-items: stretch;
    justify-content: flex-start;
    align-content: stretch;
    min-width: 240px;
    position: relative;
}

.item {
    padding: 0px 36px 0 24px;
    background: transparent;
    flex: 0 0 auto;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
}

/*最后一个元素拉伸是为了,覆盖空白*/
.item:last-child {
    flex: 1 0 auto;
}

.item-header {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    color: #ffffff;
    font-size: 16px;
    line-height: 50px;
    width: 100%;
    position: relative;
}

.item-header::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}

.item-line {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    color: rgba(255, 255, 255, 0.7);
}

.item-line>span {
    margin-right: 10px;
}

.favor {
    color: rgba(255, 255, 255, 0.4);
}

.item-line:hover .favor {
    color: rgba(255, 255, 255, 1);
}

.el-icon-star-on.favor{
    color: #E4A542;
}

.item-text {
    max-width: 280px;
}

.item-text:hover {
    color: #e5a642;
    cursor: pointer;
}

.item-text-selected {
    color: #e5a642;
}

</style>