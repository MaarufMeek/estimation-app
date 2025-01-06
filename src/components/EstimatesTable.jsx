import React, { useState } from "react";
import "../index.css";

const EstimatesTable = (p) => {
    //state for pagination
    const rowsPerPage = 10; // Number of entries per page
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the range of entries to display
    const totalEntries = p.estimateEntries.length;
    const totalPages = Math.ceil(totalEntries / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, totalEntries);

    // Handle page change
    const handleChangePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="mt-3 scrollable-table">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Total</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {p.estimateEntries.slice(startIndex, endIndex).map((entry, index) => (
                        <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>{entry.itemName}</td>
                            <td className="text-center">{entry.quantity}</td>
                            <td className="text-center">{entry.unitPrice}</td>
                            <td className="text-center">{entry.total}</td>
                            <td className="text-end">
                                <button
                                    className="btn btn-success btn-sm me-3"
                                    onClick={() => p.onClickEdit(p.customerId, entry.id)}
                                >
                                    <i className="bi bi-pencil-fill"></i>
                                    <span className="d-none d-lg-inline ms-2">Edit</span>
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => p.onDeleteEntry(p.customerId, entry.id)}
                                >
                                    <i className="bi bi-trash-fill"></i>
                                    <span className="d-none d-lg-inline ms-2">Delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                <button
                    className="btn btn-dark btn-sm"
                    disabled={currentPage === 1}
                    onClick={() => handleChangePage(currentPage - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="btn btn-dark btn-sm"
                    disabled={currentPage === totalPages}
                    onClick={() => handleChangePage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EstimatesTable;
