<template>
    <div>
        <h1 :style="{ color: color }">{{ title }}</h1>
    </div>
</template>

<script setup lang="ts">

const { title, color } = defineProps<Props>()

interface Props {
    title: string;
    color: string;
}

</script>