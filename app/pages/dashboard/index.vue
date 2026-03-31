<template>
  <div>
    <h1>Dashboard protected</h1>
    {{ user }}
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});

const { user, clear: clearUserSession } = useUserSession();

const logout = async () => {
  await clearUserSession();
  await navigateTo("/login");
};
</script>

<style lang="scss" scoped></style>
