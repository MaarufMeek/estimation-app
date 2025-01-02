import React, { useState } from "react";

const CustomerForm = (p) => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        contractName: "",
        contractDescription: "",
        contractSite: "",
        contractDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (p.onSubmit) p.onSubmit(formData);

        // Reset the form
        setFormData({
            name: "",
            contact: "",
            address: "",
            contractName: "",
            contractDescription: "",
            contractSite: "",
            contractDate: "",
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Customer name"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="contact" className="form-label fw-bold">Contact</label>
                <input
                    type="text"
                    placeholder="Contact"
                    className="form-control"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label fw-bold">Address</label>
                <input
                    type="text"
                    placeholder="Address / Town"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="contractName" className="form-label fw-bold">Contract Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Job name"
                    id="contractName"
                    name="contractName"
                    value={formData.contractName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="contractDescription" className="form-label fw-bold">Contract Description</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Job description"
                    id="contractDescription"
                    name="contractDescription"
                    value={formData.contractDescription}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="contractSite" className="form-label fw-bold">Contract Site</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Job site"
                    id="contractSite"
                    name="contractSite"
                    value={formData.contractSite}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="contractDate" className="form-label fw-bold">Contract Date</label>
                <input
                    type="date"
                    className="form-control"
                    placeholder="Date"
                    id="contractDate"
                    name="contractDate"
                    value={formData.contractDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="justify-content-center d-flex">
                <button type="submit" className="btn btn-dark">Add Customer</button>
            </div>
        </form>




    );
};

export default CustomerForm;
