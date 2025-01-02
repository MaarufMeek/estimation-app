import {useEffect, useState} from "react";


const EstimateEdit = (p) => {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);

     useEffect(() => {
        setItemName(p.initialItemName || "");
        setQuantity(p.initialQuantity || 0);
        setUnitPrice(p.initialUnitPrice || 0);
    }, [p.initialItemName, p.initialQuantity, p.initialUnitPrice]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!itemName || !quantity || !unitPrice) {
            alert('All fields are required');
            return;
        }

        p.onSubmitEdit(p.customerId, p.entryId, itemName, quantity, unitPrice);
        setItemName('');
        setQuantity(0);
        setUnitPrice(0);

        p.onClose(false)
    };

    return (
        <>
            <div className="edit-form">
                <span className="close-btn" id="closeBtn" role="button" onClick={() => p.onClose(false)}>&times;</span>
                <form className="g-2 align-items-center mt-2 mb-5" onSubmit={handleSubmit}>
                    {/* Item Name */}
                    <h3 className="text-center">Edit Entry</h3>
                    <div className="col-12">
                        <label htmlFor="itemName" className="form-label fs-6 fw-semibold">
                            Item Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="itemName"
                            placeholder="Item Name"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Quantity */}
                    <div className="col-12">
                        <label htmlFor="quantity" className="form-label fs-6 fw-semibold">
                            Quantity
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            required
                        />
                    </div>

                    {/* Unit Price */}
                    <div className="col-12">
                        <label htmlFor="unitPrice" className="form-label fs-6 fw-semibold">
                            Unit Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="unitPrice"
                            placeholder="Unit Price"
                            value={unitPrice}
                            onChange={(e) => setUnitPrice(Number(e.target.value))}
                            required
                        />
                    </div>

                    {/* Submit Button */}
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

export default EstimateEdit;