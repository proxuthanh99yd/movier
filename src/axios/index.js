import axios from "axios";

const fetchApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: import.meta.env.VITE_HEADER_AUTH
    }
});

export { fetchApi };