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
  const $audioRecorder = new AudioRecorder(); // 音频 recorder
  const $sceneRoleModal = $('#sceneRoleModal');
  // 应用状态管理
  let cid = localStorage.getItem("cid"); // 对话ID
  let isVoiceMode = false; // 语音模式开关
  initApp();
  /**
   * 应用初始化入口函数
   * 负责启动应用并初始化必要组件
   */
  function initApp() {
    initLocalStorage(); // 初始化本地存储
    bindEventListeners(); // 绑定所有事件监听器
  }

  /**
   * 初始化本地存储
   * 恢复上次对话ID并加载对应历史记录
   */
  function initLocalStorage() {
    if (cid) {
      selectHistory(cid); // 加载指定对话ID的历史记录
    } else {
      setCid(generateSecureRandomString()); // 生成新对话ID
    }
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
  }
  // 场景角色选择弹窗事件绑定
  function bindSceneRoleModal() {
    $sceneRoleModal.on('show.bs.modal', function () {
      // 弹窗显示时的逻辑
    })
  }
  //   绑定发送按钮事件
  function bindSendBtn() {
    $sendBtn.on("click", function () {
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
    $icon.removeClass("fa-keyboard").addClass("fa-microphone");
    $textInputContainer.hide();
    $voiceInputContainer.show();
    $audioRecorder.startAudioRecorderInit(); // 初始化音频 recorder
  }

  /**
   * 切换到文本模式
   * 更新UI并停止音频 recorder
   */
  function switchToTextMode() {
    $icon.removeClass("fa-microphone").addClass("fa-keyboard");
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
      if ($sceneRoleModal.modal('show')) {
        $sceneRoleModal.modal('hide');
      }
      // 列表为空不创建
      if (getMessages().length === 0) {
        return;
      }
      clearConversation();
      setCid(generateSecureRandomString());
      setMessages([]);
      setHistory(getCid(), []);
      $sceneRoleModal.modal('show');
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
  function handleTouchEnd(event) {
    console.log("touch_end");
    $audioRecorder.stopAudioRecorder();
    // 获取语音信息
    const voiceInfo = $audioRecorder.getRealTimeResult();
    console.log(voiceInfo);
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
   */
  function sendMessage() {
    const message = $input.val().trim();
    if (!validateMessage(message)) return;

    addUserMessageToDOM(message);
    $input.val("");
    scrollToBottom();
    $sendBtn.prop("disabled", true);
    handleAIResponse(message);
  }

  /**
   * 验证消息
   * 检查消息是否为空或过长
   * @param {string} message - 用户输入的消息
   * @returns {boolean} 验证结果，true表示有效
   */
  function validateMessage(message) {
    if (!message) {
      showNotification("请输入消息内容", "error");
      return false;
    }
    if (message.length > 500) {
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
  function addUserMessageToDOM(message) {
    $conversation.append(
      `<div class="message-bubble user-message">${escapeHtml(message)}</div>`
    );
  }

  /**
   * 处理AI回复
   * 生成AI回复并模拟打字效果展示
   * @param {string} message - 用户原始消息
   */
  function handleAIResponse(message) {
    setTimeout(() => {
      const $loading = $(
        `<div class="message-bubble ai-message loading">正在思考...</div>`
      );
      $conversation.append($loading);

      const aiReply = `这是AI对"${escapeHtml(message)}"的回复。`;

      // 创建空的AI消息元素并替换加载状态
      const $aiMessage = $('<div class="message-bubble ai-message"></div>');
      $loading.replaceWith($aiMessage);

      simulateTypingEffect($aiMessage, aiReply, message);
    }, 100);
  }

  /**
   * 保存消息到历史记录
   * 将对话消息存储到本地存储
   * @param {string} originalMessage - 用户原始消息
   * @param {string} aiReply - AI回复消息
   */
  function saveMessageToHistory(originalMessage, aiReply) {
    const message = {
      id: generateSecureRandomString(),
      time: new Date().toLocaleString(),
      title: originalMessage,
      userMessage: originalMessage,
      aiReply: aiReply,
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
    console.log(history,messages);
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
   * @param {string} text - 要显示的文本内容
   * @param {string} originalMessage - 用户原始消息
   */
  function simulateTypingEffect($element, text, originalMessage) {
    let index = 0;
    const typeSpeed = 50; // 打字速度(ms/字符)

    const typeInterval = setInterval(() => {
      if (index < text.length) {
        // 逐个字符添加到DOM
        $element.append(text.charAt(index));
        index++;
        scrollToBottom(); // 保持滚动到底部
      } else {
        clearInterval(typeInterval);
        $sendBtn.prop("disabled", false);
        saveMessageToHistory(originalMessage, text);
      }
    }, typeSpeed);
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
    return localStorage.getItem("cid");
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
                <img class="close" src="https://p3.ssl.qhimg.com/t110b9a930101066b52dc0e3fe4.png" data-id="${key}"></img>
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
  function selectHistory(id) {
    const history = JSON.parse(localStorage.getItem("chatHistory") || "{}");
    const item = history[id] ? history[id].messages : [];
    setMessages(item);
    setCid(id);
    if (item) {
      // 清空当前对话并加载历史对话
      $conversation.empty();
      item.forEach((item) => {
        $conversation.append(
          `<div class="message-bubble user-message">${escapeHtml(
            item.userMessage
          )}</div>`
        );
        $conversation.append(
          `<div class="message-bubble ai-message">${escapeHtml(
            item.aiReply
          )}</div>`
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
});
