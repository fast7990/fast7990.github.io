// 配置项 1: Cookies 字段名
let SSO_COOKIE_NAME = 'uni_st';
// 配置项 2: uni-commons-api 接口访问路径
let BASE_URL = '';
// 配置项 3：SSO 登录页面地址
let SSO_LOGIN_PAGE_URL = '';
// 配置项 4：SSO 登录回调地址
let SSO_LOGIN_SERVICE = '';
if (import.meta.env.MODE === 'production') {
    // 配置项 2: uni-commons-api 接口访问路径
    BASE_URL = 'http://10.16.98.85:8080';
    // 配置项 3：SSO 登录页面地址
    SSO_LOGIN_PAGE_URL = 'https://i.chinaamc.com/cas/login';
    // 配置项 4：SSO 登录回调地址
    SSO_LOGIN_SERVICE = '';
} else {
    // 配置项 2: uni-commons-api 接口访问路径
    BASE_URL = 'http://10.16.98.85:8080';
    // 配置项 3：SSO 登录页面地址
    // SSO_LOGIN_PAGE_URL = 'https://i.chinaamc.com/cas/login';
    SSO_LOGIN_PAGE_URL = 'http://localhost:8280/login.html';
    // 配置项 4：SSO 登录回调地址
    SSO_LOGIN_SERVICE = 'http://localhost:8280/admin/#/';
}
export {
    BASE_URL,
    SSO_LOGIN_PAGE_URL,
    SSO_LOGIN_SERVICE,
    SSO_COOKIE_NAME
}