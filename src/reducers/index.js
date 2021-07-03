import invoices from "./invoices";
import invoicesID from "./invoicesID";
import user from "./user";
import userID from "./userID";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    invoices,
    invoicesID,
    user,
    userID
});

export default rootReducer;

