import EditForm from "../page/template/edit-form/index.vue";
import FormAndTable from "../page/template/form-and-table/index.vue";
import FormAndTabs from "../page/template/form-and-tabs/index.vue";
import GroupingForm from "../page/template/grouping-form/index.vue";
import InfoForm from "../page/template/info-form/index.vue";
import StepAndForm from "../page/template/step-and-form/index.vue";
import SearchAndTable from "../page/template/search-and-table/index.vue";
import SearchAndMdtables from "../page/template/search-and-mdtables/index.vue";
import AddDataSource from "../page/template/search-and-mdtables/addDataSource/index.vue";
import ConfigDatabase from "../page/template/search-and-mdtables/configDatabase/index.vue";
import SearchTableEdit from "../page/template/search-table-edit/index.vue";
import TabsPage from "../page/template/tabs-page/index.vue";

// <import empty slot>

// 路由表
let routes = [
  {
    path: "/template/form-and-table",
    name: "02001",
    component: FormAndTable,
  },
  {
    path: "/template/form-and-tabs",
    name: "02002",
    component: FormAndTabs,
  },
  {
    path: "/template/tabs-page",
    name: "02003",
    component: TabsPage,
  },
  {
    path: "/template/grouping-form",
    name: "02004",
    component: GroupingForm,
  },
  {
    path: "/template/edit-form",
    name: "02005",
    component: EditForm,
  },
  {
    path: "/template/info-form",
    name: "02006",
    component: InfoForm,
  },
  {
    path: "/template/step-and-form",
    name: "02007",
    component: StepAndForm,
  },
  {
    path: "/template/search-and-table",
    name: "02008",
    component: SearchAndTable,
  },
  {
    path: "/template/search-and-mdtables",
    name: "02009",
    component: SearchAndMdtables,
  },
  {
    path: "/template/search-and-mdtables/addDataSource",
    name: "02011",
    component: AddDataSource,
  },
  {
    path: "/template/search-and-mdtables/configDatabase",
    name: "02012",
    component: ConfigDatabase,
  },
  {
    path: "/template/search-table-edit",
    name: "02010",
    component: SearchTableEdit,
  },
  // <route empty slot>
];

// 导出路由
export default routes;
