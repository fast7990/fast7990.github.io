/*
 * @Author: fast7990 immengxingchen@qq.com
 * @Date: 2025-08-06 21:37:30
 * @LastEditors: fast7990 immengxingchen@qq.com
 * @LastEditTime: 2025-08-19 22:43:30
 * @FilePath: \chath5\style\rating.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(document).ready(function () {
  // 初始化评分组件
  initRating();
  $(".cid").text(getUserId());
  // 初始化二维码
  initQrcode();
  // 下载按钮点击事件
  $("#downloadBtn").click(function () {
    // 下载二维码图片
    downloadQrcode();
  });
});
function downloadQrcode() {
  // 将 $("#share-box")的dom转化为图片下载
  html2canvas($("#share-box")[0]).then(function (canvas) {
    // 转换为图片
    let imgData = canvas.toDataURL("image/png");
    // 创建一个a标签
    let a = document.createElement("a");
    a.href = imgData;
    a.download = "qrcode.png";
    // 模拟点击下载
    a.click();
  });
  addLog({
    userId: getUserId(),
    sendResult: "share",
  });
}

function initQrcode() {
  let qrcode = new QRCode("qrcode", {
    text: "http://127.0.0.1:5501/rating.html?id=" + getUserId(),
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  // 二维码居中
  $("#qrcode").css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
}
const initRating = async () => {
  // 获取数据
  const res = await getCheckPoint();
  if (res.code != 0) {
    showNotification(res.msg, "error");
    return;
  }
  // 渲染数据
  renderRating(res.data);
};
// 上报日志接口addLog
const addLog = async (data) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: CONFIG.baseURL + "/addLog",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        console.log(response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("获取消息失败:", error);
        reject(error);
      },
    });
  });
};
const getCheckPoint = async () => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: CONFIG.baseURL + "/checkAll",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        userId: getUserId(),
        Time: new Date().getTime(),
      }),
      success: function (response) {
        console.log(response);
        resolve(response);
      },
      error: function (xhr, status, error) {
        console.error("获取消息失败:", error);
        reject(error);
      },
    });
  });
};
const renderRating = (data) => {
  let condition = localStorage.getItem("condition");
  // 渲染数据
  let totalScore = data.allPoint; // 0-100分
  let maxStars = 5;
  let scorePerStar = 100 / maxStars; // 每个星代表20分
  
  $(".star-rating i.bi").each(function (index) {
    let starIndex = index + 1;
    let starThreshold = starIndex * scorePerStar;
    let previousStarThreshold = (starIndex - 1) * scorePerStar;
    console.log(totalScore, starThreshold, previousStarThreshold);
    // 重置所有类
    $(this)
      .removeClass("bi-star bi-star-half bi-star-fill active")
      .addClass("bi-star");
    
    if (totalScore >= starThreshold) {
      // 满星
      $(this)
        .removeClass("bi-star")
        .addClass("bi-star-fill active");
    } else if (totalScore >= previousStarThreshold + 10 && totalScore < starThreshold) {
      // 半星：当前星的前10-19分为半星
      $(this)
        .removeClass("bi-star")
        .addClass("bi-star-half active");
    }
    // 否则保持空星（默认的bi-star）
  });
  
  // allPoint Int 是 总分
  // vocaPoint int 是 0 词汇得分
  // gramPoint String 0 语法得分
  // logicPoint String 0 逻辑得分
  $(".score-display").text(data.allPoint);
  $(".nengli").text(data.description);
  $(".scene").text(condition);
  $(".times").text(data.time);
};
