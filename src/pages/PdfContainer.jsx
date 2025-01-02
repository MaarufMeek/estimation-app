import React from 'react';

import styles from '../pdfStyles.module.css'

const PDFContainer = ({customer, estimateEntries}) => {
    const cellStyle = {
        padding: '1px 6px',
        border: '1px solid black',
        fontSize: '14px',
        borderCollapse: 'collapse',
        borderWidth: '1px',
    };
    const tbTh = {
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'white',
        textAlign: 'center',
        padding: '1px',
        fontWeight: 'bold',
        border: '1px solid black',
        borderCollapse: 'collapse',
        borderWidth: '1px',
    };


    return (
        <div id="pdf-content" style={{padding: '20px', lineHeight: '1.6',}}>
            <h1 className={`mt-0 ${styles.estimate}`}>ESTIMATE</h1>
            <h1 className={`my-0 ${styles.entName}`}>KASULI GLASS AND & ALUMINIUM WORKS</h1>
            <h1 className={`my-0 ${styles.contacts}`}><i className="bi bi-telephone-fill fs-5"></i> Contact: 0547034628
                / 0508224178 / yakubuabdulai@gmail.com</h1>
            <h1 className={`my-0 ${styles.location}`}><i className="bi bi-geo-alt-fill fs-5"></i> Location: Kasalgu</h1>
            <hr/>
            <div className="d-flex align-content-between justify-content-between">
                <div>
                    <p className="my-0 mt-1 fw-bolder">Estimate for:</p>
                    <p className="my-0 mt-1">Customer Name: <strong>{customer.name}</strong></p>
                    <p className="my-0">Contact: <strong>{customer.contact}</strong></p>
                    <p className="my-0">Address: <strong>{customer.address}</strong></p>
                </div>
                <div className="text-end">
                    <p className="my-0 mt-1 fw-bolder">Project Details</p>
                    <p className="my-0 mt-1">Project Name: <strong>{customer.contract.name}</strong></p>
                    <p className="my-0">Description: <strong>{customer.contract.description}</strong></p>
                    <p className="my-0">site: <strong>{customer.contract.site}</strong></p>
                </div>
            </div>

            <div>
                <table style={{
                    width: '100%',
                    marginTop: '20px',
                    borderCollapse: 'collapse',
                    borderWidth: '1px',
                }}>
                    <thead>
                    <tr>
                        <th style={tbTh}>#</th>
                        <th style={tbTh}>Item Name</th>
                        <th style={tbTh}>Quantity</th>
                        <th style={tbTh}>Unit Price (GHS)</th>
                        <th style={tbTh}>Total (GHS)</th>
                    </tr>
                    </thead>
                    <tbody className="fs-6">
                    {estimateEntries.map((entry, index) => (
                        <tr key={index}>
                            <td style={{...cellStyle, width: '20px'}}>{index + 1}</td>
                            <td style={{...cellStyle, width: '45%', minWidth: '100px'}}>{entry.itemName}</td>
                            <td style={{...cellStyle, width: '15%', minWidth: '30px'}}
                                className="text-center">{entry.quantity}</td>
                            <td style={{...cellStyle, width: '20%', minWidth: '50px'}}
                                className="text-center">{entry.unitPrice.toFixed(2)}</td>
                            <td style={{...cellStyle, width: '20%', minWidth: '30px'}}
                                className="text-end">{(entry.total).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex align-content-between justify-content-between">
                <div>
                    <p className="fw-bold my-0 mt-3">CLIENT APPROVAL:</p>
                    <p className="fw-normal my-0 mt-2">
                        Date:<strong> {new Intl.DateTimeFormat('en-UK', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                    }).format(new Date())} </strong>
                    </p>
                    <p className="fw-bold my-0 mt-4">
                        Signature:
                        <span className={styles.underline}></span>
                    </p>

                </div>
                <div className={styles.total}>
                    <h3 className="mt-3">Total</h3>
                    <h3 className="text-end bg-dark text-white fs-3 p-2">
                        GHS {estimateEntries.reduce((total, entry) =>
                        total + entry.total, 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                    </h3>
                </div>

            </div>
        </div>
    );
};

export default PDFContainer;
