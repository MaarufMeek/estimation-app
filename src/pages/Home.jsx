import NavBar from "../components/NavBar.jsx";
import CustomerForm from "../components/CustomerForm.jsx";
import CustomerGrid from "../components/CustomerGrid.jsx";
import Toast from "../components/Toast.jsx";
import  { useState } from "react";
import { Customers } from "../app-logic.js";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.jsx";

const Home = () => {
    const [customers, setCustomers] = useState(new Customers());
    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState('');

    const toggleFormVisibility = () => {
        setShowCustomerForm(!showCustomerForm);
    };

    const handleAddCustomer = (customerData) => {
        const { name, contact, address, contractName, contractDescription, contractSite, contractDate } = customerData;
        customers.addCustomer(name, contact, address, contractName, contractDescription, contractSite, contractDate);

        // Update the state to trigger a re-render
        setCustomers(new Customers(customers.customers));
    };

    const handleDeleteCustomer = (id) => {
        setShowModal(true)
        setSelectedId(id)
    }

     const confirmDelete = () => {
        setShowModal(false);
        customers.deleteCustomer(selectedId)
        setCustomers(new Customers(customers.customers))


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
                            <CustomerGrid customers={customers.customers}
                                          showCustomerForm={showCustomerForm}
                                          onDeleteCustomer={handleDeleteCustomer} />
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmDeleteModal show={showModal}
                                onClose={() => setShowModal(false)}
                                onConfirm={confirmDelete}
            />
            <Toast />
        </>
    );
};

export default Home;
