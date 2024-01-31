"use strict"
import nodemailer from 'nodemailer';
import config from 'config';
import { resolve } from 'path';
import { rejects } from 'assert';
import FormData from 'form-data';
const mail:any=config.get('nodemailer')

let transporter=nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    tls:{
      enable: true,
        rejectUnauthorized:false,
    },
    auth:{
        user:mail.mail,
        pass:mail.password
    }
})

export const send_Pdf_to_mail = async (mail_data,location) => {
    return new Promise(async (resolve, reject) => {
        try {
           let form_data = new FormData();
            const mailOptions = {
                from: `<${mail}>`,
                to: mail_data.client.email,
                subject: `Invoice ${mail_data.invoice.invoiceId} for Your Project due  ${mail_data.invoice.dueDate}`,
                attachments: [{
                  filename: 'Invoice.pdf',
                  path:`https://test-semicolon.s3.ap-south-1.amazonaws.com/${mail_data.invoice._id}/pdf/Invoice.pdf`,
                  cid:'logo@12'
             }],
                html: `<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                <title>Invoice Pdf Send Mail </title>
                <meta name="description" content="Reset Password Email Template.">
                <style type="text/css">
                    a:hover {text-decoration: underline !important;}
                </style>
                </head>
                <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px;" leftmargin="0">
                <table cellspacing="0" border="0" cellpadding="0"  bgcolor="#ffffff" style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700%7COpen+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                    <tr>
                        <td>
                            <table style="background-color: #ffffff; max-width:670px;  margin:0 auto;" width="100%" border="0"  cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="height:80px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="height:20px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td>
                                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" style="max-width:670px;background:rgb(255, 255, 255); border-radius:3px; -webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                            <tr>
                                                <td style="height:30px;">&nbsp;</td>
                                            </tr>
                                            <tr>
                                                <td style="padding:0 35px;">
                                                    <div style="text-align: center; margin-bottom: 30px;" >
                                                      <img src="https://test-semicolon.s3.ap-south-1.amazonaws.com/Layer_2.png" style="width:40%" alt="logo">
                                                     
                                                    </div>
                                                    <!-- <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:4px solid #CECECE; width:100px;"></span> -->
                                                    <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:10px;">
                                                        Dear ${mail_data.client.firstName}  ${ mail_data.client.lastName},
                                                        <br><br>
                                                        I hope you're well. Please see attached invoice number ${mail_data.invoice.invoiceId} for Your Project, which is due for payment on ${mail_data.invoice.dueDate}.<br/><br/>
                                                Please don't hesitate to reach out if you have any questions. 
                                                        <br>
                                                        Kind regards,
                                                        <br>
                                                        ${mail_data.user.firstName} ${mail_data.user.lastName}
                                                        <br>
                                                        <div style="text-align: center;">
                                                     

                                                        
                                                          </div>
                                                        <br>
                                                        Thanks,
                                                        <br>
                                                       Semicolon solution
                                                    </p>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="height:40px;">&nbsp;</td>
                                            </tr>
                                        </table>
                                    </td>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <!-- <td style="text-align:center;"><strong>www.PrivateChefMarketPlace.com</strong></p></td> -->
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                </body>
                </html>`,
                  
           
            }
            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(`Email has been sent to ${mail_data?.client.email}, kindly follow the instructions`)
                }
            })
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}


