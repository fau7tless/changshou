<template>
    <div class="my-sidebar">
        <div class="my-switch-buttons">
            <fox-button-group>
                <fox-button class="my-btn" @click="onShowAll">全部</fox-button>
                <fox-button class="my-btn" @click="onShowFavors">常用</fox-button>
                <fox-button class="my-btn my-btn-search" icon="el-icon-search" @click="onShowSearch"></fox-button>
            </fox-button-group>
        </div>
        <fox-autocomplete-item placeholder="请输入" v-show="showSearch" v-model="searchVal" item-type="text" text-type="text" :clearable="true" :fetch-suggestions="querySearch" @select="handleSelect" @focus="onFocus()" @blur="onBlur()">
        </fox-autocomplete-item>
        <div class="my-menu-set" :style="menuSetStyle">
            <my-menu v-show="allMenuShow" ref="all" :items="mAllMenus" :value="selected" @selected="onSelect($event)" :favors="favors" @update-favor="onUpdateFavor($event)">
            </my-menu>
            <my-menu v-show="!allMenuShow" ref="favor" :items="mAllMenus" :value="selected" @selected="onSelect($event)" :favors="favors" @update-favor="onUpdateFavor($event)" :show-favor-only="true">
            </my-menu>
        </div>
    </div>
</template>
<script>
import MyMenu from "./my-menu";
export default {
    name: "my-sidebar",
    components: { MyMenu },
    //数据
    data() {
        return {
            //所有菜单
            allMenus: [],
            //收藏
            favors: [],
            //select item
            selected: {},
            //是否显示所有menu
            allMenuShow: true,
            //是否显示search
            showSearch: false,
            //查询值
            searchVal: "",
            //menu set style
            menuSetStyle: {},
        }
    },
    //计算
    computed: {
        //返回所有menus
        mAllMenus() {
            if (this.allMenus && this.allMenus.length > 0) {
                return this.allMenus.slice(1)
            }
            return []
        },
        mAllTreeLeaf() {
            let list = []
            this.getLeafNode(this.mAllMenus, [], list)
            return list
        }
    },
    //方法
    methods: {
        //提取叶子节点
        getLeafNode(nodes, texts, resList) {
            for (let node of nodes) {
                if (node.children) {
                    this.getLeafNode(node.children, [...texts, node.text], resList)
                } else {
                    let item = {}
                    item.text = item.value = node.text
                    item.path = node.name || node.path
                    item.index = node.index
                    item.hidden = ((node.path =='/trade/core/easypage')? true:false)
                    item.firstLetters = pinyinUtil.getFirstLetter(node.text, true) || []
                    item.pingyin = pinyinUtil.getPinyin(node.text, '', false, false) || ""
                    //转换为大写
                    item.pingyin = item.pingyin.toUpperCase()
                    item.texts = [...texts, item.text]
                    resList.push(item)
                    for(var i=0;i<resList.length;i++){
                        if(resList[i].hidden){
                            resList.splice(i,1)
                        }
                    }
                }
            }
        },
        //处理select event
        handleSelect(item) {
            let location = {
                index: item.index,
                path: item.path,
                text: item.text,
                texts: item.texts
            }
            this.searchVal = item.value
            this.onSelect(location)

        },
        //查询处理
        querySearch(queryString, cb) {
            //转换为大写
            queryString = queryString.toUpperCase()
            let results = this.mAllTreeLeaf.filter(item => {
                //中文匹配
                if (item.value && item.value.indexOf(queryString) != -1) {
                    return true
                }
                //首字母匹配
                for (let letter of item.firstLetters) {
                    if (letter.indexOf(queryString) != -1) {
                        return true
                    }
                }
                //拼音匹配
                if (item.pingyin.indexOf(queryString) != -1) {
                    return true
                }

                return false
            })
            // 调用 callback 返回建议列表的数据
            for(var i=0;i<results.length;i++){
                if(results[i].hidden){
                    results.splice(i,1)
                }
            }
            cb(results);
        },
        //显示所有菜单
        onShowAll() {
            this.allMenuShow = true;
        },
        //显示favor菜单
        onShowFavors() {
            this.allMenuShow = false;
        },
        //显示搜索框
        onShowSearch() {
            this.showSearch = !this.showSearch;
        },
        //更新favors
        onUpdateFavor(favor) {
            if (!favor) {
                return
            }
            let index = this.favors.indexOf(favor)
            if (index == -1) {
                this.favors.push(favor)
            } else {
                this.favors.splice(index, 1)
            }
        },
        //选中
        onSelect(item) {
            //设置选中item
            this.selected = item;
            //隐藏
            if (this.allMenuShow) {
                this.$refs.all.hide();
            } else {
                this.$refs.favor.hide();
            }
            this.notifyMenuSelected(this.selected)
        },
        //通知菜单修改
        notifyMenuSelected(item) {
            //通知菜单选中
            this.$fox_emit("global_event_menu_selected", item);
            //保存选中状态
            this.saveSelectedState();
        },
        //处理tag选中事件
        onTagSelected(item) {
            this.selected = item;
            //保存选中状态
            this.saveSelectedState();
        },
        //查找菜单
        searchMenu(node, menus) {
            for (let item of menus) {
                //忽略非页子节点，查找孩子节点
                if (item.children) {
                    if (this.searchMenu(node, item.children)) {
                        node.texts.splice(0, 0, item.text);
                        return true;
                    }
                } else if (item.path == node.path) {
                    node.texts = [item.text];
                    for (let key in item) {
                        node[key] = item[key];
                    }
                    return true;
                }
            }
            return false;
        },
        //处理page打开事件
        onPageOpen(item) {
            if (!this.searchMenu(item, this.allMenus)) {
                item.texts = ['页面'];
            }
            this.selected = item;
            //通知页面选中
            this.notifyMenuSelected(item);
            //保存选中状态
            this.saveSelectedState();
        },
        //保存选中状态
        saveSelectedState() {
            this.$fox.sessionStorage.put("global_selected", this.selected)
        },
        //focus
        onFocus() {


        },
        //blur
        onBlur() {

        }
    },
    //加载后处理
    mounted() {
        //注册监听tab修改事件
        this.$fox_on("global_event_tag_selected", msg => {
            this.onTagSelected(msg)
        });
        this.$fox_on('global_event_open_page', msg => {
            this.onPageOpen(msg)
        });
        this.$fox_on('global_event_update_favor', msg => {
            this.onUpdateFavor(msg)
        })
        //获取所有菜单
        this.allMenus = this.$fox.sessionStorage.get('global_menus') || [];
        //获取favors
        this.favors = this.$fox.sessionStorage.get("global_favors") || [];
        //获取激活页面
        this.selected = this.$fox.sessionStorage.get("global_selected") || "";
        //设置首页为选中页面
        if (!this.selected) {
            let first = this.allMenus[0];
            this.selected = { 'texts': [first.text] };
            //home页
            this.selected.home = true;
            for (let key in first) {
                this.selected[key] = first[key];
            }
        }

        setTimeout(() => {
            this.notifyMenuSelected(this.selected);
        }, 10)

    }
};
</script>
<style scoped>
.my-sidebar {
    /*background: #070707;*/
    background: url('../../../../../static/img/sidebar_bg.png') no-repeat 0% 100%;
    background-size: 85% auto;
    background-color: #070707;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: flex-start;
}

.my-switch-buttons {
    margin: 15px 0 15px 0;
}

.my-switch-buttons .my-btn {
    color: #FFF;
    background-color: #070707;
    border-color: #2b2b2b;
}

.my-switch-buttons .my-btn:focus,
.my-switch-btns .my-btn:hover {
    background-color: #2b2b2b;
}

.my-switch-buttons .my-btn-search {
    border-top-color: #070707;
    border-right: #070707;
    border-bottom-color: #070707;
    border-left-color: #2b2b2b;
}

.my-menu-set {
    width: 100%;
    overflow-y: auto;
}
</style>
<style>
.my-sidebar .el-autocomplete {
    width: 192px;
}

.my-sidebar .el-input__inner {
    background: transparent;
    /*background-color: #2b2b2b;*/
    border-color: rgba(255, 255, 255, 0.4);
    color: #ffffff;
}


.my-sidebar .el-input__inner:focus {
    border-color: #E4A542;
    color: #ffffff;
}
</style>