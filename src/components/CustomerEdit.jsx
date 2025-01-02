import {useEffect, useState} from "react";


const CustomerEdit = (p) => {
    const [customerName, setCustomerName] = useState("");
    const [customerContact, setCustomerContact] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');

    useEffect(() => {
        setCustomerName(p.initialCustomertName || "");
        setCustomerContact(p.initialCustomerContact || "");
        setCustomerAddress(p.initialCustomerAddress || "");
    }, [p.initialCustomertName, p.initialCustomerContact, p.initialCustomerAddress]);

    const handleSubmit = (e) => {
        e.preventDefault();

        p.onSubmitEdit(p.customerId, customerName, customerContact, customerAddress);
        setCustomerName('');
        setCustomerContact('');
        setCustomerAddress('');

        p.onClose(false)
    };

    return (
        <>
            <div className="edit-form">
                <span className="close-btn" id="closeBtn" role="button" onClick={() => p.onClose(false)}>&times;</span>
                <form className="g-2 align-items-center mt-2 mb-5" onSubmit={handleSubmit}>
                    {/* Item Name */}
                    <h3 className="text-center">Edit Customer</h3>
                    <div className="col-12">
                        <label htmlFor="name" className="form-label fs-6 fw-semibold">
                            Customer Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="contact" className="form-label fs-6 fw-semibold">
                            Contact
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="contact"
                            placeholder="Contact"
                            value={customerContact}
                            onChange={(e) => setCustomerContact(e.target.value)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="address" className="form-label fs-6 fw-semibold">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            placeholder="Address / Town"
                            value={customerAddress}
                            onChange={(e) => setCustomerAddress(e.target.value)}
                        />
                    </div>

                     <div className="col-12 d-grid mt-4">
                        <button type="submit" className="btn btn-dark">
                            <i className="bi bi-check-circle me-2"></i>Submit
                        </button>
                    </div>
                </form>
            </div>
            <div className="overlay"></div>
        </>
    )
}

export default CustomerEdit;