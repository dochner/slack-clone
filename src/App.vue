<script setup lang="ts">
const { user } = useUser();

useHead({
  titleTemplate: (title) => `SlackClone${title ? `- ${title}` : ""}`,
});
</script>

<template>
  <div class="w-full h-full">
    <router-view />
  </div>
</template>

<style>
html,
body,
#app {
  max-height: 100vh;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
