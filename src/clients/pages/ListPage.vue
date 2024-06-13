<script setup lang="ts">
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumbers from '@/clients/components/PaginationNumbers.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/icons/LoadingModal.vue';

const { isLoading } = useClients();

</script>


<template>
    <div>
        <h1>Listado de clientes</h1>
        
        <LoadingModal v-if="isLoading" />
        <!-- Client List --> 
        <ClientList /> 

        <!-- PaginationNumbers --> 

        <!-- LoadingModal --> 

        <PaginationNumbers />

    </div>
</template>

<style scoped>

</style>