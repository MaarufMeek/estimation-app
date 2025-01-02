import 'react';

const ConfirmDeleteModal = (p) => {
    if (!p.show) return null;

    return (
        <div className="modal d-block" tabIndex="-1"
             style={{
                 backgroundColor: 'rgba(0,0,0,0.63)',
                 zIndex: '9999',
             }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={p.onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this Customer?</p>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={p.onConfirm}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={p.onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
