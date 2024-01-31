// import pdf from 'pdf-creator-node'
// import fs from 'fs'
// import { upload_all_type } from './multer-S3';


// export const pdfGenrator= async (body_data:any,  upload_location:any)=>{

// console.log(body_data[0]);

//     return new Promise(async function (resolve, reject) {
//         try{
//             let html=`
//             <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Invoice</title>
//     <style>
//     @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;400&display=swap');
//         body {
//   background: rgb(204,204,204); 
//   font-family: 'Lato', sans-serif;
// }

// @media print {
//   body, page {
//     margin: 0;
//     box-shadow: 0;
//     padding:0;
//     box-sizing: border-box;

//   }
//   // @page {
//   //       size: 21cm 29.7cm;
//   //   }
// }

// .header{
//   background-color: #ffffff;
//   height: 9.9cm;
//   padding-top:10px;

  
// }

// .logo{
  
//     align-items: center !important;
//     margin:0 30px ; 
//     position: relative;

// }
// .logo  img{
  
// margin:10px 0;  
// }

// .logo h3{
  
//   position:absolute;
//   right:0;
//   top:-15%;
//   z-index:1;   
// }

// .Invoice_box{

//     position:relative;    
// }

// .Invoice_box .border-1{
//     width: 48%;
//    height:  1.222917cm;
//     background-color: #00b0ff;
//     padding: 10px;
//     margin: 0;
//     float: left;
//     position:absolute;
//     left:0;
    
// }
// .Invoice_box .text{
//     font-size: 64px;
//     font-family:Arial, Helvetica, sans-serif ;
//     word-spacing: -50%;
//     margin: 0 20px;
//     position:absolute;
//     left:50%;
  
// }

// .Invoice_box .border-2{
//     width: 10%; height: 1.222917cm;
//     background-color: #00b0ff;
//     padding: 10px;
//     margin: 0;
//     float: right;
//     position:absolute;
//     right:0;

// }

// .invoice_data{
//   position:relative;

// }
//  .invoice_data  .invoce_data_left{
//   position:absolute;  
//   top:90px !important;

//  }

//  .invoice_data  .invoce_data_right{
//   position:absolute;
//   top:90px !important;
//   right:0;
//  }

// .invoice_data  .invoce_data_left h4{
//   text-align: left;
//   margin:20px 30px ;
//   line-height: 2;  
// }


// .invoice_data  .invoce_data_right h4{
//   text-align: right;
//   margin:20px 30px ;
//   line-height: 2;
// }

// .item_data{
//   padding: 30px 0;
//   min-height: 8cm;
//   position:relative;
//   background-color: #f9f9f9;
// }



// .item_data .border{

//   width: 700px; height: 25px;
//     background-color: #00b0ff;
//     padding: 10px;
//     display: flex;
//     justify-content: space-between;
// }

// .item_data table{
//   width: 90%;
//   text-align:center;
//   position:absolute;
//   margin:0 auto;
//   left:5%;
//   z-index:1;


// }

// .item_data .item_1{
// width: 700px; 
// height: 25px;
//   background-color: #ffffff;
//   padding: 10px;
// }

// .item_data .item_2{

// width: 700px; height: 25px;
//   background-color: #dee2e6;
//   padding: 10px;
// }

// .footer{
//   background-color: #ffffff;
//   height: 9.9cm;
// }

// .footer .payment_details{
// position: relative;

// }

// .footer .payment_details .account_data {
//   text-align: left;
//   margin:20px 30px ;
//   line-height: 2;
//   float: left !important;
//   position: absolute;
  
// }

// .footer .payment_details .account_data p span{
//   font-size: 20px;
//   font-weight: bold;
// }



// .footer .payment_details .payment_details{
//   text-align: left;
//   margin:20px 30px ;
//   position: absolute;
//   right:7%;
  
// }

// .footer .payment_details .payment_details h4 .Tax{
  
// }

// .footer .payment_details .payment_details h4{
//   line-height: 2;
// }

// .footer .payment_details .payment_details h4 .total {
//   width: auto !important;
//   height:20px;
//   background-color: #00b0ff;
//   padding:  10px 10px 20px 10px;
//   margin: 10px 0;
//   border-radius: 3px;
// }

// .footer .notes{
//   display: flex !important;
//  justify-content: space-between !important;
//   margin: 0 30px;
//   width: 715px; height: 75px;
//   background-color: #f9f9f9;
//   padding: 10px;
//   position: absolute;
//   bottom: 90px;

// }

// .footer .border {
//   border-bottom: 4px solid #00b0ff;
//   margin: 30px 30px ;

//   position: absolute;
//   bottom:0;
//   left:0;
//   right: 0;
//   padding: 0 300px;
  

// }

// .footer  .msg{
//   font-weight: 600;
//   line-height: 2;
//   text-align: left;
//   position: absolute;
//   left:0;
//   margin: 0 0 0 30px ; 
//   bottom: 30px;
// }



//     </style>
// </head>
// <body>
    
   
   
//         <div class="header">
//             <div class="logo">
//                 <div class="l-1">
//                 <img src="https://test-semicolon.s3.ap-south-1.amazonaws.com/Layer_2.png" style="width:30%">
//                 </div>
//                 <div class ="l-2">
//                     <h3>Date:-${body_data[0].bill_date}</h3>
//                 </div>
//             </div>
//             <div class="Invoice_box">
//               <div class="border-1"  ></div>
//               <div class="text">INVOICE</div>  
//               <div class="border-2" ></div> 
//             </div>
//             <div class="invoice_data">
//             <div class="invoce_data_left">
//               <h4>
//                 Bill no:-${body_data[0].invoiceId} <br>
//                 Invoice To:- <br>
//                 ${body_data[0].client_data[0].firstName} ${body_data[0].client_data[0].lastName} <br>  
//                 ${body_data[0].client_data[0].address} <br>
//                 GST No:-${body_data[0].client_data[0].taxNumber ? body_data[0].client_data[0].taxNumber : "--"}
             
//               </h4>
//             </div>
//             <div class="invoce_data_right">
//               <h4>
          
//                 Invoice From:- <br>
//                 ${body_data[0].user_data[0].firstName} ${body_data[0].user_data[0].lastName} <br>  
//                 ${body_data[0].user_data[0].address} <br>                
            
//               </h4>
//             </div>
//             </div>

//           </div>
//           <div class="item_data">
//             <table class="item_box">
//              <thead>
//              <tr class="border">
//              <th>No</th>
//              <th>Itemname</th>
//              <th>Discription</th>
//              <th>Qty</th>
//              <th>Price</th>
//              <th>Total</th>
//            </tr></thead>
//              ${body_data[0].item.map(function(item: any, i: any ){
//               return `<tr class=${i%2 == 0 ? "item_1": "item_2"}>

//                  <td>${i+1}</td>
//                  <td>${item.itemName}</td>
//                 <td>${item.description}</td>
//                 <td>${item.qty_hour}</td>
//                 <td>${item.price}</td>
//                 <td>${item.total}</td>
//               </tr>`
//              })}
//             </table>
            
//           </div>

//           <div class="footer">
    
//             <div class="payment_details">
//             <div class="account_data">
//               <p>
//                 <span>Payment info:-</span> <br>
//                  Account No:- ${body_data[0].bank_data[0].accountNumber} <br>
//                  IFSC code:- ${body_data[0].bank_data[0].IFSCcode} <br>  
//                  GST IN:-${body_data[0].bank_data[0].taxNumber} <br>
//               <p>
//             </div>
//             <div class="payment_details">
//               <h4>
//                 <div class="Subtotal"> 
//                   <div style="float:left;">Subtotal :-</div>
//                   <div style="margin-left:130px;">${body_data[0].currency}&nbsp &nbsp ${body_data[0].subTotal}/- </div>
//                  </div>
//                  <div class="Tax"> 
//                   <div style="float:left; ">Tax (${body_data[0].taxType})(${body_data[0].taxRate}%) :-</div>
//                   <div  style="margin-left:130px;">${body_data[0].currency} &nbsp &nbsp${body_data[0].subTotal *body_data[0].taxRate/100}/-</div>
//                  </div>
//                <div class="total"> 
//                 <div style="float:left;">Total :-</div>
//                 <div  style="margin-left:120px;"> ${body_data[0].currency}&nbsp &nbsp${body_data[0].total}/-</div>
//                </div>

//               </h4>
//             </div>
//           </div>
//           <div class="notes">Notes:-${body_data[0].notes}</div>
//           <div class="border"></div>
//           <div class="msg">Thank you for your business</div></div>

         
// </body>
// </html>`
    
//         const filename = 'Invoice.pdf'
//         // const filename = body_data[0]?.resultId + '.pdf'
//         const document = {
//             html: html,
//             data: {
//                 products: [body_data[0]]
//             },
//             path: './' + filename
//         }
//         await pdf.create(document, {
//           orientation: "potarait",
//           format: "A4",
//       })

//           let location = await upload_all_type  ({
//             data: fs.readFileSync(process.cwd() + `/${filename}`),
//             name: filename,
//             mimetype: 'application/pdf'
//           }, upload_location)
//           fs.unlinkSync(process.cwd() + `/${filename}`)
//           return resolve(location)
        
//     }catch(error){
//       reject(error)  
//     }
// })
// }
