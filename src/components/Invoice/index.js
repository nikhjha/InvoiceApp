import React from "react";
import "./invoice.css";

const InvoiceItem = ({ name, description, cost, quantity }) => {
  return (
    <>
      <div className="invoice-item">
        <div>
          <p>{name}</p>
          <p style={{ color: "grey", marginTop: "0.2rem" }}>{description}</p>
        </div>
        <p>${cost}</p>
        <p>{quantity}</p>
        <p>${cost * quantity}</p>
      </div>
      <div className="invoice-breaker-2" style={{ width: "95%" }}></div>
    </>
  );
};

export default function Invoice({ data }) {
    const totalCost = data.items.reduce((prevValue,currentValue)=>{
        return prevValue + currentValue.cost*currentValue.quantity;
    },0);
    const taxPay = totalCost * data.taxPerc / 100;
    const totalAmount = totalCost + taxPay;
  return (
    <div className="invoice-container">
      <div className="invoice" id="invoice">
        <div className="invoice-header">
          <h1>Invoice</h1>
          <p>{data.yourDetail}</p>
          <p>{data.yourAddress}</p>
        </div>
        <div className="invoice-content">
          <div className="invoice-data">
            <div className="billing-detail">
              <p className="header">Billed To</p>
              <p>{data.clientName}</p>
              <p>{data.clientAddress}</p>
            </div>
            <div className="invoice-detail">
              <p className="header">Invoice Number</p>
              <p>{data.invoiceID}</p>
              <p className="invoice-detail-2 header">Date of Issue</p>
              <p>{data.dateOfIssue}</p>
            </div>
            <div className="invoice-total">
              <p className="header">Invoice Total</p>
              <p className="invoice-item-total">${totalAmount}</p>
            </div>
          </div>
          <div className="invoice-breaker"></div>
          <div className="invoice-item-header">
            <p>Description</p>
            <p>Unit Cost</p>
            <p>Qty/hr Rate</p>
            <p>Amount</p>
          </div>
          {data.items.map((item, index) => (
            <InvoiceItem
              key={`invoice-item-${index}`}
              name={item.name}
              description={item.description}
              cost={item.cost}
              quantity={item.quantity}
            />
          ))}

          <div className="invoice-total-section">
            <div className="invoice-due-date">
              <p className="header">Due Date</p>
              <p>{data.dueDate}</p>
            </div>
            <div className="invoice-total-section-header">
              <p>Subtotal</p>
              <p>Tax</p>
              <p>Total</p>
              <p style={{ marginTop: "1rem" }}>Amount Due</p>
            </div>
            <div
              className="invoice-total-section-header"
              style={{ color: "black", textAlign: "center" }}
            >
              <p>${totalCost}</p>
              <p>${taxPay}</p>
              <p>${totalAmount}</p>
              <p style={{ marginTop: "1rem" }}>${totalAmount}</p>
            </div>
          </div>
          <div className="invoice-breaker"></div>
          {data.notes.length !== 0 && <div className="invoice-notes">
            <p>Notes</p>
            <div className="invoice-notes-content">
              {data.notes.map((note,index) => (
                <React.Fragment key={`notes-div-${index}`}>
                  <div>
                    <div className="note-circle"></div>
                  </div>
                  <p>{note}</p>
               </React.Fragment>
              ))}
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
}
