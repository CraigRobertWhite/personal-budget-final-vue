import axios from 'axios';

export const createMonthlyExpense = (data) => {
    return axios.post('/monthly_expenses/', data);
};
