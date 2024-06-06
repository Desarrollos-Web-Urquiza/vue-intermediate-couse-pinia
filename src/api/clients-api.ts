import axios from 'axios';

console.log('import.meta.env.VITE_API_URL', import.meta.env.VITE_API_URL);

const clientsApi = axios.create({
    baseURL:  import.meta.env.VITE_API_URL
})

export default clientsApi;

