import axios from 'axios';

const API_URL = 'http://localhost:8080/api/receipts';

export const createCashReceipt = async (receipt) => {
    return await axios.post(API_URL, receipt);
};

export const getAllCashReceipts = async () => {
    return await axios.get(API_URL);
};

export const updateCashReceipt = async (id, receipt) => {
    return await axios.put(`${API_URL}/${id}`, receipt);
};

export const deleteCashReceipt = async (id) => {
    return await axios.delete(`${API_URL}/${id}`);
};
