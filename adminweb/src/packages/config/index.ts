import logo from "@/packages/assets/logo-min.png"
import maxLogo from "@/packages/assets/logo.png"
import { SSO_LOGIN_PAGE_URL } from "@/packages/config/set"
export default {
    whiteList: ["/login"],
    resetPath: SSO_LOGIN_PAGE_URL,
    httpCode: [1],
    menus: [],
    // 通过注入函数，让框架获取外部文件
    getViews: () => {
        return import.meta.glob("@/packages/view/**/*.vue", { eager: true })
    },
    website: {
        logo,
        maxLogo,
        title: "admin"
    },
    components: {
        headerUserSet: null
    },
    apis: {},
    events: {},
}
