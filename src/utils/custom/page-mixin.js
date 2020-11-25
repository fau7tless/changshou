// page 混入
export let PageMixin = {
    // 注入
    inject: {

    },
    // 数据
    data() {
        return{
            publicName: '', // debug
        }
    },
    // 方法
    methods: {
        // debug
        sayHello() {
            console.info(`hello world ${this.publicName}`)
        },
    },
    // 计算方法
    computed: {

    },
}