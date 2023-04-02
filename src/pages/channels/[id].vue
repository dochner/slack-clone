<script setup lang="ts">
import MessageBubble from "~/components/MessageBubble.vue";
import { ID } from "~/types/id";

const route = useRoute();
const { id } = route?.params;

const newMessage = ref<string>();

const { messages, getMessagesByChannel } = useChannel();

watchOnce(
  () => id,
  () => {
    getMessagesByChannel(id as ID);
  }
);
</script>

<template>
  <div class="relative h-screen">
    <div class="messages h-full pb-16">
      <div class="p-2 overflow-y-auto">
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
      <TheInput name="message" v-model="newMessage" class="flex-1" />

      <button class="rounded-full bg-stone-500 h-10 w-10 text-center">
        <div class="w-6 h-6 i-mdi-arrow-right text-white mx-auto"></div>
      </button>
    </div>
  </div>
</template>
