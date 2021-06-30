import invoices from "./invoices";
import invoicesID from "./invoicesID";
import user from "./user";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    invoices,
    invoicesID,
    user
});

export default rootReducer;

