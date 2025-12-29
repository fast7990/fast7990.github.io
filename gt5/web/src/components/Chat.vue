<template>
  <div class="chat-container">
    <div class="chat-area">
      <BubbleList
        ref="bubbleListRef"
        :list="messages"
        :auto-scroll="false"
        style="flex: 1; height: 100%"
      />
    </div>
    <div class="input-area">
      <Sender ref="senderRef" v-model="senderValue" @submit="handleSubmit" />
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick } from "vue";
import { BubbleList, Sender } from "vue-element-plus-x";

const messages = ref([
  {
    content: "Hello, how can I help you?",
    placement: "start",
  },
]);

const bubbleListRef = ref(null);

const senderRef = ref(null);
const senderValue = ref("");

const scrollToBottom = () => {
  nextTick(() => {
    if (bubbleListRef.value && bubbleListRef.value.scrollToBottom) {
      bubbleListRef.value.scrollToBottom();
    }
  });
};

const handleSubmit = (content) => {
  if (!content.trim()) return;

  // Add user message
  messages.value.push({
    content: content,
    placement: "end",
  });
  scrollToBottom();

  // Simulate bot response with typing effect
  setTimeout(() => {
    messages.value.push({
      content: `I received your message: "${content}". This is a simulated response.`,
      placement: "start",
      typing: true, // Enable typing effect if supported
    });
    scrollToBottom();
  }, 1000);
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
  overflow: hidden; /* BubbleList handles scrolling usually */
  padding: 20px;
  /* Ensure BubbleList takes full height */
  display: flex;
  flex-direction: column;
}

.input-area {
  padding: 20px;
  background-color: white;
  border-top: 1px solid #ebeef5;
}
</style>
