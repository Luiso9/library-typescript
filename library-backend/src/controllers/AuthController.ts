import { Request, Response } from "express";
import { register, login } from "../services/UserService";
import { IUser } from "../models/User";
import { IUserModel } from "../daos/UserDaos";
import { InvalidUsernameError } from "../utils/LibraryErrors";

async function handleRegister(req: Request, res: Response) {
	const user: IUser = req.body;

	try {
		const registeredUser = await register(user);
		res.status(201).json({
			message: "(201) User berhasil di buat",
			user: {
				_id: registeredUser._id,
				type: registeredUser.type,
				firstName: registeredUser.firstName,
				lastName: registeredUser.lastName,
				email: registeredUser.email,
			},
		});
	} catch (error: any) {
		if (error.code === 11000) {
			res.status(409).json({
				message: "(409) User dengan email yang sama telah terdaftar",
				error: error.message,
			});
		} else {
			res.status(500).json({
				message: "(500) Tidak dapat membuat User pada saat ini.",
				error: error.message,
			});
		}
	}
}

async function handleLogin(req: Request, res: Response) {
	const credentials = req.body;

	try {
		const loggedIn: IUserModel = await login(credentials);

		res.status(200).json({
			message: "User berhasil login.",
			user: {
				_id: loggedIn._id,
				type: loggedIn.type,
				firstName: loggedIn.firstName,
				lastName: loggedIn.lastName,
				email: loggedIn.email,
			},
		});
	} catch (error: any) {
		if (error instanceof InvalidUsernameError) {
			res.status(401).json({
				message: "(401) Maaf, User gagal login.",
				error: error.message,
			});
		} else {
			res.status(500).json({
				message: "(500) Maaf, User gagal login.",
				error: error.message,
			});
		}
	}
}

export default { handleRegister, handleLogin };
