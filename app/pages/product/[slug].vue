<template>
    <div>
        <h1>Slugs {{ $route.params.slug }}</h1>
    </div>
</template>

<script setup>
    const route = useRoute()
    console.log('route: ', route.params);
</script>