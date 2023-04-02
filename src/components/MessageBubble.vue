<script setup lang="ts">
import { Message } from "~/types/message";
import { UserRole } from "~/types/user";

const { user, userRoles } = useUser();

type Props = {
  message: Message;
};

const props = defineProps<Props>();

const isSender = props.message?.user_id === user.value?.id;
const actualUser = computed(() => user.value);

const hasPermissionToDelete = computed(
  () =>
    user.value?.id === props.message.user_id ||
    userRoles.value?.some((role: UserRole) =>
      ["admin", "moderator"].includes(role)
    )
);
</script>

<template>
  <div
    class="messagle-bubble py-1 flex items-center space-x-2 max-w-70"
    :class="isSender ? 'ml-auto' : 'mr-auto'"
  >
    <div
      v-if="hasPermissionToDelete"
      class="text-stone-100 w-6"
      :class="isSender ? 'order-2' : ''"
    >
      <button class="rounded-full bg-red-200 text-red-800">
        <div class="w-4 h-4 i-mdi-trash-can"></div>
      </button>
    </div>
    <div>
      <p class="text-white"></p>
      <p class="text-lime-300 fw-bold">{{ message?.author.username }}</p>
      <p class="text-white">{{ message.message }}</p>
    </div>
  </div>
</template>
