/*
 * 翻译聊天应用核心逻辑
 * 功能：提供文本/语音输入、AI对话交互、历史记录管理
 * 依赖：jQuery、Font Awesome、本地存储API
 */
$(document).ready(function () {
  // DOM元素引用 - 缓存常用DOM元素以提高性能
  const $conversation = $("#conversation-container"); // 对话内容容器
  const $input = $("#message-input"); // 文本输入框
  const $sendBtn = $("#send-btn"); // 发送按钮
  const $historyBtn = $("#history-btn"); // 历史记录按钮
  const $newConversationBtn = $("#new-conversation-btn"); // 新建对话按钮
  const $keyboardBtn = $("#keyboard-btn"); // 键盘/语音切换按钮
  const $textInputContainer = $("#text-input-container"); // 文本输入容器
  const $voiceInputContainer = $("#voice-input-container"); // 语音输入容器
  const $voiceInputBtn = $("#voice-input-btn"); // 语音输入按钮
  const $voiceInputBtnBox = $("#voiceInputBtnBox"); // 语音按钮容器
  const $waveformCanvas = $("#waveformCanvas"); // 波形图Canvas
  const $icon = $keyboardBtn.find("i"); // 模式切换图标
  const $toratingBtn = $("#torating-btn");

  const $audioRecorder = new AudioRecorder(); // 音频 recorder
  const $sceneRoleModal = $("#sceneRoleModal");
  const $sceneCreateBtn = $("#sceneCreateBtn");
  const audioContext = $("#audioPlayer")[0];

  // 应用状态管理
  let cid = "BAQSXClB1awvlaN02rYpYlKK"; // 对话ID
  let isVoiceMode = false; // 语音模式开关
  let condition = "";
  let avatar = "./style/img/68a1949b58cb8da5c82a6538.png";
  let robotimg = "./style/img/68a13fe558cb8da5c828b9f7.png";
  let isFirst = 0;
  initApp();
  /**
   * 应用初始化入口函数
   * 负责启动应用并初始化必要组件
   */
  function initApp() {
    initLocalStorage(); // 初始化本地存储
    bindEventListeners(); // 绑定所有事件监听器
    getSceneName();
    if (localStorage.getItem("isFirst")) {
      isFirst = 1;
    }
  }
  /**
   * 初始化本地存储
   * 恢复上次对话ID并加载对应历史记录
   */
  function initLocalStorage() {
    getHistoryFn();
    getSituationFn();
  }
  function getHistoryFn() {
    getHistory().then((res) => {
      console.log(res,"===asdasd");
      if (res.code == 0) {

        let historyList = JSON.parse(res.data.historyList) || [];
        let messages = historyList.map((item) => {
          return {
            ...item,
            id: item.id || generateSecureRandomString(),
            userMessage: item.question,
            aiReply: item.answer,
          };
        });
        console.log(cid,messages,'====aa');
        selectHistory(cid, messages);
      }
    });
  }

  function getSituationFn() {
    // 获取场景角色
    getSituation().then((res) => {
      console.log(res, "====");
      if (res && res.changList) {
        let resChangeList = JSON.parse(res.changList) || [];
        let userScene = $("#userScene");
        userScene.empty();
        resChangeList.forEach((item) => {
          let li = $("<li>").text(item.changjing);
          let closeBtn = $("<img>").addClass("close-btn");
          closeBtn.attr("src", "./style/img/close.png");
          li.append(closeBtn);
          userScene.append(li);
        });
        // 绑定删除场景事件
        $(".close-btn").on("click", function (e) {
          e.stopPropagation();
          let sceneName = $(this).parent().text().trim();
          deleteScene(sceneName);
        });
        getSceneName();
      }
      bindSceneSelect();
    });
  }
  function deleteScene(sceneName) {
    $.ajax({
      url: CONFIG.baseURL + "/deleteSituation",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        userId: getUserId(),
        changjing: sceneName,
      }),
      success: function (response) {
        console.log(response);
        if (response.code == 0) {
          showNotification("删除成功", "success");
          getSituationFn();
        } else {
          showNotification(response.msg, "error");
        }
      },
      error: function (xhr, status, error) {
        console.error("删除场景失败:", error);
        showNotification("删除场景失败", "error");
      },
    });
  }

  /**
   * 获取历史记录
   * @returns {string} 历史记录字符串
   */

  async function getHistory() {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: CONFIG.baseURL + "/history",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          userId: getUserId(),
          // Time: new Date().getTime(),
        }),
        params: {
          userId: getUserId(),
        },
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
  }
  /**
   * 绑定所有事件监听器
   * 统一管理应用中的所有用户交互事件
   */
  function bindEventListeners() {
    bindKeyboardModeToggle(); // 绑定键盘/语音模式切换事件
    bindVoiceInputEvents(); // 绑定语音输入事件
    bindConversationControls(); // 绑定对话控制事件
    bindMessageInput(); // 绑定消息输入事件
    bindHistoryNavigation(); // 绑定历史记录导航事件
    bindSendBtn(); // 绑定发送按钮事件
    bindSceneRoleModal(); // 绑定场景角色选择弹窗事件
    bindPlayBtn(); // 绑定播放按钮事件
    bindSceneCreateBtn();
    bindSceneSelect();
    bindToratingBtn();
    // 纠错优化
    bindCorrectionBtn();
  }

  function bindCorrectionBtn() {
    $("body").on("click", function (e) {
      console.log(e.target);
      let className = e.target.className;
      let id = $(e.target).attr("data-id");
      let context = $(
        "[data-user-id=" + id + "].user-message .message-content"
      ).text();
      console.log(context);
      if (className == "correction-btn") {
        $sceneRoleModal.modal("hide");
        correctTextFn(context, id).then((res) => {
          if (res.code == 0) {
            let html = `<div>
            <div class="org-text">${res.data.orgText}</div>
            <div class="cor-text">
              <p>修正：${res.data.correctText}</p>
              <p>解析：${res.data.description}</p>
            </div>
            </div>`;
            $sceneRoleModal.find(".modal-body").html(html);
            $sceneRoleModal.modal("show");
          }
        });
        return;
      } else if (className == "optimization-btn") {
        $sceneRoleModal.modal("hide");
        makeGoodFn(context, id).then((res) => {
          if (res.code == 0) {
            let html = `<div>
            <div class="org-text">
              优化结果：
              <p>${res.data.goodText}</p>
            </div>
            <div class="cor-text">
               说明 ：
              <p>${res.data.description}</p>
            </div>
            </div>`;
            $sceneRoleModal.find(".modal-body").html(html);
            $sceneRoleModal.modal("show");
          }
        });
      } else if (className == "fanyi-btn") {
        $sceneRoleModal.modal("hide");
        let cont = $(
          "[data-ai-id=" + id + "].ai-message .message-content"
        ).text();
        console.log(
          cont,
          "[data-ai-id=" + id + "].ai-message .message-content",
          "=====asd"
        );
        $sceneRoleModal.find(".modal-body").html(`<div>
            <div class="org-text">
              翻译结果：
            </div>
            <div class="cor-text">
              <p class="loading"></p>
            </div>
            </div>`);
        $sceneRoleModal.modal("show");
        translateFn(cont, id).then((res) => {
          if (res.code == 0) {
            let html = `<div>
            <div class="org-text">
              翻译结果：
            </div>
            <div class="cor-text">
              <p>${res.data.translatete}</p>
            </div>
            </div>`;
            $sceneRoleModal.find(".modal-body").html(html);
            $sceneRoleModal.modal("show");
          }
        });
      }
    });
  }

  // 纠错优化
  function makeGoodFn(context, id) {
    return new Promise((resolve, reject) => {
      let data = {
        userId: getUserId(),
        id: id,
      };
      if (context) {
        data.context = context;
      }
      $.ajax({
        url: CONFIG.baseURL + "/makeGood",
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
  }
  // 纠错优化
  function correctTextFn(context, id) {
    let data = {
      userId: getUserId(),
      id: id,
    };
    if (context) {
      data.context = context;
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        url: CONFIG.baseURL + "/correctText",
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
  }
  function translateFn(context, id) {
    let data = {
      userId: getUserId(),
      id: id,
    };
    if (context) {
      data.context = context;
    }

    return new Promise((resolve, reject) => {
      $.ajax({
        url: CONFIG.baseURL + "/translate",
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
  }
  // 绑定评分按钮事件
  function bindToratingBtn() {
    $toratingBtn.on("click", function () {
      window.location.href = "rating.html";
    });
  }

  function bindSceneSelect() {
    $(".scene-selector .scene-list li").on("click", function (e) {
      e.stopPropagation();
      // 若id为sceneCreateBtn退出
      if ($(this).attr("id") == "sceneCreateBtn") {
        return;
      }
      let sceneName = $(this).text().trim();
      setSceneName(sceneName);
    });
  }

  function setSceneName(sceneName) {
    condition = sceneName;
    console.log(sceneName, "===", $(".scene-selector .scene-list li"));

    localStorage.setItem("condition", sceneName);
    $(".scene-selector .scene-list li").removeClass("active");
    $(".scene-selector .scene-list li").each((index, item) => {
      if ($(item).text().trim() == sceneName) {
        $(item).addClass("active");
      }
    });
  }
  function getSceneName() {
    condition = localStorage.getItem("condition");
    if (!condition) {
      setSceneName("雅思");
    } else {
      setSceneName(condition);
    }
    return localStorage.getItem("condition") || "雅思";
  }
  // 绑定场景创建按钮事件
  function bindSceneCreateBtn() {
    $sceneCreateBtn.on("click", function (e) {
      window.location.href = "createScene.html";
    });
  }

  /**
   * 绑定播放按钮事件
   * 处理播放按钮点击逻辑
   */
  function bindPlayBtn() {
    $conversation.on("click", ".play-btn", function () {
      const id = $(this).data("id");
      const type = $(this).data("type");
      if (type == "user") {
        playAudio(id, "user");
      } else {
        playAudio(id, "ai");
      }
    });
  }
  /**
   * 播放音频
   * @param {string} id - 音频ID
   * @param {string} type - 音频类型（user/ai）
   */
  async function playAudio(id, type) {
    let messages = getMessages();
    let message = messages.find((item) => item.id == id);
    // 检查音频URL是否存在
    if (!message || !message.quVoiceurl && !message.anVoiceurl) {
      showNotification("播放失败，请稍后重试", "error");
      console.error("音频URL不存在");
      return;
    }
    // 检查音频上下文是否已初始化
    if (!audioContext) {
      console.error("音频上下文未初始化");
      return;
    }
    // 停止当前播放
    audioContext.pause();
    let url = "";
    if (type == "user") {
      url = message.quVoiceurl;
    } else {
      url = message.anVoiceurl;
    }
    try {
      audioContext.src = url;
      audioContext.load();
      audioContext
        .play()
        .then(() => {
          console.log("音频播放成功",url);
        })
        .catch((err) => {
          console.error("音频播放失败:", err);
        });
    } catch (err) {
      console.error(`Unable to fetch the audio file. Error: ${err.message}`);
    }
  }

  // 场景角色选择弹窗事件绑定
  function bindSceneRoleModal() {
    $sceneRoleModal.on("show.bs.modal", function () {
      // 弹窗显示时的逻辑
    });
  }
  //   绑定发送按钮事件
  function bindSendBtn() {
    $sendBtn.on("click", function () {
      console.log("发送按钮点击事件");
      sendMessage();
    });
  }
  /**
   * 绑定键盘/语音模式切换事件
   * 处理输入模式切换逻辑
   */
  function bindKeyboardModeToggle() {
    $keyboardBtn.on("click", function () {
      isVoiceMode = !isVoiceMode;
      if (isVoiceMode) {
        switchToVoiceMode(); // 切换到语音模式
      } else {
        switchToTextMode(); // 切换到文本模式
      }
    });
  }

  /**
   * 切换到语音模式
   * 更新UI并初始化音频 recorder
   */
  function switchToVoiceMode() {
    $icon.removeClass("keyboard").addClass("microphone");
    $textInputContainer.hide();
    $voiceInputContainer.show();
    $audioRecorder.startAudioRecorderInit(); // 初始化音频 recorder
    console.log($icon);
  }

  /**
   * 切换到文本模式
   * 更新UI并停止音频 recorder
   */
  function switchToTextMode() {
    $icon.removeClass("microphone").addClass("keyboard");
    $voiceInputContainer.hide();
    $textInputContainer.show();
    $audioRecorder.endAudioRecorder(); // 停止音频 recorder
  }

  // 语音输入事件绑定
  function bindVoiceInputEvents() {
    $voiceInputBtn
      .touchInit()
      .on("touch_start", handleTouchStart)
      .on("touch_end", handleTouchEnd)
      .on("touch_move", handleTouchMove);
  }
  // 清除对话
  function clearConversation() {
    $conversation.empty();
  }

  // 新建对话控制事件绑定
  function bindConversationControls() {
    $newConversationBtn.on("click", () => {
      // if ($sceneRoleModal.modal("show")) {
      //   $sceneRoleModal.modal("hide");
      // }
      // 列表为空不创建
      if (getMessages().length === 0) {
        return;
      }
      clearConversation();
      setCid(getCid());
      setMessages([]);
    });
  }

  // 消息输入事件绑定
  function bindMessageInput() {
    $input.on("keydown", function (e) {
      if (
        (e.ctrlKey && e.key === "Enter") ||
        (!e.ctrlKey && e.key === "Enter")
      ) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
  // 历史记录侧边栏显示
  function showHistorySidebar() {
    $(".sidebar-overlay").show();
    $(".history-sidebar").addClass("open");
    loadHistory();
  }

  function hideHistorySidebar() {
    $(".sidebar-overlay").hide();
    $(".history-sidebar").removeClass("open");
  }

  // 历史记录导航事件绑定
  function bindHistoryNavigation() {
    $historyBtn.on("click", showHistorySidebar);
    $(".sidebar-overlay, .close-sidebar").on("click", hideHistorySidebar);
  }

  // 触摸开始处理
  function handleTouchStart(event) {
    console.log("touch_start");
    $waveformCanvas.show();
    $voiceInputBtnBox.hide();
    $audioRecorder.startAudioRecorder();
  }

  // 触摸结束处理
  async function handleTouchEnd(event) {
    console.log("touch_end");
    await $audioRecorder.stopAudioRecorder();
    // 获取语音信息
    // const voiceInfo = $audioRecorder.getRealTimeResult();
    // console.log(voiceInfo);
    console.log($audioRecorder.recorder);
    const audioUrl = $audioRecorder.recorder.getWAVBlob();
    const mp3Blob = await $audioRecorder.wavToMp3(audioUrl);
    // mp3 file
    const filename = new Date().toLocaleString() + ".mp3";
    const mp3File = mp3Blob
      ? new File([mp3Blob], filename, { type: "audio/mp3" })
      : null;
    // 发送消息
    sendMessage(mp3File);
    console.log(mp3File);
    $waveformCanvas.hide();
    $voiceInputBtnBox.show();
  }

  /**
   * 触摸移动处理
   * 处理语音录制过程中的触摸移动事件
   * @param {Object} event - 触摸事件对象
   */
  function handleTouchMove(event) {
    console.log("touch_move");
  }

  /**
   * 滚动到对话底部
   * 确保最新消息可见
   */
  function scrollToBottom() {
    $conversation.scrollTop($conversation[0].scrollHeight);
  }

  /**
   * 发送消息
   * 处理用户消息发送流程：验证输入、添加到DOM、清空输入框、触发AI回复
   * @param {File} file - 语音文件
   */
  function sendMessage(file) {
    let id = generateSecureRandomString();
    const message = $input.val().trim();
    if (!validateMessage(message, file)) return;
    // 发送消息
    addUserMessageToDOM(message, file, id);
    $input.val("");
    scrollToBottom();
    handleAIResponse(message, file, id);
  }

  /**
   * 验证消息
   * 检查消息是否为空或过长
   * @param {string} message - 用户输入的消息
   * @returns {boolean} 验证结果，true表示有效
   */
  function validateMessage(message, file) {
    console.log(message, file);
    if (!message && !file) {
      showNotification("请输入消息内容", "error");
      return false;
    }
    if (message && message.length > 500) {
      showNotification("消息长度不能超过500字符", "error");
      return false;
    }
    return true;
  }

  /**
   * 添加用户消息到DOM
   * 将用户消息安全地添加到对话容器
   * @param {string} message - 用户输入的消息
   */
  function addUserMessageToDOM(message, file, id) {
    if (file) {
      $conversation.append(
        `<div class="message-bubble user-message" data-user-id="${id}">
           <p class="play-btn" data-id="${id}" data-type="user">
            <img class="play-1" src="./style/img/68a1809958cb8da5c82a1fbd.png" alt="">
            <img class="play-2" src="./style/img/68a1809958cb8da5c82a1fbe.png" alt="">
           </p>
            <div class="avatar-box">
              <span></span>
              <img class="avatar" src="${avatar}" alt="">
            </div>
          </div>`
      );
    } else {
      $conversation.append(
        `<div class="message-bubble user-message" data-user-id="${id}">
            <p class="message-content">${escapeHtml(message)}</p>
            <div class="avatar-box">
              <span>
                <button class="correction-btn" data-id="${id}">
                <img src="./style/img/68a1939058cb8da5c82a64da.png" alt="">
                纠错</button>
              </span>
              <img class="avatar" src="${avatar}" alt="">
            </div>
          </div>`
      );
    }
  }
  function setIsFirst() {
    isFirst = 1;
    localStorage.setItem("isFirst", 1);
  }
  async function getAIReply(message, file, id) {
    // 这里应该是调用AI接口的代码
    // 为了示例，我们使用一个模拟的异步函数
    // userId	int	是	123	用户id
    // role	String	是	咖啡员	角色
    // condition	String	是	咖啡馆	场景
    // content	String 	Leibei kafei	对话内容
    // language	String	是	英文	语言
    // isFirst	Int	否	是不是第一次对话	0是1否
    let formData = new FormData();
    formData.append("userId", getUserId());
    formData.append("condition", getSceneName());
    formData.append("isFirst", isFirst);
    formData.append("id", id);
    if (message) {
      formData.append("content", message);
    } else {
      formData.append("file", file);
      formData.append("content", "");
    }
    setIsFirst();
    // formData类型参数
    try {
      return $.ajax({
        url: CONFIG.baseURL + "/robotchat",
        method: "POST",
        processData: false, // 必须禁用jQuery的自动处理数据
        contentType: false, // 必须禁用jQuery的默认内容类型
        data: formData,
      });
    } catch (error) {
      console.error("调用AI接口失败:", error);
      throw error;
    }
  }

  /**
   * 处理AI回复
   * 生成AI回复并模拟打字效果展示
   * @param {string} message - 用户原始消息
   * @param {File} file - 语音文件
   */
  async function handleAIResponse(message, file, _id) {
    let id = _id ? _id : generateSecureRandomString();
    $voiceInputBtn.addClass("disabled");
    $sendBtn.prop("disabled", true);
    try {
      const res = await getAIReply(message, file, id);
      $sendBtn.prop("disabled", false);
      $voiceInputBtn.removeClass("disabled");
      if (res.code != 0) {
        showNotification(res.msg, "error");
        return;
      }
      let aiReply = res.data || {};
      console.log(aiReply, "====");
      const $loading = $(
        `<div class="message-bubble ai-message loading">正在思考...</div>`
      );
      $conversation.append($loading);
      // 创建空的AI消息元素并替换加载状态
      const $aiMessage = $(
        `<div class="message-bubble ai-message" data-ai-id="${id}"></div>`
      );
      $loading.replaceWith($aiMessage);
      simulateTypingEffect($aiMessage, aiReply, message, id);
    } catch (error) {
      $sendBtn.prop("disabled", false);
      $voiceInputBtn.removeClass("disabled");
      showNotification(error, "error");
    }
  }

  /**
   * 保存消息到历史记录
   * 将对话消息存储到本地存储
   * @param {string} originalMessage - 用户原始消息
   * @param {string} aiReply - AI回复消息
   */
  function saveMessageToHistory(originalMessage, text, aiReply, id) {
    const message = {
      id: id ? id : generateSecureRandomString(),
      time: new Date().toLocaleString(),
      title: originalMessage,
      userMessage: originalMessage,
      aiReply: text,
      anVoiceurl: aiReply.answerVoice,
      quVoiceurl: aiReply.orgVoiceUrl || "",
    };
    let messages = getMessages();
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    if (getCid()) {
      setHistory(getCid(), messages);
    }
  }

  /**
   * 设置历史记录
   * 更新指定对话ID的历史记录
   * @param {string} cid - 对话ID
   * @param {Array} messages - 消息列表
   */
  function setHistory(cid, messages) {
    const history = JSON.parse(localStorage.getItem("chatHistory") || "{}");
    console.log(history, messages);
    if (history[cid]) {
      history[cid].messages = messages;
    } else {
      history[cid] = {
        time: new Date().toLocaleString(),
        title: new Date().toLocaleString(),
        messages: messages,
      };
    }
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }

  /**
   * 模拟打字效果
   * 为AI回复添加逐字显示动画
   * @param {jQuery} $element - 要显示文本的DOM元素
   * @param {string} aiReply - 要显示的文本内容对象
   * @param {string} originalMessage - 用户原始消息
   */
  function simulateTypingEffect($element, aiReply, originalMessage, id) {
    let index = 0;
    const typeSpeed = 50; // 打字速度(ms/字符)
    let text = aiReply.answerContent;
    // const typeInterval = setInterval(() => {
    //   if (index < text.length) {
    //     // 逐个字符添加到DOM
    //     $element.append(text.charAt(index));
    //     index++;
    //     scrollToBottom(); // 保持滚动到底部
    //   } else {
    //     clearInterval(typeInterval);
    //     $sendBtn.prop("disabled", false);
    //     saveMessageToHistory(originalMessage, text, aiReply);
    //   }
    // }, typeSpeed);
    $element.append(`
            <p class="play-btn" data-id="${id}" data-type="ai">
              <img class="play-1" src="./style/img/68a1809958cb8da5c82a1fbd.png" alt="">
              <img class="play-2" src="./style/img/68a1809958cb8da5c82a1fbe.png" alt="">
            </p>
            <p class="message-content">${escapeHtml(text)}</p>
            <div class="avatar-box">
              <img class="avatar" src="${robotimg}" alt="">
              <span>
                <button class="fanyi-btn" data-id="${id}">
                <img src="./style/img/68a1ae6158cb8da5c82ab78f.png" alt="">
                翻译</button>
              </span>
            </div>
          `);
    saveMessageToHistory(originalMessage, text, aiReply, id);
    scrollToBottom(); // 保持滚动到底部
    setTimeout(() => scrollToBottom(), 0);
  }

  /**
   * HTML转义函数
   * 防止XSS攻击，转义特殊字符
   * @param {string} unsafe - 原始文本
   * @returns {string} 转义后的安全文本
   */
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /**
   * 设置对话ID
   * 更新当前对话ID并保存到本地存储
   * @param {string} id - 新的对话ID
   */
  function setCid(id) {
    cid = id;
    localStorage.setItem("cid", id);
  }

  /**
   * 获取对话ID
   * 从本地存储获取当前对话ID
   * @returns {string} 当前对话ID
   */
  function getCid() {
    // return localStorage.getItem("cid");
    return cid;
  }

  /**
   * 设置消息列表
   * 更新当前消息列表并保存到本地存储
   * @param {Array} messages - 新的消息列表
   */
  function setMessages(messages) {
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  /**
   * 获取消息列表
   * 从本地存储获取当前消息列表
   * @returns {Array} 当前消息列表
   */
  function getMessages() {
    return JSON.parse(localStorage.getItem("messages") || "[]");
  }

  /**
   * 从本地存储加载历史记录
   * 填充历史记录侧边栏
   * @param {string} [cid] - 可选，指定要加载的对话ID
   */
  function loadHistory(cid) {
    const $historyList = $(".history-list");
    $historyList.empty();
    const history = JSON.parse(localStorage.getItem("chatHistory") || "{}");

    if (Object.keys(history).length === 0) {
      $historyList.html('<div class="empty-history">暂无历史记录</div>');
      return;
    }

    Object.keys(history).forEach((key) => {
      const item = history[key];
      const historyItem = `
              <div class="history-item" data-id="${key}">
                <div class="history-item-time">${item.time}</div>
                <div class="history-item-content">${escapeHtml(
                  item.title
                )}</div>
                <img class="close" style="display:none;" src="https://p3.ssl.qhimg.com/t110b9a930101066b52dc0e3fe4.png" data-id="${key}"></img>

              </div>
            `;
      $historyList.append(historyItem);
    });

    // 点击历史项加载对应对话
    $(".history-item").on("click", function () {
      const id = $(this).data("id");
      selectHistory(id);
    });
    // 点击删除按钮删除历史记录
    $(".close").on("click", function () {
      const id = $(this).data("id");
      deleteHistory(id);
    });
  }
  /**
   * 删除历史记录
   * 从本地存储删除指定ID的历史记录
   * @param {string} id - 要删除的对话ID
   */
  function deleteHistory(id) {
    const history = JSON.parse(localStorage.getItem("chatHistory") || "{}");
    delete history[id];
    localStorage.setItem("chatHistory", JSON.stringify(history));
    loadHistory();
  }
  /**
   * 选择历史对话
   * 加载指定ID的历史对话到当前视图
   * @param {string} id - 要加载的对话ID
   */
  function selectHistory(cid, messages) {
    const history = JSON.parse(localStorage.getItem("chatHistory") || "{}");
    const item = messages ? messages : history[cid].messages || [];
    setMessages(item);
    setCid(cid);
    if (item) {
      // 清空当前对话并加载历史对话
      $conversation.empty();
      item.forEach((item) => {
        let str = `<p class="play-btn" data-id="${item.id}" data-type="user">
              <img class="play-1" src="./style/img/68a1809958cb8da5c82a1fbd.png" alt="">
              <img class="play-2" src="./style/img/68a1809958cb8da5c82a1fbe.png" alt="">
            </p>`
        $conversation.append(
          `<div class="message-bubble user-message" data-user-id="${item.id}">
            ${item.question?'':str}
            <p class="message-content">${escapeHtml(item.userMessage)}</p>
            <div class="avatar-box">
              <span>
                <button class="correction-btn" data-id="${
                  item.id
                }"><img src="./style/img/68a1939058cb8da5c82a64da.png" alt="">纠错</button>
                <button class="optimization-btn" data-id="${
                  item.id
                }"><img src="./style/img/68a1939058cb8da5c82a64da.png" alt="">回答优化</button>
              </span>
              <img class="avatar" src="${avatar}" alt="">

            </div>
          </div>`
        );
        $conversation.append(
          `<div class="message-bubble ai-message" data-ai-id="${item.id}">
           <p class="play-btn" data-id="${item.id}" data-type="ai">
            <img class="play-1" src="./style/img/68a1809958cb8da5c82a1fbd.png" alt="">
            <img class="play-2" src="./style/img/68a1809958cb8da5c82a1fbe.png" alt="">
           </p>
            <p class="message-content">${escapeHtml(item.aiReply)}</p>
            <div class="avatar-box">
              <img class="avatar" src="${robotimg}" alt="">
              <span>
                <button class="fanyi-btn" data-id="${item.id}">
                <img src="./style/img/68a1ae6158cb8da5c82ab78f.png" alt="">
                翻译</button>
              </span>
            </div>
          </div>`
        );
      });
      scrollToBottom();
      // 关闭侧边栏
      $(".sidebar-overlay").hide();
      $(".history-sidebar").removeClass("open");
    }
  }
  // 辅助函数：转义HTML防止XSS
  function escapeHtml(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // 添加场景
  async function addSituation() {
    try {
      return $.ajax({
        url: CONFIG.baseURL + "/addSituation",
        method: "POST",
        data: {
          userId: getUserId(),
          changjing: $("#changjing").val(),
          role: $("#role").val(),
        },
      });
    } catch (error) {
      console.error("添加场景失败:", error);
      throw error;
    }
  }
  // 获取场景
  async function getSituation() {
    try {
      return $.ajax({
        url: CONFIG.baseURL + "/getSituation",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
          userId: getUserId(),
        }),
      });
    } catch (error) {
      console.error("获取场景失败:", error);
      throw error;
    }
  }
});
