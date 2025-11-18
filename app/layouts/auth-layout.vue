<template>
    <div>
        <NuxtLink to="/login">Login</NuxtLink>
        <NuxtLink to="/register">Register</NuxtLink>
        <h1>Auth Layout</h1>

        <slot />

        <footer>Auth footer</footer>
    </div>
</template>

<script>
    export default {
        
    }
</script>