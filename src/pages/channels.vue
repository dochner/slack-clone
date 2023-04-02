<script setup lang="ts">
const { user, userRoles } = useUser();
const { getChannels } = useChannel();
const { channelsList } = useChat();

onBeforeMount(() => {
  getChannels();
});
</script>

<template>
  <div class="main flex h-screen w-screen overflow-hidden">
    <nav class="w-full bg-stone-900 text-gray-100 overflow-auto max-w-200px">
      <div class="p-2">
        <div class="p-2">
          <button
            class="px-4 py-1 bg-lime text-black fw-semibold text-sm w-full"
          >
            New Channel
          </button>
        </div>

        <hr class="m-2" />

        <div class="p-2 flex flex-col space-y-2">
          <h6 class="text-xs">
            {{ user?.email }}
          </h6>
          <button class="underline text-red-800 rounded-full">Logout</button>
        </div>

        <hr class="m-2" />

        <h4 class="fw-bold">Channels</h4>
        <ul>
          <SidebarItem
            v-for="(channel, index) in channelsList"
            :key="index"
            :channel="channel"
            :user="user"
            :userRoles="userRoles"
          />
        </ul>
      </div>
    </nav>

    <div class="flex-1 bg-stone-800 h-screen">
      <RouterView />
    </div>
  </div>
</template>
