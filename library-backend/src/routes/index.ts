import { Express, Request, Response } from "express";
import authRoutes from "./AuthRoutes";

export function registerRoutes(app: Express) {
	app.get("/products", (req: Request, res: Response) => {
		res.status(200).json({ message: "server is running" });
	});

	app.use("/auth", authRoutes);
}
