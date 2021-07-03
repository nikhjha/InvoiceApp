export const pushNewInvoice = (payload) => {
    return {
        type : "PUSH_NEW_INVOICE",
        payload : payload
    };
};

export const loadNewInvoices = (payload) => {
    return {
        type : "LOAD_NEW_INVOICES",
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

export const createNewInvoiceIDFrom = (payload) => {
    return {
        type : "CREATE_INVOICE_ID_FROM",
        payload : payload
    };
}

export const signIn = () => {
    return {
        type : "SIGN_IN"
    };
};

export const logOut = () => {
    return {
        type : "LOG_OUT"
    };
};

export const setUser = (payload) => {
    return {
        type : "SET_USER",
        payload : payload
    };
};


export const updateUserData = (payload) => {
    return {
        type : "UPDATE_USER_DATA",
        payload : payload
    };
};

export const modifyUserData = (payload) => {
    return {
        type : "MODIFY_USER_DATA",
        payload : payload
    };
};
