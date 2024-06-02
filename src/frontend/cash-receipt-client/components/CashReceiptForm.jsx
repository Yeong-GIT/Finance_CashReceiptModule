import { useState, useEffect } from 'react';

const CashReceiptForm = ({ onSubmit, selectedReceipt, setSelectedReceipt }) => {
    const [customerName, setCustomerName] = useState('');
    const [amount, setAmount] = useState('');
    const [receiptDate, setReceiptDate] = useState('');

    useEffect(() => {
        if (selectedReceipt) {
            setCustomerName(selectedReceipt.customerName);
            setAmount(selectedReceipt.amount);
            setReceiptDate(selectedReceipt.receiptDate);
        } else {
            // Reset form when selectedReceipt is null
            setCustomerName('');
            setAmount('');
            setReceiptDate('');
        }
    }, [selectedReceipt]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const receipt = { customerName, amount, receiptDate };
        await onSubmit(receipt, selectedReceipt?.id);
        // Clear the form
        setCustomerName('');
        setAmount('');
        setReceiptDate('');
        setSelectedReceipt(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" />
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
            <input type="date" value={receiptDate} onChange={(e) => setReceiptDate(e.target.value)} placeholder="Receipt Date" />
            <button type="submit">{selectedReceipt ? 'Update' : 'Add'} Cash Receipt</button>
        </form>
    );
};

export default CashReceiptForm;
