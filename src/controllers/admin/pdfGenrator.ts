// import { Location } from "aws-sdk";
// import { Request, Response } from "express";
// import { apiResponse } from "../../common";
// import { invoiceModel } from "../../database";
// import { responseMessage, send_Pdf_to_mail } from "../../helper";
// import { pdfGenrator } from "../../helper";

// const ObjectId = require('mongoose').Types.ObjectId
// export const invoicePdf= async (req:Request,res:Response)=>{
//     let id=req.params.id;
//     try{    
//         // let invoice= await invoiceModel.findOne({id:ObjectId(id)}).populate( "userId").populate("clientId")
      
//      let data= await invoiceModel.aggregate([
//         {$match: {_id:ObjectId(id)}},
//             {
//                 $lookup: {
//                     from: "banks",
//                     localField: "userId",
//                     foreignField:"userId",
//                     as:"bank_data"
//                 }
            
                
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "userId",
//                     foreignField:"_id",
//                     as:"user_data"
//                 }
            
                
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "clientId",
//                     foreignField:"_id",
//                     as:"client_data"
//                 }
            
                
//             }
            
//         ])
        
//         if(!data){
//             return res.status(404).json(await apiResponse(404,responseMessage.getDataNotFound('invoice'),null,{}))
//     }
//     pdfGenrator(data,`${data[0]?._id}/pdf`)
    
//     return res.status(200).json(await apiResponse(200,responseMessage.getDataSuccess, data,{}))


// }
//     catch(error){
//         console.log(error);
//         return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

//     }

// }

// export const Pdf_mail_send= async (req:Request,res:Response)=>{
//     let id=req.params.id;
//     try{    
//         // let invoice= await invoiceModel.findOne({id:ObjectId(id)}).populate( "userId").populate("clientId")
      
//      let data= await invoiceModel.aggregate([
//         {$match: {_id:ObjectId(id)}},
//             {
//                 $lookup: {
//                     from: "banks",
//                     localField: "userId",
//                     foreignField:"userId",
//                     as:"bank_data"
//                 }
            
                
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "userId",
//                     foreignField:"_id",
//                     as:"user_data"
//                 }
            
                
//             },
//             {
//                 $lookup: {
//                     from: "users",
//                     localField: "clientId",
//                     foreignField:"_id",
//                     as:"client_data"
//                 }
            
                
//             }
            
//         ])
        
//         if(!data){
//             return res.status(404).json(await apiResponse(404,responseMessage.getDataNotFound('invoice'),null,{}))
//     }
//    let location= await pdfGenrator(data,`${data[0]?._id}/pdf`)
//     let record=  await send_Pdf_to_mail({client:data[0].client_data[0],invoice:data[0],user:data[0].user_data[0]},location);   
//     return res.status(200).json(await apiResponse(200,responseMessage.getDataSuccess, record
// ,{}))


// }
//     catch(error){
//         console.log(error);
//         return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

//     }

// }