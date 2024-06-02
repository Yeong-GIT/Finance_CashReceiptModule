import { useState, useEffect } from 'react';
import { createCashReceipt, getAllCashReceipts } from '../services/CashReceiptService';
import CashReceiptForm from '../components/CashReceiptForm';

const CashReceiptPage = () => {
    const [receipts, setReceipts] = useState([]);

    useEffect(() => {
        const fetchReceipts = async () => {
            const response = await getAllCashReceipts();
            setReceipts(response.data);
        };
        fetchReceipts();
    }, []);

    const handleSubmit = async (receipt) => {
        await createCashReceipt(receipt);
        // Fetch updated list
        const response = await getAllCashReceipts();
        setReceipts(response.data);
    };

    return (
        <div>
            <h1>Cash Receipts</h1>
            <CashReceiptForm onSubmit={handleSubmit} />
            <ul>
                {receipts.map(receipt => (
                    <li key={receipt.id}>{receipt.customerName} - {receipt.amount} - {receipt.receiptDate}</li>
                ))}
            </ul>
        </div>
    );
};

export default CashReceiptPage;
