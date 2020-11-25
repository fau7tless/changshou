<template>
    <!--page每个页面的root元素-->
    <fox-page>
        <!--page内容区域-->
        <fox-footer-bar align="right">
            <fox-button @click="submit">确认</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group column="3" readonly label-width="100px" disabled>
                <fox-text-item v-model="hm" span="2">户名</fox-text-item>
                <fox-empty-item></fox-empty-item>
                <fox-item label="账号">
                    <div class="my-inputs">
                        <fox-text-item v-model="zhh" readonly style="width:75%;"></fox-text-item>
                        <span>─</span>
                        <fox-text-item v-model="xh" readonly style="width:25%;"></fox-text-item>
                    </div>
                </fox-item>
                <fox-text-item v-model="khjg">开户机构</fox-text-item>
                <fox-text-item v-model="khrq">开户日期</fox-text-item>
                <fox-text-item v-model="zjlx" source="">证件类型</fox-text-item>
                <fox-text-item v-model="zjhm">证件号码</fox-text-item>                
                <fox-empty-item></fox-empty-item>
                <fox-text-item v-model="zhsx">账户属性</fox-text-item>
                <fox-text-item v-model="zhzt">账户状态</fox-text-item>
                <fox-text-item v-model="zldm" source="">种类代码</fox-text-item>
                <fox-text-item v-model="yjkh">印鉴卡号</fox-text-item>
                <fox-text-item v-model="zqfs" source="">支取方式</fox-text-item>
                <fox-text-item v-model="khjl">客户经理</fox-text-item>
                <fox-item label="现借">
                    <div class="my-inputs">
                        <fox-money-item readonly v-model="xjsum" decimal-length="0" unit="笔" style="width:25%;margin-bottom: 0px;"></fox-money-item>
                        <fox-money-item readonly v-model="xj" decimal-length="2" unit="元" style="width:75%;margin-bottom: 0px;"></fox-money-item>
                    </div>
                </fox-item>
                <fox-item label="现贷">
                    <div class="my-inputs">
                        <fox-money-item readonly v-model="xdsum" decimal-length="0" unit="笔" style="width:25%;margin-bottom: 0px;"></fox-money-item>
                        <fox-money-item readonly v-model="xd" decimal-length="2" unit="元" style="width:75%;margin-bottom: 0px;"></fox-money-item>
                    </div>
                </fox-item>
                <fox-empty-item></fox-empty-item>
                <fox-item label="转借">
                    <div class="my-inputs">
                        <fox-money-item readonly v-model="zjsum" decimal-length="0" unit="笔" style="width:25%;margin-bottom: 0px;"></fox-money-item>
                        <fox-money-item readonly v-model="zj" decimal-length="2" unit="元" style="width:75%;margin-bottom: 0px;"></fox-money-item>
                    </div>
                </fox-item>
                <fox-item label="转贷">
                    <div class="my-inputs">
                        <fox-money-item readonly v-model="zdsum" decimal-length="0" unit="笔" style="width:25%;"></fox-money-item>
                        <fox-money-item readonly v-model="zd" decimal-length="2" unit="元" style="width:75%;"></fox-money-item>
                    </div>
                </fox-item>
                <fox-empty-item></fox-empty-item>
                <fox-text-item v-model="bztx" span="2">备注提醒</fox-text-item>
                <fox-text-item v-model="zdgz" span="2">重点关注</fox-text-item>
            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
export default {
    name: 't080303',
    // 数据
    data: function () {
        return {
            hm: '测试一个特别长的名字福建省泉州市某科技有限公司',
            zhh: '6222253242297618',
            xh: '101',
            khjg: '福建省泉州市',
            zldm: 'CNY-人民币',
            zjlx: '0-身份证',
            zjhm: '210502********110X',
            zhsx: '对公',
            yjkh: '110000001',
            zhzt: '状态',
            zqfs: '0-凭印鉴',
            khrq: '2020-8-3',
            khjl: '',
            remark: '商品销售收入',
            xjsum: '',
            xj: '',
            xdsum: '',
            xd: '',
            zjsum: '',
            zj: '',
            zdsum: '',
            zd: '',
            bztx: '',
            zdgz: '',
        }
    },
    fox_flow() {
        return {
            mounted() {
                this.xjsum = '0'
                this.xj = '0.00'
                this.xdsum = '0'
                this.xd = '0.00'
                this.zjsum = '0'
                this.zj = '0.00'
                this.zdsum = '0'
                this.zd = '0.00'
                context.resolve()
            },
            onMessage(type, data) {
                if(type == 'close') {
                    fox.custom.closePage(this)
                }
            }, 
        }
    },
    // 方法
    methods: {
        submit() {
            fox.custom.closePage(this)
        },
        cancel() {
            fox.custom.closePage(this)
        },
        
    },
    // 加载后处理
    mounted () {
       
    },
}
</script>

<style scoped>
    .my-inputs{
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-flow: row nowrap;
        align-items:center;
        justify-content: flex-start;
    }
    .fox-group>.el-form-item{
        margin-bottom: 7px;
    }
</style>