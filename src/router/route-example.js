import DateItem from '../page/example/date-item/index.vue'
import Group from '../page/example/group/index.vue'
import Lang from '../page/example/lang/index.vue'
import MoneyItem from '../page/example/money-item/index.vue'
import SelectItem from '../page/example/select-item/index.vue'
import TableItem from '../page/example/table-item/index.vue'
import EditTableItem from '../page/example/edit-table-item/index.vue'
import TextItem from '../page/example/text-item/index.vue'
import TimeItem from '../page/example/time-item/index.vue'
import RadioItem from '../page/example/radio-item/index.vue'
import CheckboxItem from '../page/example/checkbox-item/index.vue'
import SwitchItem from '../page/example/switch-item/index.vue'
import SliderItem from '../page/example/slider-item/index.vue'
import RateItem from '../page/example/rate-item/index.vue'
import CascaderItem from '../page/example/cascader-item/index.vue'
import Form from '../page/example/form/index.vue'
import ModelExtract from '../page/example/model-extract/index.vue'
import PageMain from '../page/example/page-main/index.vue'
import PageSub from '../page/example/page-sub/index.vue'
import Verify from '../page/example/verify/index.vue'
import AutocompleteItem from '../page/example/autocomplete-item/index.vue'
import CounterItem from '../page/example/counter-item/index.vue'
import Seal from '../page/example/seal-item/index.vue';
// <import empty slot>

// 路由表
let routes = [
    {
        path: '/example/date-item',
        name: 'example_date_item',
        component: DateItem,
    },
    {
        path: '/example/group',
        name: 'example_group',
        component: Group,
    },
    {
        path: '/example/money-item',
        name: 'example_money_item',
        component: MoneyItem,
    },
    {
        path: '/example/select-item',
        name: 'example_select_item',
        component: SelectItem,
    },
    {
        path: '/example/table-item',
        name: 'example_table_item',
        component: TableItem,
    },
    {
        path: '/example/edit-table-item',
        name: 'example_edit-table-item',
        component: EditTableItem,
    },
    {
        path: '/example/text-item',
        name: 'example_text_item',
        component: TextItem,
    },
    {
        // 印章模板维护
        path: '/example/seal-item',
        name: 'example_seal-item',
        component: Seal,
    },
    {
        path: '/example/time-item',
        name: 'example_time_item',
        component: TimeItem,
    },
    {
        path: '/example/radio-item',
        name: 'example_radio_item',
        component: RadioItem,
    },
    {
        path: '/example/checkbox-item',
        name: 'example_checkbox_item',
        component: CheckboxItem,
    },
    {
        path: '/example/lang',
        name: 'example/lang',
        component: Lang,
    },
    {
        path: '/example/model-extract',
        name: 'example/model-extract',
        component: ModelExtract,
    },
    {
        path: '/example/switch-item',
        name: 'example_switch_item',
        component: SwitchItem,
    },
    {
        path: '/example/slider-item',
        name: 'example_slider_item',
        component: SliderItem,
    },
    {
        path: '/example/rate-item',
        name: 'example_rate_item',
        component: RateItem,
    },
    {
        path: '/example/cascader-item',
        name: 'example_cascader_item',
        component: CascaderItem,
    },
    {
        path: '/example/form',
        name: 'example_form',
        component: Form,
    },
    {
        path: '/example/page-main',
        name: 'example_page-main',
        component: PageMain,
    },
    {
        path: '/example/page-sub',
        name: 'example_page-sub',
        component: PageSub,
    },
    {
        path: '/example/verify',
        name: 'example_verify',
        component: Verify,
    },
    {
        path: '/example/autocomplete-item',
        name: 'example_autocomplete_item',
        component: AutocompleteItem,
    },
    {
        path: '/example/counter-item',
        name: 'example_counter_item',
        component: CounterItem,
    },
    // <route empty slot>
]

// 加入路由表
export default routes
