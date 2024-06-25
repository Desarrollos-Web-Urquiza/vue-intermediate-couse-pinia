<script setup lang="ts">
import { useRoute } from "vue-router"
import LoadingModal from "@/shared/components/icons/LoadingModal.vue"
import  { useMutation, useQueryClient } from "@tanstack/vue-query";
import  clientsApi from "@/api/clients-api";
import useClient from "@/clients/composables/useClient"
import  type { Client } from "@/clients/interfaces/client";
import { watch } from 'vue';

const route = useRoute();

const queryClient = useQueryClient();

const { client, isLoading } = useClient( +route.params.id );

const updateClient = async( client: Client ):Promise<Client> => {
    // await new Promise ( resolve =>  {
    //     setTimeout(() => resolve(true), 2000 );
    // })
    const { data } = await clientsApi.patch<Client>("clients/" + client.id, client)
    // const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false });
    // console.log('queries', queries);
    // queries.forEach( query => query.fetch() )
    return data;
}

const clientMutation = useMutation(updateClient);

// const clientMutation = useMutation(updateClient, {
//     onSuccess( data ) {
//         console.log('data', {data});
//     }
// });

watch( clientMutation.isSuccess, () => {
    setTimeout(() => {
        clientMutation.reset();
    }, 2000);
})

</script>

<template>
    <h3 v-if="clientMutation.isLoading.value">
        Guardando...
    </h3>
    <h3 v-if="clientMutation.isSuccess.value">
        Guardado
    </h3>

    <LoadingModal v-if="isLoading" />

    <div v-if="client">
        <h1>{{ client.name }}</h1>
        <form @submit.prevent="clientMutation.mutate(client!)">
            <input 
                type="text"
                placeholder="Nombre"
                v-model="client.name"
            />
            <br>
            <input 
                type="text"
                placeholder="Dirección"
                v-model="client.address"
            />
            <br>
            <button 
                type="submit"
                :disabled="clientMutation.isLoading.value"
            >Guardar</button>
        </form>
    </div>

    <code>
        {{ client }}
    </code>
</template>

<style scoped>

input   {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
}

button  {
    margin-bottom: 10x;
}

</style>