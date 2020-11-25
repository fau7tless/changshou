<template>
    <div class="my-todo-list">
        <template v-for="(item,index) in items">
            <div :key="`todo-line-${index}`" class="my-todo-line" :style="lineStyle(index)">
                <div>{{item.text}}</div>
                <div>{{item.count}}</div>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "my-todo-list",
        //属性
        props:{
            //items
            items:{
                type:Array,
                required:true
            }
        },
        //方法
        methods:{
            //line style
            lineStyle(index){
                if(index%2 == 0){
                    return {
                        'background-color':"#F7F8FB",
                        'border':"1px solid #E7EBF2"
                    }
                }else{
                    return {
                        'background-color':"#FFFFFF"
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .my-todo-list{
    }

    .my-todo-line{
        flex:0 0 auto;
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        color:#404D6A;
        font-size: 14px;
        line-height: 36px;
        box-sizing: border-box;
        padding: 0 10px;
    }
</style>