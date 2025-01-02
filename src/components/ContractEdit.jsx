import {useEffect, useState} from "react";


const ContractEdit = (p) => {
    const [contractName, setContractName] = useState("");
    const [contractDescription, setContractDescription] = useState('');
    const [contractSite, setContractSite] = useState('');
    const [contractDate, setContractDate] = useState('');

    useEffect(() => {
        setContractName(p.initialContractName || "");
        setContractDescription(p.initialContractDescription || "");
        setContractSite(p.initialContractSite || "");
        setContractDate(p.initialContractDate || '');
    }, [p.initialContractName, p.initialContractDescription, p.initialContractSite, p.initialContractDate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        p.onSubmitEdit(p.customerId, contractName, contractDescription, contractSite, contractDate);
        setContractName('');
        setContractDescription('');
        setContractSite('');
        setContractDate('');

        p.onClose(false)
    };

    return (
        <>
            <div className="edit-form">
                <span className="close-btn" id="closeBtn" role="button" onClick={() => p.onClose(false)}>&times;</span>
                <form className="g-2 align-items-center mt-2 mb-5" onSubmit={handleSubmit}>
                    {/* Item Name */}
                    <h3 className="text-center">Edit Contract</h3>
                    <div className="col-12">
                        <label htmlFor="contractName" className="form-label fs-6 fw-semibold">
                            Contract Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="contractName"
                            placeholder="Contract Name"
                            value={contractName}
                            onChange={(e) => setContractName(e.target.value)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="description" className="form-label fs-6 fw-semibold">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Description"
                            value={contractDescription}
                            onChange={(e) => setContractDescription(e.target.value)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="site" className="form-label fs-6 fw-semibold">
                            Site
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="site"
                            placeholder="Site"
                            value={contractSite}
                            onChange={(e) => setContractSite(e.target.value)}
                        />
                    </div>

                     <div className="col-12">
                        <label htmlFor="date" className="form-label fs-6 fw-semibold">
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            placeholder="date"
                            value={contractDate}
                            onChange={(e) => setContractDate(e.target.value)}
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

export default ContractEdit;