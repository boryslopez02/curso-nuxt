<template>
  <div>
    <h1>login page</h1>
    <form @submit.prevent="onSubmit">
      <input type="email" v-model="email" placeholder="email" />
      <input type="password" v-model="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import type { NuxtError } from "#app";

definePageMeta({
  layout: "auth-layout",
});

const email = ref("");
const password = ref("");

const { fetch: resfreshUserSession } = useUserSession();

const onSubmit = async () => {
  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    await resfreshUserSession();
    await navigateTo("/dashboard");
  } catch (error) {
    const err = error as NuxtError;
    console.log(err.statusCode, "err");
    console.log(err.statusMessage, "err");
  }
};
</script>

<style></style>
