<template>
  <div>
    <h1>login page</h1>

    <div v-if="errors" style="color: red">
      {{ errors }}
    </div>

    <form @submit.prevent="onSubmit">
      <input type="email" v-model="email" placeholder="email" />
      <input type="password" v-model="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { z } from "zod";
import type { NuxtError } from "#app";

definePageMeta({
  layout: "auth-layout",
});

const bodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6),
});

const email = ref("");
const password = ref("");

const errors = ref<{ email?: string; password?: string; backend?: string }>({});

const { fetch: resfreshUserSession } = useUserSession();

const onSubmit = async () => {
  try {
    errors.value = {};

    const validatedData = bodySchema.parse({
      email: email.value,
      password: password.value,
    });

    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: {
        email: validatedData.email,
        password: validatedData.password,
      },
    });

    await resfreshUserSession();
    await navigateTo("/dashboard");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log("validation errores", error.issues);

      error.issues.forEach((issue) => {
        console.log("issue", issue);
      });

      return;
    }

    const err = error as NuxtError;
    console.log(err.statusCode, "err");
    console.log(err.statusMessage, "err");

    errors.value.backend = err.statusMessage;
  }
};
</script>

<style></style>
