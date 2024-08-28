export class UnableToSaveUserError extends Error {
	constructor(message: string) {
		super(message);
	}
}


export class InvalidUsernameError extends Error {
	constructor(message:string) {
		super(message);
	}
}