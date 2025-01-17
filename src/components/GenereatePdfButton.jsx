import  { useState } from "react";
import html2pdf from "html2pdf.js";
import { saveAs } from "file-saver";

const GeneratePDFButton = (p) => {
    const [isLoading, setIsLoading] = useState(false);

    const generatePDF = () => {
        setIsLoading(true); // Set loading state to true when the process starts
        const element = document.getElementById("pdf-content");

        const options = {
            margin: 0.8,
            filename: `${p.customer.name}_estimate.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 5 },
            jsPDF: { unit: "in", format: "A4", orientation: "portrait" },
        };

        html2pdf()
            .set(options)
            .from(element)
            .outputPdf("blob")
            .then((pdfBlob) => {
                saveAs(pdfBlob, `${p.customer.name}_estimate.pdf`);
                setIsLoading(false); // Set loading state to false when done
            })
            .catch((err) => {
                console.error("PDF generation failed:", err);
                setIsLoading(false); // Set loading state to false if there's an error
            });
    };

    return (
        <div className="mb-5 text-center">
            <button
                className="btn btn-dark btn-lg"
                onClick={generatePDF}
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Generating PDF...
                    </>
                ) : (
                    <>
                        <i className="bi bi-file-earmark-pdf-fill me-2"></i>
                        Download Estimates as PDF
                    </>
                )}
            </button>
        </div>
    );
};

export default GeneratePDFButton;
