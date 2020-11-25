<template>
    <div>
        <div class="my-top-header" :style="mStyle">
            <fox-button type="info" icon="el-icon-menu" class="my-top-header-menu" @click="showMenu"></fox-button>
            <img class="my-top-header-logo" src="../../../../assets/themes/gold/img/logo.png"/>
            <div class="header-right">
                <div class="my-top-header-softcall">
                    <fox-autocomplete-item 
                        placeholder="请输入" 
                        prefix-icon="el-icon-search" 
                        width="200px"
                        class="header-searchText"
                        v-model="seatchText" 
                        :clearable="false"
                        :highlight-first-item="true"
                        @select="handleSelect"
                        :fetch-suggestions="querySearch" 
                        >
                    </fox-autocomplete-item>
                    <fox-button
                            type="primary"
                            icon="el-icon-phone"
                            style="float: right;margin: 2px 2px"
                            @click="portBind"
                    >软叫号
                    </fox-button>
                </div>
                <div></div>
                <div class="header-right-bottom">
                    <div class="tools">
                        <fox-link icon="el-icon-lock" style="color: #fbfdff" @click="lockScreen">锁屏</fox-link>
                        <fox-link icon="el-icon-setting" style="color: #fbfdff">主题</fox-link>
                        <fox-link icon="el-icon-edit-outline" style="color: #fbfdff">反馈</fox-link>
                        <fox-link icon="iconfont icon-bangzhu" style="color: #fbfdff" @click="getHelp">帮助</fox-link>
                    </div>
                    <div class="split"></div>
                    <fox-popover placement="top-start" title="用户信息" width="300" trigger="click">
                        <!--                        <a class="iconfont icon-xiaoxi" slot="reference"></a>-->
                        <img :src="userInfo.userAvatar" class="header-usericon" slot="reference"/>

                        <p>姓 名：<span >{{userInfo.userName}}</span></p>
                        <p>机构名称：<span >{{userInfo.orgName}}</span></p>
                        <fox-button style="margin-top: 10px;background-color: #e4a542;color: #fff" @click="logout">退出</fox-button>
                    </fox-popover>

                    <div class="user-info">
                        <span class="span-top">{{userInfo.userName}} - {{userInfo.userCode}}</span>
                        <span class="span-bottom">{{userInfo.orgName}}</span>
                    </div>
                </div>
            </div>
        </div>
        <my-sidebar v-show="menuShow" class="my-menu"></my-sidebar>
    </div>
</template>

<script>
    import MySidebar from './my-sidebar'
import { clearTimeout, setTimeout } from 'timers';
import { connect } from 'tls';
import { constants } from 'zlib';

    export default {
        name: 'my-top',
        components: { MySidebar },
        // 属性
        props: {
            // 高度
            height: {
                type: String,
                required: false,
                default: '50px',
            },
        },
        data() {
            let date = new Date()
            let s = `${date.getFullYear()}年${date.getMonth()}月${date.getDay()}日`
            return {
                menuShow: false,
                datetime: s,
                userInfo: {
                    userName: fox.session.userInfo.user.userName,
                    userCode: fox.session.userInfo.user.userId,
                    userAvatar: fox.session.userInfo.user.userAvatar,
                    orgName: fox.session.userInfo.user.orgName,
                },
                isShow: false,
                show: true,
                changeWork: '绑定窗口',
                winId: '',
                leftPeople: '',
                //所有菜单
                allMenus: [],
                //查询值
                seatchText: '',
            }
        },
        methods: {
            lockScreen(){
                this.$prompt("","请输入密码以解锁",{
                    showClose:false,
                    showCancelButton:false,
                    closeOnClickModal:false,
                    closeOnPressEscape:false,
                    inputType:"password",
                    center:true,
                    confirmButtonText:"确定",
                    beforeClose:(action,instance,done)=>{
                        if(action=='confirm'){
                            if(!instance.inputValue){
                                this.$message({
                                    tyle:'warning',
                                    message:"密码不能为空！"
                                })
                            }else{
                                // TODO 这边可以调用借口来判断密码是否正确
                                if(instance.inputValue!=='111111'){
                                    this.$message.error("密码不正确！")
                                }else{
                                    this.$message("欢迎使用！")
                                     done();
                                }
                            }
                        }
                    }
                }).then(({value})=>{
                    
                })
            },
            getHelp(){
                fox.custom.openPage(this, "/trade/help", {
                    openType: "normal"
                });
            },
            logout() {
                let that = this
                // fox.layer.confirm('是否退出', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     callback: (action) => {
                //         if (action === 'confirm') {
                // 关闭当前页面
                that.$router.push('/')
                // }
                // },
                // })
            },
            //显示菜单
            showMenu() {
                this.menuShow = !this.menuShow
            },
            showUserInfo() {
                // this.style.width= '390px'
            },
            portBind() {
                let flag = localStorage.getItem('winId')

                if (flag) {
                    //  登录状态下
                    this.isShow = true
                    this.changeWork = '当前办理业务'
                    this.winId = flag
                } else {
                    // 未登录状态
                    this.isShow = false
                    this.changeWork = '绑定窗口'
                    this.winId = ''
                }

                let params = {
                    isShow: this.isShow,
                    show: this.show,
                    winId: this.winId,
                }
                fox.custom.appendPage(
                    this,
                    '/frame/components/portBind',
                    {
                        title: '▶ 软叫号',
                        width: '50%',
                    },
                    params,
                    this.$data,
                    {},
                    this.query,
                )
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
            handleSelect(item){
                console.log(item)
                if(item && item.path){
                    fox.custom.openPage(this, item.path, {
                        openType: "normal"
                    });
                }
            },
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
        },
        // 计算
        computed: {
            // 计算
            mStyle() {
                return {
                    height: this.height,
                }
            },
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
                for(var i=0;i<list.lemgth;i++){
                if(list[i].hidden){
                    list.splice(i,1)
                }
            }
                return list
            }
        },
        // 加载后处理
        mounted() {
            this.$fox_on('global_event_menu_selected', msg => {
                this.menuShow = false
            })

            //获取所有菜单
            this.allMenus = this.$fox.sessionStorage.get('global_menus') || [];

            // let userInfo = this.$fox.sessionStorage.get('global_user')
            // this.userName = userInfo.name
            // this.userIcon = userInfo.head
            // this.userInfo = this.$fox.sessionInfo.getUserInfo();
            // console.log("aaaaaaaaa");
            // console.log(this.userInfo);
        },
    }
</script>

<style scoped>
    .my-top-header {
        width: 100%;
        position: relative;
        display: -webkit-flex;
        /* Safari */
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-start;
        background: #070707;
    }

    .my-top-header::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        content: "";
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        background-color: #c8c7cc;
        /* 避免被其他元素遮挡 */
        z-index: 100;
    }

    .my-top-header-logo {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        width: 122px;
        height: 36px;
        margin: 7px 10px 7px 10px;
    }

    .my-top-header-menu {
        /*margin-left: 10px;*/
        width: 60px;
        height: 95%;
        background: #070707;
        border-color: #070707;
        padding: 5px 5px;
        font-size: 35px;
        color: #fbfdff;
    }

    .header-searchText {
        float: left;
        margin: 2px 10px;
    }

    .header-right {
        display: -webkit-flex;
        /* Safari */
        display: flex;
        /*flex-flow: column nowrap;*/
        align-items: flex-start;
        justify-content: space-between;
        margin-right: 20px;
        height: 80%;
        width: 1000px;
        flex: 0 0 auto;
        box-sizing: border-box;
        /*background: #00d1b2;*/
        margin-left: auto;
    }

    .my-top-header-softcall {
        width: 400px;
        /*display: -webkit-flex;*/
        /*!* Safari *!*/
        display: flex;
        flex: 0 0 auto;
        flex-flow: row nowrap;
        /*align-items: flex-start;*/
        justify-content: center;
        /*float: left;*/
    }

    .header-right-bottom {
        color: #fbfdff;
        display: -webkit-flex;
        /*!* Safari *!*/
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: flex-end;
    }

    .tools {
        display: -webkit-flex;
        /*Safari*/
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: center;
    }

    .tools > a {
        margin: 0px 10px 0 10px;
    }

    .header-usericon {
        display: block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .split {
        width: 1px;
        height: 16px;
        background: #fff;
        margin: 0 10px 0 10px;
    }

    .user-info {
        margin-left: 1px;
        /* 避免横向滚动条 */
        max-width: calc(210px);
        /*display: -webkit-flex; !*Safari*!*/
        /*display: flex;*/
        flex-flow: row nowrap;
        /*align-items: flex-start;*/
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .span-top {
        margin-left: 10px;
        font-size: 14px;
        display: flex;
        display: -webkit-flex;
        align-items: flex-start;
    }

    .span-bottom {
        margin-left: 10px;
        font-size: 14px;
        display: flex;
        display: -webkit-flex;
        align-items: flex-end;
    }

    .my-menu {
        z-index: 1010;
        position: absolute;
        top: 50px;
        left: 0px;
        bottom: 0px;
        width: 240px;
        height: 100%;
        box-sizing: border-box;
    }
</style>
