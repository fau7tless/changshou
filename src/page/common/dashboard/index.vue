<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="my-wrap" :style="mStyle">
    <div class="my-left">
      <fox-group class="my-card my-card-user">
        <div class="my-user-wrap">
          <my-user-item :icon="icon" :name="name" :sex="sex" :company="company" :info="info"></my-user-item>
          <my-info-item :end-date="endDate" :last-login-time="lastLoginTime" :try-times="tryTimes" @action="onAction"></my-info-item>
        </div>
      </fox-group>
      <fox-group title="常用交易" class="my-card my-card-func">
        <template v-slot:tools>
            <div class="my-tools-wrap">
              <a class="iconfont icon-shezhi" @click="isShowDialog = true"></a>
            </div>
            <fox-dialog title="常用菜单配置" :visible.sync="isShowDialog" width="35%" top="25vh" center style="z-index:1000">
              <el-select v-model="list" multiple :multiple-limit="8" style="width:100%" filterable size="medium">
                <el-option 
                v-for="item in mAllTreeLeaf"
                :key="item.path"
                :label="item.text"
                :value="item">
                </el-option>
              </el-select>
              <span slot="footer" class="dialog-footer">
                <fox-button @click="isShowDialog = false">取 消</fox-button>
                <fox-button type="primary" @click="sureCommonMenu">确 定</fox-button>
              </span>
            </fox-dialog>
        </template>
        <template v-slot:default>
          <!-- style="justify-content: left;" :style="mFuncWrapStyle" -->
          <div class="my-func-wrap" :style="mFuncWrapStyle" >
            <template v-for="(item, index) in funcItemsA" >
              <my-func-item :key="`func-item-${index}`" :icon="item.icon" :title="item.title"
                :items="item.items" :limitCount="funcItemCount">
                </my-func-item>
            </template>
            <!-- <template v-for="(item, index) in funcItems">
                        <div class="cmnBtn" :key="`func-item-${index}`" @click="openTrade(item)" >
                          <div :class="item.icon" class="icon" :style="mItemColor(item.menuColor)"></div>
                          <span style="display: block">{{item.text}}</span>
                        </div>
            </template> -->
          </div>
        </template>
      </fox-group>

      <fox-group title="单点登录" class="my-card my-card-func">
        <template v-slot:default>
          <!-- <div class="my-card-sso-items" style="justify-content: left;">
            <template v-for="(item, index) in mHistoryRecords">
              <my-card-sso-item
                :key="`history-item-${index}`"
                :closable="isHistoryRecordEditable"
                :title="item.text"
                @close="handleCloseHistoryItem(index)"
                @click.native="openOutPage(item)"
              ></my-card-sso-item>
            </template>
          </div> -->
          <div class="my-func-wrap" :style="mFuncWrapStyle" style="justify-content: left;">
            <template v-for="(item, index) in mHistoryRecords">
                <div class="cmnBtn" style="width:70px" :title="item.text" :key="`func-item-${index}`" @click="openOutPage(item)" >
                  <div :class="SSOIcon(item.icon)" style="width:100%;text-align:center;font-size: 3rem"></div>
                  <span style="display: block">{{formatItemText(item.text)}}</span>
                </div>
            </template>
          </div>
        </template>
      </fox-group>
    </div>

    <div class="my-right">
      <template v-if="clientType == 'in'">
        <fox-group title="代办事项" class="my-card my-card-todo">
          <div class="my-todo-wrap">
            <div class="my-todo-item" @click="changeClientType('out')">
              <div class="my-todo-item-title">12</div>
              <div class="my-todo-item-text">待执行任务</div>
            </div>
            <div class="my-todo-item" @click="toWorkNotes">
              <div class="my-todo-item-title">26</div>
              <div class="my-todo-item-text">工作事项备忘</div>
            </div>
          </div>
        </fox-group>
        <!-- my-card-todo-rec -->
        <fox-group title="消息公告" class="my-card my-card-todo-rec" >
          <div class="my-todo-rec-wrap" :style="mTodoRecWrapStyle">
            <my-memorial-list :items="todoRecorders"></my-memorial-list>
          </div>
        </fox-group>
      </template>
      <template v-else>
        <fox-group title="代办事项" class="my-card my-card-todo-list">
          <div class="my-todo-list-wrap" :style="mTodoListWrapStyle" @click="changeClientType('in')">
            <my-todo-list :items="todoList"></my-todo-list>
          </div>
          <fox-empty-item></fox-empty-item>
        </fox-group>
      </template>
      <!-- my-card-func  -->
      <fox-group title="工作日历" class="my-card  my-card-calendar ">
        <my-calendar-item></my-calendar-item>
      </fox-group>
    </div>
  </div>
</template>

<script>
import {
    foxUI,
} from '@/assets/libs/fox-libs'
import { connect } from 'tls'
import { constants } from 'zlib'
import MyUserItem from './components/my-user-item'
import MyInfoItem from './components/my-info-item'
import MyCalendarItem from './components/my-calendar-item'
import MyMemorialList from './components/my-memorial-list'
import MyTodoList from './components/my-todo-list'
import MyCardSsoItem from './components/my-card-sso'
import MyFuncItem from './components/my-func-item.vue'
import { setTimeout } from 'timers'
  
export default {
    name: 'common_first',
    components: {
        MyTodoList,
        MyMemorialList,
        MyCalendarItem,
        MyInfoItem,
        MyUserItem,
        MyCardSsoItem,
        MyFuncItem,
    },
    // 数据
    data() {
        return {
            funcItemsA: [
                {
                    icon: 'static/img/first/1.png',
                    title: '参与者',
                    items: [
                        '参与者维护',
                        '参与者审核',
                    ],
                },
                {
                    icon: 'static/img/first/2.png',
                    title: '计费',
                    items: [
                        '费用审核',
                    ],
                },
                {
                    icon: 'static/img/first/3.png',
                    title: '证券簿记',
                    items: [
                        '承分销维护',
                        '承分销信息',
                    ],
                },
                {
                    icon: 'static/img/first/4.png',
                    title: '综合前置',
                    items: [
                        'CNAP2自由格式',
                        '资金种类维护查询',
                    ],
                },
                {
                    icon: 'static/img/first/5.png',
                    title: '资金账务',
                    items: [
                        '资金种类新增复查',
                        '资金种类维护查询',
                    ],
                },
                {
                    icon: 'static/img/first/2.png',
                    title: '抵押品管理',
                    items: [
                        '抵押品双方/三方交易',
                        '抵押品双方/三方交易',
                    ],
                },
                {
                    icon: 'static/img/first/3.png',
                    title: '基础数据',
                    items: [
                        '承分销维护',
                        '承分销信息',
                    ],
                },
                {
                    icon: 'static/img/first/1.png',
                    title: '风险管理',
                    items: [
                        '费用审核',
                    ],
                },
                {
                    icon: 'static/img/first/4.png',
                    title: '清算',
                    items: [
                        '承分销维护',
                        '承分销信息',
                    ],
                },
            ],
            // 客户端类型
            clientType: 'in',
            m_pageHeight: '',
            m_funcWrapHeight: '',
            m_todoListWrapHeight: '',
            m_todoRecWrapHeight: '',
            // resize listener
            resizeListener: () => {
                this.adjustPageSize()
            },
            icon: 'static/img/avatar.png',
            name: '王丹丹',
            sex: '02',
            company: 'XX银行',
            info: 'Hello World! Hello World!',
            endDate: '2021-06-01',
            lastLoginTime: '2020-06-18 12:00:00',
            tryTimes: '5',
            todoRecorders: [{
                text: '关于延长中2020年度2020第三期',
                date: '2020-07-24',
            },
            {
                text: '晋商银行银商银行股份20有限公司银行股份有限公司',
                date: '2020-07-24',
            },
            {
                text: '关于延长中2020年度2020第三期',
                date: '2020-07-25',
            },
            {
                text: '晋商银行银商银行股份20有限公司银行股份有限公司',
                date: '2020-07-25',
            },
            {
                text: '关于延长中2020年度2020第三期',
                date: '2020-07-25',
            },
            {
                text: '晋商银行银商银行股份20有限公司银行股份有限公司',
                date: '2020-07-26',
            },
            ],
            funcItemCount: 0,
            // todo列表
            todoList: [{
                text: '待复核任务',
                count: '12',
            },
            {
                text: '未确认交易',
                count: '12',
            },
            {
                text: '本日应履行全额结算指令',
                count: '312',
            },
            {
                text: '未缴费用',
                count: '112',
            },
            {
                text: '利息偿还通知',
                count: '42',
            },
            {
                text: '待复核任务',
                count: '12',
            },
            {
                text: '未确认交易',
                count: '12',
            },
            {
                text: '本日应履行全额结算指令',
                count: '312',
            },
            {
                text: '利息偿还通知',
                count: '42',
            },
            {
                text: '未缴费用',
                count: '112',
            },
            {
                text: '待复核任务',
                count: '12',
            },
            {
                text: '利息偿还通知',
                count: '12',
            },
            {
                text: '未确认交易',
                count: '312',
            },
            {
                text: '本日应履行全额结算指令',
                count: '112',
            },
            {
                text: '本日应履行全额结算指令',
                count: '112',
            },
            ],
            isHistoryRecordEditable: false,
            historyRecords: [
                {
                    text: 'HELP平台简介',
                    path: 'http://170.101.101.78/',
                    icon: 'el-icon-share',
                },
                {
                    text: '常熟农商银行科技下载站',
                    path: 'http://170.100.132.6/index.php',
                    icon: 'el-icon-download',
                },
                {
                    text: '百度',
                    path: 'http://www.baidu.com',
                    icon: 'el-icon-search',
                },
            ],
            // 常用菜单
            list: [], // 选中的菜单列表
            allMenus: [], // 所有叶子菜单
            isShowDialog: false,
        }
    },
    // 方法
    methods: {
        // 单点登录
        openOutPage(item) {
            if(window.closeAssignPage) {
                fox.custom.closePage(window.closeAssignPage)
            }
            let that = this
            setTimeout(() => {
                window.outPageUrl = ''
                window.outPageName = ''
                fox.custom.openPage(that, '/trade/core/easypage', {
                    openType: 'normal',
                })
                window.outPageUrl = item.path
                window.outPageName = item.text
            }, 100)
        },
        // 单点登录图标展示
        SSOIcon(icon) {
            if(!icon) {
                return 'el-icon-menu'
            }
            return icon
        },
        // 格式化item text
        formatItemText(text) {
            return foxUI.renderText(text, 5)
        },
        // 常用菜单管理
        menuConfig() {
            this.isShowDialog = true
        },
        // 提取叶子节点
        getLeafNode(nodes, texts, resList) {
            for (let node of nodes) {
                if (node.children) {
                    this.getLeafNode(node.children, [...texts, node.text], resList)
                } else {
                    let item = {}
                    item.text = item.value = node.text
                    item.path = node.name || node.path
                    item.icon = node.icon || 'el-icon-menu'
                    item.hidden = ((node.path == '/trade/core/easypage'))
                    item.index = node.index
                    item.firstLetters = pinyinUtil.getFirstLetter(node.text, true) || []
                    item.pingyin = pinyinUtil.getPinyin(node.text, '', false, false) || ''
                    // 转换为大写
                    item.pingyin = item.pingyin.toUpperCase()
                    item.texts = [...texts, item.text]
                    resList.push(item)
                    for(let i = 0; i < resList.length; i++) {
                        if(resList[i].hidden) {
                            resList.splice(i, 1)
                        }
                    }
                }
            }
        },
        // 确认常用菜单配置
        sureCommonMenu() {
            this.funcItems = this.list
            this.isShowDialog = false
        },
        // 调整高度
        adjustPageSize() {
            let height = foxUI.getClientHeight()
            this.m_pageHeight = height - 135 // header高度
            this.funcItemCount = 3
            // 代办事项备忘高度
            //  = frame内可用高度 -（待办事项高度 + 工作日历高度 + 4*卡片间距 + 2*卡片内部间距 + 标题高度及边距）
            // 常用功能高度
            // = frame内可用高度 -（用户提示卡片高度 + 历史记录高度 + 4*卡片间距 + 2*卡片内部间距 + 标题高度及边距）
            if (height <= 800) {
                this.m_todoRecWrapHeight = this.m_pageHeight - (126 + 256 + 4 * 8 + 2 * 12 + 19 + 14)
                this.m_funcWrapHeight = this.m_pageHeight - (126 + 230 + 4 * 8 + 2 * 12 + 19 + 14) // 227.2
            } else if (height <= 900) {
                this.m_todoRecWrapHeight = this.m_pageHeight - (156 + 296 + 4 * 8 + 2 * 12 + 19 + 14)
                this.m_funcWrapHeight = this.m_pageHeight - (156 + 240 + 4 * 8 + 2 * 12 + 14 + 19)
            } else {
                this.m_todoRecWrapHeight = this.m_pageHeight - (156 + 250 + 4 * 8 + 2 * 12 + 19 + 14)
                this.m_funcWrapHeight = this.m_pageHeight - (156 + 250 + 4 * 8 + 2 * 12 + 19 + 14)
            }
        },
        // 动作
        onAction(type) {
            console.info('type:' + type)
        },
        // 打开交易
        openTrade(item) {
            fox.custom.openPage(this, item.path, {
                openType: 'normal',
            })
        },
        changeClientType(type) {
            this.clientType = type
        },
        fetchNotification() {},
        toWorkNotes() {
            fox.custom.openPage(this, '/exchange/notification/list', {}, this.$data)
        },
  
        // 查询常用交易
        showCommonTrade() {
            let that = this
            // 发起登录服务请求
            fox.service
                .request({
                    app: backend.oca,
                    // contentType: 'application/x-www-form-urlencoded',
                    path: 'api/adminsmmenu/querymenu',
                    data: {
                        // username: this.formLogin.loginName,
                        // password: this.formLogin.password,
                    },
                })
                .then(
                    (response) => {
                        if (response.code === 0) {
                            let data
                            console.log(fox.type(response.data))
                            if (fox.type(response.data) === 'array') {
                                that.funcItems = that.verifyCommonItem(
                                    response.data.slice(0, 16),
                                )
                                // that.funcItems = response.data.slice(0,18);
                                // that.itemColor = response.data.menuColor !== '' ? response.data.menuColor: '#000';
                            }
                        } else {
                            fox.layer.message(`失败:${response.message}`)
                        }
                        // 关闭当前页面
                        // fox.custom.closePage(that);
                    },
                    (error) => {
                        that.$message.error('登录失败')
                    },
                )
        },
        verifyCommonItem(array) {
        // 给没有的加上初始图标和默认颜色
            let newArray = []
            for (let item of array) {
                let temp = item
                temp.menuIcon = item.menuIcon === '' ? 'el-icon-edit' : item.menuIcon
                temp.menuColor = item.menuColor !== undefined ? item.menuColor : '#000'
                newArray.push(temp)
            }
            return newArray
        },
        mItemColor(color) {
            return {
                color: color,
            }
        },
    },
    // 计算
    computed: {
        mStyle() {
            return {
                height: `${this.m_pageHeight}px`,
            }
        },
        mFuncWrapStyle() {
            return {
                height: `${this.m_funcWrapHeight}px`,
            }
        },
        mTodoRecWrapStyle() {
            return {
                height: `${this.m_todoRecWrapHeight}px`,
                'padding-top': '0px',
            }
        },
        mTodoListWrapStyle() {
            return {
                height: `${this.m_todoListWrapHeight}px`,
            }
        },
        mTodoListWrapStyle() {
            return {
                height: `${this.m_todoListWrapHeight}px`,
            }
        },
        // mFuncItems() {
        //     if (this.funcItems && this.funcItems.length > 0) {
        //         return this.funcItems.slice(0)
        //     }
        //     return []
        // },
        mHistoryRecords() {
            console.log(this.historyRecords)
            if (this.historyRecords && this.historyRecords.length > 0) {
                return this.historyRecords.slice(0)
            }
            return []
        },
        // 返回所有menus
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
        },
    },
    // 加载后处理
    mounted() {
        this.showCommonTrade()
  
        let doc = document.getElementById('test')
        // doc.style.width = '0px'
        this.adjustPageSize()
        // 加入resize listener
        foxUI.addEventHandler(window, 'resize', this.resizeListener)

        // 获取所有菜单
        this.allMenus = this.$fox.sessionStorage.get('global_menus') || []

        // 获取历史记录
        // this.historyRecordInit()
        // 注册历史记录变更事件
        // this.$fox_on('global_event_historyRecord_update', message => {
        //     this.historyRecordUpdate(message)
        // })
    },
    // 销毁前调用
    beforeDestroy() {
        // 移除window resize
        foxUI.removeEventHandler(window, 'resize', this.resizeListener)
    },
}
</script>

<style scoped>
  @media screen {
    /* 卡片间的间距控制 */
    .my-wrap {
      padding: 12px;
    }
    .my-right {
      /*flex: 0 0 calc(34.3% - 12px);*/
      max-width: calc(34.3% - 12px);
      /*max-width: calc(11.3% - 12px);*/
    }
    .my-card-func,
    .my-card-sso,
    .my-card-todo-rec,
    .my-card-calendar {
      margin-top: 12px;
    }
    /* 卡片内部间距控制 */
    .my-card {
      padding: 12px;
    }
    .fox-group-row.fox-group-header {
      margin-bottom: 21px;
    }
    /* user卡片 */
    .my-info-item-wrap {
      padding: 10px;
    }
    .my-card-user {
      height: 126px;
    }
    /* func卡片 */
    .my-func-wrap {
      padding: 2px 2px 2px 2px;
      overflow: scroll;
    }
    /* history卡片 */
    .my-card-sso {
      height: 250px;
    }
    /* sso卡片 */
    .my-card-sso-items {
      padding-top: 7px;
    }
    /* todo卡片 */
    .my-card-todo {
      height: 126px;
    }
    /* todoRec卡片 */
    .my-todo-rec-wrap {
      padding-top: 10px;
    }
    /* memorial卡片 */
    .my-memorial-list .my-list-line {
      margin-bottom: 8px;
    }
    /* calendar卡片 */
    .my-card-calendar {
      height: 250px;
       /* height:40%; */
    }
  }
  
  @media screen and (max-height: 900px) {
    .my-func-wrap {
      padding: 8px 36px 8px;
      overflow: scroll;
    }
    .my-card-func,
    .my-card-sso,
    .my-card-todo-rec,
    .my-card-calendar {
      margin-top: 12px;
    }
    /* 用户信息卡片*/
    .my-card-user {
      height: 126px;
    }
    /* todo卡片 */
    .my-card-todo {
      height: 126px;
    }
    /* calendar卡片 */
    .my-card-calendar {
      /* height: 200px; */
      height: 40%;
    }
    /* sso卡片 */
    .my-card-sso {
      height: 240px;
    }
  }
  
  @media screen and (max-height: 800px) {
    /* 卡片间的间距控制 */
    .my-wrap {
      padding: 8px;
    }
    .my-right {
      flex: 0 0 calc(34.3% - 8px);
      max-width: calc(34.3% - 8px);
    }
    .my-card-func,
    .my-card-sso,
    .my-card-todo-rec,
    .my-card-calendar {
      margin-top: 8px;
    }
    /* 卡片内部间距控制 */
    .my-card {
      padding: 12px;
    }
    .fox-group-row.fox-group-header {
      margin-bottom: 14px;
    }
    /* user卡片 */
    .my-info-item-wrap {
      padding: 9px;
    }
    .my-card-user {
      height: 126px;
    }
    /* func卡片 */
    .my-func-wrap {
      padding: 12px 36px 12px;
      overflow: scroll;
    }
    .my-card-sso-items {
      padding-top: 3px;
    }
    /* todo卡片 */
    .my-card-todo {
      height: 126px;
    }
    /* todoRec卡片 */
    .my-todo-rec-wrap {
      padding-top: 9px;
    }
    /* 单点登录卡片 */
    .my-card-sso {
      height: 200px;
    }
    /* calendar卡片 */
    .my-card-calendar {
      /* height: 200px; */
       height:38.8%;
    }
  }
  
  .cmnBtn {
    width: 90px;
    margin-right: 10px;
    /* margin-bottom: 10px; */
  }
  
  .cmnBtn .icon {
    display: block;
    width: 60px;
    height: 60px;
    padding-left: 15px;
    font-size: 60px;
  }
  
  .cmnBtn span {
    font-size: 14px;
    text-align: center;
  }
  
  .my-wrap {
    width: 100%;
    height: 100%;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: stretch;
    justify-content: space-between;
    box-sizing: border-box;
  }
  
  /* 1072w */
  
  .my-left {
    flex: 0 0 calc(100% - 34.3%);
    display: -webkit-flex;
    /* Safari */
    display: flex;
    width: 60%;
    flex-flow: column nowrap;
    align-items: stretch;
    justify-content: flex-start;
  }
  
  /* 536w */
  
  .my-right {
    flex: 0 0 calc(35%);
    display: -webkit-flex;
    /* Safari */
    display: flex;
    width:40%;
    flex-flow: column nowrap;
    align-items: stretch;
    justify-content: flex-start;
  }
  
  .my-card {
    border: none;
    background-color: #fff;
    color: #404d6a;
    border-radius: 8px;
    overflow: hidden;
    box-sizing: border-box;
  }
  
  .my-card-user {
    flex: 0 0 auto;
    position: relative;
  }
  
  .my-card-func {
    flex: 1 1 auto;
  }
  
  .my-card-sso {
    flex: 0 0 auto;
  }
  
  .my-card-todo {
    flex: 0 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
  
  .my-card-todo-list {
    flex: 0 1 auto;
    width: 100%;
    box-sizing: border-box;
  }
  
  .my-card-todo-rec {
    width: 100%;
    flex: 1 1 auto;
    box-sizing: border-box;
  }
  
  .my-card-calendar {
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
  }
  
  .my-func-wrap {
    width: 100%;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-between;
    overflow-y: scroll;
    box-sizing: border-box;
    align-content: space-between;
  }
  
  .my-user-wrap {
    width: 100%;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: space-between;
  }
  
  .my-card-sso-items {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    overflow-y: hidden;
  }
  
  .my-card-sso-item {
    background: #ebedf2;
    border-radius: 4px;
    height: 36px;
    opacity: 0.8;
    font-size: 14px;
    color: #505c76;
    letter-spacing: 0;
    box-sizing: border-box;
    padding: 8px 14px;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;
  }
  
  .my-card-sso-item:hover {
    background: #ebeff8;
    color: #667188;
    cursor: pointer;
  }
  
  .my-card-sso-item>.close-item {
    font-size: 16px;
    position: absolute;
    color: #8c94a6;
    right: -3px;
    top: -3px;
  }
  
  .my-card-sso-item>.close-item:hover {
    color: #505c76;
  }
  
  .my-tools-wrap {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
  }
  
  .my-tools-wrap>a {
    margin-left: 20px;
    cursor: pointer;
  }
  
  .my-todo-wrap {
    margin-top: -5px;
    margin-bottom: 20px;
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    width: 100%;
  }
  
  .my-todo-wrap .my-todo-item {
    flex: 0 0 auto;
  }
  
  .my-todo-wrap .my-todo-item-title {
    font-size: 38px;
    text-align: center;
    color: #404d6a;
  }
  
  .my-todo-wrap .my-todo-item-text {
    font-size: 14px;
    color: #8c94a6;
    text-align: center;
  }
  
  .my-todo-rec-wrap {
    display: -webkit-flex;
    /* Safari */
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    box-sizing: border-box;
    width: 100%;
    overflow-y: auto;
  }
  
  .my-todo-list-wrap {
    width: 100%;
    max-height: calc(100% - 39px);
    overflow-y: auto;
  }
  
  .my-card.my-card-todo-list.el-form.fox-group.el-form--label-right,
  .my-card.my-card-sso.el-form.fox-group.el-form--label-right,
  .my-card.my-card-todo-rec.el-form.fox-group.el-form--label-right,
  .my-card.my-card-calendar.el-form.fox-group.el-form--label-right {
    flex-flow: column wrap;
    justify-content: flex-start;
  }
  
  @media screen {
    .my-card.fox-group /deep/ .fox-group-row.fox-group-header {
      margin-bottom: 14px;
    }
  }
  
  @media screen and (max-height: 800px) {
    .my-card.my-card-sso.el-form.fox-group.el-form--label-right /deep/ .fox-group-row.fox-group-header {
      margin-bottom: 8px;
    }
  }
  
  .my-wrap.my-content-card /deep/ .fox-group-header-title {
    font-family: PingFangSC-Medium;
    color: #404d6a;
  }
</style>
