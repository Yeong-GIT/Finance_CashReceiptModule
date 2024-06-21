import React, { useState, useEffect, useRef } from 'react';
import { createCashReceipt, getAllCashReceipts, updateCashReceipt, deleteCashReceipt } from '../services/CashReceiptService';
import GenerateDataButton from '../utils/GenerateDataButton';

const CashReceiptPage = () => {
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const tableRef = useRef(null);

    useEffect(() => {
        const fetchReceipts = async () => {
            const response = await getAllCashReceipts();
            setReceipts(response.data);

            // Initialize DataTable if not already initialized
            if (!$.fn.dataTable.isDataTable('#cashReceiptsTable')) {
                tableRef.current = $('#cashReceiptsTable').DataTable({
                    data: response.data,
                    responsive: true,
                    paging: true,
                    pageLength: 10,
                    lengthChange: true, // Enable changing the number of rows per page
                    lengthMenu: [5, 10, 25, 50], // Options for the number of rows to display
                    searching: true,
                    info: true, // Enable table info display (e.g., "Showing 1 to 10 of 57 entries")
                    columns: [
                        { data: 'id' },
                        { data: 'customerName' },
                        { data: 'amount' },
                        { data: 'receiptDate' },
                        {
                            data: null,
                            render: (data, type, row) => {
                                return `
                                    <button class="update-btn" data-id="${row.id}">Update</button>
                                    <button class="delete-btn" data-id="${row.id}">Delete</button>
                                `;
                            }
                        }
                    ],
                    destroy: true, // Ensures the table is reinitialized on each render
                    dom: 'lfrtip', // Include length change control (l) and filter (f) in the DataTable
                    initComplete: function () {
                        // Integrate the form fields into the DataTable header
                        $('#cashReceiptsTable_filter').prepend(`
                            <div style="display: flex; gap: 10px;">
                                <input type="text" id="customerNameInput" placeholder="Customer Name" style="width: 150px;" />
                                <input type="number" id="amountInput" placeholder="Amount" style="width: 100px;" />
                                <input type="date" id="receiptDateInput" style="width: 150px;" />
                                <button id="addReceiptBtn">Add Cash Receipt</button>
                            </div>
                        `);
                        
                        // Attach event listener to the "Add Cash Receipt" button
                        $('#addReceiptBtn').on('click', async () => {
                            const customerName = $('#customerNameInput').val();
                            const amount = $('#amountInput').val();
                            const receiptDate = $('#receiptDateInput').val();
                            
                            if (customerName && amount && receiptDate) {
                                const newReceipt = {
                                    customerName,
                                    amount: parseFloat(amount),
                                    receiptDate
                                };
                                await createCashReceipt(newReceipt);
                                const response = await getAllCashReceipts();
                                setReceipts(response.data);

                                // Clear the input fields after adding a new receipt
                                $('#customerNameInput').val('');
                                $('#amountInput').val('');
                                $('#receiptDateInput').val('');
                            } else {
                                alert("Please fill in all fields.");
                            }
                        });
                    }
                });
            }
        };

        fetchReceipts();

        // Cleanup function to destroy the table on component unmount
        return () => {
            if ($.fn.dataTable.isDataTable('#cashReceiptsTable')) {
                $('#cashReceiptsTable').DataTable().destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            // Re-draw the DataTable with updated data when receipts state changes
            tableRef.current.clear().rows.add(receipts).draw();

            // Attach React event handlers to buttons after DataTables rendering
            $('#cashReceiptsTable tbody').off('click', '.update-btn').on('click', '.update-btn', function () {
                const id = $(this).data('id');
                const receipt = receipts.find(receipt => receipt.id === id);
                setSelectedReceipt(receipt);
                $('#customerNameInput').val(receipt.customerName);
                $('#amountInput').val(receipt.amount);
                $('#receiptDateInput').val(receipt.receiptDate);
            });

            $('#cashReceiptsTable tbody').off('click', '.delete-btn').on('click', '.delete-btn', async function () {
                const id = $(this).data('id');
                await deleteCashReceipt(id);
                const response = await getAllCashReceipts();
                setReceipts(response.data);
                tableRef.current.clear().rows.add(response.data).draw();
            });
        }
    }, [receipts]);

    const refreshReceipts = async () => {
        const response = await getAllCashReceipts();
        setReceipts(response.data);
    };

    return (
        <div>
            <h1>Cash Receipts</h1>
            <GenerateDataButton onGenerated={refreshReceipts} />
            <table id="cashReceiptsTable" className="display responsive nowrap" style={{ width: '100%' }}>
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
                    {/* DataTables will handle data rendering */}
                </tbody>
            </table>
        </div>
    );
};

export default CashReceiptPage;
