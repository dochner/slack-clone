<script setup lang="ts">
const { user, getUserRoles } = useUser();
const { session } = useAuth();
const supabase = useSupabase();
const router = useRouter();

useHead({
  titleTemplate: (title) => `SlackClone${title ? `- ${title}` : ""}`,
});

const {
  data: { subscription: authListener },
} = supabase.auth.onAuthStateChange(async (event, newSession) => {
  if (newSession) {
    session.value = newSession;
  }

  const currentUser = session.value?.user;
  user.value = currentUser;

  console.log(currentUser);
  if (currentUser) {
    await getUserRoles();
    router.push({ name: "channels/:id", params: { id: 1 } });
  }
});

onBeforeUnmount(() => {
  authListener.unsubscribe();
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
