<template>
    <div ref="myWrap" class="my-wrap" v-show="visible" :style="mWrapStyle">
        <div class="my-menu-wrap">
            <ul ref="subMenu" class="my-sub-menu" :style="mMenuStyle" @mouseout="onMouseOut($event)">
                <template v-for="(item, index) in items">
                    <!--菜单-->
                    <template v-if="item.children">
                        <li v-if="hasItem(item)" class="my-sub-menu-item my-menu-item-mark" :style="mItemStyle(index)" @click="onSelect(index)" @mouseover="onMouseOver(index, true)">
                            <span class="my-submenu__text" :title="item.text">{{formatItemText(item.text)}}</span>
                            <i class="my-submenu__icon-arrow el-icon-arrow-right"></i>
                        </li>
                    </template>
                    <!--叶子-->
                    <template v-else>
                        <li class="item-line my-menu-item-mark" v-if="hasChildItem(item)" :style="mItemStyle(index)" @mouseover="onMouseOver(index, false)" @click="onSelect(-1, index)">
                            <span :class="mFavorClass(item)" @click.stop="updateFavor(item)"></span>
                            <span :class="mItemClass(index)" :title="item.text">{{formatItemText(item.text)}}</span>
                        </li>
                    </template>
                </template>
            </ul>
        </div>
        <my-popup-menu :visible.sync="popupVisible" :selected-path="selectedPath" :favors="favors" :left="popupStart" :items="subItems" @update-favor="onUpdateFavor($event)" @selected="onSubSelect($event)" :show-favor-only="showFavorOnly" @mouse-out="onMouseOut($event, true)">
        </my-popup-menu>
    </div>
</template>
<script>
import { foxUI } from '@/assets/libs/fox-libs'
import MyPopupMenu from './my-popup-menu'
export default {
    name: "my-sub-menu",
    components: { MyPopupMenu },
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
            type: String,
            required: false,
            default: "240px"
        },
        //背景色
        backgroundColor: {
            type: String,
            required: false,
            default: 'inherit'
        },
        //激活背景色
        activeBackgroundColor: {
            type: String,
            required: false,
            default: 'rgba(255,255,255,0.16)'
        },
        //文本颜色
        textColor: {
            type: String,
            required: false,
            default: 'rgba(255,255,255,0.7)'
        },
        //激活文本颜色
        activeTextColor: {
            type: String,
            required: false,
            default: '#e4a542'
        },
        //favors
        favors: {
            type: Array,
            required: false,
            default () {
                return []
            }
        },
        //items
        items: {
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
        //选中path
        selectedPath: {
            type: String,
            required: true,
            default () {
                return "";
            }
        },
    },
    //数据
    data() {
        return {
            //popup start
            popupStart: 0,
            //鼠标hover索引
            activePos: -1,
            //popup menu是否可见
            popupVisible: false,
            //鼠标是否在范围内
            inMenuScope: false,
            //孩子items
            subItems: [],
            //client width
            clientWidth: 0,
            //client height
            clientHeight: 0,
        }
    },
    //监视
    watch: {
        visible(newVal) {
            if (newVal) {
                this.clientWidth = foxUI.getClientWidth()
                this.clientHeight = foxUI.getClientHeight()
            }
        }
    },
    //计算
    computed: {
        mWrapStyle() {
            return {
                'left': this.left,
                'top': '0px',
                'right': '0px',
                'bottom': '0px',
                // 'width': `${this.clientWidth/6}px`,
                'width': `200%`,
                'height': `${this.clientHeight}px`,
            }
        },
        //menu style
        mMenuStyle() {
            return {}
        }
    },
    //方法
    methods: {
        //格式化item text
        formatItemText(text) {
            return foxUI.renderText(text, 12)
        },
        //子menu选中事件
        onSubSelect(evt) {
            let item = this.items[this.activePos];
            //插入texts
            evt.texts.splice(0, 0, item.text);
            this.$emit("selected", evt)
        },
        //更新favors
        onUpdateFavor(favor) {
            this.$emit("update-favor", favor)
        },
        //mouse over
        onMouseOver(pos, menu) {
            this.activePos = pos;
            if (menu) {
                this.showPopupMenu(pos);
            }
        },
        //鼠标移开处理
        onMouseOut(event, sub) {
            let target = event.relatedTarget;
            //记录是否为popup menu的孩子
            let flag = false;
            if (target) {
                let parent = target.parentNode;
                //加入了一个最大循环层次，是为了提供效率
                for (let i = 0; parent != undefined && i < 5; i++) {
                    if (parent == this.$refs.myWrap) {
                        flag = true;
                        break;
                    }
                    parent = parent.parentNode;
                }
            }
            if (!flag) {
                this.activePos = -1;
                this.popupVisible = false;
                this.$emit('update:visible', false);
            } else if (sub) {
                this.popupVisible = false;
            }
        },
        //显示popup menu
        showPopupMenu(pos) {
            let item = this.items[pos]
            this.subItems = item.children
            this.popupVisible = true

            let elm = this.$refs.subMenu
            let width = foxUI.offsetWidth(elm)
            this.popupStart = width
        },
        //item style
        mItemStyle(index) {
            if (this.isActive(index, true)) {
                return {
                    'background-color': this.activeBackgroundColor,
                    'color': this.activeTextColor,
                }
            } else {
                return {
                    'background-color': this.backgroundColor,
                    'color': this.textColor,
                }
            }
        },
        //是否为激活
        isActive(pos, menu) {
            if (this.activePos != -1) {
                return pos == this.activePos;
            }
            return this.isSelected(pos, menu)
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
                this.showPopupMenu(i)
            }
        },
        //item class
        mItemClass(index) {
            let flag = this.isSelected(index, false)
            return {
                'item-text': true,
                'item-text-selected': flag
            }
        },
        //是否选中
        isSelected(pos, menu) {
            let item = this.items[pos]
            if (!this.selectedPath) {
                return false
            }

            if (menu) {
                return this.selectedPath.indexOf(item.index) == 0
            } else {
                return item.index == this.selectedPath
            }

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
    //加载后处理
    mounted() {
        this.clientWidth = foxUI.getClientWidth()
        this.clientHeight = foxUI.getClientHeight()
    }

};
</script>
<style scoped>
.my-wrap {
    position: absolute;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
}

.my-menu-wrap {
    background: rgba(7, 7, 7, 0.9);
    box-sizing: border-box;
    padding-top: 24px;
    height: 100%;
    position: relative;
}

.my-menu-wrap::after {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 1px;
    content: '';
    -webkit-transform: scaleX(.5);
    transform: scaleX(.5);
    background-color: rgba(255, 255, 255, 0.2)
}

.my-sub-menu {
    flex: 0 1 auto;
    min-width: 240px;
    max-width: 240px;
    box-sizing: content-box;
    position: relative;
    height: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
}

.my-menu-item-mark {}

.my-sub-menu-item {
    flex: 0 0 auto;
    position: relative;
    height: 50px;
    width: 100%;
    padding: 0px 25px 0 25px;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
}

.item-line {
    flex: 0 0 auto;
    width: 100%;
    padding: 0px 25px 0px 25px;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    box-sizing: border-box;
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

.el-icon-star-on.favor {
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