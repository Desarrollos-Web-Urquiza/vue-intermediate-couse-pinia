<script setup lang="ts">
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumber from '@/clients/components/PaginationNumber.vue';

</script>


<template>
    <div>
        <h1>Listado de clientes</h1>

        <!-- Client List --> 
        <ClientList /> 

        <!-- PaginationNumbers --> 

        <!-- LoadingModal --> 

        <PaginationNumber />
    </div>
</template>

<style scoped>

</style>