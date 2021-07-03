import React, { useEffect, useRef } from "react";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, updateUserData, loadNewInvoices, createNewInvoiceIDFrom } from "../action";
import { db } from "../firebase";
import {ghostUser} from "../reducers/user";
import { boilerPlateInvoice } from "../reducers/invoices";
import { useHistory } from "react-router-dom";


const authenticate = async (id,dispatch,userInfo,invoices) => {
  const user = await db
 .collection("users")
 .where("userID", "==", id)
 .limit(1)
 .get();
if (user.docs.length !== 0) {
 const userData = user.docs[0].data();
 dispatch(
   updateUserData({
     name: userData.name,
     userDetail: userData.detail,
     userAddress: userData.address,
   })
 );
 dispatch(loadNewInvoices(userData.invoices));
 const newInvoiceId = userData.invoices.reduce((prev,cur)=>{
   return Math.max(prev,cur.invoiceID);
 },999) + 1;
 dispatch(createNewInvoiceIDFrom(newInvoiceId));
} else {
 const currentUser = userInfo;
 db.collection("users").add({
   name: currentUser.name,
   detail: currentUser.userDetail,
   address: currentUser.userAddress,
   userID: id,
   invoices : [...invoices],
 });
}
};

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const userInfo = useRef(user);
  const invoices = useSelector((state) => state.invoices);
  const invoiceref = useRef(invoices);
  const userID = useSelector((state) => state.userID);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user.uid));
      } else {
        dispatch(setUser(null));
      }
      history.push("/");
    });
    return unsubscribe;
  }, [dispatch,history]);
  useEffect(()=>{    
    if(userID){
      authenticate(userID,dispatch,userInfo.current,invoiceref.current);
    }else{
      dispatch(updateUserData(ghostUser));
      dispatch(loadNewInvoices(boilerPlateInvoice));
    }
  },[userID,dispatch]);
  useEffect(()=>{
    userInfo.current = user;
  },[user])
  useEffect(()=>{
    invoiceref.current = invoices;
  },[invoices])

  return <>{children}</>;
}
