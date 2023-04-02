<script setup lang="ts">
import MessageBubble from "~/components/MessageBubble.vue";
import { ID } from "~/types/id";

const route = useRoute();

const newMessage = ref<string>();
const messageEndRef = ref<HTMLElement | Element>();
const { messages, getMessagesByChannelId } = useChannel();

watch(
  () => route.params?.id,
  (newID) => {
    getMessagesByChannelId(newID as ID);
  },
  {
    flush: "pre",
    immediate: true,
  }
);

watch(
  messages,
  () => {
    messageEndRef.value?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  },
  {
    immediate: true,
    flush: "post",
  }
);
</script>

<template>
  <div class="relative h-screen">
    <div class="messages h-full pb-16">
      <div class="p-2 overflow-y-auto items-end flex h-full flex-col w-full">
        <!-- Messages -->
        <MessageBubble
          v-for="(message, index) in messages"
          :key="index"
          :message="message"
        />

        <div ref="messageEndRef" class="h-0"></div>
      </div>
    </div>
    <div
      class="p-2 absolute bottom-0 left-0 w-full flex space-x-2 items-center"
    >
      <TheInput
        v-model="newMessage"
        name="message"
        class="flex-1"
        placeholder="Write your message"
      />

      <button class="rounded-full bg-stone-500 h-10 w-10 text-center">
        <div class="w-6 h-6 i-mdi-arrow-right text-white mx-auto"></div>
      </button>
    </div>
  </div>
</template>
