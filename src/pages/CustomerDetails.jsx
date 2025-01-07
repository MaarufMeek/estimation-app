import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Customers, formatDate, scrollToSection} from "../app-logic.js";
import EstimateForm from "../components/EstimateForm.jsx";
import Toast from "../components/Toast.jsx";
import EstimatesTable from "../components/EstimatesTable.jsx";
import EstimateEdit from "../components/EstimateEdit.jsx";
import PDFContainer from "./PdfContainer.jsx";
import GeneratePDFButton from "../components/GenereatePdfButton.jsx";
import ContractEdit from "../components/ContractEdit.jsx";
import CustomerEdit from "../components/CustomerEdit.jsx";

const CustomerDetails = () => {
    const {id} = useParams();  // Getting the customer id from the URL params
    const [customers, setCustomers] = useState(new Customers())
    const [showEstimateForm, setShowEstimateForm] = useState(false)
    const [showEstimateEditForm, setShowEstimateEditForm] = useState(false)
    const [showCustomerEditForm, setShowCustomerEditForm] = useState(false)
    const [showContractEditForm, setShowContractEditForm] = useState(false)
    const [showEstimateSheet, setShowEstimateSheet] = useState(false);
    const [entryToEditCustomerId, setEntryToEditCustomerId] = useState('');
    const [entryToEditId, setEntryToEditId] = useState('');
    const customer = customers.customers.find(cus => cus.id === id);
    const estimateEntries = customer.contract.estimationEntries;

    const entryToEdit = customer.contract.estimationEntries.find(
        (entry) => entry.id === entryToEditId
    );

    //scroll to estimation entry from when make estimate button is clicked
    useEffect(() => {
        if(showEstimateForm) scrollToSection("estimate-form")
    }, [showEstimateForm]);

    //scroll to the estimate sheet when show estimate sheet button is clicked
    useEffect(() => {
        if(showEstimateSheet) scrollToSection("pdf-content")
    }, [showEstimateSheet]);


    const handleAddEstimate = (customerId, itemName, quantity, unitPrice) => {
        if (!customer || !customer.contract) {
            console.error("Customer or contract not found.");
            return;
        }
        customers.addEstimate(customerId, itemName, quantity, unitPrice);
        setCustomers(new Customers(customers.customers)); // Trigger a state update to refresh the component
    };

    const handleDeleteEstimate = (customerId, id) => {
        if (!customer || !customer.contract) {
            console.error("Customer or contract not found.");
            return;
        }
        customers.deleteEntry(customerId, id);
        setCustomers(new Customers(customers.customers)); // Trigger a state update to refresh the component
    };

    //get entry and customer ids after clicking on edit button in estimate table
    const handleEstimatEditClick = (customerId, entryId) => {
        if (!customer || !customer.contract) {
            console.error("Customer or contract not found.");
            return;
        }
        setEntryToEditCustomerId(customerId);
        setEntryToEditId(entryId);
        setShowEstimateEditForm(true)
    }

    //get contract id from after clicking edit button on contract details card
    const handleContractEditClick = () => {
        if (!customer) {
            console.error("Customer not found.");
            return;
        }
        setShowContractEditForm(true)
    }

    //get customer id after clicking edit button on customer details card, show edit form
    const handleCustomerEditClick = () => {
        if (!customer) {
            console.error("Customer not found")
            return;
        }
        setShowCustomerEditForm(true)
    }

    const handleEditEstimate = (customerId, id, newItem, newQuantity, newPrice) => {
        customers.editEstimationEntry(customerId, id, newItem, newQuantity, newPrice);
        setCustomers(new Customers(customers.customers))
    }

    const handleEditContract = (customerId, newName, newDescription, newSite, newDate) => {
        customers.editContract(customerId, newName, newDescription, newSite, newDate)
        setCustomers(new Customers(customers.customers))
    }

    const handleEditCustomer = (customerId, newName, newContact, newAddress) => {
        customers.editCustomer(customerId, newName, newContact, newAddress);
        setCustomers(new Customers(customers.customers))
    }

    const handShowEstimateForm =  () => {
        setShowEstimateForm(!showEstimateForm);
    };

    const handleShowEstimateSheet = () => {
        setShowEstimateSheet(!showEstimateSheet)
    }


    if (!customer) {
        return <div>Customer not found</div>;
    }
    return (
        <>
            <div className="container mt-2">
                <div className="text-end mt-3 mb-3">
                    <Link
                        to="/"
                        className="btn btn-dark fs-6 "
                    >
                        <i className="bi bi-house"></i> Home
                    </Link>
                </div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <h2 className="text-center">
                            <i className="bi bi-person-circle me-2"></i>
                            Customer Details
                        </h2>
                    </div>

                    {/* Customer Information */}
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title fw-bold mt-1 mb-2">
                                    <i className="bi bi-person-fill me-2"></i>
                                    Customer
                                </h4>
                                <hr className="mt-0"/>
                                <p className="card-text mb-2">
                                    <i className="bi bi-person-circle me-2"></i>
                                    <strong>Name:</strong> {customer.name}
                                </p>
                                <p className="card-text mb-2">
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    <strong>Contact:</strong> {customer.contact}
                                </p>

                                <p className="card-text mb-2">
                                    <i className="bi bi-geo-alt-fill me-2"></i>
                                    <strong>Address:</strong> {customer.address}
                                </p>
                                <div className="edit-contract mt-0">
                                    <button
                                        className="mb-1"
                                        onClick={() => handleCustomerEditClick(customer.id)}>
                                        <i className="bi bi-pencil-fill pt-1 pb-1 pe-3 ps-3"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Contract */}
                    <div className="col-lg-6 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title fw-bold">
                                    <i className="bi bi-file-earmark-text-fill me-2"></i>
                                    Contract
                                </h4>
                                <hr className="mt-0"/>
                                {customer.contract ? (
                                    <div>
                                        <p className="mb-1">
                                            <i className="bi bi-text-paragraph me-2"></i>
                                            <strong>Description:</strong> {customer.contract.description}
                                        </p>
                                        <p className="mb-1">
                                            <i className="bi bi-geo-fill me-2"></i>
                                            <strong>Site:</strong> {customer.contract.site}
                                        </p>
                                        <p>
                                            <i className="bi bi-calendar-date me-2"></i>
                                            <strong>Date:</strong> {formatDate(customer.contract.date)}
                                        </p>
                                        <div className="edit-contract">
                                            <button className="my-1" onClick={() => handleContractEditClick()}>
                                                <i className="bi bi-pencil-fill pt-1 pb-1 pe-3 ps-3"></i>
                                            </button>
                                        </div>

                                    </div>
                                ) : (
                                    <p className="text-muted">No contract available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Button Section */}

                <div className="row mt-3">
                    <div className="col text-center">
                        <button
                            className="btn btn-dark"
                            onClick={() => {
                                handShowEstimateForm();
                            }
                            } // Example usage
                        >
                            <i className="bi bi-calculator-fill me-2"></i>
                            {showEstimateForm ? 'Close Form' : 'Make Estimate'}
                        </button>
                    </div>
                </div>
                <p className="d-block d-lg-none text-center mt-5">
                    <span className="bi bi-arrow-left-circle me-2"></span>
                    Swipe left and right to see full table
                    <span className="bi bi-arrow-right-circle ms-2"></span>
                </p>
                {estimateEntries && estimateEntries.length > 0 ?
                    <>
                        <EstimatesTable
                            estimateEntries={estimateEntries}
                            onDeleteEntry={handleDeleteEstimate}
                            customerId={customer.id}
                            onClickEdit={handleEstimatEditClick}
                        />
                    </>
                    :
                    <h3 className="text-muted">No Estimate Entries</h3>
                }

                {/* Estimate Form */}
                {customer.contract && showEstimateForm && (
                    <EstimateForm
                        customerId={customer.id}
                        onAddEstimation={handleAddEstimate}
                        onShowEstimateForm={showEstimateForm}/>
                )}

                {/*show estimate sheet button*/}
                {estimateEntries.length !== 0 &&
                    <div className="d-flex align-items-center justify-content-center"
                         style={{marginTop: '50px', marginBottom: '50px'}}
                    >
                        <button
                            className=" btn btn-dark"
                            onClick={handleShowEstimateSheet}
                        > {!showEstimateSheet ? 'Show Estimate Sheet' : 'Hide Estimate Sheet'}</button>
                    </div>
                }


                {showEstimateEditForm && entryToEdit &&
                    <EstimateEdit
                        onSubmitEdit={handleEditEstimate}
                        customerId={entryToEditCustomerId}
                        entryId={entryToEditId}
                        onClose={setShowEstimateEditForm}
                        initialItemName={entryToEdit.itemName}
                        initialQuantity={entryToEdit.quantity}
                        initialUnitPrice={entryToEdit.unitPrice}
                    />
                }

                {showContractEditForm && customer.id &&
                    <ContractEdit
                        onSubmitEdit={handleEditContract}
                        customerId={customer.id}
                        onClose={setShowContractEditForm}
                        initialContractName={customer.contract.name}
                        initialContractDescription={customer.contract.description}
                        initialContractSite={customer.contract.site}
                        initialContractDate={customer.contract.date}
                    />
                }

                {showCustomerEditForm && customer &&
                    <CustomerEdit
                        onSubmitEdit={handleEditCustomer}
                        customerId={customer.id}
                        onClose={setShowCustomerEditForm}
                        initialCustomertName={customer.name}
                        initialCustomerContact={customer.contact}
                        initialCustomerAddress={customer.address}
                    />
                }
                <Toast/>
            </div>

            {estimateEntries.length !== 0 && showEstimateSheet &&
                <>
                    <PDFContainer customer={customer} estimateEntries={estimateEntries}/>
                    <GeneratePDFButton  customer={customer}/>
                </>
            }
        </>
    );
};

export default CustomerDetails;
