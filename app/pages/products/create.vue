<template>
  <div>
    <h1>Create product page</h1>

    <button @click="onSubmit">Save product</button>

    <div v-if="errorMessage">
      <p>Error creating product: {{ errorMessage }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FetchError } from "ofetch";
// import type { NuxtError } from "#app";

const errorMessage = ref<string | null>(null);

const onSubmit = async (event: Event) => {
  try {
    const response = await $fetch("/api/products", {
      method: "POST",
      body: {
        name: "New Product",
        price: 99.99,
      },
    });

    console.log("response: ", response);
  } catch (error) {
    const fetchError = error as FetchError;
    errorMessage.value =
      fetchError.data?.message || "Ocurrió un error inesperado";
  }
};
</script>
