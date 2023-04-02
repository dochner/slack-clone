<script setup lang="ts">
const { signIn, signUp } = useAuth();

const email = ref<string>("");
const password = ref<string>("");
const loading = ref(false);

const handleSignUp = async () => {
  loading.value = true;
  await signUp({
    username: email.value,
    password: password.value,
  });
  loading.value = false;
};
const handleSignIn = async () => {
  loading.value = true;
  await signIn({
    username: email.value,
    password: password.value,
  });
  loading.value = false;
};
</script>

<template>
  <div class="w-full h-full flex justify-center items-center p-4 bg-stone-300">
    <div
      v-show="loading"
      class="bg-black/4 backdrop-blur-sm flex items-center justify-center fixed top-0 w-full left-0 h-full"
    >
      <div
        class="h-10 w-10 i-mdi-slack animate-spin animate-duration-1500 text-lime"
      ></div>
    </div>
    <div class="w-full sm:w-1/2 xl:w-1/3">
      <form
        class="border-lime p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white"
        @submit.prevent
      >
        <div class="mb-4">
          <TheInput v-model="email" name="email" label="E-mail" />
          <TheInput
            v-model="password"
            type="password"
            name="password"
            label="Password"
          />
        </div>

        <div class="flex flex-col gap-2">
          <button @click="handleSignUp">Sign up</button>
          <button @click="handleSignIn">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>
