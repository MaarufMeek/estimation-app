import React from "react";
import { Link } from "react-router-dom"; // Import Link to enable navigation

const CustomerGrid = ({ customers, showCustomerForm, onDeleteCustomer}) => {
    const colClass = showCustomerForm ? "col-12 col-md-6" : "col-12 col-md-4";

    if(customers.length === 0) return <h3 className="text-center">No customers. Add customers</h3>

    return (
        <div className="row">
            {/*<h1>Customers</h1>*/}
            {customers.map((cus) => (
                <div className={`${colClass} my-2`} key={cus.id}>
                    <div className="card">
                        <div className="card-body fs-6">
                            <div className="d-flex align-content-between justify-content-between">
                                <h3 className="card-title">
                                    <i className="bi bi-person-fill me-2"></i>
                                    {cus.name}
                                </h3>
                                <button className="btn " onClick={() => onDeleteCustomer(cus.id)}>
                                    <i className="bi bi-trash text-danger fs-5 "></i>
                                </button >
                            </div>
                            <hr className="mt-0"/>
                            <p className="card-text">
                                <i className="bi bi-telephone me-2"></i>
                                {cus.contact}
                            </p>
                            <p className="card-text">
                                <i className="bi bi-geo-alt me-2"></i>
                                {cus.address}
                            </p>
                            {cus.contract && (
                                <div className="d-flex justify-content-between my-3">
                                    <div>
                                        <p className="card-text">
                                            <i className="bi bi-file-text me-2"></i>
                                            {cus.contract.description}
                                        </p>
                                        <p className="card-text">
                                            <i className="bi bi-geo-fill me-2"></i>
                                            {cus.contract.site}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            to={`/customer/${cus.id}`} // Link to the customer details page
                                            className="btn btn-dark fs-6"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomerGrid;
