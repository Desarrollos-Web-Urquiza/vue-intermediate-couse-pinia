import  { ref, watch } from "vue";
import  clientApi from "@/api/clients-api";
import  { useQuery } from "@tanstack/vue-query";
import type { Client } from "@/clients/interfaces/client";

const getClient = async ( id: number ):Promise<Client> => {
    const { data } = await clientApi.get("/clients/" + id);
    return data;
}

const useClient = ( id: number ) => {

    const client = ref<Client>();

    const { isLoading, data } = useQuery(
        [ 'client', id ],
        () => getClient(id),
    )

    watch (data, () => {
        if ( data.value )
            client.value = data.value;
    }, {  immediate: true  });

    return  {
        isLoading,
        client
    }

}

export default useClient;