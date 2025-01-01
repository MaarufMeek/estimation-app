import React from "react";
import './index.css';
import { HashRouter, Route, Routes } from "react-router-dom";
import CustomerDetails from "./pages/CustomerDetails.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/customer/:id" element={<CustomerDetails />} />
            </Routes>
        </HashRouter>
    );
};

export default App;
