import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {pushNewInvoice,createNewInvoiceID} from "../../action";
import {useSelector,useDispatch} from "react-redux";
import Invoice from "../Invoice";
import "./create-invoice.css";

const Item = ({ item, items, setItems, index }) => {
  return (
    <>
      <div>
        <input
          type="text"
          value={item.name}
          onChange={(e) => {
            let newItems = items.map((it,ind)=>{
                if(ind===index){
                    const {description,cost,quantity} = it;
                    const obj = {
                        name : e.target.value,
                        description,
                        cost,
                        quantity
                    }
                    return obj;
                }
                return it;
            });
            setItems([...newItems]);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          value={item.description}
          onChange={(e) => {
            let newItems = items.map((it,ind)=>{
                if(ind===index){
                    const {name,cost,quantity} = it;
                    const obj = {
                        name,
                        description : e.target.value,
                        cost,
                        quantity
                    }
                    return obj;
                }
                return it;
            });
            setItems([...newItems]);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          value={item.cost}
          onChange={(e) => {
            let newItems = items.map((it,ind)=>{
                if(ind===index){
                    const {name,description,quantity} = it;
                    const obj = {
                        name,
                        description,
                        cost : e.target.value,
                        quantity
                    }
                    return obj;
                }
                return it;
            });
            setItems([...newItems]);
          }}
        />
      </div>
      <div>
        <input
          type="text"
          value={item.quantity}
          onChange={(e) => {
            let newItems = items.map((it,ind)=>{
                if(ind===index){
                    const {name,description,cost} = it;
                    const obj = {
                        name,
                        description,
                        cost,
                        quantity : e.target.value
                    }
                    return obj;
                }
                return it;
            });
            setItems([...newItems]);
          }}
        />
      </div>
    </>
  );
};

export default function CreateInvoice() {
  const history = useHistory();
  const newInvoiceID = useSelector(state => state.invoicesID);
  const {userDetail, userAddress} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const defaultItem = {
    name: "Item's name",
    description: "Description for item",
    cost: 1000,
    quantity: 1,
  };

  const today = new Date();
  const todayString = `${today.getFullYear()}-${today.getMonth() < 9 ? "0"+(today.getMonth()+1) : today.getMonth()+1}-${today.getDate()}`;
  const [clientName, setClientName] = useState("Client Name");
  const [clientAddress, setClientAddress] = useState("1 client address city, state, country zip code");
  const [dueDate, setDueDate] = useState(todayString);
  const [items, setItems] = useState([defaultItem]);
  const [taxPerc, setTaxPerc] = useState(0);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const newInvoiceData = {
    invoiceID : newInvoiceID,
    yourDetail : userDetail,
    yourAddress : userAddress,
    clientName,
    clientAddress,
    dateOfIssue : todayString,
    dueDate,
    items,
    taxPerc,
    notes,
    paid : false
  }

  return (
    <div className="create-invoice">
      <div className="input-panel">
        <p>Enter client's name :</p>
        <input
          type="text"
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value);
          }}
        />
        <p>Enter client's address :</p>
        <input
          type="text"
          value={clientAddress}
          onChange={(e) => {
            setClientAddress(e.target.value);
          }}
        />
        <p>Enter due date :</p>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
        />
        <div className="input-items">
          <div>
            <p>Name</p>
          </div>
          <div>
            <p>Description</p>
          </div>
          <div>
            <p>Unit Cost</p>
          </div>
          <div>
            <p>Quantity</p>
          </div>
          {items.map((item, index) => (
            <Item
              key={`items-to-be-added-${index}`}
              index={index}
              item={item}
              items={items}
              setItems={setItems}
            />
          ))}
          <div></div><div></div><div></div>
          <div>
            <button onClick={()=>{setItems([...items,defaultItem])}}>Add more item</button>
          </div>
        </div>
        <p>Enter tax percentage :</p>
        <input
          type="number"
          value={taxPerc}
          onChange={(e) => {
            setTaxPerc(e.target.value);
          }}
        />
        <p>Add note :</p>
        <input
          type="text"
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
          }}
        />
        <button onClick={()=>{setNotes([...notes,note]);setNote("");}}>Add note</button>
        <div>
          <button
            onClick={() => {
              history.push("/");
            }}
          >
            Back
          </button>
          <button onClick={()=>{
            dispatch(pushNewInvoice(newInvoiceData));
            history.push("/");
            dispatch(createNewInvoiceID());
          }}>Submit</button>
        </div>
      </div>
      <Invoice data={newInvoiceData}/>
    </div>
  );
}
