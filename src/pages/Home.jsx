import NavBar from "../components/NavBar.jsx";
import CustomerForm from "../components/CustomerForm.jsx";
import CustomerGrid from "../components/CustomerGrid.jsx";
import Toast from "../components/Toast.jsx";
import React, { useState } from "react";
import { Customers } from "../app-logic.js";

const Home = () => {
    const [customers, setCustomers] = useState(new Customers());
    const [showCustomerForm, setShowCustomerForm] = useState(false);

    const toggleFormVisibility = () => {
        setShowCustomerForm(!showCustomerForm);
    };

    const handleAddCustomer = (customerData) => {
        const { name, contact, address, contractName, contractDescription, contractSite, contractDate } = customerData;
        customers.addCustomer(name, contact, address, contractName, contractDescription, contractSite, contractDate);

        // Update the state to trigger a re-render
        setCustomers(new Customers(customers.customers));
    };

    return (
        <>
            <NavBar onAddCustomer={toggleFormVisibility} onShowCustomer={showCustomerForm} />
            <div className="container">
                <div className="row">
                    {showCustomerForm && (
                        <div className="col-12 col-md-4 my-1">
                            <div className="ls-margin">
                                <CustomerForm onSubmit={handleAddCustomer} />
                            </div>
                        </div>
                    )}
                    <div className={`col-12 ${showCustomerForm ? "col-md-8" : "col-md-12"} my-1`}>
                        <div className="rs-margin">
                            <CustomerGrid customers={customers.customers} showCustomerForm={showCustomerForm} />
                        </div>
                    </div>
                </div>
            </div>
            <Toast />
        </>
    );
};

export default Home;
