import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9090/api'
});

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (err) {
        return Promise.reject(err);
    }
);

export async function fetchData(search_term, offset) {
    const data = {
        search_term,
        offset
    };

    const resp = await api.post('/search', data);
    return resp.data;
}
