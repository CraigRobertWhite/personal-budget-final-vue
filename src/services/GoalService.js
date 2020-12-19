import axios from 'axios';

export const createGoal = (data) => {
    return axios.post('/goals/', data);
};
