function NavBar(p) {

    return (
        <div className="container">
            <nav className="navbar bg-body fixed-top">
                <div className=" container container-fluid d-flex flex-column flex-md-row text-center mb-md-2">
                    <h1 className="fw-bold text-black mb-md-0">Estimation App</h1>
                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-sm btn-dark"
                            id="add-customer"
                            onClick={p.onAddCustomer}
                        >
                            <i className={`bi ${p.onShowCustomer ? 'bi-chevron-up' : 'bi-person-plus-fill'}`}></i>
                            <span className="ms-2">
                            {p.onShowCustomer ? 'Close form' : 'Add customer'}
                        </span>
                        </button>
                    </div>
                </div>
            </nav>
        </div>


    )
}

export default NavBar;