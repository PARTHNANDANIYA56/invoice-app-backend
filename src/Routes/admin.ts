import express from "express";
import { adminController, authController } from "../controllers";
// import { invoicePdf } from "../helper";
import * as validation from '../validation'
const router = express.Router();

router.post('/Login', validation.login, authController.login)

// add user and client
router.get("/getUser", adminController.getUser)
router.get("/getClient", adminController.getClient)
router.post('/addUser', validation.addUser, adminController.addUser)
router.get('/getUserById/:id', adminController.getUserById)
router.get('/getAllUser', adminController.getAllUser)
router.put('/updateUser/:id', adminController.updateUser)
router.delete('/deleteUser/:id', adminController.deleteUser)

//bank details
router.get('/getBank', adminController.getBank)
router.get('/getBankById/:userId', adminController.getBankById)
router.post('/addBank', validation.addBank, adminController.addBank)
router.put('/updateBank/:id', adminController.updateBank)
router.delete('/deleteBank/:id', adminController.deleteBank)

// invoice
router.post('/addInvoice', validation.addInvoice,adminController.addInvoice)
router.get('/getInvoiceByInvoiceId/:id', adminController.getInvoiceByInvoiceId)
router.get('/getInvoices', adminController.getAllInvoice)
router.put('/updateInvoice', adminController.updateInvoice)
router.delete('/deleteInvoice/:id', adminController.deleteInvoice)


//invoice Pdf       
// router.get('/invoicePdf/:id', adminController.invoicePdf)
// router.get('/Pdf_mail_send/:id', adminController.Pdf_mail_send)

export const adminRouter = router
