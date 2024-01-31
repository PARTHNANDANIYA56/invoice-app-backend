import { Response, Request } from "express";
import { number } from "joi";
import { apiResponse } from "../../common";
import { invoiceModel } from "../../database";
// import { pdfGenrator, responseMessage } from "../../helper";
import {  responseMessage } from "../../helper";
const ObjectId = require('mongoose').Types.ObjectId

export const addInvoice = async (req: Request, res: Response) => {
    let body = req.body
    try {


        let count: any = await invoiceModel.findOne({}).sort({ createdAt: -1 }).limit(1)



        count ? body.invoiceId = Number((count.invoiceId + 1)) : body.invoiceId = 10000


        for (let i = 0; i < body.item.length; i++) {
            let total: number = body.item[i].price * body.item[i].qty_hour;
            body.item[i].total = total

        }

        let totalCount = body.item,
            sum = 0

        for (let i = 0; i < totalCount.length; i++) {
            sum += totalCount[i].total;
        }
        body.subTotal = sum;
        body.total = Number(sum) + Number(sum) * body.taxRate / 100;


        let response = await new invoiceModel(body).save();

        if (response) {
            let data = await invoiceModel.aggregate([
                { $match: { _id: ObjectId(response._id) } },
                {
                    $lookup: {
                        from: "banks",
                        localField: "userId",
                        foreignField: "userId",
                        as: "bank_data"
                    }


                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user_data"
                    }


                },
                {
                    $lookup: {
                        from: "users",
                        localField: "clientId",
                        foreignField: "_id",
                        as: "client_data"
                    }


                }

            ])
            if (data) {
                // pdfGenrator(data, `${data[0]?._id}/pdf`)
                return res.status(200).json(await apiResponse(200, responseMessage.addDataSuccess('Invoice'), data, {}))
            }
            else{
                return res.status(200).json(await apiResponse(200, responseMessage.addDataError, null, {}))
            }
        } else {
            return res.status(400).json(await apiResponse(400, responseMessage.addDataError, null, {}))
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}


export const getInvoiceByInvoiceId = async (req: Request, res: Response) => {
    let id = req.params.id
    try {
        let data = await invoiceModel.aggregate([
            { $match: { _id: ObjectId(id) } },
            {
                $lookup: {
                    from: "banks",
                    localField: "userId",
                    foreignField: "userId",
                    as: "bank_data"
                }


            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user_data"
                }


            },
            {
                $lookup: {
                    from: "users",
                    localField: "clientId",
                    foreignField: "_id",
                    as: "client_data"
                }


            }

        ])

        if (!data) {
            return res.status(404).json(await apiResponse(404, responseMessage.getDataNotFound('invoice'), null, {}))
        }

        return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('Invoice'), data, {}))


    } catch (error) {

        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const getAllInvoice = async (req: Request, res: Response) => {
    try {
        let response = await invoiceModel.find({ isActive: true }).populate("userId").populate("clientId")
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('Invoice'), response, {}))
        }
        return res.status(404).json(await apiResponse(404, responseMessage.getDataNotFound('Invoice'), null, {}))
    } catch (error) {
        console.log(error);

        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}

export const updateInvoice = async (req: Request, res: Response) => {
    let body = req.body
    try {
        let response = await invoiceModel.findOneAndUpdate({ _id: body.id, isActive: true }, body, { new: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.updateDataSuccess('Invoice'), response, {}))
        }
        return res.status(404).json(await apiResponse(404, responseMessage.updateDataError('Invoice'), null, {}))
    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}
export const deleteInvoice = async (req: Request, res: Response) => {
    let id = req.params.id
    try {
        let response = await invoiceModel.findByIdAndDelete({ _id: id })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.deleteDataSuccess('Invoice'), response, {}))
        }
        return res.status(406).json(await apiResponse(200, responseMessage.getDataNotFound('Invoice'), response, {}))
    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))
    }
}
