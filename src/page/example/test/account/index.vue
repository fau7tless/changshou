<template>
    <fox-page>
        <fox-footer-bar align="right">
            <fox-button @click="submit">提交</fox-button>
            <fox-button @click="cancel">取消</fox-button>
        </fox-footer-bar>
        <fox-content>
            <fox-group class="input-block" column="1">
                <fox-text-item disabled v-if="isShow" v-model="dutyId">岗位编号</fox-text-item>
                <fox-text-item require v-model="dutyName">岗位名称</fox-text-item>
                <fox-select-item require v-model="authLevel" source="@f07012.json">授权级别</fox-select-item>
                <fox-text-item require v-model="dutyDescription" type='textarea' :rows="5">岗位描述</fox-text-item>
                <fox-select-item require v-model="isVoid" source="@f07013.json">是否允许对接</fox-select-item>
                <fox-item label="所在位置">
                    <fox-check-group>
                        <fox-checkbox v-model="sysName" label="省联社"></fox-checkbox>
                        <fox-checkbox v-model="sysName" label="农商行/村镇银行总行"></fox-checkbox>
                        <fox-checkbox v-model="sysName" label="营业网点"></fox-checkbox>
                    </fox-check-group>
                </fox-item>

            </fox-group>
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "accountInfo"
    }
</script>

<style scoped>

</style>
