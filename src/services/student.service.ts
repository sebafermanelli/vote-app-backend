import { Request, Response } from 'express';
import { Student } from '../models/students.model';
import { Op } from 'sequelize';

export const getStudents = async (req: Request, res: Response) => {
	const studentList = await Student.findAll();
	return res.json(studentList);
};

export const getStudentById = async (req: Request, res: Response) => {
	const { dni } = req.params;

	const student = await Student.findOne({ where: { dni } });

	if (!student) {
		return res.status(404).json({ message: `El estudiante ${dni} no existe` });
	}

	return res.json(student);
};

export const createStudent = async (req: Request, res: Response) => {
	const { dni, email } = req.body;

	const student = await Student.findOne({
		where: {
			[Op.or]: [{ dni }, { email }],
		},
	});

	if (student != null) {
		return res.status(400).json({
			message: `El estudiante ${dni} ya existe`,
		});
	}

	try {
		await Student.create(req.body);

		return res.json({
			message: `Estudiante ${dni} creado exitosamente`,
		});
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrio un error',
			error,
		});
	}
};

export const updateStudent = async (req: Request, res: Response) => {
	const { dni } = req.params;

	const student = await Student.findOne({ where: { dni } });

	if (!student) {
		return res.status(404).json({ message: `El estudiante ${dni} no existe` });
	}

	try {
		const { email } = req.body;

		const studentEmail = await Student.findOne({ where: { email } });

		if (studentEmail != null) {
			return res.status(400).json({
				message: `Ya existe un estudiante con ese email`,
			});
		}

		await student.update(req.body);

		return res.json({
			message: `Estudiante ${dni} modificado exitosamente`,
		});
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrio un error',
			error,
		});
	}
};

export const destroyStudent = async (req: Request, res: Response) => {
	const { dni } = req.params;

	const student = await Student.findOne({ where: { dni } });

	if (!student) {
		return res.status(404).json({ message: `El estudiante ${dni} no existe` });
	}

	try {
		await student.destroy();

		return res.json({
			message: `Estudiante ${dni} eliminado exitosamente`,
		});
	} catch (error) {
		return res.status(400).json({
			message: 'Ocurrio un error',
			error,
		});
	}
};
