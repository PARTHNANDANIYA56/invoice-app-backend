"use strict"

import { Request, Response } from "express";
import Joi from "joi";
import { apiResponse } from "../common";


export const login = async (req: Request, res: Response, next: Function) => {
    const schema = Joi.object({
        email: Joi.string().required().email().error(new Error("Email is Required")),
        password: Joi.string().required().error(new Error("Password id Required field"))
    })
    schema.validateAsync(req.body).then(() => {
        return next()
    }).catch(error => {
        return res.status(400).json(apiResponse(400, error.message, null, error))
    })
}

export const addUser = async (req: Request, res: Response, next: Function) => {
    const schema = Joi.object({
        firstName: Joi.string().required().error(new Error(" FirstName is Required field")),
        lastName: Joi.string().required().error(new Error("LastName is Required field")),
        email: Joi.string().email().required().error(new Error("Email is Required field")),
        phoneNumber: Joi.number().required().error(new Error("phoneNumber is Required field")),
        password: Joi.string().required().error(new Error("password is Required field")),
        companyName: Joi.string().required().error(new Error("companyName is Required field")),
        taxNumber: Joi.string().error(new Error("taxNumber is Required field")),
        taxType: Joi.string().error(new Error("taxType is Required field")),
        userType: Joi.number().error(new Error("userType is Required field")),
        address: Joi.string().required().error(new Error("address is Required field"))
    })
    schema.validateAsync(req.body).then(() => {
        return next()
    }).catch(async error => {
        return res.status(400).json(await apiResponse(400, error.message, null, error))
    })
}

export const addBank  =async (req: Request, res: Response, next: Function) => {
    const schema = Joi.object({
        bankName: Joi.string().required().error(new Error(" bankNmae is Required field")),
        accountNumber: Joi.string().required().error(new Error("accountNumber is Required field")),
        IFSCcode: Joi.string().required().error(new Error("IFSC code is Required field")),
        taxNumber: Joi.string().error(new Error("taxNumber is Required field")),
        userId: Joi.string().error(new Error("userId is Required field")),
        
    })
    schema.validateAsync(req.body).then(() => {
        return next()
    }).catch(async error => {
        return res.status(400).json(await apiResponse(400, error.message, null, error))
    })
}

export const addInvoice = async (req: Request, res: Response, next: Function) => {
    // let item =Joi.object().keys({
    //     itemName:Joi.string().required().error(new Error("itemName is Required field")),
    //     description :Joi.string().required().error(new Error("description is Required field")), 
    //     qty_hour:Joi.number().error(new Error("qty_hour is Required field")),
    //     price:Joi.number().required().error(new Error("price is Required field")),

    // })
    const schema = Joi.object({
        bill_date: Joi.string().required().error(new Error("bill_date is Required field")),
        dueDate: Joi.string().required().error(new Error("due date is Required field")),
        userId: Joi.string().required().error(new Error(" userName is Required field")),
        notes: Joi.string().allow(null, "").error(new Error("notes is String field")),
        clientId: Joi.string().required().error(new Error("clientName is Required field")),
        item: Joi.array().required().error(new Error("item is Required field")),
        taxNumber: Joi.string().error(new Error("taxNumber is Required field")),
        taxType: Joi.string().error(new Error("taxType is Required field")),    
        taxRate: Joi.number().error(new Error("taxRate is Required field")),
        currency: Joi.string().required().error(new Error("currency is Required field")),
        paymentStatus: Joi.number().error(new Error("paymentStatus is Required field")),
        qty_hour:Joi.number().error(new Error("qty_hour is Required field")),
         

    })
    schema.validateAsync(req.body).then(() => {
        return next()
    }).catch(async error => {   
        return res.status(400).json(await apiResponse(400, error.message, null, error))
    })
}
