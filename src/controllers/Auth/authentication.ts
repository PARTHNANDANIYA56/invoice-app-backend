import { Request, Response } from "express";

import { userModel } from "../../database";
import bcryptjs from "bcryptjs"
import jwt from 'jsonwebtoken'

import config from 'config'
import { apiResponse } from "../../common";
import { responseMessage } from "../../helper";
import mongoose from "mongoose";
const jwt_token_secret = config.get('jwt_token_secret')



export const login = async (req: Request, res: Response) => {

    let body = req.body
    try {

        let response = await userModel.findOne({ email: body.email });
        if (!response) {
            return res.status(401).json(await apiResponse(401, responseMessage?.invalidUserPasswordEmail, null, {}))
        }

        const passwordMatch = body.password == response.password;
        const token = await jwt.sign({ _id: response._id }, jwt_token_secret);
        console.log(body.password, response.password);
        if (passwordMatch) {
            let data = {
                _id: response?._id,
                email: response.email,
                token
            }
            return res.status(200).json(await apiResponse(200, responseMessage?.loginSuccess, data, {}))
        } else {
            return res.status(401).json(await apiResponse(401, responseMessage?.invalidUserPasswordEmail, null, {}))
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json(await apiResponse(500, responseMessage?.internalServerError, {}, error))

    }
}
// $2a$08$xlgJxEVvIwNR0QeJhbWX1OqSHChhWV6O3zWWnM5hr7rzevgOdjtB6