import {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Customers} from "../app-logic.js";
import EstimateForm from "../components/EstimateForm.jsx";
import Toast from "../components/Toast.jsx";
import EstimatesTable from "../components/EstimatesTable.jsx";
import EstimateEdit from "../components/EstimateEdit.jsx";
import PDFContainer from "./PdfContainer.jsx";
import GeneratePDFButton from "../components/GenereatePdfButton.jsx";

const CustomerDetails = () => {
    const {id} = useParams();  // Getting the customer id from the URL params
    const [customers, setCustomers] = useState(new Customers())
    const [showEstimateForm, setShowEstimateForm] = useState(false)
    const [showEstimateEditForm, setShowEstimateEditForm] = useState(false)
    const [entryToEditCustomerId, setEntryToEditCustomerId] = useState('');
    const [entryToEditId, setEntryToEditId] = useState('');
    const customer = customers.customers.find(cus => cus.id === id);
    const estimateEntries = customer.contract.estimationEntries;

    const entryToEdit = customer.contract.estimationEntries.find(
        (entry) => entry.id === entryToEditId
    );


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

    const handleEditClick = (customerId, entryId) => {
        if (!customer || !customer.contract) {
            console.error("Customer or contract not found.");
            return;
        }
        setEntryToEditCustomerId(customerId);
        setEntryToEditId(entryId);
        console.log(entryToEditCustomerId, entryToEditId)
        setShowEstimateEditForm(true)
    }

    const handleEditEstimate = (customerId, id, newItem, newQuantity, newPrice) => {
        customers.editEstimationEntry(customerId, id, newItem, newQuantity, newPrice);
        setCustomers(new Customers(customers.customers))
    }

    const handShowEstimateForm = () => {
        setShowEstimateForm(!showEstimateForm);
    };


    if (!customer) {
        return <div>Customer not found</div>;
    }
    return (
        <>
            <div className="container mt-2">
                <div className="text-end mt-3">
                    <Link
                        to="/"
                        className="btn btn-dark fs-6"
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
                                <h3 className="card-title">
                                    <i className="bi bi-person-fill me-2"></i>
                                    {customer.name}
                                </h3>
                                <hr/>
                                <p className="card-text">
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    <strong>Contact:</strong> {customer.contact}
                                </p>
                                <p className="card-text">
                                    <i className="bi bi-geo-alt-fill me-2"></i>
                                    <strong>Address:</strong> {customer.address}
                                </p>
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
                                <hr/>
                                {customer.contract ? (
                                    <div>
                                        <p className="mb-1">
                                            <i className="bi bi-text-paragraph me-2"></i>
                                            <strong>Description:</strong> {customer.contract.description}
                                        </p>
                                        <p>
                                            <i className="bi bi-geo-fill me-2"></i>
                                            <strong>Site:</strong> {customer.contract.site}
                                        </p>


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
                            className="btn btn-dark btn-lg"
                            onClick={handShowEstimateForm} // Example usage
                        >
                            <i className="bi bi-calculator-fill me-2"></i>
                            {showEstimateForm ? 'Close Form' : 'Make Estimate'}
                        </button>
                    </div>
                </div>
                <p className="d-block d-sm-none text-center mt-5">
                    <span className="bi bi-arrow-left-circle me-2"></span>
                    Scroll left and right to see full table
                    <span className="bi bi-arrow-right-circle ms-2"></span>
                </p>
                {estimateEntries && estimateEntries.length > 0 ?
                    <>
                        <EstimatesTable
                            estimateEntries={estimateEntries}
                            onDeleteEntry={handleDeleteEstimate}
                            customerId={customer.id}
                            onClickEdit={handleEditClick}
                        />
                    </>
                    :
                    <h3 className="text-muted">No Estimate Entries</h3>
                }

                {/* Estimate Form */}
                {customer.contract && showEstimateForm && (
                    <EstimateForm customerId={customer.id} onAddEstimation={handleAddEstimate}/>
                )}

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

                <Toast/>
            </div>
            <PDFContainer customer={customer} estimateEntries={estimateEntries} />
            <GeneratePDFButton customer={customer} />
        </>
    )
        ;
};

export default CustomerDetails;
