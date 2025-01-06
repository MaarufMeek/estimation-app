import {Toast} from "bootstrap";


export function showToast(message, type = "info") {
    const toastElement = document.getElementById("toast");
    const toastBody = toastElement.querySelector(".toast-body");

    toastBody.textContent = message;

    // Set the toast color based on alert type
    const toastHeader = toastElement.querySelector(".toast-header");
    if (type === "success") {
        toastHeader.classList.add("bg-success");
        toastHeader.classList.remove("bg-danger", "bg-warning");
    } else if (type === "error") {
        toastHeader.classList.add("bg-danger");
        toastHeader.classList.remove("bg-success", "bg-warning");
    } else {
        toastHeader.classList.add("bg-warning");
        toastHeader.classList.remove("bg-danger", "bg-success");
    }

    // Show the toast using Bootstrap's Toast API
    const toast = new Toast(toastElement, {
        delay: 2000,
    });
    toast.show();
}

export class Customer {
    constructor(name, contact, address) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.contact = contact;
        this.address = address;
        this.contract = null; // Holds a single contract
    }

    addContract(name, description, site, date) {
        this.contract = Contract(name, description, site, date);
    }
}

// contract object
const Contract = (name, description, site, date) => ({
    name,
    description,
    site,
    date,
    estimationEntries: [], // Holds estimation entries

    addEstimationEntry(itemName, quantity, unitPrice) {
        const entry = {
            id: crypto.randomUUID(),
            itemName,
            quantity,
            unitPrice,
            total: quantity * unitPrice,
        };
        this.estimationEntries.push(entry);
    },

    deleteEstimationEntry(entryId) {
        // get entry index
        const index = this.estimationEntries.findIndex(entry => entry.id === entryId);
        //delete
        if (index !== -1) {
            this.estimationEntries.splice(index, 1);
        }
    }
});

export class Customers {
    constructor() {
        this.customers = this.loadCustomersFromLocalStorage();
    }

    saveCustomersToLocalStorage() {
        localStorage.setItem('customers', JSON.stringify(this.customers));
    }

    loadCustomersFromLocalStorage() {
        const customerJson = localStorage.getItem('customers');
        if (customerJson) {
            const customerData = JSON.parse(customerJson);
            return customerData.map(cus => {
                const customer = new Customer(cus.name, cus.contact, cus.address);
                customer.id = cus.id;

                // Rehydrate the contract as a single object
                if (cus.contract) {
                    customer.contract = Contract(
                        cus.contract.name,
                        cus.contract.description,
                        cus.contract.site,
                        cus.contract.date
                    );
                    customer.contract.estimationEntries = cus.contract.estimationEntries || [];
                }

                return customer;
            });
        }
        return [];
    }

    addCustomer(name, contact, address, contractName, contractDescription, contractSite, contractDate) {
        if (!name || !contact || !address || !contractName || !contractDescription || !contractDate) {
            console.error('All fields must be filled');
            return;
        }

        const newCustomer = new Customer(name, contact, address);
        newCustomer.addContract(contractName, contractDescription, contractSite, contractDate);

        this.customers.push(newCustomer);
        this.saveCustomersToLocalStorage();
    }

   deleteCustomer(cusId) {
    if (!cusId) {
        showToast("Invalid customer ID", 'error');
        return;
    }

    const index = this.customers.findIndex(customer => customer.id === cusId);
    console.log(index, this.customers[index])

    if (index !== -1) { // Check if a valid index is found
        this.customers.splice(index, 1); // Remove the customer
        this.saveCustomersToLocalStorage();
        showToast('Customer deleted!', 'success');
    } else {
        showToast('Customer not found!', 'error');
    }
}


    addEstimate(customerId, itemName, quantity, unitPrice) {
        const customer = this.customers.find(cus => cus.id === customerId);
        if (!customer) {
            console.error('Customer not found');
            return;
        }

        const {contract} = customer;
        if (!contract) {
            console.error('Contract not found');
            return;
        }

        contract.addEstimationEntry(itemName, quantity, unitPrice);
        this.saveCustomersToLocalStorage();
        showToast("Entry added!", "success")
    }

    deleteEntry(customerId, entryId) {
        const customer = this.customers.find(cus => cus.id === customerId);
        if (!customer || !customer.contract) {
            console.error('Customer or contract not found');
            showToast("Customer or contract not found", 'error');
            return;
        }
        const entries = customer.contract.estimationEntries;

        if (!entryId) {
            showToast("Invalid entry ID", 'error');
            console.error('Invalid entry ID');
            return;
        }

        if (entries.length === 0) {
            showToast("No entries", 'error');
            return;
        }

        const entry = entries.find(ent => ent.id === entryId);
        if (!entry) {
            console.error("Entry not found");
            return;
        }


        customer.contract.deleteEstimationEntry(entryId);
        this.saveCustomersToLocalStorage();
        showToast('Entry deleted!', 'success');
    }

    // Edit a customer's basic information (name, contact, address)
    editCustomer(customerId, newName, newContact, newAddress) {
        const customer = this.customers.find(cus => cus.id === customerId);
        if (!customer) {
            console.error('Customer not found');
            return;
        }

        // Update customer details
        customer.name = newName || customer.name;
        customer.contact = newContact || customer.contact;
        customer.address = newAddress || customer.address;

        this.saveCustomersToLocalStorage();
        showToast('Customer updated!', 'success');
    }

    // Edit the contract details of a customer
    editContract(customerId, newName, newDescription, newSite, newDate) {
        const customer = this.customers.find(cus => cus.id === customerId);
        if (!customer) {
            console.error('Customer not found');
            return;
        }

        const contract = customer.contract;
        if (!contract) {
            console.error('Contract not found');
            return;
        }

        // Update contract details
        contract.name = newName || contract.name;
        contract.description = newDescription || contract.description;
        contract.site = newSite || contract.site;
        contract.date = newDate || contract.date;

        this.saveCustomersToLocalStorage();
        showToast('Contract updated!', 'success');
    }

    // Edit an estimation entry within a contract
    editEstimationEntry(customerId, entryId, newItemName, newQuantity, newUnitPrice) {
        const customer = this.customers.find(cus => cus.id === customerId);
        if (!customer || !customer.contract) {
            console.error('Customer or contract not found');
            showToast("Customer or contract not found", 'error');
            return;
        }

        const {estimationEntries} = customer.contract;

        const entry = estimationEntries.find(ent => ent.id === entryId);
        if (!entry) {
            console.error('Estimation entry not found');
            showToast('Estimation entry not found', 'error');
            return;
        }

        // Update the entry details
        entry.itemName = newItemName || entry.itemName;
        entry.quantity = newQuantity || entry.quantity;
        entry.unitPrice = newUnitPrice || entry.unitPrice;
        entry.total = entry.quantity * entry.unitPrice;

        this.saveCustomersToLocalStorage();
        showToast('Estimation entry updated!', 'success');
    }

}

export const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
};

export function scrollToSection(sectionID) {
    const section = document.getElementById(sectionID);
    section.scrollIntoView({behavior: 'smooth'});
}







