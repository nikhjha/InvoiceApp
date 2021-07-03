const invoicesID = (state = 1000, action) => {
    switch(action.type){
        case "INCREMENT":
            return state + 1;
        case "CREATE_INVOICE_ID_FROM":
            return action.payload;
        default :
            return state;
    }
}

export default invoicesID;