import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { markAsPaid, deleteInvoice } from "../../action";
import { pdfGenerationContext } from "../../context/PdfGenerationProvider";
import colourSchema from "../../colourSchema";
import "./dashboard.css";

const MiniInvoice = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const miniInvoiceDiv = useRef();
  const {generatePdfByData} = useContext(pdfGenerationContext);
  const [showUtility, setShowUtility] = useState(false);
  useEffect(() => {
    const dueDate = data.dueDate.split("-").map((st) => {
      return st - "0";
    });
    const today = new Date();
    const isDue =
      dueDate[0] < today.getFullYear() ||
      (dueDate[0] === today.getFullYear() &&
        (dueDate[1] - 1 < today.getMonth() ||
          (dueDate[1] - 1 === today.getMonth() &&
            dueDate[2] < today.getDate())));
    const primaryColour = data.paid
      ? colourSchema.paid.primary
      : isDue
      ? colourSchema.late.primary
      : colourSchema.outstanding.primary;
    const secondaryColour = data.paid
      ? colourSchema.paid.secondary
      : isDue
      ? colourSchema.late.secondary
      : colourSchema.outstanding.secondary;
    miniInvoiceDiv.current.style.setProperty("--primary-colour", primaryColour);
    miniInvoiceDiv.current.style.setProperty(
      "--secondary-colour",
      secondaryColour
    );
  }, [data]);
  return (
    <div className="mini-invoice" ref={miniInvoiceDiv}>
      <p>To</p>
      <p>{data.clientName}</p>
      <p>Due Date</p>
      <p>{data.dueDate}</p>
      <p>
        Total $
        {Math.round(data.items.reduce((pval, cval) => {
          return pval + cval.cost * cval.quantity;
        }, 0) *
          (1 + data.taxPerc / 100))}
      </p>
      <div
        className="mini-invoice-utility-show"
        onClick={() => {
          setShowUtility(true);
        }}
      >
        <span className="material-icons">more_vert</span>
      </div>
      <div
        className="mini-invoice-utility"
        style={{ display: showUtility ? "flex" : "none" }}
      >
        <button
          onClick={() => {
            history.push("/invoice/" + data.invoiceID);
          }}
        >
          Preview
        </button>
        <button
          onClick={() => {
            setShowUtility(false);
            generatePdfByData(data);
          }}
        >
          download
        </button>
        <button
          onClick={() => {
            setShowUtility(false);
            dispatch(markAsPaid(data.invoiceID));
          }}
        >
          Mark as paid
        </button>
        <button
          onClick={() => {
            setShowUtility(false);
            dispatch(deleteInvoice(data.invoiceID));
          }}
        >
          Delete
        </button>
        <button
          onClick={() => {
            setShowUtility(false);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const history = useHistory();
  const invoices = useSelector((state) => state.invoices);
  const calcTotalPaid = (invoices) => {
    return invoices.reduce((pval,cval)=>{
      if(cval.paid){
        return pval + (cval.items.reduce((prevValue,currentValue)=>{
          return prevValue + currentValue.cost*currentValue.quantity;
        },0) * (1 + cval.taxPerc / 100));
      }
      return pval;
    },0);
  }
  const calcTotal = (invoices) => {
    return invoices.reduce((pval,cval)=>{
      if(!cval.paid){
        return pval + (cval.items.reduce((prevValue,currentValue)=>{
          return prevValue + currentValue.cost*currentValue.quantity;
        },0) * (1 + cval.taxPerc / 100));
      }
      return pval;
    },0);
  }
  return (
    <div className="container">
      <div className="inner-container">
        <div
          className="invoice-adder"
          onClick={() => {
            history.push("/create-new-invoice");
          }}
        >
          <p>Create New Invoice</p>
        </div>
        {invoices.map((data, index) => (
          <MiniInvoice key={`mini-invoice-${index}`} data={data} />
        ))}
      </div>
      <div className="colour-detail">
        <p style={{color : colourSchema.paid.primary}}>
          <span className="material-icons">invert_colors</span> Paid{" "}
        </p>
        <p style={{color : colourSchema.outstanding.primary}}>
          <span className="material-icons">invert_colors</span> Outstanding{" "}
        </p>
        <p style={{color : colourSchema.late.primary}}>
          <span className="material-icons">invert_colors</span> Late{" "}
        </p>
      </div>
      <div className="user-invoice-info">
          <p>Total invoice : {invoices.length}</p>
          <p>Total paid    : $ {calcTotalPaid(invoices)}</p>
          <p>Total unpaid  : $ {calcTotal(invoices)}</p>
          <p>Please update user details by clicking user icon at navbar</p>
      </div>
    </div>
  );
}
