
const deleteInvoice = (state,id) =>{
    return state.filter(invoice => invoice.invoiceID !== id);
}

const markAsPaid = (state,id) => {
    return state.map((invoice)=>{
        if(invoice.invoiceID === id){
            return {...invoice, paid : true};
        }
        return invoice
    });
}

const boilerPlateInvoice = [
    {
        invoiceID : 997,
        yourDetail : '647-444-1234 your@email.com yourwebsite.com',
        yourAddress : "1 your address city, state, country zip code",
        clientName : "Client Name",
        clientAddress : "1 client address city, state, country zip code",
        dateOfIssue : '2021-06-18',
        dueDate : '2021-12-31',
        items : [{
            name: "Item's name",
            description: "Description for item",
            cost: 1000,
            quantity: 1,
          }],
        taxPerc : 0,
        notes : [],
        paid : true
    },{
        invoiceID : 998,
        yourDetail : '647-444-1234 your@email.com yourwebsite.com',
        yourAddress : "1 your address city, state, country zip code",
        clientName : "Client Name 2",
        clientAddress : "1 client address city, state, country zip code",
        dateOfIssue : '2021-06-18',
        dueDate : '2021-06-17',
        items : [{
            name: "Item's name",
            description: "Description for item",
            cost: 100,
            quantity: 1,
          }],
        taxPerc : 10,
        notes : [],
        paid : false
    },{
        invoiceID : 999,
        yourDetail : '647-444-1234 your@email.com yourwebsite.com',
        yourAddress : "1 your address city, state, country zip code",
        clientName : "Client Name 3",
        clientAddress : "1 client address city, state, country zip code",
        dateOfIssue : '2021-06-18',
        dueDate : '9999-12-31',
        items : [{
            name: "Item's name",
            description: "Description for item",
            cost: 1000,
            quantity: 1,
          }],
        taxPerc : 25,
        notes : [],
        paid : false
    }
];


const invoices = (state = [...boilerPlateInvoice], action) => {
    switch(action.type){
        case "PUSH_NEW_INVOICE":
            return [...state, action.payload];
        case "DELETE_INVOICE":
            return [...deleteInvoice(state,action.payload)];
        case "DELETE_ALL_INVOICES":
            return [];
        case "MARK_AS_PAID":
            return [...markAsPaid(state,action.payload)];
        default :
            return state;
    }
}

export default invoices;