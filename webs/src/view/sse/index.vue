<template>
  <div>
    <n-button @click="open">打开</n-button>
    <n-button @click="close">关闭</n-button>
    <p>{{ handlerData.textvalue }}</p>
    <input type="file">上传</input>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from "vue";

const handlerData = reactive<{ eventSource: EventSource | any; textvalue: string }>({
  textvalue: "",
  eventSource: null,
});
const open = () => {
  handlerData.eventSource = new EventSource("http://localhost:3000/stream");
  handlerData.eventSource.onmessage = function (e) {
    console.log(e.data);
    let message = JSON.parse(e.data).message;
    if (message) {
      handlerData.textvalue += `${message}`;
    }
  };
  handlerData.eventSource.onopen = () => {
    handlerData.textvalue += `SSE连接成功，准备接收数据...`;
  };
  handlerData.eventSource.onerror = function (e) {
    console.log("error:", e.data);
    handlerData.eventSource.close();
    console.log("close");
  };
};
const close = () => {
  handlerData.eventSource.close();
  handlerData.textvalue += `已经关闭连接`;
};
</script>
