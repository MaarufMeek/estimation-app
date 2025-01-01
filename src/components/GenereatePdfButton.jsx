import React from 'react';
import html2pdf from 'html2pdf.js';

const GeneratePDFButton = ({customer}) => {
    const generatePDF = () => {
        const element = document.getElementById('pdf-content');

        const options = {
            margin: 0.5,
            filename: `${customer.name}_Estimate.pdf`,
            image: {type: 'jpeg', quality: 1.0}, // Maximize quality
            html2canvas: {scale: 8}, // Increase the scale for higher resolution
            jsPDF: {unit: 'in', format: 'A4', orientation: 'portrait'},
        };


        html2pdf().set(options).from(element).save();
    };

    return (
        <div className="mb-5 text-center">
            <button
                className="btn btn-dark btn-lg "
                onClick={generatePDF}
            >
                <i className="bi bi-file-earmark-pdf-fill me-2"></i>
                Download Estimates as PDF
            </button>
        </div>

    );
};

export default GeneratePDFButton;
