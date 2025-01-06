import 'react';
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';

const GeneratePDFButton = (p) => {
    const generatePDF = () => {
        const element = document.getElementById('pdf-content');

        const options = {
            margin: 0.85,
            filename: `${p.customer.name}_estimate.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 3 }, // Increase the scale for higher resolution
            jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' },
        };

        html2pdf()
            .set(options)
            .from(element)
            .outputPdf('blob') // Output as a Blob
            .then((pdfBlob) => {
                // Use FileSaver.js to download the file
                saveAs(pdfBlob, `${p.customer.name}_estimate.pdf`);
            })
            .catch((err) => {
                console.error('PDF generation failed:', err);
            });
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
