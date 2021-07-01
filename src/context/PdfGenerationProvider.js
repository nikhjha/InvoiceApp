import React, {useRef, useState, useEffect} from 'react';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Invoice from '../components/Invoice';


export const pdfGenerationContext = React.createContext();


export default function PdfGenerationProvider({children}) {

    const invoiceDiv = useRef();
    const [data,setData] = useState();
    const dataLoaded = useRef();
    const generatePDF = async(callback) => {
        const pdf = new jsPDF("p","mm",'a4');
        const canvas = await html2canvas(invoiceDiv.current.firstChild.firstChild);
        const divImage = canvas.toDataURL("image/png");
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        const imgHeighMM = invoiceDiv.current.firstChild.firstChild.offsetHeight * 0.264583;
        const totalPage = imgHeighMM%height === 0 ? imgHeighMM/height : Math.floor(imgHeighMM/height + 1);
        for(let i = 0; i < totalPage; i++){
          pdf.addImage(divImage,0,-i*height,width,imgHeighMM);
          if(i !== totalPage-1){
            pdf.addPage();
          }
        }
        pdf.save("download.pdf");
        callback();
    }
      const generatePdfByData = (data) => {
        dataLoaded.current = data;
        setData(data);
      }
    const value = {
      generatePdfByData
    }
    useEffect(()=>{
      if(!dataLoaded.current){
        return;
      }else{
        generatePDF(()=>{
          dataLoaded.current = undefined;
          setData(undefined);
        });
      }
    },[data]);
    return (
        <pdfGenerationContext.Provider value={value}>
            {children}
            {data && <div style={{position: 'absolute', top : '0', left : '0', width : '100%', height : '100vh', backgroundColor : 'rgba(0,0,0,0.4)'}}>
            <div style={{position : 'absolute', top : '50%', left : '50%', transform : 'translate(-50%,-50%)', backgroundColor : 'white'}} ref={invoiceDiv}>
                <Invoice data={data}/>
            </div>
            </div>}  
        </pdfGenerationContext.Provider>
    )
}
