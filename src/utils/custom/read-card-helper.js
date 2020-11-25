export function readCard(vm) {
    fox.custom.appendPage(
        vm,
        '/public-page',
        {
            // title: title,
            width: '50%',
        },
        {},
        vm.$data,
    )
}
