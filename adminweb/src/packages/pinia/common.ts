import { defineStore } from "pinia"
import { ssoLogin, ssoUserCurrent } from "@/packages/api/app.ts"
import Cookies from 'js-cookie';
import appPinia from "@/packages/pinia/app.ts"
import locaStore from "@/packages/utils/locaStore.ts"
import {
    BASE_URL,
    SSO_LOGIN_PAGE_URL,
    SSO_LOGIN_SERVICE,
    SSO_COOKIE_NAME
} from "@/packages/config/set.ts"
console.log(BASE_URL)
const paths = ["sso"], id = "common"
const common = defineStore({
    id,
    persist: {
        storage: window.localStorage,
        paths,
    },
    state: () => {
        return {
            configOptions: null,
            sso: {
                initialized: false,
                user: null
            }
        }
    },
    actions: {
        setInitialized(status) {
            this.sso.initialized = status;
        },
        setUser(userInfoRes) {
            const appStore = appPinia()
            this.sso.user = userInfoRes;
            appStore.userInfo = userInfoRes
            this.sso.initialized = true;
        },
        async initUserInfo() {
            // 1. 判断是否已初始化
            // if (this.sso.initialized) {
            //     return;
            // } else {
            //     this.setInitialized(true)
            // }
            // 2. 用户身份已知，直接返回
            if (this.sso.user) {
                return true;
            }
            // 3. 访问链接带有 ticket 参数，说明是 SSO 登录页回调，调中台接口验 ticket、种 Cookies
            let queryParams = new URLSearchParams(window.location.hash.substring(2));
            let ticket = queryParams.get("ticket");
            console.log(ticket)
            let service = this.getLoginServiceUrl();
            if (ticket) {
                let res = await this.validateTicket({ service, ticket })
                if (res) {
                    Cookies.set(SSO_COOKIE_NAME, "sdsw");
                }
            }
            // 4. 有 Cookies 但不知道用户身份，调中台接口解析 Cookies
            let cookie = Cookies.get(SSO_COOKIE_NAME);
            if (cookie) {
                let res = await this.fetchUserInfo();
                console.log(res);
                return res;
            }
            this.setInitialized(false);
            // 5. 重定向到 SSO 登录页
            this.redirectToLogin();
        },
        async validateTicket({ service, ticket }) {
            // 登录
            const res = await ssoLogin({ service, ticket });
            if (res) {
                this.setInitialized(true);
                return res;
            }
            return false
        },
        async fetchUserInfo() {
            const res = await ssoUserCurrent({});
            if (res) {
                this.setUser(res.data)
                return res.data
            }
            return false
        },
        loginOut() {
            const app = appPinia()
            app.$reset()
            this.$reset()
            locaStore.clearAll()
            Cookies.remove(SSO_COOKIE_NAME)
            this.redirectToLogin()
        },
        getLoginServiceUrl() {
            let service = SSO_LOGIN_SERVICE;
            return service
        },
        redirectToLogin() {
            let loginPageUrl = SSO_LOGIN_PAGE_URL + '?service=' + encodeURIComponent(this.getLoginServiceUrl());
            window.location.href = loginPageUrl;
        }
    }
})
export default common;