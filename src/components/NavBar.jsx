function NavBar({onAddCustomer, onShowCustomer}) {

    return (
        <nav className="navbar bg-body fixed-top">
            <div className="container-fluid d-flex flex-column flex-md-row text-center mb-md-2">
                <h1 className="fw-bold text-black mb-md-0">Estimate</h1>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-sm btn-dark"
                        id="add-customer"
                        onClick={onAddCustomer}
                    >
                        <i className={`bi ${onShowCustomer ? 'bi-chevron-up' : 'bi-person-plus-fill'}`}></i>
                        <span className="ms-2">
                            {onShowCustomer ? 'Close form' : 'Add customer'}
                        </span>
                    </button>
                    <button className="btn btn-sm btn-dark" id="clear">Clear</button>
                </div>
            </div>
        </nav>

    )
}

export default NavBar;