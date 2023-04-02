<script setup lang="ts">
import { Message } from "~/types/message";
import { UserRole } from "~/types/user";

const { user, userRoles } = useUser();

type Props = {
  message: Message;
};

const props = defineProps<Props>();

const hasPermissionToDelete = computed(
  () =>
    user.value?.id === props.message.user_id ||
    userRoles.value?.some((role: UserRole) =>
      ["admin", "moderator"].includes(role)
    )
);
</script>

<template>
  <div class="py-1 flex items-center space-x-2">
    <div class="text-stone-100 w-6">
      <button class="rounded-full bg-red-200 text-red-800">
        <div class="w-4 h-4 i-mdi-trash-can"></div>
      </button>
    </div>

    <div>
      <p class="text-lime-300 fw-bold">{{ message?.author.username }}</p>
      <p class="text-white">{{ message.message }}</p>
    </div>
  </div>
</template>
