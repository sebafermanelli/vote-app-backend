import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Admin } from '../models/admin.model';
import jwt from 'jsonwebtoken';

export const newAdmin = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	// Validamos si el nombre de usuario ya existe en la base de datos
	const admin = await Admin.findOne({ where: { username } });

	if (admin != null) {
		return res.status(400).json({
			message: `El usuario ${username} ya existe`,
		});
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		// Guardamos usuario administrador en la base de datos
		await Admin.create({
			username,
			password: hashedPassword,
		});

		return res.json({
			message: `Usuario ${username} creado exitosamente`,
		});
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrio un error',
			error,
		});
	}
};

export const loginAdmin = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	// Validamos si el nombre de usuario existe en la base de datos
	const admin: any = await Admin.findOne({ where: { username } });

	if (!admin) {
		return res.status(400).json({
			message: `El usuario ${username} no existe`,
		});
	}

	// Validamos password
	const passwordValid = await bcrypt.compare(password, admin.password);
	if (!passwordValid) {
		return res.status(400).json({
			message: 'Contraseña incorrecta',
		});
	}

	// Generamos token
	const token = jwt.sign(
		{
			username,
		},
		process.env.SECRET_KEY || 'elpepe'
	);

	return res.json(token);
};

export const getAdmins = async (req: Request, res: Response) => {
	const adminList = await Admin.findAll();

	return res.json(adminList);
};
