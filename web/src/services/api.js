import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export const getPessoas = (query) => {
    return api.get(`pessoa${query ? `?${query}` : ''}`);
}

export const getPessoa = (id) => {
    return api.get(`pessoa/${id}`);
}

export const postPessoas = (pessoa, id) => {
    if(id !== 0){
        return api.put(`pessoa/${id}`, pessoa);
    } else {
        return api.post('pessoa', pessoa);
    }
}

export const deleteManyPessoas = (listaIds) => {
    return api.post('pessoa/deleteMany', listaIds);
}

export default api;