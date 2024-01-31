import { Response, Request } from "express";
import { ReadableStreamDefaultController } from "stream/web";
import { apiResponse } from "../../common";
import { bankModel } from "../../database";
import { responseMessage } from "../../helper";

const ObjectId = require('mongoose').Types.ObjectId

export const addBank = async (req: Request, res: Response) => {
    let body = req.body

    try {
        let isAlreadyExist = await bankModel.findOne({ accountNumber: body.accountNumber })
        if (isAlreadyExist) {
            return res.status(400).json(await apiResponse(400, responseMessage.dataAlreadyExist('bank'), null, {}))
        }

        let response = await new bankModel(body).save()
        if (response) {
            await bankModel.findOneAndUpdate({ accountNumber: body.accountNumber })
            return res.status(200).json(await apiResponse(200, responseMessage.addDataSuccess('bank'), response, {}))
        }
        return res.status(406).json(await apiResponse(406, responseMessage.addDataError, null, {}))


    } catch (error) {

        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }

}

export const updateBank = async (req: Request, res: Response) => {

    let body = req.body,
        id = req.params.id
    try {
        let response = await bankModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, body, { new: true })
        if (response) return res.status(200).json(await apiResponse(200, responseMessage?.updateDataSuccess('bank'), response, {}));
        else return res.status(400).json(await apiResponse(400, responseMessage?.updateDataError('bank'), {}, {}));
    } catch (error) {
        return res.status(500).json(await apiResponse(500, "Internal Server Error", {}, error))
    }
}


export const deleteBank = async (req: Request, res: Response) => {
    let id = req.params.id
    try {
        let response = await bankModel.findByIdAndDelete({ _id: ObjectId(id)}, { new: true })
        if (response) return res.status(200).json(await apiResponse(200, responseMessage?.deleteDataSuccess('bank'), response, {}));
        else return res.status(400).json(await apiResponse(400, responseMessage?.getDataNotFound('bank'), {}, {}));
    } catch (error) {
        return res.status(500).json(await apiResponse(500, "Internal Server Error", {}, error))
    }
}

export const getBank = async (req: Request, res: Response) => {
    try {
        const response = await bankModel.find({ isActive: true });
        if (!response) return res.status(404).json(await apiResponse(404, responseMessage.getDataNotFound("bank"), {}, {}));
        return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess("bank"), response, {}));

    } catch (error) {
        console.log(error)
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, {}))
    }
}

export const getBankById = async (req: Request, res: Response) => {
    const userId = req.params.userId
    try {
        let response = await bankModel.findOne({ userId: ObjectId(userId) })
        if (response) return res.status(200).json(await apiResponse(200, responseMessage?.deleteDataSuccess('bank'), response, {}));
        else return res.status(400).json(await apiResponse(400, responseMessage?.getDataNotFound('bank'), {}, {}));
    } catch (error) {
        return res.status(500).json(await apiResponse(500, "Internal Server Error", {}, error))
    }
}