import library from "../../page/term/metadata/library/index.vue";
import libraryInfo from "../../page/term/metadata/library/info/index.vue";
import dataLibrary from "../../page/term/metadata/dataLibrary/index.vue";
import dataLibraryInfo from "../../page/term/metadata/dataLibrary/info/index.vue";
import dataLibraryEditInfo from "../../page/term/metadata/dataLibrary/edit/index.vue";
import database from "../../page/term/metadata/database/index.vue";
import databaseEditInfo from "../../page/term/metadata/database/edit/index.vue";
import serviceDefine from "../../page/term/metadata/serviceDefine/index.vue";
import serviceDefineInfo from "../../page/term/metadata/serviceDefine/info/index.vue";
import serviceAuth from "../../page/term/metadata/serviceAuth/index.vue";
import serviceInterface from "../../page/term/metadata/serviceInterface/index.vue";
import serviceInterfaceInfo from "../../page/term/metadata/serviceInterface/info/index.vue";
import serviceInterDefine from "../../page/term/metadata/serviceInterDefine/index.vue";
import serviceInterDefineEdit from "../../page/term/metadata/serviceInterDefine/edit/index.vue";
import serviceInterDefineInfo from "../../page/term/metadata/serviceInterDefine/dialogadd/index.vue";
// <import empty slot>
// 路由表
let routes = [
    {
        path: "/term/metadata/library",
        name: "standLibrary",
        component: library,
    },
    {
        path: "/term/metadata/library/info",
        name: "standLibraryInfo",
        component: libraryInfo,
    },
    {
        path: "/term/metadata/dataLibrary",
        name: "dataLibrary",
        component: dataLibrary,
    },
    {
        path: "/term/metadata/dataLibrary/info",
        name: "dataLibraryInfo",
        component: dataLibraryInfo,
    },
    {
        path: "/term/metadata/dataLibrary/edit",
        name: "dataLibraryEditInfo",
        component: dataLibraryEditInfo,
    },
    {
        path: "/term/metadata/database",
        name: "dataLibrary",
        component: database,
    },
    {
        path: "/term/metadata/database/edit",
        name: "dataLibraryEditInfo",
        component: databaseEditInfo,
    },
    {
        path: "/term/metadata/serviceDefine",
        name: "serviceDefine",
        component: serviceDefine,
    },
    {
        path: "/term/metadata/serviceDefine/info",
        name: "serviceDefineInfo",
        component: serviceDefineInfo,
    },
    {
        path: "/term/metadata/serviceAuth",
        name: "serviceAuth",
        component: serviceAuth,
    },
    {
        path: "/term/metadata/serviceInterface",
        name: "serviceInterface",
        component: serviceInterface,
    },
    {
        path: "/term/metadata/serviceInterface/info",
        name: "serviceInterfaceInfo",
        component: serviceInterfaceInfo,
    },
    {
        path: "/term/metadata/serviceInterDefine",
        name: "serviceInterDefine",
        component: serviceInterDefine,
    },
    {
        path: "/term/metadata/serviceInterDefine/edit",
        name: "serviceInterDefineEdit",
        component: serviceInterDefineEdit,
    },
    {
        path: "/term/metadata/serviceInterDefine/add",
        name: "serviceInterDefineInfo",
        component: serviceInterDefineInfo,
    },
    // <route empty slot>
];
// 导出路由表
export default routes;
