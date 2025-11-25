<template>
    <div>
        <h1>blog {{ $route.params.id }}</h1>
        <div v-if="error">
            <p>{{ error.message }}</p>
        </div>
        <div v-else-if="post">
            <h1>{{ post.title }}</h1>
            <p>{{ post.body }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Post } from '#shared/types/post';
    const { id } = useRoute().params
    const { data: post, error } = await useFetch<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`,{
        
    })
</script>