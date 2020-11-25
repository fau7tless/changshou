<template>
    <div ref="tags" class="my-tags" v-if="showTags">
        <div ref="firstItem" class="my-tag-first">
            <span :class="mFirstItemClass" @click="selectTag(0, mFirstItem)">
            </span>
        </div>
        <div class="tagsWrap">
            <div ref="itemWrap" class="my-tag-ul">
                <template v-for="(item, index) in mItems">
                    <fox-tag class="my-tags-li" :class="{'active': isActive(item)}" :key="index" closable type="info" @click="selectTag(index+1, item)" @contextmenu.native="showMenu($event, index+1, item)" :disable-transitions="true" @close="closeTags(index+1)">
                        {{formatItemText(item.text)}}
                    </fox-tag>
                </template>
            </div>
        </div>
        <div v-show="showNav" class="my-tag-nav">
            <a :class="{'my-tag-nav-item':true, 'el-icon-caret-left':true, 'active': mLeftEnabled}" @click="previous"></a>
            <a :class="{'my-tag-nav-item':true, 'el-icon-caret-right':true,'active': mRightEnabled}" @click="next"></a>
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-icon-tickets">
                </span>
                <fox-dropdown-menu slot="dropdown">
                    <fox-dropdown-item v-for="(item, index) in mItems" :command="index" :key="index" :class="{'my-dropdown-item':true ,'active': isActive(item)}">{{formatItemText(item.text)}}</fox-dropdown-item>
                </fox-dropdown-menu>
            </el-dropdown>
        </div>
        <my-context-menu ref="contextMenu" :items="contextMenuItems" :item-style="contextMenuItemStyle" @command="handleContextMenuCommand"></my-context-menu>
    </div>
</template>
<script>
//导入fox libs
import { foxUI } from '@/assets/libs/fox-libs'
import MyContextMenu from "./my-context-menu";

//导航标签宽度
const NavTagWidth = 90

export default {
    name: "my-tags",
    components: { MyContextMenu },
    //属性
    props: {
        //dashboard router view name
        firstRouterViewName: {
            type: String,
            required: true,
        },
        //router view name
        routerViewName: {
            type: String,
            required: true,
        },
    },
    //数据
    data() {
        return {
            //tab items
            items: [],
            // tab items 元素宽度
            itemsWidth: [],
            //偏移pos
            offsetPos: 0,
            // 可见的首个元素的索引
            firstVisibleItemIndex: 0,
            lastVisibleItemIndex: 0,
            //选中
            selected: "",
            //是否显示tab页
            showTags: true,
            //是否显示导航
            showNav: false,
            // 上下翻页箭头是否可用
            mLeftEnabled: false,
            mRightEnabled: false,
            //tab item meta data list
            itemMetas: [],
            //tags容器宽度
            tagsWidth: -1,
            //第一个item宽度
            firstItemWidth: 0,
            //context menu item
            contextMenuItems: [
                { command: 'close', text: '关闭标签' },
                { command: 'closeOther', text: '关闭其他标签' },
                { command: 'closeRight', text: '关闭右侧标签' },
                { command: 'closeAll', text: '关闭全部' },
                { command: 'add', text: '加入常用' },
            ],
            //context menu item style
            contextMenuItemStyle: {
                'width': '136px'
            },
            //历史监听器
            m_historyListener: undefined,
        }
    },
    watch: {
        firstVisibleItemIndex(val) {
            this.computedHasPreviousItems(val)
            if (val == 0 && this.itemsWidth.length > 0) {
                this.mRightEnabled = false
                this.mLeftEnabled = true
            }
        },
        lastVisibleItemIndex(newVal, oldVal) {
            let tagNavEle = this.$refs.tags.querySelector('.my-tag-nav')
            if (newVal == this.itemsWidth.length) {
                tagNavEle.classList.add('no-shadow-tag-nav')
                this.mRightEnabled = false
            } else {
                tagNavEle.classList.remove('no-shadow-tag-nav')
                this.mRightEnabled = true
            }
        },
        ifShowNavParams(newObj, oldObj) {
            let startPos = this.firstVisibleItemIndex
            let endPos = this.lastVisibleItemIndex
            let showLen = endPos - startPos + 1
            if ((newObj.itemsWidth.length <= showLen) && (newObj.fIndex == 1)) {
                this.$refs.tags.classList.remove('overflow-tags')
                this.showNav = false
            }
            if ((newObj.itemsWidth.length > showLen && oldObj.itemsWidth.length <= showLen) || (oldObj.fIndex == 1 && newObj.fIndex !== 1)) {
                this.$refs.tags.classList.add('overflow-tags')
                this.showNav = true
            }
        }
    },
    //计算
    computed: {
        ifShowNavParams() {
            // let itemsLen = this.itemsWidth.length
            const { itemsWidth, firstVisibleItemIndex } = this
            return {
                itemsWidth,
                fIndex: firstVisibleItemIndex
            }
        },
        mFirstItemClass() {
            let cls = {
                'my-tags-li': true,
                'my-tags-li-title': true,
                'active': this.isActive(this.mFirstItem)
            }
            cls[this.mFirstItem.icon] = true
            return cls
        },
        //dashboard item
        mFirstItem() {
            if (this.items.length == 0) {
                return { icon: "" }
            }
            return this.items[0]
        },
        //items
        mItems() {
            if (this.items.length <= 1) {
                return []
            }
            let list = this.items.slice(1)
            return list
        }
    },
    //方法
    methods: {
        computedHasPreviousItems(val) {
            let homeButtonShadow = this.$refs.tags.querySelector('span.my-tags-li.my-tags-li-title.el-icon-s-home')
            let tagNavEle = this.$refs.tags.querySelector('.my-tag-nav')
            if (val <= 1) {
                this.mLeftEnabled = false
                homeButtonShadow.classList.add('no-shadow-home-icon')
            } else {
                homeButtonShadow.classList.remove('no-shadow-home-icon')
                this.mLeftEnabled = true
            }
        },
        handleContextMenuCommand(action, index) {
            if (action === 'close') {
                this.closeTags(index)
            } else if (action === 'closeOther') {
                this.closeOther(index)
            } else if (action === 'closeRight') {
                this.closeRight(index)
            } else if (action === 'closeAll') {
                this.closeAll()
            } else if (action === 'add') {
                this.$fox_emit("global_event_update_favor", this.items[index].index)
            }
        },
        //显示menu
        showMenu(event, index, item) {
            event.preventDefault();
            this.$refs.contextMenu.show(event.x, event.y, index)
        },
        //处理tag
        handleCommand(command) {
            this.selectTag(Number(command) + 1)
        },
        //item是否可见
        isItemShow(index) {
            if (index < -this.offsetPos) {
                return false
            }
            return true
        },
        //左移动标签
        previous() {
            if (this.firstVisibleItemIndex > 1) {
                this.computedShowRangeStart(this.firstVisibleItemIndex - 1)
                this.computedShowRangeEnd(this.firstVisibleItemIndex)
                this.moveAnimationTrigger()
            }
            if (!this.mLeftEnabled) {
                return
            }
            this.offsetPos -= 1
        },
        //右移动标签
        next() {
            if (this.lastVisibleItemIndex < this.itemsWidth.length) {
                if (this.lastVisibleItemIndex == 0) {
                    // 如果执行下一页操作时，tab标签尚未激活
                    // 则初始化展示的tab的范围为首页
                    this.computedShowRangeEnd(1)
                }
                this.computedShowRangeEnd(this.lastVisibleItemIndex + 1)
                this.computedShowRangeStart(this.lastVisibleItemIndex)
                this.moveAnimationTrigger()
            }
            if (!this.mRightEnabled) {
                return
            }
            this.offsetPos += 1
        },
        //是否为激活标签
        isActive(item) {
            return item.path === this.selected || this.name === this.selected;
        },
        //是否能关闭
        isClosable(item) {
            if (item.closable == undefined) {
                return true
            }
            return item.closable;
        },
        //格式化item text
        formatItemText(text) {
            if(window.outPageName){
                return foxUI.renderText(window.outPageName, 10)
            }
            return foxUI.renderText(text, 10)
        },
        showRange() {
            this.$message.info('' + this.firstVisibleItemIndex + ' ~ ' + this.lastVisibleItemIndex)
        },
        // 根据显示区域的首个元素的序号，计算position偏移量，用于移动动画
        computedItemMoveWidth(startPos) {
            let leftPos = 0
            let itemMargin = 10
            let startIndex = startPos - 1
            for (let [i, item] of this.itemsWidth.entries()) {
                if (i < startIndex)
                    leftPos += item + itemMargin
            }
            leftPos -= itemMargin
            if (startPos !== 1) {
                leftPos += 40
            }
            leftPos -= 2
            return leftPos
        },
        // endPos：显示的最后一个的序号
        // 根据显示的最后一个元素的序号，计算出显示的首个元素的序号
        computedShowRangeStart(endPos) {
            let tagsWrapEle = this.$refs.tags.querySelector('.my-main-header.my-header .tagsWrap')
            let tagsWrapWidth = tagsWrapEle.offsetWidth - 100 - 10
            let showWidth = 0
            let pos = endPos - 1
            for (; pos >= 0 && pos <= this.itemsWidth.length; pos = pos - 1) {
                if (showWidth + this.itemsWidth[pos] + 10 >= tagsWrapWidth) {
                    pos = pos + 1
                    break
                } else {
                    showWidth += this.itemsWidth[pos] + 10
                }
            }
            // 如果退出循环的情形为pos<0,则此时pos=-1，需要进行增1操作
            if (pos < 0) { pos = pos + 1 }
            // 改索引为序号
            pos = pos + 1
            this.firstVisibleItemIndex = pos
            this.lastVisibleItemIndex = endPos
            return pos > 0 ? pos : 1
        },
        // 根据显示的首个元素的序号，计算出能显示的最后一个元素的序号
        computedShowRangeEnd(startPos) {
            let tagsWrapEle = this.$refs.tags.querySelector('.my-main-header.my-header .tagsWrap')
            let tagsWrapWidth = tagsWrapEle.offsetWidth - 100 - 10
            let showWidth = 0
            let pos = startPos - 1
            for (; pos >= 0 && pos < this.itemsWidth.length; pos = pos + 1) {
                if (showWidth + this.itemsWidth[pos] + 10 > tagsWrapWidth) {
                    pos = pos - 1
                    break
                } else {
                    showWidth += this.itemsWidth[pos] + 10
                }
            }
            // 如果退出循环的情形为pos == this.itemsWidth.length,则此时pos实际已越界，需要进行减1操作
            if (pos == this.itemsWidth.length) { pos = pos - 1 }
            // 改索引为序号
            pos = pos + 1
            this.firstVisibleItemIndex = startPos
            this.lastVisibleItemIndex = pos
            return pos
        },
        moveAnimationTrigger() {
            let tagsEle = this.$refs.tags.querySelector('.my-main-header.my-header .tagsWrap .my-tag-ul')
            let leftPos = this.computedItemMoveWidth(this.firstVisibleItemIndex)
            leftPos = leftPos + 2
            tagsEle.style.left = -1 * leftPos + 'px'
        },
        // index为需要尽可能定位到的最末尾元素的序号
        moveToTag(index) {
            let tagsEle = this.$refs.tags.querySelector('.my-main-header.my-header .tagsWrap .my-tag-ul')
            if (index < 1) {
                tagsEle.style.left = '11px'
                return null
            }
            if (index > this.lastVisibleItemIndex || index < this.firstVisibleItemIndex || this.lastVisibleItemIndex == 0) {
                // 根据末尾元素，计算开头元素
                this.computedShowRangeStart(index)
                this.computedShowRangeEnd(this.firstVisibleItemIndex)
                this.moveAnimationTrigger()
            } else {
                if (index == this.firstVisibleItemIndex) {
                    // this.computedShowRangeStart(index)
                    if (index > 1) {
                        this.computedShowRangeEnd(index - 1)
                    } else {
                        this.computedShowRangeEnd(1)
                    }
                    this.moveAnimationTrigger()
                }
            }
            // 每次跳转后计算末尾标签的序号
            this.computedShowRangeEnd(this.firstVisibleItemIndex)
        },
        //选中标签
        selectTag(index) {
            if (index !== 0) {
                this.moveToTag(index);
            } else {
                // this.showRange()
            }
            const item = this.items[index]
            if (index == 0) {
                //打开page
                this.openPage(item, this.firstRouterViewName, 'to');
                this.toHome(true)
            } else {
                //在navigation显示的情况下，可能需要调整offset pos
                if (this.showNav) {
                    let pos = index - 1
                    //判断是否需要调整offset pos
                    if (pos + this.offsetPos < 0) {
                        this.offsetPos = -pos
                    } else {
                        let width = 0
                        for (let i = -this.offsetPos; i < pos; i++) {
                            let w = this.itemMetas[i].width
                            width += w
                        }

                        let n = width - (this.tagsWidth - this.firstItemWidth - NavTagWidth)
                        if (n > 0) {
                            for (let i = pos; i > 0; i--) {
                                n -= this.itemMetas[i].width
                                this.offsetPos--
                                if (n <= 0) {
                                    break
                                }
                            }
                        }
                    }
                }

                //打开page
                this.openPage(item, this.routerViewName);
                //切换tab
                this.toHome(false)
            }
            //通知tag selected
            this.notifyTagSelected(item)

        },
        //跳转到home页面
        toHome(home) {
            //切换home页面
            this.$fox_emit("global_event_to_home", home)
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.items.splice(index, 1)[0];
            this.closePage(delItem)
            if (index == this.items.length) {
                // 调整可见范围中的最后一个元素的序号
                this.lastVisibleItemIndex = index - 1
                // 如果长度清空，则修改rangde的起始index
                if (index == 1) {
                    this.firstVisibleItemIndex = 0
                }
                index -= 1
            }
            if (this.items.length > 0) {
                this.selectTag(index)
            }
            this.$nextTick(() => {
                this.updateTagLayout()
                this.computedShowRangeEnd(this.firstVisibleItemIndex)
                this.moveToTag(this.lastVisibleItemIndex)
            })
        },
        // 关闭全部标签
        closeAll() {
            let list = []
            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i]
                if (item.closable === false) {
                    list.push(item)
                } else {
                    this.closePage(item)
                }
            }
            this.items = list
            if (this.items.length > 0) {
                this.selectTag(0)
            }
            this.$nextTick(() => {
                this.updateTagLayout()
                this.firstVisibleItemIndex = this.lastVisibleItemIndex = 0
            })
        },
        // 关闭其他标签
        closeOther(index) {
            let pos = 0
            let list = []
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].closable === false) {
                    list.push(this.items[i])
                } else if (i == index) {
                    list.push(this.items[i])
                    pos = i
                } else {
                    this.closePage(this.items[i])
                }
            }
            this.items = list
            //重新设置index
            this.selectTag(1)
            this.$nextTick(() => {
                this.updateTagLayout()
                //重新设置range
                this.computedShowRangeEnd(1)
            })
        },
        // 关闭右侧标签
        closeRight(index) {
            let list = []
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].closable === false) {
                    list.push(this.items[i])
                } else if (i <= index) {
                    list.push(this.items[i])
                } else {
                    this.closePage(this.items[i])
                }
            }
            //重新设置range
            this.lastVisibleItemIndex = index
            this.computedShowRangeStart(this.lastVisibleItemIndex)
            this.items = list
            //重新设置index
            this.selectTag(index)
            this.$nextTick(() => {
                this.updateTagLayout()
            })
        },
        // 设置标签
        setTag(location) {
            // this.$message.info('2333')
            //判断item是存在
            let targetIndex
            const isExist = this.items.some((item, i) => {
                if (location.path) {
                    targetIndex = i
                    return item.path === location.path
                } else {
                    targetIndex = i
                    return item.name === location.name
                }
            });
            //如果不存在，则加入item
            if (!isExist) {
                let item = location;
                if (location.home) {
                    item.icon = 'el-icon-s-home';
                    item.closable = false;
                } else {
                    item.closable = true;
                }
                this.items.push(item);
            }
            this.$nextTick(() => {
                this.updateTagLayout()
                if (!isExist) {
                    this.moveToTag(this.itemsWidth.length);
                } else {
                    if (targetIndex) {
                        this.moveToTag(targetIndex);
                    }
                }
            })

            if (location.home) {
                //打开页面
                this.openPage(location, this.firstRouterViewName, 'to')
            } else {
                //打开页面
                this.openPage(location, this.routerViewName)
            }

            //通知tag selected
            this.notifyTagSelected(location)
            setTimeout(() => {
                //切换tab
                this.toHome(!!location.home)
            }, 10)
        },
        //打开页面
        openPage(item, root, type) {
            //激活index
            this.selected = item.path || item.name;
            //参数
            let params = item.params || {};

            if (type == 'to') {
                //打开页面
                this.$router.to(this.selected, params, root);
            } else {
                //打开页面
                this.$router.open(this.selected, params, root);
            }
            //保存tag状态
            this.saveTagState();
        },
        //关闭页面
        closePage(item) {
            if (item.path) {
                this.$router.close({ "path": item.path, "root": this.routerViewName });
            } else {
                this.$router.close({ "name": item.name, "root": this.routerViewName });
            }
            //保存tag状态
            this.saveTagState();
        },
        //通知tag选中
        notifyTagSelected(item) {
            //触发tab selected事件
            this.$fox_emit("global_event_tag_selected", item)
        },
        //保存tag状态
        saveTagState() {
            this.$fox.sessionStorage.put('global_tags', this.items)
        },
        //加载tag状态
        loadTagState() {
            this.items = this.$fox.sessionStorage.get('global_tags') || []
        },
        //更新tags布局
        updateTagLayout() {
            let list = []
            let listWidthValue = []
            //总的item width
            let sumItemsWidth = 0

            if (this.$refs.tags) {
                //获取第一个item width
                this.firstItemWidth = foxUI.offsetWidth(this.$refs.firstItem)
                //获取tag width
                this.tagsWidth = foxUI.offsetWidth(this.$refs.tags)
                //获取所以的tag标签html node
                let itemNodes = this.$refs.itemWrap.querySelectorAll(".my-tags-li")
                if (itemNodes && itemNodes.length > 0) {
                    for (let i = 0; i < itemNodes.length; i++) {
                        let node = itemNodes[i]
                        let w = foxUI.offsetWidth(node)
                        sumItemsWidth += w + 10
                        list.push({
                            width: w,
                        })
                        listWidthValue.push(w)
                    }
                }
            }
            // 记录标签宽度
            this.itemsWidth = JSON.parse(JSON.stringify(listWidthValue))
            if (sumItemsWidth >= this.tagsWidth - this.firstItemWidth - 100) {
                // this.showNav = true
            } else {
                // this.showNav = false
                this.offsetPos = 0
            }
            //更新item meta信息
            this.itemMetas = list
        },
        //hash monitor
        hashMonitor() {
            let hash = window.location.hash
            let index = hash.indexOf('/')
            hash = hash.substring(index)

            let selectedIndex = -1
            //设置route path
            for (let i = 0; i < this.items.length; i++) {
                let item = this.items[i]
                if (item.path == hash) {
                    selectedIndex = i
                    break
                }
            }
            if (selectedIndex != -1) {
                this.selectTag(selectedIndex)
            }
        }
    },
    //更新后
    updated() {
        if (this.itemsWidth.length > 0 && this.firstVisibleItemIndex === 0) {
            this.computedShowRangeEnd(1)
        }
    },
    //加载后处理
    mounted() {
        //加载tag items
        this.loadTagState();
        //注册监听tab修改事件
        this.$fox_on("global_event_menu_selected", msg => {
            this.setTag(msg)
        });
        //注册监听tab修改事件
        this.$fox_on("global_event_tag_close", msg => {
            let index = -1;
            for (let i = 0; i < this.items.length; i++) {
                if (this.items[i].path == msg.path) {
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                this.closeTags(index);
            }
        });

        //创建监听器
        this.m_historyListener = () => {
            this.hashMonitor();
        }
        window.addEventListener('popstate', this.m_historyListener)
        // 初始化tab标签的显示范围
        let _this = this
        window.onresize = function computeShowRange() {
            if (_this.firstVisibleItemIndex !== 0) {
                _this.computedShowRangeEnd(_this.firstVisibleItemIndex)
            } else {
                if (_this.itemsWidth.length > 0) {
                    _this.computedShowRangeEnd(1)
                }
            }
        };
    },
    //销毁前销毁
    beforeDestroy() {
        if (this.m_historyListener) {
            window.removeEventListener('popstate', this.m_historyListener)
        }
    }
};
</script>
<style scoped>
.my-tags {
    position: relative;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    ;
    justify-content: flex-start;
    height: 40px;
    overflow: hidden;
    flex: 1 1 auto;
    z-index: 10;
}

.tagsWrap {
    position: relative;
    width: 100%;
}

.my-tag-ul {
    position: absolute;
    left: 10px;
    transition: all 0.25s;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    z-index: -1;
}

.my-tags-li {
    background: #e8ebf3;
    color: #666778;
    flex: 0 0 auto;
    padding: 0 12px;
    margin-left: 10px;
    border-radius: 3px;
    font-size: 14px;
    overflow: hidden;
    cursor: pointer;
    line-height: 36px;
    height: 36px;
    max-width: 186px;
    box-sizing: border-box;
    border: 1px solid #e9eaec;
    vertical-align: middle;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.my-tags-li:not(.active):hover {
    background: #ebeff8;
    color: #667188;
}

.my-tags-li.active {
    background: #E4A542;
    color: #fff;
    border: 1px solid #fff;
}

.my-tags-li-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.my-tags-li-icon {
    color: #666;
    margin-left: 8px;
}

.my-tag-first {
    flex: 0 0 auto;
    z-index: 2;
    height: 36px;
    width: 36px;
    background: #e8ebf3;
    color: #666778;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    border-radius: 3px;
    font-size: 14px;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
    border: 1px solid #e9eaec;
    vertical-align: middle;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
    overflow: visible;
}

.my-tag-first .my-tags-li {
    width: 36px;
    margin-left: 0px;
    padding: 0px;
    text-align: center;
    position: relative;
    overflow: visible;
}

.overflow-tags .my-tags-li.my-tags-li-title.el-icon-s-home:after {
    opacity: 1;
    position: absolute;
    z-index: -1;
    content: "";
    right: -11px;
    /* 抵消边框的1px */
    top: -20.5px;
    width: 10px;
    height: 74px;
    background-color: #ffffff;
    box-shadow: -4px 0px 0px 0px rgba(255, 255, 255, 1), 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
}

.overflow-tags .my-tags-li.my-tags-li-title.el-icon-s-home.no-shadow-home-icon:after {
    opacity: 0;
}

.my-tag-nav {
    position: absolute;
    height: 36px;
    width: 90px;
    border-radius: 3px;
    padding: 0 16px;
    right: 0;
    top: 19px;
    cursor: pointer;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;

    border: 1px solid #e9eaec;
    background: #e8ecf3;
    color: #666;
    vertical-align: middle;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;

    box-shadow: 0px 0px 0px 6px #fff;
}

.overflow-tags .my-tag-nav:after {
    opacity: 1;
    position: absolute;
    z-index: -1;
    content: "";
    left: -10px;
    /* 抵消边框的1px */
    top: -20.5px;
    width: 10px;
    height: 74px;
    background-color: #ffffff;
    box-shadow: 4px 0px 0px 0px rgba(255, 255, 255, 1), 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
}

span.my-tags-li.my-tags-li-title.el-icon-s-home {
    box-shadow: 4px 0px 0px 0px rgba(255, 255, 255, 1);
}

.overflow-tags .my-tag-nav.no-shadow-tag-nav:after {
    opacity: 0;
}

.my-tag-nav-item {
    color: #404d6a;
    opacity: 0.2;
}

.my-tag-nav-item.active {
    color: #000;
    opacity: 1;
}

.my-dropdown-item.active {
    color: #e9b768;
}
</style>