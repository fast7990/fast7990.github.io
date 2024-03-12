import {createApp, shallowRef} from "vue"
import App, { install,router } from "@/packages/install.vue"
import headerUserSet from "@/app/admin/components/headerUserSet.vue"
import {setupProdMockServer} from "__ROOT__/mock/mockProdServer.ts"

if (process.env.NODE_ENV === "production") {
    setupProdMockServer()
}

createApp(App).use(install, {
    menus: [
        // {
        //     "id": 9000,
        //     "title": "首页",
        //     "icon": "Home",
        //     "path": "/home",
        //     "pid": 0,
        //     "file": "/view/home/index.vue",
        // }
    ],
    getViews: () => {
        return import.meta.glob("@/app/admin/view/**/*.vue", {eager: true})
    },
    website: {},
    components: {
        headerUserSet: null
    },
    // apis:{
    //     "/login": "/auth/local",
    //     "/userInfo": "/user/userinfo",
    //     "/menus": "/menus/getAll"
    // },
    apiModeStrapi: true
}).use(router).mount("#app")