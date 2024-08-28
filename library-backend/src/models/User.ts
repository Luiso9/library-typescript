export interface IUser {
	type: "ADMIN" | "PENJAGA" | "SISWA";
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
