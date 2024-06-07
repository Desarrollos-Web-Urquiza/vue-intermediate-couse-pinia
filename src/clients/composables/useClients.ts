import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/store/clients';
import clientsApi from '@/api/clients-api';
import { watch } from 'vue';
import type { Client } from '@/clients/interfaces/client';

const getClients = async():Promise<Client[]> => {
    const { data } = await clientsApi.get<Client[]>('/clients?_page=1');
    return data;
}

const useClients = () => {

    const store = useClientsStore();
    const { currentPage, clients, totalPages } = storeToRefs(store);

    const { isLoading, data } = useQuery(
        ['clients?_page=', 1],
        () => getClients(),
    )

    watch( data, clients =>  {
        console.log('watch');
        if( clients )
            store.setClients( clients );
    })

    return {
        isLoading,
        clients
    }

}

export default useClients;