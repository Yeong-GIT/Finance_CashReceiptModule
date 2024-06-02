import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cash-receipts';

export const createCashReceipt = async (receipt) => {
    return await axios.post(API_URL, receipt);
};

export const getAllCashReceipts = async () => {
    return await axios.get(API_URL);
};
