import bcrypt from "bcrypt";

import { config } from "../config";

import UserDaos, { IUserModel } from "../daos/UserDaos";
import { IUser } from "../models/User";
import {
	UnableToSaveUserError,
	InvalidUsernameError,
} from "../utils/LibraryErrors";

export async function register(user: IUser): Promise<IUserModel> {
	const ROUNDS = config.server.rounds;
	try {
		const hashedPassword = await bcrypt.hash(user.password, ROUNDS);
		const saved = new UserDaos({ ...user, password: hashedPassword });
		return await saved.save();
	} catch (error: any) {
		throw new UnableToSaveUserError(error.message);
	}
}

export async function login(credentials: {
	email: string;
	password: string;
}): Promise<IUserModel> {
	const { email, password } = credentials;

	try {
		const user = await UserDaos.findOne({ email });

		if (!user) {
			throw new InvalidUsernameError("Username atau Password salah!");
		} else {
			const validPassword: boolean = await bcrypt.compare(
				password,
				user.password
			);

			if (validPassword) {
				return user;
			} else {
				throw new InvalidUsernameError("Username atau Password salah!");
			}
		}
	} catch (error: any) {
		throw error;
	}
}
