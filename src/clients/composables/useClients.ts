import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { useClientsStore } from '@/store/clients';
import clientsApi from '@/api/clients-api';
import { watch, computed } from 'vue';
import type { Client } from '@/clients/interfaces/client';

const getClients = async( page:number ):Promise<Client[]> => {

    // await new Promise ( resolve =>  {
    //     setTimeout(() => resolve(true), 2500 );
    // })

    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${ page }`);
    return data;
}

const useClients = () => {

    const store = useClientsStore();
    const { currentPage, clients, totalPages } = storeToRefs(store);

    const { isLoading, data } = useQuery(
        ['clients?_page=', currentPage],
        () => getClients( currentPage.value ),
        {   
            // staleTime: 1000 * 60,
        }
    )

    watch( data, clients =>  {
        console.log('watch');
        if( clients )
            store.setClients( clients );
    }, { immediate: true })

    return {
        clients,
        currentPage,
        isLoading,
        totalPages,

        getPage( page: number){
            console.log('page', page);
            store.setPage( page )
        },

        totalPageNumber: computed(
            () => [...new Array(totalPages.value)].map( (v, i) => i + 1 )
        ),
    }

}

export default useClients;