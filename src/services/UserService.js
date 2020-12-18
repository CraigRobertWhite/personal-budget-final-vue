import axios from 'axios';

export const getCurrentUser = () => {
    return axios.get('/users/current/');
};

export const updateCurrentUser = (data) => {
    return axios.patch('/users/current/', data);
};
