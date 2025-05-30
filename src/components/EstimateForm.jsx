import {useCallback, useEffect, useRef, useState} from "react";
import "../details.css"
const EstimateForm = (x) => {
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');

    const itemRef = useRef(null);

    useEffect(() => {
        if(x.onShowEstimateForm) itemRef.current.focus();
    }, [x.onShowEstimateForm]);

     const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (!itemName || !quantity || !unitPrice) {
            alert("All fields are required");
            return;
        }

        // Call the parent handler
        x.onAddEstimation(x.customerId, itemName, quantity, unitPrice);

        // Reset fields and refocus
        setItemName("");
        setQuantity("");
        setUnitPrice("");
        itemRef.current.focus();
    }, [itemName, quantity, unitPrice, x]);

    return (
        <form className="row g-2 align-items-center mt-2 mb-5"
              onSubmit={handleSubmit}
              id="estimate-form"
        >
            {/* Item Name */}
            <div className="col-12 col-md-4 fw-bold">
                <label htmlFor="itemName" className="form-label">
                    Item Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    ref={itemRef}
                    id="itemName"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />
            </div>

            {/* Quantity */}
            <div className="col-12 col-md-3 fw-bold">
                <label htmlFor="quantity" className="form-label">
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
            <div className="col-12 col-md-3 fw-bold">
                <label htmlFor="unitPrice" className="form-label">
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
            <div className="col-12 col-md-2 d-grid">
                <label htmlFor="submit" className="form-label">&nbsp;</label>
                <button type="submit" className="btn btn-dark">
                    <i className="bi bi-check-circle me-2" id="submit"></i>Submit
                </button>
            </div>
        </form>
    );
};

export default EstimateForm;
