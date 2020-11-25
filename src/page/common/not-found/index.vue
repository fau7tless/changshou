<template>
    <fox-page>
        <fox-content class="img-center">
            <img src="../../../assets/img/not-found.png">
        </fox-content>
    </fox-page>
</template>

<script>
    export default {
        name: "notFound",
    }
</script>

<style scoped>

.img-center{
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-flow: row nowrap;
    align-items: center;;
    justify-content: center;
}
</style>