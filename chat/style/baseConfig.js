/*
 * @Author: fast7990 immengxingchen@qq.com
 * @Date: 2025-08-06 21:37:30
 * @LastEditors: fast7990 immengxingchen@qq.com
 * @LastEditTime: 2025-08-19 22:23:03
 * @FilePath: \chath5\style\baseConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const CONFIG = {
  baseURL: "http://115.190.143.202:6004",
};
const showNotification = (message, type) => {
  layer.open({
    skin: "msg",
    content: message,
    time: 2,
    offset: "auto",
  });
};

const getCid = () => {
  return localStorage.getItem("cid") || ""; 
};

const getUserId = () => {
  return getUrlParam("userid") || localStorage.getItem("userid") || "0";
};
