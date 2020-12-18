import axios from 'axios';

export const createAccount = (data) => {
    return axios.post('/accounts/', data);
};
