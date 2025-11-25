<template>
    <div>
        <h1>blog page</h1>
        <ul>
            <li v-for="post in posts" :key="post.id">
                <NuxtLink :to="`${post.id}`">
                    <span>{{ post.title }}</span>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import type { Post } from '#shared/types/post';
    const { data: posts } = await useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts',{
        
    })
</script>