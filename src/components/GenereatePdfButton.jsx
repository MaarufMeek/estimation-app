import 'react';
import html2pdf from 'html2pdf.js';

const GeneratePDFButton = (p) => {
    const generatePDF = () => {
        const element = document.getElementById('pdf-content');

        const options = {
            margin: 0.5,
            filename: `${p.customer.name}_estimate.pdf`,
            image: {type: 'jpeg', quality: 0.98}, // Maximize quality
            html2canvas: {scale: 6}, // Increase the scale for higher resolution
            jsPDF: {unit: 'in', format: 'A4', orientation: 'portrait'},
            worker: true,
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
