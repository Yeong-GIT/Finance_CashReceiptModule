import React, { useState, useEffect, useRef } from 'react';
import { createCashReceipt, getAllCashReceipts, updateCashReceipt, deleteCashReceipt } from '../services/CashReceiptService';
import GenerateDataButton from '../utils/GenerateDataButton';

const CashReceiptPage = () => {
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const tableRef = useRef(null);
    const isTableInitialized = useRef(false);

    useEffect(() => {
        const fetchReceipts = async () => {
            const response = await getAllCashReceipts();
            setReceipts(response.data);

            if (!isTableInitialized.current) {
                tableRef.current = $('#cashReceiptsTable').DataTable({
                    data: response.data,
                    responsive: true,
                    paging: true,
                    pageLength: 10,
                    lengthChange: true,
                    lengthMenu: [5, 10, 25, 50],
                    searching: true,
                    info: true,
                    columns: [
                        { data: 'id' },
                        { data: 'customerName' },
                        { data: 'amount' },
                        { data: 'receiptDate' },
                        {
                            data: null,
                            render: (data, type, row) => `
                                <button class="update-btn" data-id="${row.id}">Update</button>
                                <button class="delete-btn" data-id="${row.id}">Delete</button>
                            `
                        }
                    ],
                    destroy: true,
                    dom: 'lfrtip',
                    initComplete: function () {
                        $('#cashReceiptsTable_filter').prepend(`
                            <div style="display: flex; gap: 10px;">
                                <input type="text" id="customerNameInput" placeholder="Customer Name" style="width: 150px;" />
                                <input type="number" id="amountInput" placeholder="Amount" style="width: 100px;" />
                                <input type="date" id="receiptDateInput" style="width: 150px;" />
                                <button id="addReceiptBtn" class="btn btn-success">Add Cash Receipt</button>
                            </div>
                        `);

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

                                if (selectedReceipt) {
                                    // Update the existing receipt
                                    await updateCashReceipt(selectedReceipt.id, newReceipt);
                                    setSelectedReceipt(null);
                                    $('#addReceiptBtn').text('Add Cash Receipt'); // Reset button text to Add
                                } else {
                                    // Add a new receipt
                                    await createCashReceipt(newReceipt);
                                }

                                const response = await getAllCashReceipts();
                                setReceipts(response.data);

                                // Clear the input fields after the action
                                $('#customerNameInput').val('');
                                $('#amountInput').val('');
                                $('#receiptDateInput').val('');
                            } else {
                                alert("Please fill in all fields.");
                            }
                        });
                    }
                });
                isTableInitialized.current = true;
            }
        };

        fetchReceipts();

        return () => {
            if ($.fn.dataTable.isDataTable('#cashReceiptsTable')) {
                $('#cashReceiptsTable').DataTable().destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.clear().rows.add(receipts).draw(false);

            $('#cashReceiptsTable tbody').off('click', '.update-btn').on('click', '.update-btn', function () {
                const id = $(this).data('id');
                const receipt = receipts.find(receipt => receipt.id === id);
                setSelectedReceipt(receipt);
                $('#customerNameInput').val(receipt.customerName);
                $('#amountInput').val(receipt.amount);
                $('#receiptDateInput').val(receipt.receiptDate);
                $('#addReceiptBtn').text('Update Cash Receipt').off('click').on('click', async () => {
                    const updatedReceipt = {
                        customerName: $('#customerNameInput').val(),
                        amount: parseFloat($('#amountInput').val()),
                        receiptDate: $('#receiptDateInput').val()
                    };
                    if (updatedReceipt.customerName && updatedReceipt.amount && updatedReceipt.receiptDate) {
                        await updateCashReceipt(id, updatedReceipt);
                        setSelectedReceipt(null);
                        $('#addReceiptBtn').text('Add Cash Receipt').off('click').on('click', async () => {
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

                                $('#customerNameInput').val('');
                                $('#amountInput').val('');
                                $('#receiptDateInput').val('');
                            } else {
                                alert("Please fill in all fields.");
                            }
                        });

                        const response = await getAllCashReceipts();
                        setReceipts(response.data);

                        $('#customerNameInput').val('');
                        $('#amountInput').val('');
                        $('#receiptDateInput').val('');
                    } else {
                        alert("Please fill in all fields.");
                    }
                });
            });

            $('#cashReceiptsTable tbody').off('click', '.delete-btn').on('click', '.delete-btn', async function () {
                const id = $(this).data('id');
                await deleteCashReceipt(id);
                const response = await getAllCashReceipts();
                setReceipts(response.data);
                tableRef.current.clear().rows.add(response.data).draw(false);
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
