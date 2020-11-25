<template>
    <fox-page>
        <fox-content>
            <input ref="file" @change="setFilePath($event)" type="file" hidden>
            <fox-group no="1" title="文件选择" class="my-group" label-width="80px" column="2" style="width:100%">
                <fox-item label="文件路径">
                    <div class="el-input">
                        <input placeholder="点击选择Excel文件" type="text" readonly="true" v-model="path" autocomplete="off" @click="selectFile" class="el-input__inner">
                    </div>
                </fox-item>
                <fox-item>
                    <fox-button class="el-button--primary my-button">生成页面</fox-button>
                </fox-item>
                <fox-input-row>
                    <div class="my-file-rect">
                        <span>请把Excel文件拖进该区域</span>
                    </div>
                </fox-input-row>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "index",
        //数据
        data:function(){
            return {
              path:""
            }
        },
        //方法
        methods:{
            //选择文件
            selectFile(){
                this.$refs.file.click();

            },
            setFilePath(event){
                this.path = this.$refs.file.value;
            }
        },
        //加载后处理
        mounted:function(){

        }
    }
</script>

<style scoped>
    .my-button{
        width: 200px;
    }
    .my-file-rect{
        width: 100%;
        height: 300px;
        background:greenyellow;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items:center;
    }
</style>