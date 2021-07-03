import firebase, {auth,db} from "../firebase";
import {updateUserData } from "../action";

const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch((error) => {console.log(error)});
};

const logOut = () => {
     auth.signOut();
}

const modifyUser = async(store,data) => {
    if(store.getState().userID){
        const userData = await db.collection("users").where("userID", "==", store.getState().userID).limit(1).get();
        const userDoc = userData.docs[0];
        const currentUser = data;
        const tmpdata = {...userDoc.data(), name: currentUser.name, detail : currentUser.userDetail, address : currentUser.userAddress};
        userDoc.ref.update(tmpdata);
    }
    store.dispatch(updateUserData(data));
}

const pushNewInvoice = async(store,data) => {
    if(store.getState().userID){
        const userData = await db.collection("users").where("userID", "==", store.getState().userID).limit(1).get();
        const userDoc = userData.docs[0];
        const invoiceData = data;
        const tmpdata = {...userDoc.data(),invoices : [...userDoc.data().invoices, invoiceData]};
        userDoc.ref.update(tmpdata);
    }
}

const deleteInvoice = async(store,invoiceID) => {
    if(store.getState().userID){
        const userData = await db.collection("users").where("userID", "==", store.getState().userID).limit(1).get();
        const userDoc = userData.docs[0];
        const invoiceData = userDoc.data().invoices.filter(invoice => invoice.invoiceID !== invoiceID);
        const tmpdata = {...userDoc.data(),invoices : [...invoiceData]};
        userDoc.ref.update(tmpdata);
    }
}

const markAsPaid = async(store,invoiceID) => {
    if(store.getState().userID){
        const userData = await db.collection("users").where("userID", "==", store.getState().userID).limit(1).get();
        const userDoc = userData.docs[0];
        const invoiceData = userDoc.data().invoices.map((invoice)=>{
            if(invoice.invoiceID === invoiceID){
                return {...invoice, paid : true};
            }
            return invoice
        });
        const tmpdata = {...userDoc.data(),invoices : [...invoiceData]};
        userDoc.ref.update(tmpdata);
    }
}


const reduxMiddleware =  store => next => action => {
    switch(action.type){
        case "SIGN_IN" :
            signIn(store);
            break;
        case "LOG_OUT" :
            logOut();
            break; 
        case "MODIFY_USER_DATA":
            modifyUser(store,action.payload);
            break;   
        case "PUSH_NEW_INVOICE":
            pushNewInvoice(store,action.payload);
            next(action);
            break;
        case "DELETE_INVOICE":
            deleteInvoice(store,action.payload);
            next(action);
            break;
        case "MARK_AS_PAID":
            markAsPaid(store,action.payload);
            next(action);
            break;    
        default :
            next(action);    
    }
};

export default reduxMiddleware;