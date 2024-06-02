import { useState } from 'react';
import { createCashReceipt } from '../services/CashReceiptService';

const CashReceiptForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState('');
    const [receiptDate, setReceiptDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const receipt = { customerName, amount, receiptDate };
        await createCashReceipt(receipt);
        // Handle post-submission (e.g., clear form, show success message)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            <input type="date" value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} placeholder="Receipt Date" />
            <button type="submit">Add Cash Receipt</button>
        </form>
    );
};

export default CashReceiptForm;
