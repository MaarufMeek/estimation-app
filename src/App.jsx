import React  from "react";
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";  // Import Router, Routes, and Route
import CustomerDetails from "./pages/CustomerDetails.jsx";
import Home from "./pages/Home.jsx";
import PDFContainer from "./pages/PdfContainer.jsx";  // Import the CustomerDetails component

const App = () => {

    return (
        <BrowserRouter>  {/* Wrap the app with Router to enable routing */}

            {/* Define Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customer/:id" element={<CustomerDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
