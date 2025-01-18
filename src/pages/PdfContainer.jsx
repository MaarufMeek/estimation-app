import 'react';
import styles from '../pdfStyles.module.css';

const PDFContainer = (p) => {
    const firstPageRows = (rows) => {
        if (rows <= 17) return rows;
        if (rows >= 18 && rows <= 21) return rows; // To fit 60px margin
        return 22; // Default for larger rows
    };

    const subsequentPageRows = (rows) => {
        if (rows <= 26) return rows;
        if (rows >= 27 && rows <= 33) return rows; // To fit 60px margin
        return 34; // Default for larger rows
    };

    // Group rows into pages
    const groupedEntries = [];
    let currentIndex = 0;

    // Handle the first page
    const rowsForFirstPage = firstPageRows(p.estimateEntries.length);
    groupedEntries.push(p.estimateEntries.slice(currentIndex, currentIndex + rowsForFirstPage));
    currentIndex += rowsForFirstPage;

    // Handle subsequent pages
    while (currentIndex < p.estimateEntries.length) {
        const rowsForPage = subsequentPageRows(p.estimateEntries.length - currentIndex);
        groupedEntries.push(p.estimateEntries.slice(currentIndex, currentIndex + rowsForPage));
        currentIndex += rowsForPage;
    }

    const cellStyle = {
        padding: '2px 6px',
        border: '0.5px solid black',
        fontSize: '14px',
        borderCollapse: 'collapse',
        borderWidth: '0.5px',
    };
    const tbTh = {
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'white',
        textAlign: 'center',
        padding: '1px',
        fontWeight: 'normal',
        border: '0.5px solid black',
        borderCollapse: 'collapse',
        borderWidth: '0.5px',
    };

    const calculateMarginBottomFirstPage = (totalRows) => {
        // Logic for first page
        //adjust margin bottom dynamically to push Client Approval section to the next page.
        if (totalRows === 18) return '130px';
        if (totalRows === 19) return '100px';
        if (totalRows === 20) return '80px';
        if (totalRows === 21) return '60px';

        return '30px';
    };

    const calculateMarginBottomRest = (totalRows) => {
        //Logic for subsequent pages
        //adjust margin bottom dynamically to push Client Approval section to the next page.
        const baseRow = 34;  //max row for rest of pages after the first page
    
        let xsRowA = 18;
        let xsRowB = 19;
        let xsRowC = 20;
        let xsRowD = 21;

        while (totalRows > 0) {
            if (totalRows === xsRowA + baseRow) {
                xsRowA += baseRow; // Update xsRowA dynamically
                return '130px';
            }
            if (totalRows === xsRowB + baseRow) {
                xsRowB += baseRow; // Update xsRowB dynamically
                return '100px';
            }
            if (totalRows === xsRowC + baseRow) {
                xsRowC += baseRow; // Update xsRowC dynamically
                return '80px';
            }
            if (totalRows === xsRowD + baseRow) {
                xsRowD += baseRow; // Update xsRowD dynamically
                return '60px';
            }

            totalRows -= baseRow; // Decrease totalRows to handle subsequent iterations
        }
        return '30px';
    };


    return (
        <div className="container" id="pdf-content" style={{padding: '20px', lineHeight: '1.6', marginTop: '0'}}>
            <h1 className={`mt-0 ${styles.estimate}`}>ESTIMATE</h1>
            <h1 className={`my-0 ${styles.entName}`}>KASULI GLASS AND & ALUMINIUM WORKS</h1>
            <h1 className={`my-0 ${styles.contacts}`}>
                <i className="bi bi-telephone-fill fs-5"></i> Contact: 0547034628 / 0508224178 / yakubuabdulai@gmail.com
            </h1>
            <h1 className={`my-0 ${styles.location}`}>
                <i className="bi bi-geo-alt-fill fs-5"></i> Location: Kasalgu
            </h1>
            <hr/>
            <div className="d-flex align-content-between justify-content-between">
                <div className={`w-50 ${styles.dFont}`}>
                    <p className="my-0 mt-1 fw-bolder">Estimate for:</p>
                    <p className="my-0 mt-1 fw-light">Customer Name: <span
                        className="fw-semibold">{p.customer.name}</span></p>
                    <p className="my-0 fw-light">Contact: <span className="fw-semibold font">{p.customer.contact}</span>
                    </p>
                    <p className="my-0 fw-light">Address: <span className="fw-semibold">{p.customer.address}</span></p>
                </div>
                <div className={`w-50 ${styles.dFont} text-end`}>
                    <p className="my-0 mt-1 fw-bolder">Project Details</p>
                    <p className="my-0 mt-1 fw-light">Project Name: <span
                        className="fw-semibold">{p.customer.contract.name}</span></p>
                    <p className="my-0 fw-light">Description: <span
                        className="fw-semibold">{p.customer.contract.description}</span></p>
                    <p className="my-0 fw-light">Site: <span className="fw-semibold">{p.customer.contract.site}</span>
                    </p>
                </div>
            </div>

            {groupedEntries.map((entries, pageIndex) => (
                <div
                    key={pageIndex}
                    style={{
                        marginBottom:
                            pageIndex === 0 ? calculateMarginBottomFirstPage(p.estimateEntries.length)
                                : pageIndex > 0 ? calculateMarginBottomRest(p.estimateEntries.length)
                                    : '30px',
                    }}
                >
                    <table
                        style={{
                            width: '100%',
                            marginTop: '20px',
                            borderCollapse: 'collapse',
                            borderWidth: '1px',
                        }}
                    >
                        <thead>
                        <tr>
                            <th style={tbTh}>#</th>
                            <th style={tbTh}>Item Name</th>
                            <th style={tbTh}>Quantity</th>
                            <th style={tbTh}>Unit Price</th>
                            <th style={tbTh}>Total <span className={styles.cedi}>(GHS)</span></th>
                        </tr>
                        </thead>
                        <tbody className="fs-6">
                        {entries.map((entry, index) => {
                            const rowIndex = pageIndex === 0 ? index + 1 :
                                rowsForFirstPage + (pageIndex - 1) * 34 + (index + 1);

                            return (
                                <tr key={index}>
                                    <td style={{...cellStyle, width: '20px'}}>{rowIndex}</td>
                                    <td style={{...cellStyle, width: '45%', minWidth: '100px'}}>{entry.itemName}</td>
                                    <td style={{...cellStyle, width: '15%', minWidth: '30px'}} className="text-center">
                                        {entry.quantity}
                                    </td>
                                    <td style={{...cellStyle, width: '20%', minWidth: '50px'}} className="text-center">
                                        {entry.unitPrice.toFixed(2)}
                                    </td>
                                    <td style={{...cellStyle, width: '20%', minWidth: '30px'}} className="text-end">
                                        {entry.total.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
            ))}

            <div className="d-flex align-content-between justify-content-between">
                <div>
                    <p className="fw-bold my-0">CLIENT APPROVAL:</p>
                    <p className="fw-normal my-0 mt-2">
                        Date:<strong>{new Intl.DateTimeFormat('en-UK').format(new Date())}</strong>
                    </p>
                    <p className="fw-semibold my-0 mt-4">
                        Signature:
                        <span className={styles.underline}></span>
                    </p>
                </div>
                <div className={styles.total}>
                    <h3 className="mt-3 fw-bolder">Total</h3>
                    <h3 className="text-end bg-dark text-white fs-3 p-2">
                        <span className="fs-6">GHS</span>{' '}
                        {p.estimateEntries.reduce((total, entry) => total + entry.total, 0).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default PDFContainer;
