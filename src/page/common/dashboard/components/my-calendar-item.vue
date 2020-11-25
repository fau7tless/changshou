<template>
    <div ref="workCalendar" class="my-calendar-item">
        <fox-calendar v-model="date">
        </fox-calendar>
    </div>
</template>
<script>
export default {
    name: "my-calendar-item",
    data() {
        return {
            slotProps: {
                'yearLabel': '年',
                'month': '月',
                'event': ['prevMonth', 'nextMonth']
            },
            date: new Date()
        }
    },
    mounted() {
        let operateButtons = this.$refs.workCalendar.querySelectorAll('button.el-button.el-button--plain.el-button--mini')
        let calendarDate = this.$refs.workCalendar.querySelector('.el-calendar__title')
        let _this = this
        for (let button of operateButtons) {
            console.log()
            let iText = button
            switch (iText.innerText) {
                case '上个月':
                    iText.innerText = '<';
                    break;
                case '今天':
                    this.changeHeaderShowDate(calendarDate.innerText);
                    calendarDate.classList.add('el-calendar__hidden-title')
                    break;
                case '下个月':
                    iText.innerText = '>';
                    break;
            }
        }
    },
    watch: {
        date(val) {
            let dateText = (new Date(this.date)).format('yyyy 年 M 月')
            this.changeHeaderShowDate(dateText)
        }
    },
    methods: {
        changeHeaderShowDate(text) {
            let operateButtons = this.$refs.workCalendar.querySelectorAll('button.el-button.el-button--plain.el-button--mini')
            for (let button of operateButtons) {
                if ((button.innerText.indexOf('年') + 1) || (button.innerText.indexOf('今天') + 1)) {
                    button.innerText = text
                }
            }
        },
    }
};
</script>
<style scoped>
.my-calendar-item {
    width: 100%;
    height: auto;
}

.my-calendar-item .el-calendar-table .el-calendar-day {
    height: 30px;
    font-size: 14px;
}

.my-calendar-item .el-calendar__body {
    padding: 0;
}

.my-calendar-item .el-calendar-table thead th {
    padding: 0px 0;
    color: #667188;
    font-weight: 400;
}
</style>
<style>
@media screen {

    .el-backtop,
    .el-calendar-table td .el-calendar-day>span {
        width: 23px;
        height: 23px;
        line-height: 23px;
    }

    .my-calendar-item .el-calendar-table .el-calendar-day {
        height: 25px;
        line-height: 25px;
    }

    td.is-today {
        line-height: 25px;
    }

    table.el-calendar-table thead th {
        line-height: 25px;
    }

    .my-calendar-item .el-calendar__title.el-calendar__hidden-title {
        /*隐藏组件默认的标题*/
        display: none;
    }

    .my-calendar-item .el-button {
        background: transparent;
        border: 0px;
        color: #999999;
    }

    .my-calendar-item .el-button:nth-child(2) {
        color: #404D6A;
        font-size: 14px;
    }

    .my-calendar-item .el-calendar__header {
        padding: 2px 6px;
        border-bottom: none;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
}

@media screen and (max-height: 800px) {

    .el-backtop,
    .el-calendar-table td .el-calendar-day>span {
        width: 20px;
        height: 20px;
        line-height: 20px;
    }

    .my-calendar-item .el-calendar-table .el-calendar-day {
        height: 22px;
        line-height: 22px;
    }


    td.is-today {
        line-height: 22px;
    }

    table.el-calendar-table thead th {
        line-height: 22px;
    }

    .my-calendar-item .el-calendar__header {
        padding: 1px 10px;
    }

    .el-button--mini,
    .el-button--mini.is-round {
        padding: 4px 6px;
    }

    .my-calendar-item .el-calendar__body {
        margin-top: 3px;
    }
}

@media screen and (max-height: 900px) and (min-height: 800px){
    .el-backtop,
    .el-calendar-table td .el-calendar-day>span {
        width: 22px;
        height: 22px;
        line-height: 22px;
    }

    .my-calendar-item .el-calendar-table .el-calendar-day {
        height: 24px;
        line-height: 24px;
    }


    td.is-today {
        line-height: 24px;
    }

    table.el-calendar-table thead th {
        line-height: 24px;
    }

    .my-calendar-item .el-calendar__header {
        padding: 1px 10px;
    }

    .el-button--mini,
    .el-button--mini.is-round {
        padding: 4px 6px;
    }

    .my-calendar-item .el-calendar__body {
        margin-top: 4px;
    }
}

/*取消日历自带的间距*/
.my-calendar-item .el-calendar__header {
    border-bottom: none;
    /*display:none;*/
}

.my-calendar-item .el-calendar__body {
    padding: 0px;
}

.my-card.my-card-calendar.el-form.fox-group.el-form--label-right .fox-group-header {
    margin-bottom: 0px;
}

.el-backtop,
.el-calendar-table td.is-today {
    background-color: none;
}

.el-backtop,
.el-calendar-table td .el-calendar-day>span {
    display: inline-block;
    color: black;
    border-radius: 2px;
    box-sizing: border-box;
}

.el-calendar-table td.is-today>.el-calendar-day>span {
    color: #ffffff;
    background-color: #E4B976;
}

.el-calendar-table .el-calendar-day {
    padding: 0px 6px;
}

.el-calendar-table .el-calendar-day:hover {
    color: #E4B976;
    background: none;
}

.el-calendar-table td {
    border: none;
}

.el-calendar-table tr td:first-child {
    border: none;
}

.el-calendar-table th:first-child {
    border: none;
}

.el-calendar-table tr:nth-child(2n) {
    background: none;
}

.el-calendar-table tr:first-child td {
    border: none;
}

.my-calendar-item .el-calendar-table .el-calendar-day {
    text-align: center;
    font-size: 14px;
}

table.el-calendar-table thead th {
    font-size: 14px;
    padding: 0px;
    color: #C2C6CC;
}

.el-calendar-table td.is-selected {
    background: none;
}

.el-calendar-table td.is-selected>.el-calendar-day>span {
    color: #E4B976;
    border: 1px solid #E4B976;
    font-family: Helvetica-Bold;
}

.el-calendar-table td.is-selected.is-today>.el-calendar-day>span {
    color: #ffffff;
    background-color: #E4B976;
}
</style>