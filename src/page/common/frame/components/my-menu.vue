<template>
    <ul class="my-menu" :style="mMenuStyle">
        <li v-for="(item, index) in items" v-show="isShow(index)" class="my-menu-item" :style="mMenuItemStyle(index)"
            @click="onSelect(index)" @mouseover = "onMouseOver(index)" @mouseout = "onMouseOut($event, index)">
            <div class="menu-item__mark" :style="mMenuItemMarkStyle(index)"></div>
            <i :class="mMenuItemIconClass(index, item)"></i>
            <span class="menu-item__text">{{item.text}}</span>
            <i class="menu-item__icon-arrow el-icon-arrow-right"></i>
        </li>
        <my-sub-menu :visible.sync="visible" :selected-path="mIndex" :favors="favors" :items="subItems"
        @update-favor="onUpdateFavor($event)" @selected="onSubSelect($event)" :show-favor-only="showFavorOnly"></my-sub-menu>
    </ul>
</template>

<script>
    import MySubMenu from './my-sub-menu';
    export default {
        name: 'my-menu',
        components: {MySubMenu},
        props:{
            //背景色
            backgroundColor:{
                type:String,
                required:false,
                // default:'#070707',
                default:'#00070707'
            },
            //激活背景色
            activeBackgroundColor:{
                type:String,
                required:false,
                default:'#2b2b2b'
            },
            //文本颜色
            textColor:{
                type:String,
                required:false,
                default:'#ffffff'
            },
            //激活文本颜色
            activeTextColor:{
                type:String,
                required:false,
                default:'#e5a642'
            },
            //favors
            favors:{
                type:Array,
                required:false,
                default(){
                    return []
                }
            },
            //items
            items:{
                type:Array,
                required:true,
                default(){
                    return [];
                }
            },
            //是否只显示favor item
            showFavorOnly:{
                type:Boolean,
                required:false,
                default:false,
            },
            //value
            value:{
                type:Object,
                required:false,
                default(){
                    return {'index':''}
                },
            },
        },
        //model
        model: {
            prop: 'value',
            event: 'selected'
        },
        //数据
        data(){
            return {
                //鼠标hover索引
                activePos:-1,
                //是否可见
                visible:false,
                //鼠标是否在范围内
                inMenuScope:false,
                //孩子items
                subItems:[],
            }
        },
        //监视
        watch:{
            visible(newVal){
                if(!newVal){
                    this.activePos = -1;
                }
            }
        },
        //计算
        computed:{
            //menu style
            mMenuStyle(){
                return {
                    'background-color':this.backgroundColor
                }
            },
            //索引
            mIndex(){
                if(!this.value || !this.value.index){
                    return "";
                }
                return this.value.index;
            }
        },
        //方法
        methods:{
            //menu item style
            mMenuItemStyle(index){
                if(this.isActive(index)){
                    return {
                        'background-color':this.activeBackgroundColor,
                        'color':this.activeTextColor,
                    }
                }else{
                    return {
                        'background-color':this.backgroundColor,
                        'color':this.textColor,
                    }
                }
            },
            //menu item mark style
            mMenuItemMarkStyle(index){
                if(this.isActive(index)){
                    return {
                        'background-color':this.activeTextColor,
                    }
                }else{
                    return {
                        'background-color':this.backgroundColor,
                    }
                }
            },
            //menu item icon class
            mMenuItemIconClass(index, item){
               return [item.icon, 'menu-item__icon']
            },
            //是否可见
            isShow(pos){
                let item = this.items[pos];
                if(item.path=='/trade/core/easypage'){
                    return false;
                }
                if(!this.showFavorOnly){
                    return true;
                }
                if(!this.favors || this.favors.length == 0){
                    return true;
                }
                for(let i=0; i<this.favors.length; i++){
                    if(this.favors[i].indexOf(item.index) == 0){
                        return true;
                    }
                }
                return false;
            },
            //是否选中
            isSelected(pos){
                if(!this.value || !this.value.index){
                    return false;
                }
                let item = this.items[pos];
                return this.value.index.indexOf(item.index) == 0
            },
            //是否为激活
            isActive(pos){
                if(this.activePos != -1){
                    return pos == this.activePos;
                }
                return this.isSelected(pos)
            },
            //选择
            onSelect(pos){
                this.showPopupMenu(pos);
            },
            //显示popup menu
            showPopupMenu(pos){
                let item = this.items[pos];
                this.activePos  = pos;
                this.subItems = item.children;
                this.visible = true;
            },
            //子menu选中事件
            onSubSelect(evt){
                let item = this.items[this.activePos];
                //插入texts
                evt.texts.splice(0, 0, item.text);
                this.$emit("selected", evt)
            },
            //更新favors
            onUpdateFavor(favor){
                this.$emit("update-favor", favor)
            },
            //mouse over
            onMouseOver(pos){
                this.showPopupMenu(pos);
            },
            //mouse out
            onMouseOut(event, index){
                if(event.target.className && event.target.className.indexOf('my-menu-item')!=-1){
                    return
                }
                if(event.relatedTarget.className && event.relatedTarget.className.indexOf('my-menu-item')!=-1){
                    return
                }
                this.activePos = -1;
                this.visible = false;
            },
            //显示菜单
            // @exposed-api
            show(){
                this.visible = true;
            },
            //隐藏菜单
            // @exposed-api
            hide(){
                this.visible = false;
            }

        }
    }
</script>

<style scoped>
    .my-menu{
        font-size: 14px;
        width: 100%;
    }

    .my-menu-item{
        position:relative;
        height: 50px;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: row nowrap;
        align-items:center;
        justify-content: flex-start;
    }

    .menu-item__mark{
        width: 5px;
        height: 50px;
        background: #e5a642;
    }

    .menu-item__icon{
        margin-left: 20px;
    }

    .menu-item__text{
        margin-left: 20px;
    }

    .menu-item__icon-arrow{
        position: absolute;
        top: 50%;
        right: 20px;
        margin-top: -7px;
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s,-webkit-transform .3s;
        font-size: 12px;
    }
</style>