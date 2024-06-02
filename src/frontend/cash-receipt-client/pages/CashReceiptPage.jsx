import { useState, useEffect } from 'react';
import { createCashReceipt, getAllCashReceipts, updateCashReceipt, deleteCashReceipt } from '../services/CashReceiptService';
import CashReceiptForm from '../components/CashReceiptForm';

const CashReceiptPage = () => {
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    useEffect(() => {
        const fetchReceipts = async () => {
            const response = await getAllCashReceipts();
            setReceipts(response.data);
        };
        fetchReceipts();
    }, []);

    const handleSubmit = async (receipt, id) => {
        if (id) {
            await updateCashReceipt(id, receipt);
        } else {
            await createCashReceipt(receipt);
        }
        // Fetch updated list
        const response = await getAllCashReceipts();
        setReceipts(response.data);
    };

    const handleUpdateClick = (receipt) => {
        setSelectedReceipt(receipt);
    };

    const handleDeleteClick = async (id) => {
        await deleteCashReceipt(id);
        // Fetch updated list
        const response = await getAllCashReceipts();
        setReceipts(response.data);
    };

    return (
        <div>
            <h1>Cash Receipts</h1>
            <CashReceiptForm onSubmit={handleSubmit} selectedReceipt={selectedReceipt} setSelectedReceipt={setSelectedReceipt} />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer Name</th>
                        <th>Amount</th>
                        <th>Receipt Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map(receipt => (
                        <tr key={receipt.id}>
                            <td>{receipt.id}</td>
                            <td>{receipt.customerName}</td>
                            <td>{receipt.amount}</td>
                            <td>{receipt.receiptDate}</td>
                            <td>
                                <button onClick={() => handleUpdateClick(receipt)}>Update</button>
                                <button onClick={() => handleDeleteClick(receipt.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CashReceiptPage;
