export const pushNewInvoice = (payload) => {
    return {
        type : "PUSH_NEW_INVOICE",
        payload : payload
    };
};

export const deleteInvoice = (id) => {
    return {
        type : "DELETE_INVOICE",
        payload : id
    };
};

export const markAsPaid = (id) => {
    return {
        type : "MARK_AS_PAID",
        payload : id
    };
};

export const createNewInvoiceID = () => {
    return {
        type : "INCREMENT"
    };
};

export const logIn = (user) => {
    return {
        type : "LOG_IN",
        payload : user
    };
};


export const deleteAllInvoices = () => {
    return {
        type : "DELETE_ALL_INVOICES"
    };
};