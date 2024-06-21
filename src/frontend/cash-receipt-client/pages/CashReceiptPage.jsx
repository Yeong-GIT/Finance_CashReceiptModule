import { useState, useEffect } from 'react';
import { createCashReceipt, getAllCashReceipts, updateCashReceipt, deleteCashReceipt } from '../services/CashReceiptService';
import CashReceiptForm from '../components/CashReceiptForm';
import GenerateDataButton from '../utils/GenerateDataButton';

const CashReceiptPage = () => {
    const [receipts, setReceipts] = useState([]);
    const [filteredReceipts, setFilteredReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const receiptsPerPage = 10;
    const pageRangeDisplayed = 5; // Number of page buttons to display at a time

    useEffect(() => {
        const fetchReceipts = async () => {
            const response = await getAllCashReceipts();
            setReceipts(response.data);
            setFilteredReceipts(response.data);
        };
        fetchReceipts();
    }, []);

    const handleSubmit = async (receipt, id) => {
        if (id) {
            await updateCashReceipt(id, receipt);
        } else {
            await createCashReceipt(receipt);
        }
        const response = await getAllCashReceipts();
        setReceipts(response.data);
        setFilteredReceipts(response.data);
        setCurrentPage(1);
    };

    const handleUpdateClick = (receipt) => {
        setSelectedReceipt(receipt);
    };

    const handleDeleteClick = async (id) => {
        await deleteCashReceipt(id);
        const response = await getAllCashReceipts();
        setReceipts(response.data);
        setFilteredReceipts(response.data);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            setFilteredReceipts(receipts.filter(receipt => receipt.customerName.toLowerCase().includes(query.toLowerCase())));
        } else {
            setFilteredReceipts(receipts);
        }
        setCurrentPage(1);
    };

    const refreshReceipts = async () => {
        const response = await getAllCashReceipts();
        setReceipts(response.data);
        setFilteredReceipts(response.data);
        setCurrentPage(1);
    };

    const indexOfLastReceipt = currentPage * receiptsPerPage;
    const indexOfFirstReceipt = indexOfLastReceipt - receiptsPerPage;
    const currentReceipts = filteredReceipts.slice(indexOfFirstReceipt, indexOfLastReceipt);

    const totalPages = Math.ceil(filteredReceipts.length / receiptsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the range of page numbers to display
    const getPageNumbers = () => {
        const totalPageNumbers = totalPages > pageRangeDisplayed ? pageRangeDisplayed : totalPages;
        const startPage = Math.max(1, currentPage - Math.floor(totalPageNumbers / 2));
        const endPage = Math.min(totalPages, startPage + totalPageNumbers - 1);

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    const pageNumbers = getPageNumbers();

    return (
        <div>
            <h1>Cash Receipts</h1>
            <input
                type="text"
                placeholder="Search by Customer Name"
                value={searchQuery}
                onChange={handleSearch}
            />
            <CashReceiptForm onSubmit={handleSubmit} selectedReceipt={selectedReceipt} setSelectedReceipt={setSelectedReceipt} />
            <GenerateDataButton onGenerated={refreshReceipts} />

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
                    {currentReceipts.map(receipt => (
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

            {totalPages > 1 && (
                <div className="pagination-container">
                    <p>Page {currentPage}</p>
                    <div className="pagination">
                        <button
                            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={currentPage === number ? 'active' : ''}
                            >
                                {number}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CashReceiptPage;
