<template>
    <div class="service_wrapper my-bottom">
        <button class="wait_submit">待提交
            <span class="sub_num">1</span>
        </button>
        <button class="wait_print">待打印
            <span class="print_num">4</span>
        </button>
        <button class="end_service">结束服务</button>
    </div>
</template>

<script>
    export default {
        name: 'UserBottom',
    }
</script>

<style scoped>
    .my-bottom{
        margin: 5px 15px 0px 5px;
        bottom: 40px;
        display: -webkit-flex;
        /* Safari */
        display: flex;
        /* flex-flow: row nowrap; */
        align-items: stretch;
        justify-content: space-between;
        box-sizing: border-box;
    }
    /*最后的服务按钮*/
    .service_wrapper {
        height: 40px;
    }

    .service_wrapper button {
        border: none;
        min-width: 110px;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
    }

    .wait_submit {
        background-color: #ff780d;
    }

    .wait_print {
        background-color: #229747;
    }

    .end_service {
        background-color: #f76256;
    }



</style>
