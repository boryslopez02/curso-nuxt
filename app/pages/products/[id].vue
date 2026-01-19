<template>
    <div>
        <h1>Product: {{ $route.params.id }}</h1>

        <div v-if="error">
            <p>Error loading product: {{ error.statusMessage }}</p>
        </div>

        <div v-else-if="product">
            <h2>{{ product.name }}</h2>
            <p>Price: ${{ product.price }}</p>
        </div>
    </div>
</template>

<script setup>
    const route = useRoute()
    const { data: product, error } = await useFetch(`/api/products/${route.params.id}`)

    console.log('route: ', route.params);
</script>