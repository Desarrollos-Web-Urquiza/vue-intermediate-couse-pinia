import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Client } from '@/clients/interfaces/client';

interface CounterOptionsState {
    count: number;
    lastChanged?: Date;
}

export const useClientsStore = defineStore('clients', () => {
    const currentPage = ref<number>(1);
    const totalPages = ref<number>(5);
    const clients = ref<Client[]>([]);

    return {
        //State properties
        currentPage,
        totalPages,
        clients,

        //Getters
        // squareCount: computed(() => count.value * count.value),

        //Actions
        setClients( newClients: Client[]) {
            clients.value = newClients
        },
        setPage(page: number){
            if( currentPage === page ) return;
            clients.value = page
        }
    }
});