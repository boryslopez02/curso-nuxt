<template>
    <div>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/product">Product</NuxtLink>

        <slot />

        <footer>footer</footer>
    </div>
</template>

<script>
    export default {
        
    }
</script>