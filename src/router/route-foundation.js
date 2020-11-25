// 菜单管理
import authorCenter from '@/page/foundation/authority/authorCenter/authorCenter'
import MenuManager from '../page/foundation/authority/menumanager/index.vue'
//公告管理
import Notification from '../page/foundation/notification/index.vue'
import NotificationDetail from '../page/foundation/notification/detail/index.vue'
import NotificationOrgan from '../page/foundation/notification/organ/index.vue'
import NotificationList from '../page/foundation/notification/list/index.vue'
// 柜员管理
import TellerManager from '../page/admin/sm/user'
import TellerManagerEdit from '../page/admin/sm/user/doTelllerInfo'
import TellerManagerDuty from '../page/admin/sm/user/tellerPost'
import TellerManagerTransfer from '../page/admin/sm/user/tellerTransfer'
// 岗位管理
import postManage from '../page/admin/sm/duty'
import dutyManageDoduty from '../page/admin/sm/duty/doPost'
import postManagePostRoleMap from '../page/admin/sm/duty/postRoleMap'
// 角色管理
import RoleManager from '../page/admin/sm/role'
import roleManageDoRole from '../page/admin/sm/role/doRole'
import roleManageRolePostMap from '../page/admin/sm/role/rolePostMap'
import roleManageRoleGroupMap from '../page/admin/sm/role/roleGroupMap'
//模块管理
import FunmodManager from '../page/foundation/authority/funmodmanager/index.vue'
import FunmodManagerEdit from '../page/foundation/authority/funmodmanager/edit/index.vue'
//功能点管理
import FunctionManager from '../page/foundation/authority/functionmanager/index.vue'
import FunctionManagerEdit from '../page/foundation/authority/functionmanager/edit/index.vue'
//控制点管理
import ResContrManage from '../page/foundation/authority/rescontrmanager/index.vue'
//---------------------------------------------------单点登录---------------------------------------------
// 系统配置
import SystemConfig from '../page/foundation/sso/systemConfig/index.vue'
import SystemConfigConfig from '../page/foundation/sso/systemConfig/config/index.vue'
// 柜员绑定
import TellerBind from '../page/foundation/sso/tellerBind/index.vue'
import TellerBindBind from '../page/foundation/sso/tellerBind/bind/index.vue'
// 柜员绑定系统查询
import BindQuery from '../page/foundation/sso/bindQuery/index.vue'
// 日志查询
import SsoLoginLog from '../page/foundation/sso/ssoLoginLog/index.vue'
// 令牌系统柜员绑定
import SystemBind from '../page/foundation/sso/systemBind/index.vue'
import SystemBindBind from '../page/foundation/sso/systemBind/bind/index.vue'
// -----------------------------------------------统一规则管理-----------------------------------------
// 规则组件查询
import RuleComponentQuery from '../page/foundation/rules/rule-component-query/index.vue'
// 公共规则配置
import PulicRule from '../page/foundation/rules/public-rule/index.vue'
// 交易规则配置
import SceneSetting from '../page/foundation/rules/scene-setting/index.vue'

// 授权中心管理

// 路由表
let routes = [
    // 菜单管理
    {
        path: '/foundation/menumanager',
        name: '/menumanager',
        component: MenuManager,
    },
    // 公告管理
    {
        path: '/foundation/notification',
        name: 'notification',
        component: Notification,
    },
    {
        path: '/foundation/notification/detail',
        name: 'notificationDetial',
        component: NotificationDetail,
    },
    {
        path: '/exchange/notification/organ',
        name: 'notificationOrgan',
        component: NotificationOrgan,
    },
    {
        path: '/exchange/notification/list',
        name: 'notificationList',
        component: NotificationList,
    },
    // 柜员管理
    {
        path: '/admin/sm/user',
        name: '/tellermanager',
        component: TellerManager,
    },
    {
        path: '/admin/sm/user/doTelllerInfo',
        name: '/admin/sm/user/doTelllerInfo',
        component: TellerManagerEdit,
    },
    {
        path: '/admin/sm/user/tellerPost',
        name: '/admin/sm/user/tellerPost',
        component: TellerManagerDuty,
    },
    {
        path: '/admin/sm/user/tellerTransfer',
        name: '/admin/sm/user/tellerTransfer',
        component: TellerManagerTransfer,
    },
    // 岗位管理
    {
        path: '/admin/sm/duty',
        name: '/dutymanager',
        component: postManage,
    },
    {
        path: '/admin/sm/duty/doPost',
        name: '/dutymanager/edit',
        component: dutyManageDoduty,
    },
    // {
    //     path: '/foundation/teller/dutymanager/dutyrolemapping',
    //     name: '/dutymanager/dutyrolemap',
    //     component: DutyManagerRoleMappimg,
    // },
    // 角色管理
    {
        path: '/admin/sm/duty/postRoleMap',
        name: '/admin/sm/duty/postRoleMap',
        component: postManagePostRoleMap,
    },
    // 角色管理
    {
        path: '/admin/sm/role',
        name: '/rolemanager',
        component: RoleManager,
    },
    {
        path: '/admin/sm/role/doRole',
        name: '/admin/sm/role/doRole',
        component: roleManageDoRole,
    },
    {
        path: '/admin/sm/role/rolePostMap',
        name: '/admin/sm/role/rolePostMap',
        component: roleManageRolePostMap,
    },
    {
        path: '/admin/sm/role/roleGroupMap',
        name: '/admin/sm/role/roleGroupMap',
        component: roleManageRoleGroupMap,
    },
    // 模块管理
    {
        path: '/foundation/authority/funmodmanager',
        name: '/funmodmanager',
        component: FunmodManager,
    },
    {
        path: '/foundation/authority/funmodmanager/edit',
        name: '/funmodmanager/edit',
        component: FunmodManagerEdit,
    },
    // 功能管理
    {
        path: '/foundation/authority/functionmanager',
        name: '/functionmanager',
        component: FunctionManager,
    },
    {
        path: '/foundation/authority/functionmanager/edit',
        name: '/functionmanager/edit',
        component: FunctionManagerEdit,
    },
    // 控制点管理
    {
        path: '/foundation/authority/rescontrmanage',
        name: '/rescontrmanage',
        component: ResContrManage,
    },
    // <route empty slot>
    // --------------------------------------单点登录----------------------------
    // 系统配置
    {
        path: '/foundation/sso/systemConfig',
        name: '/systemConfig',
        component: SystemConfig,
    },
    {
        path: '/foundation/sso/systemConfig/config',
        name: '/systemConfig/config',
        component: SystemConfigConfig,
    },
    //   柜员绑定
    {
        path: '/foundation/sso/tellerBind',
        name: '/tellerBind',
        component: TellerBind,
    },
    {
        path: '/foundation/sso/tellerBind/bind',
        name: '/tellerBind/bind',
        component: TellerBindBind,
    },
    // 柜员绑定系统查询
    {
        path: '/foundation/sso/bindQuery',
        name: '/bindQuery',
        component: BindQuery,
    },
    //   日志查询
    {
        path: '/foundation/sso/ssoLoginLog',
        name: '/ssoLoginLOg',
        component: SsoLoginLog,
    },
    // 令牌系统柜员绑定
    {
        path: '/foundation/sso/systemBind',
        name: '/systemBind',
        component: SystemBind,
    },
    {
        path: '/foundation/sso/systemBind/bind',
        name: '/systemBind/bind',
        component: SystemBindBind,
    },
    // -------------------------------------------统一规则管理---------------
    {
        path: '/foundation/rules/rule-component-query',
        name: '03001',
        component: RuleComponentQuery,
    },
    {
        path: '/foundation/rules/public-rule',
        name: '03002',
        component: PulicRule,
    },

    {
        path: '/foundation/rules/scene-setting',
        name: '03004',
        component: SceneSetting,
    },
    {
        path: '/foundation/authority/authorCenter',
        name: 'authorCenter',
        component: authorCenter,
    },
]

// 加入路由表
export default routes
