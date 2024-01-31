import { Response, Request } from "express";
import { apiResponse } from "../../common";
import { userModel } from "../../database";
import { responseMessage } from "../../helper";
import bcryptjs from "bcryptjs"

const ObjectId = require('mongoose').Types.ObjectId


export const addUser = async (req: Request, res: Response) => {
    let body = req.body

    try {
        let isAlreadyExist = await userModel.findOne({ email: body.email })
        if (isAlreadyExist) {
            return res.status(400).json(await apiResponse(400, responseMessage.alreadyEmail, null, {}))
        }
        let salt = await bcryptjs.genSaltSync(8)
        let hashPassword = await bcryptjs.hash(body.password, salt)
        body.password = hashPassword
        let response = await new userModel(body).save()
        if (response) {
            await userModel.findOneAndUpdate({ email: body.email }, { userType: body.userType })
            return res.status(200).json(await apiResponse(200, responseMessage.addDataSuccess, response, {}))
        }
        return res.status(406).json(await apiResponse(406, responseMessage.addDataError, null, {}))


    } catch (error) {
        console.log(error);
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }

}

export const getUserById = async (req: Request, res: Response) => {


    let id = req.params.id
    try {
        let response = await userModel.findOne({ _id: id })

        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('user'), response, {}))
        }
        return res.status(404).json(await apiResponse(404, responseMessage.getDataNotFound('user'), null, {}))
    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }
}

export const getAllUser = async (req: Request, res: Response) => {
    try {

        let response = await userModel.find()
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('user'), response, {}))
        }
        return res.status(404).json(await apiResponse(404, responseMessage.getDataNotFound('user'), null, {}))

    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }
}


export const updateUser = async (req: Request, res: Response) => {
    let body = req.body,
        id = req.params.id

    try {

        let response = await userModel.findOneAndUpdate({ _id: ObjectId(id), isActive: true }, body, { new: true })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.updateDataSuccess('user'), response, {}))
        }
        return res.status(404).json(await apiResponse(404, responseMessage.updateDataError('user'), null, {}))


    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }
}

export const deleteUser = async (req: Request, res: Response) => {

    let id = req.params.id
    try {
        let response = await userModel.findByIdAndDelete({ _id: ObjectId(id)})
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.deleteDataSuccess('user'), response, {}))
        }
        return res.status(406).json(await apiResponse(200, responseMessage.getDataNotFound('user'), response, {}))

    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }
}


export const getUser = async (req: Request, res: Response) => {

    try {
        let response = await userModel.find({ isActive: true, userType: 1 })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('admin'), response, {}))
        }
        return res.status(404).json(await apiResponse(200, responseMessage.getDataNotFound('admin'), response, {}))
    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }
}


export const getClient = async (req: Request, res: Response) => {

    try {
        let response = await userModel.find({ isActive: true, userType: 2 })
        if (response) {
            return res.status(200).json(await apiResponse(200, responseMessage.getDataSuccess('admin'), response, {}))
        }
        return res.status(404).json(await apiResponse(200, responseMessage.getDataNotFound('admin'), response, {}))
    } catch (error) {
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }
}
