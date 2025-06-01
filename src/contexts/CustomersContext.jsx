import {createContext, useState} from "react";
import {Customers} from "../app-logic.js";


const customerContext = createContext();

export  const CustomerProvider = ({children}) => {
    const [customers, setCustomers] = useState(new Customers());

    return <Customer
}