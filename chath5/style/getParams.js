const getUrlParam = (url, key) => {
  if (!key) {
    key = url;
    url = location.href;
  }
  let reg = new RegExp("(^|&|/?)" + key + "=([^&|#]*)(&|#|$)"),
    r_txt = url ? url : window.location.search,
    r = r_txt.substr(1).match(reg);
  return r ? decodeURIComponent(r[2]) : null;
};

const generateSecureRandomString = (length = 24) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (x) => chars[x % chars.length]).join("");
};
