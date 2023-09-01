import { Request, Response } from 'express';

export const getApi = async (req: Request, res: Response) => {
	const apiUrl = `${req.protocol}://${req.hostname}:${req.socket.localPort}${req.originalUrl}`;

	return res.json({
		admin: `${apiUrl}admin`,
		student: `${apiUrl}student`,
		election: `${apiUrl}election`,
	});
};
