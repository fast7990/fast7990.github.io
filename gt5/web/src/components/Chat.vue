<template>
  <div class="chat-container">
    <div class="chat-area">
      <BubbleList
        ref="bubbleListRef"
        :list="messages"
        :auto-scroll="false"
        :is-fog="{ bgColor: '#f5f5f5' }"
        typing
        is-markdown
        style="flex: 1; height: 100%"
      />
    </div>
    <div class="input-area">
      <EditorSender
        ref="senderRef"
        clearable
        v-model="senderValue"
        @submit="handleSubmit"
      >
        <template #prefix>
          <div
            style="
              display: flex;
              align-items: center;
              gap: 8px;
              flex-wrap: wrap;
            "
          >
            <el-button round plain color="#626aef">
              <el-icon><Paperclip /></el-icon>
            </el-button>

            <div
              class="think-btn"
              :class="{ isSelect }"
              @click="isSelect = !isSelect"
            >
              <el-icon><ElementPlus /></el-icon>
              <span>深度思考</span>
            </div>
          </div>
        </template>

        <!-- 自定义 底部插槽 -->
        <template #footer>
          <div class="toolbar">
            <el-select
              v-model="provider"
              placeholder="选择模型"
              class="provider-select"
              size="small"
            >
              <el-option label="Claude (Anthropic)" value="anthropic" />
              <el-option label="OpenAI" value="openai" />
              <el-option label="Echo" value="echo" />
              <el-option label="Kimi" value="kimi" />
            </el-select>
          </div>
        </template>
      </EditorSender>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick } from "vue";
import { BubbleList, EditorSender } from "vue-element-plus-x";
import { ElMessage } from "element-plus";
import { ElementPlus, Paperclip, Promotion } from "@element-plus/icons-vue";
import { generateUUID } from "../utils/common.js";
const messages = ref([]);

const bubbleListRef = ref(BubbleList);
const senderRef = ref(EditorSender);
const senderValue = ref("");
const provider = ref("kimi");
const isSelect = ref(false);

const getAvatar = (role) => {
  return role === "ai"
    ? "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    : "https://avatars.githubusercontent.com/u/76239030?v=4";
};
const messagesConfig = {
  isMarkdown: true,
  avatarSize: "36px", // 头像占位大小
  avatarGap: "12px", // 头像与气泡之间的距离
};
const scrollToBottom = () => {
  nextTick(() => {
    if (bubbleListRef.value && bubbleListRef.value.scrollToBottom) {
      bubbleListRef.value.scrollToBottom();
    }
  });
};

const handleSubmit = async (content) => {
  console.log(content.text);
  if (!content.text.trim()) return;

  const userMessage = {
    key: generateUUID(),
    role: "user",
    content: content.text,
    placement: "end",
    avatar: getAvatar("user"),
    ...messagesConfig,
  };
  messages.value.push(userMessage);
  scrollToBottom();

  const assistantMessage = {
    key: generateUUID(),
    role: "ai",
    content: ``,
    placement: "start",
    avatar: getAvatar("ai"),
    ...messagesConfig,
  };
  messages.value.push(assistantMessage);

  try {
    const response = await fetch("http://localhost:8787/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provider: provider.value, input: content.text }),
    });
    senderRef.value.clear();
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const dataStr = line.slice(6);
          if (dataStr === "[DONE]") continue;
          try {
            const data = JSON.parse(dataStr);
            if (data.error) {
              throw new Error(data.error);
            }
            if (data.text) {
              const lastMessage = messages.value[messages.value.length - 1];
              if (lastMessage && lastMessage.role === "ai") {
                lastMessage.content += data.text;
                scrollToBottom();
              }
            }
          } catch (e) {
            console.error("解析流式数据失败:", e);
          }
        }
      }
    }
  } catch (e) {
    ElMessage.error(String(e));
    const lastMessage = messages.value[messages.value.length - 1];
    if (lastMessage && lastMessage.role === "ai") {
      lastMessage.content = `Error: ${String(e)}`;
    }
  }
  scrollToBottom();
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
}

.chat-area {
  flex: 1;
  overflow: hidden;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.input-area {
  padding: 20px;
  background-color: white;
  border-top: 1px solid #ebeef5;
}

.toolbar {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
}
.provider-select {
  width: 220px;
}
.think-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid silver;
  border-radius: 15px;
  cursor: pointer;
  font-size: 12px;
}
.isSelect {
  color: #626aef;
  border: 1px solid #626aef !important;
  border-radius: 15px;
  padding: 3px 12px;
  font-weight: 700;
}
</style>
