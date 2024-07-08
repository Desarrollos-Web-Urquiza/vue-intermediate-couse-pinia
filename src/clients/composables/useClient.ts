import  { ref, watch, computed } from "vue";
import  clientApi from "@/api/clients-api";
import  { useQuery, useMutation } from "@tanstack/vue-query";
import type { Client } from "@/clients/interfaces/client";

const getClient = async ( id: number ):Promise<Client> => {
    const { data } = await clientApi.get("/clients/" + id);
    return data;
}

const useClient = ( id: number ) => {

    // const makeMutation = (( updateFunction:  () => Promise<any> ) => {
    //     console.log('updateFunction', updateFunction);
    //     return useMutation(updateFunction)
    // });
    
    const updateClient = async( client: Client ):Promise<Client> => {
        const { data } = await clientApi.patch<Client>("clients/" + client.id, client)
        return data;
    }

    const clientMutation = useMutation(updateClient);

    const client = ref<Client>();

    const { isLoading, data, isError } = useQuery(
        [ 'client', id ],
        () => getClient(id),
        { retry: false, }
    )

    watch (data, () => {
        if ( data.value )
            client.value = {...data.value};
    }, {  immediate: true  });

    return  {
        client,
        isError,
        isLoading,
        clientMutation,

        updateClient: clientMutation.mutate,
        isUpdating: computed ( () => clientMutation.isLoading.value ),
        isUpdatingSuccess: computed ( () => clientMutation.isSuccess.value ),
        isErrorUpdating: computed ( () => clientMutation.isLoading.value ),
    }

}

export default useClient;