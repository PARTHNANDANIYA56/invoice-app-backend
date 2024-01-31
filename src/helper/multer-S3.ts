// import  multer from 'multer'

// import  AWS from 'aws-sdk'
// import config from 'config'
// import  multerS3 from 'multer-s3'
// import { Request,Response } from 'express'
// import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'
// import { rejects } from 'assert'
// import { apiResponse } from '../common'
// import { responseMessage } from './response'
// import s3Storage from 'multer-s3'
// import { userModel } from '../database'
// import  fs  from 'fs'


// const aws:any = config.get('AWS');

// const s3 = new AWS.S3({

//     accessKeyId:aws.AWS_Access_Key,
//     secretAccessKey: aws.AWS_Secret_Key,
//     region:aws.AWS_Bucket_Region,

// })

// const S3 = new S3Client({
//     region: aws.AWS_Bucket_Region,
//     credentials: {
//         accessKeyId:aws.AWS_Access_Key,
//         secretAccessKey: aws.AWS_Secret_Key,
//     }

// })
// const  bucket_name= aws.AWS_Bucket_Name
// const  bucket_URL= aws.AWS_bucket_URL



// export const upload= multer({ 
     
//     storage:multerS3({
//         s3:S3,
//         bucket: bucket_name,
//         acl: 'public-read', 
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata:(req,file,cb)=>{
         
//             cb(null,{fieldName:file.fieldname})
//         },
//         key:(req:any,file,cb)=>{

           
//             const  file_type =file.originalname.split('.');
//             file.destination =`${bucket_URL}/${req.header('user')?._id}/${Date.now().toString()}.${file_type[file_type.length-1]}`
//             // console.log(bucket_URL);
           
            
//             cb(null,`${req.header('user')?._id}/${Date.now().toString()}.${file_type[file_type.length-1]}`)
//         }
//     })


// }) 





// export const upload_all_type = async function (image, bucketPath) {
//     return new Promise(async function (resolve, reject) {
//         try {
//             // image.data = await compressImage(image)
//             var params = {
//                 Bucket: `${bucket_name}/${bucketPath}`,
//                 Key: image.name,
//                 Body: image.data,
//                 ContentType: image.mimetype,
//                 ACL: "public-read"
//             };
           
//             s3.upload(params, function (err, data) {
//                 if (err) {
//                     console.log(err);
//                     reject()
//                 } else {
                   
//                     resolve(data.Location)
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//             reject()
//         }
//     })
// }




