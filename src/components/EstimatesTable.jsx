import "react";
import "../index.css"


const EstimatesTable = (p) => {


    return (
        <div className="mt-3 scrollable-table">
            <table className="table">
                <thead >
                    <tr>
                        <th>#</th>
                        <th>Item</th>
                        <th>
                            <span className="d-block d-sm-none">Qty</span>
                            <span className="d-none d-md-inline">Quantity</span>
                        </th>
                        <th>Price</th>
                        <th>Total</th>
                        <th className="text-end">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {p.estimateEntries.map((entry, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{entry.itemName}</td>
                            <td>{entry.quantity}</td>
                            <td>{entry.unitPrice}</td>
                            <td>{entry.total}</td>
                            <td className="text-end">
                                <button className="btn btn-success btn-sm me-3"
                                        onClick={() => p.onClickEdit(p.customerId, entry.id)}>
                                    <i className="bi bi-pencil-fill"></i>
                                    <span className="d-none d-md-inline ms-2">Edit</span>
                                </button>
                                <button className="btn btn-danger btn-sm"
                                        onClick={() => p.onDeleteEntry(p.customerId, entry.id)}>
                                    <i className="bi bi-trash-fill"></i>
                                    <span className="d-none d-md-inline ms-2">Delete</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EstimatesTable;
