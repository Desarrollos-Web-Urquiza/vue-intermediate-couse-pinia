<script setup lang="ts">
import useClients from '@/clients/composables/useClients'

interface Props {
    totalPageNumber: array,
    totalPages: number,
    currentPage: number
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'getPageEmit', currentPage: number): void;
}>();

</script>

<template>
    <div>
        <button 
            :disabled="props.currentPage == 1"
            @click = "$emit('getPageEmit', props.currentPage - 1)"
        >Anterior</button>
        <button 
            v-for="number of props.totalPageNumber"
            :key="number"
            :class="{ active: props.currentPage === number }"
            @click="getPage( number )"
        >{{number}}</button>
        <button
            :disabled="props.currentPage == props.totalPages"
            @click = "$emit('getPageEmit', props.currentPage + 1)"
        >Siguiente</button>
    </div>
</template>

<style scoped>
div {
    margin-top: 10px;
}

button {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid var( --color-border );
    color: var( --color-text );
    cursor: pointer;
    margin-right: 5px;
    padding: 10px;
    transition: all .5s; 
}

button:hover    {
    background-color: hsla(160, 100%, 37%, 0.2);
    transition: all .5s;
}

button:disabled {
    cursor: not-allowed;
}

.active {
    background-color: hsla(160, 100%, 37%, 0.2);
}

</style>