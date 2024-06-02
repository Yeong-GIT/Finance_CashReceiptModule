import axios from 'axios';

const API_URL = 'http://localhost:8080/api/receipts';

export const createCashReceipt = async (receipt) => {
    return await axios.post(`${API_URL}/create`, receipt);
};

export const getAllCashReceipts = async () => {
    return await axios.get(`${API_URL}/getall`);
};

export const updateCashReceipt = async (id, receipt) => {
    return await axios.put(`${API_URL}/update/${id}`, receipt);
};


export const deleteCashReceipt = async (id) => {
    return await axios.delete(`${API_URL}/delete/${id}`);
};
