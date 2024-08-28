import Joi, { ObjectSchema } from "joi";

import { NextFunction, Response, Request } from "express";
import { IUser } from "../models/User";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function ValidateSchema(schema: ObjectSchema) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
			next();
		} catch (error) {
			return res.status(422).json({ message: "Object validation falied." });
		}
	};
}

export const Schemas = {
    user:{
        create: Joi.object<IUser>({
            type: Joi.string().valid('ADMIN', 'PENJAGA', 'SISWA').required(),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().pattern(emailRegex).required(),
            password: Joi.string().required()
        }),
        login: Joi.object<{email:string, password:string}>({
            email: Joi.string().pattern(emailRegex).required(),
            password: Joi.string().required()
        })
    }
}
