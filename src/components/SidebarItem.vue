<script setup lang="ts">
import { Channel } from "~/types/channel";
import { User, UserRole } from "~/types/user";

type Props = {
  channel: Channel;
  user: User;
  userRoles?: string[];
};

const props = defineProps<Props>();

const hasPermissionToDelete = computed(
  () =>
    props?.channel.id !== 1 &&
    (props?.channel.created_by === props?.user?.id ||
      props?.userRoles?.includes("admin"))
);
</script>

<template>
  <li class="flex items-center justify-between">
    <RouterLink
      :to="{ name: 'channels/:id', params: { id: channel.id } }"
      active-class="fw-bold"
    >
      {{ channel?.slug }}
    </RouterLink>

    <button v-if="hasPermissionToDelete" class="w-6 h-6 rounded-full bg-red-200 text-red-900">
      <div class="w-5 h-5 i-mdi-trash-can mx-auto"></div>
    </button>
  </li>
</template>
