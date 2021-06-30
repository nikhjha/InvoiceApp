import React, {useRef,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import colourSchema from "../../colourSchema";
import Invoice from "../Invoice";

export default function PreviewInvoice() {
    const invoiceDiv = useRef();
    const history = useHistory();
  const { id } = useParams();
  const invoices = useSelector((state) => state.invoices);
  const data = invoices.filter(
    (invoice) => invoice.invoiceID.toString() === id
  )[0];
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
    invoiceDiv.current.style.setProperty("--primary-colour", primaryColour);
    invoiceDiv.current.style.setProperty(
      "--secondary-colour",
      secondaryColour
    );
  }, [data]);
  return (
    <div ref={invoiceDiv} style={{ position: "relative" }}>
      <Invoice data={data} />
      <div onClick={()=>{history.push("/")}} style={{ position: "absolute", top: "0.5rem", right: "15rem",cursor : 'pointer',color : "var(--primary-colour)"}}>
        <span className="material-icons">arrow_back</span>
      </div>
    </div>
  );
}
