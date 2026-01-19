<template>
    <div>
        <TitlePage title="Product" color="green"/>

        <h1>Products</h1>
        <h3>products/page=1</h3>

        <div v-if="error">
            <p>Error loading products: {{ error.message }}</p>
        </div>
        <ul v-else>
            <li v-for="product in products" :key="product.id">
                {{ product.name }} - ${{ product.price }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    const { data: products, error } = await useFetch('/api/products')
</script>