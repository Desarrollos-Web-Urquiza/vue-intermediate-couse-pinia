<script setup lang="ts">
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumbers from '@/clients/components/PaginationNumbers.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/icons/LoadingModal.vue';

const { isLoading, clients, getPage, totalPageNumber, totalPages, currentPage } = useClients();

const getPageEmit = (data: number) => {
    getPage(data);
};

</script>

<template>
    <div>
        <h1>Listado de clientes</h1>
        
        <LoadingModal v-if="isLoading" />
        <!-- Client List --> 
        <ClientList :clients="clients" /> 

        <!-- PaginationNumbers --> 

        <!-- LoadingModal --> 

        <PaginationNumbers 
            @getPageEmit="getPageEmit" 
            :totalPages="totalPages" 
            :currentPage="currentPage" 
            :totalPageNumber="totalPageNumber" 
        />

    </div>
</template>

<style scoped>

</style>