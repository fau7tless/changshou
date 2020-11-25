<template>
    <fox-router-view class="my-app fox-views fox-views-window" :view-tag="viewTag" view-class="my-view"
                     view-active-class="my-view-active" :multi="true"/>
</template>

<script>
    export default {
        //应用名
        name: 'App',
        //方法
        methods: {
            viewTag(index) {
                if (index == 0) {
                    return 'div'
                } else {
                    return 'fox-dialog-item'
                }
            },
        },
    }
</script>

<style>
    .my-app {
        width: 100%;
        height: 100%;
    }

    .my-view {
        height: 100%;
    }

    .my-view-active {
    }
</style>