<script setup lang="ts">
import useClients from '@/clients/composables/useClients'

useClients();
const { clients }  =  useClients();

</script>


<template>
   <ul>
        <li
            v-for="client of clients.data"
            :key="client.id"
        >
            <RouterLink :to="{
                name: 'client-id',
                params: { id: client.id }
            }">
                {{ client.name }}
            </RouterLink>
        </li>
   </ul>
</template>

<style scoped>

</style>