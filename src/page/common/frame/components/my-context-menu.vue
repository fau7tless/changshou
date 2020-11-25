<template>
    <div ref="wrap" class="my-context-menu-wrap">
        <ul :id="id" class="my-context-menu">
            <li v-for="item in items" :style="itemStyle" @click="itemClick(item.command)">{{item.text}}</li>
        </ul>
    </div>
</template>

<script>
    //导入fox libs
    import {foxUI} from '@/assets/libs/fox-libs'

    //记录document
    const doc = document

    export default {
        //组件名称
        name: "my-context-menu",
        //属性
        props:{
            //items
            items:{
                type:Array,
                required:true,
                default(){
                    return []
                }
            },
            //item class
            itemStyle:{
                type:Object,
                required:false,
            }
        },
        //数据
        data(){
            return {
                //id
                id:`contextMenu_${foxUI.getUUID()}`,
                //上下文
                context:undefined,
                //关闭监听器
                closeListener:()=>{
                    this.hide()
                }
            }
        },
        //方法
        methods:{
            //item click
            itemClick(name){
                this.$emit("command", name, this.context)
            },
            //显示
            // @exposed-api
            show(x, y, context){
                this.context = context
                let node = doc.getElementById(this.id)
                node.style.left = `${x}px`
                node.style.top = `${y}px`
                doc.body.appendChild(node)
            },
            //隐藏
            // @exposed-api
            hide(){
                let node = doc.getElementById(this.id)
                if(this.$refs && this.$refs.wrap){
                    this.$refs.wrap.appendChild(node)
                }
            }
        },
        //加载后处理
        mounted(){
            doc.addEventListener('click', this.closeListener)
        },
        //销毁前
        beforeDestroy(){
            doc.removeEventListener('click', this.closeListener)
        }

    }
</script>

<style>
    .my-context-menu-wrap{
        display: none;
    }

    .my-context-menu{
        position: absolute;
        margin-bottom: 0;
        padding-left: 0;
        list-style: none;
        background-color: #fff;
        z-index:1030;
        overflow: hidden;
        border-radius: 2px;
        background-clip: padding-box;
        -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
        box-shadow: 0 1px 2px rgba(0, 0, 0, .3);
    }

    .my-context-menu > li{
        position: relative;
        padding: 10px 20px;
        font-size: 14px;
        color:#667188;
    }

    .my-context-menu > li:hover{
        background: #f3f4fb;
        cursor: pointer;
    }

    .my-context-menu > li:after{
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }
</style>